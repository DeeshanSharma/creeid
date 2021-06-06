const mongoose = require("mongoose");

const ideaSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now(),
	},
	description: {
		type: String,
	},
});

const Idea = mongoose.model("Idea", ideaSchema);

module.exports = Idea;
