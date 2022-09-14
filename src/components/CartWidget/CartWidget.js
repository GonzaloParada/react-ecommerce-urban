import "./cartWidget.css";
import { FaShoppingCart } from "react-icons/fa";
import { useContext } from "react";
import CartContext from "../../context/CartContext";

function CartWidget() {
  const { getQuantity } = useContext(CartContext);
  let quantity = getQuantity(CartContext);
  return (
    <div className="cart-widget">
      {quantity > 0 ? (
        <div className="cart-widget-container">
          <FaShoppingCart
            color="white"
            size="20px"
            onMouseOver={({ target }) =>
              (target.style.color = "rgb(255, 148, 148)")
            }
            onMouseOut={({ target }) => (target.style.color = "white")}
          />
          <div className="bubble-cart">{quantity}</div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default CartWidget;
