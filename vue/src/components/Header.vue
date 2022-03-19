<template>
	<div>
		<QuizSelect />
		<Logo />
		<ProfileZone />
	</div>
</template>

<style>
div {
	display: inline;
}
</style>

<script setup>
import QuizSelect from '../components/QuizSelect.vue';
import Logo from '../components/Logo.vue';
import ProfileZone from '../components/ProfileZone.vue';
</script>

<script>
export default {
	components: {
		QuizSelect,
		Logo,
		ProfileZone
	}
}
</script>