import express from "express";
import { ENV } from "./lib/env.js";
const app = express();
app.get("/check", (req, res) => {
  res.send("Healthy");
});
app.listen(ENV.PORT || 5000, () => {
  console.log("Server is running on port " + (process.env.PORT || 5000));
});
