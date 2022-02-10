import React from "react";
import "./App.css";
import Navbar from "./components/navbar"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Resorts from "./pages/Resorts"
import Favourites from "./pages/Favourites"
import Login from "./pages/Login"
import Contact from "./pages/Contact"

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <>
    <body className="font-Sora bg-white-smoke">
    <Router>
      <Navbar />
      <Routes>
        <Route path='/Resorts' element={<Resorts />} />
        <Route path='/Favourites' element={<Favourites />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Contact' element={<Contact />} />
      </Routes>
    </Router>
    
    <div>
    This is from the backend NODE server: <b>{data}</b>
    </div>
    </body>
    </>



  );
}

export default App;
