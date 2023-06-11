import { defineStore } from 'pinia';

const usePlayerStore = defineStore('player', {
	state: () => ({
		currentSound: {}
	}),
	actions: {
		async newSound(sound) {
			this.currentSound = sound;
		}
	}
});

export default usePlayerStore;