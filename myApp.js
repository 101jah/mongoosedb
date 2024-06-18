require("dotenv").config();
const mongoose = require("mongoose");

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
    type: [String],
    default: [],
  },
});

// Create the Person model based on personSchema
let Person = mongoose.model("Person", personSchema);

// Function to create and save a single person document
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

// Function to find people by name
const findPeopleByName = function (personName, done) {
  // Use the find method to query people by name
  Person.find({ name: personName }, function (err, peopleFound) {
    if (err) return done(err);
    done(null, peopleFound); // Invoke callback with found people
  });
};

// Function to find one person by favorite food
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

// Function to find a person by ID, add a favorite food, and save
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  // Step 1: Find the person by _id
  Person.findById(personId, function (err, person) {
    if (err) return done(err);

    if (!person) {
      console.log("Person not found");
      return done(new Error("Person not found"));
    }

    // Step 2: Modify the favoriteFoods array
    person.favoriteFoods.push(foodToAdd);

    // Step 3: Save the updated person
    person.save(function (err, data) {
      if (err) return done(err);
      done(null, data); // Invoke callback with saved person
    });
  });
};

// Function to find and update a person's age
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  // Use findOneAndUpdate to find and update a person by their name
  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    function (err, updatedPerson) {
      if (err) return done(err);
      done(null, updatedPerson); // Invoke callback with updated person
    }
  );
};

// Function to remove a person by ID
const removeById = (personId, done) => {
  // Use findByIdAndRemove to remove a person by their MongoDB _id
  Person.findByIdAndRemove(personId, function (err, removedPerson) {
    if (err) return done(err);
    done(null, removedPerson); // Invoke callback with removed person
  });
};

// Function to remove people by name
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  // Use deleteMany to remove people by name
  Person.deleteMany({ name: nameToRemove }, function (err, result) {
    if (err) return done(err);
    done(null, result); // Invoke callback with delete operation result
  });
};

// Function for querying using chaining methods
const queryChain = (done) => {
  const foodToSearch = "burrito";

  // Use chaining methods to query people by favorite food and apply sorting, limiting, and selecting fields
  Person.find({ favoriteFoods: foodToSearch })
    .sort("name")
    .limit(2)
    .select("-age")
    .exec(function (err, data) {
      if (err) return done(err);
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
  removeById,
  removeManyPeople,
  queryChain,
};
