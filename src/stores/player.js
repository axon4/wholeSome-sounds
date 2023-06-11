import { defineStore } from 'pinia';
import { Howl } from 'howler';
import formatTime from '@/utility/formatTime';

const usePlayerStore = defineStore('player', {
	state: () => ({
		currentSound: {},
		audio: {},
		seek: '00:00',
		duration: '00:00',
		playerProgress: '0%'
	}),
	actions: {
		async newSound(sound) {
			if (this.audio instanceof Howl) {
				this.audio.unload();
			};

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
			this.seek = formatTime(this.audio.seek());
			this.duration = formatTime(this.audio.duration());

			this.playerProgress = `${(this.audio.seek() / this.audio.duration()) * 100}%`;

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