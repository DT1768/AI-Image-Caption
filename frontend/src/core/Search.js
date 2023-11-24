import React, { useState, useEffect } from 'react';
import "../styles.css";
import Base from './Base';
import { searchByCaption } from './helper/captionapicall';
import Card from './Card';
import { isAuthenticated } from '../auth/helper/authapicall';

const Search = () => {
    const [images, setImages] = useState([]);
    const [search, setSearch] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        loadAllImages();
    }

    const { user, token } = isAuthenticated();

    const loadAllImages = () => {
        searchByCaption(user._id, token, search)
            .then(data => {
                if (data.error) {
                    setError(data.error);
                }
                else {
                    setImages(data);
                }
            })
    }

    return (
        <Base title="Search" description="Search by Caption">
            <div className="container-fluid">
                <form className="form-inline" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Search by Caption" onChange={event => setSearch(event.target.value)} />
                    </div>
                    <br />
                    <button type="submit" className="btn btn-primary">Search</button>
                </form>
                <br />
                <div className="row">
                    {images.map((image, index) => {
                        return (
                            <div key={index} className="col-sm-3">
                                <Card image={image} />
                                <br />
                            </div>
                        );
                    })}
                </div>
            </div>
        </Base>
    )
};

export default Search;