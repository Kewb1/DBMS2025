import Recipe from "../models/recipe.model.js";
import mongoose from "mongoose";

export const getRecipes = async (req, res) => {
    try{
        const recipes = await Recipe.find({});
        res.status(200).json({success: true, data: recipes});
    } catch(error){
        console.log("Error in fetching recipes ", error.message);
        res.status(500).json({success: false, message: "server error"});
    }
}

export const createRecipe = async (req, res) => {
    const recipe = req.body; // user will send this data

    if(!recipe.recipe_name || !recipe.prep_time || !recipe.cook_time || !recipe.total_time || !recipe.servings || !recipe.yield || !recipe.ingredients || !recipe.directions || !recipe.rating || !recipe.url || !recipe.cuisine_path || !recipe.nutrition || !recipe.timing || !recipe.img_src){
        return res.status(404).json({success:false, message: "please provide all fields "})
    }

    const newRecipe = new Recipe(recipe);

    try{
        await newRecipe.save();
        res.status(201).json({success: true, data: newRecipe});
    }catch (error){
        console.error("Error in create Recipe ", error.message);
        res.status(500).json({success: false, message: "server error"})

    }
}

export const updateRecipe = async (req, res) => {
    const {id} = req.params;   
    const recipe = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "Invalid recipe id"});
    }

    try{
        const updatedRecipe = await Recipe.findByIdAndUpdate(id, recipe, {new: true});
        res.status(200).json({success: true, data: updatedRecipe});
    } catch(error){
        res.status(500).json({success: false, message: "server error"});
    }

}

export const deleteRecipe =  async (req, res) => {

        const {id}= req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({success: false, message: "Invalid recipe id"});
        }
        
        try{
            await Recipe.findByIdAndDelete(id);
            res.status(200).json({success: true, message: "Recipe deleted "});
        } catch(error){
            console.log("Error in deleting recipe ", error.message);
            res.status(500).json({success: false, message: "server error"})
        }
  
}