import { defineStore } from 'pinia';

const useAuthenticationModalStore = defineStore('authenticationModal', {
	state: () => ({isOpen: false}),
	getters: {
		hiddenClass(state) {
			return state.isOpen ? '' : 'hidden';
		}
	}
});

export default useAuthenticationModalStore;