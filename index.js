function transision() {
    var s = document.getElementById("myText").value;
    const employee = new Map();
    employee.set("ASH101", "Achitya Singh");
    employee.set("BJH102", "Benaiah Joseph");
    employee.set("DEL103", "Danish Eqbal");
    employee.set("ERS104", "Ejaz Rodrigues");
    employee.set("GMA105", "Gavin Mendonza");
    employee.set("HRJ106", "Helen Raj");
    employee.set("NPL107", "Nitish Patel");
    employee.set("JRI108", "Job Reji");
    employee.set("TSL109", "Thomas Samuel");
    employee.set("ZMD110", "Zen Mohammed");
    let x = false;
    employee.forEach((value, key) => {
        if (key == s) {
            x = true;
        }
    });
    if (x) {
        window.localStorage.setItem("name", s);
        window.open("/MIC Hackathon/landing.html", "_top");
        // url = '/MIC Hackathon/landing.html?name=' + encodeURIComponent(s);

        // document.location.href = url;
    }
    else {
        alert("Enter correct ID!");
    }
}