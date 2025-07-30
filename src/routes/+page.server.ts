import prisma from '$lib/prisma';

export async function load() {
	const users = await prisma.user.findMany({
		include: {
			posts: true
		}
	});
	console.log('this is server');
	// await prisma.bill
	// await prisma.user.create({
	//     data:{
	//         'email' : 'win@gmail.com',
	//         'name' : 'win',
	//         'posts' : {
	//             'create' : {
	//                 'title' : 'test',
	//                 'content' : 'prisma test'
	//             }
	//         }
	//     }
	// })
	return {
		users
	};
}
