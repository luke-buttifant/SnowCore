import "../App.css"
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import AdminNav from "../components/adminNav";
//import { Button } from 'react-bootstrap';
import Snackbar from '@mui/material/Snackbar';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';





const Users = () =>{
    let navigate = useNavigate()

    useEffect(() => {
      userAuthenticated();
      // usersDataGrid();
      getUsersrData();
      }, [navigate]);

      const [data, setData] = useState({})

      const [users, userData] = useState({})


      const userAuthenticated = async () => {
        var user = await axios.get("/api/users/currentUser", {headers: {
        "x-access-token": localStorage.getItem("jwt")
      }}).then((response) => {
        setData(response.data)
        if(response.data.message == "authentication failed"){
          localStorage.removeItem("jwt");
          navigate("/login")
        }
      })
    }

    const getUsersrData = async () => {
      await axios.get("/api/users").then((response) => {
      console.log(response.data)
      userData(response.data)
    })};

      // function usersDataGrid() {
      //   const { data } = userData({
      //     dataSet: 'users',
      //     rowLength: 100000,
      //     editable: true,
      //   })};

      //Editing with confirmation
      const useFakeMutation = () => {
        return React.useCallback(
          (user) =>
            new Promise((resolve, reject) =>
              setTimeout(() => {
                if (user.name?.trim() === '') {
                  reject();
                } else {
                  resolve(user);
                }
              }, 200),
            ),
          [],
        );
      };
      
      function computeMutation(newRow, oldRow) {
        if (newRow.name !== oldRow.name) {
          return `Name from '${oldRow.name}' to '${newRow.name}'`;
        }
        if (newRow.age !== oldRow.age) {
          return `Age from '${oldRow.age || ''}' to '${newRow.age || ''}'`;
        }
        return null;
      }

      const mutateRow = useFakeMutation();
  const noButtonRef = React.useRef(null);
  const [promiseArguments, setPromiseArguments] = React.useState(null);

  const [snackbar, setSnackbar] = React.useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const processRowUpdate = React.useCallback(
    (newRow, oldRow) =>
      new Promise((resolve, reject) => {
        const mutation = computeMutation(newRow, oldRow);
        if (mutation) {
          // Save the arguments to resolve or reject the promise later
          setPromiseArguments({ resolve, reject, newRow, oldRow });
        } else {
          resolve(oldRow); // Nothing was changed
        }
      }),
    [],
  );

  const handleNo = () => {
    const { oldRow, resolve } = promiseArguments;
    resolve(oldRow); // Resolve with the old row to not update the internal state
    setPromiseArguments(null);
  };

  const handleYes = async () => {
    const { newRow, oldRow, reject, resolve } = promiseArguments;

    try {
      // Make the HTTP request to save in the backend
      
        await axios.get("/api/users/adminDataUpdate", {
          first_name: users,
          last_name: users,
          email: users,
          gender: users,
          dob: users
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        })
    
      
      const response = await mutateRow(newRow);
      setSnackbar({ children: 'User successfully saved', severity: 'success' });
      resolve(response);
      setPromiseArguments(null);
    } catch (error) {
      setSnackbar({ children: "Name can't be empty", severity: 'error' });
      reject(oldRow);
      setPromiseArguments(null);
    }
  };

  const handleEntered = () => {
    // The `autoFocus` is not used because, if used, the same Enter that saves
    // the cell triggers "No". Instead, we manually focus the "No" button once
    // the dialog is fully open.
    // noButtonRef.current?.focus();
  };

  const renderConfirmDialog = () => {
    if (!promiseArguments) {
      return null;
    }

    const { newRow, oldRow } = promiseArguments;
    const mutation = computeMutation(newRow, oldRow);
    return (
      <Dialog
        maxWidth="xs"
        TransitionProps={{ onEntered: handleEntered }}
        open={!!promiseArguments}
      >
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent dividers>
          {`Pressing 'Yes' will change ${mutation}.`}
        </DialogContent>
        <DialogActions>
          <Button ref={noButtonRef} onClick={handleNo}>
            No
          </Button>
          <Button onClick={handleYes}>Yes</Button>
        </DialogActions>
      </Dialog>
    );
  };




      //Columns
        const columns = [
          { field: 'id', headerName: 'ID', width: 90 },
          {
            field: 'first_name',
            headerName: 'First name',
            width: 150,
            editable: true,
            
          },
          {
            field: 'last_name',
            headerName: 'Last name',
            width: 150,
            editable: true,
          },
          {
            field: 'email',
            headerName: 'Email',
            width: 110,
            editable: true,
          },
          {
            field: 'gender',
            headerName: 'Gender',
            width: 160,
          },
          {
            field: 'dob',
            headerName: 'Date of Birth',
            width: 110,
            editable: true,
          },
        ];
      var rows = []
        for(let i = 0; i < users.length; i++){
          rows.push({id: i, first_name: users[i].first_name, last_name: users[i].last_name, email: users[i].email, gender: users[i].gender, dob: users[i].dob})
        }

        
return (
  renderConfirmDialog(),
  <>
  <AdminNav />
  <div style={{ width: '100%' }}>
  <div className="bg-white mx-auto" style={{ height: 520, width: '80%' }}>
    <DataGrid
      columns={columns}
      rows={rows}
      loading={users.length === 0}
      rowHeight={50}
      checkboxSelection
      disableSelectionOnClick
      experimentalFeatures={{ newEditingApi: true }}
      processRowUpdate={processRowUpdate}

      
      {...data}
    />
    {!!snackbar && (
        <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={6000}>
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
  </div>
  </div>
  </>
);


};

export default Users;

  