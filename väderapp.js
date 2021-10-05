var button = document.querySelector('.button'); /*Returerar första elementet inne i dokumentet som matchar*/
var city = document.querySelector('.city');
var name = document.querySelector('.name');
var cityName = document.querySelector('#wrapper-name');
var temp = document.querySelector('#wrapper-temp');
var desc = document.querySelector('#wrapper-description');

let apiKey="&appid=a882e99b1c8cb715554c9981fa9f1826";
    //Icons
let iconUrl = "http://openweathermap.org/img/wn/"; 
let iconFormat = ".png";    

document.addEventListener('DOMContentLoaded', onLoad); 
//laddar upp allt vid start 
      function onLoad(){ 
        let apiUrl="https://api.openweathermap.org/data/2.5/onecall?";      
        let lat="lat=60.67452&";
        let long="lon=17.14174&"; 
        let apiOptional="exclude=minutely,minutely&units=metric&cnt=5&";
        const file=apiUrl + lat + long + apiOptional + apiKey;
        let name= "Gävle, SE";
        weatherFetch(file,name)
      }
      function weatherFetch(file,name) {
        fetch(file) 
        .then((response) => response.json())
        .then((data) => {
          
          //Weather main data          
          let description=data.current.weather[0].description;
          let temp= Math.round(data.current.temp);
          
          document.getElementById("wrapper-description").innerHTML=description;
          document.getElementById("wrapper-temp").innerHTML=temp + "°C";
          document.getElementById("wrapper-name").innerHTML=name;
          weatherHourly(data)
        });
      }
        function weatherHourly(data){
            //Weather hourly
            let hourNow=Math.round(data.hourly[0].temp);
            let hour1=Math.round(data.hourly[1].temp);
            let hour2=Math.round(data.hourly[2].temp);
            let hour3=Math.round(data.hourly[3].temp);
            let hour4=Math.round(data.hourly[4].temp);
            let hour5=Math.round(data.hourly[5].temp);      

            document.getElementById("wrapper-hour-now").innerHTML=hourNow + "°C"
            document.getElementById("wrapper-hour1").innerHTML=hour1 + "°C"
            document.getElementById("wrapper-hour2").innerHTML=hour2 + "°C"
            document.getElementById("wrapper-hour3").innerHTML=hour3 + "°C"
            document.getElementById("wrapper-hour4").innerHTML=hour4 + "°C"
            document.getElementById("wrapper-hour5").innerHTML=hour5 + "°C"
            time()
            weatherDaily(data)
         }
          function time(){
            //Time
            let timeNow=new Date().getHours(); /*Loop för att få ut 5 timmar efter nuvarande tid */
            let time=[] 
            for(i=0; i<5; i++) {
              if (timeNow > 23){
                timeNow=0;
              }             
              time[i]=timeNow+=1; 
            }
            let time1=time[0]
            let time2=time[1]
            let time3=time[2]
            let time4=time[3]
            let time5=time[4]

            document.getElementById("wrapper-time1").innerHTML=time1;
            document.getElementById("wrapper-time2").innerHTML=time2;
            document.getElementById("wrapper-time3").innerHTML=time3;
            document.getElementById("wrapper-time4").innerHTML=time4;
            document.getElementById("wrapper-time5").innerHTML=time5;
           }

          function weatherDaily(data){
            
            for (x=1;x<6;x++){ /*En forloop för de 5 kommande dagarna. Börjar från 1, då 0 är dagens datum*/
              let date=dates(data.daily[x].dt).split(", ") /*Sätter en split för dagarna så loopen bryter vid ","*/
              let dayTemp=data.daily[x].temp.day;    
              let weekday=date[0] + ", " + date[1]; /*här får vi ut veckodagens namn och den dagens datum. date[2] hade även skrivit ut året (2021)*/
              let min= data.daily[x].temp.min;
              let max= data.daily[x].temp.max;
              document.getElementById("day" + (x)).innerHTML=weekday
              document.getElementById("wrapper-forecast-temp-day"+(x)).innerText=Math.round(dayTemp) + "°C " + "(min: " + min + "°C " + "max: " + max + "°C)";

          }
            icons(data)
           }     
          function dates(datesDate) { //Funktion för att få datum
            let dateOptions = {
              weekday: "long",
                   year: "numeric",
              month: "long",
              day: "numeric",
              time: "numeric",
            };
            //Parsar "dates"
            const convertDate = new Date(datesDate * 1000);
            // Använder "toLocaleDataString" för att få ut datum för dagarna till varje region
            const date = convertDate.toLocaleDateString("en-EN", dateOptions);
         
            return date;
          }

          function icons(data){

            //Tomorrow
            let iconCodeTomorrow = data.daily[0].weather[0].icon;
            let iconFullUrlTomorrow = iconUrl + iconCodeTomorrow + iconFormat;
            document.getElementById("wrapper-icon-day1").src = iconFullUrlTomorrow;
            //Day 2
            let iconCodeDay2 = data.daily[1].weather[0].icon;
            let iconFullUrlDay2 = iconUrl + iconCodeDay2 + iconFormat;
            document.getElementById("wrapper-icon-day2").src = iconFullUrlDay2;          
            //Day 3
            let iconCodeDay3 = data.daily[2].weather[0].icon;
            let iconFullUrlDay3 = iconUrl + iconCodeDay3 + iconFormat;
            document.getElementById("wrapper-icon-day3").src = iconFullUrlDay3;
            //Day 4
            let iconCodeDay4 = data.daily[3].weather[0].icon;
            let iconFullUrlDay4 = iconUrl + iconCodeDay4 + iconFormat;
            document.getElementById("wrapper-icon-day4").src = iconFullUrlDay4;
            //Day 5
            let iconCodeDay5 = data.daily[4].weather[0].icon;
            let iconFullUrlDay5 = iconUrl + iconCodeDay5 + iconFormat;
            document.getElementById("wrapper-icon-day5").src = iconFullUrlDay5;
            iconsHour(data)
           }
            //Icons hourly

          function iconsHour(data){
            //Hour now
            let iconCodeHourNow = data.hourly[0].weather[0].icon;
            let iconFullUrlHourNow = iconUrl + iconCodeHourNow + iconFormat;
            document.getElementById("wrapper-icon-hour-now").src = iconFullUrlHourNow;
            //Hour 1
            let iconCodeHour1 = data.hourly[1].weather[0].icon;
            let iconFullUrlHour1 = iconUrl + iconCodeHour1 + iconFormat;
            document.getElementById("wrapper-icon-hour1").src = iconFullUrlHour1;
            //Hour 2
            let iconCodeHour2 = data.hourly[2].weather[0].icon;
            let iconFullUrlHour2 = iconUrl + iconCodeHour2 + iconFormat;
            document.getElementById("wrapper-icon-hour2").src = iconFullUrlHour2;
            //Hour 3
            let iconCodeHour3 = data.hourly[3].weather[0].icon;
            let iconFullUrlHour3 = iconUrl + iconCodeHour3 + iconFormat;
            document.getElementById("wrapper-icon-hour3").src = iconFullUrlHour3;
            //Hour 4
            let iconCodeHour4 = data.hourly[4].weather[0].icon;
            let iconFullUrlHour4 = iconUrl + iconCodeHour4 + iconFormat;
            document.getElementById("wrapper-icon-hour4").src = iconFullUrlHour4;
            //Hour 5
            let iconCodeHour5 = data.hourly[5].weather[0].icon;
            let iconFullUrlHour5 = iconUrl + iconCodeHour5 + iconFormat;
            document.getElementById("wrapper-icon-hour5").src = iconFullUrlHour5;
            background(data)
           }
            //Backgrounds

         function background(data){
          let main=data.current.weather[0].main;
            switch (main) {
              case "Snow":
                  document.getElementById("wrapper-bg").style.backgroundImage= "url(snowy.gif)"
                break;
                case "Clouds":
                  document.getElementById("wrapper-bg").style.backgroundImage= "url(cloudy.gif)"
                break;
                case "Clear":
                  document.getElementById("wrapper-bg").style.backgroundImage= "url(clearsky.gif)"
                break;
                case "Rain":
                  document.getElementById("wrapper-bg").style.backgroundImage= "url(rainy.gif)" //Funkade inte att lägga Drizzle på samma såhär: case "Rain","Drizzle": (Light rain blev default då iallafall)
                break;
                case "Drizzle":
                  document.getElementById("wrapper-bg").style.backgroundImage= "url(rainy.gif)"
                break;
                case "Thunderstorm":
                  document.getElementById("wrapper-bg").style.backgroundImage= "url(thunderstorm.gif)"
                break;
                case "Fog": //, "Mist" Kan det användas såhär med två???
                 document.getElementById("wrapper-bg").style.backgroundImage= "url(foggy.gif)"
                break;
                case "Mist":
                  document.getElementById("wrapper-bg").style.backgroundImage= "url(foggy.gif)"
                 break;
                default:
                 document.getElementById("wrapper-bg").style.backgroundImage= "url(default.gif)"
                break;
                }
            }  

    button.addEventListener('click', citySearch) //Knappfunktion med click
        function citySearch () {  //Funktion för att söka på stad
            const apiUrl2='https://api.openweathermap.org/data/2.5/weather?q=' + city.value + apiKey + '&units=metric';

            fetchWeather(apiUrl2);
        }
        async function fetchWeather(url){ //Funktion för att hämta väder från api och koordinater 
        fetch(url)
        .then(response => response.json())
        .then(data => {
          let apiUrl="https://api.openweathermap.org/data/2.5/onecall?";  
          let lat="lat=" + data.coord.lat + "&";
          let long="lon=" + data.coord.lon + "&"; //letar upp koordinater och hämtar dom 
          let apiOptional="exclude=minutely,minutely&units=metric&cnt=5&";
          const file=apiUrl + lat + long + apiOptional + apiKey; //+ min + max
          let name= data.name + "," + data.sys.country; //plockar ut stad och landskod
          weatherFetch(file,name)
        })
        .catch(error => alert("That´s not quite right!"))
    };