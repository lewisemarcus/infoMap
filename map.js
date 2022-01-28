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
    console.log(data)
    lat = data.latitude
    lon = data.longitude
    //Draw map function using given lat lon from IP.
    function draw() {
      const features = [];
      features.push(new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.fromLonLat([lon, lat]))
      }))
    // create the source and layer for feature
    const vectorSource = new ol.source.Vector({
      features
    })
    const vectorLayer = new ol.layer.Vector({
      source: vectorSource,
      opacity: 0.5,
      style: new ol.style.Style({
        image: new ol.style.Circle({
          radius: 20,
          fill: new ol.style.Fill({color: 'red'}),
        })
      })
    })
      
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
    //If promise is successful, map is drawn.
    draw()
    pollutionPull()
  }, function () {
    // If data promise fails, 'Booo'.
    console.log("Booo")
  })


