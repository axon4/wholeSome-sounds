<template>
	<div class='border border-gray-200 p-3 mb-4 rounded'>
		<div v-show='!formVisible'>
			<h4 class='inline-block text-2xl font-bold'>{{ sound.modifiedName }}</h4>
			<button class='ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right'>
				<i class='fa fa-times'></i>
			</button>
			<button class='ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right' @click='formVisible = !formVisible'>
				<i class='fa fa-pencil-alt'></i>
			</button>
		</div>
		<div v-show='formVisible'>
			<form>
				<div class='mb-3'>
					<label class='inline-block mb-2'>Sound Title</label>
					<input type='text' class='block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded' placeholder='title' />
				</div>
				<div class='mb-3'>
					<label class='inline-block mb-2'>Genre</label>
					<input type='text' class='block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded' placeholder='genre' />
				</div>
				<button type='submit' class='py-1.5 px-3 rounded text-white bg-green-600'>
					Submit
				</button>
				<button type='button' class='py-1.5 px-3 rounded text-white bg-gray-600'>
					Cancel
				</button>
			</form>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'SoundItem',
		props: {
			sound: {type: Object, required: true}
		},
		data() {
			return {formVisible: false};
		}
	};
</script>