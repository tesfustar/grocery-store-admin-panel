import React,{useState} from "react";
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
import { buttonStyle } from "../../../../styles/Style";
import ConfirmModal from "../../../../utils/ConfirmModal";
import { useHome } from "../../../../context/HomeContext";

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
  const { isAmh, setConfirmModalOpen, setMessageType } = useHome();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const columns: GridColDef[] = [
    { field: "index", headerName: "ID", width: 110 },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      sortable: false,
      filterable: false,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "nameAm",
      headerName: "amharic name",
      sortable: false,
      filterable: false,
      width: 200,
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
      width: 300,
      renderCell: (params: GridCellParams) => {
        return (
          <div className="flex items-center space-x-3">
            <button
              className="bg-blue-bg rounded-sm hover:opacity-80
                    text-center px-5 p-1 font-medium text-sm text-white"
              onClick={() => {setSelectedId(params.row._id);setConfirmModalOpen(true)}}
            >
              Delete
            </button>
            <button
              onClick={() => {
                setEditCategoryId(params.row._id);
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
          setMessageType({
            message: "Category Deleted Successfully!",
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
    <div style={{ height: 530 }} className="w-full">
      <DataGrid
        rows={categories}
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
      {/* delete category confirmation */}
      <ConfirmModal>
        <div className="flex flex-col items-center space-y-2">
          <p>{isAmh ? ""  : "are u sure you want to delete this category"}</p>
          <div className="flex  items-center justify-center space-x-5">
            <button
              disabled={categoryDeleteMutation.isLoading
              }
              onClick={() => {deleteCategoryMutationHandler(selectedId)}}
              // updateFeaturedMutationHandler
              className={"hover:bg-red-bg/80 bg-red-bg px-14 " + buttonStyle}
            >
              {isAmh ? "እርግጠኛ ነኝ" : "Yes"}
            </button>
            <button
              disabled={categoryDeleteMutation.isLoading
              }
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

export default CategoryTable;
