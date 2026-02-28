import express from "express";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
const app = express();
app.get("/check", (req, res) => {
  res.send("Healthy");
});
app.listen(ENV.PORT || 5000, () => {
  console.log("Server is running on port " + (process.env.PORT || 5000));
  connectDB();
});
const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () =>
      console.log("Server is running on port ", process.env.PORT),
    );
  } catch (error) {
    console.log("Error in starting the server", error);
    process.exit(1);
  }
};
startServer();
