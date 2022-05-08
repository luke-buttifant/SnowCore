import React from "react";
import "./App.css";
import Navbar from "./components/navbar"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Resorts from "./pages/Resorts"
import Favourites from "./pages/Favourites"
import Login from "./pages/Login"
import Register from "./pages/register";
import Home from "./pages";
import Footer from "./components/footer";
import About from "./pages/About";
import Dashboard from "./pages/admin-dashboard";
import Authenticate from "./pages/authenticate";
import Profile from "./pages/profile";
import AdminDashboard from "./pages/admin-dashboard";
import Resort from "./pages/resortPage";
import Users from "./pages/users";
import Password from "./pages/password";
import HistoricalData from "./pages/historicalData";

function App() {
  

  console.log(process.env.MONGO_URI)

  if (localStorage.theme === 'dark') {
    document.documentElement.classList.add('dark')
    document.documentElement.classList.remove('bg-background')
    document.documentElement.classList.add("bg-dark-mode")
  } else {
    document.documentElement.classList.remove('dark')
    document.documentElement.classList.remove('bg-dark-mode')
    document.documentElement.classList.add("bg-background")
  }

  return (
    <>
    <div className=" dark:bg-none dark:bg-dark-mode bg-background min-h-screen bg-cover bg-no-repeat">
    <Router>
      <Navbar />
      <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/admin' element={<Dashboard />} />
        <Route path='/Resorts' element={<Resorts />} />
        <Route path='/Favourites' element={<Favourites />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      <Route path='/authenticate' element={<Authenticate />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/admin-dashboard' element={<AdminDashboard />} />
      <Route path='/resort-page' element={<Resort />} />
      <Route path='/users' element={<Users />} />
      <Route path="/changePassword" element={<Password />} />
      <Route path="/historicalData" element={<HistoricalData />} /> 
        
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
    

    </div>
    <Footer />
    </>



  );
}

export default App;
