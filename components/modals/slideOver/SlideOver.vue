<template>
	<div
		class="relative z-10"
		aria-labelledby="slide-over-title"
		role="dialog"
		aria-modal="true"
	>
		<!-- Background backdrop, show/hide based on slide-over state. -->
		<transition>
			<div
				v-if="isOpen"
				class="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity"
				@click="close"
			/>
		</transition>

		<div class="fixed inset-0 overflow-hidden">
			<div class="absolute inset-0 overflow-hidden">
				<transition name="slide-over">
					<div
						v-if="isOpen"
						class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16"
					>
						<div class="pointer-events-auto w-screen max-w-md">
							<div class="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
								<div class="h-0 flex-1 overflow-y-auto">
									<div class="bg-white px-4 py-4 border-b">
										<div class="flex items-center justify-between">
											<h2
												id="slide-over-title"
												class="text-base font-semibold leading-6"
											>
												{{ title }}
											</h2>
											<div class="ml-3 flex h-7 items-center">
												<UiButton
													variant="ghost"
													class="p-0"
													@click="close"
												>
													<Icon
														name="line-md:close"
														size="20"
														color="black"
													/>
												</UiButton>
											</div>
										</div>
									</div>
									<div class="flex flex-1 flex-col justify-between px-4">
										<slot name="content" />
									</div>
								</div>
								<div class="flex flex-shrink-0 justify-end px-4 py-4">
									<slot name="footer" />
								</div>
							</div>
						</div>
					</div>
				</transition>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
	show: boolean;
	title: string;
}>(), {
	show: false,
	title: 'Header',
});

const emit = defineEmits<{
	(e: 'onClose'): void;
}>();

const isOpen = ref(false);

const close = () => {
	isOpen.value = false;
	setTimeout(() => {
		emit('onClose');
	}, 300);
};

watch(() => props.show, (value) => {
	if (value) {
		setTimeout(() => {
			isOpen.value = true;
		}, 300);
	}
});
</script>

<style scoped>
.slide-over-enter-active, .slide-over-leave-active {
	transition: transform 0.3s ease-in-out;
}
.slide-over-enter-from, .slide-over-leave-to {
	transform: translateX(100%);
}
.slide-over-enter-to, .slide-over-leave-from {
	transform: translateX(0%);
}
</style>
