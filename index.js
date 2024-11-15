require("dotenv").config();
const Person = require("./models/mongo");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(express.static("dist"));
app.use(cors());
app.use(express.json());

const date = new Date();

// let persons = [
//   {
//     id: "1",
//     name: "Arto Hellas",
//     number: "040-123456",
//   },
//   {
//     id: "2",
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//   },
//   {
//     id: "3",
//     name: "Dan Abramov",
//     number: "12-43-234345",
//   },
//   {
//     id: "4",
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//   },
// ];

const generateId = () => {
  const randomId = Math.random() * 100;
  return String(randomId);
};

morgan.token("post-data", (req) => {
  return req.method === "POST" ? JSON.stringify(req.body) : "";
});

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :post-data"
  )
);

app.get("/api/persons", (req, res) =>
  Person.find({}).then((contacts) => res.json(contacts))
);

app.get("/info", (req, res) => {
  const contacts = Note.find({}).then((result) => result);
  res.send(
    `<p>Phonebook has info for ${persons.length} people</p><br><p>${date}</p>`
  );
});

app.get("/api/persons/:id", (req, res) => {
  Person.find(req.params.id).then((person) => {});
});
//   const id = req.params.id;
//   const person = persons.find((person) => person.id === id);

//   if (person) {
//     res.json(person);
//   } else {
//     json.status(404).end();
//   }
// });

app.delete("/api/persons/:id", async (req, res) => {
  const id = req.params.id;
  const persons = await Note.find({});
  persons.filter((person) => person.id !== id);

  // persons = persons.filter((person) => person.id !== id);

  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({ error: "missing content" });
  }

  try {
    const newPerson = new Person({
      name: body.name,
      number: body.number,
    });

    newPerson.save().then((savedPerson) => {
      res.json(savedPerson);
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
