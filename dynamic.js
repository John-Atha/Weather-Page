function hideAll() {
    document.querySelectorAll('.location-pick').forEach( function(div) {
        div.style.display="none";
    });
    document.querySelector('#initial-choice').style.display="none";
    document.querySelector('#about-us').style.display="none";
    document.querySelector('#results').style.display="none";
    document.querySelector('#not-ready-yet').style.display="none";
}

function clearSelect(element) {
    var size = element.options.length-1;
    var i;
    for (i=size; i>=0; i--) {
        element.remove(i);
    }
}

function showInfo(data) {
    document.querySelector('#results-list').style.animationPlayState ="running";
    let str ='°';
    str = str.slice(1,2);
    str = str + 'C';
    addItem("Temperature:", data.main.temp + str);
    addItem("Feels like:", data.main.feels_like + str);
    addItem("Humidity:", data.main.humidity + '%');
    addItem("Wind speed:", data.main.humidity + '%');
    addItem("Description:", data.weather[0].description);
    document.querySelector("#weather-img").src= "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
}

function clearResult() {
    document.querySelector('#results-list').innerHTML="";    
}

function addItem(text1, text2) {
    
    var table = document.getElementById('results-list');
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = text1;                              
    cell2.innerHTML = text2; 
    /*
    var node = document.createElement("LI");                 
    var textnode = document.createTextNode(text);         
    node.appendChild(textnode);                              
    document.getElementById("results-list").appendChild(node);
    */
}


function showResult() {
    clearResult();
    /* -------------------------------
    fill here your unique API KEY that you can get from openweathermap official web page
       -------------------------------
    */
    var APIKEY = '';
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+document.querySelector('#city-select').value+'&appid='+APIKEY+'&units=metric')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        document.querySelector('#results').style.display="grid";
        showInfo(data);
    })
    .catch(error => {
        console.log('Error', error)
    })
}

let greekCities = ["Athens", "Thessaloniki", "Heraklion", "Patras", "Kalamata"];
let italianCities = ["Rome", "Venice", "Florence", "Milan", "Naples"];
let frenchCities = ["Paris", "Marseille", "Bordeaux", "Nantes", "Strasbourg"];
let spanishCities = ["Madrid", "Barcelona", "Seville", "Granada", "Valencia"];
let germanCities = ["Berlin", "Munich", "Frankfurt", "Hamburg", "Cologne"];


document.addEventListener('DOMContentLoaded', () => {
    hideAll();
    document.querySelector('#initial-choice').style.display="block";

    document.querySelector('#choose-map').onclick = () => {
        console.log("chose via map");
        hideAll();
        document.querySelector('#not-ready-yet').style.display="block";
    }
    document.querySelector('#choose-manual').onclick = () => {
        console.log("chose manually");
        document.querySelector('#country').style.display="block";
        document.querySelector('#city').style.display="none";
        document.querySelector('#initial-choice').style.display="none";
    }
    document.querySelector('#country-select').onchange = () => {
        let currentCountry = document.querySelector('#country-select').value;
        console.log("country changed to " + currentCountry);
        if (currentCountry!="Nothing") {
            clearSelect(document.querySelector('#city-select'));
            document.querySelector('#city').style.display="block";
            var select = document.getElementById('city-select');
            var list =  null;
            switch (currentCountry) {
                case "Greece":
                    list = greekCities;
                    break;
                case "Italy":
                    list = italianCities;
                    break;
                case "France":
                    list = frenchCities;
                    break;
                case "Spain":
                    list = spanishCities;
                    break;
                case "Germany":
                    list = germanCities;
                    break;
            }
            
            list.forEach( function(str) {
                var option = document.createElement('option');
                option.appendChild(document.createTextNode(str));
                option.value = str;
                select.appendChild(option);
            })
            showResult();
        }
        else {
            hideAll();
            document.querySelector('#country').style.display="block";
        }
    }

    document.querySelector('#city-select').onchange = () => {
        showResult();
    }

    document.querySelectorAll('.nav-link').forEach( function(link) {
        link.onclick = () => {
            let name = link.innerHTML;
            switch (name) {
                case 'Home':
                    hideAll();
                    console.log("Chose to go home");
                    document.querySelector('#initial-choice').style.display="block";
                    break;
                case 'Hourly':
                    hideAll();
                    document.querySelector('#country-select').value="Nothing";
                    document.querySelector('#not-ready-yet').style.display="block";
                    console.log("Chose to see hourly");
                    break;
                case 'Daily':
                    hideAll();
                    document.querySelector('#country-select').value="Nothing";
                    document.querySelector('#not-ready-yet').style.display="block";
                    console.log("Chose to see daily");
                    break;        
                case 'Weekly':
                    hideAll();
                    document.querySelector('#country-select').value="Nothing";
                    document.querySelector('#not-ready-yet').style.display="block";
                    console.log("Chose to see weekly");
                    break;
                case 'Map':
                    hideAll();
                    document.querySelector('#country-select').value="Nothing";
                    document.querySelector('#not-ready-yet').style.display="block";
                    console.log("Chose to see map");
                    break;
                case 'Contact':
                    hideAll();
                    document.querySelector('#country-select').value="Nothing";
                    document.querySelector('#about-us').style.display="block";
                    console.log("Chose to see info about us");
                    break;
            }
        }

    })

})