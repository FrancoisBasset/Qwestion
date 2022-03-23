<template>
	<button @click="logout()">Déconnexion</button>
</template>

<style scoped>
button {
	width: 150px;
}
</style>

<script>
import useAccountStore from '../stores/account';

export default {
	data() {
		return {
			accountStore: useAccountStore()
		};
	},
	methods: {
		logout() {
			this.accountStore.logout();
			this.$router.push('/');
			document.body.style.backgroundImage = '';
		}
	}
}
</script>