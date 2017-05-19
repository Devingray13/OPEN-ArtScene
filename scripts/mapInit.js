var map;
function initMap() {
    var denver = {
        lat: 39.7392,
        lng: -104.9903
    };

    var myOptions = {
        zoom: 13,
        center: denver,
        styles: styleJSON,
        disableDefaultUI: true,
        gestureHandling: 'none',
        scrollwheel: false,
        disableDoubleClickZoom: true,
        backgroundColor: 'hsla(0, 0%, 0%, 0)'
    }

    map = new google.maps.Map(document.getElementById('map'), myOptions)

    google.maps.event.addDomListener(window, "resize", function() {
        let center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center);
    })
}



var styleJSON =
// [{
//         "stylers": [{
//             "color": "#f6fff9"
//         }]
//     },
//     {
//         "elementType": "geometry.fill",
//         "stylers": [{
//             "visibility": "off"
//
//         }]
//     },
//     {
//         "elementType": "labels.text.fill",
//         "stylers": [{
//             "color": "#d30000"
//         }]
//     },
//     {
//         "featureType": "administrative",
//         "elementType": "geometry",
//         "stylers": [{
//             "visibility": "off"
//         }]
//     },
//     {
//         "featureType": "administrative.land_parcel",
//         "elementType": "labels",
//         "stylers": [{
//             "visibility": "off"
//         }]
//     },
//     {
//         "featureType": "poi",
//         "stylers": [{
//             "visibility": "off"
//         }]
//     },
//     {
//         "featureType": "poi",
//         "elementType": "labels.text",
//         "stylers": [{
//             "visibility": "off"
//         }]
//     },
//     {
//         "featureType": "road",
//         "elementType": "geometry.fill",
//         "stylers": [{
//             "color": "#d30000"
//         }]
//     },
//     {
//         "featureType": "road",
//         "elementType": "labels.icon",
//         "stylers": [{
//             "visibility": "off"
//         }]
//     },
//     {
//         "featureType": "road.local",
//         "elementType": "labels",
//         "stylers": [{
//             "visibility": "off"
//         }]
//     },
//     {
//         "featureType": "transit",
//         "stylers": [{
//             "visibility": "off"
//         }]
//     }
// ]
[
  {
    "elementType": "geometry.fill",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ac0b08"
      },
      {
        "lightness": -5
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#ff0000"
      },
      {
        "visibility": "off"
      },
      {
        "weight": 0.5
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.neighborhood",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "stylers": [
      {
        "visibility": "simplified"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#f9fff6"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ff0000"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "simplified"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#f9fff6"
      },
      {
        "weight": 1
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#f9fff6"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#f9fff6"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }
]
