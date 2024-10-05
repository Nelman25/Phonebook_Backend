const express = require("express");
const app = express();

app.use(express.json());

let persons = [
	{
		id: "1",
		name: "Arto Hellas",
		number: "040-123456",
	},
	{
		id: "2",
		name: "Ada Lovelace",
		number: "39-44-5323523",
	},
	{
		id: "3",
		name: "Dan Abramov",
		number: "12-43-234345",
	},
	{
		id: "4",
		name: "Mary Poppendieck",
		number: "39-23-6423122",
	},
];

const date = new Date().toString();

app.get("/api/persons", (request, response) => {
	response.json(persons);
});

app.get("/info", (request, response) => {
	response.send(
		`<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`
	);
});

app.get("/api/persons/:id", (request, response) => {
	const id = request.params.id;
	const person = persons.find((person) => person.id === id);

	if (person) {
		response.json(person);
	} else {
		return response.status(404).end();
	}
});

app.delete("/api/persons/:id", (request, response) => {
	const id = request.params.id;
	const person = persons.find((person) => person.id === id);
	response.status(204).end();
});

app.post("/api/persons", (request, response) => {
	const body = request.body;

	if (!body.name || !body.number) {
		return response.json({ error: "content missing" });
	}

	const person = {
		id: Math.random() * 10000,
		name: body.name,
		number: body.number,
	};

	persons = persons.concat(person);
	console.log(persons);
	response.json(person);
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server is running in ${PORT}`));