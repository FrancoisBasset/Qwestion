<template>
	<div>
		<div id="modal">
			<PrimaryButton @click="closeModal()" style="float: right">❌</PrimaryButton>
			<br>

			<InputText style="display: block" type="number" v-model="number" min="1" max="20">Nombre de questions</InputText>
			
			<SelectForm v-model="category" label="Catégorie">
				<option v-for="category in apisStore.getCurrentApi().store.categories" :key="category" :value="category.id ?? category">{{ category.name ?? category }}</option>
			</SelectForm>
			
			<SelectForm v-if="apisStore.getCurrentApi().id !== 'apininjas'" v-model="difficulty" label="Difficulté">
				<option value="easy">Facile</option>
				<option value="medium">Moyen</option>
				<option value="hard">Difficile</option>
			</SelectForm>
			
			<SelectForm v-if="apisStore.getCurrentApi().id === 'opentdb'" v-model="type" label="Type">
				<option value="multiple">Choix multiple</option>
				<option value="boolean">Vrai / Faux</option>
			</SelectForm>
			
			<PrimaryButton @click="play()" class="center">Jouer !</PrimaryButton>
		</div>

		<AlertMessage v-show="error" :success="false">{{ error }}</AlertMessage>
	</div>
</template>

<style scoped>
#modal {
	position: absolute;
	top: 50%;
	width: 50%;
	margin-left: 25%;
	margin-right: 25%;
	transform: translate(0, -50%);
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
import SelectForm from './lib/SelectForm.vue';
import AlertMessage from './lib/AlertMessage.vue';

export default {
	components: {
		InputText,
		PrimaryButton,
		SelectForm,
		AlertMessage
	},
	data() {
		return {
			apisStore: useApisStore(),
			number: 5,
			category: null,
			difficulty: 'easy',
			type: 'multiple',
			gameStore: useGameStore(),
			error: null
		};
	},
	created() {
		this.category = this.apisStore.getCurrentApi().store.categories[0];
	},
	methods: {
		async play() {
			const questions = await this.apisStore.getCurrentApi().store.getNewQuestions(this.number, this.category.id ?? this.category, this.difficulty, this.type);
			if (questions.error) {
				this.error = questions.error;
				setTimeout(() => {
					this.error = null;
				}, 5000);
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
