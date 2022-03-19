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
import QuizSelect from './QuizSelect.vue';
import Logo from './Logo.vue';
import ProfileZone from './ProfileZone.vue';
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