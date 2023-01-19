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
    res.write("<div style='background-image:url(https://t3.ftcdn.net/jpg/04/03/02/92/240_F_403029269_KCrGHt5AdtV7GSD2KeP8Wk2PYIbVKlNU.jpg); background-size:cover;height:100vh;text-align:center;'><h1 style='color:white;background-color:gray;text-align:center;font-family:monospace;font-size:2.5rem;border-radius:3rem'>Temperature in " +city+" is : "+temperature+ " degree celcius"+"</h1><p style='font-family:monospace;color:gray;font-size:2rem;text-align:center'>"+"Weather Status: "+discription+"</p> <div style='background-color:gray;margin:0px 80vh;border-radius:3rem;'><img src=" + imgurl + "></div> </div>")
    res.write("")
    res.write("")
    res.write("") 
    res.write("<div > </div>")

    console.log('city: '+city)
    console.log(imgurl)
    res.send()
  })
  

})
})

