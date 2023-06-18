import React, { Suspense } from "react";
import ReactLoading from "react-loading";
import { Route, Routes, Navigate } from "react-router-dom";
import { Sidebar, NavBar } from "../components";
import { useAuth } from "../context/AuthContext";
import { useHome } from "../context/HomeContext";
import SmallSidebar from "../components/SmallSidebar";
import { GiGamepadCross } from "react-icons/gi";
import { mainColor } from "../styles/Style";

//routes
//admin routes
const Category = React.lazy(() => import("../pages/admin/category/Category"));
const Dashboard = React.lazy(() => import("../pages/admin/home/Dashboard"));
const AddProduct = React.lazy(
  () => import("../pages/admin/product/AddProduct")
);
const Product = React.lazy(() => import("../pages/admin/product/Product"));
const Customers = React.lazy(() => import("../pages/admin/users/Customers"));
const BranchAdmin = React.lazy(
  () => import("../pages/admin/users/BranchAdmin")
);
const Delivery = React.lazy(() => import("../pages/admin/delivery/Delivery"));
const DeliveryDetail = React.lazy(() => import("../pages/admin/delivery/DeliveryDetail"));

const CustomerDetail = React.lazy(
  () => import("../pages/admin/users/CustomerDetail")
);
const AdminNotification = React.lazy(
  () => import("../pages/admin/notifications/Notification")
);
const Banner = React.lazy(() => import("../pages/admin/banner/Banner"));
const Branch = React.lazy(() => import("../pages/admin/branche/Branch"));
const BranchDetail = React.lazy(
  () => import("../pages/admin/branche/BranchDetail")
);
const Coupon = React.lazy(() => import("../pages/admin/coupons/Coupon"));
const AddCoupon = React.lazy(() => import("../pages/admin/coupons/AddCoupon"));
const Order = React.lazy(() => import("../pages/admin/order/Order"));

const OrderDetails = React.lazy(
  () => import("../pages/admin/order/OrderDetails")
);

const ProductRequest = React.lazy(
  () => import("../pages/admin/productRequest/ProductRequest")
);
const RequestDetail = React.lazy(
  () => import("../pages/admin/productRequest/RequestDetail")
);

//manager routes
const Store_Dashboard = React.lazy(
  () => import("../pages/manager/home/Dashboard")
);
const Store_Product = React.lazy(
  () => import("../pages/manager/product/Product")
);

const Product_Request = React.lazy(
  () => import("../pages/manager/productRequest/ProductRequest")
);
const NewRequest = React.lazy(
  () => import("../pages/manager/productRequest/NewRequest")
);

const BranchNotification = React.lazy(
  () => import("../pages/manager/notifications/Notification")
);
const BranchOrder = React.lazy(() => import("../pages/manager/order/Order"));

const BranchOrderDetails = React.lazy(
  () => import("../pages/manager/order/OrderDetails")
);
const AuthRoutes = () => {
  const { sideBar, role, user } = useAuth();
  const {
    setIsSideBarOpen,
    isSideBarOpen,
    screenSize,
    isOpen,
    isSmallScreen,
    activeMenu,
    setActiveMenu,
  } = useHome();
  const handleCloseSideBar = () => {
    if (activeMenu == true && screenSize <= 900) {
      setActiveMenu(false);
    }
  };
  return (
    <div className="flex relative min-h-screen w-full">
      {!isSmallScreen ? (
        <div
          className={`bg-[#141423]  h-screen  duration-300 
    ${
      isOpen ? "w-0 hidden" : isSideBarOpen ? "w-64" : "w-20"
    }  fixed overflow-y-scroll scrollbar-hide overflow-x-hidden `}
        >
          <div className=" flex items-center justify-center space-x-2 p-3">
            <GiGamepadCross className="text-main-color text-4xl" />
            {isSideBarOpen && (
              <h1 className=" text-white duration-500 font-bold text-xl">
                GROCERY STORE
              </h1>
            )}
          </div>
          {!isSmallScreen && <Sidebar />}
        </div>
      ) : (
        <div className="w-ful z-50">
          {activeMenu && (
            <div
              onClick={handleCloseSideBar}
              className="absolute inset-0 bg-black/20"
            />
          )}
          <div
            className={`overflow-y-scroll scrollbar-hide  ${
              activeMenu
                ? "transition ease-out max-w-[260px] z-50"
                : "transition ease-out max-w-0"
            } w-full  h-screen bg-[#141423] fixed`}
          >
            <div className=" flex items-center justify-center space-x-2 p-3">
              <GiGamepadCross className="text-main-color text-4xl" />
              <h1 className=" text-white duration-500 font-bold text-xl">
                GROCERY STORE
              </h1>
            </div>
            <SmallSidebar />
          </div>
        </div>
      )}
      <div
        className={` duration-300 overflow-x-hidden ${
          !isSmallScreen &&
          (isOpen ? "ml-0" : isSideBarOpen ? "ml-64" : " ml-20")
        }  w-full  `}
      >
        <NavBar />
        <div className="w-full p-3">
          <Suspense
            fallback={
              <div className="flex items-center justify-center">
                <ReactLoading
                  type={"spinningBubbles"}
                  color={mainColor}
                  height={"60px"}
                  width={"60px"}
                />
              </div>
            }
          >
            {user.role === "ADMIN" ? (
              <Routes>
                <Route path="*" element={<Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/categories" element={<Category />} />
                <Route path="/products" element={<Product />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/branch-admin" element={<BranchAdmin />} />
                <Route path="/customers/:id" element={<CustomerDetail />} />
                <Route path="/deliveries" element={<Delivery />} />
                <Route path="/deliveries/detail/:id" element={<DeliveryDetail />} />
                <Route path="/products/add-product" element={<AddProduct />} />
                <Route path="/products/edit-product/:id" element={<AddProduct />} />
                <Route path="/banners" element={<Banner />} />
                <Route path="/coupons" element={<Coupon />} />
                <Route path="/coupons/add" element={<AddCoupon />} />
                <Route path="/branches" element={<Branch />} />
                <Route path="/notifications" element={<AdminNotification />} />
                <Route path="/orders" element={<Order />} />
                <Route path="/product/request" element={<ProductRequest />} />
                {/* //detail routes */}
                <Route path="/orders/detail/:id" element={<OrderDetails />} />
                <Route path="/request/detail/:id" element={<RequestDetail />} />
                <Route path="/branches/detail/:id" element={<BranchDetail />} />
              </Routes>
            ) : user.role === "STORE_ADMIN" ? (
              <Routes>
                <Route path="*" element={<Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={<Store_Dashboard />} />
                <Route path="/products" element={<Store_Product />} />
                <Route path="/product/request" element={<Product_Request />} />
                <Route path="/product/request/new" element={<NewRequest />} />
                <Route path="/orders" element={<BranchOrder />} />
                <Route path="/orders/detail/:id" element={<BranchOrderDetails />} />
                <Route path="/notifications" element={<BranchNotification />} />
              </Routes>
            ) : (
              <h1>You have No Role to use this system !</h1>
            )}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default AuthRoutes;
