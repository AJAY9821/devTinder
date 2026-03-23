const validator = require("validator")

const validateSignUpAndDate = (req) => {

    const { firstName, lastName, password, emailId } = req.body

    if(!firstName || !lastName){
        throw new Error("Enter first and last name")
    }

    if(firstName.length < 4 || firstName.length > 25){
        throw new Error("First name must be between 4 and 25 characters")
    }

    if(!validator.isEmail(emailId)){
        throw new Error("Email syntax not correct")
    }

    if(!validator.isStrongPassword(password)){
        throw new Error("Password not strong enough")
    }
}

const validateEditProfileData = (req) =>{
    
const allowedEditField = ["age","gender","Skills","about","emailId","photoUrl"]

const isEditAllowed =  Object.keys(req.body).every(field => allowedEditField.includes(field))

  return isEditAllowed;
  
    

    
}

module.exports = {validateSignUpAndDate,
    validateEditProfileData
}