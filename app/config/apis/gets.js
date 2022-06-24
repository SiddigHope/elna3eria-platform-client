import axios from "axios";
import { mainDomain } from "../vars";
import UserClass from "../authHandler";

export const getUser = async () => {
    return UserClass.getUser();
};


export const getOrders = async () => {
    const user = await getUser()
    try {
        const options = {
            method: "GET",
            url: mainDomain + "client/orders",
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
        return request.data ? request.data : [];
    } catch (error) {
        console.log(error);
        return [];
    }
}

export const getOrder = async (id) => {
    const user = await getUser()
    try {
        const options = {
            method: "GET",
            url: mainDomain + "client/orders/" + id,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + user.token,
            },
        };

        const request = await axios(options)
            .then((response) => response.data)
            .catch((error) => console.log(error));
        // console.log(request.data)
        // return
        return request.success ? request.data : [];
    } catch (error) {
        console.log(error);
        return [];
    }
}

export const getDiscountedProducts = async () => {
    const user = await getUser()
    try {
        const options = {
            method: "GET",
            url: mainDomain + "client/products/discount",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + user.token,
            },
        };

        const request = await axios(options)
            .then((response) => response)
            .catch((error) => console.log(error));
        // console.log("request")
        // console.log(request)
        // return
        return request.status == 200 ? request.data.data : [];
    } catch (error) {
        console.log(error);
        return [];
    }
}

export const getFavStores = async () => {
    const user = await getUser()
    try {
        const options = {
            method: "GET",
            url: mainDomain + "client/favorites/stores",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + user.token,
            },
        };

        const request = await axios(options)
            .then((response) => response.data)
            .catch((error) => console.log(error));
        // console.log("request")
        // console.log(request)
        // return
        return request.success ? request.data : [];
    } catch (error) {
        console.log(error);
        return [];
    }
}


export const getFavProducts = async () => {
    const user = await getUser()
    try {
        const options = {
            method: "GET",
            url: mainDomain + "client/favorites/products",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + user.token,
            },
        };

        const request = await axios(options)
            .then((response) => response.data)
            .catch((error) => console.log(error));
        // console.log("request")
        // console.log(request)
        // return
        return request.success ? request.data : [];
    } catch (error) {
        console.log(error);
        return [];
    }
}

export const getAskMeOrders = async () => {
    const user = await getUser()
    try {
        const options = {
            method: "GET",
            url: mainDomain + "client/services/orders",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + user.token,
            },
        };

        const request = await axios(options)
            .then((response) => response.data)
            .catch((error) => console.log(error));
        // console.log("request")
        // console.log(request)
        // return
        return request.success ? request.data : [];
    } catch (error) {
        console.log(error);
        return [];
    }
}

export const getMyDoctorAppointments = async () => {
    const user = await getUser()
    try {
        const options = {
            method: "GET",
            url: mainDomain + "client/appointments",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + user.token,
            },
        };

        const request = await axios(options)
            .then((response) => response.data)
            .catch((error) => console.log(error));
        // console.log("request")
        // console.log(request)
        // return
        return request.success ? request.data : [];
    } catch (error) {
        console.log(error);
        return [];
    }
}

export const getDoctorConversation = async (id) => {
    const user = await getUser()
    try {
        const options = {
            method: "GET",
            url: mainDomain + "client/hospitals/chat/conversation/" + id,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + user.token,
            },
        };

        const request = await axios(options)
            .then((response) => response.data)
            .catch((error) => console.log(error));
        // console.log("request")
        // console.log(request)
        // return
        return request.success ? request.data : [];
    } catch (error) {
        console.log(error);
        return [];
    }
}

export const getStoreConversation = async (id) => {
    const user = await getUser()
    try {
        const options = {
            method: "GET",
            url: mainDomain + "client/chat/conversation/" + id,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + user.token,
            },
        };

        const request = await axios(options)
            .then((response) => response.data)
            .catch((error) => console.log(error));
        // console.log("request")
        // console.log(request)
        // return
        return request.success ? request.data : [];
    } catch (error) {
        console.log(error);
        return [];
    }
}

export const getMyReviews = async () => {
    const user = await getUser()
    try {
        const options = {
            method: "GET",
            url: mainDomain + "client/products/client/reviews",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + user.token,
            },
        };

        const request = await axios(options)
            .then((response) => response.data)
            .catch((error) => console.log(error));
        // console.log("request")
        // console.log(request)
        // return
        return request.success ? request.data : [];
    } catch (error) {
        console.log(error);
        return [];
    }
}