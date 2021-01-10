// This file sends requests and handles dynamic displays for registration

var guardian = false;

$(document).ready(function () {
  getTeams();
  hideGuardian();
  $("#birthday").change(function () {
    var age = getAge($(this).val());
    if (age < 18) {
      showGuardian();
    } else {
      hideGuardian();
    }
  });
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
  $("#guardian-terms").prop('required', true);
  $("#guardian-phone").prop('required', true);
  $("#guardian-email").prop('required', true);
  $("#guardian-fname").prop('required', true);
  $("#guardian-lname").prop('required', true);
}

function hideGuardian() {
  guardian = false;
  $("#guardian-info").hide(400);
  $("#guardian-title").hide(400);
  $("#guardian-sign").hide(400);
  $("#guardian-terms").prop('required', false);
  $("#guardian-phone").prop('required', false);
  $("#guardian-email").prop('required', false);
  $("#guardian-fname").prop('required', false);
  $("#guardian-lname").prop('required', false);
}


function addGuardian(member) {

  $.ajax({
    url: "https://muslimathleticassociation.org:3001/api/addGuardian",
    data: {
      email: $("#guardian-email").val(),
      phone: $("#guardian-phone").val(),
      fname: $("#guardian-firstName").val(),
      lname: $("#guardian-lastName").val(),
      member: member
    },
    type: "POST",
    dataType: 'text json'
  }).done((res) => {
    console.log(res);
    if (res.success == true) {
      console.log("Registration successful!");
      window.location.replace("thanks.html")
    } else {
      console.log("Registration failed.");
      $('.error-message').slideDown().html(res.error + '<br> Please contact us at info@maaweb.org if you think there is an issue.');
    }
  }).catch((res) => {
    console.log("Registration failed.", res);
    $('.error-message').slideDown().html(res.error + '<br> Please contact us at info@maaweb.org if you think there is an issue.');
  })
}

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

function validateProgram() {
  console.log(formValid())
  if (!formValid()) {
    console.log("Form inputs invalid")
    return false;
  }

  if ($("#team-dropdown").val() == "") {
    console.log("User must first choose a team.")
    return false;
  }

  if (!$("#guardian-terms").is(":checked") && $("#guardian-terms").is(":visible")) {
    console.log("User must first read and accept the guardian terms.")
    return false;
  }

  if ($("#terms").is(":checked")) {
    registerPlayer();
  } else {
    console.log("User must first read and accept the waiver.")
    return false;
  }
}

function registerPlayer() {
  $.ajax({
    url: "https://muslimathleticassociation.org:3001/api/soccer/registerPlayer",
    data: {
      fname: $("#firstName").val(),
      lname: $("#lastName").val(),
      phone: $("#phone").val(),
      email: $("#email").val(),
      birthday: $("#birthday").val(),
      gender: "Male",
      name: $("#team-dropdown").val(),
      program: "mens over 18 soccer league covid 1",
      division: 1
    },
    type: "POST",
    dataType: 'text json'
  }).done((res) => {
    console.log(res);
    if (guardian) {
      addGuardian(res.data[0].member);
      return;
    }
    if (res.success == true) {
      console.log("Registration successful!");
      window.location.replace("thanks.html")
      return;
    } else {
      console.log("Registration failed.");
      $('.error-message').slideDown().html(res.error + '<br> Please contact us at info@maaweb.org if you think there is an issue.');
      return;
    }
  }).catch((res) => {
    console.log("Registration failed.", res.responseJSON.ecode);
    if (res.responseJSON.ecode == 3) {
      $('.error-message').slideDown().html("Please ensure you have filled out everything correctly." + '<br> Contact us at info@maaweb.org if you think there is an issue.');
      return;
    }
    $('.error-message').slideDown().html(res.responseJSON.error + '<br> Please contact us at info@maaweb.org if you think there is an issue.');
  })
}

function formValid() {

  var f = $("form.php-email-form").find('.form-group'),
    ferror = false,
    emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

  //Deal with inputs
  f.children('input').each(function () { // run all inputs

    var i = $(this); // current input
    var rule = i.attr('data-rule');

    if(!i.is(":visible")){
	return true;
    }

    if (rule !== undefined) {
      var ierror = false; // error flag for current input
      var pos = rule.indexOf(':', 0);
      if (pos >= 0) {
        var exp = rule.substr(pos + 1, rule.length);
        rule = rule.substr(0, pos);
      } else {
        rule = rule.substr(pos + 1, rule.length);
      }

      switch (rule) {
        case 'required':
          if (i.val() === '') {
            ferror = ierror = true;
          }
          break;

        case 'minlen':
          if (i.val().length < parseInt(exp)) {
            ferror = ierror = true;
          }
          break;

        case 'email':
          if (!emailExp.test(i.val())) {
            ferror = ierror = true;
          }
          break;

        case 'checked':
          if (!i.is(':checked')) {
            ferror = ierror = true;
          }
          break;

        case 'regexp':
          exp = new RegExp(exp);
          if (!exp.test(i.val())) {
            ferror = ierror = true;
          }
          break;
      }
      i.next('.validate').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
    }
  });

  // Deal with textareas
  f.children('textarea').each(function () { // run all inputs

    var i = $(this); // current input
    var rule = i.attr('data-rule');

    if(!i.is(":visible")){
	return true;
    }


    if (rule !== undefined) {
      var ierror = false; // error flag for current input
      var pos = rule.indexOf(':', 0);
      if (pos >= 0) {
        var exp = rule.substr(pos + 1, rule.length);
        rule = rule.substr(0, pos);
      } else {
        rule = rule.substr(pos + 1, rule.length);
      }

      switch (rule) {
        case 'required':
          if (i.val() === '') {
            ferror = ierror = true;
          }
          break;

        case 'minlen':
          if (i.val().length < parseInt(exp)) {
            ferror = ierror = true;
          }
          break;
      }
      i.next('.validate').html((ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
    }
  });
  if (ferror) return false;

  return true;
}
