import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../axios-services/products";
import useAuth from "../hooks/useAuth";
import SingleProduct from "./SingleProduct";
import styles from "../style/Products.module.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const getAllProducts = async () => {
      const allProducts = await getProducts();
      setProducts(allProducts);
    };
    getAllProducts();
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "0" }}> Products</h1>
      {user.isAdmin ? (
        <Link to="/admin/product-form">
          <div style={{ textAlign: "center" }}>
            <button
              className={styles.deleteProduct}
              style={{ textAlign: "center", marginBottom: "2rem" }}
            >
              Add a New Product
            </button>
          </div>
        </Link>
      ) : null}
      <div className={styles.postcard}>
        {products
          ? products.map((product, i) => {
              return (
                <SingleProduct
                  key={`product${i}`}
                  product={product}
                  products={products}
                  setProducts={setProducts}
                />
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Products;
