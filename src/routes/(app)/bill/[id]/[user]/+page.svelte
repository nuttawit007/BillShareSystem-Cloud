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
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-2xl font-semibold">{billTitle} — {user}</h1>
			<p class="text-sm text-slate-500">รายละเอียดรายการที่ {user} ต้องจ่าย</p>
		</div>
		<Button class="bg-blue-500 hover:bg-blue-600 px-4 py-5 cursor-pointer" href={`/bill/${billId}`}>
			กลับสู่หน้ายอดรวม
		</Button>
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
							<Table.Cell class="px-4 py-3 text-right font-mono tabular-nums">{grandTotal.toFixed(2)} ฿</Table.Cell>
						</Table.Row>
					</Table.Footer>
				</Table.Root>
			</div>
		</div>
	{/if}
</section>
