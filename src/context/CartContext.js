import "./cartContext.css";
import { useState } from "react";
import { createContext } from "react";

const CartContext = createContext();

export function CartContextProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addItem = (item) => {
    if (!isInCart(item.id)) {
      setCart([...cart, item]);
    } else {
      const cartUpdated = cart.map((product) => {
        if (product.id === item.id) {
          const productUpdated = {
            ...product,
            quantity: item.quantity,
          };
          return productUpdated;
        } else {
          return product;
        }
      });
      setCart(cartUpdated);
    }
  };
  const clear = () => {
    setCart([]);
  };

  const getQuantity = () => {
    let accu = 0;
    cart.forEach((product) => {
      accu += product.quantity;
    });
    return accu;
  };

  const getCart = () => {
    const cartList = cart.map((product) => {
      return (
        <div className="cart-product" key={product.id}>
          <div className="cart-product__container">
            <img
              className="cart-product__img"
              src={product.picURL}
              alt={product.name}
            />
            <h2 className="cart-product__name">{product.name}</h2>
            <div className="cart-product__info">
              <p>Count: {product.quantity}</p>
              <p>Price: ${product.price}</p>
              <p>Subtotal: ${getProductSubtotal(product.id)}</p>
              <button
                className="cart-product__remove-btn"
                onClick={() => removeItem(product.id)}
              >
                Eliminar
              </button>
            </div>
          </div>
          <hr />
        </div>
      );
    });
    return cartList;
  };

  const removeItem = (id) => {
    const newCartWithoutProduct = cart.filter((product) => product.id !== id);
    setCart(newCartWithoutProduct);
  };
  const isInCart = (id) => {
    return cart.some((product) => product.id === id);
  };
  const getProductQuantity = (id) => {
    const product = cart.find((prod) => prod.id === id);
    return product?.quantity;
  };
  const getProductSubtotal = (id) => {
    const product = cart.find((prod) => prod.id === id);
    const subtotal = product?.price * product.quantity;
    return subtotal;
  };
  const getTotal = () => {
    let accu = 0;
    cart.forEach((prod) => {
      accu += prod.quantity * prod.price;
    });
    return accu;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        clear,
        isInCart,
        addItem,
        removeItem,
        getProductQuantity,
        getQuantity,
        getCart,
        getProductSubtotal,
        getTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
