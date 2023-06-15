import { RouterLinkStub, shallowMount } from '@vue/test-utils';
import SoundItem from '@/components/SoundItem.vue';

describe('snapShot', () => {
	it('snapShot SoundItem', () => {
		const sound = {
			documentID: 'testID',
			displayName: 'testDisplayName',
			modifiedName: 'testModifiedName',
			commentCount: 7
		};

		const wrapper = shallowMount(SoundItem, {
			propsData: { sound },
			global: {
				stubs: {RouterLink: RouterLinkStub}
			}
		});

		expect(wrapper.element).toMatchSnapshot();
	});
});