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

    // Step 1: Find the person by _id
    Person.findById(personId, function (err, person) {
      if (err) {
        console.error("Error finding person:", err);
        return done(err); // Pass the error to the callback
      }

      if (!person) {
        console.log("Person not found");
        return done(new Error("Person not found")); // Handle case where person is not found
      }

      // Step 2: Modify the favoriteFoods array
      person.favoriteFoods.push(foodToAdd);

      // Step 3: Use markModified to notify Mongoose that favoriteFoods array is modified
      person.markModified("favoriteFoods");

      // Step 4: Save the updated person
      person.save(function (err, updatedPerson) {
        if (err) {
          console.error("Error saving person:", err);
          return done(err); // Pass the error to the callback
        }

        console.log("Person updated successfully:", updatedPerson);
        done(null, updatedPerson); // Pass the updated person to the callback
      });
    });
  };

  // Function to find and update a person's age
  const findAndUpdate = function (personName, done) {
    const ageToSet = 20;

    Person.findOneAndUpdate(
      { name: personName },
      { age: ageToSet },
      { new: true },
      function (err, updatedPerson) {
        if (err) {
          console.error("Error updating person:", err);
          return done(err);
        }

        console.log("Person updated successfully:", updatedPerson);
        done(null, updatedPerson);
      },
    );
  };

  // Function to remove a person by ID
  const removeById = function (personId, done) {
    Person.findByIdAndRemove(personId, function (err, removedPerson) {
      if (err) {
        console.error("Error removing person:", err);
        return done(err);
      }

      console.log("Person removed successfully:", removedPerson);
      done(null, removedPerson);
    });
  };

  // Function to remove people by name
  const removeManyPeople = function (done) {
    const nameToRemove = "Mary";

    Person.deleteMany({ name: nameToRemove }, function (err, result) {
      if (err) {
        console.error("Error removing people:", err);
        return done(err);
      }

      console.log("People removed successfully:", result);
      done(null, result);
    });
  };

  // Function for querying using chaining
  const queryChain = function (done) {
    const foodToSearch = "burrito";

    Person.find({ favoriteFoods: foodToSearch })
      .sort("name")
      .limit(2)
      .select("-age")
      .exec(function (err, data) {
        if (err) {
          console.error("Error querying:", err);
          return done(err);
        }

        console.log("Query result:", data);
        done(null, data);
      });
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
  exports.findAndUpdate = findAndUpdate;
  exports.createManyPeople = createManyPeople;
  exports.removeById = removeById;
  exports.removeManyPeople = removeManyPeople;
  exports.queryChain = queryChain;
});
