$(document).ready(function() {
    var count = 0;
    var ex1dock = new Date(2002,11,2,9,21);
    var moonliftoff = new Date(1972,12,14,21,55);
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
        var diff = $.now() -  moonliftoff;
       
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

        $('#moontime').text(y + "y " + d + "d " + m + "m " + s + "s");
        $('#moontime').removeClass('placeholder');
    },10);

    setInterval(function(){
        var curr = new Date;
        var diff = $.now() - ex1dock;
       
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
    },10);
    
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

    function issLocation(){
            $.get("data/isslocation.json", function(json){
                var data = JSON.parse(json);
                var lat,lon;

                if (data.latitude > 0) {
                    lat = "°N";
                } else {
                    lat = "°S";
                }

                if (data.longitude > 0) {
                    lon = "°E";
                } else {
                    lon = "°W";
                }
  
                lat = Math.abs(Math.floor(data.latitude)) + lat;
                lon = Math.abs(Math.floor(data.longitude)) + lon;
 
                $('#isslat').text(lat + " " + lon);
                $('#isslat').removeClass("placeholder");
            });
        setTimeout(issLocation,5000);
    }
    issLocation();
});
