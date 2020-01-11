const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  fullName:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },

  companyName:{
    type: String,
    required: true
  },

  typeOfCompany:{
    type: String,
    required: true
  },


  subject:{
    type: String,
    required: true
  },

  message:{
    type: String,
    required: true
  },

});

mongoose.model('contactDetails', contactSchema)
