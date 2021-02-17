const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')


const app=express()  

const port= process.env.PORT || 3000


// define paths for express config
const publlicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publlicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Vasu'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me ',
        name:'Vasu'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        name:'Vasu',
        title:'Help',
        message:'No worries we are here to help'
    })
})



app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error: 'You must provide address'
        })
    }

    const address=req.query.address

    const ar=address.split(',',3)


    if(ar[0]=='lat')
    {

        forecast(ar[1],ar[2],(error1,{forecastinfo,location})=>{
            if(error1)
            return res.send({
                error:error1
            })

            res.send({
                forecast:forecastinfo,
                location,
                address: req.query.address 
            })
        })
    }
    else{
    geocode(req.query.address,(error,{longitude,latitude,location}={})=>{

        if(error)
        return res.send({
            error
        })

        forecast(latitude,longitude,(error1,{forecastinfo})=>{
            if(error1)
            return res.send({
                error:error1
            })

            res.send({
                forecast:forecastinfo,
                location,
                address: req.query.address 
            })
        })

    })
    }
})


app.get('/help/*',(req,res)=>{
   res.render('not_found',{
       title:'404',
       name:'Vasu',
       errorMessage:"Article Not found"
   })
})

app.get('/*',(req,res)=>{
    res.render('not_found',{
       title:'404',
       name:'Vasu',
       errorMessage:"Page Not found"
    })
})


app.listen(port,()=>{
    console.log('Server is up on port 3000')
})