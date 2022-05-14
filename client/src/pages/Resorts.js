import {React, useEffect, useState} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import ResortCard from '../components/resortCard';
import PopupMap from '../components/popupMap';
import { useNavigate } from 'react-router-dom';
import ReactLoading from "react-loading";
import axios from 'axios';
import GuestResortCard from '../components/guesResortCard';

const Resorts = () =>{
  let navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [resortData, setResortData] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState()
  const [favourites, setFavourites] = useState([])
  const [userInfo, setUserInfo] = useState()

  useEffect(() => {
    userAuthenticated();
   
      
    }, [navigate]);
   

    const userAuthenticated = async () => {
      var user = await axios.get("/api/users/currentUser", {headers: {
      "x-access-token": localStorage.getItem("jwt")
    }}).then((response) => {
      if(response.data.message == "authentication failed"){
        localStorage.removeItem("jwt");
        setIsLoggedIn(false)
        getResorts();
      }
      else{
        getResorts(response.data._id)
        setIsLoggedIn(true)
      }
    })
  }



  const getResorts = async (user_id) => {
    const config = {
      headers: {
          "Content-type":"application/json"
      }
  }
      await axios.get("api/favourite/getResorts", {params:{user_id: user_id}}, config).then((response) => {
        var guestResort = response.data.resorts
        console.log(response.data)
        var resort = response.data.resorts
        
        if(user_id != undefined || null){
          for(let i = 0; i < resort.length; i++){
            Object.keys(response.data.favourites).forEach(function(key){
              if(key.toLowerCase() == resort[i].resort_name.toLowerCase()){
                resort[i].favourite = response.data.favourites[key]
              }
            })
          }
          console.log(resort)
          setResortData(resort)
        }
        else{
          setResortData(response.data)
        }
        setIsLoading(false)
      }
      )
    }



 function toggleMap(){
   const map = document.getElementById("map-popup")
   map.classList.remove("hidden")
   const body = document.getElementById("main-body");
   const swiper = document.getElementById("swiper");
   swiper.classList.add("opacity-20");
   body.classList.add("opacity-20");

  const exitBtn = document.getElementById("exit-map");
  exitBtn.onclick = (function(){
    map.classList.add("hidden")
    swiper.classList.remove("opacity-20");
    body.classList.remove("opacity-20");
  })
 }

 if(isLoading){ return (
  <ReactLoading type={"spinningBubbles"} color={"#000"} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"/>
 )}
 else return (
    <>
<PopupMap />


<div id='main-body' className="container">
  
    <h1 className="text-center text-4xl dark:text-white mb-20 md:pt-28 pt-4 font-bold ">Three Valleys Ski Resorts</h1>
    </div>
    <div className='max-w-[80%] mx-auto '>
<Swiper autoHeight id="swiper" className='shadow-lg mb-10'
mousewheel={true}
      grabCursor={true}
      spaceBetween={10}
      navigation={true}
      pagination={{
        clickable: true,
      }}
      centerInsufficientSlides={true}
      slidesPerView={1}
      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
      }}
    >
      {isLoggedIn ? resortData.map((data) => 
                        <SwiperSlide key={data.resort_Title}>
                        <ResortCard key={data.resort_Title} src={`/images/${data.src}`} title={data.resort_Title} name={data.resort_name} favouriteCount={data.favouriteCount} degrees={data.degrees} rain={data.rain} wind={data.wind} favouriteToogle={data.favourite} />
                      </SwiperSlide> )  :
                       resortData.map((data) => 
                            <SwiperSlide key={data.resort_Title}>
                            <GuestResortCard key={data.resort_Title} src={`/images/${data.src}`} title={data.resort_Title} name={data.resort_name} favouriteCount={data.favouriteCount} degrees={data.degrees} rain={data.rain} wind={data.wind} />
                          </SwiperSlide>)}

      </Swiper>

    <div className="min-w-max">
      <div className='mx-auto text-center'>
        <div className='text-2xl mt-20 dark:text-white'>Need more info?</div>
        <button className='bg-primary px-20 md:px-40 py-5 text-2xl rounded-lg text-white mt-2 font-bold shadow-lg dark:bg-dark-mode-secondary dark:hover:bg-primary' type='button' onClick={toggleMap}>View Map</button>
        </div>
    </div>
</div>
</>
  );
}
export default Resorts;
