import { createUser } from "@/auth/users";
import { prisma } from ".";

// const usr = await prisma.user.delete({
//     where: {
//         id: 'b911572b-d821-4f6e-9478-c0dc38f5c417'
//     }
// })

// const user = await createUser({
//     name: 'Maxim',
//     email: 'mpolyak7@gmail.com',
//     password: '123456789'
// })


// for (let i = 0; i < 100; i++) {
//   await prisma.product.create({
//     data: {
//         name: `Product ${i}`,
//         description: `Description ${i}`,
//         image_url: `https://placehold.co/600x400/png?text=Product+${i}`,
//         price: 100 * (i+1),
//     }
//   })
// }

// await prisma.product.deleteMany();