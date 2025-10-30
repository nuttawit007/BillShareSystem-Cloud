<script lang="ts">
    import Button from '$lib/components/ui/button/button.svelte';
    import { DateFormatter, type DateValue} from '@internationalized/date';
    import InputWithLabel from '$lib/components/input/InputWithLabel.svelte';
    import BillCard from '$lib/components/billcard/BillCard.svelte';

	let { data } = $props();
	let { bill } = data;

	// DateFormatter ตั้งเป็น dd/mm/yyyy
    const df = new DateFormatter('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

	let value = $state<DateValue | undefined>();
	let contentRef = $state<HTMLElement | null>(null);
	let parentText = $state('');


    function formatISODateToDDMMYYYY(v: string | Date | undefined) {
        if (!v) return '';
        const d = typeof v === 'string' ? new Date(v) : v;
        if (Number.isNaN(d.getTime())) return String(v);
        const pad = (n: number) => String(n).padStart(2, '0');
        return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
    }

</script>

<section>
	<!-- Create new bill -->
	<form method="POST" action="?/createBill">
		<div class="flex items-end justify-between gap-3">
			<InputWithLabel
				label="Create new bill"
				placeholder="Enter your bill name"
				name="title"
				bind:inputText={parentText}
			/>
			<Button type="submit" class='cursor-pointer'>CREATE</Button>
		</div>
	</form>

	<!-- head search filter -->
	<div class="mt-4 flex items-center justify-between">
		<h2 class="text-xl font-semibold text-slate-900">Bill History</h2>
	</div>
</section>

<!-- ---------- Result in box ---------- -->
<section
	class="mt-2 mx-auto min-h-60 rounded-xl border border-violet-100 bg-white/90 p-4
	shadow-sm shadow-violet-100/60 backdrop-blur-sm"
>
	<section>
		<div class="space-y-3">
			{#each bill as e}
				<BillCard title={e.title} date={formatISODateToDDMMYYYY(e.billDate)} id={e.id} />
			{/each}
		</div>
	</section>
</section>

