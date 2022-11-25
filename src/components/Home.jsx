import React from "react";
import styles from "../style/Products.module.css";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";

const Home = ({ products }) => {
  const { user } = useAuth();
  const { addToCart, cart } = useCart();
  if (user) {
    return (
      <div
        style={{
          backgroundImage: `url("https://res.cloudinary.com/fullstack-academy-student/image/upload/v1651532410/0x0_gcyvwp.jpg")`,
          width: "100vw",
          height: "100%",
          paddingBottom: "10rem",
        }}
      >
        <div className="home">
          <h1>Welcome, {user.username}</h1>
          <p> We Buy From Anywhere In The Galaxy </p>
          <p>We Buy And Sell Used/New products</p>
          <p>The Last PawnShop Left In The Milky Way</p>
          <p>Free Shipping!</p>
        </div>
        <h1 className="title"> Featured Products</h1>
        <div className={styles.postcard}>
          {products
            ? products.slice(7, 10).map((product, i) => {
                return (
                  <div key={i} className={styles.product}>
                    <Link
                      to={`/products/${product.id}`}
                      style={{
                        textDecoration: "none",
                        textAlign: "center",
                        color: "white",
                      }}
                    >
                      <h2 className={styles.productTitle}>{product.name}</h2>
                      <img
                        className={styles.productImg}
                        src={product.imageURL}
                      />
                    </Link>

                    <div className={styles.productPrice}>
                      <label className={styles.contentLabel}>PRICE:</label>{" "}
                      {product.price}₡
                    </div>
                    <div className={styles.productCondition}>
                      <label className={styles.contentLabel}>Condition:</label>{" "}
                      {product.condition ? " New" : " Used"}
                    </div>
                    <div className={styles.productDescription}>
                      <label className={styles.contentLabel}>
                        Description:
                      </label>{" "}
                      {product.description}
                    </div>
                    {user.isAdmin ? (
                      <>
                        <Link
                          to={`/admin/edit-form/${product.id}`}
                          className={styles.deleteProduct}
                        >
                          Edit
                        </Link>
                        <button
                          className={styles.deleteProduct}
                          onClick={async () => {
                            console.log(
                              "%cDeleted Product",
                              `background:linear-gradient(#E66465, #9198E5);
                                  padding: .3rem;
                                  color: white;
                                  border-radius: .5em`
                            );
                            await deleteProduct(product.id);
                            const filteredProducts = products.filter(
                              (product) => {
                                if (product.id !== product.id) return true;
                              }
                            );
                            setProducts(filteredProducts);
                          }}
                        >
                          Delete
                        </button>
                      </>
                    ) : (
                      <button
                        className={styles.addToCart}
                        onClick={() => {
                          addToCart(cart.id, product.id, 1);
                        }}
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                );
              })
            : null}
        </div>
      </div>
    );
  }
};
export default Home;
