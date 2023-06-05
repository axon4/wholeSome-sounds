import firebase from 'firebase/compat/app';

const configuration = {
	apiKey: 'AIzaSyBJfmVCuosiL8SF8HgiVTPxy3oTZwqrTWU',
	appId: '1:75512933610:web:da079731ab0f2e2da9fb93',
	projectId: 'wholesome-sounds',
	authDomain: 'wholesome-sounds.firebaseapp.com',
	storageBucket: 'wholesome-sounds.appspot.com',
	messagingSenderId: '75512933610'
};

const fireBase = firebase.initializeApp(configuration);

export default fireBase;