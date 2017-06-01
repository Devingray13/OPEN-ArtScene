$(fbReady = (() => {

// create conditional appID switcher for local development
    let fbID
    if (window.location.hostname === 'localhost') {
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

        let statusChangeCallback = (response) => {
            $('.fb-login-button').click(function(response) {})
            let wholeThang = () => {
                appReady()
                initMap()
            }

            let showActualSite = () => {
                $('#login-splash').hide()
                $('#actual-site').show()
                $('body').removeClass('loaded')
                $(window).load(loadIt())
            }

            let hideActualSite = () => {
                $('#login-splash').show()
                $('#actual-site').hide()
                $('body').addClass('loaded')
            }

            if (response.status === 'connected') {
                let loginAccessToken = response.authResponse.accessToken
                showActualSite()
                wholeThang()
            } else {
                hideActualSite()
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

        window.fbAsyncInit = () => {
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
})())
