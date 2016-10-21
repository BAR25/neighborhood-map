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
var bounds;
var defaultIcon;
var highlightedIcon;
var clickedIcon;
var basicInfowindow;

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

// This function initializes the map as a callback function for Google Maps API script
function initMap() {
  // Create a new map instance
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 45.54800100000001, lng: -122.66575999999998},
    zoom: 15,
    styles: styles,
    mapTypeControl: false
  });

  defaultIcon = makeMarkerIcon('a82848');
  highlightedIcon = makeMarkerIcon('ed4b74');
  clickedIcon = makeMarkerIcon('f79336');
  // get initial boundaries of map
  bounds = new google.maps.LatLngBounds();
  basicInfowindow = new google.maps.InfoWindow();

  // create markers for each place and add to places array
  addMarkers();

}

var Place = function(i) {
  this.title = ko.observable(places[i].title);
  this.location = ko.observable(places[i].location);
  this.marker = places[i].marker;  // not allowed to be KO observable
  this.showMe = ko.observable(true);
};

var ViewModel = function() {
  var self = this;

  // Create an observableArray of places
  this.placeList = ko.observableArray();
  this.input = ko.observable();

  // Fill placeList array with new Place objects
  for (var i = 0; i < places.length; i++) {
    // create new instance of Place object & add to placeList array
    self.placeList.push(new Place(i));
  }

  this.filterPlaces = function() {
    console.log("filterPlaces function called");
    // need to fill in
  };

  // Track click events on list items

};

var vm = new ViewModel();

ko.applyBindings(vm);


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

// Use places array to create an array of markers
function addMarkers() {
  for (var i = 0; i < places.length; i++) {
    var position = places[i].location;
    var title = places[i].title;
    var marker = new google.maps.Marker({
      position: position,
      title: title,
      animation: google.maps.Animation.DROP,
      icon: defaultIcon,
      id: i,
      map: map
    });

    places[i].marker = marker;
    places[i].marker.clicked = false;
    // extend boundaries of map to fit marker
    // bounds.extend(position);

    // create an onclick event to open an infowindow at each marker
    marker.addListener('click', function() {
      this.clicked = true;
      this.setIcon(clickedIcon);  // `this` is the clicked marker
      showInfoWindow(this, basicInfowindow);
    });

    marker.addListener('mouseover', function() {
      if (!this.clicked) {  // only enable if marker is not clicked
        this.setIcon(highlightedIcon);
      }
    });
    marker.addListener('mouseout', function() {
      if (!this.clicked) {
        this.setIcon(defaultIcon);
      }
    });
  }
  // map.fitBounds(bounds);  // tell the map to fit itself to those bounds
}

// Loop through the passed in markers and hide all
function hideMarkers(markers) {
  for (var i = 0; i < places.length; i++) {
    places[i].marker.setMap(null);  // doesn't delete marker, just hides it
  }
}

// Create & show infowindow for marker
function showInfoWindow(marker) {
  var infowindow = basicInfowindow;
  // check to make sure this marker's infowindow is not already open
  if (infowindow.marker != marker) {
    // clear infowindow content (gives streetview time to load)
    infowindow.setContent('');
    infowindow.marker = marker;
    // make sure marker property is cleared if infowindow is closed
    infowindow.addListener('closeclick', function() {
      marker.clicked = false;
      marker.setIcon(defaultIcon);
      infowindow.marker = null;
    });

    var getYelpReview = function(data, status) {
      console.log("getYelpReview called");
      // need to fill in
      if (status == OK) {
        // do stuff
        infowindow.setContent('<div>' + marker.title + '</div><div id="yelp"></div>');
      } else {
        infowindow.setContent('<div>' + marker.title + '</div>' +
          '<div>No Yelp Reviews Found</div>');
      }
    };

    getYelpReview();

    // open infowindow on correct marker
    infowindow.open(map, marker);
  }
}

function makeInfoWindow(thing) {
  console.log("makeInfoWindow called");
  getPlaceDetails(thing, basicInfowindow);
}

function getPlaceDetails (marker, infowindow) {
  var service = new google.maps.places.PlacesService(map);
  service.getDetails({
    placeId: marker.id
  }, function(place, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      // set the marker property on this infowindow so it isn't created again
      infowindow.marker = marker;
      var innerHTML = '<div>';
      if (place.name) {
        innerHTML += '<strong>' + place.name + '</strong>';
      }
      if (place.formatted_address) {
        innerHTML += '<br>' + place.formatted_address;
      }
      if (place.formatted_phone_number) {
        innerHTML += '<br>' + place.formatted_phone_number;
      }
      if (place.opening_hours) {
        innerHTML += '<br><br><strong>Hours:</strong><br>' +
          place.opening_hours.weekday_text[0] + '<br>' +
          place.opening_hours.weekday_text[1] + '<br>' +
          place.opening_hours.weekday_text[2] + '<br>' +
          place.opening_hours.weekday_text[3] + '<br>' +
          place.opening_hours.weekday_text[4] + '<br>' +
          place.opening_hours.weekday_text[5] + '<br>' +
          place.opening_hours.weekday_text[6];
      }
      if (place.photos) {
        innerHTML += '<br><br><img src="' + place.photos[0].getUrl(
          {maxHeight: 100, maxWidth: 200}) + '">';
      }
      innerHTML += '</div>';
      infowindow.setContent(innerHTML);
      infowindow.open(map, marker);
      // make sure the marker property is cleared if the infowindow is closed
      infowindow.addListener('closeclick', function() {
        infowindow.marker = null;
      });
    }
  });
}

