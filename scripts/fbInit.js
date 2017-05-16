$(fbReady)

function fbReady() {

    let loginAccessToken;

    let today = new Date()
    today.setHours(0, 0, 0, 0)
    console.log(today)



    $.ajaxSetup({
        cache: true
    });
    $.getScript('https://connect.facebook.net/en_US/sdk.js', function() {
        FB.init({
            appId: '1931532333798494',
            version: 'v2.7'
        });

        $('#loginbutton,#feedbutton').removeAttr('disabled');

        function statusChangeCallback(response) {
            console.log('statusChangeCallback');
            console.log(response);

            loginAccessToken = response.authResponse.accessToken
            if (response.status === 'connected') {
                console.log('success')
                retrieveData();
            } else {
                document.getElementById('status').innerHTML = 'Please log ' +
                    'into this app.';
            }
        }

        function checkLoginState() {
            FB.getLoginStatus(function(response) {
                statusChangeCallback(response);
                console.log(response)
            });
            console.log(FB)
        }

        window.fbAsyncInit = function() {
            FB.init({
                appId: '1931532333798494',
                cookie: true,
                xfbml: true,
                version: 'v2.8'
            });

            FB.getLoginStatus(function(response) {
                statusChangeCallback(response);
            });
        };

        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
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
    let eventArray
    let gallery
    let eventDate
    let eachEvent
    let mapIcon

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
            console.log(galleryWithEvents)
            filterCurrentEvents(galleryWithEvents)
        })
        let galleryObj
        let eventLocation = {}
        let eventMapMarker
        let eventName

        function filterCurrentEvents(galleryWithEvents) {

            $.each(galleryWithEvents, function(eachGallery) {

                eventArray = galleryWithEvents[eachGallery][1]
                gallery = galleryWithEvents[eachGallery][0].name
                galleryObj = galleryWithEvents[eachGallery][0]
                console.log(gallery)
                console.log(galleryObj)
                // console.log(eventArray)
                $('.events-list').append(`<li>
                    <div class="collapsible-header"> ${gallery} </div>
                    <div class="collapsible-body">
                        <ul id="${gallery}" class="collapsible popout" data-collapsible="accordion">
                        <li>
                            <div class="gallery-info"><img class="gallery-img" src="${galleryObj.cover.source}"><br> ${galleryObj.about}<hr>${galleryObj.location.street}<hr><a href="${galleryObj.website}">website</a></div><br>
                        </li>
                        </ul>
                    </div>
                </li>`)
                if (eventArray.length > 0) {
                    appendEvents()
                    mapEvents()
                }
            })

            function appendEvents() {
                $.each(eventArray, function(event) {
                    // console.log(eventArray[event])

                    eachEvent = eventArray[event]
                    eventName = eachEvent.name
                    eventDate = moment(eachEvent.start_time)
                    let eventDay0 = moment(eachEvent.start_time)
                    let eventDayCal = eventDate.format('LLL')


                    eventDay0.set({
                        hour: 0,
                        minute: 0,
                        second: 0,
                        millisecond: 0
                    })
                    if (eventDay0.isSame(moment(today))) {
                        console.log(eventDate)
                        console.log(eachEvent)
                        console.log(eventName)
                        console.log($(`#${gallery}`))

                        // $('.daily-events').append(`<li>
                        //     <div class="collapsible-header" id="${eachEvent.id}">${eventName} (${eachEvent.place.name })</div>
                        //     <div class="collapsible-body"><span>${eventDate}<hr>${eachEvent.description}</span></div>
                        //     </li>`)

                        $('.daily-events').append(`<li>
                            <div id="${eachEvent.id}" class="card">
                              <div class="card-image waves-effect waves-block waves-light">
                                <img class="activator" src="${eachEvent.cover.source}">
                              </div>
                              <div class="card-content">
                                <span class="card-title activator grey-text text-darken-4">${eventName}<i class="material-icons right">more_vert</i></span>
                              </div>
                              <div class="card-reveal">
                                <span class="card-title grey-text text-darken-4">${eventName} (${eachEvent.place.name })<i class="material-icons right">close</i></span>
                                <p>${eventDayCal}<hr>${eachEvent.description}</p>
                              </div>
                            </div>
                            </li>`)

                        mapIcon = 'images/yellow_MarkerT.png'


                    } else if (eventDay0.isAfter(moment(today))) {

                        let upcomingElement = `<li>
                            <div class="collapsible-header" id="${eachEvent.id}">${eventName
                            }  ${eventDayCal} - ${eachEvent.place.name }</div>
                            <div class="collapsible-body upcoming-info" ><span class="upcoming-info">${eventDayCal}<hr>${eachEvent.description}</span></div>
                            </li>`

                        $('.upcoming-events').append(upcomingElement)
                        mapIcon = 'images/blue_MarkerU.png'
                    }
                    if (eventDay0.isSame(moment(today)) || eventDay0.isAfter(moment(today))) {
                        getEventLocation()
                        mapEvents()
                    }
                })
            }

            function getEventLocation() {
                if (eachEvent.place.location !== undefined) {

                    eventLocation = {
                        'lat': eachEvent.place.location.latitude,
                        'lng': eachEvent.place.location.longitude
                    }
                    console.log('location: ', eventName, eventLocation)
                }

            }

            function mapEvents() {
                eventMapMarker = new google.maps.Marker({
                    position: eventLocation,
                    map: map,
                    icon: mapIcon,
                    event: eachEvent.id
                })

  //               eventMapMarker.addListener('mouseover', function(event) {
  //                   let infoCard = $(`  <div class="col s12 m7">
  //   <h2 class="header">Horizontal Card</h2>
  //   <div class="card horizontal">
  //     <div class="card-image">
  //       <img src="http://lorempixel.com/100/190/nature/6">
  //     </div>
  //     <div class="card-stacked">
  //       <div class="card-content">
  //         <p>I am a very simple card. I am good at containing small bits of information.</p>
  //       </div>
  //       <div class="card-action">
  //         <a href="#">This is a link</a>
  //       </div>
  //     </div>
  //   </div>
  // </div>
  //           `)
                //     $(event.target)
                // })


                // eventMapMarker.addListener('click', function(){
                //     console.log(eventMapMarker.event)
                //     $('html, body').animate({
                //         scrollTop: $('#'+eventMapMarker.event).offset().top
                //     }, 2000);
                // })

                console.log(eventMapMarker)
                console.log(eventMapMarker.event)
                $(eventMapMarker).click(function() {

                    console.log(eventMapMarker.event)
                    $('html, body').animate({
                        scrollTop: $(`#${eventMapMarker.event}`).offset().top
                    }, 2000);
                    console.log(eventMapMarker.event)
                })
            }

        }
    }
}
