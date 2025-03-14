import {create} from "zustand"
import Fuse from 'fuse.js';

export const useRecipeStore = create((set) => ({
    recipes: [], 
    filteredRecipes: [],

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

    searchRecipes: async(searchTerm) => {
        // First get all recipes
        console.log("fetching", searchTerm);

        const validIngredients= [
            "almond extract",
            "almonds",
            "apple",
            "apple cider",
            "apple cider vinegar",
            "apples",
            "apricot nectar",
            "apricot preserves",
            "apricots",
            "avocado",
            "bacon",
            "baking powder",
            "baking soda",
            "bananas",
            "basil",
            "basmati rice",
            "beef",
            "bell peppers",
            "black beans",
            "black olives",
            "blackberries",
            "blueberries",
            "bourbon",
            "bread crumbs",
            "brown sugar",
            "butter",
            "buttermilk",
            "butternut squash",
            "cabbage",
            "cake mix",
            "caramel",
            "cardamom",
            "carrots",
            "celery",
            "cheddar cheese",
            "cherries",
            "chicken",
            "chicken broth",
            "chili powder",
            "chocolate chips",
            "cilantro",
            "cinnamon",
            "cloves",
            "coconut",
            "coconut milk",
            "coconut oil",
            "condensed milk",
            "confectioners sugar",
            "corn",
            "cornstarch",
            "cranberries",
            "cream cheese",
            "cucumber",
            "cumin",
            "dates",
            "egg yolks",
            "eggs",
            "figs",
            "flour",
            "garlic",
            "ginger",
            "goat cheese",
            "grapes",
            "green beans",
            "green onions",
            "half and half",
            "ham",
            "heavy cream",
            "honey",
            "jalapeno peppers",
            "kiwi",
            "lemon",
            "lemon juice",
            "lemon zest",
            "lime",
            "lime juice",
            "lobster",
            "mango",
            "maple syrup",
            "milk",
            "mint",
            "mushrooms",
            "nectarines",
            "nutmeg",
            "oats",
            "olive oil",
            "onion",
            "orange juice",
            "orange zest",
            "oregano",
            "papaya",
            "paprika",
            "parmesan cheese",
            "parsley",
            "peaches",
            "peanut butter",
            "pears",
            "pecans",
            "pepper",
            "persimmons",
            "pineapple",
            "pine nuts",
            "pistachios",
            "plums",
            "pomegranate",
            "pork",
            "potatoes",
            "prosciutto",
            "prunes",
            "pumpkin",
            "raisins",
            "raspberries",
            "red onion",
            "red pepper flakes",
            "rice",
            "rosemary",
            "rum",
            "sage",
            "salmon",
            "salt",
            "sausage",
            "sesame oil",
            "sesame seeds",
            "shallots",
            "shrimp",
            "sour cream",
            "soy sauce",
            "spinach",
            "strawberries",
            "sugar",
            "sweet potatoes",
            "thyme",
            "tomato paste",
            "tomatoes",
            "tuna",
            "turkey",
            "vanilla extract",
            "vegetable oil",
            "vinegar",
            "walnuts",
            "watermelon",
            "white wine",
            "yogurt",
            "zucchini"
          ];

        const res = await fetch(`/api/recipes`);
        const data = await res.json();
        
        // If searchTerm is empty, return all recipes
        if (!searchTerm || searchTerm.trim() === '') {
            set({ recipes: data.data });
            return;
        }

        const fuse = new Fuse(validIngredients, {
            includeScore: true,
            threshold: 0.9, // Lower values are more strict (fewer matches)
            minMatchCharLength: 2,
        });

        // Split the search term by commas and trim each ingredient
        const  userIngredients = searchTerm 
            .toLowerCase() 
            .split(',')
            .map(item => item.trim())
            .filter(item => item.length > 0); // Remove empty items

        console.log("Searching for ingredients:", userIngredients );

        // Convert user inputs to valid ingredients using fuzzy matching
        const correctedIngredients = userIngredients.map(ingredient => {
            const results = fuse.search(ingredient);
            // Return the best match if it exists and has a good score

            if (results.length > 0 && results[0].score < 0.4) {
                console.log(`Corrected "${ingredient}" to "${results[0].item}"`);
                return results[0].item;
            }
            // Otherwise return the original ingredient
            return ingredient;
        });

        console.log("Searching for ingredients:", correctedIngredients);
        
        // Filter recipes that contain ALL the search terms in ingredients
        const filtered = data.data.filter(recipe => {
            const recipeIngredients = recipe.ingredients.toLowerCase();
            // Check if ALL ingredients are included in the recipe
            return correctedIngredients.every(ingredient => 
                recipeIngredients.includes(ingredient)
            );
        });

        // Update the recipes state with filtered results
        set((state) => ({recipes: filtered }));
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