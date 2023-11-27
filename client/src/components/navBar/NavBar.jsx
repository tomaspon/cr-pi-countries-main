import { Link } from "react-router-dom";
import style from "./NavBar.module.css"

const NavBar = () => {

    return (
      <nav className={style.navContainer}>
          <li className={style.as}>
            <Link to="/home">Home</Link>
          </li>
          <li className={style.as}>
            <Link to="/activity">Create activity</Link>
          </li>
          <li className={style.landingButton}>
            <Link to="/">↩ Go landing</Link>
          </li>
      </nav>
    );
  };
  

export default NavBar