import "../App.css";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import ReactLoading from "react-loading";

const HistoricalData = () => {
  let location = useLocation();
  const [weather, setWeather] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  let navigate = useNavigate();

  useEffect(() => {
    getWeatherData();
  }, [navigate]);


  const getWeatherData = async () => {
    await axios.get("/api/weather/historicalData").then((response) => {
      setWeather(response.data);
      console.log(response)
      setIsLoading(false)
    });
  };


  const columns = [
    {
      field: 'datetime',
      headerName: 'Date',
      width: 150,

    },
    {
      field: 'tempmax',
      headerName: 'Max Temp',
      width: 150,
    },
    {
      field: 'feelslikemax',
      headerName: 'Max Feels Like',
      width: 110,
    },
    {
      field: 'feelslikemin',
      headerName: 'Min Feels Like',
      width: 160,
    },
    {
        field: 'snowdepth',
        headerName: 'Snow Depth',
        width: 160,
      },
      {
        field: 'windspeed',
        headerName: 'Wind Speed',
        width: 160,
      },
      {
        field: 'description',
        headerName: 'Description',
        width: 160,
      },
  ];
  var rows = []
  for(let i = 0; i < weather.length; i++){
    rows.push({datetime: weather[i].datetime, tempmax: weather[i].tempmax, feelslikemax: weather[i].feelslikemax, feelslikemin: weather[i].feelslikemin, snowdepth: weather[i].snowdepth,
    windspeed: weather[i].windspeed, description: weather[i].description})
  }

  return (
    <>
      {isLoading ? (
        <ReactLoading
          type={"spinningBubbles"}
          color={"#000"}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      ) : (
        <div className="min-h-screen min-w-screen  mx-auto pt-10">
          <div style={{ height: 800, width: '80%', marginInline: "auto"}}>
      <DataGrid
      getRowId={(rows) => rows.datetime}
        rows={rows}
        columns={columns}
        pageSize={100}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />
    </div>
    </div>

    
      )}
    </>
  );
};
export default HistoricalData;
