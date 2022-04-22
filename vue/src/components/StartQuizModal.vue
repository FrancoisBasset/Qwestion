<template>
	<div>
		<button @click="closeModal()" style="float: right">❌</button>
		<br>
		<br>
		<br>
		<br>
		<br>
		<label>Nombre de questions : </label>
		<input type="number" v-model="number" min="1" max="20" />
		<br>
		<br>
		<label>Catégorie : </label>
		<select v-model="category">
			<option v-for="category in apisStore.getCurrentApi().store.categories" :key="category" :value="category">{{ category.name ?? category }}</option>
		</select>
		<br>
		<br>
		<label>Difficulté : </label>
		<select v-model="difficulty">
			<option value="easy">Facile</option>
			<option value="medium">Moyen</option>
			<option value="hard">Difficile</option>
		</select>
		<br>
		<br>
		<label v-if="apisStore.getCurrentApi().id === 'opentdb'">Type : </label>
		<select v-if="apisStore.getCurrentApi().id === 'opentdb'" v-model="type">
			<option value="multiple">Choix multiple</option>
			<option value="boolean">Vrai / Faux</option>
		</select>
		<br>
		<br>
		<button @click="play()" style="text-align: center">Jouer !</button>
	</div>
</template>

<style scoped>
div {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	border: 1px solid black;
	padding: 40px;
	border-radius: 10px;
	background: rgba(230, 230, 230, 1);
	display: block
}
</style>

<script>
import useApisStore from '../stores/apisstore';
import useGameStore from '../stores/game';

export default {
	data() {
		return {
			apisStore: useApisStore(),
			number: 5,
			category: null,
			difficulty: 'easy',
			type: 'multiple',
			gameStore: useGameStore(),
		};
	},
	created() {
		this.category = this.apisStore.getCurrentApi().store.categories[0];
	},
	methods: {
		async play() {
			const questions = await this.apisStore.getCurrentApi().store.getNewQuestions(this.number, this.category.id ?? this.category, this.difficulty, this.type);
			this.gameStore.start(this.apisStore.getCurrentApi().name, this.category.name ?? this.category, this.difficulty, questions);
			
			this.$router.push('/jouer');
		},
		closeModal() {
			this.number = null;
			this.category = 0;
			this.difficulty = 'easy';
			this.type = 'multiple';
			this.$emit('closeModal');
		}
	}
};
</script>