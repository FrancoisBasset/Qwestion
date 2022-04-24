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
			this.currentIndex = -1;
			this.correct = 0;
			this.incorrect = 0;
			this.api = api;
			this.category = category;
			this.difficulty = difficulty;
			this.questions = questions;
		},
		getNextQuestion() {
			if (this.questions.length === this.currentIndex) {
				return null;
			}

			return this.questions[++this.currentIndex];
		},
		answer(text) {
			if (this.api === 'APINinjas') {
				if (text === this.questions[this.currentIndex].answer) {
					this.correct++;
				} else {
					this.incorrect++;
				}
			} else if (this.api === 'QuizAPI') {
				let correctAnswer = this.questions[this.currentIndex].answers[this.questions[this.currentIndex].correct_answer];
				
				if (!correctAnswer) {
					for (const key of Object.keys(this.questions[this.currentIndex].correct_answers)) {
						if (this.questions[this.currentIndex].correct_answers[key]) {
							correctAnswer = this.questions[this.currentIndex].answers[key.split('_correct')[0]];
							break;
						}
					}
				}

				if (text === correctAnswer) {
					this.correct++;
				} else {
					this.incorrect++;
				}
			} else {
				if (text === this.questions[this.currentIndex].correct_answer) {
					this.correct++;
				} else {
					this.incorrect++;
				}
			}
		},
		finish() {
			this.statsStore.addStat(this.api, this.category, this.difficulty, this.correct, this.incorrect);
			this.$reset();
		}
	}
});