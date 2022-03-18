import React from 'react';
import valThorens from '../images/val-thorens-card.jpg';
import Courchevel from '../images/Courchevel-card.jpg';
import LesMenuires from '../images/Les-menuires-card.png';
import meribel from '../images/meribel-card.png'
import SaintMartin from '../images/stMartinDeBell-card.png'
import BridesLesBaines from '../images/brides-les-baines-card.png'
import PisteMap from '../images/piste-map.jpeg'
import Orelle from '../images/orelle-card.png'
import {AiOutlineStar, AiFillStar} from 'react-icons/ai'
import {BsUmbrellaFill, BsDownload} from 'react-icons/bs'
import {BiWind} from 'react-icons/bi'
import {ImCross} from 'react-icons/im'


import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import ResortCard from '../components/resortCard';


const Resorts = () =>{

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

  return (
    <>
       {/* POPUP MAP */}
   <div id='map-popup' className="z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-[80%] hidden">
  <img src={PisteMap} alt="piste map" className="object-cover w-full h-full" />
  <ImCross id="exit-map" size={35} className="absolute w-10 rounded m-2 p-2.5 top-0 left-0 bg-white text-black dark:bg-black dark:text-white  text-xs text-center leading-4 cursor-pointer" />
  <a href={PisteMap} download><BsDownload size={35} id="downloadButton" className="absolute w-10 rounded m-2 p-2.5 top-0 right-0 bg-white text-black dark:bg-black dark:text-white  text-xs text-center leading-4" /></a>
</div>




{/* MAIN BODY */}
<div id='main-body' className="container">
  
    <h1 className="text-center text-4xl font-Sora dark:text-white mb-20 pt-20 font-bold"> Three Valleys Ski Resort</h1>
    </div>
    <div className='max-w-[80%] mx-auto'>
<Swiper id="swiper" className='shadow-lg mb-10'
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
      <SwiperSlide>
        <ResortCard src={Courchevel} title={"Courchevel"} name={"courchevel"} favouriteCount={"267"} degrees={"-3"} rain={"0"} wind={"10"}/>
      </SwiperSlide>

      <SwiperSlide>
        <ResortCard src={valThorens} title={"Val Thorens"} name={"valThorens"} favouriteCount={"101"} degrees={"-2"} rain={"5"} wind={"45"}/>
      </SwiperSlide>

      <SwiperSlide>
        <ResortCard src={LesMenuires} title={"Les Menuires"} name={"LesMenuires"} favouriteCount={"546"} degrees={"-2"} rain={"20"} wind={"65"}/>
      </SwiperSlide>

      <SwiperSlide>
        <ResortCard src={SaintMartin} title={"St Martin De Belleville"} name={"stMartin"} favouriteCount={"743"} degrees={"2"} rain={"26"} wind={"10"}/>
      </SwiperSlide>

      <SwiperSlide>
        <ResortCard src={Orelle} title={"Orelle"} name={"orelle"} degrees={"5"} favouriteCount={"253"} rain={"5"} wind={"45"}/>
      </SwiperSlide>

      <SwiperSlide>
        <ResortCard src={BridesLesBaines} title={"Brides Les Baines"} name={"brideLesBain"} favouriteCount={"436"} degrees={"-1"} rain={"510"} wind={"45"}/>
      </SwiperSlide>

      <SwiperSlide>
        <ResortCard src={meribel} title={"Meribel"} name={"meribel"} favouriteCount={"184"} degrees={"-1"} rain={"510"} wind={"45"}/>
      </SwiperSlide>

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
