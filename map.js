var url = 'https://ipapi.co/json/';//url for getting lat lon and zip using present ip

//variables 
var lat;
var lon;
var zip;

//request
fetch(url).then(function(response) {
  return response.json();
}).then(function(data) {
  console.log(data);
  lat=data.latitude;
  lon=data.longitude;
  zip=data.postal;
  draw();//once promise executed, proceed

}).catch(function() {
  console.log("Booo");
});

//draw map using given lat lon
function draw(){
  var map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([lon, lat]),
      zoom: 12
    })
  });
}
