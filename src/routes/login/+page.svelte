<script lang="ts">
    import { Lock, UserRound, EyeOff, Eye } from 'lucide-svelte';

    import { username } from '$lib/stores/auth';
    let name = $state('');
	let password = $state('');
	let isLoading = $state(false);
	let showPassword = $state(false);

    const onSubmit = (event: SubmitEvent) => {
		event.preventDefault();
        username.set(name);
        
        isLoading = true;
        setTimeout(() => {
			isLoading = false;
			if (typeof window !== 'undefined') {
				const target = name?.trim().toLowerCase() === 'admin' ? '/dashboard' : '/bill';
				window.location.href = target;
			}
		}, 500);
    };

	function togglePasswordVisibility() {
		showPassword = !showPassword;
	}
</script>

<div class="flex min-h-screen items-center justify-center bg-gradient-to-br from-white via-violet-100 to-violet-300 p-4">
	<div class="w-full max-w-md">
		<!-- การ์ดขาว ขอบม่วงอ่อน เงานุ่ม -->
		<div class="rounded-2xl border border-violet-200 bg-white/90 p-8 shadow-xl shadow-violet-100/40 backdrop-blur-sm">
			<!-- Header -->
			<div class="mb-8 text-center">
				<!-- โลโก้วงกลมม่วง -->
				<div class="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-800">
					<svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
						/>
					</svg>
				</div>
				<h1 class="mb-2 text-2xl font-semibold text-slate-900">เข้าสู่ระบบ</h1>
				<p class="text-sm text-slate-500">กรุณากรอกข้อมูลเพื่อเข้าสู่ระบบ</p>
			</div>

			<!-- Login Form -->
			<form onsubmit={onSubmit} class="space-y-5">
				<!-- Username Field -->
				<div>
					<label for="username" class="mb-2 block text-sm font-medium text-slate-700">
						ชื่อผู้ใช้
					</label>
					<div class="relative">
						<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
							<UserRound class='w-5 h-5 text-violet-500' />
						</div>
						<input
							type="text"
							id="username"
							bind:value={name}
							placeholder="กรอกชื่อผู้ใช้"
							required
							class="w-full rounded-xl border border-violet-200/70 bg-white py-3 pr-4 pl-10 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-transparent focus:ring-2 focus:ring-violet-600"
						/>
					</div>
				</div>

				<!-- Password Field -->
				<div>
					<label for="password" class="mb-2 block text-sm font-medium text-slate-700">
						รหัสผ่าน
					</label>
					<div class="relative">
						<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
							<Lock class='w-5 h-5 text-violet-500' />
						</div>
						<input
							type={showPassword ? 'text' : 'password'}
							id="password"
							bind:value={password}
							placeholder="กรอกรหัสผ่าน"
							required
							class="w-full rounded-xl border border-violet-200/70 bg-white py-3 pr-12 pl-10 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-transparent focus:ring-2 focus:ring-violet-600"
						/>
						<button
							type="button"
							onclick={togglePasswordVisibility}
							class="absolute inset-y-0 right-0 flex items-center pr-3 text-violet-400 transition-colors hover:text-violet-600"
						>
							{#if showPassword}
								<Eye class="w-5 h-5" />
							{:else}
								<EyeOff class="w-5 h-5" />
							{/if}
						</button>
					</div>
				</div>

				<!-- Submit Button -->
				<button
					type="submit"
					disabled={isLoading}
					class="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 py-3 font-medium text-white transition-all hover:bg-violet-700 focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
				>
					{#if isLoading}
						<svg class="h-5 w-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
							<circle
								class="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								stroke-width="4"
							></circle>
							<path
								class="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							></path>
						</svg>
						<span>กำลังเข้าสู่ระบบ...</span>
					{:else}
						<span>เข้าสู่ระบบ</span>
					{/if}
				</button>
			</form>
		</div>

		<!-- Footer -->
		<p class="mt-6 text-center text-sm text-slate-500">
			© 2025 Bill Share System. Cloud computing project.
		</p>
	</div>
</div>

<style>
	:global(body) {
		margin: 0;
		font-family:
			-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
	}
</style>
