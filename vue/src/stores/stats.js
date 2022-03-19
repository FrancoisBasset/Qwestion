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
			fetch('http://localhost:2022/ajoutstat', {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${this.user.token}`
				},
				body: JSON.stringify({
					date: new Date(),
					api: api,
					category: category,
					difficulty: difficulty,
					correct: correct,
					incorrect: incorrect
				})
			});
		},
		getStats() {
			return fetch('http://localhost:2022/listestats', {
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