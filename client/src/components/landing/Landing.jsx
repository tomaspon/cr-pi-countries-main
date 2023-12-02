import { Link } from "react-router-dom";
import style from "./Landing.module.css";
import fondoLanding from "../../assets/fondo.jpg";
import Login from "../login/Login";

const Landing = () => {
  return (
    <div
      className={style.landingContainer}
      style={{
        background: `url(${fondoLanding})`,
        backgroundSize: "contain",
        margin: "0",
        padding: "0",
        height: "100vh",
        width: "100vw",
      }}
    >
      <div className={style.landingContent}>
        <h1>Countries</h1>
        <p>
          Explore our world through our global platform, where you can discover
          detailed information about countries and find all kinds of unique
          activities. The platform makes it easy to find and create adventures,
          allowing you to contribute your own experiences. Connect with a global
          community of travelers, get recommendations, and begin your journey
          into the unknown. Join us to live diverse experiences from the comfort
          of your home.
        </p>
      </div>
      <Link to="/home">
        <button className={style.doubleButton}>¡LET'S GO!</button>
      </Link>
      <div>
        <Login />
      </div>
    </div>
  );
};

export default Landing;
