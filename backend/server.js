
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

// Product routes
const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);

const orderRoutes = require("./routes/orderRoutes");
app.use("/api/orders", orderRoutes);

// Home route
app.get("/", (req, res) => {
    res.send("Welcome to Nexora Backend!");
});

// MongoDB connection
// MongoDB connection
console.log("Mongo URI exists:", !!process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Nexora MongoDB Connected!");

        app.listen(process.env.PORT || 3000, () => {
            console.log("Nexora Server Running on Port 3000");
        });
    })
    .catch((error) => {
        console.log("MongoDB Connection Error:", error.message);
    });
