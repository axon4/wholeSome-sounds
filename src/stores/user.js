import { defineStore } from 'pinia';
import { authentication, usersCollection } from '@/includes/fireBase';

const useUserStore = defineStore('user', {
	state: () => ({loggedIn: false}),
	actions: {
		async createUser({ name, age, eMail, passWord, country }) {
			const credentials = await authentication.createUserWithEmailAndPassword(eMail, passWord);
			await usersCollection
				.doc(credentials.user.uid)
				.set({ name, age, eMail, country });
			await credentials.user.updateProfile({displayName: name});

			this.loggedIn = true;
		},
		async logIn({ eMail, passWord }) {
			await authentication.signInWithEmailAndPassword(eMail, passWord);
			
			this.loggedIn = true;
		},
		async logOut() {
			await authentication.signOut();
			
			this.loggedIn = false;
		}
	}
});

export default useUserStore;