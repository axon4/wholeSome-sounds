import { RouterLinkStub, shallowMount } from '@vue/test-utils';
import SoundItem from '@/components/SoundItem.vue';

describe('SoundItem', () => {
	it('render display name', () => {
		const sound = {displayName: 'test'};

		const wrapper = shallowMount(SoundItem, {
			propsData: sound,
			global: {
				stubs: {RouterLink: RouterLinkStub},
			}
		});
		const author = wrapper.find('.text-gray-400');

		console.log({ sound, wrapper, author })

		expect(author.text()).toContain(sound.displayName);
	});

	it('bind ID attribute with documentID', () => {
		const sound = {documentID: 'test'};

		const wrapper = (SoundItem, {
			propsData: sound,
			global: {
				stubs: {RouterLink: RouterLinkStub},
			}
		});

		expect(wrapper.attributes().id).toBe(sound.documentID);
		// expect(wrapper.classes()).toContain(sound.documentID);
	});
});