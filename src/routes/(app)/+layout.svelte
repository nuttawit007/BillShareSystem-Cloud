<script lang="ts">
    import '../../app.css';
    import Button from '$lib/components/ui/button/button.svelte';
    import { username } from '$lib/stores/auth';
    import { goto } from '$app/navigation';
    import { browser } from '$app/environment';

    let { children } = $props();

    const logout = () => {
        username.set(null);
        console.log('Logging out');
        if (browser) localStorage.removeItem('username');
        goto('/login');
    };
</script>

<main class="flex min-h-screen flex-col items-center pt-4">
    <section class="max-w-4xl w-full">
        <nav class="flex w-full items-center justify-between bg-gray-400 px-10 py-4 rounded-lg mb-4">
            <a href="/bill"><h1 class="text-xl">BillShareSystem</h1></a>
            <div>
                <Button>{$username ?? 'username'}</Button>
                <button type="button" on:click={logout} class="bg-red-500 hover:bg-red-600 text-white cursor-pointer px-4 py-[5px] rounded-sm">Logout</button>
            </div>
        </nav>
        {@render children()}
    </section>
</main>