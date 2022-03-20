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
		<button @click="register()" :disabled="!correctForm">S'enregistrer</button>
		<br>
		<br>
		
		<RegisterModal v-show="status" @closeRegisterModal="status = null" :status="status" :username="readonlyUsername" />
	</div>
</template>

<script>
import useAccountStore from '../stores/account';
import RegisterModal from './RegisterModal.vue';

export default {
	components: { RegisterModal },
	data() {
		return {
			accountStore: useAccountStore(),
			username: '',
			password: '',
			firstname: '',
			lastname: '',
			status: '',
			readonlyUsername: ''
		};
	},
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
		}
	}
}
</script>