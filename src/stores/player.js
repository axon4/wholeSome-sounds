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
		},
		async toggleAudio() {
			if (this.audio.playing) {
				this.audio[this.audio.playing() ? 'pause' : 'play']();
			};
		}
	},
	getters: {
		playing: state => state.audio.playing ? state.audio.playing() : false
	}
});

export default usePlayerStore;