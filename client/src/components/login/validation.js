const Validation = (userData) => {
    let errors = {};
  
    if (!/\S+@\S+.\S+/.test(userData.email)) {
      errors.email = "No es un email válido";
    }
    if (!userData.email) {
      errors.email = "El campo no puede estar vacío";
    }
    if (userData.email.length > 35) {
      errors.email = "No puede ser mayor a 35";
    }
    if (!/\d/.test(userData.password)) {
      errors.password = "Debe contener al menos 1 numero";
    }
    if (userData.password.length < 6) {
      errors.password = "Debe tener de 6 caracteres";
    }
    if (userData.password.length > 10) {
      errors.password = "No puede ser mayor a 10 caracteres";
    }
    return errors;
  };
  export default Validation;