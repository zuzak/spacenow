$(document).ready(function() {
    var count = 0;
    var ex1dock = new Date(2002,11,2,9,21);
    $(".counter:contains('ø')").addClass('placeholder');
    setInterval(function(){
        count++;
        $('#earthpop').text(Math.floor(count/24)-Math.floor(count/57));
        $('#earthpop').removeClass('placeholder');
    }, 10);

    setInterval(function(){
        $('#voyager').text(Math.round((new Date()).getTime() / 1000));
    },10);

    $.get("data/kepler.json", function(json){
        var data = JSON.parse(json);
        $('#kepler').text(data.kepler.confirmed);
        $('#keplercand').text(data.kepler.candidate);
        $('.kepler').removeClass('placeholder');
    });

    $.get("data/spacemen.json", function(json){
        var data = JSON.parse(json);
        var str = "";
        $.each(data.people, function() {
            str += '<div class="counts"><h2>Current Human in Space</h2><span class="counter">'
            str += this.name;
            str += '</span></div>'
        });
        $('.main').append(str);
    });

    setInterval(function(){
        var curr = new Date;
        var diff = $.now() -  ex1dock;
       
        var s, m, h, d;
        s = Math.floor(diff / 1000);
        m = Math.floor(s / 60);
        s = s % 60;
        h = Math.floor(m / 60);
        m = m % 60;
        d = Math.floor(h / 24);
        h = h % 24; 
        y = Math.floor(d / 365.5);
        d = d % 365.5 

        $('#isstime').text(y + "y " + d + "d " + m + "m " + s + "s");
        $('#isstime').removeClass('placeholder');
    },1000);

    $.get("data/marsweather.json", function(json){
        var data = JSON.parse(json);
        data = data.weather_report
        var max = data.magnitudes[0].max_temp,
            min = data.magnitudes[0].min_temp,
            ls  = data.magnitudes[0].ls,
            wea = data.magnitudes[0].atmo_opacity;
        $("#mtemp").text(min + " ‒ " +  max + "°C");
        $("#ls").text(ls);
        $("#mweather").text(wea);
        $("#ls"   ).removeClass("placeholder");
        $("#mweather").removeClass("placeholder");
        $("#mtemp").removeClass("placeholder");
    });
    
});
