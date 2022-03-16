import React from "react";
import "./App.css";
import Navbar from "./components/navbar"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Resorts from "./pages/Resorts"
import Favourites from "./pages/Favourites"
import Login from "./pages/Login"
import Contact from "./pages/Contact"


function App() {

  if (localStorage.theme === 'dark') {
    document.documentElement.classList.add('dark')
    document.documentElement.classList.remove('bg-background')
    document.documentElement.classList.add("bg-dark-mode")
  } else {
    document.documentElement.classList.remove('dark')
    document.documentElement.classList.remove('bg-dark-mode')
    document.documentElement.classList.add("bg-background min-h-screen bg-no-repeat")
  }


  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <>
    <div className={localStorage.theme === 'dark' ? 'bg-dark-mode' : 'bg-background min-h-screen bg-no-repeat'}>
    <Router>
      <Navbar />
      <Routes>
        <Route path='/Resorts' element={<Resorts />} />
        <Route path='/Favourites' element={<Favourites />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Contact' element={<Contact />} />
      </Routes>
    </Router>
    
    {/* <div>
    This is from the backend NODE server: <b>{data}</b>
    </div> */}
    </div>
    </>



  );
}

export default App;
