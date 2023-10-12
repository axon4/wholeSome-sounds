import { createPinia, setActivePinia } from 'pinia';
import useUserStore from '@/stores/user';

vi.mock('@/includes/fireBase', () => ({
	authentication: {
		signInWithEmailAndPassword: () => Promise.resolve()
	}
}));

describe('user-store', () => {
	beforeEach(() => {
		setActivePinia(createPinia());
	});

	it('log-in user', async () => {
		const userStore = useUserStore();

		expect(userStore.loggedIn).toBe(false);

		await userStore.logIn({});

		expect(userStore.loggedIn).toBe(true);
	});
});