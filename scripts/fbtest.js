$(fbReady)

function fbReady() {


    let loginAccessToken;
    $.ajaxSetup({
        cache: true
    });
    $.getScript('https://connect.facebook.net/en_US/sdk.js', function() {
        FB.init({
            appId: '1931532333798494',
            version: 'v2.7' // or v2.1, v2.2, v2.3, ...
        });

        $('#loginbutton,#feedbutton').removeAttr('disabled');
        // FB.getLoginStatus(updateStatusCallback);
        //  console.log(updateStatusCallback)
        // This is called with the results from from FB.getLoginStatus().
        function statusChangeCallback(response) {
            console.log('statusChangeCallback');
            console.log(response);

            loginAccessToken = response.authResponse.accessToken
            // The response object is returned with a status field that lets the
            // app know the current login status of the person.
            // Full docs on the response object can be found in the documentation
            // for FB.getLoginStatus().
            if (response.status === 'connected') {
                // Logged into your app and Facebook.
                testAPI();
            } else {
                // The person is not logged into your app or we are unable to tell.
                document.getElementById('status').innerHTML = 'Please log ' +
                    'into this app.';
            }
        }

        // This function is called when someone finishes with the Login
        // Button.  See the onlogin handler attached to it in the sample
        // code below.
        function checkLoginState() {
            FB.getLoginStatus(function(response) {
                statusChangeCallback(response);
                console.log(response)
            });
        }

        window.fbAsyncInit = function() {
            FB.init({
                appId: '1931532333798494',
                cookie: true, // enable cookies to allow the server to access
                // the session
                xfbml: true, // parse social plugins on this page
                version: 'v2.8' // use graph api version 2.8
            });

            // Now that we've initialized the JavaScript SDK, we call
            // FB.getLoginStatus().  This function gets the state of the
            // person visiting this page and can return one of three states to
            // the callback you provide.  They can be:
            //
            // 1. Logged into your app ('connected')
            // 2. Logged into Facebook, but not your app ('not_authorized')
            // 3. Not logged into Facebook and can't tell if they are logged into
            //    your app or not.
            //
            // These three cases are handled in the callback function.

            FB.getLoginStatus(function(response) {
                statusChangeCallback(response);
            });

        };

        // Load the SDK asynchronously
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        // Here we run a very simple test of the Graph API after login is
        // successful.  See statusChangeCallback() for when this call is made.
        function testAPI() {
            // console.log('Welcome!  Fetching your information.... ');
            FB.api('/me', function(response) {
                console.log('Successful login for: ' + response.name);
                // document.getElementById('status').innerHTML =
                //     'Thanks for logging in, ' + response.name + '!';
            });
            // FB.api(
            //     "/223413964339162/events",
            //     function(response) {
            //         if (response) {
            //             // console.log(response)
            //             // console.log(response.data[0].name)
            //             // console.log(response.data[0].description)
            //             $('.card-title').text(response.data[0].name)
            //             $('.card-reveal p').text(response.data[0].description)
            //         }
            //     }
            //
            // );
            // FB.api(
            //     "/1082598335202100/photos?fields=full_picture,picture",
            //     function(response) {
            //         // console.log(response)
            //         let photo = response.data[0].picture
            //          $('.activator').attr('src', photo)
            //     }
            // )
            // FB.api(
            //     "/1082598335202100",
            //     function(response) {
            //         // console.log(response)
            //     }
            // )




            //////begin experiment:

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

            let today = new Date()
            let date = '' + today.getFullYear() + '' + (today.getMonth() + 1) + '' + today.getDate()
            console.log('date: ', date)

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
                    
                    console.log(eventObjects[event])

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



    });
}
