firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        const displayName = user.displayName;
        const email = user.email;
        const emailVerified = user.emailVerified;
        const photoURL = user.photoURL;
        const isAnonymous = user.isAnonymous;
        const uid = user.uid;
        const providerData = user.providerData;
        document.getElementById('login-button').innerHTML = 'Logout';
        if (displayName === null) {
            window.location = "/student-registration.html";
        } else {
            document.getElementById('greetings').innerHTML = 'HELLO ' + displayName.toUpperCase() + '!<br/>WELCOME TO Internship Fair 2019';
        }
        console.log("user change", user);
    } else {
        document.getElementById('greetings').innerHTML = 'HELLO! WELCOME TO Internship Fair 2019';
        document.getElementById('login-button').innerHTML = 'Login';
    }
});


let authUIConfiguration = {
    signInFlow: 'popup',
    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            authUIContainer.style.display = "none";
            var isNewUser = authResult.additionalUserInfo.isNewUser;
            if (isNewUser) {
                window.location = "/student-registration.html";
                var user = authResult.user;
                firebase.firestore().collection('students').document(user.uid).set({
                    userId: user.uid,
                    phoneNumber: user.phoneNumber,
                    creationTime: firebase.firestore.FieldValue.serverTimestamp()
                }).then(function () {
                    console.error("Successfull: ");
                }).catch(function (error) {
                    console.error("Error writing document: ", error);
                })
            }
            return false;
        },
        signInFailure: function (error) {
            return handleUIError(error);
        },
        uiShown: function () {
            document.getElementById('loader').style.display = 'none';
        }
    },
    signInOptions: [
        {
            provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
            defaultCountry: 'IN',
            recaptchaParameters: {
                type: 'image', // 'audio'
                size: 'invisible', // 'invisible' or 'compact'
                badge: 'bottomleft' //' bottomright' or 'inline' applies to invisible.
            },
        }
    ],
    tosUrl: '<your-tos-url>',
    privacyPolicyUrl: function () {
        window.location.assign('<your-privacy-policy-url>');
    }
};
const authUI = new firebaseui.auth.AuthUI(firebase.auth());

const loginButton = document.getElementById('login-button');
const authUIContainer = document.getElementById('firebaseui-auth-container');
loginButton.onclick = function () {
    if (firebase.auth().currentUser) {
        firebase.auth().signOut().then(() => {
        }).catch((error) => {
            console.log(error);
        });
        return;
    }
    authUIContainer.style.display = "block";
    authUI.start('#firebaseui-auth-container', authUIConfiguration);
};

window.onclick = function (event) {
    if (event.target === authUIContainer) {
        authUIContainer.style.display = "none";
    }
};