<template>
	<div>
		<QuizSelect />
		<Logo id="logo" />
		<ProfileZone />
	</div>
</template>

<style>
div {
	display: flex;
}

#logo {
	margin-left: auto;
    margin-right: auto;
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