import { defineStore } from 'pinia';
import { Howl } from 'howler';
import forMatTime from '@/utility/forMatTime';

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
			this.seek = forMatTime(this.audio.seek());
			this.duration = forMatTime(this.audio.duration());

			this.playerProgress = `${(this.audio.seek() / this.audio.duration()) * 100}%`;

			if (this.audio.playing()) {
				requestAnimationFrame(this.progress);
			};
		},
		upDateSeek(event) {
			if (this.audio.playing) {
				const { x, width } = event.currentTarget.getBoundingClientRect();
				const clickX = event.clientX - x;
				const percentage = clickX / width;
				const seconds = this.audio.duration() * percentage;

				this.audio.seek(seconds);
				this.audio.once('seek', this.progress);
			};
		}
	},
	getters: {
		playing: state => state.audio.playing ? state.audio.playing() : false
	}
});

export default usePlayerStore;