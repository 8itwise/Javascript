const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscribeSchema = new Schema({
  footerEmail:{
    type: String,
    required: true
  }

  });

mongoose.model('subscribeMail', subscribeSchema);
