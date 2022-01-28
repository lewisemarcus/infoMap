const features = [];
        features.push(new ol.Feature({
          geometry: new ol.geom.Point(ol.proj.fromLonLat([lon, lat]))
        }))
      // create the source and layer for random features
      const vectorSource = new ol.source.Vector({
        features
      })
      const vectorLayer = new ol.layer.Vector({
        source: vectorSource,
        style: new ol.style.Style({
          image: new ol.style.Circle({
            radius: 2,
            fill: new ol.style.Fill({color: 'red'})
          })
        })
      })