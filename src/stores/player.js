import { defineStore } from 'pinia';
import { Howl } from 'howler';

const usePlayerStore = defineStore('player', {
	state: () => ({
		currentSound: {},
		audio: {},
		seek: '00:00',
		duration: '00:00'
	}),
	actions: {
		async newSound(sound) {
			this.currentSound = sound;
			this.audio = new Howl({
				src: [sound.URL],
				html5: true
			});

			this.audio.play();

			this.audio.on('play', () => {
				requestAnimationFrame(this.progress);
			});
		},
		async toggleAudio() {
			if (this.audio.playing) {
				this.audio[this.audio.playing() ? 'pause' : 'play']();
			};
		},
		progress() {
			this.seek = this.audio.seek();
			this.duration = this.audio.duration();

			if (this.audio.playing()) {
				requestAnimationFrame(this.progress);
			};
		}
	},
	getters: {
		playing: state => state.audio.playing ? state.audio.playing() : false
	}
});

export default usePlayerStore;