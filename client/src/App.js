import React from "react";
import "./App.css";
import Navbar from "./components/navbar"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Resorts from "./pages/Resorts"
import Favourites from "./pages/Favourites"
import Login from "./pages/Login"
import Contact from "./pages/Contact"

function App() {
  var isDarkMode = false;

  if (localStorage.theme === 'dark') {
    document.documentElement.classList.add('dark')
    document.documentElement.classList.add("bg-dark-mode")
    isDarkMode = true;
  } else {
    document.documentElement.classList.remove('dark')
    document.documentElement.classList.add("bg-white")
    isDarkMode = false;
  }

  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <>
    <div className={isDarkMode ? 'bg-dark-mode' : 'bg-background min-h-screen bg-no-repeat'}>
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
