/** STYLES ARRAY FOR MAP */

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

/** PLACES ARRAY */

var places = [
  {title: 'New Seasons Market', location: {lat: 45.5480584, lng: -122.6666864}, yelp_id: 'new-seasons-market-portland-12',
    keywords: ['Grocery store', 'Food', 'Drink']},
  {title: 'Lompoc Sidebar', location: {lat: 45.5510076, lng: -122.667037}, yelp_id: 'lompoc-sidebar-portland-2',
    keywords: ['Bar', 'Food', 'Drink']},
  {title: 'Ristretto Roasters', location: {lat: 45.55028919999999, lng: -122.6663747}, yelp_id: 'ristretto-roasters-portland-3',
    keywords: ['Coffee & Tea']},
  {title: 'The Box Social', location: {lat: 45.5480584, lng: -122.6666864}, yelp_id: 'the-box-social-portland',
    keywords: ['Bar', 'Food', 'Drink']},
  {title: 'The Peoples Pig', location: {lat: 45.546385, lng: -122.6668808}, yelp_id: 'peoples-pig-portland',
    keywords: ['Restaurant', 'Food', 'Drink']},
  {title: 'The Waypost', location: {lat: 45.5457645, lng: -122.66648020000002}, yelp_id: 'the-waypost-portland',
    keywords: ['Bar', 'Food', 'Drink', 'Music']},
  {title: 'Grizzly Tattoo', location: {lat: 45.551458, lng: -122.66696100000001}, yelp_id: 'grizzly-tattoo-portland',
    keywords: ['Tattoo parlor']},
  {title: 'Tasty n Sons', location: {lat: 45.55028919999999, lng: -122.6663747}, yelp_id: 'tasty-n-sons-portland',
    keywords: ['Restaurant', 'Food', 'Drink']},
];

/** GLOBAL VARIABLES */

var map, vm, bounds, defaultIcon, highlightedIcon, clickedIcon, basicInfowindow;

/** GLOBAL FUNCTIONS */

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
    var yelp = places[i].yelp_id;

    var marker = new google.maps.Marker({
      position: position,
      title: title,
      animation: google.maps.Animation.DROP,
      icon: defaultIcon,
      id: i,
      map: map
    });

    bounds.extend(marker.position);

    marker.id = i;
    marker.clicked = false;
    marker.yelp = yelp;

    // create an onclick event to open an infowindow at each marker
    marker.addListener('click', function() {
      this.clicked = true;  // `this` is the clicked marker
      this.setIcon(clickedIcon);
      showInfoWindow(this, this.yelp, basicInfowindow);
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

    places[i].marker = marker;
  }
  map.fitBounds(bounds);
}

// Create & show infowindow for marker
function showInfoWindow(marker, yelp_id, infowindow) {
  infowindow.addListener('closeclick', function() {
    marker.clicked = false;
    marker.setIcon(defaultIcon);
  });

  // Populate the marker's infowindow with data from Yelp
  getYelpData(marker, yelp_id, infowindow);
}

// Toggle visibility of list items & markers according to filter
function filterPlaces(data) {
  var list = vm.placeList();
  // iterate through placeList and check if filter choice matches a keyword
  for (var i = 0; i < list.length; i++) {
    var found = (list[i].keywords.indexOf(data) > -1);
    if (found) {
      list[i].showMe(true);  // show list item
      list[i].marker.setVisible(true);  // show corresponding marker
    } else {
      list[i].showMe(false);  // hide list item
      list[i].marker.setVisible(false);  // hide marker
    }
  }
}

// Reset list items & markers
function showFullList() {
  var list = vm.placeList();
  // iterate through placeList and show all
  for (var i = 0; i < list.length; i++) {
      list[i].showMe(true);
      list[i].marker.setVisible(true);
  }
}

// Create a basic error div template
function createErrorDiv(text) {
  var errorDiv = document.createElement('div');
  errorDiv.classList.add('alert');
  errorDiv.classList.add('alert-danger');
  errorDiv.style.margin = '20px';
  errorDiv.innerHTML = text;
  return errorDiv;
}

// Show an error message if Google has not loaded
function googleError() {
  var text = 'Many apologies... it appears Google has not loaded.';
  var list = document.getElementById('place-list');
  list.appendChild(createErrorDiv(text));
}

// Show an error message if Yelp has not loaded
function yelpError() {
  var text = "Oh no! We're unable to reach Yelp...";
  var mapDiv = document.getElementById('mapDiv');
  var map = document.getElementById('map');
  var yelpErr = createErrorDiv(text);
  mapDiv.insertBefore(yelpErr, map);
}

/** NOTE: the following OAuth code is largely based on @MarkN's implementation,
with customized usage of result data */

// Generate random number & return as string for OAuth
function nonceGenerate() {
  return (Math.floor(Math.random() * 1e12).toString());
}

// Get Yelp data through a JSONP request (with appropriate key, token, & secrets)
function getYelpData(marker, yelp_id, infowindow) {
  var YELP_BASE_URL = 'https://api.yelp.com/v2/';
  var CONSUMER_KEY = '4JVdSu5Pu8JrqsjFucDq2w';
  var CONSUMER_TOKEN = 'bvyZyuexy41XduOQLolQ15nH244_f9Ko';
  var CONSUMER_SECRET = '27txGjT7RBW5WbPgpqJhl8GFH9U';
  var TOKEN_SECRET = '6LJy8jxTTbA1eXMvbJMZju3DfvI';

  var yelp_url = YELP_BASE_URL + 'business/' + yelp_id;
  var parameters = {
    oauth_consumer_key: CONSUMER_KEY,
    oauth_token: CONSUMER_TOKEN,
    oauth_nonce: nonceGenerate(),
    oauth_timestamp: Math.floor(Date.now()/1000),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_version: '1.0',
    callback: 'cb'
  };

  var encodedSignature = oauthSignature.generate('GET', yelp_url, parameters, CONSUMER_SECRET, TOKEN_SECRET);
  parameters.oauth_signature = encodedSignature;

  var settings = {
    url: yelp_url,
    data: parameters,
    cache: true,
    callback: yelp_url,
    dataType: 'jsonp',
    callback: 'cb',
    success: function(results) {
      var innerHTML = '<div class="yelp">';
      // check if each result exists before adding it to the div
      if (results.name) {
        innerHTML += '<h5>' + results.name + '</h5>';
      }
      if (results.location) {
        innerHTML += '<p>' + results.location.address + '<br>' + results.location.city +
        ', ' + results.location.state_code + '  ' + results.location.postal_code;
      }
      if (results.display_phone) {
        innerHTML += '<br>' + results.display_phone + '</p>';
      }
      if (results.rating_img_url) {
        innerHTML += '<img class="rating-img" src="' + results.rating_img_url + '">';
      }
      if (results.image_url) {
        innerHTML += '<img class="yelp-img" src="' + results.image_url + '">';
      }
      if (results.reviews[0].excerpt) {
        innerHTML += '<h5>Yelp reviewer ' + results.reviews[0].user.name +
        ' says...</h5><p class="review">' + results.reviews[0].excerpt + '</p>';
      }
      innerHTML += '<a href="' + results.url + '">View on Yelp</a>' + '</div>';
      infowindow.setContent(innerHTML);
      infowindow.open(map, marker);
    },
    // TODO: need to fix this to return more specific error message
    error: function() {
      yelpError();
    }
  };

  $.jsonp(settings);
}