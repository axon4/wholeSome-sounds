<template>
	<header id='header' class='bg-gray-700'>
		<nav class='container mx-auto flex justify-between items-center py-5 px-4'>
			<a href='#' class='text-white font-bold uppercase text-2xl mr-4'>WholeSome Sounds</a>
			<div class='flex items-center'>
				<ul class='flex flex-row mt-1'>
					<template v-if='userStore.loggedIn'>
						<li>
							<a href='#' class='px-2 text-white'>Manage</a>
						</li>
						<li>
							<a href='#' class='px-2 text-white' @click.prevent='userStore.logOut'>Log Out</a>
						</li>
					</template>
					<li v-else>
						<a href='#' class='px-2 text-white' @click.prevent='toggleAuthenticationModal'>Log In / Register</a>
					</li>
				</ul>
			</div>
		</nav>
	</header>
</template>

<script>
	import { mapStores } from 'pinia';
	import useAuthenticationModalStore from '@/stores/authenticationModal';
	import useUserStore from '@/stores/user';

	export default {
		name: 'Header',
		computed: {
			...mapStores(useAuthenticationModalStore, useUserStore)
		},
		methods: {
			toggleAuthenticationModal() {					
				this.authenticationModalStore.isOpen = true;
			}
		}
	};
</script>