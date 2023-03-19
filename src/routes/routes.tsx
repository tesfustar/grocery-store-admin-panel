import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Category from "../pages/category/Category";
import AddProduct from "../pages/product/AddProduct";
import Product from "../pages/product/Product";



export const AdminRoute=()=>{
   return(
    <Routes>
    <Route path="*" element={<Navigate to="/categories" />} />
    <Route path="/categories" element={<Category />} />
    <Route path="/products" element={<Product />} />
    <Route path="/add-product" element={<AddProduct />} />
  </Routes>
   )
}