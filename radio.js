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
        jwplayer('radio-maria-nederland-player').onReady();
    $('# 
            $('#radio-maria-nederland').parent().removeClass('notready');
            return;
        radi    o-maria-vlaanderen-player').on('canplay',function(){
        $('#    radio-maria-vlaanderen').parent().removeClass('notready');
        retu    rn;
    });
        $('#geti    jden-player').on('canplay',function(){
        $('#    getijden').parent().removeClass('notready');
        retu    rn;
    });
        $('#greg    oriaans-player').on('canplay',function(){
        $('#    gregoriaans').parent().removeClass('notready');
        retu    rn;
    });
        $('#radi    o-maria-nederland').on('click',function(){
        if (    $(this).parent().hasClass('playing')) {
                stopall();
        } el    se {
                stopall();
                jwplayer('radio-maria-nederland-player').play(true);
                $(this).parent().addClass('playing');
        }
            retu    rn;
    });
        $('#radi    o-maria-vlaanderen').on('click',function(){
        if (    $(this).parent().hasClass('playing')) {
                stopall();
        } el    se {
                stopall();
                $('#radio-maria-vlaanderen-player').get(0).play();
                $(this).parent().addClass('playing');
        }
            retu    rn;
    });
        $('#geti    jden').on('click',function(){
        if (    $(this).parent().hasClass('playing')) {
                stopall();
        } el    se {
                stopall();
                $('#getijden-player').get(0).play();
                $(this).parent().addClass('playing');
        }
            retu    rn;
    });
        $('#greg    oriaans').on('click',function(){
        if (    $(this).parent().hasClass('playing')) {
                stopall();
        } el    se {
                stopall();
                $('#gregoriaans-player').get(0).play();
                $(this).parent().addClass('playing');
        }
            retu    rn;
    });
        $('div')    .on('pagebeforehide',function(){
        stop    all();
        retu    rn;
    });
});
    
/*
 fol    lowi    n    g s    ection fixes flickering of page transitions on Android
 and must be     imported between jQuery and jQuery Mobile
 */
$(docume    nt).    on('mobileinit', function()
{
   if (nav    ig    ator.userAgent.indexOf("Android") != -1)
   {
     $.    mobil    e.defaultPageTransition = 'none';
     $.mobil    e.defaultDialogTransition = 'none';
   }
});        