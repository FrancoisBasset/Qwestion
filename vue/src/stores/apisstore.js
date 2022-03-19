import { defineStore } from 'pinia';

import useOpentdb from './opentdb';
import useQuizapi from './quizapi';
import useApininjas from './apininjas';

export default defineStore({
	id: 'apisstore',
	state: () => {
		return {
			currentApi: JSON.parse(localStorage.getItem('apisstore.currentApi')) ?? {
				id: 'opentdb',
				name: 'Open Trivia Database',
				store: useOpentdb()
			},
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
		setCurrentApi(apiId) {
			this.currentApi = this.apis.find(api => api.id === apiId);
			localStorage.setItem('apisstore.currentApi', JSON.stringify(this.currentApi));
		}
	}
});