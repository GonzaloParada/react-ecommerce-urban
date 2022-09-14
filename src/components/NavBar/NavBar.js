import { NavLink, Link } from "react-router-dom";
import "./navBar.css";
import CartWidget from "../CartWidget/CartWidget";

function NavBar() {
  return (
    <nav className="header">
      <div className="header__logo">
        <Link to={"/"} className="header__logo">
          URBAN
        </Link>
      </div>
      <ul className="nav">
        <li className="nav__li">
          <NavLink
            to={"/category/shoes"}
            className={({ isActive }) =>
              isActive ? "nav__link nav__link-active" : "nav__link"
            }
          >
            Shoes
          </NavLink>
        </li>
        <li className="nav__li">
          <NavLink
            to={"/category/t-shirt"}
            className={({ isActive }) =>
              isActive ? "nav__link nav__link-active" : "nav__link"
            }
          >
            T-Shirt
          </NavLink>
        </li>
        <li className="nav__li">
          <NavLink
            to={"/category/hoodies"}
            className={({ isActive }) =>
              isActive ? "nav__link nav__link-active" : "nav__link"
            }
          >
            Hoddies
          </NavLink>
        </li>
        <li className="nav__li">
          <Link to={"/cart"} className="link-cart">
            <CartWidget />
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
