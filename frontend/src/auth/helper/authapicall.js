import { API } from "../../backend";

// signup method
export const signup = user => {
    return fetch(`${API}/signup`, {
        method: "POST",
        headers: {
            // Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json();
    })
    .catch(
        err => console.log(err)
        );
    };

// signin method
export const signin = user => {
    return fetch(`${API}/signin`, {
        method: "POST",
        headers: {
            // Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json();
    })
    .catch(
        err => console.log(err)
        );
    };

// authenticate method
export const authenticate = (data, next) => {
    if(typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(data));
        next();
    }
};

// isAuthenticated method
export const isAuthenticated = () => {
    if(typeof window == "undefined" || localStorage.getItem("jwt") == "undefined") {
        return false;
    }
    else if(localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"));
    } else {
        return false;
    }
};

// signout method
export const signout = next => {
    if(typeof window !== "undefined") {
        localStorage.removeItem("jwt");
        next();
        return fetch(`${API}/signout`, {
            method: "GET"
        })
        .then(response => console.log("Signout success"))
        .catch(err => console.log(err));
    }
};