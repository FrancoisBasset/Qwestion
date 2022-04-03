<template>
	<button @click="goToConsoleAdmin()">Console Admin</button>
</template>

<style scoped>
button {
	width: 150px;
}
</style>

<script>
export default {
	methods: {
		goToConsoleAdmin() {
			this.$router.push('/admin');
		}
	}
};
</script>