import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./signup";
import Login from "./login";
import Home from "./home";
import ProfilePage from "./profile";
import AddRecipe from "./addrecipe";
import RecipeDisplay from "./viewrecipe";
import AllRecipeDisplay from "./viewallrecipe";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<ProfilePage/>}/>
          <Route path="/addrecipe" element={<AddRecipe/>}/>
          <Route path="/yourrecipes" element={<RecipeDisplay/>}/>
          <Route path="/allrecipes" element={<AllRecipeDisplay/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
