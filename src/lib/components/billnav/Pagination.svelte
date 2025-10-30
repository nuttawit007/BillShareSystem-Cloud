<script lang="ts">
    import Button from "../ui/button/button.svelte";
    let { stage = $bindable('people')} = $props<{
        stage: string
    }>();
</script>

<section class='w-full flex justify-between mt-4 '>
    {#if stage == 'people'}
        <a href={'/bill'}>
            <Button class='cursor-pointer px-8 py-4 bg-gray-400 hover:bg-gray-500'> Back </Button>
        </a>
        <Button class='cursor-pointer px-8 py-4 bg-green-400 hover:bg-green-500 text-black' onclick={() => (stage = 'menu')}> Next </Button>
    {:else if stage == 'menu'}
        <Button class='cursor-pointer px-8 py-4 bg-gray-400 hover:bg-gray-500' onclick={() => (stage = 'people')}> Back </Button>
        <Button class='cursor-pointer px-8 py-4  bg-green-400 hover:bg-green-500 text-black' onclick={() => (stage = 'result')}> Result </Button>
    {:else if stage == 'result'}
        <Button class='cursor-pointer px-8 py-4 bg-gray-400 hover:bg-gray-500' onclick={() => (stage = 'menu')}> Back </Button>
        <a href={'/bill'} onclick={() => stage = 'people'}>
            <Button class='cursor-pointer px-8 py-4 bg-green-400 hover:bg-green-500 text-black'> Save </Button>
        </a> 
    {/if}
</section>