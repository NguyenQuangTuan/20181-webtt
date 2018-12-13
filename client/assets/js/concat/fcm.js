firebase.initializeApp({
  'messagingSenderId': '54259377278'
})
const messaging = firebase.messaging().useServiceWorker();
function initFirebaseMessagingRegistration() {
  messaging
      .requestPermission()
      .then(function () {
          console.log("Got notification permission");
          return messaging.getToken();
      })
      .then(function (token) {
          // print the token on the HTML page
          console.log(token)
      })
      .catch(function (err) {
          alert(err)
      });
}
messaging.onMessage(function (payload) {
  alert(payload.notification.body);
});
messaging.onTokenRefresh(function () {
  messaging.getToken()
      .then(function (refreshedToken) {
          console.log('Token refreshed.');
          tokenElement.innerHTML = "Token is " + refreshedToken;
      }).catch(function (err) {
          errorElement.innerHTML = "Error: " + err;
          console.log('Unable to retrieve refreshed token ', err);
      });
});

initFirebaseMessagingRegistration();