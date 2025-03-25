const axios = require("axios");
const _sendApiLogToRadar = async (apiKey,apiLogInfo) =>{
    let radarOptions = {
        method : "post",
        url: 'https://api.apigaruda.com/api/v1/radar/monitorapi', 
        headers : {
            apiKey : apiKey,
            'Content-Type': 'application/json',
        },
        data : apiLogInfo   
    }

    try{
        await axios(radarOptions);
    }catch(err){
        console.log(`Error || Error from API-RADAR`);
        console.log(JSON.stringify(err));
        // throw err;
    }
    
}

module.exports._sendApiLogToRadar = _sendApiLogToRadar;