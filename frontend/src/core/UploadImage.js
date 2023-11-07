import React, { useState } from "react";
import AWS from "aws-sdk";
import Base from "./Base";
import { AWS_REGION, AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY, AWS_S3_BUCKET } from "../awsCredentials";
import { generateCaption } from "./helper/captionapicall";

const UploadImage = () => {

    const [file,setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [caption, setCaption] = useState('');
    const [loading, setLoading] = useState('');

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

            const s3 = new AWS.S3();
            const params = {
                Bucket: AWS_S3_BUCKET,
                Key: file.name,
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
        else{
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

    return (
    <div>
        <Base>
                <div>
                    <div className="alert alert-success">
                        {loading}
                    </div>
                    <div>
                        <input type="file" accept="image/png, image/jpeg" onChange={handleImageChange} />
                        <button onClick={handleUpload}>Upload Image</button>
                    </div>
                    {imageUrl && <img src={imageUrl} alt="Uploaded" />}
                    <div>
                        {imageUrl && (
                            <button onClick={handleGenerateCaption} disabled={caption}>
                                Generate Caption
                            </button>
                        )}
                    </div>
                    {caption && <p>Caption: {caption}</p>}
                </div>
        </Base>
    </div>
    );
}

export default UploadImage;