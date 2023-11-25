import React from "react";
import { Stack, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import toast from "react-hot-toast";

import { deleteAProduct, getAllProducts } from "../../api";
import { setAllProducts } from "../../app/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";

const DBItemsActions = ({ params }) => {
  const dispatch = useDispatch();

  return (
    <>
      <Stack direction="row" spacing={1}>
        <Tooltip title="Preview">
          <IconButton aria-label="preview">
            <VisibilityIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit">
          <IconButton aria-label="edit">
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            aria-label="delete"
            onClick={() => {
              if (window.confirm("Are you want to delete this product?")) {
                deleteAProduct(params.row?.product_id).then((res) => {
                  toast.success("Product deleted successfully!");
                  getAllProducts().then((data) => {
                    dispatch(setAllProducts(data));
                  });
                });
              }
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Stack>
    </>
  );
};

export default DBItemsActions;
