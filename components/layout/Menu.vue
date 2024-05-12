<template>
	<div class="space-y-2 font-medium">
		<NuxtLink
			v-for="(item, index) in items"
			:key="index"
			class="flex items-center py-2 px-4 rounded-lg text-white hover:bg-gray-100 hover:bg-gray-700 group"
			:to="item.url"
			exact-active-class="bg-gray-700"
		>
			<Icon
				:name="item.icon"
				class="mr-3"
			/>
			{{ item.name }}
		</NuxtLink>
	</div>
</template>

<script lang="ts" setup>
import { MENU_DATA, type IMenuItem } from '../../data/menu.data';

const items = ref<IMenuItem[]>(MENU_DATA);
</script>
