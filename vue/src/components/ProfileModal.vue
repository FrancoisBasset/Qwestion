<template>
	<div>
		<GoToProfileButton />
		<GoToConsoleAdminButton v-if="accountStore.user.username === 'admin'" />
		<LogoutButton />
	</div>
</template>

<script setup>
import GoToProfileButton from './GoToProfileButton.vue';
import GoToConsoleAdminButton from './GoToConsoleAdminButton.vue';
import LogoutButton from './LogoutButton.vue';
</script>

<script>
import useAccountStore from '../stores/account';

export default {
	components: {
		GoToProfileButton,
		GoToConsoleAdminButton,
		LogoutButton
	},
	data() {
		return {
			accountStore: useAccountStore()
		};
	}
};
</script>