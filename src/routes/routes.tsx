import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Category from "../pages/category/Category";
import Product from "../pages/product/Product";



export const AdminRoute=()=>{
   return(
    <Routes>
    <Route path="*" element={<Navigate to="/categories" />} />
    <Route path="/categories" element={<Category />} />
    <Route path="/products" element={<Product />} />
  </Routes>
   )
}