const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {

  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  const query = req.body.cityName
  const apiKey = "048bf718dce198182f2dc467c3075d14"
  const unit = "metric"
  const openweathermap = "https://api.openweathermap.org/data/2.5/weather?q="
  const url = openweathermap + query + "&units=" + unit + "&appid=" + apiKey

  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp
      console.log(temp);
      const description = weatherData.weather[0].description;
      console.log(description);
      const icon = weatherData.weather[0].icon;
      const weatherIcon = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

      res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celsius.</h1>");
      res.write("<p>The weather is: " + description + "<img src=" + weatherIcon + ">" + " </p>");
      res.send()
    })
  })
})

app.listen(3000, function() {

  console.log("Server is running on port 3000.");

})
