<template>
	<select v-model="apiId" @change="apisStore.setCurrentApi(apiId)">
		<option v-for="api in apisStore.apis" :key="api.id" :value="api.id">{{ api.name }}</option>
	</select>
</template>

<script>
import useApisStore from '../stores/apisstore';

export default {
	data() {
		return {
			apisStore: useApisStore(),
			apiId: null
		};
	},
	created() {
		this.apiId = this.apisStore.currentApi.id;
	}
}
</script>