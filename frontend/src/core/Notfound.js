import React from 'react';
import Base from './Base';
import {Link } from 'react-router-dom';

const Notfound = () => {
    return(
        <Base title='Oops!' description="We cannot find the page you're looking for.">
            <div className="container text-center py-3">
                <h1>404</h1>
                <h5>Page not found.</h5>
                <Link className='text' to="/">Go to home page.</Link>
            </div>
        </Base>
    );
}

export default Notfound;