import { defineStore } from 'pinia';

import useOpentdb from './opentdb';
import useQuizapi from './quizapi';
import useApininjas from './apininjas';

export default defineStore({
	id: 'apisstore',
	state: () => {
		return {
			currentApi: localStorage.getItem('apisstore.currentApi') ?? 'opentdb',
			apis: [
				{
					id: 'opentdb',
					name: 'Open Trivia Database',
					store: useOpentdb()
				},
				{
					id: 'quizapi',
					name: 'QuizAPI',
					store: useQuizapi()
				},
				{
					id: 'apininjas',
					name: 'APINinjas',
					store: useApininjas()
				}
			]
		};
	},
	actions: {
		getCurrentApi() {
			return this.apis.find(api => api.id === this.currentApi);
		},
		setCurrentApi(apiId) {
			this.currentApi = apiId;
			localStorage.setItem('apisstore.currentApi', apiId);
		}
	}
});