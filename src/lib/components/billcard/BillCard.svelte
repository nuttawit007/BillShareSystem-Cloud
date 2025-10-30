<script lang="ts">
	let { title, date, id } = $props();
	// format id as 5 digits with leading zeros, prefixed with #
    const formatId = (v: number | string) => {
        const n = Number(v) || 0;
        return `#${String(n).padStart(5, '0')}`;
    };
</script>

<div class="flex w-full items-center justify-between rounded-xl border border-violet-100 bg-white/90 px-5 py-4
            shadow-sm shadow-violet-100/60 backdrop-blur-sm transition hover:shadow-md">
	<a href={`/bill/${id}`}
		class="group flex flex-1 flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
		<div class="transition">
			<h4 class="text-xs font-medium text-violet-500 tracking-wide">{formatId(id)}</h4>
			<h2 class="text-lg font-semibold text-slate-900 group-hover:text-violet-700">{title || 'No Assign'}</h2>
		</div>
		<p class="text-sm text-slate-500">{date || 'N/A'}</p>
	</a>

	<form method="POST" action="?/deleteBill" class="ml-4">
		<input type="hidden" name="billId" value={id} />
		<button
			type="submit"
			class="rounded-md bg-red-500 px-4 py-[5px] text-white transition
                hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 cursor-pointer"
		>
			delete
		</button>
	</form>
</div>

