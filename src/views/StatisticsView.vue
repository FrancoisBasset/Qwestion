<template>
	<div>
		<MenuBar />
		<br>
		<br>

		<div id="statisticsDiv">
			<h1>Statistiques</h1>
			<br>

			<button @click="reload()">Recharger</button>
			<br><br><br>
			<canvas id="myChart" style="width:100%;max-width:1000px"></canvas>
		</div>
	</div>
</template>

<style scoped>
#statisticsDiv {
	display: block;
	text-align: center;
}

canvas {
	margin-left: auto;
	margin-right: auto;
}
</style>

<script setup>
import MenuBar from '../components/MenuBar.vue';
</script>

<script>
import useStatsStore from '../stores/stats';

export default {
	components: {
		MenuBar
	},
	data() {
		return {
			statsStore: useStatsStore(),
			stats: null
		};
	},
	async created() {
		this.stats = await this.statsStore.getStats();
		this.reload();
	},
	methods: {
		reload() {
			const dates = [...new Set(this.stats.map(s => s.date))];

			let results = [];
			for (const stat of this.stats) {
				if (!results[stat.category]) {
					results[stat.category] = [];
				}

				if (!results[stat.category][stat.date]) {
					results[stat.category][stat.date] = {
						correct: 0,
						incorrect: 0
					};
				}

				results[stat.category][stat.date].correct += stat.correct;
				results[stat.category][stat.date].incorrect += stat.incorrect;
			}
			
			const newResults = [];
			for (const c of Object.keys(results)) {
				newResults[c] = [];

				for (const d of dates) {
					if (Object.keys(results[c]).includes(d)) {
						newResults[c][d] = Math.floor((results[c][d].correct / (results[c][d].correct + results[c][d].incorrect)) * 100);
					} else {
						newResults[c][d] = null;
					}
				}

				newResults[c] = Object.values(newResults[c]);
			}
			results = newResults;

			const datasets = [];
			for (const result of Object.keys(results)) {
				const r = Math.floor(Math.random() * 250);
				const g = Math.floor(Math.random() * 250);
				const b = Math.floor(Math.random() * 250);

				datasets.push({
					label: result,
					data: results[result],
					borderColor: `rgb(${r}, ${g}, ${b})`,
					fill: false
				});
			}

			// eslint-disable-next-line no-undef
			new Chart('myChart', {
				type: 'line',
				data: {
					labels: dates,
					datasets: datasets
				},
				options: {
					legend: {display: true}
				}
			});
		}
	}
};
</script>
