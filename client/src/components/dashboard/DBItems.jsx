import React, { useEffect } from "react";
import { HiCurrencyRupee } from "../../assets/icons";
import { useDispatch, useSelector } from "react-redux";
import { deleteAProduct, getAllProducts } from "../../api";
import { setAllProducts } from "../../app/slices/productSlice";
import { avatar } from "../../assets";

import { DataGrid } from "@mui/x-data-grid";
import DBItemsActions from "./DBItemsActions";

const DBItems = () => {
  const products = useSelector((data) => data.products);
  console.log(products);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!products) {
      getAllProducts().then((data) => {
        dispatch(setAllProducts(data));
      });
    }
  }, []);

  const columns = [
    {
      field: "imageURLs",
      headerName: "Image",
      width: 100,
      renderCell: (params) => (
        <img src={params.row?.imageURLs ? params.row?.imageURLs[0] : avatar} />
      ),
      sortable: false,
      filterable: false,
    },
    {
      field: "product_name",
      headerName: "Name",
      width: 200,
    },
    {
      field: "product_category",
      headerName: "Category",
      width: 100,
    },
    {
      field: "product_description",
      headerName: "Description",
      width: 180,
    },
    {
      field: "product_price",
      headerName: "Price",
      width: 120,
      renderCell: (params) => (
        <p className="text-md font-semibold text-textColor flex items-center justify-center ">
          <HiCurrencyRupee className="text-red-400" />
          {parseFloat(params.row.product_price).toFixed(2)}
        </p>
      ),
    },
    // { field: "product_id", headerName: "ID", width: 200 },
    {
      field: "added_by",
      headerName: "Added by",
      width: 120,
    },
    {
      field: "added_at",
      headerName: "Added at",
      width: 240,
    },
    {
      field: "added_at",
      headerName: "Added at",
      width: 240,
    },
    {
      field: "added_at",
      headerName: "Added at",
      width: 240,
    },

    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      width: 150,
      renderCell: (params) => <DBItemsActions {...{ params }} />,
    },
  ];

  return (
    <div className="w-full ">
      {products && (
        <div className="w-full h-420 ">
          <DataGrid
            className="scrollbar-thin"
            rows={products}
            columns={columns}
            getRowId={(row) => row.product_id}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </div>
      )}
    </div>
  );
};

export default DBItems;
