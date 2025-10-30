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
	<div class="mt-4 text-2xl font-semibold text-center">
		<h1>{bill?.title} bill</h1>
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
