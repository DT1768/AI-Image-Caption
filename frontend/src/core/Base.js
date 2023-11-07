import React from 'react';

import "../styles.css";

const Base = ({
    className,
    children
}) => {



    return(
        <div>
            <div className="logohead text-center">
                <a href="/" className="navbar-brand">
                    {/*<img src="" width="100" height="100" alt="" className="d-inline-block align-middle" />*/}
                    <span className="text align-middle">AI-Image Captioning</span>
                </a>
            </div>
            <div className={className}>
                {children}
            </div>
            <div className="container text-black text-center py-3">
                <br />
                <h5>This will be footer.</h5>
            </div>
        </div>
    );
}

export default Base;