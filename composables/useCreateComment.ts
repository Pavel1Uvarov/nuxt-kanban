import { useMutation } from '@tanstack/vue-query';

interface ICreateCommentProps {
	cardId: string | null;
	refetch: () => void;
}

export function useCreateComment({ cardId, refetch }: ICreateCommentProps) {
	const appwrite = useAppWrite();
	const config = useRuntimeConfig();
	const commentField = ref();

	const { mutate } = useMutation({
		mutationKey: ['createComment', commentField.value],
		mutationFn: () =>
			appwrite.DB.createDocument(
				config.public.APP_WRITE_PROJECT_DB_ID,
				config.public.APP_WRITE_COMMENTS_COLLECTION_ID,
				appwrite.ID.unique(),
				{
					text: commentField.value,
					record: cardId,
				},
			),
		onSuccess: () => {
			refetch();
			commentField.value = '';
		},
	});

	const submitComment = () => {
		if (commentField.value) mutate();
	};

	return {
		submitComment,
		commentField,
	};
}
