<template>
	<div>
		<Header />
		<br>
		<br>
		<div id="playDiv">
			<label>{{ category }}</label>
			<br>
			<br>
			<label>Question {{ gameStore.currentIndex + 1 }} / {{ gameStore.questions.length }}</label>
			<br>
			<br>
			<label>{{ replaceSpecialChars(question) }}</label>
			<br>
			<br>

			<button @click="clickAnswer(answer)" v-for="answer in answers" :key="answer" style="margin: 20px; width: 300px; font-size: 16px" :style="[showAnswer ? answer === correctAnswer ? 'background-color: green' : answer === selectedAnswer ? 'background-color: red' : '' : '']">{{ replaceSpecialChars(answer) }}</button>

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
import Header from '../components/Header.vue';
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
		Header
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

		console.log(this.category);

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
			this.correctAnswer = nextQuestion.correct_answer;
			this.answers = [nextQuestion.correct_answer, ...nextQuestion.incorrect_answers].sort();

			if (this.gameStore.currentIndex == this.gameStore.questions.length - 1) {
				this.end = true;
			}
		},
		finish() {
			this.gameStore.finish();

			this.$router.push('/');
		}
	}
}
</script>