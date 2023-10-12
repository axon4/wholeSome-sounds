import { shallowMount } from '@vue/test-utils';
import SoundItem from '@/components/SoundItem.vue';

describe('Home', () => {
	it('render sound items', () => {
		const sounds = (new Array(7)).fill({});

		const wrapper = shallowMount(SoundItem, {
			data() {
				return { sounds };
			},
			global: {
				mocks: {$t: key => key}
			}
		});

		const soundItems = wrapper.findAllComponents(SoundItem);

		expect(soundItems).toHaveLength(sounds.length);

		soundItems.forEach((soundItem, index) => {
			expect(soundItem.props().sound).toStrictEqual(sounds[index]);
		});
	});
});