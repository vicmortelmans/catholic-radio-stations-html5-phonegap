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
    jwplayer('radio-maria-nederland-player').stop();
}

function getijdenstatus() {
    var getijdenstatusurl = "http://pipes.yahoo.com/pipes/pipe.run?_id=fd4429e792f74e446ea153b4efadc663&_render=json&_callback=?";
    var getijdenstatusladen = $.getJSON(getijdenstatusurl);
    getijdenstatusladen.done(function(d){
        $('#getijdenstatus').text(d.value.items[0].content);
    });
    setTimeout(getijdenstatus,60000);
}

$(document).ready(function(){
    jwplayer('radio-maria-nederland-player').onReady(function(){ 
        $('#radio-maria-nederland').closest('li').removeClass('notready');
        return;
    });
    $('#radio-maria-vlaanderen-player').on('canplay',function(){
        $('#radio-maria-vlaanderen').closest('li').removeClass('notready');
        return;
    });
    $('#getijden-player').on('canplay',function(){
        $('#getijden').closest('li').removeClass('notready');
        return;
    });
    $('#gregoriaans-player').on('canplay',function(){
        $('#gregoriaans').closest('li').removeClass('notready');
        return;
    });
    $('#radio-maria-nederland').on('click',function(){
        if ($(this).closest('li').hasClass('notready')) {
            return;
        } else if ($(this).closest('li').hasClass('playing')) {
            stopall();
        } else {
            stopall();
            jwplayer('radio-maria-nederland-player').play(true);
            $(this).closest('li').addClass('playing');
        }
        return;
    });
    $('#radio-maria-vlaanderen').on('click',function(){
        if ($(this).closest('li').hasClass('notready')) {
            return;
        } else if ($(this).closest('li').hasClass('playing')) {
            stopall();
        } else {
            stopall();
            $('#radio-maria-vlaanderen-player').get(0).play();
            $(this).closest('li').addClass('playing');
        }
        return;
    });
    $('#getijden').on('click',function(){
        if ($(this).closest('li').hasClass('notready')) {
            return;
        } else if ($(this).closest('li').hasClass('playing')) {
            stopall();
        } else {
            stopall();
            $('#getijden-player').get(0).play();
            $(this).closest('li').addClass('playing');
        }
        return;
    });
    $('#gregoriaans').on('click',function(){
        if ($(this).closest('li').hasClass('notready')) {
            return;
        } else if ($(this).closest('li').hasClass('playing')) {
            stopall();
        } else {
            stopall();
            $('#gregoriaans-player').get(0).play();
            $(this).closest('li').addClass('playing');
        }
        return;
    });
    jwplayer('radio-maria-nederland-player').onError(function(){ 
        $('#radio-maria-nederland').closest('li').addClass('notready');
        return;
    });
    $('#radio-maria-vlaanderen-player').on('stalled',function(){
        $('#radio-maria-vlaanderen').closest('li').addClass('notready');
        return;
    });
    $('#getijden-player').on('stalled',function(){
        $('#getijden').closest('li').addClass('notready');
        return;
    });
    $('#gregoriaans-player').on('stalled',function(){
        $('#gregoriaans').closest('li').addClass('notready');
        return;
    });
    $('div').on('pagebeforehide',function(){
        stopall();
        return;
    });
    getijdenstatus();
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

