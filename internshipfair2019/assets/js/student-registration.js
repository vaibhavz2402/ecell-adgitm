firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        if (user.displayName.length > 1)
            window.location = ("/");
        const loginButton = document.getElementById('telephone');
        loginButton.value = user.phoneNumber;
    } else {
        window.location = ("/");
    }
});

document.getElementById('register-form').onsubmit = function () {
    const user = {
        displayName: document.getElementById('name').value,
        emate: document.getElementById('state').value,
        university: document.getElementById('university-name').value,
        colail: document.getElementById('email').value,
        stlege: document.getElementById('college-name').value,
    };
    if (user.displayName.length < 3) {
        alert('Provide a valid name');
        return;
    }
    firebase.auth().currentUser.updateProfile({
        displayName: user.displayName,
    }).then(() => {
        firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
            .set(user)
            .then(() => {
                alert("Profile Updated");
                window.location = "/";
            })
            .catch(error => {
                console.log(error);
            });
    }).catch((error) => {
        console.log(error);
    });
    return false;
};