import React, { useState } from 'react';
import {Redirect} from 'react-router-dom';

const Card = ({
    image
}) => {

    const imageUrl = image.image_url;
    const imageCaption = image.image_caption;

    return(
        <div className="card text-light bg-dark border border-light">
            <div className="card-body">
                <img src={imageUrl} alt="image" width={"100%"} height={"100%"} style={{maxHeight:"400px"}}  className="img-fluid" />
                <br />
                <br />
                <p className="text text-center bg-dark font-weight-normal text-wrap">
                    {imageCaption}
                </p>
            </div>
        </div>
    );
};

export default Card;