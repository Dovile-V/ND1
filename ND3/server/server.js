import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import restaurantRoutes from "./routes/restaurantRoutes.js";
import suggestionRoutes from "./routes/suggestionRoutes.js";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientPath = path.resolve(__dirname, "..", "client");

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/restaurants", restaurantRoutes);
app.use("/api/suggestions", suggestionRoutes);

// pagrindinis
app.get("/", (req, res) => {
    res.sendFile(path.join(clientPath, "index.html"));
});

// Static failai: HTML, CSS, JS, IMG
app.use(express.static(clientPath));

// MongoDB prisijungimas
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("MongoDB connection error:", err.message));

// serverio paleidimas
const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});