<template>
	<div class='bg-white rounded border border-gray-200 relative flex flex-col'>
		<div class='px-6 pt-6 pb-5 font-bold border-b border-gray-200'>
			<span class='card-title'>UpLoad</span>
			<i class='fas fa-upload float-right text-green-400 text-2xl' />
		</div>
		<div class='p-6'>
			<div class='w-full px-10 py-20 rounded text-center cursor-pointer border border-dashed border-gray-400 text-gray-400 transition duration-500 hover:text-white hover:bg-green-400 hover:border-green-400 hover:border-solid' :class='{ "text-white bg-green-400 border-green-400 border-solid": draggedOver }' @drag.prevent.stop='' @dragstart.prevent.stop='' @dragenter.prevent.stop='draggedOver = true' @dragover.prevent.stop='draggedOver = true' @dragleave.prevent.stop='draggedOver = false' @dragend.prevent.stop='draggedOver = false' @drop.prevent.stop='upLoad'>
				<h5>Drop Audio (MP3)</h5>
			</div>
			<input type='file' multiple @change='upLoad' />
			<hr class='my-6' />
			<div class='mb-4' v-for='upLoad in upLoads' :key='upLoad.name'>
				<div class='font-bold text-sm' :class='upLoad.textClass'>
					<i :class='upLoad.icon' />
					{{ upLoad.name }}
				</div>
				<div class='flex h-4 overflow-hidden bg-gray-200 rounded'>
					<div :style='{width: upLoad.progress + "%"}' class='transition-all progress-bar' :class='upLoad.variant' />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { authentication, soundsCollection, storage } from '@/includes/fireBase.js';

	export default {
		name: 'upLoader',
		props: ['addSound'],
		data() {
			return {
				draggedOver: false,
				upLoads: []
			};
		},
		methods: {
			upLoad($event) {
				this.draggedOver = false;

				const { files } = $event.dataTransfer ?? $event.target;

				Object.values(files).forEach(file => {
					if (file.type !== 'audio/mpeg') return;

					if (!navigator.onLine) {
						this.upLoads.push({
							name: file.name,
							task: {},
							progress: 100,
							icon: 'fas fa-times',
							textClass: 'text-red-400',
							variant: 'bg-red-400'
						});

						return;
					};

					const storageReference = storage.ref();
					const soundReference = storageReference.child(`sounds/${file.name}`);

					const task = soundReference.put(file);
					const upLoadIndex = this.upLoads.push({name: file.name, task, progress: 0, icon: 'fas fa-spin fa-spinner', textClass: '', variant: 'bg-blue-400'}) - 1;

					task.on('state_changed', snapShot => {
						const currentProgress = (snapShot.bytesTransferred / snapShot.totalBytes) * 100;

						this.upLoads[upLoadIndex].progress = currentProgress;
					}, error => {
						this.upLoads[upLoadIndex].icon = 'fas fa-times';
						this.upLoads[upLoadIndex].textClass = 'text-red-400';
						this.upLoads[upLoadIndex].variant = 'bg-red-400';

						console.error(error);
					}, async () => {
						const sound = {
							uID: authentication.currentUser.uid,
							displayName: authentication.currentUser.displayName,
							originalName: task.snapshot.ref.name,
							modifiedName: task.snapshot.ref.name,
							genre: '',
							commentCount: 0
						};

						sound.URL = await task.snapshot.ref.getDownloadURL();

						const soundReference = await soundsCollection.add(sound);
						const soundSnapShot = await soundReference.get();
						this.addSound(soundSnapShot);

						this.upLoads[upLoadIndex].icon = 'fas fa-check';
						this.upLoads[upLoadIndex].textClass = 'text-green-400';
						this.upLoads[upLoadIndex].variant = 'bg-green-400';
					});
				});
			}
			// cancelUpLoads() {
			// 	this.upLoads.forEach(upLoad => {
			// 		upLoad.task.cancel();
			// 	});
			// }
		},
		beforeUnmount() {
			this.upLoads.forEach(upLoad => {
				upLoad.task.cancel();
			});
		}
	};
</script>