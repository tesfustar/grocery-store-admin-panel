import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Category from "../pages/category/Category";
import Dashboard from "../pages/home/Dashboard";
import AddProduct from "../pages/product/AddProduct";
import Product from "../pages/product/Product";
import Customers from "../pages/users/Customers";



export const AdminRoute=()=>{
   return(
    <Routes>
    <Route path="*" element={<Navigate to="/dashboard" />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/categories" element={<Category />} />
    <Route path="/products" element={<Product />} />
    <Route path="/customers" element={<Customers />} />
    <Route path="/add-product" element={<AddProduct />} />
    <Route path="/add-product/:id" element={<AddProduct />} />
  </Routes>
   )
}