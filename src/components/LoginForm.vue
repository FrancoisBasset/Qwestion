<template>
	<div>
		<h1>Connexion</h1>

		<InputText type="text" v-model="username">Nom d'utilisateur</InputText>
		
		<InputText type="password" v-model="password">Mot de passe</InputText>

		<PrimaryButton @click="login()" :disabled="!correctForm">Se connecter</PrimaryButton>
		
		<AlertMessage v-show="incorrectLogin" :success="false">Identifiants incorrects !</AlertMessage>
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
import InputText from './lib/InputText.vue';
import PrimaryButton from './lib/PrimaryButton.vue';
import AlertMessage from './lib/AlertMessage.vue';

export default {
	components: {
		InputText,
		PrimaryButton,
		AlertMessage
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
