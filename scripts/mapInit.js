


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
            scrollwheel: false
        }

        map = new google.maps.Map(document.getElementById('map'), myOptions)

        google.maps.event.addDomListener(window, "resize", function() {
            let center = map.getCenter();
            google.maps.event.trigger(map, "resize");
            map.setCenter(center);
        })

        // var marker = new google.maps.Marker({
        //     position: denver,
        //     map: map
        //
        // })
    }

    var styleJSON = [{
            "elementType": "geometry",
            "stylers": [{
                "color": "#f5f5f5"
            }]
        },
        {
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#ffeb3b"
            }]
        },
        {
            "elementType": "geometry.stroke",
            "stylers": [{
                    "color": "#ff0000"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "elementType": "labels",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "elementType": "labels.text",
            "stylers": [{
                    "color": "#3561f3"
                },
                {
                    "saturation": -5
                },
                {
                    "lightness": 85
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "elementType": "labels.text.fill",
            "stylers": [{
                    "color": "#170403"
                },
                {
                    "saturation": 100
                },
                {
                    "visibility": "on"
                },
                {
                    "weight": 1
                }
            ]
        },
        {
            "featureType": "administrative.land_parcel",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#bdbdbd"
            }]
        },
        {
            "featureType": "administrative.neighborhood",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#ffe539"
            }]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [{
                "color": "#eeeeee"
            }]
        },
        {
            "featureType": "poi",
            "elementType": "geometry.fill",
            "stylers": [{
                "visibility": "simplified"
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
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#757575"
            }]
        },
        {
            "featureType": "poi.business",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "road",
            "stylers": [{
                    "lightness": 15
                },
                {
                    "visibility": "on"
                },
                {
                    "weight": 0.5
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [{
                "color": "#ffaaa3"
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
            "featureType": "road",
            "elementType": "labels.text",
            "stylers": [{
                    "color": "#cd002d"
                },
                {
                    "lightness": 25
                },
                {
                    "weight": 0.5
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.stroke",
            "stylers": [{
                    "color": "#4053ff"
                },
                {
                    "weight": 0.5
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#ff0000"
            }]
        },
        {
            "featureType": "transit",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [{
                "color": "#e5e5e5"
            }]
        },
        {
            "featureType": "transit.station",
            "elementType": "geometry",
            "stylers": [{
                "color": "#eeeeee"
            }]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{
                "color": "#c9c9c9"
            }]
        },
        {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#75aef0"
            }]
        }
    ]
