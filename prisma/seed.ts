import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // 1. Create Super Admin
  const adminEmail = 'admin@divado.com';
  const existingAdmin = await prisma.admin.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await prisma.admin.create({
      data: {
        name: 'Super Admin',
        email: adminEmail,
        password: hashedPassword,
      },
    });
    console.log(`✅ Created Super Admin (${adminEmail})`);
  } else {
    console.log(`ℹ️ Super Admin (${adminEmail}) already exists.`);
  }

  // 2. Create Default Category if empty
  const categoriesCount = await prisma.category.count();
  if (categoriesCount === 0) {
    await prisma.category.create({
      data: {
        categoryCode: 'CAT-GENERAL',
        nameAr: 'قسم عام',
        nameEn: 'General Category',
        displayOrder: 1,
        isActive: true,
      },
    });
    console.log(`✅ Created Default Category`);
  } else {
    console.log(`ℹ️ Categories already exist.`);
  }

  // 3. Create Default Home Sections if empty
  const homeSectionsCount = await prisma.homeSection.count();
  if (homeSectionsCount === 0) {
    await prisma.homeSection.createMany({
      data: [
        { type: 'BANNER_SLIDER', titleAr: 'العروض', titleEn: 'Offers', sortOrder: 1 },
        { type: 'CATEGORIES', titleAr: 'الأقسام', titleEn: 'Categories', sortOrder: 2 },
        { type: 'FEATURED_PRODUCTS', titleAr: 'منتجات مميزة', titleEn: 'Featured', sortOrder: 3 },
      ],
    });
    console.log(`✅ Created Default Home Sections`);
  } else {
    console.log(`ℹ️ Home Sections already exist.`);
  }

  console.log('✅ Seeding finished.');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
