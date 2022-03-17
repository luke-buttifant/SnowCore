import React from 'react';
import valThorens from '../images/val-thorens-card.jpg';
import Courchevel from '../images/Courchevel-card.jpg';
import LesMenuires from '../images/Les-menuires-card.png';
import {AiOutlineStar, AiFillStar} from 'react-icons/ai'


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
      <div className="max-w-full rounded shadow-lg bg-white dark:bg-dark-mode-secondary">
  <img className="w-full" src={Courchevel} alt="Courchevel picture" />
  <div className="px-6 py-4">
    <div className="font-bold text-3xl mb-2 text-center text-primary dark:text-white">Courchevel</div>
    <div className='grid grid-cols-2 dark:text-white'>
      <div className='text-sm lg:text-sm overflow-hidden'>Saint-Bon-Tarentaise, <br className='hidden lg:flex'></br> France</div>
      <div className='flex mx-auto text-2xl'> <button id='courchevelOutline' name={"courchevel"} className="hidden" onClick={ToggleStar}><AiOutlineStar  cursor={"pointer"} size={35} /></button>
      <button id="courchevelFilled" name={"courchevel"} onClick={ToggleStar}><AiFillStar className='text-primary dark:text-white' size={35} cursor={"pointer"} /> </button>542</div>
    </div>
    
    <div className='grid grid-cols-3 mt-10 mb-2 dark:text-white'>
      <div>-3{'\u00b0'}C</div>
      <div className='flex'> <AiOutlineStar size={25}/> 0%</div>
      <div className='flex'> <AiOutlineStar size={25}/> 10%</div>
    </div>
  </div>
</div>
      </SwiperSlide>

      <SwiperSlide><div className="max-w-full rounded shadow-lg bg-white dark:bg-dark-mode-secondary">
  <img className="w-full" src={valThorens} alt="Val thorens picture" />
  <div className="px-6 py-4">
    <div className="font-bold text-3xl mb-2 text-center text-primary dark:text-white">Val Thorens</div>
    <div className='grid grid-cols-2 dark:text-white'>
      <div className='text-xs lg:text-sm'>Grand Rue, <br></br> France</div>
      <div className='flex mx-auto text-2xl'> <button id='valThorensOutline' name={"valThorens"} className="hidden" onClick={ToggleStar}><AiOutlineStar  cursor={"pointer"} size={35} /></button>
      <button id="valThorensFilled" name={"valThorens"} onClick={ToggleStar}><AiFillStar className='text-primary dark:text-white' size={35} cursor={"pointer"} /> </button>542</div>
    </div>
    
    <div className='grid grid-cols-3 mt-10 mb-2 dark:text-white'>
      <div>-2{'\u00b0'}C</div>
      <div className='flex'> <AiOutlineStar size={25}/> 5%</div>
      <div className='flex'> <AiOutlineStar size={25}/> 45%</div>
    </div>
  </div>
</div>
</SwiperSlide>

      <SwiperSlide>
        
<div className="max-w-full rounded shadow-lg bg-white dark:bg-dark-mode-secondary ">
  <img className="max-w-full" src={LesMenuires} alt="Les Menuires picture" />
  <div className="px-6 py-4">
    <div className="font-bold text-3xl mb-2 text-center text-primary dark:text-white">Les Menuires</div>
    <div className='grid grid-cols-2 dark:text-white'>
      <div className="text-xs lg:text-sm">La Croisette, <br></br> France</div>
      <div className='flex mx-auto text-2xl'> <button id='lesMenuiresOutline' name={"lesMenuires"} className="hidden" onClick={ToggleStar}><AiOutlineStar  cursor={"pointer"} size={35} /></button>
      <button id="lesMenuiresFilled" name={"lesMenuires"} onClick={ToggleStar}><AiFillStar className='text-primary dark:text-white' size={35} cursor={"pointer"} /> </button>542</div>
    </div>
    
    <div className='grid grid-cols-3 mt-10 mb-2 dark:text-white'>
      <div>-2{'\u00b0'}C</div>
      <div className='flex'> <AiOutlineStar size={25}/> 5%</div>
      <div className='flex'> <AiOutlineStar size={25}/> 45%</div>
    </div>
  </div>
</div>

      </SwiperSlide>

    </Swiper>
</div>
   


</div>
</>
  );
}
export default Favourites;