<template>
	<PrimaryButton @click="logout()">Déconnexion</PrimaryButton>
</template>

<style scoped>
button {
	width: 150px;
}
</style>

<script>
import useAccountStore from '../stores/account';
import PrimaryButton from './lib/PrimaryButton.vue';

export default {
	components: {
		PrimaryButton
	},
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
};
</script>
