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
import { useNavigate } from "react-router-dom";
import { IBranchAdmin } from "../../../../types/BranchAdmin";
import ConfirmModal from "../../../../utils/ConfirmModal";
import { buttonStyle } from "../../../../styles/Style";
import { useAuth } from "../../../../context/AuthContext";
import { useHome } from "../../../../context/HomeContext";
interface Props {
  branchAdmin: IBranchAdmin[];
  setStateChange: React.Dispatch<React.SetStateAction<boolean>>;
}
enum ActionType {
  ACTIVATE = "ACTIVATE",
  DEACTIVATE = "DEACTIVATE",
}
enum ActionType {
  DeleteAccount = "DELETE_ACCOUNT",
  Activation = "ACTIVATION",
}
const BranchAdminTable = ({ branchAdmin, setStateChange }: Props) => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { isAmh, setConfirmModalOpen, setMessageType } = useHome();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [accountType, setAccountType] = useState<ActionType | null>(null);
  const [actionType, setActionType] = useState<ActionType | null>(null);
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
  const columns: GridColDef[] = [
    { field: "index", headerName: "ID", width: 40 },
    {
      field: "profile",
      headerName: "profile",
      sortable: false,
      filterable: false,
      width: 70,
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
      width: 100,
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
      width: 130,
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
      field: "branch",
      headerName: "Branch",
      sortable: false,
      filterable: false,
      width: 130,
      renderCell: (params: GridCellParams) => {
        return (
          <h1>
            {params.row.branch?.name ? params.row.branch?.name : "Not Assigned"}
          </h1>
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
            {params.row?.isAccountHidden ? (
              <button
                onClick={() => {
                  setAccountType(ActionType.ACTIVATE);
                  setConfirmModalOpen(true);
                  setSelectedId(params.row._id);
                  setActionType(ActionType.Activation);
                }}
                className={`${
                  params.row?.isAccountHidden ? "bg-red-bg" : "bg-main-bg"
                } rounded-sm hover:opacity-80
              text-center px-7 p-1 font-medium text-sm text-white`}
              >
                Activate
              </button>
            ) : (
              <button
                onClick={() => {
                  setActionType(ActionType.Activation);
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
              onClick={() => {
                setActionType(ActionType.DeleteAccount);
                setConfirmModalOpen(true);
                setSelectedId(params.row._id);
              }}
              className="bg-blue-bg rounded-sm hover:opacity-80
                    text-center px-5 p-1 font-medium text-sm text-white"
            >
              Delete Account
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
          {}, //send empty body
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

  const deleteAccountMutation = useMutation(
    async (id) =>
      await axios.delete(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}user/remove/${id}`,
        { headers }
      ),
    {
      retry: false,
    }
  );
  const deleteAccountMutationHandler = async (id: any) => {
    try {
      deleteAccountMutation.mutate(id, {
        onSuccess: (responseData) => {
          setStateChange((prev) => !prev);
          setMessageType({
            message: "Account Deleted Successfully!",
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
  function DeleteAccountMessage() {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1 className="font-medium text-dark-color capitalize text-center text-md">
          {isAmh
            ? "እርግጠኛ ነዎት ይህን መለያ መሰረዝ ይፈልጋሉ ?"
            : "are u sure you want to delete this account."}
        </h1>
        <p className="font-medium text-dark-color capitalize text-center py-1">
          {isAmh
            ? "ይህ ከዚህ ተጠቃሚ ጋር የተያያዙ ሁሉንም መረጃዎች ያስወግዳል!"
            : "this will remove all information related to this user!"}
        </p>
      </div>
    );
  }
  function ActivationAccountMessage() {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1 className="font-medium text-dark-color capitalize text-center text-md">
          {accountType !== "ACTIVATE"
            ? isAmh
              ? "እርግጠኛ ነዎት ይህን መለያ ማቦዘን ይፈልጋሉ ?"
              : "are u sure you want to deactivate this account."
            : isAmh
            ? "እርግጠኛ ነዎት ይህን መለያ ማግበር ይፈልጋሉ ?"
            : "are u sure you want to activate this account ?"}
        </h1>
        <p className="font-medium text-dark-color capitalize text-center py-1">
          {accountType === "ACTIVATE"
            ? isAmh
              ? "ይህንን ካረጋገጡ ተጠቃሚው ያንን ቅርንጫፍ የመቆጣጠር መብት አለው::"
              : "if you confirm this the user has privilege to control that branch!"
            : isAmh
            ? "ይህንን ካረጋገጡ ተጠቃሚው ያንን ቅርንጫፍ የመቆጣጠር መብት የለውም !"
            : "if you confirm this the user has no privilege to control that branch !"}
        </p>
      </div>
    );
  }
  return (
    <div style={{ height: 530 }}>
      <DataGrid
        rows={branchAdmin}
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
          <div className="flex flex-col items-center justify-center pb-2">
            {actionType === ActionType.Activation ? (
              <ActivationAccountMessage />
            ) : (
              <DeleteAccountMessage />
            )}
          </div>
          <div className="flex  items-center justify-center space-x-5">
            <button
              disabled={
                accountPrivilegeMutation.isLoading ||
                deleteAccountMutation.isLoading
              }
              onClick={() => {
                actionType === ActionType.Activation
                  ? accountPrivilegeMutationHandler(selectedId)
                  : deleteAccountMutationHandler(selectedId);
              }}
              className={"hover:bg-red-bg/80 bg-red-bg px-14 " + buttonStyle}
            >
              {isAmh ? "እርግጠኛ ነኝ" : "Yes"}
            </button>
            <button
              disabled={
                accountPrivilegeMutation.isLoading ||
                deleteAccountMutation.isLoading
              }
              onClick={() => {
                setConfirmModalOpen(false);
                setActionType(null);
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

export default BranchAdminTable;
