import "../App.css"
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import AdminNav from "../components/adminNav";


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
  <>
  <AdminNav />
  <div className="bg-white mx-auto" style={{ height: 520, width: '80%' }}>
    <DataGrid
      columns={columns}
      rows={rows}
      loading={users.length === 0}
      rowHeight={50}
      checkboxSelection
      disableSelectionOnClick
    />
  </div>
  </>
);


};

export default Users;

  