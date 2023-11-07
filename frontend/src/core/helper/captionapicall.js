import { CAPTION_GENERATE_API } from "../../backend";


export const generateCaption = (imageUrl) => {
    return fetch(`${CAPTION_GENERATE_API}/generate_caption`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ image_url: imageUrl }),
    })
    .then(response =>{
        return response.json();
    } )
    .catch(error => {
        console.error(error);
    });
}
