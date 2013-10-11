$(document).ready(function(){
    var getijdenrooster = [];
    var getijdenroosterurl = "http://pipes.yahoo.com/pipes/pipe.run?_id=65561586a6f6bf908b7a91e02d0e6f33&_render=json&_callback=?";
    var getijdenroosterladen = $.getJSON(getijdenroosterurl);
    getijdenroosterladen.done(function(d){
        $.each(d['value']['items'],function(tr){
            var td = tr['td'];
            if (td[2]) {
                var getijde = {};
                getijde['naam'] = td[2]['p'];
                getijde['start'] = td[4]['p'].substr(0, td[4]['p'].indexOf('~'));
                getijde['stop'] = td[4]['p'].substr(td[4]['p'].indexOf('~') + 1,td[4]['p'].length - 1);
                getijde['herhaling'] = (td[2]['class'] == 'repeterend');
                getijdenrooster.push(getijde);
            }
        });
    })
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