import "./itemDetail.css";
import { useState, useContext } from "react";
import CartContext from "../../context/CartContext";
import { Link } from "react-router-dom";
import ItemCount from "../ItemCount/ItemCount";
//import NotificationContext from "../../notification/Notification";
function ItemDetail({ id, description, name, picURL, price, stock, brand }) {
  const [quantityToAdd, setQuantityToAdd] = useState(0);
  const { addItem, getProductQuantity } = useContext(CartContext);

  const handleOnAdd = (quantity) => {
    setQuantityToAdd(quantity);

    const productToAdd = {
      id,
      name,
      price,
      quantity,
      picURL,
    };
    addItem(productToAdd);
  };

  const productQuantity = getProductQuantity(id);

  return (
    <div className="item-detail">
      <div className="img-container">
        <img src={picURL} alt={name} />
      </div>
      <div className="item-detail__info">
        <h2>{name}</h2>
        <p>{description}</p>
        <p>brand: {brand}</p>
        {quantityToAdd === 0 ? (
          <ItemCount
            onAdd={handleOnAdd}
            stock={stock}
            initial={productQuantity}
          />
        ) : (
          <Link className="btn-go-chart" to="/cart">
            GO TO CHART
          </Link>
        )}
      </div>
    </div>
  );
}

export default ItemDetail;
