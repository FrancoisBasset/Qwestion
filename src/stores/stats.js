import { defineStore } from 'pinia';
import useAccountStore from './account';

export default defineStore({
	id: 'stats',
	getters: {
		user() {
			return useAccountStore().user;
		}
	},
	actions: {
		addStat(api, category, difficulty, correct, incorrect) {
			if (this.user) {
				fetch('/api/stats', {
					method: 'POST',
					headers: {
						Authorization: `Bearer ${this.user.token}`,
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						date: new Date().toLocaleString().split(',')[0],
						api: api,
						category: category,
						difficulty: difficulty,
						correct: correct,
						incorrect: incorrect
					})
				});
			}
		},
		getStats() {
			return fetch('/api/stats', {
				headers: {
					Authorization: `Bearer ${this.user.token}`
				}
			}).then(function(response) {
				return response.json().then(function(json) {
					return json;
				});
			});
		}
	}
});
