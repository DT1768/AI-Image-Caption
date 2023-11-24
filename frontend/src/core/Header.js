import React, { Fragment } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import "../styles.css";
import { signout, isAuthenticated } from '../auth/helper/authapicall';




const Header = () => {

    const navigate = useNavigate();

    const menu = () => {
        return (
            <div>
                <nav className='navbar justify-content-between'>
                    <div className="text-center">
                        <NavLink to="/" className="nav-link">
                            <span className='text align-middle'>
                                <h3>AI-Image Captioning</h3>
                            </span>
                        </NavLink>
                    </div>
                    <ul className="nav nav-tabs">
                        <li><NavLink className='nav-link' to="/"> Home</NavLink></li>
                        {!isAuthenticated() && (
                            <Fragment>
                                <li><NavLink className='nav-link' to="/signup">Sign Up</NavLink></li>
                                <li><NavLink className='nav-link' to="/signin">Sign In</NavLink></li>
                            </Fragment>)}
                        {isAuthenticated() && (
                            <Fragment>
                                <li><NavLink className='nav-link' to="/collection">Collection</NavLink></li>
                                <li><NavLink className='nav-link' to="/search">Search</NavLink></li>
                                <li>
                                    <span className="nav-link" onClick={() => {
                                        signout(() => {
                                            navigate("/");
                                        });
                                    }}>
                                        Log out
                                    </span>
                                </li>
                            </Fragment>
                        )}
                    </ul>
                </nav>
            </div>
        );
    }

    return (
        <div>
            {menu()}
        </div>
    );
}

export default Header;