// Email validation
export const isValidEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  
  // Password validation
  export const isValidPassword = (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    return re.test(password);
  };
  
  // Username validation
  export const isValidUsername = (username) => {
    // Alphanumeric, 3-20 characters
    const re = /^[a-zA-Z0-9]{3,20}$/;
    return re.test(username);
  };
  
  // Form validation
  export const validateForm = (formData) => {
    const errors = {};
  
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      errors.email = 'Invalid email format';
    }
  
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (!isValidPassword(formData.password)) {
      errors.password = 'Password must be at least 8 characters long and include uppercase, lowercase, and numbers';
    }
  
    if (formData.username && !isValidUsername(formData.username)) {
      errors.username = 'Username must be 3-20 characters long and contain only letters and numbers';
    }
  
    return errors;
  };