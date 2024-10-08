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
import { IUser } from "../../../../types/User";
import { useNavigate } from "react-router-dom";

interface Props {
  customers: IUser[];
  setStateChange: React.Dispatch<React.SetStateAction<boolean>>;
}
const CustomerTable = ({ customers, setStateChange }: Props) => {
  const navigate = useNavigate()
  const columns: GridColDef[] = [
    { field: "index", headerName: "ID", width: 70 },
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
      width: 120,
      sortable: false,
      filterable: false,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "lastName",
      headerName: "last Name",
      sortable: false,
      filterable: false,
      width: 140,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "phone",
      headerName: "phone",
      sortable: false,
      filterable: false,
      width: 130,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "email",
      headerName: "email",
      sortable: false,
      filterable: false,
      width: 170,
      headerClassName: "super-app-theme--header",
    },
    // {
    //   field: "action",
    //   headerName: "action",
    //   sortable: false,
    //   filterable: false,
    //   width: 130,
    //   renderCell: (params: GridCellParams) => {
    //     return (
    //       <div className="flex items-center space-x-3">
    //         <button
    //           onClick={() => navigate(`/customers/${params.row._id}`)}
    //           className="bg-blue-bg rounded-sm hover:opacity-80
    //                 text-center px-10 p-1 font-medium text-sm text-white"
    //         >
    //           Details
    //         </button>
    //       </div>
    //     );
    //   },
    // },
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
        rows={customers}
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

export default CustomerTable;
