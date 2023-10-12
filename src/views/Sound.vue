<template>
	<main>
		<section class='w-full mb-8 py-14 text-center text-white relative'>
			<div style='background-image: url("/images/header2.png")' class='absolute inset-0 w-full h-full box-border bg-contain track-background' />
			<div class='container mx-auto flex items-center'>
				<button id='button-play-big' type='button' class='z-50 h-24 w-24 text-3xl bg-white text-black rounded-full focus:outline-none ml-4' @click='newSound(sound)'>
					<i class='fas' :class='{"fa-play": !playing, "fa-sync-alt": playing}' />
				</button>
				<div class='z-50 text-left ml-8'>
					<div class='text-3xl font-bold'>{{ sound.modifiedName }}</div>
					<div>{{ sound.genre }}</div>
					<div>{{ $n(7, 'currency') }}</div>
				</div>
			</div>
		</section>
		<section id='comments' class='container mx-auto mt-6'>
			<div class='bg-white rounded border border-gray-200 relative flex flex-col'>
				<div class='px-6 pt-6 pb-5 font-bold border-b border-gray-200'>
					<span class='card-title'>{{ $tc('sound.comment_count', sound.commentCount, {count: sound.commentCount}) }}</span>
					<i class='fa fa-comments float-right text-green-400 text-2xl' />
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
					<time>{{ forMatDate(new Date(comment.date)) }}</time>
				</div>
				<p>{{ comment.value }}</p>
			</li>
		</ul>
	</main>
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
			...mapState(usePlayerStore, ['playing']),
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
		async beforeRouteEnter(to, from, next) {
			const snapShot = await soundsCollection.doc(to.params.ID).get();

			next(vm => {
				if (snapShot.exists) {
					vm.sound = snapShot.data();
					vm.getComments();

					const { sort } = vm.$route.query;

					vm.sort = (sort === 'newest' || sort === 'oldest') ? sort : 'newest';
				} else {
					vm.$router.push({name: 'home'});

					return;
				};
			});
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

				try {
					await commentsCollection.add(comment);
					this.sound.commentCount++;
					await soundsCollection.doc(this.$route.params.ID).update({commentCount: this.sound.commentCount});
					this.getComments();

					this.pending = false;
					this.bannerVariant = 'bg-green-500';
					this.bannerMessage = 'Comment Successful';
				} catch (error) {
					this.pending = false;
					this.bannerVariant = 'bg-red-500';
					this.bannerMessage = 'Error Commenting';
				};

				resetForm();
			},
			async getComments() {
				const snapShots = await commentsCollection.where('soundID', '==', this.$route.params.ID).get();

				this.comments = [];

				snapShots.forEach(document => {
					this.comments.push({documentID: document.id, ...document.data()});
				});
			},
			forMatDate(date) {
				const forMattedDate = new Intl
					.DateTimeFormat('en-GB', {
						timeZoneName: 'short',
						year: 'numeric',
						month: '2-digit',
						day: '2-digit',
						hour: '2-digit',
						minute: '2-digit',
						second: '2-digit'
					})
					.format(date)
					.replace(',', '');
				const offSet = date.getTimezoneOffset();
				const offSetHours = Math.abs(Math.floor(offSet / 60)).toString().padStart(2, '0');
				const offSetMinutes = (Math.abs(offSet) % 60).toString().padStart(2, '0');
				const offSetSign = offSet > 0 ? '-' : '+';
				const timeZoneName = new Intl.DateTimeFormat('en-GB', {timeZoneName: 'long'}).formatToParts(date).find(part => part.type === 'timeZoneName').value;
				const finalDate = `${forMattedDate} ${offSetSign}${offSetHours}${offSetMinutes} (${timeZoneName})`;

				return finalDate;
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