import { useState, useContext } from "react";
import "./checkout.css";
import { db } from "../../services/firebase";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  documentId,
  writeBatch,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import CartContext from "../../context/CartContext";
import Swal from "sweetalert2";

function Checkout() {
  const [isLoading, setIsLoading] = useState(false);
  const { cart, getQuantity, getTotal, clear } = useContext(CartContext);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAdress] = useState("");

  const navigate = useNavigate();

  const totalQuantity = getQuantity();
  const total = getTotal();

  const createOrder = async () => {
    if (firstname && lastname && phoneNumber && address) {
      setIsLoading(true);
      try {
        const objOrder = {
          buyer: {
            firstName: firstname,
            lastName: lastname,
            phone: phoneNumber,
            address: address,
          },
          items: cart,
          totalQuantity,
          total,
          date: new Date(),
        };

        const ids = cart.map((prod) => prod.id);

        const productsRef = collection(db, "products");

        const productsAddedFromFirestore = await getDocs(
          query(productsRef, where(documentId(), "in", ids))
        );

        const { docs } = productsAddedFromFirestore;

        const outOfStock = [];

        const batch = writeBatch(db);

        docs.forEach((doc) => {
          const dataDoc = doc.data();
          const stockDb = dataDoc.stock;

          const productAddedToCart = cart.find((prod) => prod.id === doc.id);
          const prodQuantity = productAddedToCart?.quantity;

          if (stockDb >= prodQuantity) {
            batch.update(doc.ref, { stock: stockDb - prodQuantity });
          } else {
            outOfStock.push({ id: doc.id, ...dataDoc });
          }
        });

        if (outOfStock.length === 0) {
          await batch.commit();

          const orderRef = collection(db, "orders");
          const orderAdded = await addDoc(orderRef, objOrder);
          Swal.fire({
            title: "Successful purchase!",
            text: `Your number id: ${orderAdded.id}`,
            icon: "Success",
            confirmButtonText: "OK",
            confirmButtonColor: "rgb(72, 255, 0)",
          });
          clear();
          setTimeout(() => {
            navigate("/");
          }, 3000);
        } else {
          Swal.fire({
            text: `products out of stock`,
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonColor: "rgb(255, 77, 77)",
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (isLoading) {
    return <h1>loading...</h1>;
  }

  return (
    <div className="form-container">
      <form className="form">
        <h2 className="form__title">Checkout</h2>
        <input
          required
          type="text"
          placeholder="fistname"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <input
          required
          type="text"
          placeholder="lastname"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <input
          required
          type="number"
          placeholder="Phone"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input
          required
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAdress(e.target.value)}
        />
        <button type="submit" className="btn-orden" onClick={createOrder}>
          BUY
        </button>
      </form>
    </div>
  );
}

export default Checkout;
