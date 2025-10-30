<script lang="ts">
	import BillNav from '$lib/components/billnav/BillNav.svelte';
	import Pagination from '$lib/components/billnav/Pagination.svelte';
	import MenuView from '$lib/components/menuview/MenuView.svelte';
	import PeopleView from '$lib/components/peopleview/PeopleView.svelte';
	import ResultView from '$lib/components/resultview/ResultView.svelte';

	import { page } from '$app/state';
	import { browser } from '$app/environment';

	let id = page.params.id;

	type Stage = 'people' | 'menu' | 'result';
	let setStage = $state<Stage>('people');

	// query param
	let { data } = $props();
	let { bill } = data;

	const storageKey = `bill-stage-${id}`;

	if (browser) {
		const savedStage = localStorage.getItem(storageKey);
		if (savedStage === 'people' || savedStage === 'menu' || savedStage === 'result') {
			setStage = savedStage;
		}
	}

	$effect(() => {
		if (!browser) return;
		localStorage.setItem(storageKey, setStage);
	});

</script>

<section>
	<BillNav bind:stage={setStage}/>
	<!-- Card header: Bill title -->
	<div class="mt-4">
		<div class="relative rounded-3xl p-5 md:p-6
				bg-gradient-to-r from-white via-violet-50 to-violet-200
				shadow-md shadow-violet-100/60 ring-1 ring-violet-100">
			<div class="space-y-1">
				<p class="text-xs font-medium text-slate-600">Current Bill</p>
				<h1 class="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 mt-4">
					{bill?.title ?? 'Untitled'}
				</h1>
			</div>
		</div>
	</div>

	{#if setStage === 'people'}
		<PeopleView customer={bill?.customer} billId={id}/>
	{:else if setStage === 'menu'}
		<MenuView menu={bill?.billItems} billId={id} customer={bill?.customer} />
	{:else if setStage === 'result'}
		<ResultView result={bill?.billItems} billId={id} page={'user'}/>
	{/if}
	<Pagination bind:stage={setStage}/>
</section>
