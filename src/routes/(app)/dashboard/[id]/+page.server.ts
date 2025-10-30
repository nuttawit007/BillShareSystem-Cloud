import prisma from '$lib/prisma';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const billId = Number(params.id);

	if (Number.isNaN(billId)) {
		throw error(400, 'Invalid bill id');
	}

	const bill = await prisma.bill.findUnique({
		where: { id: billId },
		include: {
			billItems: {
				orderBy: { id: 'asc' }
			}
		}
	});

	if (!bill) {
		throw error(404, 'Bill not found');
	}

	return {
		bill: {
			id: bill.id,
			title: bill.title,
			billDate: bill.billDate,
			billItems: bill.billItems.map(({ name, price, amount, customer }) => ({
				name,
				price,
				amount,
				customer
			}))
		}
	};
};
