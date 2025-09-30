<script lang="ts">
	import * as Table from '$lib/components/ui/table/index.js';
	import Button from '$lib/components/ui/button/button.svelte';

	let vat = $state(false);
	let service_charge = $state(false);

	let { result, billId } = $props();

	function summarizeBill(
		result: {
			name: string;
			price: number;
			amount: number;
			customer: string[];
		}[],
		vat: boolean = false,
		service_charge: boolean = false
	) {
		const summary: Record<string, { items: string[]; total: number }> = {};

		for (const item of result) {
			if (!item.customer || item.customer.length === 0) continue;
			const perPerson = (item.price * item.amount) / item.customer.length;
			for (const person of item.customer) {
				if (!summary[person]) {
					summary[person] = { items: [], total: 0 };
				}
				summary[person].items.push(item.name);
				summary[person].total += perPerson;
			}
		}

		let totalAll = Object.values(summary).reduce((sum, v) => sum + v.total, 0);

		// เพิ่ม VAT และ Service charge ใน totalAll
		if (vat) {
			totalAll *= 1.07;
		}
		if (service_charge) {
			totalAll *= 1.1;
		}

		// เพิ่มผลรวมแต่ละคน
		for (const person in summary) {
			let personTotal = summary[person].total;
			if (service_charge) personTotal *= 1.1;
			if (vat) personTotal *= 1.07;
			summary[person].total = personTotal;
		}

		return { summary, totalAll };
	}

	let { summary, totalAll } = $derived(summarizeBill(result, vat, service_charge));
</script>

<section class="mt-4">
	<div>
		<h1 class="mb-4 text-lg font-semibold">Optional</h1>
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
			<!-- VAT 7% -->
			<label
				class="group cursor-pointer rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-emerald-500 hover:shadow dark:border-slate-800 dark:bg-slate-900"
			>
				<div class="flex items-start gap-3">
					<input
						type="checkbox"
						name="optional"
						value="vat"
						onchange={() => (vat = !vat)}
						class="mt-0.5 size-5 rounded border-slate-300 accent-emerald-600 dark:border-slate-700 dark:accent-emerald-500"
					/>
					<div>
						<div class="leading-6 font-medium">VAT 7%</div>
						<div class="text-xs text-slate-500 dark:text-slate-400">
							ภาษีมูลค่าเพิ่มตามอัตรามาตรฐาน
						</div>
					</div>
				</div>
			</label>

			<!-- Service charge 10% -->
			<label
				class="group cursor-pointer rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-emerald-500 hover:shadow dark:border-slate-800 dark:bg-slate-900"
			>
				<div class="flex items-start gap-3">
					<input
						type="checkbox"
						name="optional"
						value="service charge"
						onchange={() => (service_charge = !service_charge)}
						class="mt-0.5 size-5 rounded border-slate-300 accent-emerald-600 dark:border-slate-700 dark:accent-emerald-500"
					/>
					<div>
						<div class="leading-6 font-medium">Service charge 10%</div>
						<div class="text-xs text-slate-500 dark:text-slate-400">
							ค่าบริการตามนโยบายร้าน/องค์กร
						</div>
					</div>
				</div>
			</label>
		</div>
	</div>

	<div class="mt-8 w-full">
		<div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
			<div class="overflow-x-auto">
				<Table.Root class="w-full text-sm md:text-[15px]">
					<!-- Header -->
					<Table.Header class="sticky top-0 z-10 bg-slate-800">
						<Table.Row class="hover:bg-transparent">
							<Table.Head class="w-[80px] px-4 py-3 font-medium text-white">ID</Table.Head>
							<Table.Head class="px-4 py-3 font-medium text-white">Name</Table.Head>
							<Table.Head class="px-4 py-3 font-medium text-white">Each Person</Table.Head>
							<Table.Head class="px-4 py-3 font-medium text-white">Action</Table.Head>
						</Table.Row>
					</Table.Header>

					<!-- Body -->
					<Table.Body>
						{#each Object.entries(summary) as [name, person], index}
							<Table.Row class="transition-colors even:bg-slate-50 hover:bg-slate-100">
								<Table.Cell class="px-4 py-3 font-medium text-slate-900">
									{index + 1}
								</Table.Cell>
								<Table.Cell class="px-4 py-3 text-slate-700">
									{name}
								</Table.Cell>
								<Table.Cell class="px-4 py-3 font-mono tabular-nums">
									{person.total.toFixed(2)} ฿
								</Table.Cell>
					<Table.Cell class="px-4 py-3 text-left">
						{#if billId}
							<Button
								class='cursor-pointer bg-blue-500 hover:bg-blue-700'
								href={`/bill/${billId}/${encodeURIComponent(name)}?vat=${vat ? 'true' : 'false'}&service=${service_charge ? 'true' : 'false'}`}
							>
								detail
							</Button>
						{:else}
							<Button class='cursor-pointer bg-blue-500 hover:bg-blue-700' disabled>
								detail
							</Button>
						{/if}
					</Table.Cell>
							</Table.Row>
						{/each}
					</Table.Body>

					<!-- Footer (Total) -->
					<Table.Footer>
						<Table.Row class="border-t border-slate-200 bg-slate-50">
							<Table.Cell class="px-4 py-3 text-slate-600" colspan={3}>Total</Table.Cell>
							<Table.Cell class="px-4 py-3 text-right font-mono font-semibold tabular-nums">
								{totalAll.toFixed(2)} ฿
							</Table.Cell>
						</Table.Row>
					</Table.Footer>
				</Table.Root>
			</div>
		</div>
	</div>
</section>
