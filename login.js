(function () {
  var firebaseConfig = {
    apiKey: "AIzaSyBY5rpkm50plJUxUFdx91dp9K_l7B3xTKc",
    authDomain: "maacrm-ba986.firebaseapp.com",
    projectId: "maacrm-ba986",
    storageBucket: "maacrm-ba986.appspot.com",
    messagingSenderId: "666734854469",
    appId: "1:666734854469:web:be4babb95d28feed1afe2c",
    measurementId: "G-9BDKFXTM5H",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();

  // get elements
  const txtEmail = document.getElementById("txtEmail");
  const txtPassword = document.getElementById("txtPassword");
  const btnLogin = document.getElementById("btnLogin");
  const btnSignUp = document.getElementById("btnSignUp");
  const btnLogout = document.getElementById("btnLogout");

  // add login event
  btnSignUp.addEventListener("click", (e) => {
    const email = txtEmail.value;
    const password = txtPassword.value;

    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log("Signed up successfully!");
      })
      .catch((error) => {
        console.log(error);
      });
  });

  // Initialize the FirebaseUI Widget using Firebase.
  // var ui = new firebaseui.auth.AuthUI(firebase.auth());

  var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function (authResult, redirectUrl) {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        return true;
      },
      uiShown: function () {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById("loader").style.display = "none";
      },
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: "popup",
    signInSuccessUrl: "index.html",
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    ],
    // Terms of service url.
    tosUrl: "<your-tos-url>",
    // Privacy policy url.
    privacyPolicyUrl: "<your-privacy-policy-url>",
  };
  // ui.start("#firebaseui-auth-container", uiConfig);
})();
