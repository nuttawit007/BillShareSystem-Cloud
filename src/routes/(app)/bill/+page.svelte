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
		<div class="flex items-end justify-between gap-1">
			<InputWithLabel
				label="Create new bill"
				placeholder="Enter your bill name"
				name="title"
				bind:inputText={parentText}
			/>
			<Button type="submit">CREATE</Button>
		</div>
	</form>
	<!-- head search filter -->
	<div class="flex items-center justify-between mt-4">
		<h2 class="text-xl">Bill History</h2>
	</div>
</section>

<!-- ---------- Result in box ---------- -->
<section
	class="mx-auto flex min-h-60 flex-col justify-between rounded-md border-[1px] border-gray-400 p-4 mt-2"
>
	<section>
		<div class="space-y-2">
			{#each bill as e}
				<BillCard title={e.title} date={formatISODateToDDMMYYYY(e.billDate)} id={e.id} />
			{/each}
		</div>
	</section>
</section>
