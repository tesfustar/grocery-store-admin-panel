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
import { useHome } from "../../../../context/HomeContext";
import ConfirmModal from "../../../../utils/ConfirmModal";

interface Props {
  branchProducts: Array<object>;
}
const BranchProductsTable = ({ branchProducts }: Props) => {
  const { isAmh, setConfirmModalOpen, setMessageType } = useHome();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const columns: GridColDef[] = [
    { field: "index", headerName: "ID", width: 70 },
    {
      field: "name",
      headerName: "Name",
      width: 190,
      sortable: false,
      filterable: false,
      headerClassName: "super-app-theme--header",
      renderCell: (params: GridCellParams) => {
        return <h1>{params?.row?.product?.name}</h1>;
      },
    },
    {
      field: "nameAm",
      headerName: "amharic name",
      sortable: false,
      filterable: false,
      width: 190,
      headerClassName: "super-app-theme--header",
      renderCell: (params: GridCellParams) => {
        return <h1>{params?.row?.product?.nameAm}</h1>;
      },
    },
    {
      field: "wholeSalePrice",
      headerName: "price",
      sortable: false,
      filterable: false,
      width: 130,
      headerClassName: "super-app-theme--header",
      renderCell: (params: GridCellParams) => {
        return <h1>{params?.row?.product?.wholeSalePrice}</h1>;
      },
    },

    {
      field: "image",
      headerName: "Image",
      sortable: false,
      filterable: false,
      width: 130,
      renderCell: (params: GridCellParams) => {
        return (
          <img
            src={params?.row?.product?.image[0]}
            alt=""
            className="h-11 w-11 rounded-sm object-cover"
          />
        );
      },
    },
    {
      field: "availableQuantity",
      headerName: "availableQuantity",
      sortable: false,
      filterable: false,
      width: 160,
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
        rows={branchProducts}
        columns={columns}
        autoPageSize={true}
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

export default BranchProductsTable;
