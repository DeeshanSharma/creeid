const express = require("express");
const IdeasAPI = require("./routes/api/ideas");
const connectDB = require("./database/CreeidDB");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", IdeasAPI);

connectDB();

app.get("/", (req, res) => res.send("Server up and running"));

app.listen(5000, () => console.log(`Listening on port 5000!`));
