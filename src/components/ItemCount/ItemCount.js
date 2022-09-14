import "./itemCount.css";
import { useState } from "react";

function ItemCount({ stock = 0, initial = 1, onAdd, price }) {
  const [count, setCount] = useState(initial);

  const add = () => {
    count >= stock ? alert("no hay sufi stock") : setCount(count + 1);
  };

  const remove = () => {
    count > 1 ? setCount(count - 1) : alert("no hay mas productos por quitar");
  };
  return (
    <div className="itemCount">
      <div className="itemCount-btn-box">
        <button
          className="itemCount-btn"
          onClick={() => {
            remove();
          }}
        >
          -
        </button>
        <h3 className="cantidad">{count}</h3>
        <button
          className="itemCount-btn"
          onClick={() => {
            add();
          }}
        >
          +
        </button>
      </div>
      <button
        onClick={() => {
          onAdd(count);
        }}
        className="itemCount-btnAgregar"
      >
        ADD TO CHART {price}
      </button>
    </div>
  );
}

export default ItemCount;
