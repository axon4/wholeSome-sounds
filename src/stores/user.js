import { defineStore } from 'pinia';
import { authentication, usersCollection } from '@/includes/fireBase';

const useUserStore = defineStore('user', {
	state: () => ({loggedIn: false}),
	actions: {
		async createUser({ name, age, eMail, passWord, country }) {
			await authentication.createUserWithEmailAndPassword(eMail, passWord);
			await usersCollection.add({ name, age, eMail, country });

			this.loggedIn = true;
		}
	}
});

export default useUserStore;