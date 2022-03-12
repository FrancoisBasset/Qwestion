import { defineStore } from 'pinia';

export default defineStore({
	id: 'quizapi',
	state: () => {
		return {
			token: 'token quizapi'
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