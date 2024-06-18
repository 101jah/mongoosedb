// Import necessary modules and configure environment variables
require("dotenv").config();
const mongoose = require("mongoose");

// MongoDB URI from environment variables
const uri = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Database connection instance
const db = mongoose.connection;

// Event listeners for database connection
db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

db.once("open", () => {
  console.log("MongoDB database connection established successfully");

  // Define personSchema
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
      type: [String],
      default: [],
    },
  });

  // Create the Person model based on personSchema
  const Person = mongoose.model("Person", personSchema);

  // Function to create and save a single person
  const createAndSavePerson = function (done) {
    const johnDoe = new Person({
      name: "John Doe",
      age: 100,
      favoriteFoods: ["eggs", "fish", "fresh fruit"],
    });

    johnDoe.save(function (err, data) {
      if (err) return console.error(err);
      done(null, data);
    });
  };

  // Function to create many people
  const createManyPeople = function (arrayOfPeople, done) {
    Person.create(arrayOfPeople, function (err, data) {
      if (err) return console.error(err);
      done(null, data);
    });
  };

  // Function to find people by name
  const findPeopleByName = function (personName, done) {
    Person.find({ name: personName }, function (err, peopleFound) {
      if (err) return console.error(err);
      done(null, peopleFound);
    });
  };

  // Function to find one person by favorite food
  const findOneByFood = function (food, done) {
    Person.findOne({ favoriteFoods: food }, function (err, personFound) {
      if (err) return console.error(err);
      done(null, personFound);
    });
  };

  // Function to find a person by ID
  const findPersonById = function (personId, done) {
    Person.findById(personId, function (err, personFound) {
      if (err) return console.error(err);
      done(null, personFound);
    });
  };

  // Function to find a person by ID, edit their favorite foods, and save
  const findEditThenSave = function (personId, done) {
    const foodToAdd = "hamburger";

    Person.findById(personId, function (err, person) {
      if (err) return console.error(err);

      person.favoriteFoods.push(foodToAdd);

      person.save(function (err, updatedPerson) {
        if (err) return console.error(err);
        done(null, updatedPerson);
      });
    });
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

  // Export functions and Person model
  exports.PersonModel = Person;
  exports.createAndSavePerson = createAndSavePerson;
  exports.findPeopleByName = findPeopleByName;
  exports.findOneByFood = findOneByFood;
  exports.findPersonById = findPersonById;
  exports.findEditThenSave = findEditThenSave;
  exports.createManyPeople = createManyPeople;
  exports.removeById = removeById;
  exports.removeManyPeople = removeManyPeople;
  exports.queryChain = queryChain;
});
