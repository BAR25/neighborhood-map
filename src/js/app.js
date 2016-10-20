// Create a styles array for map
var styles = [
  {
    "featureType": "administrative",
    "elementType": "labels.text.fill",
    "stylers": [
      {"color": "#6195a0"}
    ]
  },{
    "featureType": "administrative.province",
    "elementType": "geometry.stroke",
    "stylers": [
      {"visibility": "off"}
    ]
  },{
    "featureType": "landscape",
    "elementType": "geometry",
    "stylers": [
      {"lightness": "0"},
      {"saturation": "0"},
      {"color": "#f5f5f2"},
      {"gamma": "1"}
    ]
  },{
    "featureType": "landscape.man_made",
    "elementType": "all",
    "stylers": [
      {"lightness": "-3"},
      {"gamma": "1.00"}
    ]
  },{
    "featureType": "landscape.natural.terrain",
    "elementType": "all",
    "stylers": [
      {"visibility": "off"}
    ]
  },{
    "featureType": "poi",
    "elementType": "all",
    "stylers": [
      {"visibility": "off"}
    ]
  },{
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {"color": "#bae5ce"},
      {"visibility": "on"}
    ]
  },{
    "featureType": "road",
    "elementType": "all",
    "stylers": [
      {"saturation": -100},
      {"lightness": 45},
      {"visibility": "simplified"}
    ]
  },{
    "featureType": "road.highway",
    "elementType": "all",
    "stylers": [
      {"visibility": "simplified"}
    ]
  },{
    "featureType": "road.highway",
    "elementType": "geometry.fill",
    "stylers": [
      {"color": "#fac9a9"},
      {"visibility": "simplified"}
    ]
  },{
    "featureType": "road.highway",
    "elementType": "labels.text",
    "stylers": [
      {"color": "#4e4e4e"}
    ]
  },{
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {"color": "#787878"}
    ]
  },{
    "featureType": "road.arterial",
    "elementType": "labels.icon",
    "stylers": [
      {"visibility": "off"}
    ]
  },{
    "featureType": "transit",
    "elementType": "all",
    "stylers": [
      {"visibility": "simplified"}
    ]
  },{
    "featureType": "transit.station.airport",
    "elementType": "labels.icon",
    "stylers": [
      {"hue": "#0a00ff"},
      {"saturation": "-77"},
      {"gamma": "0.57"},
      {"lightness": "0"}
    ]
  },{
    "featureType": "transit.station.rail",
    "elementType": "labels.text.fill",
    "stylers": [
      {"color": "#43321e"}
    ]
  },{
    "featureType": "transit.station.rail",
    "elementType": "labels.icon",
    "stylers": [
      {"hue": "#ff6c00"},
      {"lightness": "4"},
      {"gamma": "0.75"},
      {"saturation": "-68"}
    ]
  },{
    "featureType": "water",
    "elementType": "all",
    "stylers": [
      {"color": "#eaf6f8"},
      {"visibility": "on"}
    ]
  },{
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {"color": "#c7eced"}
    ]
  },{
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {"lightness": "-49"},
      {"saturation": "-53"},
      {"gamma": "0.79"}
    ]
  }
];

var map;

// Create empty marker array
var markers = [];

// Create a place array
var places = [
  {title: 'New Seasons Market', location: {lat: 45.5480584, lng: -122.6666864}},
  {title: 'Sidebar', location: {lat: 45.5510076, lng: -122.667037}},
  {title: 'Ristretto Roasters', location: {lat: 45.55028919999999, lng: -122.6663747}},
  {title: 'The Box Social', location: {lat: 45.5480584, lng: -122.6666864}},
  {title: 'The Peoples Pig', location: {lat: 45.546385, lng: -122.6668808}},
  {title: 'The Waypost', location: {lat: 45.5457645, lng: -122.66648020000002}},
  {title: 'Grizzly Tattoo', location: {lat: 45.551458, lng: -122.66696100000001}},
  {title: 'Tasty n Sons', location: {lat: 45.55028919999999, lng: -122.6663747}},
];

// This function initializes the map
function initMap() {
  // Create a new map instance
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 45.54800100000001, lng: -122.66575999999998},
    zoom: 15,
    styles: styles,
    mapTypeControl: false
  });

  createMarkersArray();
  showMarkers();
}

initMap();

var ViewModel = function() {
  var self = this;
  console.log("ViewModel initiated");
  // Create an observableArray of places (for the list?)
  // this.placeList = ko.observableArray([]);

  // Observable for input

  // this.markerArray = createMarkersArray();
  // this.showMarkers = showMarkers();




  // Track click events on list items

};

// this allows the bindings to be applied
ko.applyBindings(new ViewModel());

// style basic marker icon
var defaultIcon = makeMarkerIcon('a82848');

// create a 'highlighted' marker for mouseovers
var highlightedIcon = makeMarkerIcon('ed4b74');

// Use places array to create an array of markers
function createMarkersArray() {
  for (var i = 0; i < places.length; i++) {
    console.log("Marker created: " + i);
    // get positions from location array
    var position = places[i].location;
    var title = places[i].title;
    // create one marker per location & put into markers array
    var marker = new google.maps.Marker({
      position: position,
      title: title,
      animation: google.maps.Animation.DROP,
      icon: defaultIcon,
      id: i
    });
    // push the marker into array of markers
    markers.push(marker);
    // create an onclick event to open an infowindow at each marker
    // marker.addListener('click', function() {
    //   populateInfoWindow(this, largeInfowindow);  // `this` is the clicked marker
    // });
    // add mouseover and mouseout event listeners, to change color
    // back and forth
    marker.addListener('mouseover', function() {
      this.setIcon(highlightedIcon);
    });
    marker.addListener('mouseout', function() {
      this.setIcon(defaultIcon);
    });
  }
}

// Create a new marker with the passed in color
function makeMarkerIcon(markerColor) {
  var markerImage = new google.maps.MarkerImage(
    'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
    '|40|_|%E2%80%A2',
    new google.maps.Size(21, 34),
    new google.maps.Point(0, 0),
    new google.maps.Point(10, 34),
    new google.maps.Size(21,34));
  return markerImage;
}

// Loop through the markers array and display all
function showMarkers() {
  console.log("showMarkers called");
  // create a new LatLngBounds instance, which captures the SW & NE corners of viewport
  var bounds = new google.maps.LatLngBounds();
  // extend the boundaries of the map for each marker & display the marker
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
    bounds.extend(markers[i].position);
  }
  map.fitBounds(bounds);  // tell the map to fit itself to those bounds
}

// Loop through the passed in markers and hide all
function hideMarkers(markers) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);  // doesn't delete marker, just hides it
  }
}
