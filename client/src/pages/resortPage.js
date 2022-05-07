import "../App.css"
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import {BsCloudSnow} from "react-icons/bs"
import {WiStrongWind} from "react-icons/wi"
import { IoConstructOutline } from "react-icons/io5";
import CourchevelDisplayPic from "../images/courchevel-display.png"
import ReactLoading from "react-loading";

const Resort = () =>{
  let location = useLocation();
   
    const [data, setData] = useState({})
    const [weather, setWeather] = useState({})
    const [bestTimeToSki, setBestTimeToSki] = useState()
    const [maxSnow, setMaxSnow] = useState()
    const [minSnow, setMinSnow] = useState()
    const [isLoading, setIsLoading] = useState(true);

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
    setWeather(response.data)
  })
  await axios.get("/api/weather/bestTimeToSki").then((response) => {
    setBestTimeToSki(`${response.data[0]} - ${response.data[41]}`)
    setMaxSnow(10)
    setMinSnow(0)
    setIsLoading(false)
  })
}

function getDayName(dateStr)
{
    var splitDate = dateStr.split('/');
    var month = splitDate[1] - 1;
    var date = new Date(splitDate[2], month, splitDate[0]);
    return date.toLocaleDateString("en-gb", {weekday: "short"})       
}


  
let rows = []
  for(let i = 0; i < weather.length; i++){
      rows.push({id: i, date: getDayName(weather[i].date.toString()),
         snowdepth: weather[i].snow_in, temp_c: weather[i].base.temp_c, 
          windSpeed: weather[i].base.windspd_max_mph, 
           icon: weather[i].base.wx_icon })
    }

  return (
      <>
      {isLoading ? <ReactLoading type={"spinningBubbles"} color={"#000"} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"/> : 
      <div className="min-h-screen min-w-screen bg-white">
      <div className="min-w-[60%] pt-7 px-14 pb-4 bg-white">
        <img className="w-[80%] mx-auto rounded-lg" src={CourchevelDisplayPic}></img>
      </div>
      <h1 className="text-center font-bold text-3xl">{location.state.title}</h1>
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 m-10 bg-white my-5 rounded-lg">
      <div className="h-96 w-[100%] sm:w-[60%] mx-auto">
        {rows.map((row) => <div key={row.id} className="grid grid-cols-5 mx-auto text-center text-primary font-bold divide-y my-4"><div className="font-bold">{row.date}</div>
         <img className="w-14 mx-auto" src={`/weather-icons/${row.icon}`}></img> 
         <div className="font-bold text-primary">{row.temp_c} &#8451;</div>
          <div className="flex flex-row"><BsCloudSnow size={30} className="mt-1 mr-2" />{row.snowdepth}</div>
           <div className="flex flex-row"><WiStrongWind size={30}  />{row.windSpeed}</div>
           </div>)}
    </div>
      <div className="max-w-[400px] mx-auto">
        
        <div className="text-center bg-primary font-bold max-w-[100%] text-white rounded-r-lg py-2 "><div className="text-2xl">Best time to visit?</div></div>
        <div className="flex flex-col gap-1 mx-auto text-center">
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
      </div>
}
     

    </>
  );
}
export default Resort;