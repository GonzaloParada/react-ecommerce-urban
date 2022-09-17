import "./cart.css";
import { useContext } from "react";
import CartContext from "../../context/CartContext";
import { Link } from "react-router-dom";

function Cart() {
  const { getCart, getTotal, clear } = useContext(CartContext);
  const products = getCart();
  const total = getTotal();
  return (
    <div className="cart">
      <h3 className="cart__title">CART</h3>
      {products.length <= 0 ? (
        <div className="cart__empty">
          <p className="cart__text-empty">NO PRODUCTS</p>
          <Link to="/allproducts">
            <button className="cart__btn">ADD PRODUCTS</button>
          </Link>
        </div>
      ) : (
        <div className="cart__products">
          {products}
          <div className="cart__footer">
            <p className="cart__total">Total: $ {total}</p>
            <div className="cart__btn-container">
              <Link to="/checkout" className="cart__btn cart__btn-checkout">
                CHECKOUT
              </Link>
              <button className="cart__btn" onClick={clear}>
                EMPTY CART
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
