import React from 'react';
import "../styles.css";

const Footer = () => {
    
    const footer = () => {
        return(
            <footer className="footer">
                <div className="container text-center text-light py-3">
                    <br />
                    <h6>© All Rights Reserved.</h6>
                </div>
            </footer>
        );
    };

    return (
        <div>
            {footer()}
        </div>
    );
};

export default Footer;