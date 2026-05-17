import express from "express";
import {
    createRestaurant,
    getRestaurants,
    getRestaurant,
    updateRestaurant,
    deleteRestaurant
} from "../controllers/restaurantController.js";

const router = express.Router();

router.post("/", createRestaurant);
router.get("/", getRestaurants);
router.get("/:id", getRestaurant);
router.put("/:id", updateRestaurant);
router.delete("/:id", deleteRestaurant);

export default router;