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
import { IUser } from "../../../../types/User";
import { useHome } from "../../../../context/HomeContext";
import ConfirmModal from "../../../../utils/ConfirmModal";
import { buttonStyle } from "../../../../styles/Style";
import { useAuth } from "../../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
interface Props {
  deliveries: IUser[];
  setStateChange: React.Dispatch<React.SetStateAction<boolean>>;
}
enum ActionType {
  ACTIVATE = "ACTIVATE",
  DEACTIVATE = "DEACTIVATE",
}
const DeliveryTable = ({ deliveries, setStateChange }: Props) => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { isAmh, setConfirmModalOpen, setMessageType } = useHome();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [accountType, setAccountType] = useState<ActionType | null>(null);
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
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
      width: 180,
      headerClassName: "super-app-theme--header",
    },
    // {
    //   field: "address",
    //   headerName: "address",
    //   sortable: false,
    //   filterable: false,
    //   width: 170,
    //   headerClassName: "super-app-theme--header",
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
            {params.row?.isAccountHidden ? (
              <button
                onClick={() => {
                  setAccountType(ActionType.ACTIVATE);
                  setConfirmModalOpen(true);
                  setSelectedId(params.row._id);
                }}
                className={`${
                  params.row?.isAccountHidden ? "bg-blue-bg" : "bg-main-bg"
                } rounded-sm hover:opacity-80
              text-center px-7 p-1 font-medium text-sm text-white`}
              >
                Activate
              </button>
            ) : (
              <button
                onClick={() => {
                  setAccountType(ActionType.DEACTIVATE);
                  setConfirmModalOpen(true);
                  setSelectedId(params.row._id);
                }}
                className={`${
                  params.row?.isAccountHidden ? "bg-blue-bg" : "bg-main-bg"
                } rounded-sm hover:opacity-80
              text-center px-5 p-1 font-medium text-sm text-white`}
              >
                DeActivate
              </button>
            )}
            <button
              onClick={() => navigate(`/deliveries/detail/${params.row._id}`)}
              className="bg-red-bg rounded-sm hover:opacity-80
                    text-center px-5 p-1 font-medium text-sm text-white"
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

  const accountPrivilegeMutation = useMutation(
    async (id) =>
      await axios.put(
        accountType !== "ACTIVATE"
          ? `${import.meta.env.VITE_REACT_APP_BACKEND_URL}user/deactivate/${id}`
          : `${import.meta.env.VITE_REACT_APP_BACKEND_URL}user/activate/${id}`,
        {},
        { headers }
      ),
    {
      retry: false,
    }
  );
  const accountPrivilegeMutationHandler = async (id: any) => {
    try {
      accountPrivilegeMutation.mutate(id, {
        onSuccess: (responseData) => {
          setStateChange((prev) => !prev);
          setMessageType({
            message:
              accountType !== "ACTIVATE"
                ? "Account Deactivated Successfully!"
                : "Account Activated Successfully!",
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
        rows={deliveries}
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
      {/* confirmation modal */}
      <ConfirmModal>
        <div className="flex flex-col items-center space-y-2">
          <div className="flex flex-col items-center justify-center pb-3">
            <h1 className="font-medium text-dark-color capitalize text-center text-md">
              {accountType !== "ACTIVATE"
                ? isAmh
                  ? "እርግጠኛ ነዎት ይህን መለያ ማቦዘን ይፈልጋሉ ?"
                  : "are u sure you want to deactivate this account."
                : isAmh
                ? "እርግጠኛ ነዎት ይህን መለያ ማግበር ይፈልጋሉ ?"
                : "are u sure you want to activate this account ?"}
            </h1>
            <p className="font-medium text-dark-color capitalize text-center">
              {accountType === "ACTIVATE"
                ? isAmh
                  ? "ይህ ተጠቃሚው የማድረስ ሰው መተግበሪያን እንዲጠቀም ያስችለዋል::"
                  : "this will allow the user to use the delivery man app!"
                : isAmh
                ? "ይህ ተጠቃሚው የማድረስ ሰው መተግበሪያን እንዳይጠቀም ይከለክላል !"
                : "this will prevent the user from using  delivery man app !"}
            </p>
          </div>
          <div
            // onClick={() => deleteProductMutationHandler(selectedId)}
            className="flex  items-center justify-center space-x-5"
          >
            <button
              disabled={accountPrivilegeMutation.isLoading}
              onClick={() => accountPrivilegeMutationHandler(selectedId)}
              className={"hover:bg-red-bg/80 bg-red-bg px-14 " + buttonStyle}
            >
              {isAmh ? "እርግጠኛ ነኝ" : "Yes"}
            </button>
            <button
              disabled={accountPrivilegeMutation.isLoading}
              onClick={() => {
                setConfirmModalOpen(false);
                setSelectedId(null);
                setAccountType(null);
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

export default DeliveryTable;
