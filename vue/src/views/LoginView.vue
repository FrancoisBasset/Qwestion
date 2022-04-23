<template>
	<div>
		<Header />
		<br>
		<br>

		<LoginForm id="loginForm" />
	</div>
</template>

<style scoped>
#loginForm {
	display: block;
	text-align: center;
}
</style>

<script setup>
import Header from '../components/Header.vue';
import LoginForm from '../components/LoginForm.vue';
</script>

<script>
export default {
	components: {
		Header,
		LoginForm
	}
};
</script>
