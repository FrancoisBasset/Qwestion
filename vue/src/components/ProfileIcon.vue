<template>
	<div class='dropdown'>
		<label :style="style" >{{ firstname[0] + lastname[0] }}</label>
		<ProfileModal class="dropdown-content" />
	</div>
</template>

<style scoped>
label {
	cursor: pointer;
}

.dropdown {
	position: relative;
}

.dropdown:hover .dropdown-content {
	display: block;
}

.dropdown-content {
	display: none;
	position: absolute;
	margin-top: 70px;
	right: 0px;
}
</style>

<script setup>
import ProfileModal from './ProfileModal.vue';
</script>

<script>
const r = Math.floor(Math.random() * 250);
const g = Math.floor(Math.random() * 250);
const b = Math.floor(Math.random() * 250);

export default {
	components: {
		ProfileModal
	},
	props: ['firstname', 'lastname'],
	data() {
		return {
			style: `font-size: 25px; font-weight: bold;  padding: 20px; background-color: rgb(${r}, ${g}, ${b}); border-radius: 50%`
		};
	}
};
</script>