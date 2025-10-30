import prisma from '$lib/prisma';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, url }) => {
	const billId = Number(params.id);
	const user = decodeURIComponent(params.user ?? '');

	if (Number.isNaN(billId) || !user) {
		throw error(400, 'Invalid request');
	}

	const addVat = (url.searchParams.get('vat') ?? '').toLowerCase() === 'true';
	const addService = (url.searchParams.get('service') ?? '').toLowerCase() === 'true';

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

	const items = bill.billItems
		.map((item, index) => {
			if (!item.customer.includes(user)) return null;

			const total = item.price * item.amount;
			const share = total / item.customer.length;

			return {
				index: index + 1,
				name: item.name,
				amount: item.amount,
				total,
				share
			};
		})
		.filter((item): item is NonNullable<typeof item> => Boolean(item));

	const subtotal = items.reduce((sum, item) => sum + item.share, 0);

	const serviceChargeAmount = addService ? subtotal * 0.1 : 0;
	const vatAmount = addVat ? (subtotal + serviceChargeAmount) * 0.07 : 0;
	const grandTotal = subtotal + serviceChargeAmount + vatAmount;

	return {
		billId: bill.id,
		billTitle: bill.title,
		user,
		items,
		subtotal,
		serviceApplied: addService,
		serviceChargeAmount,
		vatApplied: addVat,
		vatAmount,
		grandTotal
	};
};
