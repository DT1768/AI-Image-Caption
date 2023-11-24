import React, { useState } from "react";
import AWS from "aws-sdk";
import Base from "./Base";
import { AWS_REGION, AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY, AWS_S3_BUCKET } from "../awsCredentials";
import { generateCaption, saveImage } from "./helper/captionapicall";
import { isAuthenticated } from "../auth/helper/authapicall";

const UploadImage = () => {

    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [caption, setCaption] = useState('');
    const [loading, setLoading] = useState('');
    const [saved, setSaved] = useState(false);

    const { user, token } = isAuthenticated();



    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setImageUrl('');
        setCaption('');
    };

    const handleUpload = () => {
        if (file) {
            // Configure AWS SDK with your credentials
            AWS.config.update({
                region: AWS_REGION,
                accessKeyId: AWS_ACCESS_KEY,
                secretAccessKey: AWS_SECRET_ACCESS_KEY,
            });


            const timestamp = new Date().toISOString().replace(/[-T:]/g, "");

            const key = isAuthenticated() ? `${user._id}/${timestamp}_${file.name}` : `general/${timestamp}_${file.name}`;

            const s3 = new AWS.S3();
            const params = {
                Bucket: AWS_S3_BUCKET,
                Key: key,
                Body: file,
            };

            setLoading("Uploading Image...");

            // Upload the image to S3
            s3.upload(params, (err, data) => {
                setLoading("Image Uploaded.");

                if (err) {
                    console.error('Error uploading image: ', err);
                } else {
                    // Set the image URL for display
                    setImageUrl(data.Location);
                }
            });
        }
        else {
            setLoading("Please Select Image")
        }
    };

    const handleGenerateCaption = () => {
        setLoading("Generating Caption...");

        if (imageUrl) {
            // Make an API request to the Flask server to generate a caption
            generateCaption(imageUrl)
                .then(data => {
                    setLoading("Caption Generated");
                    console.log(data);
                    setCaption(data.caption);
                })
        }
    };



    const handleSaveCaption = (event) => {
        setLoading("Saving Caption...");
        event.preventDefault();
        saveImage(user._id, token, imageUrl, caption)
            .then(data => {
                setLoading("Image Saved to collection.");
                setSaved(true);
                console.log(data);
            })
            .catch(
                err => console.log(err)
            )
    };

    const imageForm = () => {
        return (
            <div className="row">
                <div className="col-md-4 offset-sm-4">
                    {loading && <p className="text">{loading}</p>}
                    <input className="btn" type="file" accept="image/png, image/jpeg" onChange={handleImageChange} />
                    <br />
                    <br />
                    <button className="btn btn-warning col-12" onClick={handleUpload} disabled={imageUrl}>Upload Image</button>
                    <br />
                    <br />
                    {imageUrl && (
                        <img src={imageUrl} alt="Uploaded" width={"100%"} height={"100%"} style={{ maxHeight: "400px" }} />
                    )}
                    <br />
                    <br />
                    {imageUrl && (
                        <button className="btn btn-warning col-12" onClick={handleGenerateCaption} disabled={caption}>
                            Generate Caption
                        </button>
                    )}
                    <div>
                        {caption && captionDisplay()}
                        <br />
                        {caption && isAuthenticated() && (
                            <button className="btn btn-warning col-12" onClick={handleSaveCaption} disabled={saved}>
                                Save Caption
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    const captionDisplay = () => {
        return (
            <div className="row">
                <div className="col">
                    <br />
                    <div className="text-light">
                        Caption:
                    </div>
                    <div className="text">
                        {caption}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <Base title="Upload Image Here" description="Caption will be generated using gpt-2 model.">

                {imageForm()}
            </Base>
        </div>
    );
}

export default UploadImage;