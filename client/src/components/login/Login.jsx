import { useState, useEffect } from "react";
import Validation from "./validation";
import style from "./Login.module.css";
import { Link } from "react-router-dom";

const Login = ({ login }) => {
  const [userData, setUserDate] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  useState({});

  // Maneja cambios en el input
  const handleChange = (event) => {
    setUserDate({
      ...userData,
      // Sobrescribe la p rop 'name' con el valor ingresado en el input
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = Validation(userData); // Cambia "validationErrors" a "errors"
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // No hay errores de validación, llamar a login
      login(userData);
    }
  };

  useEffect(() => {
    // Validar errores al cambiar userData
    if (userData.email !== "" || userData.password !== "") {
      const validationErrors = Validation(userData);
      setErrors(validationErrors);
    }
  }, [userData]);

  return (
    <div>
      <form onSubmit={handleSubmit} className={style.loginContainer}>
        <div className={style.loginContent}>
          <h2 className={style.signInTitle}>SIGN IN ↘ </h2>
          <label htmlFor="email" className={style.labelform}></label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            placeholder="  Email"
          />
          {errors.email && <p className={style.error}>{errors.email}</p>}{" "}
          {/* Muestra el error si existe */}
          <hr style={{ borderStyle: "none" }} />
          <label htmlFor="password" className={style.labelform}></label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            maxLength="10"
            placeholder="  Password"
          />
          {errors.password && <p className={style.error}>{errors.password}</p>}{" "}
          {/* Muestra el error si existe */}
          <hr style={{ borderStyle: "none" }} />
          <button
            className={style.logginbutton}
            disabled={
              userData.email === "" ||
              userData.password === "" ||
              errors.email ||
              errors.password
            }
          >
            LOGIN
          </button>
          <div>
            <Link to="/register">
              <p
                className={style.noAccButton}
                style={{ position: "relative", left: "30px", color: "black" }}
              >
                ¿No tienes una cuenta?
              </p>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
