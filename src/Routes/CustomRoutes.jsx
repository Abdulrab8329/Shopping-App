import React from "react";
import {Routes, Route} from "react-router";
import Navbar from "../Components/Navbar/Navbar";   
import Home from "../Components/Pages/Home";
import SearchResults from "../Components/Pages/SearchResults";
import ProductDetails from "../Components/Pages/ProductDetails";
import MensClothing from "../Components/Pages/MensClothing";
import WomensClothing from "../Components/Pages/WomensClothing";

const CustomRoutes = () => {
    return(
        <>
        <Navbar/>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/mens" element={<MensClothing />} />
            <Route path="/womens" element={<WomensClothing />} />
        </Routes>
        </>
    )
}

export default CustomRoutes;
