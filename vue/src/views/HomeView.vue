<template>
	<div>
		<Header />
		<br>
		<br>
		<br>
		<br>
		<br>

		<div style="display: block; text-align: center">
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
export default {
	components: {
		Header,
		PlayButton,
		StatisticsButton
	}
}
</script>