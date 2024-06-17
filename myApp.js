require("dotenv").config();
mongoose = require("mongoose");

const uri = process.env.MONGO_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define personSchema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    default: 0, // Default value for age
  },
  favoriteFoods: {
    type: [String],
    default: [], // Default value for favoriteFoods as an empty array
  },
  // You can add more fields or validators here as needed
});

// Create the Person model based on personSchema
let Person = mongoose.model("Person", personSchema);

const createAndSavePerson = function (done) {
  var johnDoe = new Person({
    name: "John Doe",
    age: 100,
    favoriteFoods: ["eggs", "fish", "fresh fruit"],
  });

  johnDoe.save(function (err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

var arraryofPeople = [
  { name: "Jim", age: 34, favoriteFoods: ["pizza", "taco", "fries"] },
  { name: "Jake", age: 14, favoriteFoods: ["wine", "glass"] },
  { name: "Robert", age: 78, favoriteFoods: ["wine"] },
];

const createManyPeople = function (arrayOfPeople, done) {
  Person.create(arrayOfPeople, function (err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

const findPeopleByName = function (personName, done) {
  Person.find({ name: personName }, function (err, personFound) {
    if (err) return console.log(err);
    done(null, personFound);
  });
};

const findOneByFood = function (food, done) {
  Person.findOne({ favoriteFoods: food }, function (err, food) {
    if (err) return console.log(err);
  });
  done(null, food);
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

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
