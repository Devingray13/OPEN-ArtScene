$(fbReady)

let loginAccessToken;

let today = new Date()
let date = '' + today.getFullYear() + '' + (today.getMonth() + 1) + '' + today.getDate()
console.log('date: ', date)


function fbReady() {




    ////logging: 'FB not defined'... (even though it seems to have worked) how do I affect the scope of this specific FB, how can I tag a .then promise on one?




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




    function retrieveData() {
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
        let eventObjects = {};

        $.each(pageIds, function(page, id) {
            // console.log(page, id)
            FB.api(
                "/" + id + "?fields=id,about,cover,description,location,mission,name",
                function(response) {
                    console.log(response)
                }
            )
            FB.api(
                "/" + id + "/events?fields=owner,name,id,cover,description,place,start_time",
                function(response) {
                    // console.log(page, response)
                    // eventObjects.push(response.data)
                    eventObjects[page] = response.data
                    filterCurrentEvents()
                }

            )
            return eventObjects
        })
        console.log(eventObjects)


        function filterCurrentEvents() {
            $.each(eventObjects, function(event) {
                // console.log(eventObjects[event])

                // let eventTime = eventObjects[event].start_time
                // console.log(eventTime)
                // eventTime = eventTime.substring(0, 11).replace(/([^0-9])/g, '')
                // console.log(eventTime)
                // if(parseInt(eventTime)>=parseInt(date)){
                //     console.log(eventObjects[event].name)
                // }
            })
        }
    }
}
