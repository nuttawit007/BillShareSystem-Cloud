<script lang="ts">
	import InputWithLabel from '$lib/components/input/InputWithLabel.svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	export let data;
	const item = data.item ?? { name: '', price: '', amount: '1' };

	// local vars for two-way binding
	let name: string = item.name ?? '';
	let price: string = String(item.price ?? '');
	let amount: string = String(item.amount ?? '1');
</script>

<section
	class="flex min-h-screen items-start justify-center bg-gradient-to-br from-white via-violet-50 to-violet-100 p-6"
>
	<div
		class="w-full max-w-lg rounded-2xl border border-violet-100 bg-white/90 p-6 shadow-xl shadow-violet-100/60 backdrop-blur-sm"
	>
		<h1 class="mb-4 text-xl font-semibold text-slate-900">Edit Menu</h1>

		<form method="POST" class="space-y-4">
			<!-- ส่งค่า billItemId ด้วย (server ใช้ params เป็นหลัก) -->
			<input type="hidden" name="billItemId" value={data.billItemId} />

			<div>
				<InputWithLabel label="Name" name="name" bind:inputText={name} />
			</div>

			<div>
				<InputWithLabel label="Price" name="price" bind:inputText={price} />
			</div>

			<div>
				<InputWithLabel label="Amount" name="amount" bind:inputText={amount} />
			</div>

			<div class="flex gap-2 pt-2">
				<Button
					type="button"
					href={`/bill/${data.billId}`}
					class="rounded-lg border border-violet-200 px-4 py-2 text-white bg-red-500  hover:bg-red-600"
				>
					Cancel
				</Button>
				<Button
					type="submit"
					class="rounded-lg bg-green-400 px-4 py-2 hover:bg-green-500 text-black cursor-pointer"
				>
					Save
				</Button>
			</div>
		</form>
	</div>
</section>
