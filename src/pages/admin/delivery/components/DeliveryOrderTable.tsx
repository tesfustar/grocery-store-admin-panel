import React, { useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridCellParams,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
import { Switch } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import {
  OrderStatus,
  PaymentMethod,
  ShippingType,
} from "../../../../types/Order";
import { useHome } from "../../../../context/HomeContext";
import ConfirmModal from "../../../../utils/ConfirmModal";
import { buttonStyle } from "../../../../styles/Style";
import { useAuth } from "../../../../context/AuthContext";
interface Props{
    deliveryOrders:Array<object>
}
const DeliveryOrderTable = ({ deliveryOrders }: Props) => {
  const navigate = useNavigate();
  const { isAmh, setConfirmModalOpen, setMessageType } = useHome();
  const { token } = useAuth();
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
  const columns: GridColDef[] = [
    { field: "index", headerName: "ID", width: 70 },
    {
      field: "user",
      headerName: "customer",
      width: 120,
      sortable: false,
      filterable: false,
      headerClassName: "super-app-theme--header",
      renderCell: (params: GridCellParams) => {
        return (
          <h2>{params.row.user?.firstName + " " + params.row.user?.firstName}</h2>
        );
      },
    },
    {
      field: "phoneNo",
      headerName: "phoneNo",
      sortable: false,
      filterable: false,
      width: 130,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "totalPrice",
      headerName: "totalPrice",
      sortable: false,
      filterable: false,
      width: 100,
      align: "center",
      renderCell: (params: GridCellParams) => {
        return (
          <h2 className="text-blue-color font-semibold">
            ETB {params.row?.totalPrice}
          </h2>
        );
      },
    },
    {
      field: "products",
      headerName: "total products",
      sortable: false,
      filterable: false,
      width: 100,
      align: "center",
      renderCell: (params: GridCellParams) => {
        return (
          <h2 className="text-main-color font-semibold">
            {params.row.products?.length} product
          </h2>
        );
      },
    },
    {
      field: "status",
      headerName: "status",
      sortable: false,
      filterable: false,
      width: 100,
      renderCell: (params: GridCellParams) => {
        return (
          <h2
            className={`text-xs font-medium p-1 rounded-md
        ${
          params.row.status === OrderStatus.PENDING
            ? "bg-[#f97316]/30 text-[#f97316]"
            : params.row.status === OrderStatus.ONGOING
            ? "bg-blue-bg/30 text-blue-color"
            : params.row.status === OrderStatus.DELIVERED
            ? "bg-red-bg/30 text-red-color"
            : params.row.status === OrderStatus.CANCELED
            ? "bg-main-bg/30 text-main-color"
            : ""
        }`}
          >
            {params.row.status}
          </h2>
        );
      },
    },
    {
      field: "paymentMethod",
      headerName: "paymentMethod",
      sortable: false,
      filterable: false,
      width: 150,
      align: "center",
      renderCell: (params: GridCellParams) => {
        return (
          <h2
            className={`text-xs font-medium p-1 rounded-md
        ${
          params.row.paymentMethod === PaymentMethod.CASH
            ? "bg-main-bg/30 text-main-color"
            : params.row.status === OrderStatus.ONGOING
            ? "bg-[#0891b2]/30 text-[#0891b2]"
            : params.row.status === OrderStatus.DELIVERED
            ? "bg-red-bg/30 text-red-color"
            : params.row.status === OrderStatus.CANCELED
            ? "bg-main-bg/30 text-main-color"
            : ""
        }`}
          >
            {params.row.paymentMethod}
          </h2>
        );
      },
    },
    {
      field: "shippingType",
      headerName: "shippingType",
      sortable: false,
      filterable: false,
      width: 130,
      align: "center",
      renderCell: (params: GridCellParams) => {
        return (
          <h2
            className={`text-xs font-medium p-1 rounded-md
        ${
          params.row.shippingType === ShippingType.FLAT
            ? "bg-[#eab308]/30 text-[#eab308]"
            : params.row.shippingType === ShippingType.FREE
            ? "bg-[#7c3aed]/30 text-[#7c3aed]"
            : params.row.shippingType === ShippingType.EXPRESS
            ? "bg-red-bg/30 text-red-color"
            : ""
        }`}
          >
            {params.row.shippingType}
          </h2>
        );
      },
    },

  ];

  function CustomPagination() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return (
      <Pagination
        // color="secondary"
        // variant="outlined"
        shape="rounded"
        page={page + 1}
        count={pageCount}
        // @ts-expect-error
        renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
        onChange={(event, value) => apiRef.current.setPage(value - 1)}
      />
    );
  }

  
  return (
    <div style={{ height: 530 }} className="w-full">
      <DataGrid
        rows={deliveryOrders}
        columns={columns}
        getRowId={(row) => row._id}
        pagination
        disableRowSelectionOnClick
        pageSizeOptions={[5, 10, 25]}
        components={{
          Pagination: CustomPagination,
        }}
        disableColumnMenu={true}
        disableColumnSelector
      />
    </div>
  );
};


export default DeliveryOrderTable