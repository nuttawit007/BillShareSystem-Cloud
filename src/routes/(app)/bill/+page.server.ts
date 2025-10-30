import prisma from '$lib/prisma';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';


export async function load() {
	const bill = await prisma.bill.findMany({
		include: {
			billItems: true
		},
		orderBy: {
			billDate: 'desc'
		}
	});

	return {
		bill
	};
}

export const actions: Actions = {
	createBill: async ({ request }) => {
		const formData = await request.formData();
		const title = formData.get('title');

		// 2.
		if (!title) {
			return fail(400, { title, missing: true });
		}

		// 3.
		if (typeof title != 'string') {
			return fail(400, { incorrect: true });
		}
		// 4.
		await prisma.bill.create({
			data: {
				title: title,
				billDate: new Date(),
				billItems: {}
			}
		});

		//5.
		throw redirect(303, `/bill`);
	},
	deleteBill: async ({ request }) => {
		const formData = await request.formData();
		const billIdValue = formData.get('billId');
		const billId = Number(billIdValue);

		if (Number.isNaN(billId)) {
			return fail(400, { message: 'Invalid bill id' });
		}

		await prisma.$transaction([
			prisma.billItem.deleteMany({ where: { billId } }),
			prisma.bill.delete({ where: { id: billId } })
		]);

		throw redirect(303, `/bill`);
	}
} satisfies Actions;
