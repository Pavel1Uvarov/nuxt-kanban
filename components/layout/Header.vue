<template>
	<header class="bg-white shadow-md py-4 px-3 flex justify-between">
		<div />
		<div>
			<UiButton
				variant="ghost"
				@click="logout"
			>
				<Icon
					name="line-md:log-out"
					size="20"
					color="black"
				/>
			</UiButton>
		</div>
	</header>
</template>

<script lang="ts" setup>
import { useAuthStore } from '~/store/auth.store';

const authStore = useAuthStore();
const router = useRouter();
const appwrite = useAppWrite();

const logout = async () => {
	await appwrite.account.deleteSession('current');
	authStore.clear();
	router.push('/login');
};
</script>
