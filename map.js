const ipurl = 'https://ipapi.co/json/';//url for getting lat lon and zip using present ip
api = 'd02fa9172dbf15e41731eb3c85cf0882'
let lat
let lon
//Initial ipurl request.
fetch(ipurl)
  .then(function (response) {
    return response.json()
  })
  .then(function (data) {
    lat = data.latitude
    lon = data.longitude
    //If promise is successful, map is drawn.
    draw()
    pollutionPull()
  }, function () {
    // If data promise fails, 'Booo'.
    console.log("Booo")
  })
//Draw map function using given lat lon from IP.
function draw() {
  //Styles applied to each point.
  const styleOne = new ol.style.Style({
    image: new ol.style.Circle({
      radius: 50,
      fill: new ol.style.Fill({
        color: 'red'
      })
    })
  })
  const styleTwo = new ol.style.Style({
    image: new ol.style.Circle({
      radius: 50,
      fill: new ol.style.Fill({
        color: 'green'
      })
    })
  })
  //Features array created as the vector source 'features' input is an array.
  const features = [];
  //Location of points on the map.
  const featureOne = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.fromLonLat([lon - .01, lat - .01]))
  })
  const featureTwo = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.fromLonLat([lon, lat]))
  })
  //Append each feature to features list for use in vector source.
  features.push(featureOne, featureTwo)
  //Dynamically sizes points to keep them relative to original render.
  featureOne.setStyle(function (feature, resolution) {
    styleOne.getImage().setScale(map.getView().getResolutionForZoom(12) / resolution)
    return styleOne
  })
  featureTwo.setStyle(function (feature, resolution) {
    styleTwo.getImage().setScale(map.getView().getResolutionForZoom(12) / resolution)
    return styleTwo
  })
  // create the source and layer for feature.
  const vectorSource = new ol.source.Vector({
    features
  })
  const vectorLayer = new ol.layer.Vector({
    source: vectorSource,
    updateWhileAnimating: true,
    updateWhileInteracting: true,
    opacity: 0.5
  })
  //Map creation based on given coordinates.
  const map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      }), vectorLayer
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([lon, lat]), zoom: 12
    })
  })
}
