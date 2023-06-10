<template>
	<li class='flex justify-between items-center p-3 pl-6 cursor-pointer transition duration-300 hover:bg-gray-50'>
		<div>
			<RouterLink :to='{name: "sound", params: {ID: sound.documentID}}' class='font-bold block text-gray-600'>{{ sound.modifiedName }}</RouterLink>
			<span class='text-gray-500 text-sm'>{{ sound.displayName }}</span>
		</div>
		<div class='text-gray-600 text-lg'>
			<span class='comments'>
				<i class='fa fa-comments text-gray-600'></i>
				{{ sound.commentCount }}
			</span>
		</div>
	</li>
</template>

<script>
	export default {
		name: 'SoundItem',
		props: ['sound']
	};
</script>