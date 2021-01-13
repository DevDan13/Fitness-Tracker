const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/populatedb",
    { useNewUrlParser: true, useFindAndModify: false });

// db.on("error", error => {
//     console.log("Database Error:", error);
// });

// Set the app to listen on port 3000
app.listen(3000, () => {
    console.log("App running on port", PORT);
});