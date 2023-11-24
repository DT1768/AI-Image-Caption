import React, { useState, useEffect } from 'react';
import "../styles.css";
import Base from './Base';
import { Link } from 'react-router-dom';
import Card from './Card';
import { fetchCollection } from './helper/captionapicall';
import { isAuthenticated } from '../auth/helper/authapicall';

const Collection = () => {
    const [images, setImages] = useState([]);
    const [error, setError] = useState(false);

    const { user, token } = isAuthenticated();

    const loadAllImages = () => {
        fetchCollection(user._id, token)
            .then(data => {
                if (data.error) {
                    setError(data.error);
                }
                else {
                    setImages(data);
                }
            })
    }

    useEffect(() => {
        loadAllImages();
    }, []);

    return (
        <Base title="Collection" description="All saved Images with caption">
            <div className="container-fluid">
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

export default Collection;