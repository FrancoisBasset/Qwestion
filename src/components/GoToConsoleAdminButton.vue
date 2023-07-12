<template>
	<router-link to="/admin">
		<PrimaryButton>Console Admin</PrimaryButton>
	</router-link>
</template>

<style scoped>
button {
	width: 150px;
}
</style>

<script setup>
import PrimaryButton from './lib/PrimaryButton.vue';
</script>
