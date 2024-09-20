import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyAoDqXHX1i3WoR30rSbSYIXyt6TDUIOpbg",
	authDomain: "fiesta-inn-b8e0f.firebaseapp.com",
	projectId: "fiesta-inn-b8e0f",
	storageBucket: "fiesta-inn-b8e0f.appspot.com",
	messagingSenderId: "446772452195",
	appId: "1:446772452195:web:f54455e9a9e725ae575156",
	measurementId: "G-FJ7NRL7HR0",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
