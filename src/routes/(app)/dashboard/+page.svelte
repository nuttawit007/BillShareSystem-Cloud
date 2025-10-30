<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import Button from '$lib/components/ui/button/button.svelte';

	const dateFormatter = new Intl.DateTimeFormat('th-TH', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	});

	const currencyFormatter = new Intl.NumberFormat('th-TH', {
		style: 'currency',
		currency: 'THB',
		minimumFractionDigits: 2
	});

	let { data } = $props();
	let bills = data.bills;
	let totalBills = data.totalBills;
	let totalAmount = data.totalAmount;

	const formatDateTime = (value: string | Date) => {
		if (!value) return '-';
		const date = value instanceof Date ? value : new Date(value);
		if (Number.isNaN(date.getTime())) return String(value);
		return dateFormatter.format(date);
	};

	const formatCurrency = (value: number) => currencyFormatter.format(value ?? 0);

	// format id as 5 digits with leading zeros, prefixed with #
    const formatId = (v: number | string) => {
        const n = Number(v) || 0;
        return `#${String(n).padStart(5, '0')}`;
    };
</script>

<div class="min-h-screen bg-gray-100 p-8">
    <h1 class="mb-4 font-bold text-2xl">Dashboard</h1>

	<!-- Stats Cards -->
	<div class="flex mb-8 gap-4">
		<!-- Bills Card -->
		<div class="flex-1 relative flex items-center gap-4 overflow-hidden rounded-lg bg-white p-6 shadow-sm">
			<div class="absolute top-0 bottom-0 left-0 w-1 bg-red-500"></div>
			<div class="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
				<svg class="h-8 w-8 text-red-500" fill="currentColor" viewBox="0 0 24 24">
					<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
					<path d="M14 2v6h6" />
					<line x1="8" y1="13" x2="16" y2="13" stroke="white" stroke-width="2" />
					<line x1="8" y1="17" x2="16" y2="17" stroke="white" stroke-width="2" />
				</svg>
			</div>
			<div>
				<p class="mb-1 text-sm text-gray-600">bills</p>
				<p class="text-4xl font-bold">{totalBills}</p>
			</div>
		</div>

		<!-- Total Sales Card -->
		<div class="flex-1 relative flex items-center gap-4 overflow-hidden rounded-lg bg-white p-6 shadow-sm">
			<div class="absolute top-0 bottom-0 left-0 w-1 bg-blue-500"></div>
			<div class="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
				<svg class="h-8 w-8 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
					<path d="M2 5h20v4H2V5zm0 6h20v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8z" />
					<path d="M6 15h4v2H6v-2z" fill="white" />
					<polyline points="16 8 18 6 20 8" stroke="white" stroke-width="2" fill="none" />
					<line x1="18" y1="6" x2="18" y2="11" stroke="white" stroke-width="2" />
				</svg>
			</div>
			<div>
				<p class="mb-1 text-sm text-gray-600">Total Sales</p>
				<p class="text-4xl font-bold">{formatCurrency(totalAmount)}</p>
			</div>
		</div>
	</div>

    <div class="rounded-lg shadow mt-4 border">
        <Table.Root>
            <Table.Header class="bg-gray-300">
                <Table.Row>
                    <Table.Head class="w-[60px]">No</Table.Head>
                    <Table.Head class="w-[120px]">Bill ID</Table.Head>
                    <Table.Head>Title</Table.Head>
                    <Table.Head>Bill Date</Table.Head>
                    <Table.Head class="w-[120px]">Price</Table.Head>
                    <Table.Head class="w-[160px] text-left">Actions</Table.Head>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {#each bills as bill, i}
					<Table.Row class={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
						<Table.Cell class="px-4 py-3 text-gray-700">{i + 1}</Table.Cell>
						<Table.Cell class="px-4 py-3 text-gray-700">{formatId(bill.id)}</Table.Cell>
						<Table.Cell class="px-4 py-3 text-gray-700">{bill.title}</Table.Cell>
						<Table.Cell class="px-4 py-3 text-gray-700">{formatDateTime(bill.billDate)}</Table.Cell>
						<Table.Cell class="px-4 py-3 text-gray-700">{formatCurrency(bill.total)}</Table.Cell>
						<Table.Cell class="px-4 py-3 text-left">
							<a href={`/dashboard/${bill.id}`} class="inline-block mr-2">
								<Button class="px-3 py-1 cursor-pointer">View</Button>
							</a>
						</Table.Cell>
					</Table.Row>
                {/each}
            </Table.Body>
        </Table.Root>
    </div>
</div>
