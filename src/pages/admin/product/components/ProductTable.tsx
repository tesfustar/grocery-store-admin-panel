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
import { Switch } from "@headlessui/react";
import { buttonStyle } from "../../../../styles/Style";
import { useAuth } from "../../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
interface Props {
  products: Array<object>;
  setStateChange: React.Dispatch<React.SetStateAction<boolean>>;
}
enum ActionType {
  DeleteProduct = "DELETE_PRODUCT",
  CheckStock = "CHECK_STOCK",
  Featured = "Featured",
}
enum StockType {
  InStock = "InStock",
  OutOfStock = "OutOfStock",
}
enum FeaturedType {
  Featured = "Featured",
  Normal = "Normal",
}
const ProductTable = ({ products, setStateChange }: Props) => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { isAmh, setConfirmModalOpen, setMessageType } = useHome();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [actionType, setActionType] = useState<ActionType | null>(null);
  const [stockType, setStockType] = useState<StockType | null>(null);
  const [featuredType, setFeaturedType] = useState<FeaturedType | null>(null);
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
      width: 130,
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
      field: "price",
      headerName: "price",
      sortable: false,
      filterable: false,
      width: 140,
      headerClassName: "super-app-theme--header",
      renderCell: (params: GridCellParams) => {
        return (
          <h3 className="font-semibold text-main-color">
            {params.row.price + " " + "ETB/" + params.row.priceType}
          </h3>
        );
      },
    },
    {
      field: "category",
      headerName: "category",
      sortable: false,
      filterable: false,
      width: 140,
      headerClassName: "super-app-theme--header",
      renderCell: (params: GridCellParams) => {
        return <h3>{params.row.category.name}</h3>;
      },
    },
    {
      field: "isTodaysPick",
      headerName: "is Featured",
      sortable: false,
      filterable: false,
      width: 130,
      align:"center",
      renderCell: (params: GridCellParams) => {
        return <p className="bg-main-bg/30 text-main-color text-sm font-semibold p-1 rounded-md">{params.row.isTodaysPick && "Featured"}</p>;
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
            className="h-11 w-16 rounded-sm object-cover"
          />
        );
      },
    },
    {
      field: "action",
      headerName: "action",
      sortable: false,
      filterable: false,
      width: 370,
      renderCell: (params: GridCellParams) => {
        return (
          <div className="flex items-center space-x-3">
            <button
              className="bg-main-bg rounded-sm hover:opacity-80
                    text-center px-5 p-1 font-medium text-sm text-white"
              onClick={() => {
                setActionType(ActionType.DeleteProduct);
                setConfirmModalOpen(true);
                setSelectedId(params.row._id);
              }}
              disabled={productDeleteMutation.isLoading}
            >
              Delete
            </button>
            <button
              disabled={productDeleteMutation.isLoading}
              onClick={() =>
                navigate(`/products/edit-product/${params.row._id}`)
              }
              className="bg-blue-bg rounded-sm hover:opacity-80
                    text-center px-5 p-1 font-medium text-sm text-white"
            >
              Edit
            </button>

            <button
              disabled={productDeleteMutation.isLoading}
              onClick={() => {
                setFeaturedType(
                  params.row.isTodaysPick
                    ? FeaturedType.Normal
                    : FeaturedType.Featured
                );
                setActionType(ActionType.Featured);
                setConfirmModalOpen(true);
                setSelectedId(params.row._id);
              }}
              className="bg-blue-bg rounded-sm hover:opacity-80
                    text-center px-5 p-1 font-medium text-sm text-white"
            >
              {params.row.isTodaysPick ? "Remove" : "Featured"}
            </button>

            <Switch
              title={params.row.isOutOfStock ? "out of stock" : "in stock"}
              checked={params.row.isOutOfStock}
              onChange={() => {
                setActionType(ActionType.CheckStock);
                setConfirmModalOpen(true);
                setSelectedId(params.row._id);
                params.row.isOutOfStock
                  ? setStockType(StockType.OutOfStock) //means now make it in stock
                  : setStockType(StockType.InStock); //means now make it out stock
              }}
              className={`${
                params.row.isOutOfStock ? "bg-red-bg" : "bg-gray-300"
              } relative inline-flex h-6 w-14 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span
                aria-hidden="true"
                className={`${
                  params.row.isOutOfStock ? "translate-x-8" : "translate-x-0"
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

  const productDeleteMutation = useMutation(
    async (id) =>
      await axios.delete(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_URL
        }product/find/remove/${id}`,
        { headers }
      ),
    {
      retry: false,
    }
  );

  const updateStockTypeMutation = useMutation(
    async (id) =>
      await axios.put(
        stockType === StockType.OutOfStock
          ? `${
              import.meta.env.VITE_REACT_APP_BACKEND_URL
            }product/in-stock/${id}`
          : `${
              import.meta.env.VITE_REACT_APP_BACKEND_URL
            }product/out-of-stock/${id}`,
        {}, // pass an empty object as the request body
        { headers }
      ),
    {
      retry: false,
    }
  );

  const updateFeaturedTypeMutation = useMutation(
    async (id) =>
      await axios.put(
        featuredType === FeaturedType.Featured
          ? `${
              import.meta.env.VITE_REACT_APP_BACKEND_URL
            }product/featured/${id}`
          : `${
              import.meta.env.VITE_REACT_APP_BACKEND_URL
            }product/featured-remove/${id}`,
        {}, // pass an empty object as the request body
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
          setActionType(null);
          setStockType(null);
        },
        onError: (err: any) => {
          setMessageType({
            message: err?.response?.data?.message,
            type: "ERROR",
          });
          setConfirmModalOpen(false);
          setSelectedId(null);
          setActionType(null);
          setStockType(null);
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  //update stock type
  const updateStockMutationHandler = async (id: any) => {
    try {
      updateStockTypeMutation.mutate(id, {
        onSuccess: (responseData) => {
          setStateChange((prev) => !prev);
          setMessageType({
            message:
              stockType === StockType.OutOfStock
                ? "Product Returned To Stock!"
                : "Product Is Out OF Stock!",
            type: "SUCCESS",
          });
          setConfirmModalOpen(false);
          setSelectedId(null);
          setActionType(null);
          setStockType(null);
        },
        onError: (err: any) => {
          setMessageType({
            message: err?.response?.data?.message,
            type: "ERROR",
          });
          setConfirmModalOpen(false);
          setSelectedId(null);
          setActionType(null);
          setStockType(null);
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  //update featured type
  const updateFeaturedMutationHandler = async (id: any) => {
    try {
      updateFeaturedTypeMutation.mutate(id, {
        onSuccess: (responseData) => {
          setStateChange((prev) => !prev);
          setMessageType({
            message:
              featuredType === FeaturedType.Featured
                ? "Product Featured successfully!"
                : "Product removed From Featured List!",
            type: "SUCCESS",
          });
          setConfirmModalOpen(false);
          setSelectedId(null);
          setActionType(null);
          setStockType(null);
          setFeaturedType(null);
        },
        onError: (err: any) => {
          setMessageType({
            message: err?.response?.data?.message,
            type: "ERROR",
          });
          setConfirmModalOpen(false);
          setSelectedId(null);
          setActionType(null);
          setStockType(null);
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  function StockConfirmationMessage() {
    return (
      <div>
        {stockType === StockType.OutOfStock ? (
          <div>
            {" "}
            <h1 className="font-medium text-dark-color capitalize text-center text-lg">
              {isAmh
                ? "ይህ ምርት በአሁኑ ጊዜ ሊገኝ የሚችል መሆኑን እርግጠኛ ነዎት?"
                : "You are sure that this product is currently available ?"}
            </h1>
            <p className="font-normal text-sm text-dark-color capitalize text-center">
              {" "}
              {isAmh
                ? "ይህንን ካረጋገጡ፣ ይህ ምርት ለደንበኞች ይህንን ካረጋገጡ፣ ይህ ምርት ለደንበኞች ይገኛል። እና ይህን ምርት ማዘዝ ይችላል !"
                : "If you confirm this, this product will be available for customers. and can order this product!"}
            </p>
          </div>
        ) : (
          <div>
            {" "}
            <h1 className="font-medium text-dark-color capitalize text-center ">
              {isAmh
                ? "ይህ ምርት በአሁኑ ጊዜ እንደማይገኝ እርግጠኛ ነዎት ? "
                : "You are sure that this product is currently unavailable ? "}
            </h1>
            <p className="font-normal text-sm text-dark-color capitalize text-center">
              {" "}
              {isAmh
                ? "ይህንን ካረጋገጡ ደንበኞች ሊያዩት አይችሉም። እና ይህን ምርት ማዘዝ አይችሉም !"
                : "If you check this, customers won't be able to see it. And they can not order this product!"}
            </p>
          </div>
        )}
      </div>
    );
  }

  //product featured message
  function FeaturedConfirmationMessage() {
    return (
      <div>
        {featuredType === FeaturedType.Featured ? (
          <div>
            {" "}
            <h1 className="font-medium text-dark-color capitalize text-center text-lg">
              {isAmh
                ? "ይህ ምርት በአሁኑ ጊዜ ሊገኝ የሚችል መሆኑን እርግጠኛ ነዎት?"
                : "You are sure you want to make this product featured ?"}
            </h1>
          </div>
        ) : (
          <div>
            {" "}
            <h1 className="font-medium text-dark-color capitalize text-center ">
              {isAmh
                ? "ይህ ምርት በአሁኑ ጊዜ እንደማይገኝ እርግጠኛ ነዎት ? "
                : "You are sure you want to remove this product from featured lists ? "}
            </h1>
          </div>
        )}
      </div>
    );
  }
  function ProductDeleteMessage() {
    return (
      <div>
        <h1 className="font-medium text-dark-color capitalize py-4 text-lg">
          {isAmh
            ? "እርግጠኛ ነዎት ይህን ምርት መሰረዝ ይፈልጋሉ?"
            : "are u sure you want to delete this product"}
        </h1>
      </div>
    );
  }
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
          {actionType === ActionType.DeleteProduct ? (
            <ProductDeleteMessage />
          ) : actionType === ActionType.Featured ? (
            <FeaturedConfirmationMessage />
          ) : (
            <StockConfirmationMessage />
          )}
          <div className="flex  items-center justify-center space-x-5">
            <button
              disabled={
                updateStockTypeMutation.isLoading ||
                productDeleteMutation.isLoading
              }
              onClick={() => {
                actionType === ActionType.DeleteProduct
                  ? deleteProductMutationHandler(selectedId)
                  : actionType === ActionType.Featured
                  ? updateFeaturedMutationHandler(selectedId)
                  : updateStockMutationHandler(selectedId);
              }}
              // updateFeaturedMutationHandler
              className={"hover:bg-red-bg/80 bg-red-bg px-14 " + buttonStyle}
            >
              {isAmh ? "እርግጠኛ ነኝ" : "Yes"}
            </button>
            <button
              disabled={
                updateStockTypeMutation.isLoading ||
                productDeleteMutation.isLoading
              }
              onClick={() => {
                setConfirmModalOpen(false);
                setSelectedId(null);
                setActionType(null);
                setStockType(null);
                setFeaturedType(null);
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
