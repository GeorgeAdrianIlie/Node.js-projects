const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/fruitsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please review this!"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: {
    type: String,
    required: [true, "Please review this!"]
  }
});

const Fruit = mongoose.model("Fruit", fruitSchema);





const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please review this!"],
  },
  age: {
    type: Number,
    min: 1,
    max: 100
  },
  favouriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const mango = new Fruit({
  name: "Mango",
  score: 6,
  review: "Decent fruit."
});

mango.save();

Person.updateOne({name: "John"}, {favouriteFruit: mango},function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Succesfully updated");
    }
  });

/*const Amy = new Person({
  name: "Amy",
  age: 12,
  favouriteFruit: pineapple
});

person.save();*/

/*Fruit.find(function(err, fruits) {
  if (err) {
    console.log(err);
  } else {
    fruits.forEach(function(fruit) {
      console.log(fruit.name)
    });
    // mongoose.connection.close();
  }
});
*/
/*Person.find(function(err, people) {
  if (err) {
    console.log(err);
  } else {
    people.forEach(function(person) {
      console.log(person.name)
    });
    mongoose.connection.close();
  }
});*/


/* Fruit.insertMany([kiwi, orange, banana], function(err){
  if (err){
    console.log(err);
  } else {
    console.log("Succesfully saved all the fruits to fruitsDB");
  }
}); */


/* fruit.updateOne({_id:jvfbjkumkfvjbdgnkvf}, {name: "Peach"}, function(err){
  if (err){
    console.log(err);
  } else {
    console.log("Succesfully updated the document.");
  }
}); */


/* Fruit.deleteOne({name: "John"}, function(err){
  if (err) {
    console.log(err);
  } else {
    console.log("Succesfully deleted the document.")
  }
}) */
