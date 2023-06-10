<template>
	<section class='w-full mb-8 py-14 text-center text-white relative'>
		<div style='background-image: url(images/header2.png)' class='absolute inset-0 w-full h-full box-border bg-contain track-background'></div>
		<div class='container mx-auto flex items-center'>
			<button type='button' class='z-50 h-24 w-24 text-3xl bg-white text-black rounded-full focus:outline-none'>
				<i class='fas fa-play'></i>
			</button>
			<div class='z-50 text-left ml-8'>
				<div class='text-3xl font-bold'>{{ sound.modifiedName }}</div>
				<div>{{ sound.genre }}</div>
			</div>
		</div>
	</section>
	<section class='container mx-auto mt-6'>
		<div class='bg-white rounded border border-gray-200 relative flex flex-col'>
			<div class='px-6 pt-6 pb-5 font-bold border-b border-gray-200'>
				<span class='card-title'>Comments (19)</span>
				<i class='fa fa-comments float-right text-green-400 text-2xl'></i>
			</div>
			<div class='p-6'>
				<Form :validation-schema='schema'>
					<Field as='textarea' name='comment' class='block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded mb-4' placeholder='comment'></Field>
					<ErrorMessage name='comment' class='text-red-600' />
					<button type='submit' class='py-1.5 px-3 rounded text-white bg-green-600 block'>
						Submit
					</button>
				</Form>
				<select class='block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded'>
					<option value='1'>Newest</option>
					<option value='2'>Oldest</option>
				</select>
			</div>
		</div>
	</section>
	<ul class='container mx-auto'>
		<li class='p-6 bg-gray-50 border border-gray-200'>
			<div class='mb-5'>
				<div class='font-bold'>Joe Smith</div>
				<time>7 Minutes Ago</time>
			</div>
			<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium der doloremque laudantium.</p>
		</li>
		<li class='p-6 bg-gray-50 border border-gray-200'>
			<div class='mb-5'>
				<div class='font-bold'>Joe Smith</div>
				<time>7 Minutes Ago</time>
			</div>
			<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium der doloremque laudantium.</p>
		</li>
		<li class='p-6 bg-gray-50 border border-gray-200'>
			<div class='mb-5'>
				<div class='font-bold'>Joe Smith</div>
				<time>7 Minutes Ago</time>
			</div>
			<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium der doloremque laudantium.</p>
		</li>
		<li class='p-6 bg-gray-50 border border-gray-200'>
			<div class='mb-5'>
				<div class='font-bold'>Joe Smith</div>
				<time>7 Minutes Ago</time>
			</div>
			<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium der doloremque laudantium.</p>
		</li>
		<li class='p-6 bg-gray-50 border border-gray-200'>
			<div class='mb-5'>
				<div class='font-bold'>Joe Smith</div>
				<time>7 Minutes Ago</time>
			</div>
			<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium der doloremque laudantium.</p>
		</li>
		<li class='p-6 bg-gray-50 border border-gray-200'>
			<div class='mb-5'>
				<div class='font-bold'>Joe Smith</div>
				<time>7 Minutes Ago</time>
			</div>
			<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium der doloremque laudantium.</p>
		</li>
	</ul>
</template>

<script>
	import { soundsCollection } from '@/includes/fireBase';

	export default {
		name: 'Sound',
		data() {
			return {
				sound: {},
				schema: {
					comment: 'required|min:3'
				}
			};
		},
		async created() {
			const snapShot = await soundsCollection.doc(this.$route.params.ID).get();

			if (snapShot.exists) {
				this.sound = snapShot.data();
			} else {
				this.$router.push({name: 'home'});

				return;
			}
		}
	};
</script>