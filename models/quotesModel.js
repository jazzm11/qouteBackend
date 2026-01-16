const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const quotesSchema = new Schema({
  quotes: {
    type: String,
  },
  brukernavn: {
    type: String,
    required: true,
  }
});

const Quotes = model("Quotes", quotesSchema);

module.exports = Quotes;