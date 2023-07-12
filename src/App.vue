<template>
	<div>
		<MenuBar id="menu" />
		<RouterView />
	</div>
</template>

<style scoped>
div {
	width: inherit;
	display: block;
}

#menu {
	display: block;
	text-align: center;
}
</style>

<script>
import useAccountStore from './stores/account';
import MenuBar from './components/MenuBar.vue';

export default {
	components: {
		MenuBar
	},
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
