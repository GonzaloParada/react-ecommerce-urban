import "./itemList.css";
import Item from "../Item/Item";
import { memo } from "react";

function ItemList({ products }) {
  return (
    <div className="item-list">
      {products.map((product) => (
        <Item key={product.id} {...product} />
      ))}
    </div>
  );
}

export default memo(ItemList);
