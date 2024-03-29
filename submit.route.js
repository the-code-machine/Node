const express = require("express");
const Router = express.Router();
const submit= require('./submit.module');
const bodyParser = require('body-parser');
const App= require("./app");
const app = express();
const cors = require('cors');
const validator = require('validator');
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/submit',Router);
Router.post('/', async(req,res)=>{
    const {firstname,lastname,number,email,description}= req.body;
    if(!firstname || !lastname || !number || !email || !description){
        return res.status(400).json({message:'All fields are require'});    
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
      }
    
      // Additional validation for name (letters and spaces only)
      if (!validator.isAlpha(firstname.replace(/\s/g, '')) || !validator.isAlpha(lastname.replace(/\s/g, ''))) {
        return res.status(400).json({ message: 'Invalid name format' });
        
      }    if (!validator.isNumeric(number.toString()) || number.toString().length !== 10) {
        return res.status(400).json({ message: 'Invalid number format. Must be 10 digits' });
      }
    const newUser = new submit({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        number:req.body.number,
        email:req.body.email,
        description:req.body.email
    });
    try{
      
await newUser.save();
res.json({message: 'Data saved successfully'});
    } catch (err){
        console.error('error saving user to database :',err);
        res.status(500).json({message:'error saving user to database', error:err});
    }
});
module.exports = Router;
