<template>
	<div class='fixed bottom-0 left-0 bg-white px-4 py-2 w-full'>
		<div class='text-center' v-if='currentSound.modifiedName'>
			<span class='sound-title font-bold'>{{ currentSound.modifiedName }}</span>
			by
			<span class='sound-author'>{{ currentSound.displayName }}</span>
		</div>
		<div class='flex flex-nowrap gap-4 items-center'>
			<button id='button-play-small' type='button' @click='toggleAudio'>
				<i class='fa text-gray-500 text-xl' :class='{"fa-play": !playing, "fa-pause": playing}' />
			</button>
			<div class='player-current-time'>{{ seek }}</div>
			<div class='w-full h-2 rounded bg-gray-200 relative cursor-pointer' @click='upDateSeek'>
				<span :style='{left: playerProgress}' class='absolute -top-2.5 -ml-2.5 text-gray-800 text-lg'>
					<i class='fas fa-circle' />
				</span>
				<span :style='{width: playerProgress}' class='block h-2 rounded bg-gradient-to-r from-green-500 to-green-400' />
			</div>
			<div class='player-duration'>{{ duration }}</div>
		</div>
	</div>
</template>

<script>
	import { mapActions, mapState } from 'pinia';
	import usePlayerStore from '@/stores/player';

	export default {
		name: 'Player',
		methods: {
			...mapActions(usePlayerStore, ['toggleAudio', 'upDateSeek'])
		},
		computed: {
			...mapState(usePlayerStore, ['playing', 'seek', 'duration', 'playerProgress', 'currentSound'])
		}
	};
</script>