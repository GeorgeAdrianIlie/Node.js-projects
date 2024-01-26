const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/", function(req, res){

var mass = parseFloat(req.body.mass);
var height = parseFloat(req.body.height);

var result = mass / (height * height);

  res.send("Your BMI is " + result);
});


app.listen(3000, function(){
  console.log("Server is runnig!");
});
