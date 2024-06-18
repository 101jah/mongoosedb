// Import necessary modules and configure environment variables
require("dotenv").config(); // Load environment variables from .env file
const mongoose = require("mongoose"); // Import Mongoose for MongoDB operations

// MongoDB URI from environment variables
const uri = process.env.MONGO_URI;

// Connect to MongoDB using Mongoose
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

  // Create the Person model based on personSchema
  const Person = mongoose.model("Person", personSchema);

  // Function to create and save a single person document
  const createAndSavePerson = function (done) {
    const johnDoe = new Person({
      name: "John Doe",
      age: 100,
      favoriteFoods: ["eggs", "fish", "fresh fruit"],
    });

    // Save the new person document to the database
    johnDoe.save(function (err, data) {
      if (err) return console.error(err);
      done(null, data); // Invoke callback with saved person data
    });
  };

  // Function to create multiple people documents
  const createManyPeople = function (arrayOfPeople, done) {
    // Use Mongoose's create method to insert multiple documents
    Person.create(arrayOfPeople, function (err, data) {
      if (err) return console.error(err);
      done(null, data); // Invoke callback with created people data
    });
  };

  // Function to find people by name
  const findPeopleByName = function (personName, done) {
    // Use the find method to query people by name
    Person.find({ name: personName }, function (err, peopleFound) {
      if (err) return console.error(err);
      done(null, peopleFound); // Invoke callback with found people
    });
  };

  // Function to find one person by favorite food
  const findOneByFood = function (food, done) {
    // Use findOne method to find a person by their favorite food
    Person.findOne({ favoriteFoods: food }, function (err, personFound) {
      if (err) return console.error(err);
      done(null, personFound); // Invoke callback with found person
    });
  };

  // Function to find a person by ID
  const findPersonById = function (personId, done) {
    // Use findById method to find a person by their MongoDB _id
    Person.findById(personId, function (err, personFound) {
      if (err) return console.error(err);
      done(null, personFound); // Invoke callback with found person
    });
  };

  // Function to find a person by ID, add "hamburger" to favoriteFoods, and save
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
      person.save(function (err, Person) {
        if (err) {
          console.error("Error saving person:", err);
          return done(err); // Pass the error to the callback
        }

        console.log("Person updated successfully:", Person);
        done(null, Person); // Pass the updated person to the callback
      });

      module.exports = {
        PersonModel: Person,
        findEditThenSave,
      };
    });
  };

  // Function to find and update a person's age
  const findAndUpdate = function (personName, done) {
    const ageToSet = 20;

    // Use findOneAndUpdate to find and update a person by their name
    Person.findOneAndUpdate(
      { name: personName }, // Query condition
      { age: ageToSet }, // Update field and value
      { new: true }, // Options: return the updated document
      function (err, updatedPerson) {
        if (err) {
          console.error("Error updating person:", err);
          return done(err); // Pass the error to the callback
        }

        console.log("Person updated successfully:", updatedPerson);
        done(null, updatedPerson); // Invoke callback with updated person
      },
    );
  };

  // Function to remove a person by ID
  const removeById = function (personId, done) {
    // Use findByIdAndRemove to remove a person by their MongoDB _id
    Person.findByIdAndRemove(personId, function (err, removedPerson) {
      if (err) {
        console.error("Error removing person:", err);
        return done(err); // Pass the error to the callback
      }

      console.log("Person removed successfully:", removedPerson);
      done(null, removedPerson); // Invoke callback with removed person
    });
  };

  // Function to remove people by name
  const removeManyPeople = function (done) {
    const nameToRemove = "Mary";

    // Use deleteMany to remove people by name
    Person.deleteMany({ name: nameToRemove }, function (err, result) {
      if (err) {
        console.error("Error removing people:", err);
        return done(err); // Pass the error to the callback
      }

      console.log("People removed successfully:", result);
      done(null, result); // Invoke callback with delete operation result
    });
  };

  // Function for querying using chaining methods
  const queryChain = function (done) {
    const foodToSearch = "burrito";

    // Use chaining methods to query people by favorite food and apply sorting, limiting, and selecting fields
    Person.find({ favoriteFoods: foodToSearch })
      .sort("name") // Sort results by name
      .limit(2) // Limit the number of results to 2
      .select("-age") // Exclude the age field from results
      .exec(function (err, data) {
        if (err) {
          console.error("Error querying:", err);
          return done(err); // Pass the error to the callback
        }

        console.log("Query result:", data);
        done(null, data); // Invoke callback with query result
      });
  };

  // Export functions and Person model for use in other modules
  module.exports = {
    PersonModel: Person,
    createAndSavePerson,
    findPeopleByName,
    findOneByFood,
    findPersonById,
    findEditThenSave,
    findAndUpdate,
    createManyPeople,
    removeById,
    removeManyPeople,
    queryChain,
  };
});
