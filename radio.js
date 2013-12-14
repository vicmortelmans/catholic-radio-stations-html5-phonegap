var getijdenrooster = [];
var sources = {
    "radio-maria-vlaanderen-player":"http://stream.radiomaria.be:8000/RadioMaria-32",
    "getijden-player":"http://streamcluster02.true.nl/mediapastoraat",
    "barroux-player":"http://audio.barroux.org:8000/chant",
    "gregoriaans-player":"http://streams.greenhost.nl:8080/gregoriaans",
    "vrtradiomis-player":"http://mp3.streampower.be/radio1-mid.mp3"
};

function stop(playerid) {
    var player = $('#' + playerid).get(0);
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
    stop('vrtradiomis-player');
    jwplayer('radio-maria-nederland-player').stop();
    return;
}

function start(playerid) {
    var player = $('#' + playerid).get(0);
    player.src = sources[playerid];
    player.play();
    return;    
}

function poll(playerid){
    var player = $('#' + playerid).get(0);
    player.src = sources[playerid];
    player.load();
    return;    
}

function radiomariavlaanderenpolling() {
    radiomariavlaanderenstatus();
    if ($('#radio-maria-vlaanderen').closest('li').hasClass('notready')) {
        poll('radio-maria-vlaanderen-player');
    }
    setTimeout(radiomariavlaanderenpolling,60000);
}

function radiomariavlaanderenstatus() {
    var radiomariavlaanderenstatusurl = "http://pipes.yahoo.com/pipes/pipe.run?_id=912852870e591b0afa7ac38198c1e28a&_render=json&_callback=?";
    var radiomariavlaanderenstatusladen = $.getJSON(radiomariavlaanderenstatusurl);
    radiomariavlaanderenstatusladen.done(function(d){
        $('#radio-maria-vlaanderen-status').text(d.value.items[0].content);
    });
}

function getijdenpolling() {
    getijdenstatus();
    if ($('#getijden').closest('li').hasClass('notready')) {
        poll('getijden-player');
    }
    setTimeout(barrouxpolling,60000);
}

function getijdenstatus() {
    var getijdenstatusurl = "http://pipes.yahoo.com/pipes/pipe.run?_id=fd4429e792f74e446ea153b4efadc663&_render=json&_callback=?";
    var getijdenstatusladen = $.getJSON(getijdenstatusurl);
    getijdenstatusladen.done(function(d){
        $('#getijdenstatus').text(d.value.items[0].content);
    });
}

function barrouxpolling() {
    barrouxstatus();
    if ($('#barroux').closest('li').hasClass('notready')) {
        poll('barroux-player');
    }
    setTimeout(barrouxpolling,60000);
}

function barrouxstatus() {
    var now = new Date();
    var nowtime = now.getHours() * 100 + now.getMinutes();
    var status;
    if (! $('#barroux').closest('li').hasClass('notready')) {
        if (nowtime >= 1945) {
            status = "De completen zijn gestart om 19:45";
        } else if (nowtime >= 1730) {
            status = "De vespers zijn gestart om 17:30";
        } else if (nowtime >= 1215) {
            status = "De sext is gestart om 12:15";
        } else if (nowtime >= 745) {
            status = "De priem is gestart om 7:45 of 8:00 (zondag)";
        }
    } else {
        if (nowtime < 745) {
            status = "Aanvang Priem rond 7:45 of 8:00 (zondag)";
        } else if (nowtime < 1215) {
            status = "Aanvang Sext rond 12:15";
        } else if (nowtime < 1730) {
            status = "Aanvang Vespers rond 17:30";
        } else if (nowtime < 1945) {
            status = "Aanvang Completen rond 19:45";
        } else {
            status = "Er zijn geen uitzendingen meer vandaag.";
        }
    }
    $('#barrouxstatus').text(status);
}

function vrtradiomispolling() {
    vrtradiomisstatus();
    if ($('#barroux').closest('li').hasClass('notready')) {
        poll('vrtradiomis-player');
    }
    setTimeout(vrtradiomispolling,60000);
}

function vrtradiomisstatus() {
    var now = new Date();
    var nowtime = now.getHours() * 100 + now.getMinutes();
    var nowday = now.getDay();
    var status;
    if (nowday == 0 && nowtime >= 1000 && nowtime < 1100) {
        status = "De mis is gestart om 10:000";
    } else {
        status = "Aanvang mis op zondag om 10:00";
    }
    $('#vrtradiomisstatus').text(status);
}

function braambosinitialize() {
    var braambosfeedurl = "http://pipes.yahoo.com/pipes/pipe.run?_id=0786db3565cc3e818b833e1bd9213fe8&_render=json&folderid=0B-659FdpCliwLXpXNE16VW40WGM&_callback=?";
    var braambosfeedladen = $.getJSON(braambosfeedurl);
    braambosfeedladen.done(function(d){
        var url = d.value.items[0].link;
        var date = d.value.items[0].pubDate;
        $('#braambosstatus').text(date);
        $('#braambos-player source').attr('src',url);
    });
}

$(document).ready(function(){
    
    /* Events for players coming ready */
    
    jwplayer('radio-maria-nederland-player').onReady(function(){
        if (! $('#radio-maria-nederland').closest('li').hasClass('playing')){
            if (jwplayer('radio-maria-nederland-player').getState() == 'IDLE') {
                $('#radio-maria-nederland').closest('li').removeClass('notready');
            }
        }
        return;
    });
    $('#radio-maria-vlaanderen-player').on('canplay',function(){
        if (! $('#radio-maria-vlaanderen').closest('li').hasClass('playing')){
            $('#radio-maria-vlaanderen').closest('li').removeClass('notready');
            stop('radio-maria-vlaanderen-player');
        }
        return;
    });
    $('#getijden-player').on('canplay',function(){
        if (! $('#getijden').closest('li').hasClass('playing')){
            $('#getijden').closest('li').removeClass('notready');
            stop('getijden-player');
        }
        return;
        getijdenstatus();
    });
    $('#barroux-player').on('canplay',function(){
        if (! $('#barroux').closest('li').hasClass('playing')){
            $('#barroux').closest('li').removeClass('notready');
            stop('barroux-player');
        }
        barrouxstatus();
        return;
    });
    $('#gregoriaans-player').on('canplay',function(){
        if (! $('#gregoriaans').closest('li').hasClass('playing')){
            $('#gregoriaans').closest('li').removeClass('notready');
            stop('gregoriaans-player');
        }
        return;
    });
    $('#vrtradiomis-player').on('canplay',function(){
        vrtradiomisstatus();
        if (! $('#vrtradiomis').closest('li').hasClass('playing')){
            if ($('#vrtradiomisstatus').text().indexOf('gestart') != -1) {
                $('#vrtradiomis').closest('li').removeClass('notready');
            }
            stop('vrtradiomis-player');
        }
        return;
    });
    $('#braambos-player').on('canplay',function(){
        if (! $('#braambos').closest('li').hasClass('playing')){
            $('#braambos').closest('li').removeClass('notready');
            stop('braambos-player');
        }
        return;
    });
    
    /* Events for players being clicked */
    
    $('#radio-maria-nederland').on('click',function(){
        if ($(this).closest('li').hasClass('notready')) {
            jwplayer('radio-maria-nederland-player').pause(true);
            return;
        } else if ($(this).closest('li').hasClass('playing')) {
            stopall();
        } else {
            stopall();
            $(this).closest('li').addClass('playing');
            jwplayer('radio-maria-nederland-player').play(true);
        }
        return;
    });
    $('#radio-maria-vlaanderen').on('click',function(){
        if ($(this).closest('li').hasClass('notready')) {
            poll('radio-maria-vlaanderen-player');
            return;
        } else if ($(this).closest('li').hasClass('playing')) {
            stopall();
        } else {
            stopall();
            $(this).closest('li').addClass('playing');
            start('radio-maria-vlaanderen-player');
        }
        return;
    });
    $('#getijden').on('click',function(){
        if ($(this).closest('li').hasClass('notready')) {
            poll('getijden-player');
            return;
        } else if ($(this).closest('li').hasClass('playing')) {
            stopall();
        } else {
            stopall();
            $(this).closest('li').addClass('playing');
            start('getijden-player');
        }
        return;
    });
    $('#barroux').on('click',function(){
        if ($(this).closest('li').hasClass('notready')) {
            poll('barroux-player');
            return;
        } else if ($(this).closest('li').hasClass('playing')) {
            stopall();
        } else {
            stopall();
            $(this).closest('li').addClass('playing');
            start('barroux-player');
        }
        return;
    });
    $('#gregoriaans').on('click',function(){
        if ($(this).closest('li').hasClass('notready')) {
            poll('gregoriaans-player');
            return;
        } else if ($(this).closest('li').hasClass('playing')) {
            stopall();
        } else {
            stopall();
            $(this).closest('li').addClass('playing');
            start('gregoriaans-player');
        }
        return;
    });
    $('#vrtradiomis').on('click',function(){
        if ($(this).closest('li').hasClass('notready')) {
            poll('vrtradiomis-player');
            return;
        } else if ($(this).closest('li').hasClass('playing')) {
            stopall();
        } else {
            stopall();
            $(this).closest('li').addClass('playing');
            start('vrtradiomis-player');
        }
        return;
    });
    
    /* Event for leaving the browser page */
    
    $('div').on('pagebeforehide',function(){
        stopall();
        return;
    });
    
    /* Start polling */
    
    radiomariavlaanderenpolling();
    getijdenpolling();
    barrouxpolling();
    vrtradiomispolling();
    braambosinitialize();
});


$(document).on( 'pageinit',function(event){
    $("input[type='radio']").on( "change", function(event, ui) {
      $('.' + $(this).attr('name')).hide();
      $('.' + $(this).attr('name') + '.' + $(this).attr('id')).show();
    });
    if (mobileOS == 'Android') {
        $('.ios').hide();
    }
    if (mobileOS == 'iOS') {
        $('.android').hide();
    }
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


// determine OS
var mobileOS;    // will either be iOS, Android or unknown
var ua = navigator.userAgent;
if ( ua.match(/iPad/i) || ua.match(/iPhone/i) ) {
    mobileOS = 'iOS';
}
else if ( ua.match(/Android/i) ) {
    mobileOS = 'Android';
}
else {
    mobileOS = 'unknown';
}