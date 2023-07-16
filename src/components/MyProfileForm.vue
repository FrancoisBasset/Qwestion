<template>
	<div>
		<h1>Mon profil</h1>
		
		<InputText type="text" v-model="username" disabled="disabled">Nom d'utilisateur</InputText>
		
		<InputText type="text" v-model="firstname">Prénom</InputText>
		
		<InputText type="text" v-model="lastname">Nom</InputText>

		<InputText type="text" v-model="quizApiToken">QuizAPI token</InputText>
		
		<InputText type="text" v-model="apiNinjasToken">ApiNinjas token</InputText>
		
		<br>
		<input type="file" id="inputFile" @change="pickWallpaper($event)" style="visibility: hidden" ><br>
		<img v-if="wallpaper" id="wallpaper" @click="clickOnPicker()" alt="wallpaper" :src="wallpaper" width="300" height="200" />
		<div v-else id="wallpaper" @click="clickOnPicker()">
			Vide
		</div>
		<br>
		<PrimaryButton @click="emptyWallpaper()">Vider le fond d'écran</PrimaryButton>
		<br>
		<br>
		<PrimaryButton @click="register()" :disabled="!correctForm">Enregistrer</PrimaryButton>

		<InputText type="password" v-model="password">Mot de passe</InputText>
		
		<PrimaryButton @click="changePassword()">Modifier mon mot de passe</PrimaryButton>

		<AlertMessage v-if="saved">Modifications sauvegardés !</AlertMessage>

		<DangerButton @click="deleteAccount()">!! Supprimer mon compte !!</DangerButton>
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
</style>

<script>
import useAccountStore from '../stores/account';
import InputText from './lib/InputText.vue';
import PrimaryButton from './lib/PrimaryButton.vue';
import DangerButton from './lib/DangerButton.vue';
import AlertMessage from './lib/AlertMessage.vue';

export default {
	components: {
		InputText,
		PrimaryButton,
		DangerButton,
		AlertMessage
	},
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
			saved: false
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
			this.saved = true;
			setTimeout(() => {
				this.saved = false;
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
			this.saved = true;
			setTimeout(() => {
				this.saved = false;
			}, 5000);
		},
		async deleteAccount() {
			await this.accountStore.delete();
			this.$router.push('/');
		}
	}
};
</script>
