import axios from "axios";
import { mainDomain } from "./../vars";
import UserClass from "../authHandler";

export const getUser = async () => {
    return UserClass.getUser();
};

// storing new store in database
export const register = async (data) => {
    try {
        const options = {
            method: "POST",
            url: mainDomain + "client/auth/register",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            data,
        };

        const request = await axios(options)
            .then((response) => response.data)
            .catch((error) => console.log(error));
        console.log(data)
        // return
        return request.success ? request.data : [];
    } catch (error) {
        console.log(error);
        return [];
    }
};

export const login = async (data) => {
    try {
        const options = {
            method: "POST",
            url: mainDomain + "client/auth/login",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            data,
        };

        const request = await axios(options)
            .then((response) => response.data)
            .catch((error) => console.log(error));

        // console.log(request)
        // return
        return request.success ? request.data : [];
    } catch (error) {
        console.log(error);
        return [];
    }
};

export const verify = async (data) => {
    const user = await getUser();
    try {
        const options = {
            method: "POST",
            url: mainDomain + "client/auth/otp/confirm",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + user.token,
            },
            data,
        };

        const request = await axios(options)
            .then((response) => response.data)
            .catch((error) => console.log(error));
        if (request.success) {
            user.is_verified = true;
            UserClass.setUser(user);
        }
        return request.success ? true : false;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const resendCode = async () => {
    const user = await getUser();
    try {
        const options = {
            method: "GET",
            url: mainDomain + "client/auth/otp/resend",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + user.token,
            },
        };

        const request = await axios(options)
            .then((response) => response.data)
            .catch((error) => console.log(error));
        return request.success ? true : false;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const updateUserProfile = async (data) => {
    const user = await getUser();
    try {
        const options = {
            method: "POST",
            url: mainDomain + "client/profile",
            headers: {
                "Content-Type": "application/json",
                Accept: "*/*",
                Authorization: "Bearer " + user.token,
            },
            data,
        };

        const request = await axios(options)
            .then((response) => response.data)
            .catch((error) => console.log(error));
        if (request.success) {
            user.client = request.data
            // console.log(request)
            UserClass.setUser(user)
        }
        return request.success ? true : false;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const getUserProfile = async () => {
    const user = await getUser();
    try {
        const options = {
            method: "GET",
            url: mainDomain + "client/profile",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + user.token,
            },
        };

        const request = await axios(options)
            .then((response) => response.data)
            .catch((error) => console.log(error));
        // if (request.success) {
        // console.log(request)
        // UserClass.setUser(request.data)
        // }
        return request.success ? request.data : false;
    } catch (error) {
        console.log(error);
        return false;
    }
};

