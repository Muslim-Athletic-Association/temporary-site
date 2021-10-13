const API_URL = "https://muslimathleticassociation.org:3001/api"; // This should be an env variable.

async function apiPOST(path, body = {}) {
  return await $.ajax({
    url: API_URL + path,
    type: "POST",
    data: body,
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

$(".accordion-header-title").click(function () {
  if ($(".accordion-header-icon").css("transform") == "none") {
    $(".accordion-header-icon").css("transform", "rotate(180deg)");
  } else {
    $(".accordion-header-icon").css("transform", "");
  }
});

$(document).ready(async function () {
  let colors = [
    "PINK/GRAY",
    "PURPLE/GOLD",
    "PURPLE",
    "GREEN",
    "YELLOW",
    "RED",
    "BLUE",
    "ORANGE",
    "BLACK",
    "BEIGE",
  ];
  colors.sort();
  await getTeams(colors);
  setup_alerts();
  $("#captain-alert").hide();
});

function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

function showGuardian() {
  guardian = true;
  $("#guardian-title").show(400);
  $("#guardian-info").show(400);
  $("#guardian-sign").show(400);
  $("#guardian-terms").prop("required", true);
  $("#guardian-phone").prop("required", true);
  $("#guardian-email").prop("required", true);
  $("#guardian-name").prop("required", true);
}

function hideGuardian() {
  guardian = false;
  $("#guardian-info").hide(400);
  $("#guardian-title").hide(400);
  $("#guardian-sign").hide(400);
  $("#guardian-terms").prop("required", false);
  $("#guardian-phone").prop("required", false);
  $("#guardian-email").prop("required", false);
  $("#guardian-name").prop("required", false);
}

function checkTerms() {
  var terms = $(".term-check").get();
  for (var i = 0; i < terms.length; i++) {
    if ($(terms[i]).is(":visible") && $(terms[i]).is(":required")) {
      if (!$(terms[i]).is(":checked")) {
        console.log("Not all required terms have been checked.");
        $("#alert-message").html(
          "Please select all required consent checks. <br> Please contact us at info@maaweb.org if you think there is an issue."
        );
        $("#alert").slideDown();
        return false;
      }
    }
  }
  return true;
}

function getTime() {
  return new Date().toISOString().slice(0, 19).replace("T", " ");
}

function registration_validation(inputs) {
  if (!checkTerms()) {
    return false;
  }
  keys = Object.keys(inputs);
  values = Object.values(inputs);
  for (let v = 0; v < values.length; v++) {
    console.log(keys[v], values[v]);
    if (!values[v]) {
      $("#alert-message").html(
        `${keys[v]
          .split("_")
          .join(
            " "
          )} must be filled in <br> Phone or Text 416-556-6718 or Email info@maaweb.org if you think there is an issue.
          If you are using a Safari browser, try using chrome.`
      );
      $("#alert").slideDown();
      return false;
    }
  }

  if (
    $("#guardian-info").is(":visible") &&
    ($("#guardian-name").val() == "" ||
      $("#guardian-phone").val() == "" ||
      $("#guardian-email").val() == "")
  ) {
    $("#alert-message").html(
      "Please fill in your guardian information." +
        "<br> Phone or Text 416-556-6718 or Email info@maaweb.org if you think there is an issue."
    );
    $("#alert").slideDown();
    return false;
  }
  return true;
}

async function createTeam2() {
  let captainInput = {
    first_name: $("#captain-first_name").val(),
    last_name: $("#captain-last_name").val(),
    phone: $("#captain-phone").val(),
    email: $("#captain-email").val(),
    birthday: $("#captain-birthday").val(),
    color: $("#jersey_color").val(),
    gender: "Male",
    program: "Basketball",
    team_name: $("#captain-team-name").val(),
    datetime: getTime(),
    group_id: 2,
    subscription: 2,
    team_capacity: 10,
    consent: [
      { given: "true", purpose: "Basketball League Agreement" },
      { given: "true", purpose: "Basketball Contact" },
    ],
    guardian: {
      email: $("#guardian-email").val(),
      phone: $("#guardian-phone").val(),
      full_name: $("#guardian-name").val(),
    },
  };
  // We should probably ensure that the captains is 18+ too
  if (registration_validation(captainInput)) {
    return await apiPOST("/team/create", captainInput).then((res) => {
      $("#alert-message").html(
        `${res.error} <br> Phone or Text 416-556-6718 or Email info@maaweb.org if you think there is an issue.`
      );
      let returning = $("#captain-attendance").val();
      if (res.success && returning == "Yes") {
        window.location =
          "https://checkout.square.site/merchant/MLX4BNZVQWGK4/checkout/OJDNT6YTB4ESJXOZDHUL5KDU";
      } else if (res.success) {
        window.location =
          "https://checkout.square.site/merchant/MLX4BNZVQWGK4/checkout/2XPWG2VXYRNORLXOIFT63GSL";
      }
    });
  }
}

function setup_alerts() {
  var close = document.getElementsByClassName("closebtn");
  var i;

  // Loop through all close buttons
  for (i = 0; i < close.length; i++) {
    // When someone clicks on a close button
    close[i].onclick = function () {
      $(".captain-alert").hide();
    };
  }
}

function errorSlide(eDivName, eMessageDiv, errorMessage) {
  $(eMessageDiv).html(
    errorMessage +
      "<br> Please contact us at info@maaweb.org if you think there is an issue."
  );
  $(eDivName).slideDown();
}

function getCookieValues() {
  str = document.cookie.split("; ");
  var result = {};
  for (var i = 0; i < str.length; i++) {
    var cur = str[i].split("=");
    result[cur[0]] = cur[1];
  }
  return result;
}

async function getTeams(colors) {
  let dropdown = $("#team_name");
  let colors_dropdown = $("#jersey_color");
  // var colors was defined when the document loaded.
  dropdown.empty();
  dropdown.append(
    $("<option></option>").attr("value", "").text("Choose your team")
  );
  let competition = "Gaurd Up League (Men's)";
  await apiGET(`/${competition.split(" ").join("%20")}/getTeams`)
    .then((res) => {
      teams = [];
      picked_colors = [];
      for (var team = 0; team < res.data.length; team++) {
        teams.push(res.data[team].team_name);
        picked_colors.push(res.data[team].color);
        console.log(res.data[team]);
      }
      teams.sort();
      for (var team = 0; team < teams.length; team++) {
        dropdown.append(
          $("<option></option>").attr("value", teams[team]).text(teams[team])
        );
      }
      console.log(picked_colors);
      for (var color = 0; color < colors.length; color++) {
        if (picked_colors.indexOf(colors[color]) == -1) {
          console.log(colors[color]);
          colors_dropdown.append(
            $("<option></option>")
              .attr("value", colors[color])
              .text(colors[color])
          );
        }
      }
    })
    .catch((res) => {
      console.log("Could not fetch teams.", res);
    });
}
