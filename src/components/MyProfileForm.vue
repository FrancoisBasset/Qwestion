<template>
	<div>
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
		<input type="file" id="inputFile" @change="pickWallpaper($event)" style="visibility: hidden" ><br>
		<img v-if="wallpaper" id="wallpaper" @click="clickOnPicker()" alt="wallpaper" :src="wallpaper" width="300" height="200" />
		<div v-else id="wallpaper" @click="clickOnPicker()">
			Vide
		</div>
		<br>
		<button @click="emptyWallpaper()">Vider le fond d'écran</button>
		<br>
		<br>
		<button @click="register()" :disabled="!correctForm">Enregistrer</button>
		<br>
		<br>
		<label>Mot de passe : </label><input type="password" v-model="password" />
		<br>
		<br>
		<button @click="changePassword()">Modifier mon mot de passe</button>
		<br>
		<label id="message" ref="message">Modifications sauvegardés !</label>
		<br>
		<br>
		<button id="deleteAccountButton" @click="deleteAccount()">!! Supprimer mon compte !!</button>
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

#deleteAccountButton {
	color: white;
	background-color: red;
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
				document.body.style.backgroundImage = `url(${this.wallpaper})`;
			};
		},
		emptyWallpaper() {
			this.wallpaper = null;
			document.body.style.backgroundImage = '';
		},
		async changePassword() {
			await this.accountStore.changePassword(this.password);
			this.$refs.message.style.visibility = 'visible';
			setTimeout(() => {
				this.$refs.message.style.visibility = 'hidden';
			}, 5000);
		},
		async deleteAccount() {
			await this.accountStore.delete();
			this.$router.push('/');
		}
	}
};
</script>
