import axios from "axios";

export async function getUsers() {
  try {
    const { data: users } = await axios.get("/api/users");
    return users;
  } catch (err) {
    console.error(err);
  }
}

export async function fetchUser(token) {
  try {
    const { data } = await axios.get("/api/users/me", {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function loginUser(username, password) {
  const { data } = await axios.post("/api/users/login", {
    username,
    password,
  });
  return data;
}

export async function registerUser(username, password, name, shippingAddress, billingAddress) {
  const { data } = await axios.post("/api/users/register", {
    username,
    password,
    name,
    shippingAddress,
    billingAddress
  })
  return data
}