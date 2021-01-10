$(document).ready(function () {
    getTeams();
});

function getTeams() {
    let dropdown = $('#team-dropdown');

    dropdown.empty();
    dropdown.append($('<option></option>').attr('value', "").text("Choose your team"));

    $.ajax({
        url: "https://muslimathleticassociation.org:3001/api/soccer/getTeamNames",
        method: "GET",
        type: "https"
    }).done((res) => {
        console.log(res);
        console.log(res.data);
        for (var team = 0; team < res.data.length; team++) {
            dropdown.append($('<option></option>').attr('value', res.data[team].name).text(res.data[team].name));
            console.log(res.data[team].name + " appended")
        }
    }).catch((res) => {
        console.log("Could not fetch teams.", res);
    })
}

function addMatch(){

}

function getTeamMatches(){

}

function getAllMatches(){
    
}