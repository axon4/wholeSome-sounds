<template>
	<div class='fixed bottom-0 left-0 bg-white px-4 py-2 w-full'>
		<div class='text-center'>
			<span class='sound-title font-bold'>Sound</span>
			by
			<span class='sound-author'>Author</span>
		</div>
		<div class='flex flex-nowrap gap-4 items-center'>
			<button type='button'>
				<i class='fa fa-play text-gray-500 text-xl'></i>
			</button>
			<div class='player-current-time'>00:00</div>
			<div class='w-full h-2 rounded bg-gray-200 relative cursor-pointer'>
				<span style='left: 50%' class='absolute -top-2.5 -ml-2.5 text-gray-800 text-lg'>
					<i class='fas fa-circle'></i>
				</span>
				<span style='width: 50%' class='block h-2 rounded bg-gradient-to-r from-green-500 to-green-400'></span>
			</div>
			<div class='player-duration'>07:19</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Player'
	};
</script>