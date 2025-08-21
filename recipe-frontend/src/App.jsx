import "./App.css";
import Login from "./Pages/Auth";
import Register from "./Pages/Register-page";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./store/PrivateRoute";
import CategoriesSection from "./Components/CategoriesSection";
import Header from "./Components/Nav";
import FavoriteList from "./Pages/Favourite";

import Home from "./Pages/Home";
function App() {
  return (
    <>
    <Header/>
      <Routes>
       
        <Route path="/" element={<Login />} />
        <Route path="/cat" element={<CategoriesSection />} />
        <Route element={<PrivateRoute />}>
            <Route path="/Home" element={<Home />} />
            <Route path="/fav" element={<FavoriteList />} /> 
        </Route>
      </Routes>
    </>
  );
}

export default App;
