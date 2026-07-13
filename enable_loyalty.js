const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const config = await prisma.setting.upsert({
    where: { key: 'LOYALTY_CONFIG' },
    update: {
      value: {
        enabled: true,
        pointsPerCurrency: 1,
        minRedeem: 100,
        maxRedeem: 1000,
        pointValue: 0.01
      }
    },
    create: {
      key: 'LOYALTY_CONFIG',
      value: {
        enabled: true,
        pointsPerCurrency: 1,
        minRedeem: 100,
        maxRedeem: 1000,
        pointValue: 0.01
      }
    }
  });
  console.log('Loyalty Config updated:', config);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
