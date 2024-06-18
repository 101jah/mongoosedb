require("dotenv").config();

const mongoose = require("mongoose"); // Import Mongoose for MongoDB operations
// MongoDB URI from environment variables
const uri = process.env.MONGO_URI;

// Connect to MongoDB using Mongoose
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define personSchema for MongoDB documents
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    default: 0,
  },
  favoriteFoods: {
    type: [String], // Array of strings for favorite foods
    default: [], // Default empty array
  },
});

let Person = mongoose.model("Person", personSchema);

const createAndSavePerson = function (done) {
  const johnDoe = new Person({
    name: "John Doe",
    age: 100,
    favoriteFoods: ["eggs", "fish", "fresh fruit"],
  });
  // Save the new person document to the database
  johnDoe.save(function (err, data) {
    if (err) return done(err);
    done(null, data); // Invoke callback with saved person data
  });
};

// Function to create multiple people documents
// Function to find people by name
const findPeopleByName = function (personName, done) {
  // Use the find method to query people by name
  Person.find({ name: personName }, function (err, peopleFound) {
    if (err) return done(err);
    done(null, peopleFound); // Invoke callback with found people
  });
};

// Function to find one person by favorite fromCharCode(:
// );
const findOneByFood = function (food, done) {
  // Use findOne method to find a person by their favorite food
  Person.findOne({ favoriteFoods: food }, function (err, personFound) {
    if (err) return done(err);
    done(null, personFound); // Invoke callback with found person
  });
};

// Function to find a person by ID
const findPersonById = function (personId, done) {
  // Use findById method to find a person by their MongoDB _id
  Person.findById(personId, function (err, personFound) {
    if (err) return done(err);
    done(null, personFound); // Invoke callback with found person
  });
};




const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, function (err, person) {
    if (err) return done(err);
    done(null, person); // Invoke callback with found person

    person.favoriteFoods.push(foodToAdd);
    person.save(function (err, data) {
      if (err) return done(err);
      done(null, data); // Invoke callback with saved person
    });
  });

  

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
