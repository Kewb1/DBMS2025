import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
    recipe_name:{
        type: String,
        required: true
    },
    prep_time:{    // correct leave outs in the schema file
        type: String,
        required: false
    },
    cook_time:{
        type: String,
        required: false
    },
    total_time:{
        type: String,
        required: false
    },
    servings:{
        type: Number,
        required: false
    },
    yield:{
        type: String,
        required: false
    },
    ingredients:{
        type: String,
        required: true
    },
    directions:{
        type: String,
        required: true
    },
    rating:{
        type: Number,
        required: true
    },
    url:{
        type: String,
        required: true
    },  
    cuisine_path:{
        type: String,
        required: true
    },
    nutrition:{
        type: String,
        required: true
    },
    timing:{
        type: String,
        required: false
    },
    img_src: {
        type: String,
        required: true
    }

},{
    timestamps: true //created at, updated at
});

const Recipe = mongoose.model("Recipe", recipeSchema);
export default Recipe;