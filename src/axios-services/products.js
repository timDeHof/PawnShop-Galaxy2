import axios from "axios";

export async function getProducts() {
    try {
        const { data: products } = await axios.get("/api/products");
        return products;
    } catch (err) {
        console.error(err);
    }
}

export async function deleteProduct(productId) {
    try {
        const { data: product } = await axios.delete(`/api/products/${productId}`);
        return product;
    } catch (err) {
        console.error(err);
    }
}

export async function createProduct(
    name,
    price,
    description,
    condition,
    imageURL,
) {
    try {
        const { data: product } = await axios.post(`/api/products`, {
            name,
            price,
            description,
            condition,
            imageURL,
        })
        return product;
    } catch (err) {
        console.error(err);
    }
}

export async function updateProduct(
    productId,
    name,
    price,
    description,
    condition,
    imageURL,
) {
    try {
        const { data: product } = await axios.patch(`/api/products/${productId}`, {
            name,
            price,
            description,
            condition,
            imageURL,
        })
        return product;
    } catch (err) {
        console.error(err);
    }
}

export async function getProductById(id) {
    try {
        const { data: product } = await axios.get(`/api/products/${id}`);
        return product;
    } catch (err) {
        console.error(err);
    }
}