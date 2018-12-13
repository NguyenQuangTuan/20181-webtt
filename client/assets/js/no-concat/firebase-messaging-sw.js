importScripts('https://www.gstatic.com/firebasejs/4.13.0/firebase-app.js')
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
    let { title } = notification;
    let notificationOptions = {
        body: "Bạn có một thông báo mới",
        icon: '../img/test.jpg'
    };
    let notificationTitle = "Ting ting"
    switch (title) {
        case "POST_CREATED":
            notificationOptions.body = `${notification.full_name} đã đăng bài viết mới "${notification.title}"`
            break
        case "REVIEW_CREATED":
            if (notification.review) {
                notificationOptions.body = `${notification.review.full_name} đã review một bài viết của bạn`
            }
            break
        case "SUB_REVIEW_CREATED":
            if (notification.sub_review) {
                notificationOptions.body = `${notification.sub_review.full_name} đã trả lời một review của bạn`
            }
            break
    }

    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});

self.addEventListener('activate', event => {
    console.log('V1 now ready to handle fetches!');
});