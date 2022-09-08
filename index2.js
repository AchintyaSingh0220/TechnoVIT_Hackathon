const employee = new Map();
employee.set("ASH101", "Achintya Singh");
employee.set("BJH102", "Benaiah Joseph");
employee.set("DEL103", "Danish Eqbal");
employee.set("ERS104", "Ejaz Rodrigues");
employee.set("GMA105", "Gavin Mendonza");
employee.set("HRJ106", "Helen Raj");
employee.set("NPL107", "Nitish Patel");
employee.set("JRI108", "Job Reji");
employee.set("TSL109", "Thomas Samuel");
employee.set("ZMD110", "Zen Mohammed");
document.getElementById("here").innerHTML = window.localStorage.getItem("name");
var s = window.localStorage.getItem("name");
document.getElementById("here1").innerHTML = employee.get(s);

// create a map in the "map" div, set the view to a given place and zoom
var map = L.map('map').setView([13.082792, 80.270742], 10);

/* to change the location of the map change the lat and long, here 40.717192,-74.012042.
To change the default zoom level change 17 to another number. 0 is entire world twice over and 18 is the closest you can get
*/

// add an OpenStreetMap tile layer
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


var prevLat = 0;
var prevLong = 0;
var dist_sum = 0;
var init_time = 0;

function single_instance_func() {
    const today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    document.getElementById("p3").innerHTML = time;

    getLocation_single();

    init_time = (today.getHours() * 3600) + (today.getMinutes() * 60) + (today.getSeconds());
}


const x1 = document.getElementById("p4");

function getLocation_single() {
    try {
        navigator.geolocation.getCurrentPosition(showPosition_single);
    } catch {
        x1.innerHTML = err;
    }
}

function showPosition_single(position) {
    x1.innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;

    prevLat = position.coords.latitude;
    prevLong = position.coords.longitude;

    var marker = L.marker([prevLat, prevLong]).addTo(map);
}

let myInterval = setInterval(t_time, 10000);

function t_time() {
    const today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    document.getElementById("p1").innerHTML = time;

    getLocation();
}

const x = document.getElementById("p2");
const p5 = document.getElementById("p5");

function getLocation() {
    try {
        navigator.geolocation.getCurrentPosition(showPosition);
    } catch {
        x.innerHTML = err;
    }
}

function showPosition(position) {
    dist_sum += distance(prevLat, prevLong, position.coords.latitude, position.coords.longitude);

    x.innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;
    p5.innerHTML = "<br>Total Distance Travelled: " + dist_sum.toFixed(3) + "km";

    prevLat = position.coords.latitude;
    prevLong = position.coords.longitude;

    var marker = L.marker([prevLat, prevLong]).addTo(map);
}

function stop_trace() {
    clearInterval(myInterval);

    const today = new Date();

    var time_sum = (today.getHours() * 3600) + (today.getMinutes() * 60) + today.getSeconds();
    time_sum = time_sum - init_time;

    var hour = Math.floor(time_sum / 3600);
    var minute = Math.floor((time_sum - hour * 3600) / 60);
    var seconds = time_sum - (hour * 3600 + minute * 60);
    if (hour < 10)
        hour = "0" + hour;
    if (minute < 10)
        minute = "0" + minute;
    if (seconds < 10)
        seconds = "0" + seconds;
    document.getElementById("p6").innerHTML = "Total Time elapsed: " + hour + ":" + minute + ":" + seconds;
}

function distance(lat1, lon1, lat2, lon2) {
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p) / 2 +
        c(lat1 * p) * c(lat2 * p) *
        (1 - c((lon2 - lon1) * p)) / 2;

    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}