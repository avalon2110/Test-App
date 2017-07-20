const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// connect to DB
mongoose.connect('mongodb://localhost/companyApp');
let db = mongoose.connection;

//Public files
app.use(express.static('public'));

//Load pug engine
app.set('views', "./views");
app.set('view engine', 'pug');

//Body-Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// import Model
var Company = require('./models/company');

//Check connection
db.once('open', function () {
  console.log('Connected to DB');
});

//Check for DB errors
db.on('error', function (err) {
  console.log(err);
});


// main page
app.get('/app', (req, res) =>{
Company.updateMoney();
Company.getCompanies((err, companies) =>{
  if(err){
    throw err;
  };
    res.render("index", {
      companies: companies,
    });
  });
});

// view company info
app.get('/get/:title', (req, res) => {
  let query = {
    title: req.params.title
  }
  Company.find(query, (err, company) =>{
    if(err){
      throw err;
    } else {
      res.send(company);
    }
  });
});

// add company
app.post('/add', function (req, res) {
  let company = new Company();

  company.title = req.body.title;
  company.earnings = req.body.earnings;
  company.allEarnings = req.body.earnings;
  company.parents = req.body.parents ;

  Company.findOneAndUpdate({title:req.body.parents},{ $push: { children: company }}, (err, mainCompany) => {
    if(err){
      throw err;
    }
  });
    company.save((err)=>{
    if(err){
      throw err;
    } else {
      res.redirect('/app');
    }
  });
});

// Edit company
app.post('/edit', (req, res) => {
  let company = {};
  company.title = req.body.newTitle;
  company.earnings = req.body.newEarnings;
  company.allEarnings = req.body.newEarnings;

  let query = {
    title : req.body.title
  }

  Company.update(query, company, (err) => {
    if(err){
      throw err;
    } else {
      res.redirect('/app')
    }
  });
});

// delete company
app.delete('/delete/:title', (req, res) =>{
  let query = {title : req.params.title};
  Company.deleteOne(query, (err) => {
    if(err){
      console.log(err);
    } else {
      res.send("Success");
    }
  });
});


app.listen(8888 , () => {
  console.log("server started on port 8888...")
})
