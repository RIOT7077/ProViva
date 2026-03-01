import express from "express";
import path from "path";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { serve } from "inngest/express";
import { inngest, functions } from "./lib/inngest.js";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: " ENV_CLIENT_URL", credentials: true }));

app.use("/api/inngest", serve({ client: inngest, functions }));

app.get("/check", (req, res) => {
  res.send("Healthy");
});
//making app ready for development and production both
if (ENV.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}
const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT || 5000, () =>
      console.log("Server is running on port ", ENV.PORT || 5000),
    );
  } catch (error) {
    console.log("Error in starting the server", error);
    process.exit(1);
  }
};
startServer();
