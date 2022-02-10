import React from 'react';
import {  Link } from "react-router-dom";
import Logo from '../static/mainLogo.png';

const navbar= () =>{
  return (
<header className="font-Sora font-bold bg-white-smoke">
    <nav className="container flex items-center py-4 mt-4 sm:mt-12">
        <div className="py-1 w-40"><img src={Logo} alt="Snow Core Logo" /></div>
        <ul className="hidden sm:flex flex-1 justify-end items-center gap-12 text-black uppercase text-xs">
            <li className="cursor-pointer"><Link to="/">Resorts</Link></li>
            <li className="cursor-pointer"><Link to="/Favourites">Most Favourited</Link></li>
            <li className="cursor-pointer"><Link to="/Contact">Contact</Link></li>
            <button type="button" className="bg-light-coral text-white-smoke rounded-md px-7 py-3 uppercase">Login</button>
        </ul>
        <div className="flex sm:hidden flex-1 justify-end"><i className="text-2xl fas fa-bars"></i></div>
    </nav>
</header>
  );
}
export default navbar;