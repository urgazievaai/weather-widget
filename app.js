let city = document.querySelector(".city");
let temp = document.querySelector(".temp");
const search = document.querySelector(".search-bar");
let iconi = document.querySelector(".weather-icon");
let desc = document.querySelector(".desc");
let humi = document.querySelector(".humidity");
let time = document.querySelector(".time");
let myInterval = null;

const click = document.querySelector(".search-btn").addEventListener("click", weather);
const enter = document.querySelector(".search-bar").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    weather();
  }
});
//можно вынести за пределы функции
function cityTime(getTimezone) {
  // let getTimezone = data.timezone;
  let d1 = new Date();
  let localTime = d1.getTime();
  let localOffset = d1.getTimezoneOffset() * 60000;
  let utc = localTime + localOffset;
  let city1 = utc + 1000 * getTimezone;
  let getHours = String(new Date(city1).getHours()).padStart(2, "0");
  let getMinute = String(new Date(city1).getMinutes()).padStart(2, "0");
  let getTime = `${getHours}:${getMinute}`; 
  //padLeft
  let nd = new Date(city1);
  console.log(nd);
  return getTime;
}
function weather() {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      search.value +
      "&appid=36346887f78653892aaf3f460a3f7f4d"
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      document.querySelector(".weather").style.display = "block";

      let getName = data.name;
      city.innerHTML = getName;

      search.value = "";

      document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + getName + "/city')";

      let getTemp = data.main.temp;
      let getCel = Math.round(getTemp - 273.15);

      temp.innerHTML = `${getCel} °С`;

      let getIcon = data.weather[0].icon;
      iconi.src = "http://openweathermap.org/img/wn/" + getIcon + "@2x.png";
      iconi.innerHTML = getIcon;

      let getDesc = data.weather[0].description;
      desc.innerHTML = getDesc;

      let getHumi = data.main.humidity;
      humi.innerHTML = `Humidity: ${getHumi} %`;

      
      clearInterval(myInterval);
      
     myInterval = setInterval(()=> {
        time.innerHTML = cityTime(data.timezone);
      }, 2000);
      
    
      
      
      
      
      //решить проблему с интервалами через  clearInterval 

     //вместо остагавливать через какое то время нужно сделать так что бы оно останавливалось после получения новой timezone остановливать каждый раз когда делаеютс запрос 
    })
    .catch((error) => {
      console.log(error);
    });
}



