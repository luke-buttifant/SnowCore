import {AiOutlineStar, AiFillStar} from 'react-icons/ai'
import {BsUmbrellaFill, BsDownload} from 'react-icons/bs'
import {BiWind} from 'react-icons/bi'
import axios from "axios"
import {React, useEffect, useState }from 'react';
import { useNavigate } from 'react-router-dom';


const ResortCard = ({ src, title, name, favouriteCount, degrees, rain, wind , favouriteToogle}) =>  {
  let outlineStar=""
  let filledStar=""  
  
  const addResort = async (star) => {
    try{
    const {data} = await axios.post(
      
      "/api/favourite/addResort",
      {star} ,{headers: {
        "Content-type": "application/json",
        "x-access-token": localStorage.getItem("jwt")}}
  ).then((response) => {
    window.location.reload()
  })
    }catch(err){
      console.log(err)
    }
  }
    
  const removeResort = async (star) => {
    try{
    const {data} = await axios.post(
      "/api/favourite/removeResort",
      {star} ,{headers: {
        "Content-type": "application/json",
        "x-access-token": localStorage.getItem("jwt")}}
  ).then((response) => {
    window.location.reload()
  })
  } catch(err){
  console.log(err)

    }
  }

  
  const starTrue = ()=> {
      if(favouriteToogle == true )
      {
         outlineStar="hidden";
         filledStar="" ;
      }
      else
      {
         outlineStar="";
         filledStar="hidden";
        console.log("FALSE");
      }
    }
    starTrue()
    const ToggleStar = event => {
        //Gets the 'name' value from the star that is clicked
        var star = event.currentTarget.name;
     

        //Both the filled star and the outlined star have the same name so they both get put into the 'stars' variable.
        var stars = document.getElementsByName(star);
        console.log(stars)
        //looping through through the stars array and toggling hidden on each one
        //i.e. hidden => visible || visible => hidden
        for (let i = 0; i < stars.length; i++) {
          document.getElementById(stars[i].id).classList.toggle("hidden")
        }
        var starID = event.currentTarget.id;
        console.log(starID)

        if(starID==star+"Outline")
        {
          addResort(star);

        }
          else if ((starID==star+"Filled"))
          {
          removeResort(star)
          }
          else{
            console.log("Something went wrong")
          }

      }

    return(
        <>
<div className="max-w-full rounded shadow-lg bg-white dark:bg-dark-mode-secondary">
<img className="w-full h-full" src={src} alt={name} />
<div className="px-6 py-4">
  <div className="font-bold text-2xl mb-2 text-center text-primary dark:text-white">{title}</div>
  <div className='grid grid-cols-2 dark:text-white'>
    <div className='text-sm lg:text-sm overflow-hidden'>Saint-Bon-Tarentaise, <br className='hidden lg:flex'></br> France</div>
    <div className='flex mx-auto text-2xl'> <button id={name + "Outline"} name={name} className={outlineStar} onClick={ToggleStar}><AiOutlineStar  cursor={"pointer"} size={35} /></button>
    <button id={name + "Filled"} name={name} onClick={ToggleStar} className={filledStar}><AiFillStar className='text-primary dark:text-white' size={35} cursor={"pointer"} /> </button>{favouriteCount}</div>
  </div>
      
  <div className='grid grid-cols-3 mt-10 mb-2 dark:text-white'>
    <div>{degrees}{'\u00b0'}C</div>
    <div className='flex'> <BsUmbrellaFill size={25}/> {rain}%</div>
    <div className='flex'> <BiWind size={25}/> {wind}%</div>
  </div>
</div>
</div>

        </>
    )
    
}

export default ResortCard;
