<template>
	<div>
		<label v-if="status === 201">Le compte {{ username }} a bien été crée !</label>
		<label v-else-if="status === 400">Ce compte existe déjà !</label>
		<br>
		<br>
		<br>
		<button @click="$emit('closeRegisterModal')">Fermer</button>
	</div>
</template>

<style scoped>
div {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	border: 1px solid black;
	padding: 40px;
	border-radius: 10px;
	background: rgba(230, 230, 230, 1);
	display: block
}
</style>

<script>
export default {
	props: ['status', 'username']
};
</script>