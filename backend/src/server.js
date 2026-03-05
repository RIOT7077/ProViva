import express from "express";
import path from "path";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { serve } from "inngest/express";
import { inngest, functions } from "./lib/inngest.js";
import { clerkMiddleware } from "@clerk/express";
import chatRoutes from "./routes/chatRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import cors from "cors";
import { protectRoute } from "./middleware/protectRoute.js";
import router from "./routes/chatRoutes.js";


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "ENV_CLIENT_URL", credentials: true }));
app.use(clerkMiddleware());
app.use("/api/inngest", serve({ client: inngest, functions }));
app.get("/check", (req, res) => {
  res.send("Healthy");
});
app.get("/video-calls", protectRoute, (req, res) => {
  res
    .status(200)
    .json({ message: "This is a protected route", user: req.user });
});
app.use("/api/chat", chatRoutes);
app.use("/api/sessions", sessionRoutes);


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
