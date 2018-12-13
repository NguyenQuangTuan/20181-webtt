simportScripts('https://www.gstatic.com/firebasejs/4.13.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/4.13.0/firebase-messaging.js')

/*
Initialize the Firebase app 
*/
firebase.initializeApp({
    'messagingSenderId': '54259377278'
})

//Retrieve notification worker
const messaging = firebase.messaging()
messaging.setBackgroundMessageHandler(function (payload) {
    console.log('worker-payload', payload);
    const notification = JSON.parse(payload.notification.body);
    // Customize notification here
    const notificationTitle = notification.title;
    const notificationOptions = {
        body: notification.body,
        icon: 'https://kipalog.com/assets/static_icon/ktmt-756fbdb880a66654c047992af8c742bd.jpg'
    };
    $('#my-header').css('color', 'red');

    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});

self.addEventListener('activate', event => {
    console.log('V1 now ready to handle fetches!');
});