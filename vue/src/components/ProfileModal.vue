<template>
	<div>
		<GoToProfileButton />
		<LogoutButton />
	</div>
</template>

<script setup>
import GoToProfileButton from './GoToProfileButton.vue';
import LogoutButton from './LogoutButton.vue';
</script>

<script>
export default {
	components: {
		GoToProfileButton,
		LogoutButton
	}
}
</script>