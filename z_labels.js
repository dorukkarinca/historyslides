debugger;

var labels = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "en": "Spain",
        "tr": "\u0130spanya",
        "en_short": "SP"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -4.40576171875,
          40.27952566881291
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "en": "France",
        "tr": "Fransa",
        "en_short": "FR"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          2.3927734375,
          47.84265762816535
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "en": "Germany",
        "tr": "Almanya",
        "en_short": "GER"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          14.23828125,
          52.696361078274485
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "en": "Portugal",
        "tr": "Portekiz",
        "en_short": "POR"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -8.6693359375,
          39.57182223734374
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "en": "Italy",
        "tr": "\u0130talya",
        "en_short": "IT"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          12.65625,
          42.74701217318067
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "en": "Belgium",
        "tr": "Bel\u00e7ika",
        "en_short": "BEL"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          3.6142578125,
          50.93073802371819
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "en": "Netherlands",
        "tr": "Hollanda",
        "en_short": "NL"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          4.325,
          52.295042284537324
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "en": "Austro-Hungarian Empire",
        "tr": "Avusturya Macaristan \u0130mp.",
        "en_short": "AHE"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          17.314453125,
          48.16608541901253
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "en": "Romania",
        "tr": "Romanya",
        "en_short": "ROM"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          24.806640624999996,
          45.24395342262324
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "en": "Bulgaria",
        "tr": "Bulgaristan",
        "en_short": "BG"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          24.262060546875,
          43.61779143282346
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "en": "Greece",
        "tr": "Yunanistan",
        "en_short": "GR"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          21.884765625,
          37.8225909761771
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "en": "Ottoman Empire",
        "tr": "Osmanl\u0131 \u0130mp.",
        "en_short": "OE"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          32.87109375,
          39.30029918615029
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "en": "Switzerland",
        "tr": "\u0130svi\u00e7re",
        "en_short": "SW"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          6.998046875,
          46.76996843356982
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "en": "Great Britain",
        "tr": "\u0130ngiltere",
        "en_short": "GB"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -2.421484375,
          54.5897007687178
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "en": "Denmark",
        "tr": "Danimarka",
        "en_short": "DEN"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          9.228515625,
          55.87531083569679
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "en": "Russia",
        "tr": "Rusya",
        "en_short": "RUS"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          29.70703125,
          51.645294049305406
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "en": "Serbia",
        "tr": "S\u0131rbistan",
        "en_short": "SRB"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          20.7421875,
          44.5278427984555
        ]
      }
    }
  ]
};

var labelstringtype = "en_short";

var labelcreator = function(i){
  var obj = { html: null, className: null};
  obj.props = labels.features[i].properties;
  obj.html = obj.props[labelstringtype];
  console.log(obj.html);
  obj.className = "country-label";
  return obj;
};

var getCoordinates = function(i){
    var a = labels.features[i].geometry.coordinates;
    var lon = a[0];
    var lat = a[1];

    var result = [];

    result[0] = lat;
    result[1] = lon;

    return result;

}

var labelgroup = L.featureGroup([]);

var thelooper;
var iconholder = [];
var markerholder = [];



var printlabels = function(){

  for (thelooper=0; thelooper<labels["features"].length; thelooper++){

    iconholder[thelooper] = L.divIcon(labelcreator(thelooper));
    markerholder[thelooper] = new L.marker(getCoordinates(thelooper), {icon: iconholder[thelooper]});

    labelgroup.addLayer(markerholder[thelooper]);

  }    
}
  
printlabels();
  


 




