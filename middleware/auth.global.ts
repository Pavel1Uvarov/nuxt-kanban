import { useAppWrite } from '~/utils/appwrite';
import { useAuthStore } from '~/store/auth.store';

export default defineNuxtRouteMiddleware(async (to, from) => {
	const appwrite = useAppWrite();
	const authStore = useAuthStore();

	try {
		setTimeout(async () => {
			const user = await appwrite.account.get().catch(() => {});

			if (user) authStore.setUser(user);

			if (user && to.name === 'login') {
				return navigateTo('/');
			}
			else if (!user && to.name !== 'login') {
				return navigateTo('/login');
			}
		});
	}
	catch (error) {
		console.error(error);
		return navigateTo('/login');
	}
});
