<template>
	<div>
		<div v-if="canAccess" class="center">
			<h1>Liste des utilisateurs</h1>
			<br>
			<br>
			<table>
				<thead>
					<tr>
						<td><b>Nom d'utilisateur</b></td>
						<td><b>Prénom</b></td>
						<td><b>Nom</b></td>
						<td><b>Fond d'écran</b></td>
						<td></td>
					</tr>
				</thead>
				<tbody>
					<tr v-for="user in users" :key="user.username">
						<td>{{ user.username }}</td>
						<td>{{ user.firstname }}</td>
						<td>{{ user.lastname }}</td>
						<td>
							<img :src="user.wallpaper" width="200" />
						</td>
						<td>
							<PrimaryButton v-if="user.username !== 'admin'" @click="deleteAccount(user.username)" style="padding: 5px">
								<svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="30px" height="30px"><path d="M 13 3 A 1.0001 1.0001 0 0 0 11.986328 4 L 6 4 A 1.0001 1.0001 0 1 0 6 6 L 24 6 A 1.0001 1.0001 0 1 0 24 4 L 18.013672 4 A 1.0001 1.0001 0 0 0 17 3 L 13 3 z M 6 8 L 6 24 C 6 25.105 6.895 26 8 26 L 22 26 C 23.105 26 24 25.105 24 24 L 24 8 L 6 8 z"/></svg>
							</PrimaryButton>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div v-else class="center">
			<h1>Ouste !</h1>
		</div>
	</div>
</template>

<style scoped>
.center {
	display: block;
	text-align: center;
}

table {
	margin-left: auto;
	margin-right: auto;
}
</style>

<script>
import useAccountStore from '../stores/account';
import PrimaryButton from '../components/lib/PrimaryButton.vue';

export default {
	components: {
		PrimaryButton
	},
	data() {
		return {
			accountStore: useAccountStore(),
			canAccess: false,
			users: []
		};
	},
	created() {
		if (this.accountStore.user === null) {
			return;
		}
		if (this.accountStore.user.username !== 'admin') {
			return;
		}

		this.accountStore.listusers().then(users => {
			if (users) {
				this.canAccess = true;
				this.users = users;
			}
		});
	},
	methods: {
		async deleteAccount(username) {
			await this.accountStore.delete(username);
			this.users = await this.accountStore.listusers();
		}
	}
};
</script>
