<script lang="ts">
	let { title, date, id } = $props();
	// format id as 5 digits with leading zeros, prefixed with #
    const formatId = (v: number | string) => {
        const n = Number(v) || 0;
        return `#${String(n).padStart(5, '0')}`;
    };
</script>

<div class="flex w-full items-center justify-between rounded-lg border border-gray-400 px-5 py-4">
	<a href={`/bill/${id}`} class="flex flex-1 flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
		<div>
			<h4 class='text-gray-500 text-sm'>{formatId(id)}</h4>
			<h2 class='text-bold text-lg'>{title || 'No Assign'}</h2>
		</div>
		<p>{date || 'N/A'}</p>
	</a>
	<form method="POST" action="?/deleteBill" class="ml-4">
		<input type="hidden" name="billId" value={id} />
		<button
			type="submit"
			class="rounded-sm bg-red-500 px-4 py-[5px] text-white transition hover:bg-red-600"
		>
			delete
		</button>
	</form>
</div>
