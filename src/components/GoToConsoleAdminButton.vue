<template>
	<PrimaryButton @click="goToConsoleAdmin()">Console Admin</PrimaryButton>
</template>

<style scoped>
button {
	width: 150px;
}
</style>

<script>
import PrimaryButton from './lib/PrimaryButton.vue';

export default {
	components: {
		PrimaryButton
	},
	methods: {
		goToConsoleAdmin() {
			this.$router.push('/admin');
		}
	}
};
</script>
