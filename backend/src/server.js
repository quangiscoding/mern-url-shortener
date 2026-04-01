import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import connectDB from "./config/db.js";
import urlRoutes from "./routes/urlRoutes.js";
import { getOriginalUrl } from "./controllers/urlControllers.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/urls", urlRoutes);
app.get("/:shortId", getOriginalUrl);

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
