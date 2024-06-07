import { useQuery } from '@tanstack/vue-query';

export function useComments({ cardId }: { cardId: string }) {
	const appwrite = useAppWrite();
	const config = useRuntimeConfig();

	return useQuery({
		queryKey: ['record', cardId],
		queryFn: () => appwrite.DB.getDocument(
			config.public.APP_WRITE_PROJECT_DB_ID,
			config.public.APP_WRITE_RECORDS_COLLECTION_ID,
			cardId,
		),
	});
}
