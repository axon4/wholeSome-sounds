<template>
	<section class='container mx-auto mt-6'>
		<div class='md:grid md:grid-cols-3 md:gap-4'>
			<div class='col-span-1'>
				<UpLoader ref='upLoader' />
			</div>
			<div class='col-span-2'>
				<div class='bg-white rounded border border-gray-200 relative flex flex-col'>
					<div class='px-6 pt-6 pb-5 font-bold border-b border-gray-200'>
						<span class='card-title'>My Sounds</span>
						<i class='fa fa-compact-disc float-right text-green-400 text-2xl'></i>
					</div>
					<div class='p-6'>
						<SoundItem v-for='(sound, index) in sounds' :key='sound.documentID' :index='index' :sound='sound' :updateSound='updateSound' />
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import { authentication, soundsCollection } from '@/includes/fireBase';
	import UpLoader from '@/components/UpLoader.vue';
	import SoundItem from '@/components/SoundItem.vue';

	export default {
		name: 'manage',
		components: { UpLoader, SoundItem },
		data() {
			return {sounds: []};
		},
		async created() {
			const snapShot = await soundsCollection.where('uID', '==', authentication.currentUser.uid).get();
			
			snapShot.forEach(document => {
				const sound = {...document.data(), documentID: document.id};
				
				this.sounds.push(sound);
			});
		},
		// beforeRouteEnter(to, from, next) {
		// 	if (userStore.state.loggedIn) {
		// 		next();
		// 	} else {
		// 		next({name: 'home'});
		// 	};
		// },
		// beforeRouteLeave(to, from, next) {
		// 	this.$refs.upLoader.cancelUpLoads();
						
		// 	next();
		// }
		methods: {
			updateSound(index, values) {
				this.sounds[index].modifiedName = values.modifiedName;
				this.sounds[index].genre = values.genre;
			}
		}
	};
</script>