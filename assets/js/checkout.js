// This file sends requests and handles dynamic displays for registration

// const { Checkout } = require("square-connect");

// var teams = {};
// var team = {};

// $(document).ready(async function setUp(){
//     // await getTeams();
//     // console.log(teams);
// });


function goCheckout(){
    location.replace("https://checkout.square.site/pay/5bb01fdb13cb43a1a2c7d5b48e45a2f4")
}

function getTeams(){
    let dropdown = $('#team-dropdown');

    dropdown.empty();

    // dropdown.append('<option selected="true" disabled>Choose an unregistered team</option>');
    // dropdown.prop('selectedIndex', 0);

    $.ajax({
        url: "http://offlinequran.com:3001/api/getUnpaidTeams",
        method: "GET",
        type: "https"
    }).done((res) => {
        console.log(res);
        teams = res;
        $.each(data, function (key, team) {
            dropdown.append($('<option></option>').attr('value', team.name).text(team.name));
        })
    })
}