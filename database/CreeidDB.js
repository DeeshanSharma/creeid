"use strict";

require("dotenv").config({ path: __dirname + "/.env" });
const mongoose = require("mongoose");

function connectDB() {
	mongoose.connect(process.env.CONNECTIONURL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, (err) => {
		if (err) console.log(`Database not connected: ${err}`);
		else console.log("Database Connected");
	});
}

module.exports = connectDB;
