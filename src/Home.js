import React, { useState, useEffect } from 'react';
import './Home.css';
import Product from './Product';
const images = [
    'https://m.media-amazon.com/images/G/01/primevideo/seo/primevideo-seo-logo.png',
    'https://i.gadgets360cdn.com/large/prime-day-2022-free_1658308645060.png',
    'https://1.bp.blogspot.com/-Q0kxB3mHWis/XawgPm9cRII/AAAAAAAAIPI/e_3T0pCnh44waQebyPst5XIUV0_0vsrvQCNcBGAsYHQ/s1600/Screenshot%2Bfrom%2B2019-10-20%2B14-21-46.png',
    'https://wallpapers.com/images/featured/amazon-npcp6jc782ixp9zs.jpg',
    'https://i.ytimg.com/vi/c0m57jAkF9U/maxresdefault.jpg'
];

function Home() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className='home'>
            <img className='home_image' src={images[currentImageIndex]} alt='' />
            <div className='home__row'>
                <Product id="12341"
                    title="Philips HL7756/00 Mixer Grinder 750 Watt, 3 Stainless Steel Multipurpose Jars with 3 Speed Control and Pulse function (Black)"
                    price={11.96}
                    rating={3}
                    image="https://m.media-amazon.com/images/I/41vCwdjHqEL._SX300_SY300_QL70_ML2_.jpg" />
                <Product id="12342"
                    title="Apple iPhone 14Pro (6.1 inch,Wifi+Cellular,128GB)-Black"
                    price={1000.96}
                    rating={5}
                    image="https://www.91-img.com/pictures/143993-v4-apple-iphone-14-mobile-phone-large-4.jpg" />
                    <Product id="12343"
                    title="boAt Airdopes Atom 81 TWS Earbuds with Upto 50H Playtime, Quad Mics ENx™ Tech, 13MM Drivers,Low Latency(50ms), ASAP™ Charge, BT v5.3"
                    price={50.84}
                    rating={4}
                    image="https://m.media-amazon.com/images/I/41cU0ptdpWL._SX300_SY300_QL70_ML2_.jpg" />
                <Product id="12344"
                    title="LG 80 cm (32 inches) HD Ready Smart LED TV 32LM563BPTC"
                    price={200.96}
                    rating={4}
                    image="https://m.media-amazon.com/images/I/71kuqRw8L5L._SX679_.jpg" />
                    <Product id="12345"
                    title="Tygot Adjustable Aluminium Alloy Tripod Stand Holder for Mobile Phones & Camera, 360 mm -1060 mm (42 Inch), 1/4 inch Screw "
                    price={10.37}
                    rating={3}
                    image="https://m.media-amazon.com/images/I/51jx8hycZUL._SX679_.jpg" />
                <Product id="12346"
                    title="Portronics Ruffpad 8.5E Re-Writable LCD Writing Pad with Screen 21.5cm (8.5-inch) ,Ruffpad app on your Smartphone(Black)"
                    price={40.39}
                    rating={4}
                    image="https://m.media-amazon.com/images/I/51nzIs6jTCL._SX679_.jpg" />
                     <Product id="12347"
                    title="LG 7 Kg 5 Star Inverter Touch panel Fully-Automatic Front Load Washing Machine with In-Built Heater (FHM1207SDM, Middle Black)"
                    price={30.99}
                    rating={5}
                    image="https://m.media-amazon.com/images/I/51aFFxdPqwL._SY445_SX342_QL70_ML2_.jpg" />
                    <Product id="12348"
                    title="Samsung Galaxy Book3 Core i7 13th Gen 1355U - (16 GB/512 GB SSD/Windows 11 Home) Galaxy Book3 Laptop (15.6 Inch, Silver, 1.58 Kg, with MS Office)"
                    price={90.99}
                    rating={5}
                    image="https://m.media-amazon.com/images/I/816fTYVn5lL._SX679_.jpg" />
                <Product id="12349"
                    title="Blackt Electrotech(BT-31C):360 Degree PIR Motion Sensor with Light Sensor (Ceiling Mounted)  Motion Detector Switch with 18 Months Warranty"
                    price={5.96}
                    rating={3}
                    image="https://m.media-amazon.com/images/I/31mrLbP0Z7L.jpg" />
            </div>

        </div>
    );
}

export default Home;

