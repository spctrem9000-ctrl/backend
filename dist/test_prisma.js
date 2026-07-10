"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const products = await prisma.product.findMany({
        include: {
            extraGroups: {
                include: {
                    extraGroup: true,
                }
            }
        }
    });
    console.log(JSON.stringify(products, null, 2));
}
main()
    .catch(e => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=test_prisma.js.map