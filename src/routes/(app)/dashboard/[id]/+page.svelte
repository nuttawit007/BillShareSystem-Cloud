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
		<header
			class="rounded-3xl bg-gradient-to-r from-white via-violet-50
        to-violet-200 p-6 shadow-md ring-1
        shadow-violet-100/60 ring-violet-100"
		>
			<div class="flex items-start justify-between gap-4">
				<!-- Left: Title & meta -->
				<div class="space-y-1">
					<p class="text-xs font-medium text-slate-600">Current Bill</p>
					<h1 class="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
						{bill.title}
					</h1>

					<div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
						<span class="text-slate-700">Bill ID: #{bill.id}</span>
						<span class="hidden h-1 w-1 rounded-full bg-slate-300 sm:inline"></span>
						<span class="text-slate-600">สร้างเมื่อ: {formatBillDate(bill.billDate)}</span>
					</div>
				</div>
				<!-- Right: Back button -->
				<div>
					<a class="mt-3 inline-flex items-center rounded-md bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-violet-700" href="/dashboard">Back</a>
				</div>
			</div>
		</header>

		<ResultView result={bill.billItems} billId={bill.id} page={'admin'} />
	</section>
{:else}
	<p
		class="rounded-md border border-dashed border-slate-300 bg-white p-6 text-center text-slate-500"
	>
		ไม่พบข้อมูลบิลนี้
	</p>
{/if}
