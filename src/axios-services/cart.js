import axios from "axios";

export async function getCartByUser(userId) {
  try {
    const {
      data: [cart],
    } = await axios.get(`/api/users/cart/${userId}`);

    return cart;
  } catch (err) {
    console.error(err);
  }
}

export async function createCart(userId, isActive) {
  try {
    const {
      data
    } = await axios.post(`/api/orders/`, {
      // withCredentials: true,
      // headers: {
      //   "Content-Type": "application/json",
      //   Authorization: `Bearer ${token}`,
      // },
      userId,
      isActive,
    });
    // console.log(data, "DATA from axios");
    return data;
  } catch (err) {
    console.error(err);
  }
}

export async function setInactiveOrder(orderId, userId, inactive) {
  try {
    const data = await axios.patch(`/api/orders/${orderId}`, {
      userId,
      isActive: inactive,
      // withCredentials: true,
      // headers: {
      //   "Content-Type": "application/json",
      //   Authorization: `Bearer ${token}`,
      // },
    });
    // console.log(data, "cart from axios");
    return data;
  } catch (err) {
    console.error(err);
  }
}