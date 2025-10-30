import prisma from '$lib/prisma';
import { redirect, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
    const billId = Number(params.id);
    const billItemId = Number(params.itemid);

    if (Number.isNaN(billId) || Number.isNaN(billItemId)) {
        return {
            item: { name: '', price: 0, amount: 1 },
            billId,
            billItemId
        };
    }

    const item = await prisma.billItem.findUnique({
        where: { id: billItemId }
    });

    // ถ้าไม่พบ หรือ item ไม่ตรง bill ให้คืนค่าเริ่มต้น (หรือ throw redirect/404 ตามต้องการ)
    if (!item || item.billId !== billId) {
        return {
            item: { name: '', price: 0, amount: 1 },
            billId,
            billItemId
        };
    }

    return { item, billId, billItemId };
};

export const actions: Actions = {
    default: async ({ request, params }) => {
        const form = await request.formData();
        const name = String(form.get('name') ?? '').trim();
        const price = Number(form.get('price'));
        const amount = Number(form.get('amount'));
        const billId = Number(params.id);
        const billItemId = Number(params.itemid);

        if (!name || Number.isNaN(price) || Number.isNaN(amount)) {
            return fail(400, { message: 'Invalid input' });
        }

        const existing = await prisma.billItem.findUnique({ where: { id: billItemId } });
        if (!existing || existing.billId !== billId) {
            return fail(404, { message: 'Item not found' });
        }

        await prisma.billItem.update({
            where: { id: billItemId },
            data: { name, price, amount }
        });

        throw redirect(303, `/bill/${billId}`);
    }
};