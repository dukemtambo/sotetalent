import express from "express";
import mongoose from "mongoose";
import path from "path";
import dotenv from "dotenv";
import Promise from "bluebird";
import api from "./routes/api";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// mongodb connection
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, "../react-ui/build")));

// Answer API requests.
app.use("/api", api);

// All remaining requests return the React app, so it can handle routing.
app.get("*", (request, response) => {
  response.sendFile(path.resolve(__dirname, "../react-ui/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Listening on port http://localhost:${PORT}`);
});
