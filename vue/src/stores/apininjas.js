import { defineStore } from 'pinia';

export default defineStore({
	id: 'apininjas',
	state: () => {
		return {
			token: 'token apininjas'
		};
	},
	getters: {
		categories() {
			return [];
		}
	},
	actions: {
		async getNewQuestions(number, category, difficulty, type) {
			return [];
		}
	}
});