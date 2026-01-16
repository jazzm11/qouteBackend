const Quotes = require("../models/quotesModel");

// Get all quotes
exports.getAllQuotes = async (req, res) => {
  try {
    const quotes = await Quotes.find();
    res.json(quotes);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get random quote
exports.getRandomQuote = async (req, res) => {
  try {
    const count = await Quotes.countDocuments();
    const random = Math.floor(Math.random() * count);
    const quote = await Quotes.findOne().skip(random);
    res.json(quote);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get quote by author username
exports.getQuoteByUsername = async (req, res) => {
  const brukernavn = req.params.brukernavn;
  try {
    const quote = await Quotes.find({ brukernavn: brukernavn });
    if (!quote) {
      return res.status(404).json({ message: "Quote not found" });
    }
    res.json(quote);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get logged in user's quotes
exports.getUserQuotes = async (req, res) => {
  const brukernavn = req.params.brukernavn;
  try {
    const usersQuotes = await Quotes.find({ brukernavn: brukernavn });
    if (!usersQuotes) {
      return res.status(404).json({ message: "User's quotes not found" });
    }
    res.json(usersQuotes);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Post new quote
exports.postNewQuote = async (req, res) => {
  try {
    const { quotes, brukernavn } = req.body;
    if (req.body.quotes.length < 10) {
      return res
        .status(404)
        .json({ message: "It must be more than 10 charaters" });
    } else if (req.body.quotes.length > 100) {
      return res
        .status(404)
        .json({ message: "It has to be less than 100 characters" });
    }
    const newQuote = new Quotes({ quotes, brukernavn });
    await newQuote.save();
    res.status(201).json(newQuote);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Edit quote
exports.editQuote = async (req, res) => {
  try {
    const { id } = req.params;
    const { quotes } = req.body;

    const updatedQuote = await Quotes.findByIdAndUpdate(
      id,
      { quotes },
      { new: true }
    );

    if (!updatedQuote) {
      return res.status(404).json({ message: "Quote not found" });
    }

    res.status(200).json({
      message: "Quote updated successfully",
      data: updatedQuote,
    });
  } catch (error) {
    console.error("Error updating quotes:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Quote
exports.deleteQuote = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedQuote = await Quotes.findByIdAndDelete(id);

    if (!deletedQuote) {
      return res.status(404).json({ message: "Quote not found" });
    }
    res.status(200).json({
      message: "Quote deleted successfully",
      data: deletedQuote,
    });
  } catch (error) {
    console.error("Error deleting quotes:", error);
    res.status(500).json({ message: "Server error" });
  }
};
