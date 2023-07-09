<template>
	<div>
		<RouterView />
	</div>
</template>

<style scoped>
div {
	width: inherit;
	display: block;
}
</style>

<script>
import useAccountStore from './stores/account';

export default {
	data() {
		return {
			accountStore: useAccountStore()
		};
	},
	created() {
		if (this.accountStore.user) {
			document.body.style.backgroundImage = `url(${this.accountStore.user.wallpaper})`;
		}
	}
};
</script>
