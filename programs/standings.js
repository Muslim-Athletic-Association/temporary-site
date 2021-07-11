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

            teams = res.data;
            //add goal_difference
            teams.forEach(function (element) {
                element.goal_difference = element.goals_for - element.goals_against;
              });
            
            //add points
            teams.forEach(function (element) {
                element.points = (element.wins*3) + (element.ties);
              });

            //sort by points
            teams.sort((a, b) => b.points - a.points);

            for (var team = 0; team < teams.length; team++) {
                $("#standings tbody").append("<tr>" +
                "<td>" + teams[team].team_name +
                "<td>" + teams[team].fixtures_played +
                "<td>" + teams[team].wins +
                "<td>" + teams[team].ties +
                "<td>" + teams[team].losses +
                "<td>" + teams[team].goals_for +
                "<td>" + teams[team].goals_against +
                "<td>" + teams[team].goal_difference +
                "<td>" + teams[team].points +
                "</tr>");
            }

        })
        .catch((res) => {
            console.log("Could not fetch teams.", res);
        });
}