<template>
	<ModalsSlideOver
		title="Details"
		:show="show"
		@on-close="close"
	>
		<template #content>
			<div>
				<dl class="divide-y divide-gray-100">
					<div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
						<dt class="text-sm font-medium leading-6 text-gray-900">
							Name
						</dt>
						<dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
							{{ card?.name }}
						</dd>
					</div>
					<div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
						<dt class="text-sm font-medium leading-6 text-gray-900">
							Status
						</dt>
						<dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
							{{ card?.status }}
						</dd>
					</div>
				</dl>
				<Comments :card-id="card.id" />
			</div>
		</template>
	</ModalsSlideOver>
</template>

<script lang="ts" setup>
import type { ICard } from '~/types/kanban/kanban.types';

defineProps<{
	show: boolean;
	card: ICard | null;
}>();

const emit = defineEmits<{
	(e: 'onClose'): void;
}>();

const close = () => {
	emit('onClose');
};
</script>
