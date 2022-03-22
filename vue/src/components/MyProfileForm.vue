<template>
	<div>
		<h1>Modifier mon profil</h1>
		<label>Nom d'utilisateur : </label><input type="text" v-model="username" disabled="disabled" />
		<br>
		<br>
		<label>Prénom : </label><input type="text" v-model="firstname" />
		<br>
		<br>
		<label>Nom : </label><input type="text" v-model="lastname" />
		<br>
		<br>
		<label>QuizAPI token : </label><input type="text" v-model="quizApiToken" />
		<br>
		<br>
		<label>ApiNinjas token : </label><input type="text" v-model="apiNinjasToken" />
		<br>
		<br>
		<h1>Modifier mon mot de passe</h1>
		<label>Mot de passe : </label><input type="password" v-model="password" />
		<br>
		<br>
		<input type="file" id="inputFile" @change="pickWallpaper($event)" style="visibility: hidden" ><br>
		<h1>Modifier mon fond d'écran</h1>
		<img v-if="wallpaper" id="wallpaper" @click="clickOnPicker()" :src="wallpaper" width="300" height="200" />
		<div v-else id="wallpaper" @click="clickOnPicker()">
			Vide
		</div>
		<br>
		<br>
		<button @click="register()" :disabled="!correctForm">S'enregistrer</button>
		<br>
		<br>
		<br>
		<label id="message" ref="message">Modifications sauvegardés !</label>
	</div>
</template>

<style scoped>
#wallpaper {
	width: 300px;
	height: 200px;
	background-color: grey;
	margin-left: auto;
	margin-right: auto;
	cursor: pointer;
}

#message {
	padding: 20px;
	background-color: seagreen;
	color: white;
	visibility: hidden;
}

.visible {
	visibility: visible;
}
</style>

<script>
import useAccountStore from '../stores/account';

export default {
	data() {
		return {
			accountStore: useAccountStore(),
			username: '',
			password: '',
			firstname: '',
			lastname: '',
			quizApiToken: '',
			apiNinjasToken: '',
			wallpaper: '',
			status: '',
		};
	},
	created() {
		this.username = this.accountStore.user.username;
		this.firstname = this.accountStore.user.firstname;
		this.lastname = this.accountStore.user.lastname;
		this.quizApiToken = this.accountStore.user.quizApiToken;
		this.apiNinjasToken = this.accountStore.user.apiNinjasToken;
		this.wallpaper = this.accountStore.user.wallpaper;
	},
	computed: {
		correctForm() {
			return this.firstname && this.lastname;
		}
	},
	emits: ['closeRegisterModal'],
	methods: {
		async register() {
			await this.accountStore.editAccount(this.firstname, this.lastname, this.quizApiToken, this.apiNinjasToken, this.wallpaper);
			this.$refs.message.style.visibility = 'visible';
			setTimeout(() => {
				this.$refs.message.style.visibility = 'hidden';
			}, 5000);
		},
		clickOnPicker() {
			document.getElementById('inputFile').click();
		},
		pickWallpaper(event) {
			const reader = new FileReader();
			reader.readAsDataURL(event.target.files[0]);
			reader.onload = () => {
				this.wallpaper = reader.result;
			};
		}
	}
}
</script>