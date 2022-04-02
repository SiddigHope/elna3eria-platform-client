import axios from "axios";
import { mainDomain } from "../../vars";
import UserClass from "../../authHandler";

export const getUser = async () => {
    return UserClass.getUser();
};

// storing new store in database
export const storeProduct = async (data) => {
    const user = await getUser();
    try {
        const options = {
            method: "POST",
            url: mainDomain + "client/hraj",
            headers: {
                "Content-Type": "multipart/from-data",
                Accept: "application/json",
                Authorization: "Bearer " + user.token,
            },
            data,
        };

        const request = await axios(options)
            .then((response) => response)
            // .catch((error) => console.log(error));

        console.log("request.data")
        console.log(request.data)

        return request.status == 200 || request.status == 201 ? true : false;
    } catch (error) {
        console.log(error.response.data);
        return false;
    }
};

export const updateProduct = async (data, id) => {
    const user = await getUser();
    try {
        const options = {
            method: "POST",
            url: mainDomain + "client/hraj/" + id + "?_method=PUT",
            headers: {
                "Content-Type": "multipart/from-data",
                Accept: "application/json",
                Authorization: "Bearer " + user.token,
            },
            data,
        };

        const request = await axios(options)
            .then((response) => response)
            .catch((error) => console.log(error.response));
            // console.log(request)
        return request.status == 200 || request.status == 201 ? true : false;
    } catch (error) {
        console.log(error.response);
        return false;
    }
};

export const deleteProduct = async (id) => {
    const user = await getUser();
    try {
        const options = {
            method: "DELETE",
            url: mainDomain + "client/hraj/" + id,
            headers: {
                "Content-Type": "multipart/from-data",
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
