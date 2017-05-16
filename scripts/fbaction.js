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

    function retrieveData() {

        $.each(pageIds, function(page, id) {
            // console.log(page, id)
            const promise1 = new Promise(function(resolve, reject) {
                FB.api(
                    "/" + id + "?fields=id,about,cover,description,location,mission,name",
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
                            <div class="collapsible-header">${galleryObj.about}</div>
                            // <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                        </li>
                        </ul>
                    </div>
                </li>`)
                if (eventArray.length > 0) {
                    appendEvents()
                }
            })

            function appendEvents() {
                $.each(eventArray, function(event) {
                    // console.log(eventArray[event])
                    eachEvent = eventArray[event]
                    eventDate = eventArray[event].start_time
                    if (moment(eventDate).isAfter(moment(today))) {
                        console.log(moment(eventDate))
                        console.log(eachEvent)
                        console.log(eachEvent.name)
                        console.log($(`#${gallery}`))
                        $(`#${gallery}`).append(`<li>
                            <div class="collapsible-header">${eachEvent.name}</div>
                            // <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                            </li>`)
                        $('.daily-events').append(`<li>
                            <div class="collapsible-header">${eachEvent.name} (${eachEvent.place.name })</div>
                            <div class="collapsible-body"><span>${eachEvent.description}</span></div>
                            </li>`)


                    }
                })
            }


        }
    }
}


//     count = 0;
//     $.each(eventObjects, function(gallery, eventSet) {
//         console.log(eventSet)
//         count++
//         console.log(eventObjects)
//         $('.events-list').append(`<li>
//             <div class="collapsible-header"> ${gallery} </div>
//             <div class="collapsible-body">
//                     <ul id="${count}" class="collapsible popout" data-collapsible="accordion"></ul>
//             </div>
//         </li>`)
//         $.each(eventSet, function(i, events) {
//             console.log(events)
//             console.log(i)
//             $(`#${count}`).append(`<li>
//                     <div class="collapsible-header">${events.name}</div>
//                     <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
//                 </li>`)
//         })
//
//     })
