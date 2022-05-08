import ApexCharts from 'apexcharts'
import {React, useEffect, useState }from 'react';
import AdminNav from '../components/adminNav'
import axios from 'axios';
import { useFirstRender } from '@mui/x-data-grid';

const AdminDashboard = () =>{
  // let navigate = useNavigate()
  const [userCount, setUserCount] = useState()


 const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
 const day = new Date();
 let month = months[day.getMonth()];



  const allFavourites = async () => {
    try{
  var favouritesAwait = await axios.get("/api/dashboard/getAllFavourites",
  ).then((response) => {
    console.log(Object.keys(response.data))
    console.log(response.data)
 
    var favourites = [Object.values(response.data)[0], Object.values(response.data)[1], Object.values(response.data)[2], Object.values(response.data)[3], response.data.allValues]
    console.log(favourites)
    var favouriteOptions = {
      series: [{ 
      data: favourites
    }],
      chart: {
      type: 'area',
      height: 160,
      sparkline: {
        enabled: true
      },
    },
    stroke: {
      curve: 'smooth'
    },
    fill: {
      type: 'gradient',

    },
    yaxis: {
      min: 0
    },
    colors: ['#FF7373'],
    title: {
      text: response.data.allValues,
      offsetX: 0,
      style: {
        fontSize: '24px',
      }
    },
    subtitle: {
      text: 'Favourites',
      offsetX: 0,
      style: {  
        fontSize: '14px',
      }
    },
    xaxis: {
      categories: [Object.keys(response.data)[0], Object.keys(response.data)[1], Object.keys(response.data)[2], Object.keys(response.data)[3] ,month],
      //categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],

    }
    };
    var favouritesChart = new ApexCharts(document.getElementById("favourites"), favouriteOptions);
    favouritesChart.render();
      if(response.data.message == "authentication failed"){
      
       // localStorage.removeItem("jwt");
       // navigate("/login")
      }
    })
  }
  catch(err){
    console.log(err)

  }
}

const eachFavourites = async () => {
  try{
var favouritesAwait = await axios.get("/api/dashboard/getEachFavourites",
).then((response) => {
  //eachFav(response.data)
      var favouritesBarChart = {
        height: 'auto',
        chart: {
          type: 'bar'
        },
        title: {
          text: 'Most favourited: '+response.data.maxLikeResort + "(" +response.data.maxLike+")",
          align: 'left'
        },
        series: [{
          data: [{
            x: 'Courchevel',
            y: response.data.courchevel
          }, {
            x: 'Val Thorens',
            y: response.data.val_Thorens
          }, {
            x: 'Les Menuires',
            y: response.data.les_Menuires
          }
          , {
            x: 'Meribel',
            y: response.data.meribel
          }
          , {
            x: 'Brides Les Bains',
            y: response.data.brides_Les_Baines
          }
          , {
            x: 'Orelle',
            y: response.data.orelle
          }
          , {
            x: 'Saint-Martin de Belleville',
            y: response.data.saint_Martin_De_Belleville
          }
        ]
        }]
      }
      var favouritesBar = new ApexCharts(document.getElementById("favouritesBar"), favouritesBarChart);
      favouritesBar.render();
    }
  )
}
catch(err){
  console.log(err)
}
}


const getUsers = async () => {
  var users = await axios.get("/api/users")
        setUserCount(users.data.length)
  
}
      



 const allUsers = async () => {
    try{
  var favouritesAwait1 = await axios.get("/api/dashboard/getAllUsers",
  ).then((response) => {
    console.log(Object.keys(response.data))
    console.log(response.data)  
    var linegraphOptions = {
      series: [{
        name: "Users",
        data:  [Object.values(response.data)[0], Object.values(response.data)[1], Object.values(response.data)[2], Object.values(response.data)[3], response.data.currentNrUsers]

    }],
      chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    sparkline: {
      enabled: false
    },
    title: {
      text: 'User Timeline',
      align: 'left'
    },
    fill:{
      type: 'gradient'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },
    xaxis: {
      categories: [Object.keys(response.data)[0], Object.keys(response.data)[1], Object.keys(response.data)[2], Object.keys(response.data)[3] ,month],
    }
    };
    var userLine = new ApexCharts(document.getElementById("userLinegraph"), linegraphOptions);
    userLine.render();
  }
  )

}
catch(err){
  console.log(err)

}
};
            

      useEffect(() =>{
        allFavourites();
        eachFavourites();
        allUsers();
        getUsers();

      },[]
      );

    

    return (
        <>
        <AdminNav />
        <div className='grid grid-cols-1 lg:px-20 mx-auto'>
        <div className="mx-2 md:mx-10">
            <div className='m-0 mx-auto '>
        <div className=' bg-white rounded-lg dark:bg-dark-mode-secondary shadow-lg '>
        <div id='favourites'></div>
        </div>

        </div>
            </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 lg:gap-20 gap-4 lg:px-20 px-0 mt-10'>
            <div className="mx-2 md:mx-10">
            <div className='m-0 mx-auto '>
        <div className=' bg-white rounded-lg dark:bg-dark-mode-secondary shadow-lg'>
          <div className='text-center font-bold'>Total Users: {userCount}</div>
        <div id='userLinegraph'></div>
        </div>

        </div>
            </div>
            <div className="mx-2 md:mx-10">
            <div className='m-0 mx-auto'>
        <div className=' bg-white rounded-lg dark:bg-dark-mode-secondary shadow-lg '>
        <div   id='favouritesBar'></div>
        </div>

        </div>
            </div>
        </div>



        </>
    );
  }
  export default AdminDashboard;