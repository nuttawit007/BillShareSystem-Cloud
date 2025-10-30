import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const bills = await prisma.bill.findMany({
		include: {
			billItems: true
		},
		orderBy: {
			billDate: 'desc'
		}
	});

	const billsWithTotals = bills.map((bill) => {
		const total = bill.billItems.reduce((sum, item) => sum + item.price * item.amount, 0);

		return {
			id: bill.id,
			title: bill.title,
			billDate: bill.billDate,
			total
		};
	});

	const totalAmount = billsWithTotals.reduce((sum, current) => sum + current.total, 0);

	return {
		bills: billsWithTotals,
		totalBills: billsWithTotals.length,
		totalAmount
	};
};
