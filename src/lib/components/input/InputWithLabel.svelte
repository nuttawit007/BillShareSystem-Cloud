<script lang="ts">
	// ShadCN UI
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';

	// prop
	let { label, placeholder, name, inputText = $bindable<string>() } = $props<{
		label?: string;
		placeholder?: string;
		name?: string;
		inputText?: string;
	}>();
</script>

<div class=" w-full space-y-2">
	{#if label}
		<Label class="text-lg">{label}</Label>
	{/if}

	<div class="flex gap-4">
		<Input {name} bind:value={inputText} class="px-3 py-5" placeholder={placeholder || ''} />
	</div>
</div>
