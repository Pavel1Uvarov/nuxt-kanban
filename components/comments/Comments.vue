<template>
	<UiTextarea
		v-model="commentField"
		placeholder="Add comment"
		@keyup.enter="submitComment"
	/>
	<UiSkeleton
		v-show="isLoading"
		class="w-full h-[75px] rounded shadow border"
	/>
	<ul
		v-show="!isLoading && card"
		class="flex flex-col gap-4 mt-4"
	>
		<li
			v-for="comment in card?.comments"
			:key="comment.$id"
			class="p-2 border shadow"
		>
			<div class="text-gray-500 text-sm whitespace-break-spaces break-words">
				{{ comment.text }}
			</div>
			<div class="flex items-center justify-end">
				<div class="ml-2">
					<div class="text-gray-500 text-sm">
						{{ dayjs(comment.$createdAt).format('MMMM DD YYYY') }}
					</div>
				</div>
			</div>
		</li>
	</ul>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs';
import { useComments } from '../../composables/useComments';
import { useCreateComment } from '../../composables/useCreateComment';
import type { IRecord } from '~/types/records.types';

const props = defineProps<{ cardId: string | null }>();

const { data, refetch, isLoading } = useComments({ cardId: props.cardId ?? '' });
const { commentField, submitComment } = useCreateComment({ cardId: props.cardId, refetch });

const card = data as unknown as IRecord;
</script>
