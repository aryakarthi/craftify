import axios from "axios";

export const baseURL = "http://localhost:5001/sarah-creations/us-central1/app";

export const validateUserJWTToken = async (token) => {
  try {
    const res = await axios.get(`${baseURL}/api/users/jwtVerification`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.data.data;
  } catch (err) {
    return null;
  }
};

// get all the users
export const getAllUsers = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/users/all`);
    return res.data.data;
  } catch (err) {
    return null;
  }
};

// add new product
export const addNewProduct = async (data) => {
  try {
    const res = await axios.post(`${baseURL}/api/products/create`, { ...data });
    return res.data.data;
  } catch (err) {
    return null;
  }
};

// get all the products
export const getAllProducts = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/products/all`);
    return res.data.data;
  } catch (err) {
    return null;
  }
};

// delete a product
export const deleteAProduct = async (productId) => {
  try {
    const res = await axios.delete(
      `${baseURL}/api/products/delete/${productId}`
    );
    return res.data.data;
  } catch (err) {
    return null;
  }
};

export const addUserReview = async (productId, user_review) => {
  try {
    const res = await axios.post(
      `${baseURL}/api/products/addUserReview/${productId}`,
      { userReview: user_review }
    );
    return res.data.data;
  } catch (error) {
    return null;
  }
};

// add new items to  the cart
export const addNewItemToCart = async (user_id, data, size) => {
  try {
    const res = await axios.post(
      `${baseURL}/api/products/addToCart/${user_id}/${size}`,
      { ...data }
    );
    return res.data.data;
  } catch (error) {
    return null;
  }
};

// get all the cart items
export const getAllCartItems = async (user_id) => {
  try {
    const res = await axios.get(
      `${baseURL}/api/products/getCartItems/${user_id}`
    );
    return res.data.data;
  } catch (error) {
    return null;
  }
};

// change item quantity
export const changeItemQuantity = async (user_id, productId, type, size) => {
  console.log(user_id, productId, type, size);
  try {
    const res = await axios.post(
      `${baseURL}/api/products/updateCart/${user_id}`,
      null,
      { params: { productId: productId, type: type, size: size } }
    );
    return res.data.data;
  } catch (error) {
    return null;
  }
};

// add new items to favourites
export const addNewItemToFav = async (user_id, data) => {
  try {
    const res = await axios.post(
      `${baseURL}/api/products/addToFav/${user_id}`,
      { ...data }
    );
    return res.data.data;
  } catch (error) {
    return null;
  }
};

// get all the fav items
export const getAllFavItems = async (user_id) => {
  try {
    const res = await axios.get(
      `${baseURL}/api/products/getFavItems/${user_id}`
    );
    return res.data.data;
  } catch (error) {
    return null;
  }
};

// delete a product
export const removeItemsFromFav = async (user_id, product_id) => {
  try {
    const res = await axios.delete(
      `${baseURL}/api/products/removeFromFav/${user_id}/${product_id}`
    );
    return res.data.data;
  } catch (err) {
    return null;
  }
};

// create new order
export const createOrder = async (data) => {
  try {
    const res = await axios.post(`${baseURL}/api/products/neworder`, {
      ...data,
    });
    return res.data.data;
  } catch (err) {
    return null;
  }
};

// get all orders
export const getAllOrders = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/products/allorders`);
    return res.data.data;
  } catch (error) {
    return null;
  }
};

// update the order status
export const updateOrderStatus = async (order_id, status) => {
  try {
    const res = await axios.post(
      `${baseURL}/api/products/updateOrderStatus/${order_id}`,
      null,
      { params: { status: status } }
    );
    return res.data.data;
  } catch (error) {
    return null;
  }
};

// update the order status
export const updatePayStatus = async (order_id, paymentStatus) => {
  try {
    const res = await axios.post(
      `${baseURL}/api/products/updatePayStatus/${order_id}`,
      null,
      { params: { paymentStatus: paymentStatus } }
    );
    return res.data.data;
  } catch (error) {
    return null;
  }
};
