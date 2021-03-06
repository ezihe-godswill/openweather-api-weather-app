// const api = {
//     key: "d99763d07996d85ed9dfd4dd587bd5d8",
//     base: "https://api.openweathermap.org/data/2.5/"
// };

// const searchBox = document.querySelector('.search-box');
// searchBox.addEventListener('keypress', setQuery);

// function setQuery(evt){
//     if (evt.KeyCode === 13) {
//         getResults(searchBox.value);
//         console.log(searchBox.value);
//     }
// }

// function getResults(query){
//     // https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&appid=d99763d07996d85ed9dfd4dd587bd5d8
//     fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
//         .then(weather => {
//             return weather.json();
//         }).then(displayResults);
// }

// function displayResults(){
//     console.log(weather);
// }

window.addEventListener('load', () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('../sw.js').then(registration => {
            console.log('SW registered');
            console.log(registration);
        }).catch(error => {
            console.log('SW registration failed');
            console.log(error);
        })
    }
    
    
    let searchBox = document.querySelector(".search-box");
    let button = document.querySelector(".button");
    
    // searchBox.addEventListener('submit', (e) => {
    //     e.preventDefault();
    //     console.log(e.target.value);
    // })

    button.addEventListener('click', (e)=> {

        fetch('https://api.openweathermap.org/data/2.5/weather?q='+searchBox.value+'&appid=d99763d07996d85ed9dfd4dd587bd5d8')
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            // console.log(searchBox. value)
            // localStorage.setItem('city', searchBox.value);
    
            let city = document.querySelector('.location .city');
            city.innerHTML = `${data.name}, ${data.sys.country}`;
    
            let now = new Date();
            let date = document.querySelector('.location .date');
            date.innerHTML = dateBuilder(now);
    
            let temp = document.querySelector('.current .temp');
            temp.innerHTML = `${Math.round(data.main.temp)}<span>&deg;c</span>`;
    
            let weather_el = document.querySelector('.current .weather');
            weather_el.innerHTML = data.weather[0].main;
    
            let hi_low = document.querySelector('.current .hi-low');
            hi_low.innerHTML = `${Math.round(data.main.temp_min)}&deg;c / ${Math.round(data.main.temp_max)}&deg;c`;
        })
    .catch(err => alert("Wromg city name! check your internet connection too"))
    })
    
    function dateBuilder(d){
        let months = ['January','February','March','April','May','June','July','August',
                    'September', 'October', 'November','December'];
        let days = ['Sunday', 'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    
        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();
    
        return `${day} ${date} ${month} ${year}`;
    }
});
