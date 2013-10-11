$(document).ready(function(){
    var getijdenrooster = [];
    var getijdenroosterurl = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2Fwww.rkk.nl%2Fscripts%2Fgetijden%2Fstream-embed.php%22&format=json&callback=?";
    var getijdenroosterladen = $.getJSON(getijdenroosterurl);
    getijdenroosterladen.done(function(d){
        $.each(d['query']['results']['tr'],function(tr){
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