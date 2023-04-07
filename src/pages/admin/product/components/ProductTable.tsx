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
  products: Array<object>;
  setStateChange: React.Dispatch<React.SetStateAction<boolean>>;
}
const ProductTable = ({ products, setStateChange }: Props) => {
  const { isAmh, setConfirmModalOpen, setMessageType } = useHome();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const columns: GridColDef[] = [
    { field: "index", headerName: "ID", width: 70 },
    {
      field: "name",
      headerName: "Name",
      width: 120,
      sortable: false,
      filterable: false,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "nameAm",
      headerName: "amharic name",
      sortable: false,
      filterable: false,
      width: 140,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "wholeSalePrice",
      headerName: "price",
      sortable: false,
      filterable: false,
      width: 130,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "category",
      headerName: "category",
      sortable: false,
      filterable: false,
      width: 170,
      headerClassName: "super-app-theme--header",
      renderCell: (params: GridCellParams) => {
        return <h3>{params.row.category.name}</h3>;
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
            src={params.row.image[0]}
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
      width: 180,
      renderCell: (params: GridCellParams) => {
        return (
          <div className="flex items-center space-x-3">
            <button
              className="bg-blue-bg rounded-sm hover:opacity-80
                    text-center px-5 p-1 font-medium text-sm text-white"
              onClick={() => {
                setConfirmModalOpen(true);
                setSelectedId(params.row._id);
              }}
              disabled={productDeleteMutation.isLoading}
            >
              Delete
            </button>
            <button
              disabled={productDeleteMutation.isLoading}
              onClick={() => {}}
              className="bg-red-bg rounded-sm hover:opacity-80
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

  const productDeleteMutation = useMutation(
    async (id) =>
      await axios.delete(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_URL
        }product/find/remove/${id}`
      ),
    {
      retry: false,
    }
  );
  const deleteProductMutationHandler = async (id: any) => {
    try {
      productDeleteMutation.mutate(id, {
        onSuccess: (responseData) => {
          setStateChange((prev) => !prev);
          setMessageType({
            message: "Product Delete Successfully!",
            type: "SUCCESS",
          });
          setConfirmModalOpen(false)
          setSelectedId(null)
        },
        onError: (err: any) => {
          setMessageType({
            message: err?.response?.data?.message,
            type: "ERROR",
          });
          setConfirmModalOpen(false)
          setSelectedId(null)
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ height: 530 }}>
      <DataGrid
        rows={products}
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

      {/* //delete confirmation modal */}
      <ConfirmModal>
        <div className="flex flex-col items-center space-y-2">
          <h1 className="font-medium text-dark-color capitalize py-4 text-lg">
            {isAmh
              ? "እርግጠኛ ነዎት ይህን ምርት መሰረዝ ይፈልጋሉ?"
              : "are u sure you want to delete this product"}
          </h1>
          <div
            onClick={() => deleteProductMutationHandler(selectedId)}
            className="flex  items-center justify-center space-x-5"
          >
            <button className="hover:bg-red-bg/80 bg-red-bg p-2 px-12 rounded-sm text-white font-medium">
              {isAmh ? "እርግጠኛ ነኝ" : "Yes"}
            </button>
            <button
              onClick={() => {
                setConfirmModalOpen(false);
                setSelectedId(null);
              }}
              className="hover:bg-main-bg/80 bg-main-bg p-2 px-12 rounded-sm text-white font-medium"
            >
              {isAmh ? "አይ" : "No"}
            </button>
          </div>
        </div>
      </ConfirmModal>
    </div>
  );
};

export default ProductTable;
