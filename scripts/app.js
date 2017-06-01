// load page
let loadBody =()=>{
    $('body').addClass('loaded')
},
    loadIt = () => {
        setTimeout(loadBody, 500)
}

$('body').load(loadBody)

// main app
let appReady = () => {

// set date
    let today = new Date()
    today.setHours(0, 0, 0, 0)
    today = moment(today)

// materialize presets
    $('.button-collapse').sideNav();
    $('.tap-target').tapTarget('open');
    $('.tap-target').tapTarget('close');
    $('.parallax').parallax();

//FB API SDK GET requests / custom promises
    let crunchData = (() => {
        let allPages =[]
        for(let page in pageIds){
            let id = pageIds[page]
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
        }
        Promise.all(allPages).then(function(galleryWithEvents) {
            filterCurrentEvents(galleryWithEvents)
        })

//start organizing data
        let filterCurrentEvents = (galleryWithEvents) => {
            let eventArray = [],
                galleryObj
            for(let eachGallery in galleryWithEvents){
                eventArray = eventArray.concat(galleryWithEvents[eachGallery][1])
                galleryObj = galleryWithEvents[eachGallery][0]
                let gallery = galleryObj.name

//dynamically generate list of galleries with info
                $('.galleries-list').append(`<li class="focusable individual-gallery">
                    <div class="collapsible-header">
                        <i class="material-icons right">more_vert</i>${gallery}
                    </div>
                    <div class="collapsible-body">
                        <ul id="${gallery}" class="collapsible popout" data-collapsible="accordion">
                        <li class="upcoming-info-body">
                            <div class="gallery-info" style="white-space:pre-wrap;"><img class="gallery-img" src="${galleryObj.cover.source}"><br> ${galleryObj.about}<hr><span style="color:#2196f3;">${galleryObj.location.street}<span><hr><a href="${galleryObj.website}" style="color:yellow;">website</a></div><br>
                        </li>
                        </ul>
                    </div>
                </li>`)
            }

//interpret location data with maps API
            let getEventLocation = (eachEvent) => {
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
            let infowindow = new google.maps.InfoWindow(),
                mapEvents = (eachEvent) => {
                    let eventLocation = getEventLocation(eachEvent),
                        mapMarker = new google.maps.Marker({
                            position: eventLocation,
                            map: map,
                            icon: mapIcon,
                            name: eachEvent.name,
                            id: eachEvent.id,
                            image: eachEvent.cover.source,
                            animation: google.maps.Animation.DROP,
                            zIndex: 3
                        }),
                        linkVar = `<a href="#${mapMarker.id}"><img src="${mapMarker.image}" class="info-window-img"><br>${mapMarker.name}</a>`,
                        addMapInteraction =(()=>{
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
                        })()
                }
            let doDaMapThang = (eachEvent) => {
                let mapIcon
                mapEvents(eachEvent)
            }

//sort chronologically and append events
            let appendEvents = (() => {
                let rawNumbers = (x) => x.replace(/[^0-9]/g, '')
                eventArray.sort(function(a, b) {
                    return rawNumbers(a.start_time) - rawNumbers(b.start_time)
                })

//initialize event-specific time references and backup location reference
                for(let event of eventArray) {
                    let eachEvent = event,
                        eventName = eachEvent.name,
                        eventDescription = eachEvent.description,
                        eventDayCal = moment(eachEvent.start_time).format('LLL'),
                        eventDay0 = moment(eachEvent.start_time)
                        eventDay0.set({
                            hour: 0,
                            minute: 0,
                            second: 0,
                            millisecond: 0
                        })

                    event.eventGalleryLocation = galleryObj.location

//dynamically generate list of current events, plot events on map
                    if (eventDay0.isSame(today)) {
                        let todayElement=
                        `<li class="daily-li focusable">
                            <div id="${eachEvent.id}" class="card">
                              <div class="card-image waves-effect waves-block waves-light">
                                <img class="activator" src="${eachEvent.cover.source}">
                              </div>
                              <div class="card-content">
                                <span class="card-title activator grey-text text-darken-4">${eventName}<i class="material-icons right">more_vert</i></span>
                              </div>
                              <div class="card-reveal">
                                <span class="card-title grey-text text-darken-4">${eventName} (${eachEvent.place.name})<i class="material-icons right">close</i></span>
                                <p>
                                    <span style="color:#2196f3;"> ${eventDayCal}<br>${eachEvent.owner.name}</span>
                                    <hr><span style="white-space:pre-wrap;"> ${eventDescription}</span><hr>
                                    <img class="activator gallery-img" src="${eachEvent.cover.source}">
                                </p>
                              </div>
                            </div>
                        </li>`
                        $('.daily-events').append(todayElement)

                        mapIcon = 'images/yellow_MarkerT.png'
                        doDaMapThang(eachEvent)


//if there are events, hide 'no events' alert
                        if ($('.daily-li').size() > 0) {
                            $('#no-events').hide()
                        }

//dynamically generate list of future events, plot on map
                    } else if (eventDay0.isAfter(today)) {
                        let upcomingElement =
                        `<li>
                            <div class="collapsible-header upcoming-datetime focusable individual-upcoming" id="${eachEvent.id}">
                                <i class="material-icons right">more_vert</i>
                                <span class="upcoming-list-time">${eventDayCal}</span>
                                <span class="upcoming-list-title">${eventName}</span>
                                <span class="upcoming-list-place">${eachEvent.place.name}</span>
                            </div>
                            <div class="collapsible-body upcoming-info-body">
                                <span class="upcoming-info" style="white-space:pre-wrap;"> ${eventDescription}
                                    <br>
                                    <hr>
                                    <img class="activator gallery-img" src="${eachEvent.cover.source}">
                                </span>
                            </div>
                        </li>`
                        $('.upcoming-events').append(upcomingElement)

                        mapIcon = 'images/blue_MarkerU.png'
                        doDaMapThang(eachEvent)
                    }
                }
            })()
        }
    })()
}
