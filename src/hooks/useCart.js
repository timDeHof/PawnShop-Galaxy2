import { useContext } from "react";
import { createProductOrder } from "../axios-services/product-orders";
import CartContext from "../CartContext";
import useAuth from "./useAuth";
import { updateQuantity, removeFromCart } from "../axios-services/product-orders";
import { createCart, setInactiveOrder } from "../axios-services/cart";

const useCart = () => {
  const { cart, setCart } = useContext(CartContext);
  const { token, user } = useAuth();

  const addToCart = async (orderId, productId, quantity) => {
    const productOrder = await createProductOrder(
      token,
      orderId,
      productId,
      quantity
    );

    console.log("this should be the product", productOrder);
    setCart({
      ...cart,
      product_orders: [...cart.product_orders, productOrder],
    });
  };

  const updateQty = async (productOrderId, qty) => {
    await updateQuantity(productOrderId, qty);
    console.log(cart.product_orders);
    const mappedItems = cart.product_orders.map((product_order) => {
      console.log("productOrder in map", product_order);
      if (product_order.id === productOrderId) {
        product_order.quantity = +qty;
      }
      return product_order;
    });
    console.log(mappedItems);
    setCart({ ...cart, product_orders: mappedItems });
  };

  const deleteItem = async (token, productOrderId) => {
    await removeFromCart(token, productOrderId);
    const filteredItems = cart.product_orders.filter((product_order) => {
      if (product_order.id !== productOrderId) {
        return product_order
      }
    })
    setCart({ ...cart, product_orders: filteredItems })
  }

  const checkout = async (orderId, userId) => {
    await setInactiveOrder(orderId, userId, false)
    const newCart = await createCart(userId, true)
    console.log('New Cart', newCart);
    setCart(newCart)
  }

  return {
    cart,
    setCart,
    addToCart,
    updateQty,
    deleteItem,
    checkout
  };
};

export default useCart;
