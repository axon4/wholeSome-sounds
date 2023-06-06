import { defineStore } from 'pinia';
import { authentication, usersCollection } from '@/includes/fireBase';

const useUserStore = defineStore('user', {
	state: () => ({loggedIn: false}),
	actions: {
		async createUser({ name, age, eMail, passWord, country }) {
			const userCredential = await authentication.createUserWithEmailAndPassword(eMail, passWord);
			await usersCollection
				.doc(userCredential.user.uid)
				.set({ name, age, eMail, country });
			await userCredential.user.updateProfile({displayName: name});

			this.loggedIn = true;
		},
		async logIn({ eMail, passWord }) {
			await authentication.signInWithEmailAndPassword(eMail, passWord);
			
			this.loggedIn = true;
		}
	}
});

export default useUserStore;