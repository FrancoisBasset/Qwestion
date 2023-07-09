<template>
	<div>
		<h1>Inscription</h1>
		<br>
		<br>
		<label>Nom d'utilisateur : </label><input type="text" v-model="username" />
		<br>
		<br>
		<label>Mot de passe : </label><input type="password" v-model="password" />
		<br>
		<br>
		<label>Prénom : </label><input type="text" v-model="firstname" />
		<br>
		<br>
		<label>Nom : </label><input type="text" v-model="lastname" />
		<br>
		<br>
		<PrimaryButton @click="register()" :disabled="!correctForm">S'enregistrer</PrimaryButton>
		<br>
		<br>
		<label>Mot de passe oublié ? Voulez-vous supprimer votre compte ?</label>
		<br>
		<br>
		<input type="text" v-model="usernameToDelete" />
		<br>
		<br>
		<PrimaryButton id="deleteAccountButton" @click="deleteAccount()">Supprimer compte</PrimaryButton>
		
		<RegisterModal v-show="status" @closeRegisterModal="status = null" :status="status" :username="readonlyUsername" />
	</div>
</template>

<script setup>
import RegisterModal from './RegisterModal.vue';
</script>

<script>
import useAccountStore from '../stores/account';
import PrimaryButton from './lib/PrimaryButton.vue';

export default {
	components: {
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
