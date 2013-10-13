var getijdenrooster = [];

function toggleplay(audio) {
    if (audio.paused) 
        audio.play();
    else
        audio.pause();
    return;
}    

function stopall() {
    $('.playing').removeClass('playing');
    $('#radio-maria-vlaanderen-player').get(0).pause();
    $('#getijden-player').get(0).pause();
    $('#gregoriaans-player').get(0).pause();
    jwplayer('radio-maria-nederland-player').pause(true);
}

$(document).ready(function(){
    var getijdenroosterurl = "http://pipes.yahoo.com/pipes/pipe.run?_id=65561586a6f6bf908b7a91e02d0e6f33&_render=json&_callback=?";
    var getijdenroosterladen = $.getJSON(getijdenroosterurl);
    getijdenroosterladen.done(function(d){
        $.each(d.value.items,function(i,tr){
            var td = tr.td;
            try {
                if ($.trim(td[2].p) != '') {
                    var getijde = {};
                    getijde.naam = $.trim(td[2].p);
                    getijde.start = $.trim(td[4].p.substr(0, td[4].p.indexOf('~')));
                    getijde.stop = $.trim(td[4].p.substr(td[4].p.indexOf('~') + 1,td[4].p.length - 1));
                    getijdenrooster.push(getijde);
                }
            }
            catch (e) {}
        });
    });
    $('#radio-maria-nederland').on('click',function(){
        if ($(this).parent().hasClass('playing')) {
            stopall();
        } else {
            stopall();
            jwplayer('radio-maria-nederland-player').play(true);
            $(this).parent().addClass('playing');
        }
        return;
    });
    $('#radio-maria-vlaanderen').on('click',function(){
        if ($(this).parent().hasClass('playing')) {
            stopall();
        } else {
            stopall();
            $('#radio-maria-vlaanderen-player').get(0).play();
            $(this).parent().addClass('playing');
        }
        return;
    });
    $('#getijden').on('click',function(){
        if ($(this).parent().hasClass('playing')) {
            stopall();
        } else {
            stopall();
            $('#getijden-player').get(0).play();
            $(this).parent().addClass('playing');
        }
        return;
    });
    $('#gregoriaans').on('click',function(){
        if ($(this).parent().hasClass('playing')) {
            stopall();
        } else {
            stopall();
            $('#gregoriaans-player').get(0).play();
            $(this).parent().addClass('playing');
        }
        return;
    });
    $('div').on('pagebeforehide',function(){
        jwplayer('radio-maria-nederland-player').stop();
        return;
    });
});

/*
 following section fixes flickering of page transitions on Android
 and must be imported between jQuery and jQuery Mobile
 */
$(document).on('mobileinit', function()
{
   if (navigator.userAgent.indexOf("Android") != -1)
   {
     $.mobile.defaultPageTransition = 'none';
     $.mobile.defaultDialogTransition = 'none';
   }
});