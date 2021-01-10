
function contactus() {
    $.ajax({
        url: "https://muslimathleticassociation.org:3001/api/mail/contactus",
        method: "POST",
        data: {
            email: $("#email").val(),
            subject: $("#subject").val(),
            name: $("#name").val(),
            message: $("#message").val()
        },
        type: "https"
    }).then((response) => {
        console.log(response)
        if (response.status == 200) {
            console.log("Registration input is valid. User May continue registration.");
            alert("Thank you for contacting us, we have recieved your message, we will be in contact with you shortly.")
        }
    })
}