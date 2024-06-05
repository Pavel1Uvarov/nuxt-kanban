<template>
	<NuxtIsland>
		<Dialog>
			<UiDialogTrigger>
				Edit Profile
			</UiDialogTrigger>
			<UiDialogContent>
				<UiDialogHeader>
					<uiDialogTitle>Edit profile</uiDialogTitle>
					<UiDialogDescription>
						Make changes to your profile here. Click save when you're done.
					</UiDialogDescription>
				</UiDialogHeader>

				<UiDialogFooter>
					Save changes
				</UiDialogFooter>
			</UiDialogContent>
		</Dialog>
	</NuxtIsland>
</template>

<script lang="ts" setup>
import type { EnumStatus } from '~/types/records.types';

defineProps<{
	show: boolean;
	column: EnumStatus;
}>();
</script>
