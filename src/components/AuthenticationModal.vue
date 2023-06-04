<template>
	<div id='modal' class='fixed z-10 inset-0 overflow-y-auto' :class='hiddenClass'>
		<div class='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
			<div class='fixed inset-0 transition-opacity'>
				<div class='absolute inset-0 bg-gray-800 opacity-75'></div>
			</div>
			<!-- trick the browser into centreing the modal contents -->
			<span class='hidden sm:inline-block sm:align-middle sm:h-screen'>&#8203;</span>
			<div class='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
				<!-- margin to see some of the overlay behind the modal-->
				<div class='py-4 text-left px-6'>
					<div class='flex justify-between items-center pb-4'>
						<p class='text-2xl font-bold'>Account</p>
						<div class='modal-close cursor-pointer z-50' @click='modalVisibility = false'>
							<i class='fas fa-times'></i>
						</div>
					</div>
					<ul class='flex flex-wrap mb-4'>
						<li class='flex-auto text-center'>
							<a
								href='#'
								class='block rounded py-3 px-4 transition'
								:class='{"hover:text-white text-white bg-blue-600": tab === "logIn", "hover:text-blue-600": tab === "registration"}'
								@click.prevent='tab = "logIn"'
							>
								Log In
							</a>
						</li>
						<li class='flex-auto text-center'>
							<a
								href='#'
								class='block rounded py-3 px-4 transition'
								:class='{"hover:text-white text-white bg-blue-600": tab === "registration", "hover:text-blue-600": tab === "logIn"}'
								@click.prevent='tab = "registration"'
							>
								Register
							</a>
						</li>
					</ul>
					<VeeForm v-show='tab === "logIn"'>
						<div class='mb-3'>
							<label class='inline-block mb-2'>EMail</label>
							<VeeField type='email' name='eMail' class='block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded' placeholder='EMail' />
						</div>
						<div class='mb-3'>
							<label class='inline-block mb-2'>PassWord</label>
							<VeeField type='password' name='passWord' class='block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded' placeholder='Password' />
						</div>
						<button type='submit' class='block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700'>
							Submit
						</button>
					</VeeForm>
					<div class='text-white text-center font-bold p-4 rounded mb-4' :class='registrationBannerVariant' v-if='showRegistrationBanner'>
						{{ registrationBannerMessage }}
					</div>
					<VeeForm :validation-schema='schema' :initial-values='defaults' @submit='register' v-show='tab === "registration"'>
						<div class='mb-3'>
							<label class='inline-block mb-2'>Name</label>
							<VeeField type='text' name='name' class='block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded' placeholder='Name' />
							<ErrorMessage name='name' class='text-red-600' />
						</div>
						<div class='mb-3'>
							<label class='inline-block mb-2'>EMail</label>
							<VeeField type='email' name='eMail' class='block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded' placeholder='EMail' />
							<ErrorMessage name='eMail' class='text-red-600' />
						</div>
						<div class='mb-3'>
							<label class='inline-block mb-2'>Age</label>
							<VeeField type='number' name='age' class='block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded' placeholder='Age' />
							<ErrorMessage name='age' class='text-red-600' />
						</div>
						<div class='mb-3'>
							<label class='inline-block mb-2'>PassWord</label>
							<VeeField name='passWord' :bails='false' v-slot='{ field, errors }'>
								<input type='password' class='block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded' placeholder='PassWord' v-bind='field' />
								<span class='block text-red-600' v-for='error in errors' :key='error'>{{ error }}</span>
							</VeeField>
						</div>
						<div class='mb-3'>
							<label class='inline-block mb-2'>Confirm PassWord</label>
							<VeeField type='password' name='confirmPassWord' class='block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded' placeholder='Confirm PassWord' />
							<ErrorMessage name='confirmPassWord' class='text-red-600' />
						</div>
						<div class='mb-3'>
							<label class='inline-block mb-2'>Country</label>
							<VeeField as='select' name='country' class='block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded'>
								<option value='Saudi Arabia'>Saudi Arabia</option>
								<option value='United Arab Emirates'>United Arab Emirates</option>
								<option value='United Kingdom'>United Kingdom</option>
								<option value='Tartary'>Tartary</option>
							</VeeField>
							<ErrorMessage name='country' class='text-red-600' />
						</div>
						<div class='mb-3 pl-6'>
							<VeeField type='checkbox' name='termsAndConditions' value='1' class='w-4 h-4 float-left -ml-6 mt-1 rounded' />
							<label class='inline-block'>Accept the Terms and Conditions</label>
							<ErrorMessage name='termsAndConditions' class='text-red-600 block' />
						</div>
						<button type='submit' class='block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700' :disabled='registrationPending'>
							Submit
						</button>
					</VeeForm>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapWritableState } from 'pinia';
	import useAuthenticationModalStore from '@/stores/authenticationModal';

	export default {
		name: 'AuthenticationModal',
		data() {
			return {
				tab: 'logIn',
				schema: {
					name: 'required|min:2|max:72|alpha_spaces',
					eMail: 'required|min:5|max:76|eMail',
					age: 'required|min_value:9|max_value:70',
					passWord: 'required|min:7|max:96|not_one_of:1',
					confirmPassWord: 'confirmed:@passWord',
					country: 'required|not_one_of:Tartary',
					termsAndConditions: 'termsAndConditions'
				},
				defaults: {
					country: 'United Kingdom'
				},
				registrationPending: false,
				showRegistrationBanner: false,
				registrationBannerVariant: 'bg-blue-500',
				registrationBannerMessage: 'Registration in Progress'
			};
		},
		computed: {
			...mapState(useAuthenticationModalStore, ['hiddenClass']),
			...mapWritableState(useAuthenticationModalStore, {modalVisibility: 'isOpen'})
		},
		methods: {
			register(values) {
				this.showRegistrationBanner = true;
				this.registrationPending = true;
				this.registrationBannerVariant = 'bg-blue-500';
				this.registrationBannerMessage = 'Registration in Progress';

				setTimeout(() => {
					this.registrationBannerVariant = 'bg-green-500';
					this.registrationBannerMessage = 'Registration Successful';
				}, 3000);

				console.log(values);
			}
		}
	};
</script>