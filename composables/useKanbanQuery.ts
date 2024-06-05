import { useQuery } from '@tanstack/vue-query';
import { KANBAN_DATA } from '~/data/kanban.data';
import type { IRecord } from '~/types/records.types';

export const useKanbanQuery = () => {
	const config = useRuntimeConfig();
	const appwrite = useAppWrite();

	return useQuery({
		queryKey: ['records'],
		queryFn: async () => appwrite.DB.listDocuments(config.public.APP_WRITE_PROJECT_DB_ID, config.public.APP_WRITE_RECORDS_COLLECTION_ID),
		select(data) {
			const newBoard = [...KANBAN_DATA];
			const records = data.documents as unknown as IRecord[];
			console.log(newBoard, records);
		},
	});
};
