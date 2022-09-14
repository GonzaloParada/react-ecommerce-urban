import "./itemListContainer.css";
import Footer from "../Footer/Footer";
import ItemList from "../ItemList/ItemList";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Loader from "../Loader/Loader";
import { db } from "../../services/firebase";
import { getDocs, collection, query, where } from "firebase/firestore";
import { useEffect } from "react";

function ItemListContainer() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);

    const collectionRef = !categoryId
      ? collection(db, "products")
      : query(collection(db, "products"), where("category", "==", categoryId));

    getDocs(collectionRef)
      .then((response) => {
        const productsAdapted = response.docs.map((doc) => {
          const data = doc.data();
          return { id: doc.id, ...data };
        });
        setProducts(productsAdapted);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [categoryId]);

  if (loading) return <Loader />;

  if (products.length === 0) {
    return categoryId ? (
      <h2>No hay productos {categoryId}</h2>
    ) : (
      <h2>No hay productos disponibles</h2>
    );
  }
  return (
    <div className="item-list-container">
      <ItemList products={products} />
      <Footer />
    </div>
  );
}

export default ItemListContainer;
