import "./item.css";
import { Link } from "react-router-dom";

function Item({ id, name, price, picURL }) {
  return (
    <div className="item">
      <div className="item__img-container">
        <img className="item__image" src={picURL} alt={name} />
      </div>
      <div className="item__content">
        <div className="item__info">
          <h2>{name}</h2>
          <p>{price} $</p>
        </div>

        <Link to={`/detail/${id}`} className="btn-buy">
          BUY
        </Link>
      </div>
    </div>
  );
}

export default Item;
