const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
require("dotenv").config();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Enable CORS
app.use(
  cors({
    origin: [
      "http://localhost:4000",
      "http://frontend-quotes.mcp.ikt-fag.no:4000",
    ],

    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// MongoDB Connection
const mongoURI = process.env.MONGO_URI;
const connectDB = require("./config/db");
connectDB(mongoURI);

// Route Imports
const quoteRoutes = require("./router/quoteRouter");
const userRoutes = require("./router/userRouter");

// User routes
app.use(userRoutes);

// Quote route
app.use(quoteRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
