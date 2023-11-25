import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../../api";
import { setAllUsers } from "../../app/slices/allUsersSlice";
import { avatar } from "../../assets";

import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar } from "@mui/material";

const DBUsers = () => {
  const allUsers = useSelector((data) => data.allUsers);
  const rows = allUsers?.map((user) => ({ ...user }));
  console.log(allUsers);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!allUsers) {
      getAllUsers().then((data) => {
        dispatch(setAllUsers(data));
      });
    }
  }, []);

  const columns = [
    {
      field: "photoURL",
      headerName: "Photo",
      width: 80,
      renderCell: (params) => (
        <Avatar src={params.row?.photoURL ? params.row?.photoURL : avatar} />
      ),
      sortable: false,
      filterable: false,
    },
    {
      field: "displayName",
      headerName: "Name",
      width: 200,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
    },
    {
      field: "emailVerified",
      headerName: "Verified",
      width: 80,
    },
    { field: "uid", headerName: "ID", width: 240 },
    {
      field: "creationTime",
      headerName: "Created at",
      width: 240,
      renderCell: (params) => params.row?.metadata.creationTime,
    },
  ];

  return (
    <div className="">
      {allUsers && (
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row) => row.uid}
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
        </Box>
      )}
    </div>
  );
};

export default DBUsers;
