<script lang="ts">
	let { stage = $bindable('people') } = $props<{ 
		stage: string 
	}>();
</script>

<section class="flex w-full justify-between gap-3">
	<button onclick={() => (stage = 'people')} class="flex-1 cursor-pointer focus:outline-none">
		<div
			class="rounded-xl px-8 py-4 text-center ring-1 ring-violet-100 transition-all duration-200
					{stage === 'people'
						? 'bg-violet-600 text-white shadow-md shadow-violet-200'
						: 'bg-white text-violet-700 hover:bg-violet-100  hover:border-violet-400'}"
		>
			<h2 class="font-semibold">People</h2>
		</div>
	</button>

	<button onclick={() => (stage = 'menu')} class="flex-1 cursor-pointer focus:outline-none">
		<div
			class="flex-1 rounded-xl px-8 py-4 text-center ring-1 ring-violet-100 transition-all duration-200
					{stage === 'menu'
						? 'bg-violet-600 text-white shadow-md shadow-violet-200'
						: 'bg-white text-violet-700 hover:bg-violet-100  hover:border-violet-400'}"
		>
			<h2 class="font-semibold">Menu</h2>
		</div>
	</button>

	<button onclick={() => (stage = 'result')} class="flex-1 cursor-pointer focus:outline-none">
		<div
			class="flex-1 rounded-xl px-8 py-4 text-center ring-1 ring-violet-100 transition-all duration-200
					{stage === 'result'
						? 'bg-violet-600 text-white shadow-md shadow-violet-200'
						: 'bg-white text-violet-700 hover:bg-violet-100  hover:border-violet-400'}"
		>
			<h2 class="font-semibold">Result</h2>
		</div>
	</button>
</section>

