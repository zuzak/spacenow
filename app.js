var express   = require("express"),
    request   = require("request"),
    jsdom     = require("jsdom"  ),
    parsexml  = require("xml2js" ).parseString,
    app = express();

app.set("views", __dirname + "/views");
app.set("view engine","jade");
app.use(express.logger("dev"));
app.use(express.static(__dirname + "/public"));


app.get("/", function(req, res){
    res.render("index");
});

app.get("/data/spacemen.json", function(req, res){
    request.get("http://www.howmanypeopleareinspacerightnow.com/space.json", function(e, r, b){
        var spacemen = JSON.parse(b);
        res.render("json",{data: spacemen});
    });
});

app.get("/data/kepler.json", function(req, res){
    request.get("http://kepler.nasa.gov/Mission/discoveries/", function(e, r, b){
        jsdom.env({
            html: b,
            scripts: ["//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"]
        }, function(err, window) {
            var $ = window.jQuery;
            var confirmedplanets = $('.planetCount').text();
            var candidateplanets = $('.candidateCount').text();

            var data = {kepler: {confirmed: confirmedplanets, candidate: candidateplanets}};

            res.render("json",{data:data});
        });
    });
});

app.get("/data/marsweather.json", function(req, res) {
    request.get("http://cab.inta-csic.es/rems/rems_weather.xml", function(e, r, b){
       parsexml(b, function(err, data) {
          res.render("json",{data:data});
       }); 
    });
});
   
app.get("/data/isslocation.json", function(req, res) {
    request.get("http://api.open-notify.org/iss-now/", function(e, r, b){
        var data = JSON.parse(b);
        var iss = data.iss_position;
        res.render("json",{data:iss});
    });
});

app.listen(10624);
console.log("Listening on 10624");

