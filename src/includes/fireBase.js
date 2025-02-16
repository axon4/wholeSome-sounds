import FireBase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const configuration = {
	apiKey: 'AIzaSyBJfmVCuosiL8SF8HgiVTPxy3oTZwqrTWU',
	appId: '1:75512933610:web:da079731ab0f2e2da9fb93',
	projectId: 'wholesome-sounds',
	authDomain: 'wholesome-sounds.firebaseapp.com',
	storageBucket: 'wholesome-sounds.appspot.com',
	messagingSenderId: '75512933610'
};

const fireBase = FireBase.initializeApp(configuration);

export const authentication = fireBase.auth();

const fireStore = fireBase.firestore();

fireStore.enablePersistence().catch(console.error);

export const usersCollection = fireStore.collection('users');
export const soundsCollection = fireStore.collection('sounds');
export const commentsCollection = fireStore.collection('comments');

export const storage = fireBase.storage();

export default fireBase;