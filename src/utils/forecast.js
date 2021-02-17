const request=require('request')

const forecast=(lat,long,callback)=>
{
    const url='http://api.weatherstack.com/current?access_key=b5361c290967c25cca675e1ea1ea7296&query='+lat+','+long
    request({url,json:true},(error,{body}={})=>{

        if(error)
        {
            callback("Unable to connect")
        }
        else if(body.error)
        {
            callback("Unable to find location")
        }
        else
        {
            const data={
               forecastinfo:body.current.weather_descriptions[0]+". It is currently "+ body.current.temperature+" degrees out. It feels like "+body.current.feelslike+" degrees out. "+"\n"+"Humidity is "+body.current.humidity + "%." ,
               location:body.location.name+','+body.location.region+','+body.location.country
            }
            callback(undefined,data)
        }
    })
}

module.exports=forecast