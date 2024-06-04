import { useAppWrite } from '~/utils/appwrite';

export default defineNuxtRouteMiddleware(async (to, from) => {
	const appwrite = useAppWrite();

	try {
		setTimeout(async () => {
			const user = await appwrite.account.get().catch(() => {});

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
