import "../App.css"
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';


const Users = () =>{
    let navigate = useNavigate()

    useEffect(() => {
      userAuthenticated();
      usersDataGrid();
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

      function usersDataGrid() {
        const { data } = userData({
          dataSet: 'users',
          rowLength: 100000,
          editable: true,
        });
      
        return (
          <div style={{ height: 520, width: '100%' }}>
            <DataGrid
              {...data}
              loading={data.rows.length === 0}
              rowHeight={38}
              checkboxSelection
              disableSelectionOnClick
            />
          </div>
        );
      }


};

export default Users;

  