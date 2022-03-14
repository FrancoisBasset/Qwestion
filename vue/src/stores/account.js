import { defineStore } from 'pinia';

async function hashPassword(password) {
	const hashBuffer = await crypto.subtle.digest(
		'SHA-512',
		new TextEncoder().encode(password)
	);
	
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export default defineStore({
	id: 'account',
	state: () => {
		return {
			user: JSON.parse(localStorage.getItem('account.user')) ?? null
		};
	},
	actions: {
		async register(username, password, firstname, lastname) {
			return fetch('http://localhost:2022/inscription', {
				method: 'POST',
				body: JSON.stringify({
					username: username,
					password: await hashPassword(password),
					firstname: firstname,
					lastname: lastname
				})
			}).then(function(response) {
				return response.status;
			});
		},
		async login(username, password) {
			return fetch('http://localhost:2022/connexion', {
				headers: {
					Authorization: 'Basic ' + btoa(username + ':' + await hashPassword(password))
				}
			}).then(response => {
				if (response.status === 200) {
					return response.json().then(json => {
						localStorage.setItem('account.user', JSON.stringify(json));
						this.user = json;
						return response.status;
					});
				}
				return response.status;
			});
		},
		editAccount(firstname, lastname, quizApiToken, apiNinjasToken, wallpaper) {
			let body = {
				firstname: firstname,
				lastname: lastname,
				quizApiToken: quizApiToken,
				apiNinjasToken: apiNinjasToken
			};
			if (wallpaper) {
				body.wallpaper = wallpaper;
			}

			return fetch('http://localhost:2022/editionprofil', {
				headers: {
					Authorization: 'Bearer ' + this.user.token
				},
				method: 'PUT',
				body: JSON.stringify(body)
			}).then(() => {
				this.user.firstname = firstname;
				this.user.lastname = lastname;
				this.user.quizApiToken = quizApiToken;
				this.user.apiNinjasToken = apiNinjasToken;
				if (wallpaper) {
					this.user.wallpaper = wallpaper;
				}
				
				localStorage.setItem('account.user', JSON.stringify(this.user));
			});
		},
		async changePassword(password) {
			return fetch('http://localhost:2022/editionprofil', {
				headers: {
					Authorization: 'Bearer ' + this.user.token
				},
				method: 'PUT',
				body: JSON.stringify({
					password: await hashPassword(password)
				})
			});
		},
		logout() {
			localStorage.removeItem('account.user');
			this.user = null;
		},
		delete(username) {
			return fetch('http://localhost:2022/desinscription', {
				method: 'DELETE',
				headers: {
					Authorization: 'Bearer ' + (username ?? this.user.username)
				}
			}).then(() => {
				this.logout();
			});
		}
	}
});