import express from "express";
import mongoose from "mongoose";
import path from "path";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import Promise from "bluebird";

import auth from "./routes/auth";
import users from "./routes/users";

dotenv.config();
const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 5000;

// mongodb connection
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, "../react-ui/build")));

// Answer API requests.
app.use("/api/auth", auth);
app.use("/api/user", users);

// All remaining requests return the React app, so it can handle routing.
app.get("*", (request, response) => {
  response.sendFile(path.resolve(__dirname, "../react-ui/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Listening on port http://localhost:${PORT}`);
});
