import React from 'react';
import valThorens from '../images/val-thorens-card.jpg';
import Courchevel from '../images/Courchevel-card.jpg';
import LesMenuires from '../images/Les-menuires-card.png';
import {AiOutlineStar, AiFillStar} from 'react-icons/ai'
import ResortCard from '../components/resortCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import dp from '../images/dp.png'


const Favourites = () =>{

  const ToggleStar = event => {
    //Gets the 'name' value from the star that is clicked
    var star = event.currentTarget.name;
    //Both the filled star and the outlined star have the same name so they both get put into the 'stars' variable.
    var stars = document.getElementsByName(star);

    //looping through through the stars array and toggling hidden on each one
    //i.e. hidden => visible || visible => hidden
    for (let i = 0; i < stars.length; i++) {
      document.getElementById(stars[i].id).classList.toggle("hidden")
    }
  }
  return (
    <>

<div className="">
          <img className="w-52 mx-auto rounded-full p-4" src={dp}></img>
        
    <h1 className="text-center text-4xl font-Sora dark:text-white mb-10"> Luke Buttifant</h1>
    <h2 className="text-2xl font-Sora dark:text-white mb-2 text-center"> My Favourites</h2>
    <div className='max-w-[80%] mx-auto'>
<Swiper className='shadow-lg mb-10'
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
          slidesPerView: 2,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 3,
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

    </Swiper>
</div>
   


</div>
</>
  );
}
export default Favourites;