<template>
	<div
		class="relative z-10"
		aria-labelledby="modal-title"
		aria-modal="true"
	>
		<div
			class="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity"
			@click="close"
		/>

		<div class="fixed inset-0 z-10 w-screen overflow-y-auto">
			<div class="flex min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
				<!-- Modal content -->
				<div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full max-w-lg shadow">
					<!-- Modal header -->
					<div class="flex items-center justify-between px-5 py-2 border-b rounded-t dark:border-gray-600">
						<h3 class="text-xl font-semibold text-gray-900 dark:text-white">
							{{ title }}
						</h3>
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
					<!-- Modal body -->
					<div class="p-4 md:p-5 space-y-4 bg-gray-50">
						<slot name="content" />
					</div>
					<!-- Modal footer -->
					<div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
						<slot name="footer" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
defineProps({
	title: {
		type: String,
		default: 'Header',
	},
});

const emit = defineEmits<{
	(e: 'onClose'): void;
}>();

const close = () => emit('onClose');
</script>

<style>

</style>
