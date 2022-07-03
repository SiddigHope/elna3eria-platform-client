import axios from "axios";
import { mainDomain } from "../vars";
import UserClass from "../authHandler";

export const getUser = async () => {
    return UserClass.getUser();
};


export const checkout = async (data) => {
    const user = await getUser()
    try {
        const options = {
            method: "POST",
            url: mainDomain + "client/orders",
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
        // console.log(request)
        // return
        return request.success ? request.data : false;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const onlinePayment = async (data) => {
    const user = await getUser()
    try {
        const options = {
            method: "POST",
            url: mainDomain + "client/payment",
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
        // console.log(request)
        // return
        return request.success ? request.data : false;
    } catch (error) {
        console.log(error);
        return false;
    }
}


export const rateProduct = async (data, id) => {
    const user = await getUser()
    try {
        const options = {
            method: "POST",
            url: mainDomain + "client/products/review/" + id,
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
        console.log(request)
        // return
        return request.success ? true : false;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const setFavProduct = async (id) => {
    const user = await getUser()
    try {
        const options = {
            method: "POST",
            url: mainDomain + "client/favorites/products/" + id,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + user.token,
            },
        };

        const request = await axios(options)
            .then((response) => response.data)
            .catch((error) => console.log(error));
        console.log(request)
        // return
        return request.success ? true : false;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const setFavStore = async (id) => {
    const user = await getUser()
    try {
        const options = {
            method: "POST",
            url: mainDomain + "client/favorites/stores/" + id,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + user.token,
            },
        };

        const request = await axios(options)
            .then((response) => response.data)
            .catch((error) => console.log(error));
        // console.log(request)
        // return
        return request.success ? true : false;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const deleteFavStore = async (id) => {
    const user = await getUser()
    try {
        const options = {
            method: "DELETE",
            url: mainDomain + "client/favorites/stores/" + id,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + user.token,
            },
        };

        const request = await axios(options)
            .then((response) => response.data)
            .catch((error) => console.log(error));
        console.log(request)
        // return
        return request.success ? true : false;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const deleteFavProduct = async (id) => {
    const user = await getUser()
    try {
        const options = {
            method: "DELETE",
            url: mainDomain + "client/favorites/products/" + id,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + user.token,
            },
        };

        const request = await axios(options)
            .then((response) => response.data)
            .catch((error) => console.log(error));
        console.log(request)
        // return
        return request.success ? true : false;
    } catch (error) {
        console.log(error);
        return false;
    }
}


export const checkInFav = async (data) => {
    const user = await getUser()
    try {
        const options = {
            method: "POST",
            url: mainDomain + "client/favorites/in_favorite",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + user.token,
            },
            data
        };

        const request = await axios(options)
            .then((response) => response.data)
            .catch((error) => console.log(error));
        // console.log("request")
        // console.log(request)
        // return
        return request.data.in_favorite ? true : false;
    } catch (error) {
        console.log(error);
        return false;
    }
}


export const orderService = async (data) => {
    const user = await getUser()
    try {
        const options = {
            method: "POST",
            url: mainDomain + "client/services/order",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + user.token,
            },
            data
        };

        const request = await axios(options)
            .then((response) => response.data)
            .catch((error) => console.log(error));
        console.log("request")
        console.log(request)
        // return
        return request.data ? true : false;
    } catch (error) {
        console.log(error);
        return false;
    }
}


export const setDoctorAppointment = async (data) => {
    const user = await getUser()
    try {
        const options = {
            method: "POST",
            url: mainDomain + "client/appointments",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + user.token,
            },
            data
        };

        const request = await axios(options)
            .then((response) => response.data)
            .catch((error) => console.log(error.response));
        console.log("request")
        // console.log(request)
        // return
        return request.data ? true : false;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const submitHrajComment = async (data) => {
    const user = await getUser()
    try {
        const options = {
            method: "POST",
            url: mainDomain + "client/hraj/comments",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + user.token,
            },
            data
        };

        const request = await axios(options)
            .then((response) => response.data)
            .catch((error) => console.log(error.response));
        console.log("request")
        // console.log(request.data)
        // return
        return request.data ? request.data : false;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const deleteHrajComment = async (id) => {
    const user = await getUser()
    try {
        const options = {
            method: "POST",
            url: mainDomain + "client/hraj/comments/" + id,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + user.token,
            },
            data
        };

        const request = await axios(options)
            .then((response) => response.data)
            .catch((error) => console.log(error.response));
        console.log("request")
        // console.log(request)
        // return
        return request.data ? true : false;
    } catch (error) {
        console.log(error);
        return false;
    }
}


export const sendChatMessageDoctor = async (data) => {
    const user = await getUser()
    try {
        const options = {
            method: "POST",
            url: mainDomain + "client/hospitals/chat/message",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + user.token,
            },
            data
        };

        const request = await axios(options)
            .then((response) => response.data)
            .catch((error) => console.log(error.response));
        console.log("send request")
        // console.log(request)
        // return
        return request.id ? true : false;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const sendChatMessageStore = async (data) => {
    const user = await getUser()
    try {
        const options = {
            method: "POST",
            url: mainDomain + "client/chat/message",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + user.token,
            },
            data
        };

        const request = await axios(options)
            .then((response) => response.data)
            .catch((error) => console.log(error.response));
        console.log("send request")
        console.log(request)
        // return
        return request.id ? true : false;
    } catch (error) {
        console.log(error);
        return false;
    }
}
