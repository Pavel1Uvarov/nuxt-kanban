import { useQuery } from '@tanstack/vue-query';
import { KANBAN_DATA } from '~/data/kanban.data';
import type { IColumn } from '~/types/kanban/kanban.types';
import type { IRecord } from '~/types/records.types';

export const useKanbanQuery = () => {
	const config = useRuntimeConfig();
	const appwrite = useAppWrite();

	return useQuery({
		queryKey: ['records'],
		queryFn: async () => appwrite.DB.listDocuments(config.public.APP_WRITE_PROJECT_DB_ID, config.public.APP_WRITE_RECORDS_COLLECTION_ID),
		select(data) {
			const newBoard: IColumn[] = KANBAN_DATA.map(column => ({
				...column,
				cards: [],
			}));
			const records = data.documents as unknown as IRecord[];

			records.forEach((record) => {
				const column = newBoard.find(column => column.id === record.status);
				if (column) {
					column.cards.push({
						id: record.$id,
						name: record.name,
						$createdAt: record.$createdAt,
						status: record.status,
					});
				}
			});

			return newBoard;
		},
	});
};
