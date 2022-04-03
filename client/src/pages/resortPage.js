import "../App.css"
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import { IoConstructOutline } from "react-icons/io5";

const Resort = () =>{
   
    const [data, setData] = useState({})
    const [weather, setWeather] = useState({})

  let navigate = useNavigate()

  useEffect(() => {
      userAuthenticated();
      getWeatherData();



    }, [navigate]);



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


  const getWeatherData = async () => {
    await axios.get("/api/weather/getWeather").then((response) => {
    console.log(response.data)
    setWeather(response.data.forecast)
    
  })
}

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'date',
        headerName: 'Date',
        width: 150,
      },
      {
        field: 'time',
        headerName: 'Time',
        width: 150,
      },
    {
      field: 'snowdepth',
      headerName: 'Snow Depth',
      width: 150,
    },
    {
      field: 'temp_c',
      headerName: 'Temperature',
      type: 'number',
      width: 110,
    },
    {
      field: 'morning',
      headerName: 'Morning',
      sortable: false,
      width: 160,
    },
    {
        field: 'afternoon',
        headerName: 'Afternoon',
        sortable: false,
        width: 160,
      },
      {
        field: 'evening',
        headerName: 'Evening',
        sortable: false,
        width: 160,
      },
  ];



  
console.log(weather[1])
let rows = []
  for(let i = 0; i < weather.length; i++){
      rows.push({id: i,date: weather[i].date, time: weather[i].time, snowdepth: weather[i].snow_mm, temp_c: weather[i].base.temp_c, morning: weather[i].base.wx_desc,afternoon: weather[i].mid.wx_desc,evening: weather[i].upper.wx_desc, })
    }

  return (
      <>
      <h1>Courchevel</h1>
      <div className="h-96 w-[100%">
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
      </div>
     

    </>
  );
}
export default Resort;