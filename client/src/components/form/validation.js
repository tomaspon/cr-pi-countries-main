const validation = (activity) => {
  
    const errors = {};
  
    if (activity.name === "") {
      errors.name = "The field cannot be empty";
    }
     if (!/^[a-zA-Z]+$/.test(activity.name)){
        errors.name = "Cannot contain numbers or symbols"
    } 
    if (activity.duration === "00:00") {
      errors.duration = "Select more time";
    }
    if (activity.countries.length === 0) {
      errors.countries = "Select at least one country";
    }
    return errors;
  };
  
  export default validation;