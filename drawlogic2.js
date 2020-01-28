function getLocation() {
  if (navigator.geolocation && localStorage.getItem("geolat") == null) {
    navigator.geolocation.getCurrentPosition(saveLocation);
  }
  else { 
    showPosition()
  }
}

function saveLocation(position){
    localStorage.setItem("geolat", position.coords.latitude);
    localStorage.setItem("geolong", position.coords.longitude);

    showPosition()
}

function showPosition() {
    let data;
    
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    
    const url = "https://api.openweathermap.org/data/2.5/weather?lat="+ localStorage.getItem("geolat")+ "&lon="+ localStorage.getItem("geolong") +"&APPID=48ca062f46278186f5a0ed41287c1093"; // site that doesn’t send Access-Control-*
    fetch(proxyurl + url)
    .then(response => response.text())
    .then(contents => {
        // console.log(contents)
        data = contents
        obj = JSON.parse(contents)
        // console.log(obj.coord)
        // console.log(obj.weather[0].main)
        // console.log(obj.main.temp_min)
        adjustWebData()
        
})
.catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
}

function adjustWebData(){
    document.getElementById("country").innerHTML = obj.sys.country
    document.getElementById("location").innerHTML = obj.name

    document.getElementById("WeatherMain").innerHTML = obj.weather[0].main.toUpperCase()
    document.getElementById("WeatherDesc").innerHTML = obj.weather[0].description.toUpperCase()
    document.getElementById("WeatherTemp").innerHTML = Math.round(obj.main.temp - 273.15)
    document.getElementById("MaxTemp").innerHTML = Math.round(obj.main.temp_max - 273.15)
    document.getElementById("MinTemp").innerHTML = Math.round(obj.main.temp_min - 273.15)

    document.getElementById("WindSpeed").innerHTML = Math.round(obj.wind.speed)

    backgroundAdjust()
}

function backgroundAdjust(){
    if(obj.weather[0].main.toLowerCase() == "rain"){
        document.body.style.background = "url(rainanim.gif)";
    }else if(obj.weather[0].main.toLowerCase() == "clouds"){
        document.body.style.background = "url(cloudyanim.gif)";
    }else if(obj.weather[0].main.toLowerCase() == "clear"){
        document.body.style.background = "url(sunnyanim.gif)";
    }
}
getLocation()
 

//{"coord":{"lon":-0.13,"lat":51.51},"weather":[{"id":300,"main":"Drizzle","description":"light intensity drizzle",
//"icon":"09d"}],"base":"stations","main":{"temp":280.32,"pressure":1012,"humidity":81,"temp_min":279.15,"temp_max":281.15},
//"visibility":10000,"wind":{"speed":4.1,"deg":80},"clouds":{"all":90},"dt":1485789600,"sys":{"type":1,"id":5091,
//"message":0.0103,"country":"GB","sunrise":1485762037,"sunset":1485794875},"id":2643743,"name":"London","cod":200}
