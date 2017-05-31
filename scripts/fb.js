$(fbReady)

function fbReady() {

    let fbID
    if (window.location.hostname === 'localhost'){
        fbID = 1827510060909059
    } else {
        fbID = 1931532333798494
    }

// FB API SDK init
    $.ajaxSetup({
        cache: true
    });
    $.getScript('https://connect.facebook.net/en_US/sdk.js', function() {
        FB.init({
            appId: fbID,
            version: 'v2.7',
            cookie: true,
            xfbml: true,
            oauth: true
        })

        $('#loginbutton,#feedbutton').removeAttr('disabled');

        function statusChangeCallback(response) {
            $('.fb-login-button').click(function(response) {
            })

            if (response.status === 'connected') {
                let loginAccessToken = response.authResponse.accessToken
                $('#login-splash').hide()
                $('#actual-site').show()
                appReady()
                initMap()
                retrieveData()
                $('body').removeClass('loaded')
                $(window).load(loadBody())
            } else {
                $('#login-splash').show()
                $('#actual-site').hide()
                $('body').addClass('loaded')
            }
        }

        $('#login-button').click(function() {
            FB.login(statusChangeCallback, {
                scope: 'email,public_profile'
            });
        })

        $('#logout-button').click(function() {
            FB.logout(statusChangeCallback)
        })

        window.fbAsyncInit = function() {
            FB.init({
                appID: fbID,
                // appId: '1931532333798494',
                cookie: true,
                xfbml: true,
                version: 'v2.8',
                xfbml: true,
                oauth: true
            })

            FB.getLoginStatus(function(response) {
                statusChangeCallback(response);
            })
        }

        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = `//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.9&appId=${fbID}`;
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    })

// gallery ID data JSON
    let pageIds = {
        "Art Gym Denver": "1435232676788138",
        "Black Cube Nomadic Museum": "564675637004520",
        "Boulder Museum of Contemporary Art": "174818304541",
        "Colorado Photographic Arts Center": "72034201289",
        "Center for Visual Arts": "95790498004",
        "Dairy Arts Center": "104045376587",
        "Dateline Gallery": "196138007244022",
        "David B. Smith Gallery": "223413964339162",
        "Denver Art Museum": "87396029335",
        "Dikeou Collection": "124599026427",
        "Dikeou Pop-Up Colfax": "186101028145975",
        "Emmanuel Gallery": "120534618509",
        "Gildar Gallery": "243885759024525",
        "Leisure Gallery": "797205120396980",
        "Leon Gallery": "237079739662676",
        "Museum of Contemporary Art Denver": "110733782291",
        "PlatteForum": "41502086006",
        "Redline Contemporary Art Center": "236308826713139",
        "Robischon Gallery": "136044893696",
        "Rule Gallery": "122965617008",
        "Vicki Myhren Gallery": "171767208758"
    }

// initialize /g variables
    let eventObjects = {}
    let count = 0
    let allPages = []
    let eventArray = []
    let gallery
    let eventDate
    let mapIcon
    let galleryObj
    let eventLocation = {}
    let eventMapMarker
    let eventName
    let upcomingElement
    let eventDay0
    let eventDayCal
    let eventEndDay
    let dateSortEvents = []
    let markerArray = [];
    let eventGalleryIDRelation

// initialize time reference
    let today = new Date()
    today.setHours(0, 0, 0, 0)
    today = moment(today)

//FB API SDK GET requests / custom promises
    function retrieveData() {
        $.each(pageIds, function(page, id) {
            const promise1 = new Promise(function(resolve, reject) {
                FB.api(
                    "/" + id + "?fields=id,about,cover,description,location,mission,name,website",
                    function(response) {
                        resolve(response)
                    }
                )
            })

            const promise2 = new Promise(function(resolve, reject) {
                FB.api(
                    "/" + id + "/events?fields=owner,name,id,cover,description,place,start_time,end_time",
                    function(events) {
                        resolve(events.data)
                    })
            })

            const pagePromise = Promise.all([promise1, promise2]);
            allPages.push(pagePromise)
        })

        Promise.all(allPages).then(function(galleryWithEvents) {
            filterCurrentEvents(galleryWithEvents)
        })

//start organizing data
        function filterCurrentEvents(galleryWithEvents) {
            $.each(galleryWithEvents, function(eachGallery) {
                eventArray = eventArray.concat(galleryWithEvents[eachGallery][1])
                gallery = galleryWithEvents[eachGallery][0].name
                galleryObj = galleryWithEvents[eachGallery][0]

//dynamically generate list of galleries with info
                $('.galleries-list').append(`<li class="focusable individual-gallery">
                    <div class="collapsible-header" > ${gallery} </div>
                    <div class="collapsible-body">
                        <ul id="${gallery}" class="collapsible popout" data-collapsible="accordion">
                        <li class="upcoming-info-body">
                            <div class="gallery-info" style="white-space:pre-wrap;"><img class="gallery-img" src="${galleryObj.cover.source}"><br> ${galleryObj.about}<hr><span style="color:#2196f3;">${galleryObj.location.street}<span><hr><a href="${galleryObj.website}" style="color:yellow;">website</a></div><br>
                        </li>
                        </ul>
                    </div>
                </li>`)
            })

            appendEvents()

//sort chronologically
            function appendEvents() {
                eventArray.sort(function(a, b) {
                    return rawNumbers(a.start_time) - rawNumbers(b.start_time)
                })
                function rawNumbers(x) {
                    return x.replace(/[^0-9]/g, '')
                }

//initialize event-specific time references and backup location reference
                $.each(eventArray, function(event) {
                    let eachEvent = eventArray[event]
                    eventName = eachEvent.name
                    eventDate = moment(eachEvent.start_time)
                    eventDay0 = moment(eachEvent.start_time)
                    eventDayCal = eventDate.format('LLL')
                    eventDay0.set({
                        hour: 0,
                        minute: 0,
                        second: 0,
                        millisecond: 0
                    })

                    eventArray[event].eventGalleryLocation = galleryObj.location

//dynamically generate list of current events
                    if (eventDay0.isSame(today)) {
                        $('.daily-events').append(`<li class="daily-li focusable">
                            <div id="${eachEvent.id}" class="card">
                              <div class="card-image waves-effect waves-block waves-light">
                                <img class="activator" src="${eachEvent.cover.source}">
                              </div>
                              <div class="card-content">
                                <span class="card-title activator grey-text text-darken-4">${eventName}<i class="material-icons right">more_vert</i></span>
                              </div>
                              <div class="card-reveal">
                                <span class="card-title grey-text text-darken-4">${eventName} (${eachEvent.place.name })<i class="material-icons right">close</i></span>
                                <p style="white-space:pre-wrap;"><span style="color:#2196f3;">${eventDayCal}<br>${eachEvent.owner.name}</span><hr>${eachEvent.description}<hr><img class="activator gallery-img" src="${eachEvent.cover.source}" ></p>
                              </div>
                            </div>
                            </li>`)

//if there are events, hide 'no events' alert, export location data to maps API
                        if ($('.daily-li').size() > 0) {
                            $('#no-events').hide()
                        }

                        mapIcon = 'images/yellow_MarkerT.png'
                        doDaMapThang(eachEvent)

//dynamically generate list of future events, export location data
                    } else if (eventDay0.isAfter(today)) {
                        upcomingElement =
                        `<li>
                        <div class="collapsible-header upcoming-datetime focusable individual-upcoming" id="${eachEvent.id}"><span class="upcoming-list-time">${eventDayCal}</span> <span class="upcoming-list-title">${eventName}</span> <span class="upcoming-list-place"> ${eachEvent.place.name }</span></div>
                        <div class="collapsible-body upcoming-info-body " ><span class="upcoming-info" style="white-space:pre-wrap;">${eachEvent.description}<br>
                        <hr><img class="activator gallery-img" src="${eachEvent.cover.source}"></span></div>
                        </li>`
                        $('.upcoming-events').append(upcomingElement)

                        mapIcon = 'images/blue_MarkerU.png'
                        doDaMapThang(eachEvent)

                    }
                })
            }

//interpret location data with maps API
            function doDaMapThang(eachEvent) {
                // console.log(eachEvent)
                mapEvents(eachEvent)
            }
            function getEventLocation(eachEvent) {
                if (eachEvent.place.hasOwnProperty('location')) {
                    return {
                        'lat': eachEvent.place.location.latitude,
                        'lng': eachEvent.place.location.longitude
                    }
                } else {
                    return {
                        'lat': eachEvent.eventGalleryLocation.latitude,
                        'lng': eachEvent.eventGalleryLocation.longitude
                    }
                }
            }

//plot events on map with info reference, set interaction parameters
            let infowindow = new google.maps.InfoWindow();
            function mapEvents(eachEvent) {
                let eventLocation = getEventLocation(eachEvent)
                var mapMarker = new google.maps.Marker({
                    position: eventLocation,
                    map: map,
                    icon: mapIcon,
                    name: eachEvent.name,
                    id: eachEvent.id,
                    image: eachEvent.cover.source,
                    animation: google.maps.Animation.DROP,
                    zIndex: 3
                })
                let linkVar = `<a href="#${mapMarker.id}"><img src="${mapMarker.image}" class="info-window-img"><br>${mapMarker.name}</a>`

                mapMarker.addListener('click', function() {
                    infowindow.setContent(linkVar)
                    infowindow.open(map, mapMarker)
                    map.setCenter(denver)
                })
                map.addListener('click', function() {
                    infowindow.close(map, mapMarker)
                    map.setCenter(denver)
                })
                map.addListener('mouseout', function() {
                    infowindow.close(map, mapMarker)
                    map.setCenter(denver)
                })
                if (mapMarker.icon === 'images/yellow_MarkerT.png') {
                    mapMarker.zIndex = 4
                }
                if (mapMarker.icon === 'images/red_MarkerP.png') {
                    mapMarker.zIndex = 2
                }
            }
        }
    }
}
