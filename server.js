const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => res.send("Server up and running"));

app.listen(5000, () => console.log(`Listening on port 5000!`));
