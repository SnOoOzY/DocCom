
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";



const firebaseConfig = {
    apiKey: import.meta.env.apiKey,
    authDomain: import.meta.env.authDomain,
    databaseURL: import.meta.env.databaseURL,
    projectId: import.meta.env.projectId,
    storageBucket: import.meta.env.storageBucket,
    messagingSenderId: import.meta.env.messagingSenderId,
    appId: import.meta.env.appId,
    measurementId: import.meta.env.measurementId
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const messagesRef = ref(database, 'messages');

document.getElementById('send-button').addEventListener('click', () => {
    const message = document.getElementById('message-input').value;
    if (message) {
        push(messagesRef, { text: message });
        document.getElementById('message-input').value = '';
    }
});

onChildAdded(messagesRef, (snapshot) => {
    const message = snapshot.val().text;
    console.log("New message received: ", message); 
    if (message) {
        const messageElement = document.createElement('p');
        messageElement.textContent = message;
        document.getElementById('messages').appendChild(messageElement);
    } else {
        console.log("empty message")
    }
});