<template>
	<section class="bg-gray-50 dark:bg-gray-900">
		<div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
			<div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
				<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
					<h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
						Sign in to your account
					</h1>
					<form
						class="space-y-4 md:space-y-6"
						@submit="submit"
					>
						<div v-show="ui.isRegistration">
							<UiLabel
								for="nameField"
							>
								Name
							</UiLabel>
							<UiInput
								id="nameField"
								v-model="formData.name"
								type="text"
							/>
						</div>
						<div>
							<UiLabel
								for="emailField"
							>
								Email address
							</UiLabel>
							<UiInput
								id="emailField"
								v-model="formData.email"
								type="email"
							/>
						</div>
						<div>
							<UiLabel
								for="passField"
							>
								Password
							</UiLabel>
							<UiInput
								id="passField"
								v-model="formData.password"
								type="password"
							/>
						</div>

						<div class="flex items-center justify-between">
							<div />
							<a
								href="#"
								class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
							>Forgot password?</a>
						</div>
						<UiButton
							variant="default"
							class="w-full"
						>
							<Loader2
								v-show="ui.loading"
								class="w-4 h-4 mr-2 animate-spin"
							/>
							{{ !ui.isRegistration ? "Sign In" : "Sign Up" }}
						</UiButton>
						<p class="text-sm font-light text-gray-500 dark:text-gray-400">
							{{ !ui.isRegistration ? 'Don’t have an account yet? ' : 'Already have account? ' }}<a
								href="#"
								class="font-medium text-primary-600 hover:underline dark:text-primary-500"
								@click="ui.isRegistration = !ui.isRegistration"
							> {{ !ui.isRegistration ? 'Sign up' : 'Sign In' }}</a>
						</p>
					</form>
				</div>
			</div>
		</div>
	</section>
</template>

<script lang="ts" setup>
import { Loader2 } from 'lucide-vue-next';
import { useAuthStore } from '~/store/auth.store';

definePageMeta({
	layout: 'auth',
});

useSeoMeta({
	title: 'Login | CRM Kanban',
});

const authStore = useAuthStore();
const router = useRouter();
const appwrite = useAppWrite();

const formData = ref({
	email: '',
	password: '',
	name: '',
});

const ui = reactive({
	loading: false,
	isRegistration: false,
});

const submit = async (e: Event) => ui.isRegistration ? await register(e) : await login(e);

const login = async (e: Event) => {
	e.preventDefault();

	ui.loading = true;

	try {
		await appwrite.account.createEmailPasswordSession(
			formData.value.email,
			formData.value.password,
		);

		const user = await appwrite.account.get();

		authStore.setUser({
			email: user.email,
			name: user.name,
			status: true,
		});

		router.push('/');
	}
	catch (err) {
		console.log(err);
	}

	ui.loading = false;
};

const register = async (e: Event) => {
	e.preventDefault();

	ui.loading = true;

	await appwrite.account.create(
		appwrite.ID.unique(),
		formData.value.email,
		formData.value.password,
		formData.value.name,
	);

	await login(e);
};
</script>
