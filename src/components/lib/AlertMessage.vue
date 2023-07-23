<template>
	<label :style="{backgroundColor: success ? 'seagreen' : 'red'}">
		<slot></slot>
	</label>
</template>

<style scoped>
label {
	position: fixed;
	bottom: 10px;
	right: 10px;
	padding: 20px;
	color: white;
}
</style>

<script>
export default {
	props: [
		'success'
	]
};
</script>
