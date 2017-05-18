


// $(window).load(loadBody())
function loadBody() {$('body').addClass('loaded')}
function appReady() {
    let today = new Date()
    let date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear()
    $('.date').text(date)

    // materialize:
    $(".button-collapse").sideNav();

    $('.tap-target').tapTarget('open');
    $('.tap-target').tapTarget('close');

    $('.pushpin-demo-nav').each(function() {
        var $this = $(this);
        var $target = $('#' + $(this).attr('data-target'));
        $this.pushpin({
            top: $target.offset().top,
            bottom: $target.offset().top + $target.outerHeight() - $this.height()
        });
    });
    $('.target').pushpin({
        top: 0,
        bottom: 1000,
        offset: 0
    })
     $('.parallax').parallax();
}

$('body').load(function(){$('body').addClass('loaded')})
