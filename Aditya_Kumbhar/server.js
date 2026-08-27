const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");

const authRouter = require("./router/authrouter");
const restaurantRouter = require("./router/restaurantRouter");

const logger = require("./middleware/logger");

const app = express();

app.use(express.json());
app.use(logger);

connectDB();

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to Restaurant API"
    });
});

app.use("/", authRouter);
app.use("/restaurants", restaurantRouter);

app.listen(4000, () => {
    console.log("Server running on port 4000");
});