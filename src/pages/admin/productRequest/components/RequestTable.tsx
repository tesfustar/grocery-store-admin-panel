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
import moment from "moment";
import { useNavigate } from "react-router-dom";
import {
  IProductRequest,
  ProductRequestStatus,
} from "../../../../types/Request";

interface Props {
  requests: IProductRequest[];
  setStateChange: React.Dispatch<React.SetStateAction<boolean>>;
}
const RequestTable = ({ requests, setStateChange }: Props) => {
  const navigate = useNavigate();
  const columns: GridColDef[] = [
    { field: "index", headerName: "ID", width: 70 },
    {
      field: "branch",
      headerName: "Branch",
      width: 180,
      sortable: false,
      filterable: false,
      headerClassName: "super-app-theme--header",
      renderCell: (params: GridCellParams) => {
        return <h3>{params.row.branch?.name}</h3>;
      },
    },
    {
      field: "product",
      headerName: "product",
      sortable: false,
      filterable: false,
      width: 200,
      headerClassName: "super-app-theme--header",
      renderCell: (params: GridCellParams) => {
        return (
          <h3 className="font-semibold text-main-color">
            {params.row.product?.length} products
          </h3>
        );
      },
    },
    {
      field: "date",
      headerName: "order date",
      sortable: false,
      filterable: false,
      width: 250,
      headerClassName: "super-app-theme--header",
      renderCell: (params: GridCellParams) => {
        return (
          <h3 className="font-semibold text-blue-color">
            {moment(params.row.deliveredDate).format("MMMM Do YYYY, h:mm:ss a")}
          </h3>
        );
      },
    },
    {
      field: "status",
      headerName: "status",
      sortable: false,
      filterable: false,
      width: 150,
      headerClassName: "super-app-theme--header",
      renderCell: (params: GridCellParams) => {
        // ProductRequestStatus
        return (
          <h2
            className={`text-xs font-medium p-1 rounded-md
        ${
          params.row.status === ProductRequestStatus.PENDING
            ? "bg-[#f97316]/30 text-[#f97316]"
            : params.row.status === ProductRequestStatus.ONGOING
            ? "bg-blue-bg/30 text-blue-color"
            : params.row.status === ProductRequestStatus.DELIVERED
            ? "bg-red-bg text-red-color"
            : ""
        }`}
          >
            {params.row.status}
          </h2>
        );
      },
    },
    {
      field: "action",
      headerName: "action",
      sortable: false,
      filterable: false,
      width: 200,
      renderCell: (params: GridCellParams) => {
        return (
          <div className="flex items-center space-x-3">
            <button
              className="bg-blue-bg rounded-sm hover:opacity-80
                    text-center px-7 p-1 font-medium text-sm text-white"
              onClick={() => navigate(`/request/detail/${params.row._id}`)}
            >
              Details
            </button>
          </div>
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
        rows={requests}
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

export default RequestTable;
