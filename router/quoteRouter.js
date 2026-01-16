const express = require("express");
const router = express.Router();
const quoteController = require("../controller/quoteController");

// Route to get all quotes
router.get("/api/quotes", quoteController.getAllQuotes);

// Get random quote
router.get("/api/quote", quoteController.getRandomQuote);

// Route to get a quote by author username
router.get("/api/quotes/:brukernavn", quoteController.getQuoteByUsername);

// Route to get logged in user's quotes
router.get("/api/lagresitater/:brukernavn", quoteController.getUserQuotes);

// Route to post a new quote
router.post("/api/lagresitater", quoteController.postNewQuote);

// Route to edit user's quote
router.post("/api/lagresitater/edit/:id", quoteController.editQuote);

// Route to delete user's quote
router.delete("/api/lagresitater/delete/:id", quoteController.deleteQuote);

module.exports = router;