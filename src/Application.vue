<template>
	<Header />
	<RouterView />
    <Player />
	<AuthenticationModal />
</template>

<script>
	import { mapWritableState } from 'pinia';
	import { authentication } from '@/includes/fireBase';
	import useUserStore from '@/stores/user';
	import Header from '@/components/Header.vue';
	import Player from '@/components/Player.vue';
	import AuthenticationModal from '@/components/AuthenticationModal.vue';

	export default {
		name: 'Application',
		components: {
			Header,
            Player,
			AuthenticationModal
		},
		computed: {
			...mapWritableState(useUserStore, ['loggedIn'])
		},
		created() {
			if (authentication.currentUser) {
				this.loggedIn = true;
			};
		}
	};
</script>