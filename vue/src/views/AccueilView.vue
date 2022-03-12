<template>
	<div>
		<h1>Token : {{ token }}</h1>
		<h1>Categories : {{ categories }}</h1>
		<h1>Questions : {{ questions }}</h1>
	</div>
</template>

<script setup>
import useOpentdb from '../stores/opentdb';
</script>

<script>
export default {
	data() {
		return {
			token: '',
			categories: [],
			questions: [],
			opentdb: useOpentdb()
		};
	},
	async created() {
		this.token = await this.opentdb.token;
		this.categories = await this.opentdb.categories;
		this.questions = await this.opentdb.getNewQuestions(10, 23, 'hard', 'multiple');
	}
}
</script>