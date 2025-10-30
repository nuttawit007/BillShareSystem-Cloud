<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Table from '$lib/components/ui/table/index.js';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const {
		billId,
		billTitle,
		user,
		items,
		subtotal,
		serviceApplied,
		serviceChargeAmount,
		vatApplied,
		vatAmount,
		grandTotal
	} = data;
</script>

<section class="space-y-6">
	<div class="rounded-3xl p-5 md:p-6
			bg-gradient-to-r from-white via-violet-50 to-violet-200
			ring-1 ring-violet-100 shadow-md shadow-violet-100/60">
		<div class="flex items-center justify-between gap-4">
			<div class="space-y-1">
			<p class="text-xs font-medium text-slate-600">รายละเอียด</p>
			<h1 class="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
				{billTitle} — {user}
			</h1>
			<p class="text-sm text-slate-600">รายละเอียดรายการที่ {user} ต้องจ่าย</p>
			</div>

			<Button
			class="cursor-pointer rounded-lg bg-violet-600 px-4 py-2 text-white
					hover:bg-violet-700 focus:outline-none focus:ring-2
					focus:ring-violet-600 focus:ring-offset-2"
			href={`/bill/${billId}`}>
			กลับสู่หน้ายอดรวม
			</Button>
		</div>
	</div>

	{#if items.length === 0}
		<div class="rounded-lg border border-dashed border-slate-300 p-6 text-center text-slate-500">
			ไม่มีรายการที่ {user} มีส่วนร่วม
		</div>
	{:else}
		<div class="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
			<div class="overflow-x-auto">
				<Table.Root class="w-full text-sm">
					<Table.Header class="bg-slate-800 text-white">
						<Table.Row>
							<Table.Head class="w-[80px] px-4 py-3 text-white">ID</Table.Head>
							<Table.Head class="px-4 py-3 text-white">ชื่อรายการ</Table.Head>
							<Table.Head class="px-4 py-3 text-white text-right">จำนวน</Table.Head>
							<Table.Head class="px-4 py-3 text-white text-right">ราคารวม</Table.Head>
							<Table.Head class="px-4 py-3 text-white text-right">ส่วนที่ต้องจ่าย</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{#each items as item}
							<Table.Row class="transition-colors even:bg-slate-50">
								<Table.Cell class="px-4 py-3 font-medium">{item.index}</Table.Cell>
								<Table.Cell class="px-4 py-3">{item.name}</Table.Cell>
								<Table.Cell class="px-4 py-3 text-right">{item.amount}</Table.Cell>
								<Table.Cell class="px-4 py-3 text-right font-mono tabular-nums">{item.total.toFixed(2)} ฿</Table.Cell>
								<Table.Cell class="px-4 py-3 text-right font-mono tabular-nums">{item.share.toFixed(2)} ฿</Table.Cell>
							</Table.Row>
						{/each}
					</Table.Body>
					<Table.Footer class="bg-slate-50">
						<Table.Row>
							<Table.Cell class="px-4 py-3 font-medium" colspan={4}>รวมก่อนค่าบริการและ VAT</Table.Cell>
							<Table.Cell class="px-4 py-3 text-right font-mono font-semibold tabular-nums">{subtotal.toFixed(2)} ฿</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell class="px-4 py-3" colspan={4}>
								ค่าบริการ 10%
								{#if !serviceApplied}
									<span class="ml-2 text-sm text-slate-500">(ไม่ได้เลือก)</span>
								{/if}
							</Table.Cell>
							<Table.Cell class="px-4 py-3 text-right font-mono tabular-nums">
								{serviceChargeAmount.toFixed(2)} ฿
							</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell class="px-4 py-3" colspan={4}>
								VAT 7%
								{#if !vatApplied}
									<span class="ml-2 text-sm text-slate-500">(ไม่ได้เลือก)</span>
								{/if}
							</Table.Cell>
							<Table.Cell class="px-4 py-3 text-right font-mono tabular-nums">
								{vatAmount.toFixed(2)} ฿
							</Table.Cell>
						</Table.Row>
						<Table.Row class="font-semibold">
							<Table.Cell class="px-4 py-3" colspan={4}>ยอดรวมที่ต้องชำระ</Table.Cell>
							<Table.Cell class="px-4 py-3 text-bold text-right font-mono tabular-nums text-violet-600">{grandTotal.toFixed(2)} ฿</Table.Cell>
						</Table.Row>
					</Table.Footer>
				</Table.Root>
			</div>
		</div>
	{/if}
</section>
