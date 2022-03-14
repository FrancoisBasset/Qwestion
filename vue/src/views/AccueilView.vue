<template>
	<div>
		<div v-if="!accountStore.user">
			<label>Username : </label><input type="text" v-model="form.register.username">
			<label>Password :</label><input type="password" v-model="form.register.password">
			<label>Firstname :</label><input type="text" v-model="form.register.firstname">
			<label>Lastname :</label><input type="text" v-model="form.register.lastname">
			<button @click="register()">Inscription</button>
			<br>
			<label v-if="registerStatus === 201">L'utilisateur {{ form.register.username }} a bien été crée !</label>
			<label v-if="registerStatus === 400">L'utilisateur {{ form.register.username }} existe déjà !</label>
			<br>

			<label>Username : </label><input type="text" v-model="form.login.username">
			<label>Password : </label><input type="password" v-model="form.login.password">
			<button @click="login()">Connexion</button>
			<br>
			<label v-if="loginStatus === 200 || accountStore.user">Connexion reussie !<br>{{ accountStore.user }}</label>
			<label v-if="loginStatus === 401">Mauvais identifiants !</label>
			<br>

			<input type="text" v-model="form.delete.username">
			<button @click="deleteAccount()">Supprimer compte</button>
		</div>
		<div v-if="accountStore.user">
			<input type="text" v-model="form.edit.firstname">
			<input type="text" v-model="form.edit.lastname">
			<input type="text" v-model="form.edit.quizApiToken">
			<input type="text" v-model="form.edit.apiNinjasToken">

			<input type="file" @change="changeWallpaper($event)">
			<button @click="editAccount()">Sauvegarder</button>

			<img v-if="accountStore.user && accountStore.user.wallpaper" :src="'data:image/jpeg;charset=utf-8;base64,' + accountStore.user.wallpaper" width="200"><br>

			<input type="password" v-model="form.edit.password">
			<button @click="changePassword()">Reinitialiser mot de passe</button>

			<button @click="logout()">Déconnexion</button><br><br>

			<button @click="deleteAccount()">Supprimer compte</button>
		</div>

		<h1>Token : {{ token }}</h1>
		<h1>Categories : {{ categories }}</h1>
		<h1>Questions : {{ questions }}</h1>

		<h1>Current API : {{ apisstore.currentApi.name }}</h1>

		<table>
			<thead>
				<tr>
					<td>Name</td>
					<td>Id</td>
					<td>Store</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for="api in apisstore.apis" :key="api">
					<td>{{ api.name }}</td>
					<td>{{ api.id }}</td>
					<td>{{ api.store.token }}</td>
					<td>
						<button @click="apisstore.setCurrentApi(api.id)">Set {{ api.name }}</button>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script setup>
import useOpentdb from '../stores/opentdb';
import useApisstore from '../stores/apisstore';
import useAccountStore from '../stores/account';
</script>

<script>
export default {
	data() {
		return {
			token: '',
			categories: [],
			questions: [],
			opentdb: useOpentdb(),
			apisstore: useApisstore(),
			accountStore: useAccountStore(),

			form: {
				register: {
					username: '',
					password: '',
					firstname: '',
					lastname: ''
				},
				login: {
					username: '',
					password: ''
				},
				edit: {
					firstname: '',
					lastname: '',
					quizApiToken: '',
					apiNinjasToken: '',
					wallpaper: null,
					password: ''
				},
				delete: {
					username: ''
				}
			},
			registerStatus: null,
			loginStatus: null
		};
	},
	async created() {
		this.token = await this.opentdb.token;
		this.categories = await this.opentdb.categories;
		this.questions = await this.opentdb.getNewQuestions(10, 23, 'hard', 'multiple');
	},
	mounted() {
		this.form.edit.firstname = this.accountStore.user ? this.accountStore.user.firstname : '';
		this.form.edit.lastname = this.accountStore.user ? this.accountStore.user.lastname : '';
		this.form.edit.quizApiToken = this.accountStore.user ? this.accountStore.user.quizApiToken : '';
		this.form.edit.apiNinjasToken = this.accountStore.user ? this.accountStore.user.apiNinjasToken : '';
	},
	methods: {
		register() {
			this.accountStore.register(this.form.register.username, this.form.register.password, this.form.register.firstname, this.form.register.lastname).then(status => {
				this.registerStatus = status;
			});
		},
		login() {
			this.accountStore.login(this.form.login.username, this.form.login.password).then(status => {
				this.loginStatus = status;

				this.form.edit.firstname = this.accountStore.user.firstname;
				this.form.edit.lastname = this.accountStore.user.lastname;
				this.form.edit.quizApiToken = this.accountStore.user.quizApiToken;
				this.form.edit.apiNinjasToken = this.accountStore.user.apiNinjasToken;
			});
		},
		changeWallpaper(e) {
			this.form.edit.wallpaper = e.target.files[0];
		},
		editAccount() {
			if (this.form.edit.wallpaper) {
				const reader = new FileReader();
				reader.readAsDataURL(this.form.edit.wallpaper);
				reader.onload = () => {
					this.accountStore.editAccount(
						this.form.edit.firstname,
						this.form.edit.lastname,
						this.form.edit.quizApiToken,
						this.form.edit.apiNinjasToken,
						reader.result.substr(23)
					).then(function() {
						alert('Account updated !');
					});
				};
			} else {
				this.accountStore.editAccount(this.form.edit.firstname, this.form.edit.lastname, this.form.edit.quizApiToken, this.form.edit.apiNinjasToken, null).then(function() {
					alert('Account updated !');
				});
			}
		},
		changePassword() {
			this.accountStore.changePassword(this.form.edit.password).then(() => {
				this.form.edit.password = '';
				alert('Password changed !');
			});
		},
		logout() {
			this.accountStore.logout();
		},
		deleteAccount() {
			this.accountStore.delete(this.accountStore.user ? null : this.form.delete.username);
		}
	}
}
</script>