import "../App.css"
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import { IoConstructOutline } from "react-icons/io5";
import CourchevelDisplayPic from "../images/courchevel-display.png"

const Resort = () =>{
   
    const [data, setData] = useState({})
    const [weather, setWeather] = useState({})
    const [bestTimeToSki, setBestTimeToSki] = useState()
    const [maxSnow, setMaxSnow] = useState()
    const [minSnow, setMinSnow] = useState()

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
    setWeather(response.data)
  })
  await axios.get("/api/weather/bestTimeToSki").then((response) => {
    setBestTimeToSki(`${response.data[0]} - ${response.data[41]}`)
    setMaxSnow(10)
    setMinSnow(0)
  })
}



  
let rows = []
  for(let i = 0; i < weather.length; i++){
      rows.push({id: i,date: weather[i].date, time: weather[i].time, snowdepth: weather[i].snow_mm, temp_c: weather[i].base.temp_c, morning: weather[i].base.wx_desc,afternoon: weather[i].mid.wx_desc,evening: weather[i].upper.wx_desc, windSpeed: weather[i].base.windspd_max_mph })
    }

  return (
      <>
      <div className="min-w-[60%] pt-10">
        <img className="w-[80%] mx-auto rounded-lg" src={CourchevelDisplayPic}></img>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 m-10 bg-white p-10">
        <div>
        <div className="h-96 w-[100%] mx-auto text-center">
          {rows.map((row) => <div className="flex flex-col">{row.date} {row.temp_c} &#8451; {row.time} {row.windSpeed}</div>)}
      </div>
        </div>
        <div className="max-w-[400px] mx-auto">
          
          <div className="text-center bg-primary font-bold max-w-[80%] text-white rounded-r-lg py-2 "><div className="">Best time to visit?</div></div>
          <div className="flex flex-col gap-0 mx-auto text-center">
            <div> Based on the previous 3 years of historical weather 
          data, we have predicted that the best time to visit is:</div>
          <div className="flex flex-row gap-5 mx-auto">
            <div>Dates: </div>
            <div>{bestTimeToSki} </div>
          </div>

          <div className="flex flex-row gap-5 mx-auto">
            <div>Max Snow Depth: </div>
            <div className="text-center">{maxSnow} </div>
          </div>
          <div className="flex flex-row gap-5 mx-auto">
            <div>Min Snow Depth: </div>
            <div>{minSnow} </div>
          </div>
          <div className="mx-auto">
            <button className="text-center bg-primary px-10 py-2 rounded-lg mt-4 text-white">More Info</button>
          </div>
         
          </div>
        </div>
      </div>

     

    </>
  );
}
export default Resort;