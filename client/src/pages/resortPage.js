import "../App.css";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, Link} from "react-router-dom";
import { BsCloudSnow } from "react-icons/bs";
import { WiStrongWind } from "react-icons/wi";
import ReactLoading from "react-loading";

const Resort = () => {
  let location = useLocation();

  const [data, setData] = useState({});
  const [weather, setWeather] = useState({});
  const [bestTimeToSki, setBestTimeToSki] = useState();
  const [maxSnow, setMaxSnow] = useState();
  const [minSnow, setMinSnow] = useState();
  const [isLoading, setIsLoading] = useState(true);

  let navigate = useNavigate();

  useEffect(() => {
    // userAuthenticated();
    getWeatherData();
  }, []);

  const getWeatherData = async () => {
    await axios.get("/api/weather/getWeather", {params: {resort: location.state.title}}).then((response) => {
      setWeather(response.data);
      console.log(response.data)
      if(response.data.length === 0){
        alert("Sorry! You have reached the API limit, try again soon")
      }
    });
    await axios.get("/api/weather/bestTimeToSki").then((response) => {
      setBestTimeToSki(`${response.data[0]} - ${response.data[41]}`);
      setIsLoading(false);
    });
  };

  function getDayName(dateStr) {
    var splitDate = dateStr.split("/");
    var month = splitDate[1] - 1;
    var date = new Date(splitDate[2], month, splitDate[0]);
    return date.toLocaleDateString("en-gb", { weekday: "short" });
  }

  let rows = [];
  for (let i = 0; i < weather.length; i++) {
    rows.push({
      id: i,
      date: getDayName(weather[i].date.toString()),
      snowdepth: weather[i].snow_in,
      temp_c: weather[i].base.temp_c,
      windSpeed: weather[i].base.windspd_max_mph,
      icon: weather[i].base.wx_icon,
    });
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
        <div className="min-h-screen min-w-screen ">
          <div className="w-[100%] md:w-[90%] mx-auto   overflow-hidden md:pt-10 pb-10">
            <img
              className=" object-cover h-64 w-full md:rounded-lg"
              src={location.state.img}
            ></img>
          </div>
          <h1 className="text-center font-bold text-3xl dark:text-white">
            {location.state.title}
          </h1>
          <div class="py-4">
    <div class="w-[90%] text-center mx-auto border-t border-primary dark:border-white border-1"></div>
</div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 m-10  my-5 rounded-lg">
            <div className="h-96 w-[100%] sm:w-[60%] mx-auto">
              <h1 className="text-center font-bold text-xl dark:text-white">7 Day Forecast</h1>
              {rows.map((row) => (
                <div className="divide-y my-4 dark:divide-black  rounded-lg ">
                <div
                  key={row.id}
                  className="grid grid-cols-5 mx-auto text-center text-primary dark:text-white font-bold"
                >
                  <div className="font-bold">{row.date}</div>
                  <img
                    className="w-14 mx-auto"
                    src={`/weather-icons/${row.icon}`}
                  ></img>
                  <div className="font-bold ">
                    {row.temp_c} &#8451;
                  </div>
                  <div className="flex flex-row">
                    <BsCloudSnow size={30} className="mt-1 mr-2" />
                    {row.snowdepth}
                  </div>
                  <div className="flex flex-row">
                    <WiStrongWind size={30} />
                    {row.windSpeed}
                  </div>
                </div>
                </div>
              ))}
            </div>
            <div className="max-w-[400px] mx-auto mt-10 pb-20">
              <div className="text-center bg-primary font-bold max-w-[100%] text-white rounded-r-lg py-2 ">
                <div className="text-2xl">Best time to visit?</div>
              </div>
              <div className="flex flex-col gap-1 mx-auto text-center dark:text-white">
                <div>
                  Based on the previous 3 years of historical weather data, we
                  have predicted that the best time to visit is:
                </div>
                <div className="flex flex-row gap-5 mx-auto">
                  <div>Dates: </div>
                  <div>{bestTimeToSki} </div>
                </div>
                <div className="mx-auto">
                  
                    <button className="text-center bg-primary px-10 py-2 rounded-lg mt-4 text-white">
                    <Link to="/historicalData" >More Info</Link>
                    </button>
                    
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Resort;
