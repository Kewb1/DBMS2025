import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js"; 
import recipeRoutes from "./routes/recipe.route.js";
import userRoutes from "./routes/user.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json()); //allows us to accept data in the req.body

app.use("/api/recipes", recipeRoutes);
app.use("/api/users", userRoutes);

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
} 

app.listen(PORT, () => {
    connectDB();
    console.log("server started at http://localhost:" + PORT)
});
