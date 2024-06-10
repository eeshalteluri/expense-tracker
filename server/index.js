import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

/*NATIVE NODE PACKAGES*/
import path from "path";
import {fileURLToPath} from "url";// these 2 packages will allow us to properly set the path when we are configuring directories.
import {signin, signup} from "./controllers/auth.js";

/*CONFIGURATIONS*/
console.log(import.meta);//The import.meta object is a special object that is unique to each module and can carry metadata about the current module. The content of import.meta is defined by the host environment (Node.js or a web browser).
//In a Web Browser, In a browser environment, import.meta.url contains the absolute URL of the current module. Consider the following module named main.mjs:

// main.mjs, console.log(import.meta.url);
//If you load this module in a web page located at http://example.com like so:

//<script src="main.mjs" type="module"></script>
//The output of console.log(import.meta.url) will be 'http://example.com/main.mjs'.


const __filename = fileURLToPath(import.meta.url);
console.log(__filename);
const __dirname = path.dirname(__filename);
console.log(__dirname);

dotenv.config();

const app = express();
app.use(express.json());//The express.json() function is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.

/*DATABASE*/
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URL);

/*ROUTES*/
app.post('/signup', signup)
app.get("/signin",signin)



