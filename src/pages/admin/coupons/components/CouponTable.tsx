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
interface Props {
  coupons: Array<object>;
  setStateChange: React.Dispatch<React.SetStateAction<boolean>>;
  setEditCouponId: React.Dispatch<React.SetStateAction<string | null>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const CouponTable = ({
  coupons,
  setStateChange,
  setEditCouponId,
  setIsModalOpen,
}: Props) => {
  const [test, setTest] = useState<boolean>(false);
  const columns: GridColDef[] = [
    { field: "index", headerName: "ID", width: 70 },
    {
      field: "code",
      headerName: "code",
      width: 120,
      sortable: false,
      filterable: false,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "discount",
      headerName: "discount amount",
      sortable: false,
      filterable: false,
      width: 150,
      headerClassName: "super-app-theme--header",

      renderCell: (params: GridCellParams) => {
        return (
          <h2>
            {params.row.discount}{" "}
            {params.row.discountType === "PERCENT" ? "%" : "ETB"}{" "}
          </h2>
        );
      },
    },
    {
      field: "discountType",
      headerName: "discountType",
      sortable: false,
      filterable: false,
      width: 130,
    },
    {
      field: "description",
      headerName: "description",
      sortable: false,
      filterable: false,
      width: 200,
    },
    {
      field: "expiresAt",
      headerName: "expiresAt",
      sortable: false,
      filterable: false,
      width: 200,
      renderCell: (params: GridCellParams) => {
        return (
          <h2>
            {moment(params.row.expiresAt).format("MMMM Do YYYY, h:mm:ss a")}
          </h2>
        );
      },
    },
    {
      field: "enabled",
      headerName: "activated",
      sortable: false,
      filterable: false,
      width: 150,
      headerClassName: "super-app-theme--header",
      renderCell: (params: GridCellParams) => {
        return <h2>{params.row.enabled ? "Enabled" : "Disabled"}</h2>;
      },
    },
    {
      field: "action",
      headerName: "action",
      sortable: false,
      filterable: false,
      width: 300,
      renderCell: (params: GridCellParams) => {
        return (
          <div className="flex items-center space-x-3">
            <button
              className="bg-main-bg rounded-sm hover:opacity-80
                    text-center px-5 p-1 font-medium text-sm text-white"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </button>
            <button
              onClick={() => {
                setEditCouponId(params.row._id);
                setIsModalOpen(true);
              }}
              className="bg-blue-bg rounded-sm hover:opacity-80
                    text-center px-5 p-1 font-medium text-sm text-white"
            >
              Edit
            </button>
            <Switch
              checked={params.row.enabled}
              onChange={() => setTest(!test)}
              className={`${
                params.row.enabled ? "bg-red-bg" : "bg-gray-300"
              } relative inline-flex h-6 w-14 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span
                aria-hidden="true"
                className={`${
                  params.row.enabled ? "translate-x-8" : "translate-x-0"
                }
      inline-block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
              />
            </Switch>
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

  //delete confirmation
  const handleDelete = (id: string) => {
    if (window.confirm("are you sure")) {
      deleteCategoryMutationHandler(id);
    }
    return;
  };
  const categoryDeleteMutation = useMutation(
    async (id) =>
      await axios.delete(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_URL
        }category/find/remove/${id}`
      ),
    {
      retry: false,
    }
  );
  const deleteCategoryMutationHandler = async (id: any) => {
    try {
      categoryDeleteMutation.mutate(id, {
        onSuccess: (responseData) => {
          setStateChange((prev) => !prev);
        },
        onError: (err) => {},
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div style={{ height: 530 }} className="w-full">
      <DataGrid
        rows={coupons}
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

export default CouponTable;
