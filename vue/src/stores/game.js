import { defineStore } from 'pinia';
import useStatsStore from '../stores/stats';

export default defineStore({
	id: 'game',
	state: () => {
		return {
			api: null,
			category: null,
			difficulty: null,
			correct: 0,
			incorrect: 0,
			currentIndex: -1,
			questions: null,
			statsStore: useStatsStore()
		};
	},
	actions: {
		start(api, category, difficulty, questions) {
			this.api = api;
			this.category = category;
			this.difficulty = difficulty;
			this.questions = questions;
		},
		getNextQuestion() {
			if (this.questions.length == this.currentIndex) {
				return null;
			}

			return this.questions[++this.currentIndex];
		},
		answer(text) {
			if (text === this.questions[this.currentIndex].correct_answer) {
				this.correct++;
			} else {
				this.incorrect++;
			}
		},
		finish() {
			this.statsStore.addStat(this.api, this.category, this.difficulty, this.correct, this.incorrect);
			this.$reset();
		}
	}
});