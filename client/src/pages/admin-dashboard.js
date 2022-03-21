import ApexCharts from 'apexcharts'
import { useEffect } from 'react'
import AdminNav from '../components/adminNav'

const Dashboard = () =>{

      var Users = [100,200,300,400,500,600, 700]
      var favourites = [235, 300, 325, 200, 134]

      
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
        text: '134',
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

      var favouritesBarChart = {
        chart: {
          type: 'bar'
        },
        series: [{
          data: [{
            x: 'Courchevel',
            y: 10
          }, {
            x: 'Val Thorens',
            y: 18
          }, {
            x: 'Les Menuires',
            y: 32
          }
          , {
            x: 'Meribel',
            y: 13
          }
          , {
            x: 'Brides Les Bains',
            y: 24
          }
          , {
            x: 'Orelle',
            y: 14
          }
          , {
            x: 'Saint-Martin de Belleville',
            y: 20
          }
        ]
        }]
      }

      useEffect(() =>{
        var userChart = new ApexCharts(document.getElementById("users"), userOptions);
        userChart.render();

        var favouritesChart = new ApexCharts(document.getElementById("favourites"), favouriteOptions);
        favouritesChart.render();

        var userLine = new ApexCharts(document.getElementById("userLinegraph"), linegraphOptions);
        userLine.render();

        var favouritesBar = new ApexCharts(document.getElementById("favouritesBar"), favouritesBarChart);
        favouritesBar.render();
      }
      )

    

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
  export default Dashboard;