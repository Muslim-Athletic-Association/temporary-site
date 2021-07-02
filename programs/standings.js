$(document).ready(function () {
    getStandings();
});

function getStandings() {

    let standings = $("#standings");

    $.ajax({
        url: "http://offlinequran.com:3001/api/Men's%20League/getTeams",
        //url: "https://muslimathleticassociation.org:3001/api/Men's%20League/getTeams",
        method: "GET"
    })
        .done((res) => {
            console.log(res);
            console.log(res.data);
            for (var team = 0; team < res.data.length; team++) {
                var goal_difference = res.data[team].goals_for - res.data[team].goals_against;
                var points = (res.data[team].wins * 3) + (res.data[team].ties);
                $("#standings tbody").append("<tr>" +
                "<td>" + res.data[team].team_name +
                "<td>" + res.data[team].fixtures_played +
                "<td>" + res.data[team].wins +
                "<td>" + res.data[team].ties +
                "<td>" + res.data[team].losses +
                "<td>" + res.data[team].goals_for +
                "<td>" + res.data[team].goals_against +
                "<td>" + goal_difference +
                "<td>" + points +
                "</tr>");
            }

        })
        .catch((res) => {
            console.log("Could not fetch teams.", res);
        });
}