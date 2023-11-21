import React, { useState } from 'react';
import {Redirect} from 'react-router-dom';

const Card = ({
    image,
    setReload = f => f,
    reload = undefined
}) => {

    const imageUrl = image.image_url;
    const imageCaption = image.image_caption;

    return(
        <div className="card text-light bg-dark border border-light">
            <div className="card-body">
                <img src={imageUrl} alt="image" style={{maxHeight:"100%",maxWidth:"100%"}} className="rounded" />
                <br />
                <p className="text text-center bg-dark font-weight-normal text-wrap">
                    {imageCaption}
                </p>
            </div>
        </div>
    );
};

export default Card;