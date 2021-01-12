const express = require("express");
const mongojs = require("mongojs");

const app = express();

const databaseUrl = "fitness";
const collections = ["exercises"];

const db = mongojs(databaseUrl, collections);

db.on("error", error => {
    console.log("Database Error:", error);
});

// Set the app to listen on port 3000
app.listen(3000, () => {
    console.log("App running on port 3000!");
});