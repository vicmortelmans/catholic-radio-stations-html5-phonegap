$(document).ready(function(){
    $('#start').on('click',function(){
        jwplayer('my-video').play(true);
    });
    $('#stop').on('click',function(){
        jwplayer('my-video').pause(true);
    });
    $('div').on('pagebeforehide',function(){
        jwplayer('my-video').stop();
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