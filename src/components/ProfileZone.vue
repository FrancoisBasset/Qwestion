<template>
	<div v-if="accountStore.user">
		<ProfileIcon :firstname="accountStore.user.firstname" :lastname="accountStore.user.lastname" />
	</div>
	<div v-else>
		<RegisterButton />
		<LoginButton />
	</div>
</template>

<script>
import useAccountStore from '../stores/account';
import RegisterButton from './RegisterButton.vue';
import LoginButton from './LoginButton.vue';
import ProfileIcon from './ProfileIcon.vue';

export default {
	components: {
		RegisterButton,
		LoginButton,
		ProfileIcon
	},
	data() {
		return {
			accountStore: useAccountStore()
		};
	}
};
</script>
