import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
    const id = Number(params.id);

    const bill = await prisma.bill.findUnique({
        where: { id },
        include: { billItems: true }
    });

	// จัดเรียง billItems ตาม id
    if (bill) {
        bill.billItems = bill.billItems.sort((a, b) => a.id - b.id);
    }

    return { bill };
};

export const actions: Actions = {
	createCustomer: async ({ request }) => {
		const formData = await request.formData();
		const name = formData.get('name') as string;
		const billId = Number(formData.get('billId'));
		const billInfo = await prisma.bill.findUnique({
			where: { id: +billId }
		});

		if (!billInfo) {
			return fail(404, {message : 'Not found bill'});
		}
		if (billInfo.customer.includes(name)) {
			return fail(400, { message: 'Customer already exists' });
		}

		await prisma.bill.update({
			where: { 
				id: +billId 
			},
			data: {
				customer: {
					push: name
				}
			}
		})

		return { success: true };
	},
	deleteCustomer: async ({ request }) => {
		const formData = await request.formData();
		const name = formData.get('name');
		const billId = Number(formData.get('billId'));

		if (typeof name !== 'string' || Number.isNaN(billId)) {
			return fail(400, { message: 'Invalid request' });
		}

		const bill = await prisma.bill.findUnique({
			where: { id: billId },
			include: { billItems: { select: { id: true, customer: true } } }
		});

		if (!bill) {
			return fail(404, { message: 'Bill not found' });
		}

		if (!bill.customer.includes(name)) {
			return fail(404, { message: 'Customer not found on bill' });
		}

		const updatedCustomers = bill.customer.filter((customer) => customer !== name);
		const billItemUpdates = bill.billItems
			.filter((billItem) => billItem.customer.includes(name))
			.map((billItem) =>
				prisma.billItem.update({
					where: { id: billItem.id },
					data: {
						customer: {
							set: billItem.customer.filter((customer) => customer !== name)
						}
					}
				})
			);

		await prisma.$transaction([
			prisma.bill.update({
				where: { id: billId },
				data: {
					customer: {
						set: updatedCustomers
					}
				}
			}),
			...billItemUpdates
		]);

		return { success: true };
	},
	createMenu: async ({ request }) => {
		const formData = await request.formData();
		const name = formData.get('name') as string;
		const price = Number(formData.get('price'));
		const amount = Number(formData.get('amount'));
		const billId = Number(formData.get('billId'));
		const billInfo = await prisma.bill.findUnique({
			where: { id: +billId }
		});

		if (!billInfo) {
			return fail(404, {message : 'Not found bill'});
		}

		await prisma.billItem.create({
			data: {
				name,
				price,
				amount,
				customer: [],
				bill: {
					connect: { id: +billId }
				}
			}
		})
		return { success: true };	
	},
	deleteMenu: async ({ request }) => {
		const formData = await request.formData();
		const billItemId = Number(formData.get('billItemId'));
		const billId = Number(formData.get('billId'));

		if (Number.isNaN(billItemId) || Number.isNaN(billId)) {
			return fail(400, { message: 'Invalid request' });
		}

		const billItem = await prisma.billItem.findFirst({
			where: { id: billItemId, billId }
		});

		if (!billItem) {
			return fail(404, { message: 'Bill item not found' });
		}

		await prisma.billItem.delete({
			where: { id: billItemId }
		});

		return { success: true };
	},
	selectCustomer: async ({ request }) => {
		const formData = await request.formData();
		const billItemId = Number(formData.get('billItemId'));
		const selectedCustomers = formData.getAll('selected') as string[];
		
		const billItem = await prisma.billItem.findUnique({
			where: { id: billItemId }
		});

		if (!billItem) {
			return fail(404, { message: 'Bill item not found' });
		}

		await prisma.billItem.update({
			where: { id: billItemId },
			data: {
				customer: selectedCustomers
			}
		});

		return { success: true };
	}
};
