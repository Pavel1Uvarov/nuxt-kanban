<template>
	<section class="grid grid-cols-7 h-screen">
		<LayoutSidebar class="col-span-1" />
		<div class="col-span-6 flex flex-col">
			<LayoutHeader class="flex-none" />
			<div class="p-5 flex-1 overflow-auto bg-slate-100">
				<slot />
			</div>
		</div>
	</section>
</template>

<script lang="ts" setup>

</script>
