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
		
		<RegisterModal v-show="status" @closeRegisterModal="status = null" :status="status" :username="readonlyUsername" />
	</div>
</template>

<script>
import useAccountStore from '../stores/account';
import InputText from './lib/InputText.vue';
import PrimaryButton from './lib/PrimaryButton.vue';
import RegisterModal from './RegisterModal.vue';

export default {
	components: {
		InputText,
		PrimaryButton,
		RegisterModal
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
	emits: ['closeRegisterModal'],
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
		},
		async deleteAccount() {
			await this.accountStore.delete(this.usernameToDelete);
			this.usernameToDelete = '';
		}
	}
};
</script>
