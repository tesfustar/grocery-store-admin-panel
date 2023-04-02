import React, { Suspense } from "react";
import ReactLoading from "react-loading";
import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
//admin routes
const Category = React.lazy(() => import("../pages/admin/category/Category"));
const Dashboard = React.lazy(() => import("../pages/admin/home/Dashboard"));
const AddProduct = React.lazy(
  () => import("../pages/admin/product/AddProduct")
);
const Product = React.lazy(() => import("../pages/admin/product/Product"));
const Customers = React.lazy(() => import("../pages/admin/users/Customers"));
const BranchAdmin = React.lazy(() => import("../pages/admin/users/BranchAdmin"));
const Delivery = React.lazy(() => import("../pages/admin/delivery/Delivery"));
const CustomerDetail = React.lazy(
  () => import("../pages/admin/users/CustomerDetail")
);
const Notification = React.lazy(
  () => import("../pages/notifications/Notification")
);
const Banner = React.lazy(() => import("../pages/admin/banner/Banner"));
const Branch = React.lazy(() => import("../pages/admin/branche/Branch"));
const Coupon = React.lazy(() => import("../pages/admin/coupons/Coupon"));


//manager routes
const Store_Dashboard = React.lazy(
  () => import("../pages/manager/home/Dashboard")
);
const Store_Product = React.lazy(() => import("../pages/manager/product/Product"));
export const AdminRoute = () => {
  const { user } = useAuth();
  function AdminComp() {
    return (
      <Routes>
        <Route path="*" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/categories" element={<Category />} />
        <Route path="/products" element={<Product />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/branch-admin" element={<BranchAdmin />} />
        <Route path="/customers/:id" element={<CustomerDetail />} />
        <Route path="/deliveries" element={<Delivery />} />
        <Route path="/products/add-product" element={<AddProduct />} />
        <Route path="/add-product/:id" element={<AddProduct />} />
        <Route path="/banners" element={<Banner />} />
        <Route path="/coupons" element={<Coupon />} />
        <Route path="/branches" element={<Branch />} />
        <Route path="/notifications" element={<Notification />} />
      </Routes>
    );
  }

  function StoreAdmin() {
    return (
      <Routes>
        <Route path="*" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Store_Dashboard />} />
        <Route path="/products" element={<Store_Product />} />
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
      {user.role === "ADMIN" ? (
        <AdminComp />
      ) : user.role === "STORE_ADMIN" ? (
        <StoreAdmin />
      ) : (
        <h1>You have No Role to use this system !</h1>
      )}
    </Suspense>
  );
};
