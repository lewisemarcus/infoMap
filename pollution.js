function pollutionPull() {
    const pollutionUrl = 'https://api.openweathermap.org/data/2.5/air_pollution?lat=' + lat + '&lon=' + lon + '&appid=' + api
    fetch(pollutionUrl)
        .then(function (response) {
            return response.json()
        }, function () {
            //If response from pollutionUrl promise fails.
            console.log('ERROR')
        })
        .then(function (data) {
            console.log(data)
            for (let each of document.getElementById('pollutants').children) {
                each.textContent = each.id +': ' + data.list[0].components[each.id.toLowerCase()]
            }
        })
}
//https://positionstack.com/ for city name