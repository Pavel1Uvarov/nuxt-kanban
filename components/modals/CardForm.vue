t<template>
	<ModalsDialog @on-close="emit('onClose')">
		<template #content>
			<form @submit="onSubmit">
				<UiLabel
					for="nameField"
				>
					Name
				</UiLabel>
				<UiInput
					id="nameField"
					v-model="name"
					v-bind="nameAttrs"
					type="text"
				/>
			</form>
		</template>
		<template #footer>
			<UiButton
				variant="default"
				@click="onSubmit"
			>
				<Loader2
					v-show="isPending"
					class="w-4 h-4 mr-2 animate-spin"
				/>
				Submit
			</UiButton>
		</template>
	</ModalsDialog>
</template>

<script lang="ts" setup>
import { Loader2 } from 'lucide-vue-next';
import { useMutation } from '@tanstack/vue-query';
import type { EnumStatus, IRecord } from '~/types/records.types';

interface IRecordFormState extends Pick<IRecord, 'name'> {
	customer: {
		email: string;
		name: string;
	};
	status: string;
}

const props = defineProps<{
	column: EnumStatus;
}>();

const emit = defineEmits(['onSubmitted', 'onClose']);

const appwrite = useAppWrite();
const config = useRuntimeConfig();

const { handleSubmit, defineField, handleReset } = useForm<IRecordFormState>({
	initialValues: {
		status: props.column,
	},
});

const [name, nameAttrs] = defineField('name');

const ui = reactive({
	saving: false,
});

const { mutate, isPending } = useMutation({
	mutationKey: ['create-record-form'],
	mutationFn: (data: IRecordFormState) => appwrite.DB.createDocument(
		config.public.APP_WRITE_PROJECT_DB_ID,
		config.public.APP_WRITE_RECORDS_COLLECTION_ID,
		appwrite.ID.unique(),
		data,
	),
	onSuccess: () => {
		emit('onSubmitted');
		handleReset();
	},
});

const onSubmit = handleSubmit(async (data) => {
	ui.saving = true;
	await mutate(data);
	ui.saving = false;
});
</script>
