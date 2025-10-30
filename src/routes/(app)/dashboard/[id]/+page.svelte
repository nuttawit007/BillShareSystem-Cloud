<script lang="ts">
	import ResultView from '$lib/components/resultview/ResultView.svelte';

	let { data } = $props();

	type BillResult = {
		id: number;
		title: string;
		billDate: string | Date;
		billItems: Array<{
			name: string;
			price: number;
			amount: number;
			customer: string[];
		}>;
	};

	let bill: BillResult | undefined = data.bill;

	const dateFormatter = new Intl.DateTimeFormat('th-TH', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	});

	const formatBillDate = (value: string | Date) => {
		const date = value instanceof Date ? value : new Date(value);
		if (Number.isNaN(date.getTime())) return '-';
		return dateFormatter.format(date);
	};
</script>

{#if bill}
	<section class="space-y-6">
		<header class="rounded-md border border-slate-200 bg-white p-6 shadow-sm">
			<h1 class="text-2xl font-semibold text-slate-900">{bill.title}</h1>
			<p class="text-sm text-slate-500">Bill ID: #{bill.id}</p>
			<p class="text-xs text-slate-400">สร้างเมื่อ: {formatBillDate(bill.billDate)}</p>
			<a class="mt-3 inline-flex items-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500" href={`/dashboard`}>Back</a>
		</header>

		<ResultView result={bill.billItems} billId={bill.id} page={'admin'}/>
	</section>
{:else}
	<p class="rounded-md border border-dashed border-slate-300 bg-white p-6 text-center text-slate-500">
		ไม่พบข้อมูลบิลนี้
	</p>
{/if}
