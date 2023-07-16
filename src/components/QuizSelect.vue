<template>
	<SelectForm v-model="apiId" @change="apisStore.setCurrentApi(apiId)">
		<option v-for="api in apisStore.apis" :key="api.id" :value="api.id">{{ api.name }}</option>
	</SelectForm>
</template>

<script>
import useApisStore from '../stores/apisstore';
import SelectForm from './lib/SelectForm.vue';

export default {
	components: {
		SelectForm
	},
	data() {
		return {
			apisStore: useApisStore(),
			apiId: null
		};
	},
	created() {
		this.apiId = this.apisStore.getCurrentApi().id;
	}
};
</script>
