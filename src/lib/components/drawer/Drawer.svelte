<script lang="ts">
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import { browser } from '$app/environment';

	type Option = { name: string; is_check: boolean };

	let { title, lst = [], id, selected = [], billId } = $props<{
		title: string;
		lst?: string[];
		id: number;
		selected?: string[];
		billId?: string | number;
	}>();

	let lstState = $state<Option[]>(
		lst.map((name: string) => ({ name, is_check: selected?.includes(name) ?? false }))
	);

	const storageKey = billId ? `bill-stage-${billId}` : null;

	const onSelect = async (e: Event) => {
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);
		formData.append('billItemId', id.toString());

		const response = await fetch('?/selectCustomer', {
			method: 'POST',
			body: formData
		});

		if (response.ok) {
			if (browser && storageKey) {
				localStorage.setItem(storageKey, 'menu');
			}
			location.reload();
		} else {
			alert('Failed to select customer');
		}
	};

</script>

<Drawer.Root>
	<Drawer.Trigger class="cursor-pointer rounded-sm bg-blue-500 px-4 py-2 text-white">{title}</Drawer.Trigger>
	<Drawer.Content>
		<div class="mx-auto w-full max-w-sm">
			<Drawer.Header>
				<Drawer.Title>{title}</Drawer.Title>
				<Drawer.Description>Please select the option below</Drawer.Description>
			</Drawer.Header>
			<form method="POST" onsubmit={onSelect}>
				{#each lstState as item}
					<div>
						<input type="checkbox" bind:checked={item.is_check} name='selected' value={item.name}/> {item.name}
					</div>
				{/each}
				<Drawer.Footer>
					<Drawer.Close type="submit"
						class="rounded-sm bg-green-500 px-4 py-2 text-white hover:bg-green-600">
						Save
					</Drawer.Close>
				</Drawer.Footer>
			</form>
		</div>
	</Drawer.Content>
</Drawer.Root>
