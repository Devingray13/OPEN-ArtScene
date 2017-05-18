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
        disableDoubleClickZoom: true
    }

    map = new google.maps.Map(document.getElementById('map'), myOptions)

    google.maps.event.addDomListener(window, "resize", function() {
        let center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center);
    })
}

var styleJSON = [{
        "stylers": [{
            "color": "#f6fff9"
        }]
    },
    {
        "elementType": "geometry.fill",
        "stylers": [{
            "color": "#fafff8"
        }]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [{
            "color": "#002eff"
        }]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [{
            "visibility": "off"
        }]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "labels",
        "stylers": [{
            "visibility": "off"
        }]
    },
    {
        "featureType": "poi",
        "stylers": [{
            "visibility": "off"
        }]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text",
        "stylers": [{
            "visibility": "off"
        }]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [{
            "color": "#d30000"
        }]
    },
    {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [{
            "visibility": "off"
        }]
    },
    {
        "featureType": "road.local",
        "elementType": "labels",
        "stylers": [{
            "visibility": "off"
        }]
    },
    {
        "featureType": "transit",
        "stylers": [{
            "visibility": "off"
        }]
    }
]
