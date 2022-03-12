import { defineStore } from 'pinia';

export default defineStore({
	id: 'opentdb',
	getters: {
		token() {
			return localStorage.getItem('opentdb.token') ?? fetch('https://opentdb.com/api_token.php?command=request').then(function(res) {
				return res.json().then(function(json) {
					localStorage.setItem('opentdb.token', json.token);
					return json.token;
				});
			});
		},
		categories() {
			return localStorage.getItem('opentdb.categories') ?? fetch('https://opentdb.com/api_category.php').then(function(res) {
				return res.json().then(function(json) {
					localStorage.setItem('opentdb.categories', JSON.stringify(json.trivia_categories));
					return json.trivia_categories;
				});
			});
		}
	},
	actions: {
		async getNewQuestions(number, category, difficulty, type) {
			const baseUrl = 'https://opentdb.com/api.php?amount=' + number + '&category=' + category + '&difficulty=' + difficulty + '&type=' + type;
			
			return fetch(baseUrl + '&token=' + await this.token).then(async response => {
				return response.json().then(async json => {
					if (json.response_code === 3) {
						localStorage.removeItem('opentdb.token');
						return fetch(baseUrl + '&token=' + await this.token).then(function(response) {
							return response.json().then(function(json) {
								return json.results;
							});
						});
					}

					return json.results;
				});
			});
		}
	}
});