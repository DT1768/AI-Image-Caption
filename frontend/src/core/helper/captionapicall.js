import { CAPTION_GENERATE_API, API} from "../../backend";


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

export const saveImage = (userId, token, imageUrl, caption) => {
    return fetch (`${API}/image/create/${userId}`,{
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ image_url: imageUrl, image_caption: caption })
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err)); 
}

export const fetchCollection = (userId, token) => {
    return fetch (`${API}/images/${userId}`,{
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }})
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}

export const searchByCaption = (userId, token, caption) => {
    return fetch (`${API}/images/captionsearch/${userId}`,{
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ search: caption })
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}