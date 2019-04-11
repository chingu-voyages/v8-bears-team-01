export const handleValidation = (name,email,password,comfirmPassword,type )=> {
 // const { email, password, comfirmPassword, name } = this.state;
    let errorMsg = ''
    let response = true
  if (type === "signup") {
      if (!email || !password || !name) {
           errorMsg = "All fields are required";
            response = false
      }
      if (password.length < 6 || password.length > 30) {
         
              errorMsg= "Password must be between 6 and 30 characters"
              response = false
         
      }
      if (password.includes(" ")) {
          errorMsg = "Password cannot contain spaces";
          response = false
      }
      if (comfirmPassword !== password) {
          errorMsg = "Passwords must match";
          response = false
      }
  }

  if (type === "login") {
      if (!email || !password) {
          errorMsg = "All fields are required";
          response = false
      }
  }

  if (!email.includes("@")) {
     errorMsg= "Invalid email address." 
      response = false
  }

  if (
      email.includes("'") ||
      email.includes('"') ||
      password.includes("'") ||
      password.includes('"')
  ) {
       errorMsg= "Fields cannot contain ' or \"";
      response = false
  }

  return { errorMsg, response }
};