import {create} from "zustand";
import Fuse from 'fuse.js';

export const useUserStore = create((set) => ({
    users: [], 
    currentUser: null,

    setUsers: (users) => set({users}),

    createUser: async(newUser) => {

        if(!newUser.first_name || !newUser.last_name || !newUser.email || !newUser.password) {
            return {success:false, message: "All fields are required"};
        }
        newUser.role = "user"; // default role is user
        const res = await fetch("/api/users/create_user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        })  

        if (!res.ok) {
            return {success:false, message: "User already exists"};
        }

        const data = await res.json();
        set((state) => ({users: [...state.users, data]}));
        return {success:true, message: "User created successfully"}
    },

    fetchUsers: async() => {
        const res = await fetch("/api/users/get_users");
        const data = await res.json();
        // console.log(data.data);
        set({users: data.data });

        // const staticData = [{ id: 1, name: "Test User" }];
        // set({users: staticData });
        // console.log("Updated users state with static data:", useUserStore.getState().users);
    
    },

    loginUser: async (credentials) => {
        const res = await fetch("/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        });

        if (!res.ok) {
            return { success: false, message: "Invalid email or password" };
        }

        const data = await res.json();
        set({ currentUser: data.user }); // Update currentUser state
        localStorage.setItem("currentUser", JSON.stringify(data.user)); // Persist user session
        return { success: true, message: "Login successful" };
    },

    logoutUser: () => {
        set({ currentUser: null }); // Clear currentUser state
        localStorage.removeItem("currentUser"); // Clear persisted session
        console.log("LOGGED OUT");
    },

    loadUserFromStorage: () => {
        const storedUser = localStorage.getItem("currentUser");
        if (storedUser) {
            set({ currentUser: JSON.parse(storedUser) });
        }
    }

}));