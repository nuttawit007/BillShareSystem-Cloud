import prisma from '$lib/prisma';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, url }) => {
	const billId = Number(params.id);
	const user = params.user;

	if (Number.isNaN(billId) || !user) {
		throw error(404, 'Invalid request');
	}

	const vatApplied = url.searchParams.get('vat') === 'true';
	const serviceApplied = url.searchParams.get('service') === 'true';

	const bill = await prisma.bill.findUnique({
		where: { id: billId },
		include: { billItems: true }
	});

	if (!bill) {
		throw error(404, 'Bill not found');
	}

	const relevantItems = bill.billItems
		.filter((item) => item.customer.includes(user))
		.sort((a, b) => a.id - b.id);

	const detailedItems = relevantItems.map((item, index) => {
		const total = item.price * item.amount;
		const share = item.customer.length > 0 ? total / item.customer.length : 0;
		return {
			index: index + 1,
			name: item.name,
			amount: item.amount,
			total,
			share
		};
	});

	const subtotal = detailedItems.reduce((sum, item) => sum + item.share, 0);
	const serviceChargeAmount = serviceApplied ? subtotal * 0.1 : 0;
	const vatAmount = vatApplied ? (subtotal + serviceChargeAmount) * 0.07 : 0;
	const grandTotal = subtotal + serviceChargeAmount + vatAmount;

	return {
		billId,
		billTitle: bill.title,
		user,
		items: detailedItems,
		subtotal,
		serviceApplied,
		serviceChargeAmount,
		vatApplied,
		vatAmount,
		grandTotal
	};
};
