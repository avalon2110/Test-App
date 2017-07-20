const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  earnings:{
    type: Number,
    required: true
  },
  allEarnings:{
    type: Number
  },
  parents:{
    type: String
  },
  children:{
    type: Array,
    default: []
  },
  createDate:{
    type: Date,
    default: Date.now
  }
});

var Company = module.exports = mongoose.model("Company", companySchema);

// get Companies
module.exports.getCompanies = (callback) =>{
  Company.find(callback);
};

function calculate(obj){
    var sum = 0;
    for(var i = 0; i < obj.children.length; i++){
      sum += obj.children[i].earnings;
    }
  return sum;
};

//update earnings
module.exports.updateMoney = () => {
  Company.find((err, companies) => {
    if(err){
      throw err;
    };
    companies.forEach(function(company) {
    company.allEarnings = company.earnings + calculate(company);
    company.save();
    });
  });
};
