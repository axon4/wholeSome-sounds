<template>
	<section class='container mx-auto mt-6'>
		<div class='md:grid md:grid-cols-3 md:gap-4'>
			<div class='col-span-1'>
				<UpLoader ref='upLoader' :addSound='addSound' />
			</div>
			<div class='col-span-2'>
				<div class='bg-white rounded border border-gray-200 relative flex flex-col'>
					<div class='px-6 pt-6 pb-5 font-bold border-b border-gray-200'>
						<span class='card-title'>{{ $t('manage.my_sounds') }}</span>
						<i class='fa fa-compact-disc float-right text-green-400 text-2xl'></i>
					</div>
					<div class='p-6'>
						<CompositionItem v-for='(sound, index) in sounds' :key='sound.documentID' :index='index' :sound='sound' :updateSound='updateSound' :removeSound='removeSound' :updateUnSavedChangesFlag='updateUnSavedChangesFlag' />
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import { authentication, soundsCollection } from '@/includes/fireBase';
	import UpLoader from '@/components/UpLoader.vue';
	import CompositionItem from '@/components/CompositionItem.vue';

	export default {
		name: 'manage',
		components: { UpLoader, CompositionItem },
		data() {
			return {
				sounds: [],
				unSavedChangesFlag: false
			};
		},
		async created() {
			const snapShot = await soundsCollection.where('uID', '==', authentication.currentUser.uid).get();
			
			snapShot.forEach(this.addSound);
		},
		beforeRouteLeave(to, from, next) {
			if (!this.unSavedChangesFlag) {
				next();
			} else {
				const leave = confirm('You Have UnSaved Changes. Do You Want To Leave This Page?');

				next(leave);
			};
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
			},
			removeSound(index) {
				this.sounds.splice(index, 1);
			},
			addSound(document) {
				const sound = {documentID: document.id, ...document.data()};
				
				this.sounds.push(sound);
			},
			updateUnSavedChangesFlag(boolean) {
				this.unSavedChangesFlag = boolean;
			}
		}
	};
</script>