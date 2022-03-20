<template>
	<div>
		<Header />
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
import Header from '../components/Header.vue';
import RegisterForm from '../components/RegisterForm.vue';
</script>

<script>
export default {
	components: {
		Header,
		RegisterForm
	}
}
</script>