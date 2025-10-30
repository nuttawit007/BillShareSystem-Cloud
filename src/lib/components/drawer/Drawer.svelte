<script lang="ts">
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import { browser } from '$app/environment';

	type Option = { name: string; is_check: boolean };

	let {
		title,
		lst = [],
		id,
		selected = [],
		billId
	} = $props<{
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
	<Drawer.Trigger class="cursor-pointer rounded-sm bg-blue-500 hover:bg-blue-600 px-4 py-2 text-white"
		>{title}</Drawer.Trigger
	>
	<Drawer.Content>
		<div class="mx-auto w-full max-w-sm">
			<Drawer.Header>
				<Drawer.Title>{title}</Drawer.Title>
				<Drawer.Description>Please select the option below</Drawer.Description>
			</Drawer.Header>
			<form method="POST" onsubmit={onSelect}>
				<div class="grid grid-cols-3 gap-4">
					{#each lstState as item}
						<!-- <div>
							<input type="checkbox" bind:checked={item.is_check} name="selected" value={item.name} />
							{item.name}
						</div> -->
						<label
							class="group flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition-colors hover:border-emerald-500 hover:shadow dark:border-slate-800 dark:bg-slate-900 cursor-pointer"
						>
							<!-- custom checkbox (visually like ResultView) -->
							<input
								type="checkbox"
								bind:checked={item.is_check}
								name="selected"
								value={item.name}
								class="mt-1 h-5 w-5 rounded border-slate-300 accent-emerald-600 dark:border-slate-700 dark:accent-emerald-500 focus:ring-0"
							/>
	
							<div class="flex-1 min-w-0">
								<div class="flex items-center justify-between">
									<div class="truncate font-medium text-slate-900 dark:text-slate-100">
										{item.name}
									</div>
									<!-- optional badge or small info -->
									<span class="ml-2 text-xs text-slate-400"> </span>
								</div>								
							</div>
						</label>
					{/each}
				</div>
				<Drawer.Footer>
					<Drawer.Close
						type="submit"
						class="w-full rounded-sm bg-green-500 px-4 py-2 text-white hover:bg-green-600 cursor-pointer"
					>
						Save
					</Drawer.Close>
				</Drawer.Footer>
			</form>
		</div>
	</Drawer.Content>
</Drawer.Root>
