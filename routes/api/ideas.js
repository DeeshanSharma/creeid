"use strict";

const express = require("express");
const router = express.Router();

const Idea = require("../../models/Idea");

// @route GET api/test
// description: API testing route
// access only dev
router.get("/test", (req, res) => res.send("API is working good keep it up"));

// @route GET api/ideas
// description: to get all the ideas
// access public
router.get("/ideas", (req, res) => {
	Idea.find((err, ideas) => {
		if (err) res.status(400).json({ error: "We messed up SHIT..! Do it again" });
		else {
			if (ideas.length === 0) res.status(404).json({ nothingFound: "I'm empty come on feed me some Ideas" });
			else res.json(ideas);
		}
	});
});

// @route GET api/ideas/:id
// description: to get a particular idea
// access public
router.get("/ideas/:id", (req, res) => {
	Idea.findById(req.params.id, (err, idea) => {
		if (err) res.status(400).json({ error: "We messed up SHIT..! Do it again" });
		else {
			if (idea.length === 0) res.status(404).json({ nothingFound: "Oops..! Something is wrong I didn't got anything" });
			else res.json(idea);
		}
	});
});

// @route POST api/new
// description: to create new idea
// access public
router.post("/new", (req, res) => {
	Idea.create(req.body, (err) => {
		if (err) res.status(400).json({ notCreated: "Shit..! I couldn't create that will you please try again, thats my fault, I'm really sorry" });
		else res.json({ created: "Yummy..! that was a nice idea buddy COOL, I need more come on you can do it..." });
	});
});

// @route PATCH api/update/:id
// description: to update an idea
// access public
router.patch("/update/:id", (req, res) => {
	Idea.findByIdAndUpdate(req.params.id, req.body, (err) => {
		if (err) res.status(400).json({ notUpdated: "Aghh..! I messed up boss, couldn't update this one" });
		else res.json({ updated: "OK so we need to update this, COOL, I'll handle it boss, don't worry" });
	});
});

// @route DELETE api/delete/:id
// description: to delete an idea
// access public
router.delete("/delete/:id", (req, res) => {
	Idea.findByIdAndRemove(req.params.id, (err) => {
		if (err) res.status(400).json({ notDeleted: "Damn..! I slept working we missed the shot my bad, please do that again" });
		else res.json({ deleted: "Umm..! Did we messed something why we deleted that..?" });
	});
});

module.exports = router;
