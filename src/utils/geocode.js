const request=require('request')

const geocode=(address,callback)=>{
   
 const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoidmsyNCIsImEiOiJja2pjeDNqa2swejJnMnBxdjgwd3VlM256In0.IVwI7wfn8rhtCXyAhWoWgg&limit=1'

request({url,json:true},(error,{body}={})=>
 {

    if(error)
    {
        callback("Unable to connect",undefined)
    }
    else if(body.features.length===0)
    {
       callback("Unable to find location",undefined)
    }
    else
    {
        const data={
        longitude:body.features[0].center[0],
         latitude:body.features[0].center[1],
         location:body.features[0].place_name
        }
        callback(undefined,data)
    }
 })
}

module.exports=geocode