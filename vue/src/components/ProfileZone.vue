<template>
	<div v-if="accountStore.user">
		<ProfileIcon firstname="François" lastname="Basset" />
	</div>
	<div v-else>
		<RegisterButton />
		<LoginButton />
	</div>
</template>

<script setup>
import RegisterButton from '../components/RegisterButton.vue';
import LoginButton from '../components/LoginButton.vue';
import ProfileIcon from '../components/ProfileIcon.vue';
</script>

<script>
import useAccountStore from '../stores/account';

export default {
	components: { RegisterButton, LoginButton, ProfileIcon },
	data() {
		return {
			accountStore: useAccountStore
		};
	}
}
</script>