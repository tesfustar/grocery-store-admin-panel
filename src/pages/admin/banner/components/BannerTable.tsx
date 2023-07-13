import React from "react";
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

interface Props {
  banners: Array<object>;
  setStateChange: React.Dispatch<React.SetStateAction<boolean>>;
  setEditBannerId: React.Dispatch<React.SetStateAction<string | null>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const BannerTable = ({
  banners,
  setStateChange,
  setEditBannerId,
  setIsModalOpen,
}: Props) => {
  const columns: GridColDef[] = [
    { field: "index", headerName: "ID", width: 110 },
    {
      field: "name",
      headerName: "Name",
      width: 240,
      sortable: false,
      filterable: false,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "image",
      headerName: "Image",
      sortable: false,
      filterable: false,
      width: 200,
      renderCell: (params: GridCellParams) => {
        return (
          <img
            src={params.row.image}
            alt=""
            className="h-11 w-28 rounded-sm object-cover"
          />
        );
      },
    },
    // {
    //   field: "products",
    //   headerName: "products",
    //   sortable: false,
    //   filterable: false,
    //   width: 150,
    //   renderCell: (params: GridCellParams) => {
    //     return <h1>{params.row.products?.length}</h1>;
    //   },
    // },
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
              className="bg-blue-bg rounded-sm hover:opacity-80
                    text-center px-5 p-1 font-medium text-sm text-white"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </button>
            {/* <button
              onClick={() => {
                setEditBannerId(params.row._id);
                setIsModalOpen(true);
              }}
              className="bg-red-bg rounded-sm hover:opacity-80
                    text-center px-5 p-1 font-medium text-sm text-white"
            >
              Edit
            </button> */}
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
        rows={banners}
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

export default BannerTable;
