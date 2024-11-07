const mongoose = require("mongoose");

const password = encodeURIComponent(process.argv[2]);
const url = `mongodb+srv://jonelvillaver735:${password}@cluster0.was36.mongodb.net/Phonebook?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

if (process.argv.length < 3) {
	// no password
	console.log("Please provide a password.");
	process.exit();
}

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
});

const Person = mongoose.model("Person", personSchema);

// password is the only argument. Show all the contacts
if (process.argv.length === 3) {
	Person.find({}).then((result) => {
		console.log("phonebook:");
		result.forEach((person) => console.log(`${person.name} ${person.number}`));
		mongoose.connection.close();
	});
}

// incomplete arguments. Either name or the number is missing
else if (process.argv.length === 4) {
	console.log("Please provide both name and number.");
	process.exit();
}

// name and number are provided. Add contact to the db
else if (process.argv.length === 5) {
	const person = new Person({
		name: process.argv[3],
		number: process.argv[4],
	});
	person.save().then((result) => {
		console.log(`added ${result.name} ${result.number} to the phonebook.`);
		mongoose.connection.close();
	});
}
