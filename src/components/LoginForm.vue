<template>
	<div>
		<h1>Se connecter</h1>
		<br>
		<br>
		<label>Nom d'utilisateur : </label><input type="text" v-model="username" />
		<br>
		<br>
		<label>Mot de passe : </label><input type="password" v-model="password" />
		<br>
		<br>
		<PrimaryButton @click="login()" :disabled="!correctForm">Se connecter</PrimaryButton>
		<br>
		<br>
		<br>
		<label id="message" v-show="incorrectLogin">Identifiants incorrects !</label>
	</div>	
</template>

<style scoped>
#message {
	padding: 20px;
	background-color: crimson;
	color: white;
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
			accountStore: useAccountStore(),
			username: '',
			password: '',
			incorrectLogin: false
		};
	},
	computed: {
		correctForm() {
			return this.username && this.password;
		}
	},
	methods: {
		async login() {
			const status = await this.accountStore.login(this.username, this.password);

			if (status === 200) {
				document.body.style.backgroundImage = `url(${this.accountStore.user.wallpaper})`;
				this.$router.push('/');
			} else {
				this.incorrectLogin = true;
			}
		}
	}
};
</script>
