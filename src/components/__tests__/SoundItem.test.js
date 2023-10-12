import { RouterLinkStub, shallowMount } from '@vue/test-utils';
import SoundItem from '@/components/SoundItem.vue';

describe('SoundItem', () => {
	it('render display-name', () => {
		const sound = {displayName: 'test'};
		const wrapper = shallowMount(SoundItem, {
			propsData: sound,
			global: {
				stubs: {RouterLink: RouterLinkStub},
			}
		});
		const author = wrapper.find('.text-gray-400');

		expect(author.text()).toContain(sound.displayName);
	});

	it('bind \'ID\' attribute with document-ID', () => {
		const sound = {documentID: 'test'};
		const wrapper = (SoundItem, {
			propsData: sound,
			global: {
				stubs: {RouterLink: RouterLinkStub},
			}
		});

		// expect(wrapper.classes()).toContain(sound.documentID);
		expect(wrapper.attributes().id).toBe(sound.documentID);
	});
});