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
import { Box } from "@mui/material/node_modules/@mui/system";




export const Users = () => {
  let navigate = useNavigate()
  const [loading, setLoading] = useState(true)

    useEffect(() => {
      userAuthenticated();
      getUsersrData();
      }, [navigate]);

      const [data, setData] = useState({})

      const [users, setUsers] = useState([])
      const [favourites, setFavourites] = useState([])


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
      setUsers(response.data)
        axios.get("/api/favourite/getAllFavourites").then((response) => {
        setFavourites(response.data)
        })
      setLoading(false)
    })};

    let row = []
    for (let u = 0; u < users.length; u++){
      for(let f = 0; f < favourites.length; f++){
        if(users[u]._id === favourites[f].user_ID){
          row.push({...users[u], brides_Les_Bains: favourites[f].brides_Les_Bains, courchevel: favourites[f].courchevel,
             LesMenuires: favourites[f].les_Menuires, valThorens: favourites[f].val_Thorens,
               meribel: favourites[f].Méribel, orelle: favourites[f].orelle, 
                stMartin: favourites[f].saint_Martin_De_Belleville
          })
        }
      }
    }
      //Columns
        const columns = [
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
            editable: false
          },
          {
            field: 'gender',
            headerName: 'Gender',
            width: 160,
            editable: true
          },
          {
            field: 'dob',
            headerName: 'Date of Birth',
            width: 110,
            type: 'date',
            editable: true,
          },
          {
            field: 'courchevel',
            headerName: 'Courchevel',
            width: 110,
            editable: true,
          },
          {
            field: 'meribel',
            headerName: 'Meribel',
            width: 110,
            editable: true,
          },
          {
            field: 'LesMenuires',
            headerName: 'Les Menuires',
            width: 110,
            editable: true,
          },
          {
            field: 'brides_Les_Bains',
            headerName: 'Brides Les Bains',
            width: 110,
            editable: true,
          },
          {
            field: 'orelle',
            headerName: 'Orelles',
            width: 110,
            editable: true,
          },
          {
            field: 'stMartin',
            headerName: 'St Martin De BelleVille',
            width: 110,
            editable: true,
          },
          {
            field: 'valThorens',
            headerName: 'Val Thorens',
            width: 110,
            editable: true,
          },
          

        ];

        const useFakeMutation = () => {
          return React.useCallback(
            (newRow) =>
              new Promise((resolve, reject) => {
                  if (newRow.first_name?.trim() === '') {
                    reject(new Error("Error while saving user: name can't be empty."));
                  } else {
                    resolve(
                      axios.post("/api/users/dataGridUpdate", {
                      email: newRow.email,
                      first_name: newRow.first_name,
                      last_name: newRow.last_name,
                      gender: newRow.gender,
                      dob: newRow.dob
                    }));
                  }
                }
              ),
            [],
          );
        };
        const mutateRow = useFakeMutation();

        const [snackbar, setSnackbar] = React.useState(null);
      
        const handleCloseSnackbar = () => setSnackbar(null);
      
        const processRowUpdate = React.useCallback(
          async (newRow) => {
            // Make the HTTP request to save in the backend
            const response = await mutateRow(newRow)
            setSnackbar({ children: 'User successfully saved', severity: 'success' });
            return response;
          },
          [mutateRow],
        );

        const handleProcessRowUpdateError = React.useCallback((error) => {
          setSnackbar({ children: "Succesfully Updated User", severity: 'success' });
        }, []);

  return (
    <>
    <AdminNav />
    <div style={{ height: 600, width: '80%', marginInline: "auto", backgroundColor: "white"}}>
    <Box
      sx={{
        height: 600,
        width: 1,
        '& .green': {
          backgroundColor: '#77DD77',
          color: '#1a3e72',
        },
        '& .red': {
          backgroundColor: '#ff6961',
          color: '#fff',
        },
      }}
    >
      <DataGrid
      loading={loading}
      getRowId={(row) => row.email}
        rows={row}
        columns={columns}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={handleProcessRowUpdateError}
        experimentalFeatures={{ newEditingApi: true }}
        getCellClassName={(params) => {
          if (params.field == "first_name" || params.field == "last_name" || params.field == "email" || params.field == "gender" || params.field == "dob") {
            return '';
          }
          return params.value > 0 ? 'green' : 'red';
        }}
      />
      </Box>
      {!!snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          onClose={handleCloseSnackbar}
          autoHideDuration={6000}
        >
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </div>
    </>
  );
}



export default Users;

  