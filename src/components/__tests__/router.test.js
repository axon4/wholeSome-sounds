import { RouterLinkStub, shallowMount } from '@vue/test-utils';
import SoundItem from '@/components/SoundItem.vue';

describe('router', () => {
	it('parse RouterLink \'to\' attribute', () => {
		const sound = {documentID: 'test'};
		const wrapper = shallowMount(SoundItem, {
			propsData: { sound },
			global: {
				stubs: {RouterLink: RouterLinkStub}
			}
		});

		expect(wrapper.findComponent(RouterLinkStub).props().to).toEqual({name: 'sound', params: {ID: sound.documentID}});
	});
});