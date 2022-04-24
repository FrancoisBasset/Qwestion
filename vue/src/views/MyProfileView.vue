<template>
	<div>
		<Header />
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
import Header from '../components/Header.vue';
import MyProfileForm from '../components/MyProfileForm.vue';
</script>

<script>
export default {
	components: {
		Header,
		MyProfileForm
	}
};
</script>