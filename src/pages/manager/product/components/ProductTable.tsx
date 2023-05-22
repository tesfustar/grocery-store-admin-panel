import React, { useState } from "react";
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
import { useAuth } from "../../../../context/AuthContext";
import { useHome } from "../../../../context/HomeContext";
import { buttonStyle } from "../../../../styles/Style";
import ConfirmModal from "../../../../utils/ConfirmModal";
interface Props {
  products: Array<object>;
  setStateChange: React.Dispatch<React.SetStateAction<boolean>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEditProductId: React.Dispatch<React.SetStateAction<string | null>>;
}
const ProductTable = ({
  products,
  setStateChange,
  setIsModalOpen,
  setEditProductId,
}: Props) => {
  const { token } = useAuth();
  const { isAmh, setConfirmModalOpen, setMessageType } = useHome();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
  const columns: GridColDef[] = [
    { field: "index", headerName: "ID", width: 70 },
    {
      field: "name",
      headerName: "Name",
      width: 170,
      sortable: false,
      filterable: false,
      headerClassName: "super-app-theme--header",
      renderCell: (params: GridCellParams) => {
        return <h3>{params.row.product.name}</h3>;
      },
    },
    {
      field: "nameAm",
      headerName: "amharic name",
      sortable: false,
      filterable: false,
      width: 170,
      headerClassName: "super-app-theme--header",
      renderCell: (params: GridCellParams) => {
        return <h3>{params.row.product.nameAm}</h3>;
      },
    },
    {
      field: "wholeSalePrice",
      headerName: "price",
      sortable: false,
      filterable: false,
      width: 140,
      headerClassName: "super-app-theme--header",
      renderCell: (params: GridCellParams) => {
        return (
          <h3 className="text-main-color font-semibold">
            ETB {params.row.product.price}/{params.row.product.priceType}{" "}
          </h3>
        );
      },
    },
    {
      field: "availableQuantity",
      headerName: "availableQuantity",
      sortable: false,
      filterable: false,
      width: 150,
      headerClassName: "super-app-theme--header",
      renderCell: (params: GridCellParams) => {
        return <h3>{params.row.availableQuantity}</h3>;
      },
    },
    {
      field: "image",
      headerName: "Image",
      sortable: false,
      filterable: false,
      align: "center",
      headerAlign: "center",
      width: 130,
      renderCell: (params: GridCellParams) => {
        return (
          <img
            src={params.row.product.image[0]}
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
            >
              Delete
            </button>
            <button
              onClick={() => {
                setEditProductId(params.row._id);
                setIsModalOpen(true);
              }}
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
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}store/remove/${id}`,
        { headers }
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
            message: "Product Deleted Successfully!",
            type: "SUCCESS",
          });
          setConfirmModalOpen(false);
          setSelectedId(null);
        },
        onError: (err: any) => {
          setMessageType({
            message: err?.response?.data?.message,
            type: "ERROR",
          });
          setConfirmModalOpen(false);
          setSelectedId(null);
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
          <div className="flex  items-center justify-center space-x-5">
            <button
              disabled={productDeleteMutation.isLoading}
              onClick={() => {
                deleteProductMutationHandler(selectedId);
              }}
              className={"hover:bg-red-bg/80 bg-red-bg px-14 " + buttonStyle}
            >
              {isAmh ? "እርግጠኛ ነኝ" : "Yes"}
            </button>
            <button
              disabled={productDeleteMutation.isLoading}
              onClick={() => {
                setConfirmModalOpen(false);
                setSelectedId(null);
              }}
              className={"px-14 " + buttonStyle}
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
