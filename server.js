const express = require("express");
const app = express();
const port = 3000;
require("dotenv").config();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

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
