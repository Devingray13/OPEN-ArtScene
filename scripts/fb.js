$(fbReady)



function fbReady() {
    $.ajaxSetup({
        cache: true
    });
    $.getScript('https://connect.facebook.net/en_US/sdk.js', function() {
        FB.init({
            appId: '1931532333798494',
            version: 'v2.7',
            cookie: true,
            xfbml: true,
            oauth:true
        })


        // FB.Event.subscribe('auth.statusChange', statusChangeCallback)

        $('#loginbutton,#feedbutton').removeAttr('disabled');




        function statusChangeCallback(response) {
            console.log('statusChangeCallback');
            console.log(response);
            $('.fb-login-button').click(function(response) {
                console.log(response)
            })

            if (response.status === 'connected') {
                let loginAccessToken = response.authResponse.accessToken
                console.log('success')
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
            console.log('okay')
            FB.login(statusChangeCallback, {
                scope: 'email,public_profile'
            });

        } )

        $('#logout-button').click(function() {
            console.log('okay')
            FB.logout(statusChangeCallback)

        } )


        window.fbAsyncInit = function() {
            FB.init({
                appId: '1931532333798494',
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
            js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.9&appId=1931532333798494";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    })



    let pageIds = {
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
    let dateSortEvents = []
    let markerArray = [];
    let eventGalleryIDRelation

    let today = new Date()
    today.setHours(0, 0, 0, 0)
    today = moment(today)
    console.log(today)



    function retrieveData() {

        $.each(pageIds, function(page, id) {
            // console.log(page, id)
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
            // console.log(galleryWithEvents)
            filterCurrentEvents(galleryWithEvents)
        })


        function filterCurrentEvents(galleryWithEvents) {


            $.each(galleryWithEvents, function(eachGallery) {
                eventArray = eventArray.concat(galleryWithEvents[eachGallery][1])
                console.log(galleryWithEvents[eachGallery][1])

                gallery = galleryWithEvents[eachGallery][0].name
                galleryObj = galleryWithEvents[eachGallery][0]


                // console.log(gallery)
                // console.log(galleryObj)
                // console.log(eventArray)
                $('.events-list').append(`<li>
                    <div class="collapsible-header" > ${gallery} </div>
                    <div class="collapsible-body">
                        <ul id="${gallery}" class="collapsible popout" data-collapsible="accordion">
                        <li class="upcoming-info-body">
                            <div class="gallery-info "><img class="gallery-img" src="${galleryObj.cover.source}"><br> ${galleryObj.about}<hr><span style="color:#2196f3;">${galleryObj.location.street}<span><hr><a href="${galleryObj.website}" style="color:yellow;">website</a></div><br>
                        </li>
                        </ul>
                    </div>
                </li>`)
            })

            appendEvents()

            function appendEvents() {
                console.log(eventArray)
                eventArray.sort(function(a, b) {
                    return rawNumbers(a.start_time) - rawNumbers(b.start_time)
                })
                console.log(eventArray[0])

                function rawNumbers(x) {
                    return x.replace(/[^0-9]/g, '')
                }
                $.each(eventArray, function(event) {
                    // console.log(eventArray[event])

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


                    if (eventDay0.isSame(today)) {
                        // console.log(eventDate)
                        // console.log(eachEvent)
                        // console.log(eventName)
                        // console.log($(`#${gallery}`))

                        $('.daily-events').append(`<li class="daily-li">
                            <div id="${eachEvent.id}" class="card">
                              <div class="card-image waves-effect waves-block waves-light">
                                <img class="activator" src="${eachEvent.cover.source}">
                              </div>
                              <div class="card-content">
                                <span class="card-title activator grey-text text-darken-4">${eventName}<i class="material-icons right">more_vert</i></span>
                              </div>
                              <div class="card-reveal">
                                <span class="card-title grey-text text-darken-4">${eventName} (${eachEvent.place.name })<i class="material-icons right">close</i></span>
                                <p>${eventDayCal}<br>${eachEvent.owner.name}<hr>${eachEvent.description}</p>
                              </div>
                            </div>
                            </li>`)

                        if ($('.daily-li').size() > 0) {
                            $('#no-events').hide()
                        }

                        mapIcon = 'images/yellow_MarkerT.png'
                        doDaMapThang(eachEvent)


                    } else if (eventDay0.isAfter(today)) {
                        upcomingElement = `<li>
                            <div class="collapsible-header upcoming-datetime" id="${eachEvent.id}"><span class="upcoming-list-time">${eventDayCal}</span> <span class="upcoming-list-title">${eventName}</span> <span class="upcoming-list-place"> ${eachEvent.place.name }</span></div>
                            <div class="collapsible-body upcoming-info-body " ><span class="upcoming-info">${eachEvent.description}<br>
                            <hr><img class="activator gallery-img" src="${eachEvent.cover.source}"></span></div>
                            </li>`

                        $('.upcoming-events').append(upcomingElement)
                        mapIcon = 'images/blue_MarkerU.png'
                        doDaMapThang(eachEvent)

                    }

                })
            }

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
                    // console.log('location: ', eventName, eventLocation)
                } else {
                    return {
                        'lat': eachEvent.eventGalleryLocation.latitude,
                        'lng': eachEvent.eventGalleryLocation.longitude
                    }
                }

            }

            function mapEvents(eachEvent) {
                let eventLocation = getEventLocation(eachEvent)
                // console.log(eachEvent.name)
                // console.log(eachEvent)
                var mapMarker = new google.maps.Marker({
                    position: eventLocation,
                    map: map,
                    icon: mapIcon,
                    name: eachEvent.name,
                    id: eachEvent.id,
                    image: eachEvent.cover.source,
                    zIndex: 3
                })

                // markerArray.push(mapMarker)

                let linkVar = `<a href="#${mapMarker.id}"><img src="${mapMarker.image}" class="info-window-img"><br>${mapMarker.name}</a>`

                let infowindow = new google.maps.InfoWindow({
                    content: linkVar
                });
                mapMarker.addListener('click', function() {
                    infowindow.open(map, mapMarker);
                })
                map.addListener('click', function() {
                    infowindow.close(map, mapMarker);
                })

                map.addListener('mouseout', function() {
                    infowindow.close(map, mapMarker);
                })

                if (mapMarker.icon === 'images/yellow_MarkerT.png') {
                    mapMarker.zIndex = 4
                }

                if (mapMarker.icon === 'images/red_MarkerP.png') {
                    mapMarker.zIndex = 2
                }
            }
            // console.log(markerArray)
            // $.each(markerArray, function(i) {
            //     console.log(markerArray[i])
            //
            // let linkVar = `<a href="#${markerArray[i].id}"><img src="${markerArray[i].image}" class="info-window-img"><br>${markerArray[i].name}</a>`
            //
            // let infowindow = new google.maps.InfoWindow({
            //     content: linkVar
            // });
            // markerArray[i].addListener('click', function() {
            //     infowindow.open(map, markerArray[i]);
            // })
            // map.addListener('click', function() {
            //     infowindow.close(map, markerArray[i]);
            // })
            // map.addListener('mouseout', function() {
            //     infowindow.close(map, markerArray[i]);
            // })
            // })

        }

    }
}
