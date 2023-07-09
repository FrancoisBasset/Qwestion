<template>
	<div>
		<MenuBar />
		<br>
		<br>
		<br>
		<br>
		<br>

		<div style="display: block; text-align: center">
			<img :src="apisStore.getCurrentApi().store.image" width="300" height="100" />
			<br>
			<br>
			<PlayButton @click="showStartQuizModal = true" style="width: 300px; height: 100px" />
			<br>
			<br>
			<StatisticsButton />
		</div>
		<StartQuizModal v-show="showStartQuizModal" @closeModal="showStartQuizModal = false" />
	</div>
</template>

<script setup>
import MenuBar from '../components/MenuBar.vue';
import PlayButton from '../components/PlayButton.vue';
import StatisticsButton from '../components/StatisticsButton.vue';
import StartQuizModal from '../components/StartQuizModal.vue';
</script>

<script>
import useApisStore from '../stores/apisstore';

export default {
	components: {
		MenuBar,
		PlayButton,
		StatisticsButton,
		StartQuizModal
	},
	emits: [
		'closeModal'
	],
	data() {
		return {
			apisStore: useApisStore(),
			showStartQuizModal: false
		};
	}
};
</script>
