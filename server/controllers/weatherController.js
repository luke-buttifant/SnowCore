const axios = require('axios')
const asyncHandler = require('express-async-handler');
require("dotenv").config();
const express = require('express');
const dfd = require("danfojs-node")
const avg = require('average-array');
const courchevel_historic_data = require('../historicData/courchevel_historic_data')


const request = `https://api.weatherunlocked.com/api/resortforecast/333005?app_id=${process.env.API_APP_ID}&app_key=${process.env.API_APP_KEY}`


const getWeather = async (req, res) => { 
    const weather = await axios.get(request)
    console.log(weather.data)
    res.status(200).json(weather.data)
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
    row.print()
    res.send(dfd.toJSON(row))
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

module.exports = {getWeather, BestTimeToSki}