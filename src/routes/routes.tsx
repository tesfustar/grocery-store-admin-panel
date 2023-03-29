import React, { Suspense } from "react";
import ReactLoading from "react-loading";
import { Route, Routes, Navigate } from "react-router-dom";
import Coupon from "../pages/coupons/Coupon";
import Delivery from "../pages/delivery/Delivery";
import Notification from "../pages/notifications/Notification";
import CustomerDetail from "../pages/users/CustomerDetail";
// import Dashboard from "../pages/home/Dashboard";
// import AddProduct from "../pages/product/AddProduct";
// import Product from "../pages/product/Product";
// import Customers from "../pages/users/Customers";
const Category = React.lazy(() => import("../pages/category/Category"));
const Dashboard = React.lazy(() => import("../pages/home/Dashboard"));
const AddProduct = React.lazy(() => import("../pages/product/AddProduct"));
const Product = React.lazy(() => import("../pages/product/Product"));
const Customers = React.lazy(() => import("../pages/users/Customers"));
const Banner = React.lazy(() => import("../pages/banner/Banner"));
export const AdminRoute = () => {
  function RoutComp() {
    return (
      <Routes>
        <Route path="*" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/categories" element={<Category />} />
        <Route path="/products" element={<Product />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/customers/:id" element={<CustomerDetail />} />
        <Route path="/deliveries" element={<Delivery />} />
        <Route path="/products/add-product" element={<AddProduct />} />
        <Route path="/add-product/:id" element={<AddProduct />} />
        <Route path="/banners" element={<Banner />} />
        <Route path="/coupons" element={<Coupon />} />
        <Route path="/notifications" element={<Notification />} />

        
      </Routes>
    );
  }
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center">
          <ReactLoading
            type={"spinningBubbles"}
            color={"#34d399"}
            height={"60px"}
            width={"60px"}
          />
        </div>
      }
    >
      <RoutComp />
    </Suspense>
  );
};
