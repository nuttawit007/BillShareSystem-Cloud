<script lang="ts">
	import InputWithLabel from '../input/InputWithLabel.svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	import * as Table from '$lib/components/ui/table/index.js';

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
		<div class="flex items-end gap-4">
			<InputWithLabel placeholder="Add new people" label={'Add people'} name='name'/>
			<Button type="submit" class='cursor-pointer'>Add</Button>
		</div>
	</form>

	<div class="mt-8 w-full rounded-md border">
		<Table.Root>
			<Table.Header class="bg-gray-300">
				<Table.Row>
					<Table.Head class="w-[100px]">ID</Table.Head>
					<Table.Head>Name</Table.Head>
					<Table.Head class="w-[230px] text-left">Actions</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each customer as item, index}
					<Table.Row>
						<Table.Cell class="font-medium">{index+1}</Table.Cell>
						<Table.Cell>{item}</Table.Cell>
						<Table.Cell class="text-left">
							<Button type="button" class="bg-red-500 rounded-sm hover:bg-red-700" onclick={() => deleteCustomer(item)}>delete</Button>
						</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
</section>
