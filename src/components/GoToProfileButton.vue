<template>
	<router-link to="/monprofil">
		<PrimaryButton>Mon profil</PrimaryButton>
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
