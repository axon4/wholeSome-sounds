<template>
	<div class='text-white text-center font-bold p-4 rounded mb-4' :class='bannerVariant' v-show='showBanner'>
		{{ bannerMessage }}
	</div>
	<Form :validation-schema='schema' :initial-values='defaults' @submit='submit'>
		<div class='mb-3'>
			<label class='inline-block mb-2'>Name</label>
			<Field type='text' name='name' class='block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded' placeholder='Name' />
			<ErrorMessage name='name' class='text-red-600' />
		</div>
		<div class='mb-3'>
			<label class='inline-block mb-2'>EMail</label>
			<Field type='email' name='eMail' class='block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded' placeholder='EMail' />
			<ErrorMessage name='eMail' class='text-red-600' />
		</div>
		<div class='mb-3'>
			<label class='inline-block mb-2'>Age</label>
			<Field type='number' name='age' class='block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded' placeholder='Age' />
			<ErrorMessage name='age' class='text-red-600' />
		</div>
		<div class='mb-3'>
			<label class='inline-block mb-2'>PassWord</label>
			<Field name='passWord' :bails='false' v-slot='{ field, errors }'>
				<input type='password' class='block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded' placeholder='PassWord' v-bind='field' />
				<span class='block text-red-600' v-for='error in errors' :key='error'>{{ error }}</span>
			</Field>
		</div>
		<div class='mb-3'>
			<label class='inline-block mb-2'>Confirm PassWord</label>
			<Field type='password' name='confirmPassWord' class='block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded' placeholder='Confirm PassWord' />
			<ErrorMessage name='confirmPassWord' class='text-red-600' />
		</div>
		<div class='mb-3'>
			<label class='inline-block mb-2'>Country</label>
			<Field as='select' name='country' class='block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded'>
				<option value='Saudi Arabia'>Saudi Arabia</option>
				<option value='United Arab Emirates'>United Arab Emirates</option>
				<option value='United Kingdom'>United Kingdom</option>
				<option value='Tartary'>Tartary</option>
			</Field>
			<ErrorMessage name='country' class='text-red-600' />
		</div>
		<div class='mb-3'>
			<Field type='checkbox' name='termsAndConditions' value='1' class='w-4 h-4 float-left mt-1 rounded pr-4' />
			<i18n-t class='inline-block pl-2' tag='label' keypath='registration_form.accept'>
				<a href='#'>{{ $t('registration_form.terms_and_conditions') }}</a>
			</i18n-t>
			<ErrorMessage name='termsAndConditions' class='text-red-600 block' />
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
		name: 'RegistrationForm',
		data() {
			return {
				schema: {
					name: 'required|min:2|max:72|alpha_dash',
					eMail: 'required|min:5|max:76|eMail',
					age: 'required|min_value:9|max_value:70',
					passWord: 'required|min:7|max:96',
					confirmPassWord: 'confirmed:@passWord',
					country: 'required|not_one_of:Tartary',
					termsAndConditions: 'termsAndConditions'
				},
				defaults: {
					country: 'United Kingdom'
				},
				pending: false,
				showBanner: false,
				bannerVariant: 'bg-blue-500',
				bannerMessage: 'Registration in-Progress'
			}
		},
		methods: {
			...mapActions(useUserStore, {register: 'createUser'}),
			async submit(values) {
				this.pending = true;
				this.showBanner = true;
				this.bannerVariant = 'bg-blue-500';
				this.bannerMessage = 'Registration in-Progress';

				try {
					await this.register(values);

					this.bannerVariant = 'bg-green-500';
					this.bannerMessage = 'Registration Successful';
				} catch (error) {
					this.pending = false;
					this.bannerVariant = 'bg-red-500';
					this.bannerMessage = 'Error Registering';
				};
			}
		}
	};
</script>