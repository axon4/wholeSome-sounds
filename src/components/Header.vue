<template>
	<header id='header' class='bg-gray-700'>
		<nav class='container mx-auto flex justify-between items-center py-5 px-4'>
			<RouterLink :to='{name: "home"}' class='text-white font-bold uppercase text-2xl mr-4' exact-active-class='inActive'>WholeSome Sounds</RouterLink>
			<div class='flex items-center'>
				<ul class='flex flex-row mt-1'>
					<li class='flex items-center'>
						<a href='#' class='px-2 text-white' @click.prevent='changeLocale'>{{ locale }}</a>
					</li>
					<template v-if='userStore.loggedIn'>
						<li class='flex items-center'>
							<RouterLink :to='{name: "manage"}' class='px-2 text-white'>Manage</RouterLink>
						</li>
						<li class='flex items-center'>
							<a href='#' class='px-2 text-white' @click.prevent='logOut'>Log Out</a>
						</li>
					</template>
					<li class='flex items-center' v-else>
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
			...mapStores(useAuthenticationModalStore, useUserStore),
			locale() {
				return this.$i18n.locale === 'ar' ? 'Arabic' : 'English';
			}
		},
		methods: {
			toggleAuthenticationModal() {					
				this.authenticationModalStore.isOpen = true;
			},
			async logOut() {
				try {
					this.userStore.logOut();
				} catch (error) {
					console.error(error);
				};
								
				if (this.$route.name === 'manage') {
					this.$router.push('/');
				};
			},
			changeLocale() {
				this.$i18n.locale = this.$i18n.locale === 'ar' ? 'en' : 'ar';
			}
		}
	};
</script>