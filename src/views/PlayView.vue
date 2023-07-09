<template>
	<div>
		<MenuBar />
		<br>
		<br>
		<div id="playDiv">
			<label>{{ category }}</label>
			<br>
			<br>
			<label v-if="gameStore.questions">Question {{ gameStore.currentIndex + 1 }} / {{ gameStore.questions.length }}</label>
			<br>
			<br>
			<label>{{ replaceSpecialChars(question) }}</label>
			<br>
			<br>

			<button @click="clickAnswer(answer)" v-for="answer in answers" :key="answer" style="margin: 20px; width: 300px; font-size: 16px" :style="[showAnswer ? answer === correctAnswer ? 'background-color: green' : answer === selectedAnswer ? 'background-color: red' : '' : '']">{{ replaceSpecialChars(answer) }}</button>
			
			<label v-if="gameStore.api === 'APINinjas' && !showAnswer">{{ correctAnswer.split(/[a-zA-Z0-9]/).join('.') }}</label>
			<label v-if="gameStore.api === 'APINinjas' && showAnswer" :style="[selectedAnswer === correctAnswer ? 'color: green' : 'color: red']">{{ correctAnswer }}</label>
			<br><br>
			<input type="text" v-if="gameStore.api === 'APINinjas'" v-model="selectedAnswer" />
			
			<br>
			<button v-if="gameStore.api === 'APINinjas'" @click="clickAnswer(selectedAnswer)">Répondre</button>
			<br>
			<br>
			<br>
			<button v-if="showAnswer && !end" @click="goToNextQuestion()">Prochaine question</button>
			<button v-if="showAnswer && end" @click="finish()">Terminer le quiz</button>
		</div>
	</div>
</template>

<style scoped>
#playDiv {
	display: block;
	text-align: center;
}
</style>

<script setup>
import MenuBar from '../components/MenuBar.vue';
</script>

<script>
import useGameStore from '../stores/game';

function replaceSpecialChars(input) {
	input = input.split('&quot;').join('"');
	input = input.split('&#039;').join('\'');
	input = input.split('&eacute').join('é');
	
	return input;
}

export default {
	components: {
		MenuBar
	},
	data() {
		return {
			gameStore: useGameStore(),
			category: '',
			question: '',
			answers: [],
			selectedAnswer: '',
			correctAnswer: '',
			showAnswer: false,
			end: false
		};
	},
	created() {
		this.category = this.gameStore.category;

		if (this.category === null) {
			this.$router.push('/');
			return;
		}

		this.goToNextQuestion();
	},
	methods: {
		clickAnswer(answer) {
			this.selectedAnswer = answer;
			this.showAnswer = true;

			this.gameStore.answer(answer);
		},
		goToNextQuestion() {
			const nextQuestion = this.gameStore.getNextQuestion();
			
			this.showAnswer = false;
			this.question = nextQuestion.question;
			this.selectedAnswer = '';

			if (this.gameStore.api === 'Open Trivia Database') {
				this.correctAnswer = nextQuestion.correct_answer;
				this.answers = [nextQuestion.correct_answer, ...nextQuestion.incorrect_answers].sort();
			} else if (this.gameStore.api === 'QuizAPI') {
				if (nextQuestion.correct_answer) {
					this.correctAnswer = nextQuestion.answers[nextQuestion.correct_answer];
				} else {
					for (const key of Object.keys(nextQuestion.correct_answers)) {
						if (nextQuestion.correct_answers[key]) {
							this.correctAnswer = nextQuestion.answers[key.split('_correct')[0]];
							
							break;
						}
					}
				}
				this.answers = Object.values(nextQuestion.answers).filter(a => a !== null).sort();
			} else if (this.gameStore.api === 'APINinjas') {
				this.correctAnswer = nextQuestion.answer;
				this.answers = [];
			}

			if (this.gameStore.currentIndex === this.gameStore.questions.length - 1) {
				this.end = true;
			}
		},
		finish() {
			this.gameStore.finish();

			this.$router.push('/');
		}
	}
};
</script>
