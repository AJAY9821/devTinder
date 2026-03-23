const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt= require("jsonwebtoken")



const userSchema = mongoose.Schema({
    firstName: {
        type:String,
        max:20,
        min:2,
        required:true
    },
    lastName: {
        type:String
    },
    emailId: {
        type:String,
        required:true,
        unique:true,
        trim:true,
       

    },
    password: {
        type:String,
        required:true,
       
    },
    age:{
        type:Number,
        min:18,
        required: true,
    
    },
    photoUrl:{
        type:String,
        default:"https://photoswaly.in/wp-content/uploads/2024/05/no-dp_40.webp",
          validate(value){
            if(!validator.isURL(value)){
                throw new Error("photo url not valid: "+ value)
            }

        },
    },
    about:{
        type:String,
        default:"this my about"
    },

    Skills:{
        type:[String]

    },
    gender:{
        type:String,
        validate(value){
        if(!["male","female","other"].includes(value)){
            throw new Error("gender data not valid")
        }

        }
    },
},{timestamps: true })

userSchema.methods.getJWT = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id }, 'jumanji@422');
    return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;

    const isPasswordValid = await bcrypt.compare(
        passwordInputByUser,
        user.password
    );

    return isPasswordValid;
};

const User = mongoose.model("User",userSchema);

module.exports = User