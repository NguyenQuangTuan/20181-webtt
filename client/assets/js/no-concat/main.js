firebase.initializeApp({
    'messagingSenderId': '54259377278'
})

const messaging = firebase.messaging();



function initFirebaseMessagingRegistration() {
    navigator.serviceWorker.register('/js/firebase-messaging-sw.js')
        .then(function (reg) {
            messaging.useServiceWorker(reg);

            messaging.requestPermission()
                .then(function () {
                    console.log("Permission granted");
                    return messaging.getToken();
                })
                .then(function (token) {
                    console.log("Token: ", token);
                })
                .catch(function (err) {
                    console.log("Err: ", err);
                })
        }).catch(err => {
            console.log(err);
        })

}
messaging.onMessage(function (payload) {
    console.log("Message received. ", payload);
    $('#my-header').css('color', 'red');
});
messaging.onTokenRefresh(function () {
    messaging.getToken()
        .then(function (refreshedToken) {
            console.log('Token refreshed.', refreshedToken);
        }).catch(function (err) {
            console.log('Unable to retrieve refreshed token ', err);
        });
});

initFirebaseMessagingRegistration();