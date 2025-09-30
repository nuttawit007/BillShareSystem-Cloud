<script lang="ts">
	import InputWithLabel from '../input/InputWithLabel.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { browser } from '$app/environment';

	import * as Table from '$lib/components/ui/table/index.js';
	import Drawer from '../drawer/Drawer.svelte';

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
	<form method="POST" onsubmit={addMenu} >
		<div class="flex items-end gap-4">
			<InputWithLabel placeholder="Add new menu" label={'Add Menu'} name={'name'}/>
			<InputWithLabel placeholder="price" name={'price'}/>
			<InputWithLabel placeholder="amount" name={'amount'}/>
			<Button type='submit' class='cursor-pointer'>Add</Button>
		</div>
	</form>

	<div class="mt-8 w-full rounded-md border">
		<Table.Root>
			<Table.Header class="bg-gray-300">
				<Table.Row>
					<Table.Head class="w-[100px]">ID</Table.Head>
					<Table.Head>Menu</Table.Head>
					<Table.Head>Price</Table.Head>
					<Table.Head>Amount</Table.Head>
					<Table.Head>People</Table.Head>
					<Table.Head class="w-[230px] text-left">Actions</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each menu as item, index}
					<Table.Row>
						<Table.Cell class="font-medium">{index+1}</Table.Cell>
						<Table.Cell>{item.name}</Table.Cell>
						<Table.Cell>{item.price} $</Table.Cell>
						<Table.Cell>{item.amount}</Table.Cell>
						{#if item.customer.length > 0}
							<Table.Cell>{item.customer}</Table.Cell>
						{:else}
							<Table.Cell> - </Table.Cell>
						{/if}
						<Table.Cell class="text-left">
							<Drawer title="Select People" lst={customer} selected={item.customer} id={item.id} billId={billId} />
							<Button type="button" class="cursor-pointer bg-red-500 hover:bg-red-700" onclick={() => deleteMenu(item.id)}>delete</Button>
						</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
</section>
