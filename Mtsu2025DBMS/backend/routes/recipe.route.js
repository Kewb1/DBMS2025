import express from "express";
import mongoose, { get } from "mongoose";
import Recipe from "../models/recipe.model.js";
import { getRecipes, createRecipe, updateRecipe, deleteRecipe} from "../controllers/recipe.controller.js";

const router = express.Router();

router.get("/", getRecipes);
router.post("/", createRecipe);
router.put("/:id", updateRecipe);
router.delete("/:id" , deleteRecipe);

export default router;