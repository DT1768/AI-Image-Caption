import React from 'react';

import "../styles.css";
import Header from './Header';
import Footer from './Footer';

const Base = ({
    title = "",
    description = "",
    className = 'bg-dark text-white p-4',
    children
}) => {



    return(
        <div>
            <Header />
            <div className='container-fluid text-light text-center'>
                <h2 className='display-4'>{title}</h2>
                <p className='lead'>{description}</p>
            </div>
            <div className={className}>
                {children}
            </div>
            <Footer />
        </div>
    );
}

export default Base;