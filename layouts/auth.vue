<template>
	<section class="grid grid-cols-7">
		<div class="col-span-7">
			<slot />
		</div>
	</section>
</template>

<script lang="ts" setup>
definePageMeta({
	middleware: [
		'auth',
	],
});
</script>
