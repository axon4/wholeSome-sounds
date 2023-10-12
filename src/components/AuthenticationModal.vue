<template>
	<div id='modal' class='fixed z-50 inset-0 overflow-y-auto' :class='hiddenClass'>
		<div class='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
			<div class='fixed inset-0 transition-opacity'>
				<div class='absolute inset-0 bg-gray-800 opacity-75' />
			</div>
			<!-- trick browser inTo centreing modal-conTents -->
			<span class='hidden sm:inline-block sm:align-middle sm:h-screen'>&#8203;</span>
			<div class='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
				<!-- margin to see some of overLay beHind modal -->
				<div class='py-4 text-left px-6'>
					<div class='flex justify-between items-center pb-4'>
						<p class='text-2xl font-bold'>Account</p>
						<div class='modal-close cursor-pointer z-50' @click='modalVisibility = false'>
							<i class='fas fa-times'></i>
						</div>
					</div>
					<ul class='flex flex-wrap mb-4'>
						<li class='flex-auto text-center'>
							<a href='#' class='block rounded py-3 px-4 transition' :class='{"hover:text-white text-white bg-blue-600": tab === "logIn", "hover:text-blue-600": tab === "registration"}' @click.prevent='tab = "logIn"'>
								Log-In
							</a>
						</li>
						<li class='flex-auto text-center'>
							<a href='#' class='block rounded py-3 px-4 transition' :class='{"hover:text-white text-white bg-blue-600": tab === "registration", "hover:text-blue-600": tab === "logIn"}' @click.prevent='tab = "registration"'>
								Register
							</a>
						</li>
					</ul>
					<LogInForm v-if='tab === "logIn"' />
					<RegistrationForm v-else='tab === "registration"' />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapWritableState } from 'pinia';
	import useAuthenticationModalStore from '@/stores/authenticationModal';
	import LogInForm from './LogInForm.vue';
	import RegistrationForm from './RegistrationForm.vue';

	export default {
		name: 'AuthenticationModal',
		data() {
			return {
				tab: 'logIn'
			};
		},
		computed: {
			...mapState(useAuthenticationModalStore, ['hiddenClass']),
			...mapWritableState(useAuthenticationModalStore, {modalVisibility: 'isOpen'})
		},
		components: {
			LogInForm,
			RegistrationForm
		}
	};
</script>