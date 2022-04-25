import ApexCharts from 'apexcharts'
import {React, useEffect, useState }from 'react';
import AdminNav from '../components/adminNav'
import axios from 'axios';

const AdminDashboard = () =>{
 // let navigate = useNavigate()

  const [data, setData] = useState({})
  const [eachFavData, eachFav] = useState({})
  const [load, loadStatment] = useState(false)
 // loadStatment=false;
  const allFavourites = async () => {
    try{
  var favouritesAwait = await axios.get("/api/dashboard/getAllFavourites",
  ).then((response) => {
    console.log("RESPONSe",response.data.allValues)
    setData(response.data.allValues)

    var favourites = [235, 300, 325, 200, 0,response.data.allValues]

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
      curve: 'straight'
    },
    fill: {
      opacity: 0.3,
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
  eachFav(response.data)
      var favouritesBarChart = {
        chart: {
          type: 'bar'
        },
        title: {
          text: 'Most favourite resort: '+response.data.maxLikeResort + " with " +response.data.maxLike+" likes! ",
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


     // localStorage.removeItem("jwt");
     // navigate("/login")
    }
  )
}
catch(err){
  console.log(err)

}
}
      
      var Users = [100,200,300,400,500,600, 700]

      
      var userOptions = {
        series: [{ 
        data: Users
      }],
        chart: {
        type: 'area',
        height: 160,
        sparkline: {
          enabled: true
        },
      },
      stroke: {
        curve: 'straight'
      },
      fill: {
        opacity: 0.3,
      },
      yaxis: {
        min: 0
      },
      colors: ['#c6fad2'],
      title: {
        text: '600',
        offsetX: 0,
        style: {
          fontSize: '24px',
        }
      },
      subtitle: {
        text: 'Users',
        offsetX: 0,
        style: {
          fontSize: '14px',
        }
      }
      };

     

            
      var linegraphOptions = {
        series: [{
          name: "Desktops",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
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
        curve: 'straight'
      },
      title: {
        text: 'User Timeline',
        align: 'left'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      }
      };

    

      useEffect(() =>{
        allFavourites();
        eachFavourites();
    
        var userChart = new ApexCharts(document.getElementById("users"), userOptions);
        userChart.render();
        
       

        var userLine = new ApexCharts(document.getElementById("userLinegraph"), linegraphOptions);
        userLine.render();

   

      },[]
      );

    

    return (
        <>
        <AdminNav />
        <div className='grid grid-cols-1 lg:grid-cols-2 lg:gap-20 gap-4 lg:px-20 px-0'>
            <div className=" mx-10">
            <div className='m-0 mx-auto'>
        <div className=' bg-white rounded-lg dark:bg-dark-mode-secondary shadow-lg min-h-max'>
        <div id='users'></div>

        </div>

        </div>
            </div>
            <div className=" mx-10">
            <div className='m-0 mx-auto '>
        <div className=' bg-white rounded-lg dark:bg-dark-mode-secondary shadow-lg'>
        <div id='favourites'></div>
        </div>

        </div>
            </div>
            <div className=" mx-10">
            <div className='m-0 mx-auto '>
        <div className=' bg-white rounded-lg dark:bg-dark-mode-secondary shadow-lg'>
        <div id='userLinegraph'></div>
        </div>

        </div>
            </div>
            <div className=" mx-10">
            <div className='m-0 mx-auto'>
        <div className=' bg-white rounded-lg dark:bg-dark-mode-secondary shadow-lg'>
        <div  id='favouritesBar'></div>
        </div>

        </div>
            </div>



        </div>



        </>
    );
  }
  export default AdminDashboard;