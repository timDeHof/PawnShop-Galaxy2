import axios from "axios";

export async function getAllOrders() {
    try {
        const { data: orders } = await axios.get("/api/orders");
        return orders;
    } catch (err) {
        console.error(err);
    }
}