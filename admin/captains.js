const API_URL = "http://localhost:3001/api"; // This should be an env variable.

async function apiPOST(path, body = {}) {
    return await $.ajax({
        url: API_URL + path,
        type: "POST",
        data: body,
        cache: false,
        dataType: "text json",
    })
        .done((res) => {
            console.log(res);
            return res;
        })
        .catch((err) => {
            console.log(err.responseJSON);
            return err.responseJSON;
        });
}

async function apiGET(path) {
    return await $.ajax({
        url: API_URL + path,
        type: "GET",
        dataType: "text json",
    })
        .done((res) => {
            console.log(res);
            return res;
        })
        .catch((err) => {
            console.log(err.responseJSON);
            return err.responseJSON;
        });
}

// The above code is also in utils.js and should be replaced by that file when we figure out imports.

async function getTeams() {
    let competition = "Gaurd Up League (Men's)";
    return await apiGET(`/${competition.split(" ").join("%20")}/getCaptains`)
        .then((res) => {
            return res;
        })
        .catch((res) => {
            console.log("Could not fetch teams.", res);
            return false;
        });
}

async function CreateTableFromJSON() {
    var gt = await getTeams();
    if (gt == false) {
        return false;
    }
    let captains = gt.data;
    console.log("???");
    // EXTRACT VALUE FOR HTML HEADER.
    // ('Book ID', 'Book Name', 'Category' and 'Price')
    var col = [];
    for (var i = 0; i < captains.length; i++) {
        for (var key in captains[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    // CREATE DYNAMIC TABLE.
    var table = document.createElement("table");

    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

    var tr = table.insertRow(-1); // TABLE ROW.

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th"); // TABLE HEADER.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (var i = 0; i < captains.length; i++) {
        tr = table.insertRow(-1);

        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = captains[i][col[j]];
        }
    }

    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    var divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}
