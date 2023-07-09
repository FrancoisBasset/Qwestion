<template>
	<div>
		<MenuBar />
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
import MenuBar from '../components/MenuBar.vue';
import LoginForm from '../components/LoginForm.vue';
</script>

<script>
export default {
	components: {
		MenuBar,
		LoginForm
	}
};
</script>
