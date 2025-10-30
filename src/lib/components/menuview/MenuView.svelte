<script lang="ts">
	import InputWithLabel from '../input/InputWithLabel.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { browser } from '$app/environment';

	import * as Table from '$lib/components/ui/table/index.js';
	import Drawer from '../drawer/Drawer.svelte';

	import { Pencil, Trash2 } from 'lucide-svelte';

	let { menu, billId, customer} = $props();

	const stageKey = billId ? `bill-stage-${billId}` : null;
	$inspect(menu, billId, customer);

	const addMenu = async (e: Event) => {
		e.preventDefault();
		// get form data
		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);
		const name = formData.get('name') as string;
		const price = formData.get('price') as string;
		const amount = formData.get('amount') as string;

		if (!name || !price || !amount) {
			alert('Please enter a name, price, amount');
			return;
		}

		formData.append('billId', billId);

		const response = await fetch(`?/createMenu`, {
			method: 'POST',
			body: formData
		});

		if (response.ok) {
			// reload page
			if (browser && stageKey) {
				localStorage.setItem(stageKey, 'menu');
			}
			location.reload();
		} else {
			alert('Failed to add menu');
		}
	};

	const deleteMenu = async (id: number) => {
		const target = menu.find((item: any) => item.id === id);
		if (!target) {
			alert('Menu not found');
			return;
		}

		// if (!confirm(`Delete ${target.name}?`)) {
		// 	return;
		// }

		const formData = new FormData();
		formData.append('billItemId', String(id));
		formData.append('billId', billId);

		const response = await fetch(`?/deleteMenu`, {
			method: 'POST',
			body: formData
		});

		if (response.ok) {
			if (browser && stageKey) {
				localStorage.setItem(stageKey, 'menu');
			}
			location.reload();
		} else {
			alert('Failed to delete menu');
		}
	};

</script>

<section class="mt-4">
	<form method="POST" onsubmit={addMenu}>
		<div class="flex items-end gap-4 rounded-xl border border-violet-100 bg-white/90 p-4
					shadow-sm shadow-violet-100/60 backdrop-blur-sm">
			<InputWithLabel placeholder="Add new menu" label={'Add Menu'} name={'name'} />
			<InputWithLabel placeholder="price" name={'price'} />
			<InputWithLabel placeholder="amount" name={'amount'} />
			<Button type='submit'
				class='cursor-pointer rounded-lg bg-violet-600 px-5 py-2 text-white hover:bg-violet-700
						focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2'>
				Add
			</Button>
		</div>
	</form>

	<div class="mt-8 w-full rounded-xl border border-violet-100 bg-white/90 overflow-hidden
			shadow-sm shadow-violet-100/60 backdrop-blur-sm">
		<Table.Root>
			<!-- Header -->
			<Table.Header class="sticky top-0 z-10 bg-slate-800">
				<Table.Row>
					<Table.Head class="w-[100px] text-white px-4 py-3">ID</Table.Head>
					<Table.Head class="text-white px-4 py-3">Menu</Table.Head>
					<Table.Head class="text-white px-4 py-3">Price</Table.Head>
					<Table.Head class="text-white px-4 py-3">Amount</Table.Head>
					<Table.Head class="text-white px-4 py-3">People</Table.Head>
					<Table.Head class="w-[230px] text-left text-white px-4 py-3">Actions</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each menu as item, index}
					<Table.Row class="hover:bg-violet-50/50 transition-colors">
						<Table.Cell class="font-medium px-4 py-3">{index+1}</Table.Cell>
						<Table.Cell class="text-slate-900 px-4 py-3">{item.name}</Table.Cell>
						<Table.Cell class="text-slate-700 px-4 py-3 font-mono tabular-nums">{item.price} $</Table.Cell>
						<Table.Cell class="text-slate-700 px-4 py-3">{item.amount}</Table.Cell>
						{#if item.customer.length > 0}
							<Table.Cell class="text-slate-700 px-4 py-6">{item.customer}</Table.Cell>
						{:else}
							<Table.Cell class="text-slate-400 px-4 py-3"> - </Table.Cell>
						{/if}
						<Table.Cell class="text-left space-x-2">
							<Drawer title="Select People" lst={customer} selected={item.customer} id={item.id} billId={billId} />
							<Button type="button"
								href={`/bill/${billId}/${item.id}/menu`}
								class="cursor-pointer rounded-md border bg-yellow-400 px-4 py-[5px] text-black  hover:bg-yellow-500">
								<Pencil class="w-5 h-5" />
							</Button>
							<Button type="button"
								class="cursor-pointer rounded-md bg-red-500 px-4 py-[5px] text-white
									hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
								onclick={() => deleteMenu(item.id)}>
								<Trash2 class="w-5 h-5" />
							</Button>
						</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
</section>

