const express = require("express");
const serverless = require("serverless-http");
const path = require("path");

const app = express();
app.use(express.json());

// Import routes
const notesRoutes = require("../server/routes/notes");

// Main route
app.use("/notes", notesRoutes);

// For frontend pages
app.use("/", express.static(path.join(__dirname, "../public")));

module.exports = app;
module.exports.handler = serverless(app);
