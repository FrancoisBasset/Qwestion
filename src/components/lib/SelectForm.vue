<template>
	<div style="display: block" :class="{'form-floating': label, 'mb-4': label}">
		<select class="form-select" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)">
			<slot></slot>
		</select>
		<label v-if="label">{{ label }}</label>
	</div>
</template>

<script>
export default {
	props: [
		'modelValue',
		'label'
	]
};
</script>
