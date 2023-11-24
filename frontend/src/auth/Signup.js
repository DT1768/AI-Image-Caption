import React, { useState } from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { signup } from './helper/authapicall';

const Signup = () => {

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        confirmpassword: "",
        error: "",
        success: false
    });

    const { name, email, password, confirmpassword, error, success } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });
        if (password !== confirmpassword) {
            setValues({ ...values, error: "Password and Confirm Password do not match", success: false });
        }
        else {
            signup({ name, email, password, confirmpassword })
                .then(data => {
                    if (data && data.error) {
                        setValues({ ...values, error: data.error, success: false });
                    }
                    else {
                        setValues({
                            ...values,
                            name: "",
                            email: "",
                            password: "",
                            confirmpassword: "",
                            error: "",
                            success: true
                        });
                    }
                })
                .catch(err => console.log("error in signup"))
        };
    }

    const signUpForm = () => {
        return (
            <div className="row">
                <div className="col-md-4 offset-sm-4 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Name</label>
                            <input type="text" className="form-control" value={name} onChange={handleChange("name")} />
                        </div>
                        <br />
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input type="email" className="form-control" value={email} onChange={handleChange("email")} />
                        </div>
                        <br />
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input type="password" className="form-control" value={password} onChange={handleChange("password")} />
                            <small id="passwordHelpBlock" className="form-text-light">
                                Password must be 8 characters long and must contain 1 lowercase letter, 1 uppercase letter and 1 special character.
                            </small>
                        </div>
                        <br />
                        <div className="form-group">
                            <label className="text-light"> Confirm Password</label>
                            <input type="password" className="form-control" value={confirmpassword} onChange={handleChange("confirmpassword")} />
                        </div>
                        <br />
                        <button onClick={onSubmit} className='btn btn-warning col-12'> Register</button>
                    </form>
                </div>
            </div>
        )
    }

    const successMessage = () => {
        return (
            <div className="row">
                <div className="col-md-4 offset-sm-4 text-left">
                    <div className="alert alert-success" style={{ display: success ? "" : "none" }}>
                        New Account Created Successfully. Please <Link to="/signin">Login Here</Link>
                    </div>
                </div>
            </div>
        )
    }

    const errorMessage = () => {
        return (
            <div className="row">
                <div className="col-md-4 offset-sm-4 text-left">
                    <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
                        {error}
                    </div>
                </div>
            </div>
        )
    }

    const alreadyHaveAccount = () => {
        return (
            <div className="row">
                <div className="col-md-4 offset-sm-4 text-left">
                    <div className="alert alert-info" style={{ display: !success ? "" : "none" }}>
                        Already have an account? <Link to="/signin">Login Here</Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <Base title='Sign up page' description='Please register Here.'>

            {alreadyHaveAccount()}
            {successMessage()}
            {errorMessage()}
            {signUpForm()}
        </Base>
    )
}

export default Signup;