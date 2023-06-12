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
import { useAuth } from "../../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
interface Props {
  products: Array<object>;
}

const TopSellProductTable = ({ products }:Props) => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  }
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
    </div>
  );
};


export default TopSellProductTable