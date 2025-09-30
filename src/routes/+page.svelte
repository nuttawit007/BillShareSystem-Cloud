<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { DateFormatter, type DateValue, getLocalTimeZone } from '@internationalized/date';
	import { cn } from '$lib/utils.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import { Calendar } from '$lib/components/ui/calendar/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import InputWithLabel from '$lib/components/input/InputWithLabel.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import BillCard from '$lib/components/billcard/BillCard.svelte';

	import { CalendarIcon } from '@lucide/svelte';

	let { data } = $props();
	let { bill } = data;

	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});

	let value = $state<DateValue | undefined>();
	let contentRef = $state<HTMLElement | null>(null);
	let parentText = $state('');


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
	<div class="flex items-center justify-between">
		<h2 class="text-xl">Bill History</h2>
		<div class="flex gap-4">
			<!-- filter search -->
			<Input placeholder="search" />
			<!-- filter date -->
			<Popover.Root>
				<Popover.Trigger
					class={cn(
						buttonVariants({
							variant: 'outline',
							class: 'justify-start px-6 py-5 text-left font-normal'
						}),
						!value && 'text-muted-foreground'
					)}
				>
					<CalendarIcon />
					{value ? df.format(value.toDate(getLocalTimeZone())) : 'Pick a date'}
				</Popover.Trigger>
				<Popover.Content bind:ref={contentRef} class="w-auto p-0">
					<Calendar type="single" bind:value />
				</Popover.Content>
			</Popover.Root>
		</div>
	</div>
</section>

<!-- ---------- Result in box ---------- -->
<section
	class="mx-auto flex min-h-60 flex-col justify-between rounded-md border-[1px] border-gray-400 p-4"
>
	<section>
		<div class="space-y-2">
			{#each bill as e}
				<BillCard title={e.title} date={e.billDate} id={e.id} />
			{/each}
		</div>
	</section>
</section>
