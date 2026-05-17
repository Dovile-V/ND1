import express from "express";
import {
    createSuggestion,
    getSuggestions,
    deleteSuggestion
} from "../controllers/suggestionController.js";

const router = express.Router();

router.post("/", createSuggestion);
router.get("/", getSuggestions);
router.delete("/:id", deleteSuggestion);

export default router;