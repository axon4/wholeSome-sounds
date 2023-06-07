<template>
	<div class='bg-white rounded border border-gray-200 relative flex flex-col'>
		<div class='px-6 pt-6 pb-5 font-bold border-b border-gray-200'>
			<span class='card-title'>UpLoad</span>
			<i class='fas fa-upload float-right text-green-400 text-2xl'></i>
		</div>
		<div class='p-6'>
			<div
				class='w-full px-10 py-20 rounded text-center cursor-pointer border border-dashed border-gray-400 text-gray-400 transition duration-500 hover:text-white hover:bg-green-400 hover:border-green-400 hover:border-solid'
				:class='{"text-white bg-green-400 border-green-400 border-solid": draggedOver}'
				@drag.prevent.stop=''
				@dragstart.prevent.stop=''
				@dragenter.prevent.stop='draggedOver = true'
				@dragover.prevent.stop='draggedOver = true'
				@dragleave.prevent.stop='draggedOver = false'
				@dragend.prevent.stop='draggedOver = false'
				@drop.prevent.stop='upLoad'
			>
				<h5>Drop Files</h5>
			</div>
			<hr class='my-6' />
			<div class='mb-4' v-for='upLoad in upLoads' :key='upLoad.name'>
				<div class='font-bold text-sm'>{{ upLoad.name }}</div>
				<div class='flex h-4 overflow-hidden bg-gray-200 rounded'>
					<div :style='{width: upLoad.progress + "%"}' class='transition-all progress-bar bg-blue-400' :class='"bg-blue-400"'></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { storage } from '@/includes/fireBase.js';

	export default {
		name: 'upLoader',
		data() {
			return {
				draggedOver: false,
				upLoads: []
			};
		},
		methods: {
			upLoad($event) {
				this.draggedOver = false;
				
				const { files } = $event.dataTransfer;
				
				Object.values(files).forEach(file => {
					if (file.type !== 'audio/mpeg') {
						return;
					};
					
					const storageReference = storage.ref();
					const soundReference = storageReference.child(`sounds/${file.name}`);
					
					const task = soundReference.put(file);
					const upLoadIndex = this.upLoads.push({ name: file.name, task, progress: 0 }) - 1;
					
					task.on('state_changed', snapShot => {
						const currentProgress = (snapShot.bytesTransferred / snapShot.totalBytes) * 100;
						
						this.upLoads[upLoadIndex].progress = currentProgress;
					});
				});
			}
		}
	};
</script>