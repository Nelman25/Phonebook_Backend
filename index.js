const express = require("express");
const app = express();
const morgan = require("morgan");

app.use(express.json());

const date = new Date();

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

const generateId = () => {
	const randomId = Math.random() * 100;
	return String(randomId);
};

const nameAlreadyExist = (name) => {
	const names = [...persons.map((person) => person.name.trim().toLowerCase())];
	return names.includes(name.toLowerCase().trim());
};

morgan.token("post-data", (req) => {
	return req.method === "POST" ? JSON.stringify(req.body) : "";
});
app.use(
	morgan(
		":method :url :status :res[content-length] - :response-time ms :post-data"
	)
);

app.get("/api/persons", (req, res) => {
	res.json(persons);
});

app.get("/info", (req, res) => {
	res.send(
		`<p>Phonebook has info for ${persons.length} people</p><br><p>${date}</p>`
	);
});

app.get("/api/persons/:id", (req, res) => {
	const id = req.params.id;
	const person = persons.find((person) => person.id === id);

	if (person) {
		res.json(person);
	} else {
		json.status(404).end();
	}
});

app.delete("/api/persons/:id", (req, res) => {
	const id = req.params.id;
	persons = persons.filter((person) => person.id !== id);

	res.status(204).end();
});

app.post("/api/persons", (req, res) => {
	const body = req.body;

	if (!body.name || !body.number) {
		return res.status(400).json({ error: "missing content" });
	}

	if (nameAlreadyExist(body.name)) {
		return res.status(400).json({ error: "Name already exist." });
	}

	const person = {
		name: body.name,
		number: body.number,
		id: generateId(),
	};

	persons = persons.concat(person);
	res.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
