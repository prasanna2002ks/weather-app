let api = 'da8ae89e30c74b5ca06105903242508';
document.getElementById('get-info').addEventListener('submit',function(e){
    let url = `https://api.weatherapi.com/v1/current.json?key=${api}&q=`;
    e.preventDefault();
    let cName = e.target.countryName.value;
    url += cName;
    fetchData(url);
    e.target.reset();
})

function fetchData(url){
    let displayTag = document.getElementById('displayData');
    let xhr = new XMLHttpRequest();
    xhr.open('GET',url,true);
    xhr.send();
    xhr.onprogress = displayTag.innerHTML=`<div class="col-md-3 m-auto">
                                                <div class="card">
                                                    <div class="card-body">
                                                        <p class="card-text">Data loading...</p>
                                                    </div>
                                                </div>
                                            </div>`;

    xhr.addEventListener('load',()=>{
        if(xhr.status===200){
            let data = JSON.parse(xhr.responseText);
            let condition = data.current.condition.text;
            let {humidity, wind_kph, feelslike_c} = data.current;
            console.log(condition,humidity, wind_kph, feelslike_c);

            let htmlData = `<div class="col-md-3">
                <div class="card shadow">
                    <div class="card-body">
                        <h6 class="card-title fw-bold"><i class="fa-solid fa-temperature-half"></i> Temperature</h6>
                        <p class="card-text">${feelslike_c}° C</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card shadow">
                    <div class="card-body">
                        <h6 class="card-title fw-bold"><i class="fa-regular fa-sun"></i> Humidity</h6>
                        <p class="card-text">${humidity} %</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card shadow">
                    <div class="card-body">
                        <h6 class="card-title fw-bold"><i class="fa-solid fa-cloud"></i> Condition</h6>
                        <p class="card-text">${condition}</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card shadow">
                    <div class="card-body">
                        <h6 class="card-title fw-bold"><i class="fa-solid fa-wind"></i> Wind Speed</h6>
                        <p class="card-text fw-lighter">${wind_kph} kph</p>
                    </div>
                </div>
            </div>`;

            displayTag.innerHTML=htmlData;
        } else {
            alert("Failed to fetch weather data !!!")
            displayTag.innerHTML = null;
        }
    })
}
/* working code using fetch api
    let p1 = fetch(url);
    let p2 = p1.then(function(response){
            if(response.status===200)
                return response.json();
            else
                alert("no data found");
        });
    p2.then((data)=>console.log(data));
*/