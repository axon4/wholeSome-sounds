import { defineStore } from 'pinia';
import { Howl } from 'howler';

const usePlayerStore = defineStore('player', {
	state: () => ({
		currentSound: {},
		audio: {}
	}),
	actions: {
		async newSound(sound) {
			this.currentSound = sound;
			this.audio = new Howl({
				src: [sound.URL],
				html5: true
			});

			this.audio.play();
		}
	}
});

export default usePlayerStore;