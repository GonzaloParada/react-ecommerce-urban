import "./itemCount.css";
import { useState } from "react";
import Swal from "sweetalert2";

function ItemCount({ stock = 0, initial = 1, onAdd, price }) {
  const [count, setCount] = useState(initial);

  const add = () => {
    count >= stock
      ? Swal.fire({
          toast: true,
          text: `not enough stock`,
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
          icon: "error",
        })
      : setCount(count + 1);
  };

  const remove = () => {
    if (count > 1) setCount(count - 1);
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
