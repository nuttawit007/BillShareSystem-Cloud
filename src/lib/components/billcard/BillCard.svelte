<script>
	let { title, date, id } = $props();
</script>

<a href={`/bill/${id}`}
	class="flex w-full justify-between rounded-lg border-[1px] border-gray-400 px-5 py-4">
	<h2>{id}. {title || 'No Assign'}</h2>
	<p>{date || 'N/A'}</p>
</a>
