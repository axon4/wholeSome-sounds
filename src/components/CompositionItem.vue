<template>
	<div class='border border-gray-200 p-3 mb-4 rounded'>
		<div v-show='!formVisible'>
			<h4 class='inline-block text-2xl font-bold'>{{ sound.modifiedName }}</h4>
			<button class='ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right' @click='deleteSound'>
				<i class='fa fa-times'></i>
			</button>
			<button class='ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right' @click='formVisible = !formVisible'>
				<i class='fa fa-pencil-alt'></i>
			</button>
		</div>
		<div v-show='formVisible'>
			<div class='text-white text-center font-bold p-4 mb-4' :class='alertVariant' v-if='showAlert'>
				{{ alertMessage }}
			</div>
			<Form :validation-schema='schema' :initial-values='sound' @submit='submit'>
				<div class='mb-3'>
					<label class='inline-block mb-2'>Sound Title</label>
					<Field name='modifiedName' type='text' class='block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded' placeholder='title' @input='this.updateUnSavedChangesFlag(true)' />
					<ErrorMessage name='modifiedName' class='text-red-600' />
				</div>
				<div class='mb-3'>
					<label class='inline-block mb-2'>Genre</label>
					<Field name='genre' type='text' class='block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded' placeholder='genre' @input='this.updateUnSavedChangesFlag(true)' />
					<ErrorMessage name='genre' class='text-red-600' />
				</div>
				<button type='submit' class='py-1.5 px-3 rounded text-white bg-green-600' :disabled='pending'>
					Submit
				</button>
				<button type='button' class='py-1.5 px-3 rounded text-white bg-gray-600' :disabled='pending' @click='formVisible = false'>
					Cancel
				</button>
			</Form>
		</div>
	</div>
</template>

<script>
	import { soundsCollection, storage } from '@/includes/fireBase';

	export default {
		name: 'CompositionItem',
		props: {
			index: {type: Number, required: true},
			sound: {type: Object, required: true},
			updateSound: {type: Function, required: true},
			removeSound: {type: Function, required: true},
			updateUnSavedChangesFlag: {type: Function},
		},
		data() {
			return {
				formVisible: false,
				schema: {
					modifiedName: 'required',
					genre: 'alpha_spaces'
				},
				pending: false,
				showAlert: false,
				alertVariant: 'bg-blue-500',
				alertMessage: 'Updating Sound MetaData'
			};
		},
		methods: {
			async submit(values) {
				this.pending = true;
				this.showAlert = true;
				this.alertVariant = 'bg-blue-500';
				this.alertMessage = 'Updating Sound MetaData';
				
				try {
					await soundsCollection.doc(this.sound.documentID).update(values);
					this.updateSound(this.index, values);
                    this.updateUnSavedChangesFlag(false);
					
					this.pending = false;
					this.alertVariant = 'bg-green-500';
					this.alertMessage = 'Updating Sound MetaData Successful';
				} catch (error) {
					this.pending = false;
					this.alertVariant = 'bg-red-500';
					this.alertMessage = 'Error Updating Sound MetaData';
				};
			},
			async deleteSound() {
				try {
					const storageReference = storage.ref();
					const soundReference = storageReference.child(`sounds/${this.sound.originalName}`);

					await soundReference.delete();
				} catch (error) {
					console.error(error);
				};

				try {
					await soundsCollection.doc(this.sound.documentID).delete();
				} catch (error) {
					console.error(error);
				};

				this.removeSound(this.index);
			}
		}
	};
</script>