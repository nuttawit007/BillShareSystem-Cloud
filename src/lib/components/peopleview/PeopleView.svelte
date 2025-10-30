<script lang="ts">
	import InputWithLabel from '../input/InputWithLabel.svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	import * as Table from '$lib/components/ui/table/index.js';
	import { Trash2 } from 'lucide-svelte';

	let { customer, billId } = $props();
	$inspect(customer, billId);

	const addCustomer = async (e: Event) => {
		e.preventDefault();
		// get form data
		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);
		const name = formData.get('name') as string;

		if (!name) {
			alert('Please enter a name');
			return;
		}

		formData.append('billId', billId);

		const response = await fetch(`?/createCustomer`, {
			method: 'POST',
			body: formData
		});

		if (response.ok) {
			// reload page
			location.reload();
			console.log('add customer success');
		} else {
			alert('Failed to add customer');
		}
	};

	const deleteCustomer = async (name: string) => {
		// if (!confirm(`Delete ${name}?`)) {
		// 	return;
		// }

		const formData = new FormData();
		formData.append('billId', billId);
		formData.append('name', name);

		const response = await fetch(`?/deleteCustomer`, {
			method: 'POST',
			body: formData
		});

		if (response.ok) {
			location.reload();
		} else {
			alert('Failed to delete customer');
		}
	};


</script>

<section class="mt-4">
	<form method="POST" onsubmit={addCustomer} >
		<div class="flex items-end gap-4 rounded-xl border border-violet-100 bg-white/90 p-4
					shadow-sm shadow-violet-100/60 backdrop-blur-sm">
			<InputWithLabel placeholder="Add new people" label={'Add people'} name='name'/>
			<Button type="submit" class='bg-violet-600 hover:bg-violet-700 px-5 py-2 rounded-lg cursor-pointer'>Add</Button>
		</div>
	</form>

	<div class="mt-8 w-full rounded-xl border overflow-hidden
			shadow-sm shadow-slate-200">
		<Table.Root>
			<Table.Header class="sticky top-0 z-10 bg-slate-800">
				<Table.Row>
					<Table.Head class="w-[100px] text-white px-4 py-3">ID</Table.Head>
					<Table.Head class='text-white px-4 py-3'>Name</Table.Head>
					<Table.Head class="w-[230px] text-left text-white px-4 py-3">Actions</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#if customer.length === 0}
					<Table.Row>
						<Table.Cell class="px-4 py-6 text-center text-slate-500" colspan={3}>ยังไม่มีรายชื่อ</Table.Cell>
					</Table.Row>
				{:else}
					{#each customer as item, index}
						<Table.Row>
							<Table.Cell class="font-medium px-4 py-3">{index+1}</Table.Cell>
							<Table.Cell class=' px-4 py-3'>{item}</Table.Cell>
							<Table.Cell class="text-left px-4 py-3">
								<Button type="button" class="bg-red-500 rounded-md hover:bg-red-700  px-4 py-[5px]  cursor-pointer" onclick={() => deleteCustomer(item)}>
									<Trash2 class="w-5 h-5" />
									delete
								</Button>
							</Table.Cell>
						</Table.Row>
					{/each}
				{/if}
			</Table.Body>
		</Table.Root>
	</div>
</section>
