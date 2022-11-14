const express = require('express')
const app=express()
const bodyparser=require('body-parser')
const https = require('https')
let port= 3000;
app.listen(process.env.PORT||port,function(){
  console.log('server is safe and sound,running on port '+port)
})
app.use(bodyparser.urlencoded({extended:true}))

app.get('/',function(req,res){
  console.log('request is made by the user')
  res.sendFile(__dirname+'/index.html')

})
app.post('/',function(req,res){
const city=req.body.cityname 
const appid='a697f271f2792efe681391c43d536f1b';
const unit="metric";
const url = 'https://api.openweathermap.org/data/2.5/weather?q=' +city+'&appid='+appid +"&units="+unit;
https.get(url,function(response){
  response.on('data',function(data){
    const weatherdata = JSON.parse(data)
    console.log(weatherdata)
    const temperature =weatherdata.main.temp
    const discription=weatherdata.weather[0].description
    const icon=weatherdata.weather[0].icon 
    const imgurl='https://openweathermap.org/img/wn/'+icon+'@2x.png '
    res.write("<h1>Temperature in " +city+" is:"+temperature+ " degree celcius"+"</h1>")
    res.write("<p>"+"Weather Status: "+discription+"</p>")
    res.write("<img src=" + imgurl + ">") 

    console.log('city: '+city)
    console.log(imgurl)
    res.send()
  })
  

})
})

