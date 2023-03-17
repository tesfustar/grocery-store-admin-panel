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

interface Props {
  categories: Array<object>;
  setStateChange: React.Dispatch<React.SetStateAction<boolean>>;
  setEditCategoryId: React.Dispatch<React.SetStateAction<string | null>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const CategoryTable = ({
  categories,
  setStateChange,
  setEditCategoryId,
  setIsModalOpen,
}: Props) => {
  const columns: GridColDef[] = [
    { field: "index", headerName: "ID", width: 110 },
    {
      field: "name",
      headerName: "Name",
      width: 250,
      sortable: false,
      filterable: false,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "nameAm",
      headerName: "amharic name",
      sortable: false,
      filterable: false,
      width: 250,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "image",
      headerName: "Image",
      sortable: false,
      filterable: false,
      width: 250,
      renderCell: (params: GridCellParams) => {
        return (
          <img
            src={params.row.image}
            alt=""
            className="h-11 w-11 rounded-sm object-cover"
          />
        );
      },
    },
    {
      field: "action",
      headerName: "action",
      sortable: false,
      filterable: false,
      width: 400,
      renderCell: (params: GridCellParams) => {
        return (
          <div className="flex items-center space-x-3">
            <button
              className="bg-red-500 rounded-sm hover:opacity-80
                    text-center px-5 p-1 font-medium text-sm text-white"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </button>
            <button
              onClick={() => {
                setEditCategoryId(params.row._id);
                setIsModalOpen(true);
              }}
              className="bg-main-bg rounded-sm hover:opacity-80
                    text-center px-5 p-1 font-medium text-sm text-white"
            >
              Edit
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
    <div style={{ height: 530 }}>
      <DataGrid
        rows={categories}
        columns={columns}
        getRowId={(row) => row._id}
        pagination
        pageSize={10}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        components={{
          Pagination: CustomPagination,
        }}
      />
    </div>
  );
};

export default CategoryTable;
