<template>
	<div>
		<Header />
		<br>
		<br>
		<br>
		<br>
		<br>

		<div style="display: block; text-align: center">
			<img :src="apisStore.currentApi.store.image" width="300" height="100" />
			<br>
			<br>
			<PlayButton style="width: 300px; height: 100px" />
			<br>
			<br>
			<StatisticsButton style="width: 300px; height: 100px" />
		</div>
	</div>
</template>

<script setup>
import Header from '../components/Header.vue';
import PlayButton from '../components/PlayButton.vue';
import StatisticsButton from '../components/StatisticsButton.vue';
</script>

<script>
import useApisStore from '../stores/apisstore';

export default {
	components: {
		Header,
		PlayButton,
		StatisticsButton
	},
	data() {
		return {
			apisStore: useApisStore()
		};
	}
}
</script>