<template>
	<section class='w-full mb-8 py-14 text-center text-white relative'>
		<div style='background-image: url(images/header2.png)' class='absolute inset-0 w-full h-full box-border bg-contain track-background'></div>
		<div class='container mx-auto flex items-center'>
			<button type='button' class='z-50 h-24 w-24 text-3xl bg-white text-black rounded-full focus:outline-none' @click='newSound(sound)'>
				<i class='fas fa-play'></i>
			</button>
			<div class='z-50 text-left ml-8'>
				<div class='text-3xl font-bold'>{{ sound.modifiedName }}</div>
				<div>{{ sound.genre }}</div>
			</div>
		</div>
	</section>
	<section class='container mx-auto mt-6'>
		<div class='bg-white rounded border border-gray-200 relative flex flex-col'>
			<div class='px-6 pt-6 pb-5 font-bold border-b border-gray-200'>
				<span class='card-title'>Comments ({{ sound.commentCount }})</span>
				<i class='fa fa-comments float-right text-green-400 text-2xl'></i>
			</div>
			<div class='p-6'>
				<div class='text-white text-center font-bold p-4 mb-4' :class='bannerVariant' v-if='showBanner'>
					{{ bannerMessage }}
				</div>
				<Form :validation-schema='schema' @submit='submit' v-if='loggedIn'>
					<Field as='textarea' name='comment' class='block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded mb-4' placeholder='comment'></Field>
					<ErrorMessage name='comment' class='text-red-600' />
					<button type='submit' class='py-1.5 px-3 rounded text-white bg-green-600 block' :disabled='pending'>
						Submit
					</button>
				</Form>
				<select class='block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded' v-model='sort'>
					<option value='newest'>Newest</option>
					<option value='oldest'>Oldest</option>
				</select>
			</div>
		</div>
	</section>
	<ul class='container mx-auto'>
		<li class='p-6 bg-gray-50 border border-gray-200' v-for='comment in sortedComments' :key='comment.documentID'>
			<div class='mb-5'>
				<div class='font-bold'>{{ comment.commenter }}</div>
				<time>{{ comment.date }}</time>
			</div>
			<p>{{ comment.value }}</p>
		</li>
	</ul>
</template>

<script>
	import { mapActions, mapState } from 'pinia';
	import { authentication, commentsCollection, soundsCollection } from '@/includes/fireBase';
	import useUserStore from '@/stores/user';
	import usePlayerStore from '@/stores/player';

	export default {
		name: 'Sound',
		data() {
			return {
				sound: {},
				schema: {
					comment: 'required|min:3'
				},
				comments: [],
				sort: 'newest',
				pending: false,
				showBanner: false,
				bannerVariant: 'bg-blue-500',
				bannerMessage: 'Submitting Comment'
			};
		},
		computed: {
			...mapState(useUserStore, ['loggedIn']),
			sortedComments() {
				const sortedComments = this.comments.slice().sort((a, b) => {
					if (this.sort === 'newest') {
						return ((new Date(b.date)) - (new Date(a.date)));
					} else {
						return ((new Date(a.date)) - (new Date(b.date)));
					};
				});

				return sortedComments;
			}
		},
		async created() {
			const snapShot = await soundsCollection.doc(this.$route.params.ID).get();

			if (snapShot.exists) {
				this.sound = snapShot.data();
				this.getComments();

				const { sort } = this.$route.query;

				this.sort = sort === 'newest' || sort === 'oldest' ? sort : 'newest';
			} else {
				this.$router.push({name: 'home'});

				return;
			}
		},
		methods: {
			async submit(values, { resetForm }) {
				this.pending = true;
				this.showBanner = true;
				this.bannerVariant = 'bg-blue-500';
				this.bannerMessage = 'Submitting Comment';

				const comment = {
					uID: authentication.currentUser.uid,
					commenter: authentication.currentUser.displayName,
					soundID: this.$route.params.ID,
					date: (new Date()).toString(),
					value: values.comment
				};

				await commentsCollection.add(comment);
				this.sound.commentCount++;
				await soundsCollection.doc(this.$route.params.ID).update({commentCount: this.sound.commentCount});
				this.getComments();

				this.pending = false;
				this.bannerVariant = 'bg-green-500';
				this.bannerMessage = 'Comment Successful';

				resetForm();
			},
			async getComments() {
				const snapShots = await commentsCollection.where('soundID', '==', this.$route.params.ID).get();

				this.comments = [];

				snapShots.forEach(document => {
					this.comments.push({documentID: document.id, ...document.data()});
				});
			},
			...mapActions(usePlayerStore, ['newSound'])
		},
		watch: {
			sort(newValue) {
				if (newValue !== this.$route.query.sort) {
					this.$router.push({
						query: {
							sort: newValue
						}
					});
				};
			}
		}
	};
</script>