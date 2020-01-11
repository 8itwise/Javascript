const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");
const path = require('path');
const app = express();
const keys = require('./config/keys');
const db = require ('./config/database');
var enforce = require('express-sslify');

app.use(enforce.HTTPS({ trustProtoHeader: true }));

//Global promoise
mongoose.Promise = global.Promise;
//connect to mongoose
mongoose.connect(db.mongoURI, {
 useNewUrlParser: true
})

  .then(() => console.log("Connected to database....."))
  .catch(err => console.log(err));

//Load contact model
require('./models/Contact');
require('./models/newsletterEmail');

const Contact = mongoose.model('contactDetails');
const newsletterEmail = mongoose.model('subscribeMail');


app.engine('handlebars', exphbs({defaultLayout: 'main', helpers: {
    if_eq: function (a, b, opts) {
        if (a == b) // Or === depending on your needs
            return opts.fn(this);
        else
            return opts.inverse(this);
    }
}
}));


app.set('view engine', 'handlebars');

//Body parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use(express.static(path.join(__dirname, '/public')));


app.get('/', (req, res) =>{
  res.render('index');
});

app.get('/services', (req, res) =>{
  res.render('services');
});

app.get('/about', (req, res) =>{
  res.render('about');
});

app.get('/contact', (req, res) =>{
  res.render('contact');
});

app.get('/terms_and_conditions', (req, res) =>{
  res.render('terms_and_conditions');
});

app.get('/privacy_policy', (req, res) =>{
  res.render('privacy_policy');
});

//contact page form handler
app.post('/contact', (req, res) =>{

        const newUser = {
          fullName: req.body.fullName,
          email: req.body.email,
          companyName: req.body.companyName,
          typeOfCompany: req.body.typeOfCompany,
          subject: req.body.subject,
          message: req.body.message
        }

        new Contact(newUser)
          .save()
          .then(contact =>{
            console.log(newUser);
          })


        //send all user input to the email below
        var transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth:{
            user: 'Your Email',
            //uses password exported from the key.js file to log into the email
            pass:  keys.pass
          }
        });
        var mailOptions = {
          from: 'your email',
          to: 'your email or whichever email you want it to be sent to ',
          subject:'(' + req.body.companyName + ') ' + req.body.subject,
          text: "Full Name: " + req.body.fullName + "\n" + "Email: " + req.body.email + "\n" + "Company Name: " + req.body.companyName + "\n" + "Type Of Company: " +  req.body.typeOfCompany + "\n" + "Message: " +  req.body.message
        };


        transporter.sendMail(mailOptions, function(error, info){
          if(error){
            console.log(error);

          }
        });

        //sends message back to the client page 
      return res.json({"success": true, "msg":"One of our agents will be in touch soon!!!"});

});

//footer form handler
app.post('/footer', (req, res) =>{

    const newEmail = {
      footerEmail: req.body.email
    }

    //save form data to database
    new newsletterEmail(newEmail).save()

    //sends scucess message back to client page
    return res.json({"success": true, "msg":"Thank you for subscribing to our newsletter!!!"});
});


const port = process.env.PORT || 5000;

app.listen(port, () =>{
  console.log(`Server started on port ${port}`);
});
