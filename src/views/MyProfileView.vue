<template>
	<div>
		<MenuBar />
		<br>
		<br>
		<MyProfileForm id="profileForm" />
	</div>
</template>

<style scoped>
#profileForm {
	display: block;
	text-align: center;
}
</style>

<script setup>
import MenuBar from '../components/MenuBar.vue';
import MyProfileForm from '../components/MyProfileForm.vue';
</script>

<script>
export default {
	components: {
		MenuBar,
		MyProfileForm
	}
};
</script>
