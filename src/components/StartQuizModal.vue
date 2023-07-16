<template>
	<div id="modal">
		<PrimaryButton @click="closeModal()" style="float: right">❌</PrimaryButton>
		<br>

		<InputText style="display: block" type="number" v-model="number" min="1" max="20">Nombre de questions</InputText>
		
		<label>Catégorie : </label>
		<select v-model="category">
			<option v-for="category in apisStore.getCurrentApi().store.categories" :key="category" :value="category">{{ category.name ?? category }}</option>
		</select>
		<br>
		<br>
		<label v-if="apisStore.getCurrentApi().id !== 'apininjas'">Difficulté : </label>
		<select v-if="apisStore.getCurrentApi().id !== 'apininjas'" v-model="difficulty">
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
		<PrimaryButton @click="play()" class="center">Jouer !</PrimaryButton>
	</div>
</template>

<style scoped>
#modal {
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

.center {
	width: 50%;
	margin-left: 25%;
	margin-right: 25%;
}
</style>

<script>
import useApisStore from '../stores/apisstore';
import useGameStore from '../stores/game';
import InputText from './lib/InputText.vue';
import PrimaryButton from './lib/PrimaryButton.vue';

export default {
	components: {
		InputText,
		PrimaryButton
	},
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
			if (questions.error) {
				alert(questions.error);
				return;
			}
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
