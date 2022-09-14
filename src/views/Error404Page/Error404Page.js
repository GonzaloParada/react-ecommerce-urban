import { Link } from "react-router-dom";
import "./error404Page.css";

function Error404Page() {
  return (
    <div className="error-container">
      <h2 className="error-message">
        Error 404 <br />
        not found
      </h2>
      <img
        src="/images/logo-circle.png"
        alt="error-404"
        className="error-img"
      />
      <Link to={"/"}>
        <button className="btn-error">Go to home</button>
      </Link>
    </div>
  );
}

export default Error404Page;
