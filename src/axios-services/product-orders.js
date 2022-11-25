import axios from "axios";

export async function getProductOrders() {
  try {
    const { data: products } = await axios.get("/api/product-orders");
    return products;
  } catch (err) {
    console.error(err);
  }
}

export async function createProductOrder(token, orderId, productId, quantity) {
  try {
    const { data: productOrder } = await axios.post("/api/product-orders", {
      orderId,
      productId,
      quantity,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return productOrder;
  } catch (err) {
    console.error(err);
  }
}
export async function removeFromCart(token, productOrderId) {
  try {
    const { data: productOrder } = await axios.delete(
      `/api/product-orders/${productOrderId}`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return productOrder;
  } catch (err) {
    console.error(err);
  }
}

export async function updateQuantity(productOrderId, quantity) {
  try {
    const { data: productOrder } = await axios.patch(
      `/api/product-orders/${productOrderId}`,
      {
        quantity,
      }
    );
    return productOrder;
  } catch (err) {
    console.error(err);
  }
}
