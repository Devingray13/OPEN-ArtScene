$(appReady)

function appReady() {
    let today = new Date()
    let date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear()
    $('.date').text(date)

    // materialize:
    $(".button-collapse").sideNav();
    $('.tap-target').tapTarget('open');
    $('.tap-target').tapTarget('close');

}
