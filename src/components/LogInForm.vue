<template>
	<div class='text-white text-center font-bold p-4 rounded mb-4' :class='bannerVariant' v-show='showBanner'>
		{{ bannerMessage }}
	</div>
	<Form :validation-schema='schema' @submit='submit'>
		<div class='mb-3'>
			<label class='inline-block mb-2'>EMail</label>
			<Field type='email' name='eMail' class='block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded' placeholder='EMail' />
			<ErrorMessage name='eMail' class='text-red-600' />
		</div>
		<div class='mb-3'>
			<label class='inline-block mb-2'>PassWord</label>
			<Field type='password' name='passWord' class='block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded' placeholder='Password' />
			<ErrorMessage name='passWord' class='text-red-600' />
		</div>
		<button type='submit' class='block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700' :disabled='pending'>
			Submit
		</button>
	</Form>
</template>

<script>
	import { mapActions } from 'pinia';
	import useUserStore from '@/stores/user';

	export default {
		name: 'LogInForm',
		data() {
			return {
				schema: {
					eMail: 'required|min:5|max:76|eMail',
					passWord: 'required|min:7|max:96'
				},
				pending: false,
				showBanner: false,
				bannerVariant: 'bg-blue-500',
				bannerMessage: 'Log In in Progress'
			}
		},
		methods: {
			...mapActions(useUserStore, ['logIn']),
			async submit(values) {
				this.showBanner = true;
				this.pending = true;
				this.bannerVariant = 'bg-blue-500';
				this.bannerMessage = 'Log In in Progress';
				
				try {
					await this.logIn(values);
					
					this.bannerVariant = 'bg-green-500';
					this.bannerMessage = 'Log In Successful';
				} catch (error) {
					this.pending = false;
					this.bannerVariant = 'bg-red-500';
					this.bannerMessage = 'Error Logging In';

					return;	
				};
			}
		}
	};
</script>