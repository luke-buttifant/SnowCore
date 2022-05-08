const axios = require('axios')
const asyncHandler = require('express-async-handler');
require("dotenv").config();
const express = require('express');
const dfd = require("danfojs-node")
const avg = require('average-array');
const courchevel_historic_data = require('../historicData/courchevel_historic_data')





const getWeather = async (req, res) => { 
    console.log(req.query.resort)
    if(req.query.resort == "Courchevel"){
       var resort_id = "333005"
    }
    if(req.query.resort == "Val Thorens"){
        var resort_id = "333020"
    }
    if(req.query.resort == "Les Menuires"){
        var resort_id = "333012"
    }
    if(req.query.resort == "Saint Martin De Belleville"){
        var resort_id = "333031"
    }
    if(req.query.resort == "Brides Les Baines"){
        var resort_id = "54883577"
    }
    if(req.query.resort == "Orelle"){
        var resort_id = "54885193"
    }
    if(req.query.resort == "Meribel"){
        var resort_id = "333014"
    }

    const request = `https://api.weatherunlocked.com/api/resortforecast/${resort_id}?hourly_interval=6&app_id=${process.env.API_APP_ID}&app_key=${process.env.API_APP_KEY}`
    const weather = await axios.get(request)
    var days = []
    for(let i = 0;i < weather.data.forecast.length; i++){
        if(weather.data.forecast[i].time === "13:00"){
            days.push(weather.data.forecast[i])
        }
    }
    res.status(200).json(days)
}


const average = arr => arr.reduce((a,b) => a + b, 0) / arr.length;

const BestTimeToSki = async (req, res) => {
    var df = new dfd.DataFrame(courchevel_historic_data, {config: {
        tableDisplayConfig: {
            header: {
                alignment: 'center',
                content: 'BEST SIX WEEK TIMEFRAME',
            },
        },
        tableMaxRow: 42
    }})
    sub_df = df.fillNa(0, {columns: ["snowdepth"]})
    sub_df.setIndex({column: "datetime",drop: true, inplace: true})
    var row = await getTimeframe(sub_df)
    var index = row.index
    var result = []
    res.send(row.index)
}

const HistoricalData = async (req, res) => {
    var data = courchevel_historic_data;
    res.send(data)
}




function getTimeframe(df){
    var result = 0
    var index = 0
    for(let i = 0; i < (df.values.length); i++){
        try{
            var calculation = df.iloc({rows: [`${i}:${i + 42}`], columns: ["14:15"]})
            if(average(calculation.values) > result){
                result = average(calculation.values)
                index = i
            }
        }
        catch{
            
        }
    }
    var row = df.iloc({rows: [`${index}:${index + 42}`], columns: ["14:15"]})
    return row
    
}

module.exports = {getWeather, BestTimeToSki, HistoricalData}