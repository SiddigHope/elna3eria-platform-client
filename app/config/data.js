import axios from "axios";
import { mainDomain } from "./vars";


// getting the main departments of the app + its stores
export const getDepartments = async () => {
  try {
    const options = {
      method: "POST",
      header: { "Content-Type": "application/json" },
    };

    const data = await fetch(mainDomain + "client/departments", options)
      .then((response) => response.json())
      .catch((error) => console.log(error));
    // console.log(data)
    return data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getStores = async (data) => {
  try {
    const options = {
      method: "POST",
      url: mainDomain + "client/departments/stores",
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
    return request.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getHrajCategories = async () => {
  try {
    const options = {
      method: "GET",
      url: mainDomain + "client/hraj/main-categories",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    const request = await axios(options)
      .then((response) => response.data)
      .catch((error) => console.log(error));

    // console.log(request)
    return request.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getProducts = async (data) => {
  try {
    const options = {
      method: "POST",
      url: mainDomain + "client/departments/stores",
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
    return request.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// searching for stores by the store name and its distance (long, lat)
export const storesSearch = async (lat, long, text) => {
  try {
    const options = {
      method: "POST",
      url: mainDomain + "client/stores/search",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: {
        lat: lat,
        long: long,
        search_key: text,
      },
    };

    const data = await axios(options)
      .then((response) => response.data)
      .catch((error) => console.log(error));

    // console.log(data.matches);

    return data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// getting product's categories and the products it self for certain store by the (store_id) param

export const productsCategories = async (data) => {

  try {
    const options = {
      method: "POST",
      url: mainDomain + "client/stores/categories",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data,
    };
    // console.log(options)

    const request = await axios(options)
      .then((response) => response.data)
      .catch((error) => console.log(error));


    return request.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const hrajProductsCategories = async (id) => {

  try {
    const options = {
      method: "GET",
      url: mainDomain + "client/hraj/main-categories/"+id,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    // console.log(options)

    const request = await axios(options)
      .then((response) => response.data)
      .catch((error) => console.log(error));


    return request.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};


// searching for products by the product name and the store_id
export const productsSearch = async (store_id, search_key) => {
  try {
    const options = {
      method: "POST",
      url: mainDomain + "client/products/search",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: {
        store_id,
        search_key,
      },
    };

    const data = await axios(options)
      .then((response) => response.data)
      .catch((error) => console.log(error));

    // console.log(store_id);

    return data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
