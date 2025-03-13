import {create} from "zustand"

export const useRecipeStore = create((set) => ({
    recipes: [], 
    setRecipes: (recipes) => set({recipes}),

    createRecipe: async(newRecipe) => {

        if(!newRecipe.recipe_name || !newRecipe.prep_time || !newRecipe.cook_time || !newRecipe.total_time    || !newRecipe.servings || !newRecipe.yield || !newRecipe.ingredients || !newRecipe.directions || !newRecipe.rating || !newRecipe.url || !newRecipe.cuisine_path || !newRecipe.nutrition || !newRecipe.timing || !newRecipe.img_src) {
            return {success:false, message: "All fields are required"};
        }

        const res = await fetch("/api/recipes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newRecipe)
        })  

        const data = await res.json();
        set((state) => ({recipes: [...state.recipes, data]}))
        return {success:true, message: "Recipe created successfully"}
    },

    fetchRecipes: async() => {
        const res = await fetch("/api/recipes");
        const data = await res.json();
        set({recipes: data.data });
    },

    deleteRecipe: async(pid) => {
        const res = await fetch(`/api/recipes/${pid}`, {
            method: "DELETE"
        });
        const data = await res.json();
        if(!data.success) return {success: false, message: data.message};

        // update immediately without needing to refresh the page
        set((state) => ({recipes: state.recipes.filter((recipe) => recipe._id !== pid)}));
        return {success: true, message: data.message};
    },
    
    updateRecipe: async(pid, updatedRecipe) => {
        const res = await fetch(`/api/eecipes/${pid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedRecipe)
        });
        const data = await res.json();
        if(!data.success) return {success: false, message: data.message};
        
        //update immediately without needing to refresh the page
        set((state) => ({recipes: state.recipes.map((recipe) => recipe._id === pid ? data.data : recipe)}));
        return {success: true, message: data.message};
    }
}));