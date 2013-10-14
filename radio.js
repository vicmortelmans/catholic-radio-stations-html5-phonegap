var getijdenrooster = [];

function toggleplay(audio) {
    if (audio.paused) 
        audio.play();
    else
        audio.pause();
    return;
}    

function stop(playerid) {
    var player = $('#' + playerid).get(0);
    player.realsrc = player.src;
    player.src = '';
    player.load();
    return;
}

function stopall() {
    $('.playing').removeClass('playing');
    stop('radio-maria-vlaanderen-player');
    stop('getijden-player');
    stop('barroux-player');
    stop('gregoriaans-player');
    jwplayer('radio-maria-nederland-player').stop();
    return;
}

function start(playerid) {
    var player = $('#' + playerid).get(0);
    player.src = player.realsrc;
    player.load();
    player.play();
    return;    
}

function getijdenstatus() {
    var getijdenstatusurl = "http://pipes.yahoo.com/pipes/pipe.run?_id=fd4429e792f74e446ea153b4efadc663&_render=json&_callback=?";
    var getijdenstatusladen = $.getJSON(getijdenstatusurl);
    getijdenstatusladen.done(function(d){
        $('#getijdenstatus').text(d.value.items[0].content);
    });
    if ($('#getijden').closest('li').hasClass('notready')) {
        $('#getijden-player').get(0).load();
    }
    setTimeout(getijdenstatus,60000);
}

function barrouxstatus() {
    var now = new Date();
    var nowtime = now.getHours() * 100 + now.getMinutes();
    var status;
    if ($('#barroux').closest('li').hasClass('playing')) {
        if (nowtime >= 1945) {
            status = "De completen zijn gestart om 19:45";
        } else if (nowtime >= 1830) {
            status = "De vespers zijn gestart om 18:30";
        } else if (nowtime >= 1415) {
            status = "De noon is gestart om 14:15 of 14:30 (zondag)";
        } else if (nowtime >= 1215) {
            status = "De sext is gestart om 12:15";
        } else if (nowtime >= 745) {
            status = "De priem is gestart om 7:45 of 8:00 (zondag)";
        } else if (nowtime >= 600) {
            status = "De lauden zijn gestart om 6:00";
        }
    } else {
        if (nowtime < 600) {
            status = "De lauden starten om 6:00";
        } else if (nowtime < 745) {
            status = "Aanvang Priem rond 7:45 of 8:00 (zondag)";
        } else if (nowtime < 1215) {
            status = "Aanvang Sext rond 12:15";
        } else if (nowtime < 1415) {
            status = "Aanving Noon rond 14:15 of 14:30 (zondag)";
        } else if (nowtime < 1830) {
            status = "Aanvang Vespers rond 18:30";
        } else if (nowtime < 1945) {
            status = "Aanvang Completen rond 19:45";
        } else {
            status = "Er zijn vandaag geen uitzendingen meer";
        }
    }
    $('#barrouxstatus').text(status);
    if ($('#barroux').closest('li').hasClass('notready')) {
        $('#barroux-player').get(0).load();
    }
    setTimeout(barrouxstatus,60000);
}

$(document).ready(function(){
    jwplayer('radio-maria-nederland-player').onReady(function(){
        if (jwplayer('radio-maria-nederland-player').getState() == 'IDLE') {
            $('#radio-maria-nederland').closest('li').removeClass('notready');
        }
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
    $('#barroux-player').on('canplay',function(){
        $('#barroux').closest('li').removeClass('notready');
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
            start('radio-maria-vlaanderen-player');
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
            start('getijden-player');
            $(this).closest('li').addClass('playing');
        }
        return;
    });
    $('#barroux').on('click',function(){
        if ($(this).closest('li').hasClass('notready')) {
            return;
        } else if ($(this).closest('li').hasClass('playing')) {
            stopall();
        } else {
            stopall();
            start('barroux-player');
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
            start('gregoriaans-player');
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
    $('#barroux-player').on('stalled',function(){
        $('#barroux').closest('li').addClass('notready');
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
    barrouxstatus();
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

