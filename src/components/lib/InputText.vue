<template>
	<div class="center form-floating mt-4 mb-4">
		<input :type="type" class="form-control" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :id="placeholder" :placeholder="placeholder" :disabled="disabled" :min="min" :max="max" />
		<label v-if="placeholder != ''" :for="placeholder"><slot></slot></label>
	</div>
</template>

<style scoped>
div {
	width: 34%;
	margin-left: 33%;
	margin-right: 33%;
}
</style>

<script>
export default {
	props: [
		'modelValue',
		'type',
		'disabled',
		'min',
		'max'
	],
	data() {
		return {
			placeholder: this.$slots.default ? this.$slots.default()[0].children : ''
		};
	}
};
</script>
