$(function() {
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
            console.log('Welcome!  Fetching your information.... ');
            FB.api('/me', function(response) {
                console.log('Successful login for: ' + response.name);
                document.getElementById('status').innerHTML =
                    'Thanks for logging in, ' + response.name + '!';
            });
            FB.api(
                "/223413964339162/events",
                function(response) {
                    if (response) {
                        console.log(response)
                        console.log(response.data[0].name)
                        console.log(response.data[0].description)
                        $('.card-title').text(response.data[0].name)
                        $('.card-reveal p').text(response.data[0].description)
                    }
                }

            );
            FB.api(
                "/1082598335202100/photos?fields=full_picture,picture",
                function(response) {
                    console.log(response)
                    let photo = response.data[0].picture
                     $('.activator').attr('src', photo)
                }
            )
            FB.api(
                "/1082598335202100",
                function(response) {
                    console.log(response)
                }
            )


        }



    });
})
// $.get('https://graph.facebook.com/DBSgallery/events?access_token=EAAbctZBqg1F4BAE7t4IYvZACbqt2D2T2YlftA7eBTZCBhh2SmFQiWP9RQlJq8s8CyMRqXiXfvBeWFamHnzWQ2EJQ4OVhzhGyJfSPUpEnkDhAuMnqTnScMyjhbL1EPUS8lkBzxjgWOyhkZBFBtZB3bDz05xkZCG6XwZD').then(function(response) {
//     let events = response.data
//     console.log(events[1])
//     let actualPhoto;
//
//     $('.card-title').text(events[1].name)
//     getEventPhoto().then(function(response) {
//         console.log(response)
//         let photo = response.data[0].images[0].source
//         // actualPhoto = $('<img src ="' + photo + '"></img>')
//         // $('.main').prepend(actualPhoto)
//         $('.activator').attr('src', photo);
//     })
//     getEventDescription().then(function(response){
//         console.log(response)
//
//         let descripStart = response.description.indexOf('*')
//         let description = response.description.slice(descripStart+1, response.description.length)
//
//         $('.card-reveal p').text(description)
//     })
//
// })
//
// function getEventPhoto() {
//     return $.get('https://graph.facebook.com/1082598335202100/photos?access_token=EAACEdEose0cBAPHUngcx8OmHmKKZBpzE5DlZAga3PfKcMMyXuqAZArGFPuJrFvNMi1FDpwRCTVELtn7Vxg1xk1GBvJlZCSOxyxcBcv66K3ZBbCPtKMZAIkGK0mCVk74AQfm6TdgPT3XC8ZAVFzZCE4oZBeqSZAx4xdBC1fTqy84mGzhNSsyj1KCMW1aPAmXxYAA4gZD')
// }
//
// function getEventDescription(){
//     return $.get('https://graph.facebook.com/1082598335202100?access_token=EAAbctZBqg1F4BAE7t4IYvZACbqt2D2T2YlftA7eBTZCBhh2SmFQiWP9RQlJq8s8CyMRqXiXfvBeWFamHnzWQ2EJQ4OVhzhGyJfSPUpEnkDhAuMnqTnScMyjhbL1EPUS8lkBzxjgWOyhkZBFBtZB3bDz05xkZCG6XwZD')
// }
