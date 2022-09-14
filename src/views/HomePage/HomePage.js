import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./homePage.css";

function HomePage() {
  useEffect(() => {
    console.log(process.env.REACT_APP_API_KEY);
  }, []);
  return (
    <div className="home-container">
      <div className="hero">
        <p>BRAVE</p>
        <p>BOLD</p>
        <p>URBAN</p>
      </div>
      <Link to={"/allproducts"}>
        <button className="hero__btn">SEE PRODUCTS</button>
      </Link>
    </div>
  );
}

export default HomePage;
