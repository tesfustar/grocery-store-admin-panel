import React from "react";
import {
  DataGrid,
  GridColDef,
  GridCellParams,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
  DataGridProps,
} from "@mui/x-data-grid";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IBranchAdmin } from "../../../../types/BranchAdmin";

interface Props {
  branchAdmins: IBranchAdmin[];
}
const BranchAdminList = ({ branchAdmins }: Props) => {
  const navigate = useNavigate();
  const columns: GridColDef[] = [
    { field: "index", headerName: "ID", width: 60 },
    {
      field: "profile",
      headerName: "profile",
      sortable: false,
      filterable: false,
      width: 100,
      renderCell: (params: GridCellParams) => {
        return (
          <img
            src={params.row.profile}
            alt=""
            className="h-11 w-11 rounded-sm object-cover"
          />
        );
      },
    },
    {
      field: "firstName",
      headerName: "first Name",
      width: 150,
      sortable: false,
      filterable: false,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "lastName",
      headerName: "last Name",
      sortable: false,
      filterable: false,
      width: 150,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "phone",
      headerName: "phone",
      sortable: false,
      filterable: false,
      width: 150,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "email",
      headerName: "email",
      sortable: false,
      filterable: false,
      width: 220,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "address",
      headerName: "address",
      sortable: false,
      filterable: false,
      width: 190,
      headerClassName: "super-app-theme--header",
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
    <div style={{ height: 330 }} className="w-full">
      <DataGrid
        rows={branchAdmins}
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

export default BranchAdminList;
