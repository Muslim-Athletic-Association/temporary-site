$(document).ready(function () {
    getStandings();
    getSchedule();
});

function getStandings() {
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

function getSchedule() {
    $.ajax({
        url: "http://offlinequran.com:3001/api/fixtures/1",
        //url: "https://muslimathleticassociation.org:3001/api/fixtures/1",
        method: "GET"
    })
        .done((res) => {
            console.log(res);
            console.log(res.data);

            fixtures = res.data;

            fixtures.forEach(function(fixture) {
                fixture.date = moment(fixture.fixture_date.slice(0,fixture.fixture_date.indexOf("T"))).format("ddd, MMM DD");
            });

            fixtures.forEach(function(fixture) {
                fixture.time = moment(fixture.fixture_time, "HH:mm:ss").format("h:mm A");
            });


            for (var fixture = 0; fixture < fixtures.length; fixture++) {
                $("#schedule tbody").append("<tr>" +
                "<td>" + fixtures[fixture].team1 +
                "<td>" + fixtures[fixture].score1 +
                "<td>" + fixtures[fixture].score2 +
                "<td>" + fixtures[fixture].team1 +
                "<td>" + fixtures[fixture].date +
                "<td>" + fixtures[fixture].time +
                "</tr>");
            }

        })
        .catch((res) => {
            console.log("Could not fetch fixtures.", res);
        });
}