const weatherForm=document.querySelector('form')

const searchElement=document.querySelector('input')

const msg1=document.querySelector('#msg1')

const msg2=document.querySelector('#msg2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=searchElement.value
    
    msg1.textContent="Loading..."
    msg2.textContent=null

fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error)
        msg1.textContent=data.error
        else
        {
            msg1.textContent=data.location
            msg2.textContent=data.forecast
        }
    })
})
})

document.querySelector('#send-location').addEventListener('click',(e)=>{
        
        e.preventDefault()
        if(!navigator.geolocation)
        {
            return alert('Geolocation is not supported by your browser.')
        }
        msg1.textContent="Loading..."
        msg2.textContent=null
        searchElement.value=""

        navigator.geolocation.getCurrentPosition((position)=>{
            
           // console.log(position.coords.latitude + ','+position.coords.longitude)
            fetch('/weather?address='+'lat'+','+position.coords.latitude+','+position.coords.longitude).then((response)=>{
                response.json().then((data)=>{
                    if(data.error)
                    msg1.textContent=data.error
                    else
                    {
                        msg1.textContent=data.location
                        msg2.textContent=data.forecast
                   }
                })
            })
            
        })
})