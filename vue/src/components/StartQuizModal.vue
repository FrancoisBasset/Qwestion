<template>
	<div>
		<button @click="closeModal()" style="float: right">❌</button>
		<br>
		<br>
		<br>
		<br>
		<br>
		<label>Nombre de questions : </label>
		<input type="number" v-model="number" />
		<br>
		<br>
		<label>Catégorie : </label>
		<select v-model="category">
			<option v-for="category in apisStore.getCurrentApi().store.categories" :key="category.id" :value="category.id">{{ category.name }}</option>
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
		<label>Type : </label>
		<select v-model="type">
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

export default {
	data() {
		return {
			apisStore: useApisStore(),
			number: null,
			category: 0,
			difficulty: 'easy',
			type: 'multiple'
		};
	},
	methods: {
		async play() {
			const questions = await this.apisStore.getCurrentApi().store.getNewQuestions(this.number, this.category, this.difficulty, this.type);
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