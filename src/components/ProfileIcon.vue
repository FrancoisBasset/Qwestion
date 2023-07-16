<template>
	<div class="dropdown">
		<label class="icon" >{{ firstname[0] + lastname[0] }}</label>
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
	margin-top: 45px;
	right: 0px;
}

.icon {
	width: 50px;
	height: 50px;
	font-size: 20px;
	padding-top: 10px;
	font-weight: bold;
	background-color: gainsboro;
	border-radius: 50%;
}
</style>

<script>
import ProfileModal from './ProfileModal.vue';

export default {
	components: {
		ProfileModal
	},
	props: ['firstname', 'lastname'],
};
</script>
