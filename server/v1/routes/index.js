import express from "express"; // import the express module
import Auth from "./auth.js"
import Home from "./home.js"
import { Verify } from "../middlewares/Verify.js";

const app = express(); // Create an app object

app.disable("x-powered-by"); // Reduce fingerprinting (optional)
// home route with the get method and a handler
app.get("/v1", (req, res) => {
    try {
        res.status(200).json({
            status: "success",
            data: [],
            message: "Welcome to our API homepage!",
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
});

app.get("/v1/user", Verify, (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Welcome to the your Dashboard!",
    });
});

app.use('/api/v1/auth', Auth)
app.use('/api/v1/auth/home', Verify, Home)
export default app;