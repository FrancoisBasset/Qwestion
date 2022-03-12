<template>
	<div>
		<h1>Token : {{ token }}</h1>
		<h1>Categories : {{ categories }}</h1>
		<h1>Questions : {{ questions }}</h1>

		<h1>Current API : {{ apisstore.currentApi.name }}</h1>

		<table>
			<thead>
				<tr>
					<td>Name</td>
					<td>Id</td>
					<td>Store</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for="api in apisstore.apis" :key="api">
					<td>{{ api.name }}</td>
					<td>{{ api.id }}</td>
					<td>{{ api.store.token }}</td>
					<td>
						<button @click="apisstore.setCurrentApi(api.id)">Set {{ api.name }}</button>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script setup>
import useOpentdb from '../stores/opentdb';
import useApisstore from '../stores/apisstore';
</script>

<script>
export default {
	data() {
		return {
			token: '',
			categories: [],
			questions: [],
			opentdb: useOpentdb(),
			apisstore: useApisstore()
		};
	},
	async created() {
		this.token = await this.opentdb.token;
		this.categories = await this.opentdb.categories;
		this.questions = await this.opentdb.getNewQuestions(10, 23, 'hard', 'multiple');
	}
}
</script>