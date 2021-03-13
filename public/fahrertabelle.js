async function CreateFahrerTabelle() {
    const Year = document.getElementById('selYear');
    console.log(Year.value);
    var url = "https://ergast.com/api/f1/" + Year.value + "/drivers.json";

    var response = await fetch(url)
    var result = await response.json();
    //werte überschreiben mit deutschen bezeichnungen
    var result = JSON.stringify(result);
    var result = result.replace(/code/g, "Abkürzung");
    var result = result.replace(/givenName/g, "Vorname");
    var result = result.replace(/familyName/g, "Nachname");
    var result = result.replace(/dateOfBirth/g, "Geburtstag");
    var result = result.replace(/nationality/g, "Nationalität");
    var myArr = JSON.parse(result);

    var fahrer = myArr.MRData.DriverTable.Drivers;


    var col = [];
    for (var i = 0; i < fahrer.length; i++) {
        for (var key in fahrer[i]) {
            if (key == "url") {} else if (key == "permanentNumber") {} else if (key == "driverId") {} else {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }
    }


    var table = document.createElement("table");
    table.setAttribute("id", "fahretabelle"); //hier wird id eingefügt um mit css zuzugreifen


    var tr = table.insertRow(-1);

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    for (var i = 0; i < fahrer.length; i++) {

        tr = table.insertRow(-1);

        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = fahrer[i][col[j]];
        }
    }

    var divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}