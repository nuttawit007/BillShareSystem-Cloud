<script lang="ts">
    import InputWithLabel from "$lib/components/input/InputWithLabel.svelte";
    import Button from "$lib/components/ui/button/button.svelte";

    export let data;
    const item = data.item ?? { name: '', price: '', amount: '1' };

    // local vars for two-way binding
    let name: string = item.name ?? '';
    let price: string = String(item.price ?? '');
    let amount: string = String(item.amount ?? '1');
</script>

<section class="p-4">
    <h1 class="text-xl font-medium mb-4">Edit Menu</h1>

    <form method="POST" class="space-y-3">
        <!-- ส่งค่า billItemId ด้วย (server ใช้ params เป็นหลัก) -->
        <input type="hidden" name="billItemId" value={data.billItemId} />

        <div>
            <InputWithLabel label="Name" name="name" bind:inputText={name} />
        </div>

        <div>
            <InputWithLabel label="Price" name="price" bind:inputText={price} />
        </div>

        <div>
            <InputWithLabel label="Amount" name="amount" bind:inputText={amount} />
        </div>

        <div class="flex gap-2 mt-4">
            <Button type="button" href={`/bill/${data.billId}`}>Cancel</Button>
            <Button type="submit">Save</Button>
        </div>
    </form>
</section>