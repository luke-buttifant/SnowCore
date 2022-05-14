import {React, useEffect, useState }from 'react';
import ResortCard from '../components/resortCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactLoading from "react-loading"



const Favourites = () =>{
  let navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
     favouritesAsync();
      userAuthenticated();
     
    }, [navigate]);
   

const [data, setData] = useState({})
const [resortCardData, setResortCardData] = useState({})


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

  const favouritesAsync = async () => {
    try{
  var favouritesAwait = await axios.get("/api/favourite/getFavouriteResorts", {headers: {
    "x-access-token": localStorage.getItem("jwt")
  }}).then((response) => {
    const resortList = [];
      const result = Object.values(response.data).map(value => {
        resortList.push(value)
      })
      setResortCardData( (response.data))
     setIsLoading(false)
      if(response.data.message == "authentication failed"){
        localStorage.removeItem("jwt");
        navigate("/login")
      }
    })
  }
  catch(err){
    console.log(err)

  }
  }
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
  if(isLoading){ return (
    <ReactLoading type={"spinningBubbles"} color={"#000"} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"/>
   )}
   else return (
    <>

<div className="">
          <img className="w-52 h-52 mx-auto rounded-full p-4" src={data.pic}></img>
        
    <h1 className="text-center text-4xl font-Sora dark:text-white mb-10">{data.first_name +" "+ data.last_name}</h1>
    <h2 className="text-2xl font-Sora dark:text-white mb-2 text-center"> My Favourites</h2>
    <div className='max-w-[80%] mx-auto'>
<Swiper autoHeight className='shadow-lg mb-10'
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
 {Object.keys(resortCardData).map((resortData)=>{
           return(  
              <SwiperSlide>
              <ResortCard src={`/images/${resortCardData[resortData].src}`} title={resortCardData[resortData].resort_Title} name={resortCardData[resortData].resort_name} favouriteCount={resortCardData[resortData].favouriteCount} degrees={resortCardData[resortData].degrees} rain={resortCardData[resortData].rain} wind={resortCardData[resortData].wind} favouriteToogle={true} />
            </SwiperSlide>
          
             )
           })
           
         }

    </Swiper>
</div>
   


</div>
</>

  );


}
export default Favourites;