
import React from 'react';
import { Link, useHistory } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useStateValue } from "./StateProvider";
import { auth } from './firebase';

function Header() {
    const history = useHistory();
    const [{ basket, user }, dispatch] = useStateValue();

    const login = () => {
        if (user) {
            auth.signOut();
            dispatch({
                type: "EMPTY_BASKET"
            });
            history.push('/')
        };
    }


    return (
        <nav className='header'>
            <Link to="/">
                <img className="header_logo" src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="Amazon Logo" />
            </Link>
            <div className='header_search'>
                <div className='header_searchWrapper'><span>All</span>
                    <span><ArrowDropDownIcon />
                    
                    </span>
                    <input type="text" className="header_searchInput" placeholder="Search for products..."/>
                    
                    <SearchIcon className="header_searchIcon" />
                </div>


            </div>
            <div className='header_nav'>
                <Link to={!user && "/login"} className='header_link'>
                    <div onClick={login} className='header_option'>
                        <span className='header_optionLineOne'>
                            Hello {user ? user.email : 'Guest'}
                        </span>
                        <span className='header_optionLineTwo'>{user ? 'Sign Out' : 'Sign In'}</span>
                    </div>
                </Link>
                <Link to="/orders" className='header_link'>
                    <div className='header_option'>
                        <span className='header_optionLineOne'>Returns</span>
                        <span className='header_optionLineTwo'>& Orders</span>
                    </div>
                </Link>
                <Link to="/" className='header_link'>
                    <div className='header_option'>
                        <span className='header_optionLineOne'>Your</span>
                        <span className='header_optionLineTwo'>Prime</span>
                    </div>
                </Link>
                <Link to={"/checkout"} className='header_link'>
                    <div className='header_optionBasket'>
                        <ShoppingBasketIcon />
                        <span className='header_optionLineTwo header_basketCount'>{basket?.length}</span>
                    </div>
                </Link>
            </div>
        </nav>
    );
}

export default Header;
