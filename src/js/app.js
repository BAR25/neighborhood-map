/** MAP */

// Initialize map as callback function for Google Maps API script
function initMap() {
  // Create a new map instance
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 45.54800100000001, lng: -122.66575999999998},
    zoom: 15,
    styles: styles,
    mapTypeControl: false
  });

  // Define global variables after map instance created (otherwise google is undefined)
  defaultIcon = makeMarkerIcon('a82848');
  highlightedIcon = makeMarkerIcon('ed4b74');
  clickedIcon = makeMarkerIcon('f79336');
  // get initial boundaries of map
  bounds = new google.maps.LatLngBounds();
  basicInfowindow = new google.maps.InfoWindow();

  // create markers for each place and add to places array
  addMarkers();

  vm = new ViewModel();
  ko.applyBindings(vm);
}

/** PLACE OBJECT */

var Place = function(i) {
  this.title = places[i].title;
  this.location = places[i].location;
  this.id = i;
  this.marker = places[i].marker;  // not allowed to be KO observable
  this.showMe = ko.observable(true);
  this.yelp_id = places[i].yelp_id;
  this.keywords = places[i].keywords;
  this.infowindow = basicInfowindow;
};

/** VIEW MODEL */

var ViewModel = function() {
  "use strict";
  var self = this;

  // Create an observableArray of places
  self.placeList = ko.observableArray();
  // Create an observableArray of business types (for dropdown)
  self.businessList = ko.observableArray([
    'Bar', 'Restaurant', 'Coffee & Tea', 'Grocery store', 'Tattoo parlor'
  ]);
  // Create an observableArray of keywords (for dropdown)
  self.keywordList = ko.observableArray([
    'Food', 'Drink', 'Music'
  ]);

  // Fill placeList array with new Place objects
  for (var i = 0; i < places.length; i++) {
    // create new instance of Place object & add to placeList array
    self.placeList.push(new Place(i));
  }

  self.clearClickedMarkers = function() {
    var len = self.placeList().length;
    for (var i = 0; i < len; i++) {
      self.placeList()[i].marker.setIcon(defaultIcon);
    }
  };

  self.makeListInfowindow = function(place) {
    self.clearClickedMarkers();
    showInfoWindow(place.marker, place.yelp_id, place.infowindow);
    place.marker.clicked = true;
    place.marker.setIcon(clickedIcon);
  };

};