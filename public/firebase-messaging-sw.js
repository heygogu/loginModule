importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js')

const firebaseConfig = {
  apiKey: '',
  authDomain: 'auth-57b96.firebaseapp.com',
  projectId: 'auth-57b96',
  storageBucket: 'auth-57b96.appspot.com',
  messagingSenderId: '645208700668',
  appId: '1:645208700668:web:c3c55cfc68bc3b08934979',
  measurementId: 'G-W4WGY2DQ44'
}

firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload)
  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})
