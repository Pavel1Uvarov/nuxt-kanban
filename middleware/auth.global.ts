import { useAppWrite } from '~/utils/appwrite';
import { useAuthStore } from '~/store/auth.store';

export default defineNuxtRouteMiddleware(async (to) => {
	try {
		const appwrite = useAppWrite();
		const authStore = useAuthStore();

		const user = await appwrite.account.get().catch(() => {});

		if (user) {
			authStore.setUser(user);

			if (to.name === 'login') {
				return navigateTo('/');
			}
		}
		else if (to.name !== 'login') {
			return navigateTo('/login');
		}
	}
	catch (error) {
		console.error(error);
		return navigateTo('/login');
	}
});
