<template>
	<select class="form-select" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)">
		<slot></slot>
	</select>
</template>

<script>
export default {
	props: [
		'modelValue'
	]
};
</script>
