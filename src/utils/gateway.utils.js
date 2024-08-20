const axios = require("axios");
const _sendApiLogToRadar = async (apiKey,apiLogInfo) =>{
    let radarOptions = {
        method : "post",
        url: 'https://api-radar-api.onrender.com/api/v1/radar/monitorapi', 
        headers : {
            apiKey : apiKey,
            'Content-Type': 'application/json',
        },
        data : apiLogInfo   
    }

    try{
        console.log("radar options =====>",JSON.stringify(radarOptions));
        await axios(radarOptions);
    }catch(err){
        console.log(`Error || Error from API-RADAR`);
        console.log(JSON.stringify(err));
        // throw err;
    }
    
}

module.exports._sendApiLogToRadar = _sendApiLogToRadar;