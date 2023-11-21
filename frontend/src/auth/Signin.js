import React, { useState } from 'react';
import Base from '../core/Base';
import { Link, Navigate } from 'react-router-dom';

import { signin, authenticate, isAuthenticated } from '../auth/helper';

const Signin = () => {

    const [values, setValues] = useState({
        email: "dhruvthakkar1768@gmail.com",
        password: "Dhruv1768@",
        error: "",
        loading: false,
        didRedirect: false
    });

    const { email, password, error, loading, didRedirect } = values;
    const { user } = isAuthenticated();

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        signin({ email, password })
            .then(data => {
                console.log(data);
                if (data && data.error) {
                    setValues({ ...values, error: data.error, loading: false });
                }
                else {
                    authenticate(data, () => {
                        setValues({
                            ...values,
                            didRedirect: true
                        });
                    });
                }
            })
            .catch(err => console.log("error in signin"))
    };

    const performRedirect = () => {
        if(didRedirect){
            return <Navigate to="/" />
        }
        if(isAuthenticated()){
            return <Navigate to="/" />
        } 
    }

    const signInForm = () => {
        return (
            <div className="row">
                <div className="col-md-4 offset-sm-4 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input type="email" className="form-control" value={email} onChange={handleChange("email")} />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input type="password" className="form-control" value={password} onChange={handleChange("password")} />
                        </div>
                        <br />
                        <button className="btn btn-warning btn-block" onClick={onSubmit}>Submit</button>
                    </form>
                </div>
            </div>
        );
    };

    const loadingMessage = () => {
        return (
            loading && (
                <div className="alert alert-info">
                    <h2>Loading...</h2>
                </div>
            )
        );
    };

    const errorMessage = () => {
        return (
            <div className="row">
                <div className="col-md-4 offset-sm-4 text-left">
                    <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
                        {error}
                    </div>
                </div>
            </div>
        );
    };

    const newUser = () => {
        return (
            <div className="row">
                <div className="col-md-4 offset-sm-4 text-left">
                    <div>
                        New user?,{" "}
                        <Link className='text' to="/signup">Click Here</Link>
                        &nbsp;to Sign Up
                    </div>
                </div>
                <br />
                <br />
            </div>
        );
    }

    return(
        <Base title='Sign In Page' description='Please Sign In Here.'>
            {loadingMessage()}
            {errorMessage()}
            {newUser()}
            {signInForm()}
            {performRedirect()}
        </Base>
    );
}

export default Signin;