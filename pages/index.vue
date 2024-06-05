<template>
	<div>
		<h2 class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
			CRM Board
		</h2>

		<div class="grid grid-cols-4 gap-16 mt-4">
			<div
				v-for="(column, index) in data"
				:key="index"
			>
				<div class="rounded bg-slate-700 py-1 px-5 mb-2 text-center text-white">
					{{ column.name }}
				</div>
				<div class="p-1 gap-4 bg-white">
					<UiCard
						v-for="(card, index) in column.cards"
						:key="index"
					>
						<UiCardHeader>
							<UiCardTitle>Card Title</UiCardTitle>
						</UiCardHeader>
						<UiCardContent>
							<p>Card Body</p>
						</UiCardContent>
						<UiCardFooter>
							<p>Card Footer</p>
						</UiCardFooter>
					</UiCard>
					<UiButton
						class="w-full border border-gray-300 border-dashed hover:bg-gray-200"
						variant="secondary"
					>
						<Icon
							name="line-md:plus"
							size="20"
							color="black"
						/>
					</UiButton>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useKanbanQuery } from '@/composables/useKanbanQuery';

const route = useRoute();

useSeoMeta({
	title: 'Home | CRM Kanban',
});

const { data, isLoading, refetch } = useKanbanQuery();

console.log(data.value);
</script>
