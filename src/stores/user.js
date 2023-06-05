import { defineStore } from 'pinia';

const useUserStore = defineStore('user', {
	state: () => ({loggedIn: false})
});

export default useUserStore;