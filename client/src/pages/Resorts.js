import {React, useEffect, useState} from 'react';
import valThorens from '../images/val-thorens-card.jpg';
import Courchevel from '../images/Courchevel-card.jpg';
import LesMenuires from '../images/Les-menuires-card.png';
import meribel from '../images/meribel-card.png'
import SaintMartin from '../images/stMartinDeBell-card.png'
import BridesLesBaines from '../images/brides-les-baines-card.png'
import Orelle from '../images/orelle-card.png'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import ResortCard from '../components/resortCard';
import PopupMap from '../components/popupMap';
import { useNavigate } from 'react-router-dom';
import ReactLoading from "react-loading";

import axios from 'axios';

const Resorts = () =>{
  let navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
      getResorts();
    }, [navigate]);
   

const [data, setData] = useState({})
const [data1, setData1] = useState({})


  const getResorts = async () => {
      var user = await axios.get("api/favourite/getResorts", {headers: {
        "Content-type": "application/json",
      "x-access-token": localStorage.getItem("jwt")
    }}).then((response) => {
      let favouriteList=[];
      for(var x = 0; x <Object.keys(response.data[1]).length-1; x++) {
        if (Object.values(response.data[1])[x]===true || Object.values(response.data[1])[x]==false )
        {
          console.log(Object.values(response.data[1])[x]);
          favouriteList.push(Object.values(response.data[1])[x]);
        }
      }
      setData1(favouriteList)
      setData(response.data[0])
      setIsLoading(false)
    })
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


<div className="container">
  
    <h1 className="text-center text-4xl font-Sora dark:text-white mb-20 md:pt-20 pt-4 font-bold"> Three Valleys Ski Resort</h1>
    </div>
    <div className='max-w-[80%] mx-auto'>
<Swiper autoHeight id="swiper" className='shadow-lg mb-10'
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
      
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
   


         {Object.keys(data).map((resortData)=>{
           return(  
              <SwiperSlide>
              <ResortCard src={data[resortData].src} title={data[resortData].resort_Title} name={data[resortData].resort_name} favouriteCount={data[resortData].favouriteCount} degrees={data[resortData].degrees} rain={data[resortData].rain} wind={data[resortData].wind} favouriteToogle={data1[resortData]} />
            </SwiperSlide>
          
             )
           })
           
         }
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
