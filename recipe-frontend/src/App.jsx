import "./App.css";
import Login from "./Pages/Auth";
import Register from "./Pages/Register-page";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./store/PrivateRoute";
import CategoriesSection from "./Components/CategoriesSection";

import Home from "./Pages/Home";
function App() {
  return (
    <>
      <Routes>
       
        <Route path="/" element={<Login />} />
        <Route path="/cat" element={<CategoriesSection />} />
        <Route element={<PrivateRoute />}>
            <Route path="/Home" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
