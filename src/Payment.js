import React, { useEffect, useState } from 'react';
import "./Payment.css";
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import { Link, useHistory } from "react-router-dom";
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { getBasketTotal } from './reducer';
import CurrencyFormat from 'react-currency-format';
import axios from './axios';
import { db } from './firebase';

function Payment() {
    const history = useHistory();
    const [{ basket, user }, dispatch] = useStateValue();
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [processing,setProcessing]=useState(false);//previously ''
    const[succeeded,setSucceeded]=useState(false);
    const[clientSecret,setClientSecret]=useState(null);

    useEffect(()=>{
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                url: `/payment/create?total=${getBasketTotal(basket)*100}`
            });
            setClientSecret(response.data.clientSecret)
        }
        getClientSecret();
    },[basket])

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(async ({ paymentIntent }) => {
            if (paymentIntent) { // Check if paymentIntent exists
                await db.collection('users').doc(user?.uid).collection('orders').doc(paymentIntent.id).set({
                    basket: basket,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created
                });
                setSucceeded(true);
                setError(null);
                setProcessing(false);
                dispatch({
                    type: 'EMPTY_BASKET'
                });
                history.replace('/orders');
            } else {
                setError('Payment failed');
                setProcessing(false);
            }
        }).catch(error => {
            console.error('Error:', error);
            setError(`Payment failed: ${error.message}`);
            setProcessing(false);
        });
    }

    const handleChange = (event) => {
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

    return (
        <div className='payment'>
            <div className='payment_container'>
                <h1>
                    Checkout (
                        <Link to="/checkout">{basket?.length} items</Link>
                    )
                </h1>
                <div className='payment_section'>
                    <div className='payment_title'>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className='payment_address'>
                        <p>Hello {user ? user.email : "Guest"}</p>
                        <p>123 React Road</p>
                        <p>Los Angeles, CA</p>
                    </div>
                </div>
                <div className='payment_section'>
                    <div className='payment_title'>
                        <h3>Review Items and delivery</h3>
                    </div>
                    <div className='payment_items'>
                        {basket.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>
                <div className='payment_section'>
                    <div className='payment_title'>
                        <h3>Payment Method</h3>
                    </div>
                    <div className='payment_detail'>
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />
                            <div className='payment_price'>
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <>
                                            <h3>Order Total: {value}</h3>
                                        </>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                <button   disabled={processing||disabled||succeeded}>
                                    <span >
                                        {processing?<p>Processing</p>: "Buy Now"}
                                    </span>
                                </button>
                            </div>
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment;
