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
