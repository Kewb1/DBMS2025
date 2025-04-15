import express from "express";
import mongoose, { get } from "mongoose";
import User from "../models/user.model.js";
import { getUsers, createUser, deleteUser} from "../controllers/user.controller.js";

const user_router = express.Router();

user_router.get("/get_users", getUsers);
user_router.post("/create_user", createUser);
user_router.delete("/delete_user/:id" , deleteUser);

export default user_router;