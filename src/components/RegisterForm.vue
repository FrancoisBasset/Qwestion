<template>
	<div>
		<h1>Inscription</h1>
		
		<InputText type="text" v-model="username">Nom d'utilisateur</InputText>
		
		<InputText type="password" v-model="password">Mot de passe</InputText>
		
		<InputText type="text" v-model="firstname">Prénom</InputText>
		
		<InputText type="text" v-model="lastname">Nom</InputText>
		
		<PrimaryButton @click="register()" :disabled="!correctForm">S'enregistrer</PrimaryButton>

		<InputText type="text" v-model="usernameToDelete">Mot de passe oublié ? Voulez-vous supprimer votre compte ?</InputText>
		
		<PrimaryButton @click="deleteAccount()">Supprimer compte</PrimaryButton>
		
		<AlertMessage v-show="status" :success="status === 201">
			<text v-if="status === 201">Le compte {{ readonlyUsername }} a bien été crée !</text>
			<text v-else-if="status === 400">Ce compte existe déjà !</text>
		</AlertMessage>
	</div>
</template>

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
	data: () => ({
		accountStore: useAccountStore(),
		username: '',
		password: '',
		firstname: '',
		lastname: '',
		status: '',
		readonlyUsername: '',
		usernameToDelete: ''
	}),
	computed: {
		correctForm() {
			return this.username && this.password && this.firstname && this.lastname;
		}
	},
	methods: {
		async register() {
			this.readonlyUsername = this.username;
			this.status = await this.accountStore.register(this.username, this.password, this.firstname, this.lastname);

			if (this.status === 201) {
				this.username = '';
				this.password = '';
				this.firstname = '';
				this.lastname = '';
			}

			setTimeout(() => {
				this.status = null;
			}, 5000);
		},
		async deleteAccount() {
			await this.accountStore.delete(this.usernameToDelete);
			this.usernameToDelete = '';
		}
	}
};
</script>
