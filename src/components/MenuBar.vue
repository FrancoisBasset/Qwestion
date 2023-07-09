<template>
	<div>
		<QuizSelect />
		<LogoIcon id="logo" />
		<ProfileZone style="margin-right: 10px" />
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
import LogoIcon from './LogoIcon.vue';
import ProfileZone from './ProfileZone.vue';
</script>

<script>
export default {
	components: {
		QuizSelect,
		LogoIcon,
		ProfileZone
	}
};
</script>
