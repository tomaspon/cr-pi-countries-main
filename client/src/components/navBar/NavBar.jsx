import { Link } from "react-router-dom";
import style from "./NavBar.module.css";

const NavBar = () => {
  return (
    <nav className={style.navContainer}>
      <li>
        <Link to="/home" style={{ color: "black" }} title="Home">
          Home
        </Link>
      </li>
      <hr
        style={{
          margin: "0",
          marginLeft: "50px",
          height: "6px",
          position: "relative",
          top: "10px",
          border: "solid 0.1px black",
        }}
      />
      <li>
        <Link to="/activity" style={{ color: "black" }} title="Create activity">
          Create activity
        </Link>
      </li>
      <li className={style.landingButton}>
        <Link to="/" style={{ color: "black" }} title="Go landing">
          ↩ Landing
        </Link>
      </li>
    </nav>
  );
};

export default NavBar;
