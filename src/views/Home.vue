<template>
	<main>
		<section class='mb-8 py-20 text-white text-center relative'>
			<div style='background-image: url(images/header.png)' class='absolute inset-0 w-full h-full bg-contain introduction-background'></div>
			<div class='container mx-auto'>
				<div class='text-white main-header-content'>
					<h1 class='font-bold text-5xl mb-5'>Listen to WholeSome Sounds!</h1>
					<p class='w-full md:w-8/12 mx-auto'>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
						et dolor mollis, congue augue non, venenatis elit. Nunc justo eros,
						suscipit ac aliquet imperdiet, venenatis et sapien. Duis sed magna
						pulvinar, fringilla lorem eget, ullamcorper urna.
					</p>
				</div>
			</div>
			<img src='images/hero.png' class='relative block mx-auto mt-5 -mb-20 w-auto max-w-full' />
		</section>
		<section class='container mx-auto'>
			<div class='bg-white rounded border border-gray-200 relative flex flex-col'>
				<div class='px-6 pt-6 pb-5 font-bold border-b border-gray-200' v-icon='"headphones-alt"'>
					<span class='card-title'>Sounds</span>
				</div>
				<ol id='playlist'>
					<SoundItem v-for='sound in sounds' :key='sound.documentID' :sound='sound' />
				</ol>
			</div>
		</section>
	</main>
</template>

<script>
	import { soundsCollection } from '@/includes/fireBase';
	import SoundItem from '@/components/SoundItem.vue';

	export default {
		name: 'Home',
		components: { SoundItem },
		data() {
			return {
				sounds: [],
				resultsPerPage: 19,
				pending: false
			};
		},
		async created() {
			this.getSounds();
			
			window.addEventListener('scroll', this.handleScroll);
		},
		methods: {
			async getSounds() {
				if (this.pending) return;

				this.pending = true;

				let snapShots;

				if (this.sounds.length) {
					const lastDocument = await soundsCollection.doc(this.sounds[this.sounds.length - 1].documentID).get();

					snapShots = await soundsCollection.orderBy('modifiedName').startAfter(lastDocument).limit(this.resultsPerPage).get();
				} else {
					snapShots = await soundsCollection.orderBy('modifiedName').limit(this.resultsPerPage).get();
				};

				snapShots.forEach(document => {
					this.sounds.push({documentID: document.id, ...document.data()});
				});

				this.pending = false;
			},
			handleScroll() {
				const { innerHeight } = window;
				const { offsetHeight, scrollTop } = document.documentElement;

				const scrolledToBottomOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight;

				if (scrolledToBottomOfWindow) {
					this.getSounds();
				};
			}
		},
		beforeUnmount() {
			window.removeEventListener('scroll', this.handleScroll);
		}
	};
</script>