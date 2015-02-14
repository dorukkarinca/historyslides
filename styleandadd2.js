//alternativelayers.js

/*
LIST OF MY BAD-ASS API:

function styling(name, geoname, label, color);        Creates a object with styling features. Name, GeoJSON name, on-screen label, display color.
function settingStyle();                              Sets all the styling values. If added new country, add their styling function here.
function everything();                                Adds all countries to the map. Add their name and styling object to the style's switch method.
function focusoncountry2();                           Paints all countries gray except given country.
function removealllayers();                           Removes the "everything" layer.
*/



L.TopoJSON = L.GeoJSON.extend({
  addData: function(jsonData) {    
    if (jsonData.type === "Topology") {
      for (key in jsonData.objects) {
        geojson = topojson.feature(jsonData, jsonData.objects[key]);  // http://bl.ocks.org/rclark/5779673
        L.GeoJSON.prototype.addData.call(this, geojson);
      }
    }    
    else {
      L.GeoJSON.prototype.addData.call(this, jsonData);
    }
  }  
});


var array_of_layers = new L.layerGroup([]);
var group = new L.layerGroup([]);
var count = -1;

var styleholder = [];
var x;


var targetedgeoJson;



function styling(name, geoname, label, color){
    count++;
    this.numid = count;
    styleholder[count] = this;

    this.name = name;
    this.geoname = geoname;
    this.label = label;
    this.color = color;
    this.opacity = 1;
    this.stroke = false;
    this.dashArray = "3";
    this.fillOpacity = 1;
    this.fillColor = color;
}


function settingStyle(){
austrianpurple = new styling("austrianpurple", "austria_bigger", "Austro-Hungarian Empire", "#ceb5cf");
belgiumgreen = new styling("belgiumgreen", "belgium", "Belgium", "#d3e46f");
bosniablue = new styling("bosniablue", "bosnia", "Bosnia", "#a3cec5");
bulgarianyellow = new styling("bulgarianyellow", "bulgaria", "Bulgaria", "#fae364");
denmarkpurple = new styling("denmarkpurple", "denmark", "Denmark", "#fdaf6b");
frenchorange = new styling("frenchorange", "france_big", "France", "#fdc663");
germanyellow = new styling("germanyellow", "germany_bigger", "Germany", "#fae364")
britishblue = new styling("britishblue", "great_britain", "Great Britain", "#a3cec5");
greekorange = new styling("greekorange", "greece", "Greece", "#fdaf6b");
italiangreen = new styling("italiangreen", "italy_bigger", "Italy", "#d3e46f");
netherlandspink = new styling("netherlandspink", "netherlands", "Netherlands", "#f3c1d3");
ottomanpurple = new styling("ottomanpurple", "ottoman_empire_biggest", "Ottoman Empire", "#ceb5cf");
portugalorange = new styling("portugalorange", "portugal", "Portugal", "#fdaf6b");
romanpink = new styling("romanpink", "romania", "Romania", "#f3c1d3");
russianorange = new styling("russianorange", "russia2", "Russia", "#fdaf6b");
serbiangreen = new styling("serbiangreen", "serbia", "Serbia", "#d3e46f");
spanishgreen = new styling("spanishgreen", "spain", "Spain", "#d3e46f");
swissblue = new styling("swissblue", "switzerland", "Switzerland", "#a3cec5");
luxembourgpurple = new styling("luxembourgpurple", "luxembourg", "Luxembourg", "#ceb5cf");
norwaygreen = new styling("norwaygreen", "norway", "Norway", "#d3e46f");
swedenpink = new styling("swedenpink", "sweden", "Sweden", "#f3c1d3");
};

settingStyle();

var all_with_attributes = topojson.feature(topotest, topotest.objects.all_with_attributes_most_recent);



var everything = L.geoJson(all_with_attributes, {
    onEachFeature: function(feature){
    	array_of_layers.addLayer(feature);
    },
    style: function(feature){
    		switch(feature.properties.thename){
    		case "austria_bigger": return austrianpurple; break;
    		case "belgium": return belgiumgreen; break;
    		case "bosnia": return bosniablue; break;
    		case "bulgaria": return bulgarianyellow; break;
    		case "denmark": return denmarkpurple; break;
    		case "france_big": return frenchorange; break;
    		case "germany_big": return germanyellow; break;
    		case "great_britain": return britishblue; break;
    		case "greece": return greekorange; break;
    		case "italy": return italiangreen; break;
            case "luxembourg": return luxembourgpurple; break;
    		case "netherlands": return netherlandspink; break;
            case "norway": return norwaygreen; break;
    		case "ottoman_empire": return ottomanpurple; break;
    		case "portugal": return portugalorange; break;
    		case "romania": return romanpink; break;
    		case "russia2": return russianorange; break;
    		case "serbia": return serbiangreen; break;
    		case "spain": return spanishgreen; break;
            case "sweden": return swedenpink; break;
            case "switzerland": return swissblue; break;
    		}
    }
    
});



var resetcountries = function(){

    everything.setStyle(function(feature){
            switch(feature.properties.thename){
            case "austria_bigger": return austrianpurple; break;
            case "belgium": return belgiumgreen; break;
            case "bosnia": return bosniablue; break;
            case "bulgaria": return bulgarianyellow; break;
            case "denmark": return denmarkpurple; break;
            case "france_big": return frenchorange; break;
            case "germany_big": return germanyellow; break;
            case "great_britain": return britishblue; break;
            case "greece": return greekorange; break;
            case "italy": return italiangreen; break;
            case "luxembourg": return luxembourgpurple; break;
            case "netherlands": return netherlandspink; break;
            case "norway": return norwaygreen; break;
            case "ottoman_empire": return ottomanpurple; break;
            case "portugal": return portugalorange; break;
            case "romania": return romanpink; break;
            case "russia2": return russianorange; break;
            case "serbia": return serbiangreen; break;
            case "spain": return spanishgreen; break;
            case "sweden": return swedenpink; break;
            case "switzerland": return swissblue; break;
            }
    }

    );

group.addLayer(everything);
countryLayerExists = true;
currCountry = null;

};








var focusoncountry2 = function(country, color, theother){ //theother must be string.


    currCountry = country; //currCountry is a mapState element.

    var currentCountry = new Array();
    var targetcolor = new Array();
    var othercolor = new Array();
    var isATargetCountry = new Boolean(false);
   
    var iOutside; //May be used to keep track of the country index in the currentCountry array that is processed.
    
    

    for(i=0 ; i<country.length; i++){
        
        currentCountry[i] = country[i];
            
            if (color === "default"){
                targetcolor[i] = getCountryColor(country[i]);
            }
            else {
                targetcolor[i] = color[i];
            }
        
    }

            if (theother === "default"){ //not used for the time being.
                othercolor[0] = "#a8a8a8"; //gray
            }
            else {
                othercolor[0] = theother[0];
            }


if (countryLayerExists){
    var targetCountryCounter = 0;

        everything.setStyle( function(feature){
                            
                    if (arrayContains(country, feature.properties.thename) !== -1){ 
                        targetCountryCounter = arrayContains(country, feature.properties.thename);
                        var selectedstyle = {
                            opacity: 1,
                            stroke: false,
                            fillOpacity: 1,
                            color: null,
                            fillColor: null
                        };
                        console.log(targetcolor);
                        selectedstyle.color = targetcolor[targetCountryCounter];
                        selectedstyle.fillColor = targetcolor[targetCountryCounter];
                        return selectedstyle;
                    }

                    else {
                        var anystyle = {
                            opacity: 1,
                            stroke: false,
                            fillOpacity: 1,
                            color: null,
                            fillColor: null
                        };
                        anystyle.color = othercolor;
                        anystyle.fillColor = othercolor;
                        return anystyle;
                    }

                      }        
            );
}
else { //executes if country layer doesn't exist, unlikely to happen if you don't pass "removeallcountries": true

    everything = L.geoJson(all_with_attributes, {
    onEachFeature: function(feature){
        array_of_layers.addLayer(feature);
    },
    style: function(feature){
            switch(feature.properties.thename){
            case "austria_bigger": return austrianpurple; break;
            case "belgium": return belgiumgreen; break;
            case "bosnia": return bosniablue; break;
            case "bulgaria": return bulgarianyellow; break;
            case "denmark": return denmarkpurple; break;
            case "france_big": return frenchorange; break;
            case "germany_big": return germanyellow; break;
            case "great_britain": return britishblue; break;
            case "greece": return greekorange; break;
            case "italy": return italiangreen; break;
            case "luxembourg": return luxembourgpurple; break;
            case "netherlands": return netherlandspink; break;
            case "norway": return norwaygreen; break;
            case "ottoman_empire": return ottomanpurple; break;
            case "portugal": return portugalorange; break;
            case "romania": return romanpink; break;
            case "russia2": return russianorange; break;
            case "serbia": return serbiangreen; break;
            case "spain": return spanishgreen; break;
            case "sweden": return swedenpink; break;
            case "switzerland": return swissblue; break;
            }
    }
    
});

}
                    


    group.addLayer(targetedgeoJson);
    return 0;


};

var focusoncountryNameOnly = function(countryname) {
    return focusoncountry2(countryname, "default", "default");
};


var removealllayers = function(){
    debugger;
    group.removeLayer(everything);
    countryLayerExists = false;
    currCountry = null;
};

var getCountryColor = function(country){

    switch(country){
            case "austria_bigger": return austrianpurple.color; break;
            case "belgium": return belgiumgreen.color; break;
            case "bosnia": return bosniablue.color; break;
            case "bulgaria": return bulgarianyellow.color; break;
            case "denmark": return denmarkpurple.color; break;
            case "france_big": return frenchorange.color; break;
            case "germany_big": return germanyellow.color; break;
            case "great_britain": return britishblue.color; break;
            case "greece": return greekorange.color; break;
            case "italy": return italiangreen.color; break;
            case "luxembourg": return luxembourgpurple.color; break;
            case "netherlands": return netherlandspink.color; break;
            case "norway": return norwaygreen.color; break;
            case "ottoman_empire": return ottomanpurple.color; break;
            case "portugal": return portugalorange.color; break;
            case "romania": return romanpink.color; break;
            case "russia2": return russianorange.color; break;
            case "serbia": return serbiangreen.color; break;
            case "spain": return spanishgreen.color; break;
            case "sweden": return swedenpink.color; break;
            case "switzerland": return swissblue.color; break;
            default: alert("Color not found!"); break;
            }
}

