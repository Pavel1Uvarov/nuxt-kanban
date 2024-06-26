<template>
	<div>
		<h2 class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
			CRM Board
		</h2>

		<div class="grid grid-cols-4 gap-16 mt-4">
			<div
				v-for="(column) in data"
				:key="column.id"
				@dragover="handleDragOver"
				@drop="handleDragEnd(column)"
			>
				<div class="rounded bg-slate-700 py-1 px-5 mb-2 text-center text-white">
					{{ column.name }}
				</div>
				<div class="p-1 flex flex-col gap-4 bg-white">
					<UiCard
						v-for="(card, index) in column.cards"
						:key="index"
						draggable="true"
						class="cursor-pointer"
						@dragstart="handleDragStart(card, column)"
						@click="showCardDetailsModal(card)"
					>
						<UiCardHeader>
							<UiCardTitle>{{ card.name }}</UiCardTitle>
						</UiCardHeader>
						<UiCardContent>
							<p>Card Body</p>
						</UiCardContent>
						<UiCardFooter>
							<p>{{ dayjs(card.$createdAt) }}</p>
						</UiCardFooter>
					</UiCard>
					<UiButton
						class="w-full border border-gray-300 border-dashed hover:bg-gray-200"
						variant="secondary"
						@click="handleCardFormModal(column.id)"
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
		<ModalsCardForm
			v-show="ui.showCardFromModal"
			:column="selectedColumn"
			@on-submitted="submittedCard"
			@on-close="closeCardFormModal"
		/>
		<ModalsCardDetails
			v-show="ui.showCardDetailsModal"
			:card="selectedCard"
			:show="ui.showCardDetailsModal"
			@on-close="ui.showCardDetailsModal = false"
		/>
	</div>
</template>

<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query';
import dayjs from 'dayjs';
import { useKanbanQuery } from '@/composables/useKanbanQuery';
import type { ICard, IColumn } from '~/types/kanban/kanban.types';
import type { EnumStatus } from '~/types/records.types';

useSeoMeta({
	title: 'Home | CRM Kanban',
});

const appwrite = useAppWrite();
const config = useRuntimeConfig();

const selectedColumn = ref('todo');
const dragCard = ref<ICard | null>(null);
const sourceColumn = ref<IColumn | null>(null);
const selectedCard = ref<ICard | null>(null);
const ui = reactive({
	showCardFromModal: false,
	showCardDetailsModal: false,
});

const { data, refetch } = useKanbanQuery();

type TypeMutationVariables = {
	docId: string;
	status: EnumStatus;
};

const { mutate } = useMutation({
	mutationKey: ['move card'],
	mutationFn: async ({ docId, status }: TypeMutationVariables) => {
		return await appwrite.DB.updateDocument(
			config.public.APP_WRITE_PROJECT_DB_ID,
			config.public.APP_WRITE_RECORDS_COLLECTION_ID,
			docId, { status });
	},
	onSuccess: () => {
		refetch();
	},
});

const handleCardFormModal = (columnId: EnumStatus) => {
	selectedColumn.value = columnId;
	ui.showCardFromModal = true;
};

const closeCardFormModal = () => ui.showCardFromModal = false;

const submittedCard = () => {
	ui.showCardFromModal = false;
	refetch();
};

const showCardDetailsModal = (card: ICard) => {
	selectedCard.value = card;
	ui.showCardDetailsModal = true;
};

const handleDragStart = (record: ICard, column: IColumn) => {
	dragCard.value = record;
	sourceColumn.value = column;
};

const handleDragOver = (event: DragEvent) => {
	event.preventDefault();
};

const handleDragEnd = (targetColumn: IColumn) => {
	if (dragCard.value && sourceColumn.value && dragCard.value.id && sourceColumn.value.id) {
		mutate({ docId: dragCard.value.id, status: targetColumn.id });
	}

	dragCard.value = null;
	sourceColumn.value = null;
};
</script>
