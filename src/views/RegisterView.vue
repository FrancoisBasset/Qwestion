<template>
	<div>
		<MenuBar />
		<br>
		<br>

		<RegisterForm id="registerForm" />
	</div>
</template>

<style scoped>
#registerForm {
	display: block;
	text-align: center;
}
</style>

<script setup>
import MenuBar from '../components/MenuBar.vue';
import RegisterForm from '../components/RegisterForm.vue';
</script>

<script>
export default {
	components: {
		MenuBar,
		RegisterForm
	}
};
</script>
