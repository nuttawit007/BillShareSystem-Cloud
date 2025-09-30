<script lang="ts">
	let { stage = $bindable('people') } = $props<{ 
		stage: string 
	}>();
</script>

<section class="flex w-full justify-between gap-2">
	<button onclick={() => (stage = 'people')} class="flex-1 cursor-pointer">
		<div class="rounded-lg px-8 py-4 {stage === 'people' ? 'bg-gray-600' : 'bg-gray-400'}">
			<h2>People</h2>
		</div>
	</button>
	<button onclick={() => (stage = 'menu')} class="flex-1 cursor-pointer">
		<div class="flex-1 rounded-lg px-8 py-4 {stage === 'menu' ? 'bg-gray-600' : 'bg-gray-400'}">
			<h2>Menu</h2>
		</div>
	</button>
	<button onclick={() => (stage = 'result')} class="flex-1 cursor-pointer">
		<div class="flex-1 rounded-lg px-8 py-4 {stage === 'result' ? 'bg-gray-600' : 'bg-gray-400'}">
			<h2>Result</h2>
		</div>
	</button>
</section>
