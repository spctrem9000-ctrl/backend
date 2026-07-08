const fs = require('fs');
const path = require('path');

const schemaPath = 'D:/Menu/backend/prisma/schema.prisma';
let schema = fs.readFileSync(schemaPath, 'utf8');

// 1. Add Loyalty relations to Customer
schema = schema.replace(
  /orders             Order\[\]/,
  \`orders             Order[]
  loyaltyHistory     LoyaltyTransaction[]
  notifications      Notification[]
  targetedCoupons    CouponCustomer[]
  couponUsages       CouponUsageHistory[]\`
);

// 2. Add Coupon relations to Category
schema = schema.replace(
  /products       Product\[\]/,
  \`products       Product[]
  targetedCoupons CouponCategory[]\`
);

// 3. Add Coupon relations to Product
schema = schema.replace(
  /orderItems         OrderItem\[\]/,
  \`orderItems         OrderItem[]
  targetedCoupons    CouponProduct[]
  homeSections       HomeSectionProduct[]\`
);

// 4. Replace existing Coupon model and add Marketing/Engagement models
const existingCouponRegex = /\/\/ ==========================================\n\/\/ SALES & ORDER DOMAIN\n\/\/ ==========================================\n\nmodel Coupon \{[\s\S]*?updatedAt         DateTime @updatedAt\n\}/;

const newDomainModels = \`// ==========================================
// SALES & ORDER DOMAIN
// ==========================================

// ==========================================
// MARKETING & ENGAGEMENT DOMAIN
// ==========================================

// ------------------------------------------
// COUPONS
// ------------------------------------------

enum CouponType {
  PERCENTAGE
  FIXED_AMOUNT
}

enum CouponTargetType {
  EVERYONE
  SPECIFIC_PRODUCTS
  SPECIFIC_CATEGORIES
  SPECIFIC_CUSTOMERS
}

model Coupon {
  id                Int              @id @default(autoincrement())
  guid              String           @unique @default(uuid()) @db.Uuid
  code              String           @unique
  couponType        CouponType       @default(PERCENTAGE)
  
  // Values
  discountPercent   Decimal?         @db.Decimal(5, 2)
  fixedDiscount     Decimal?         @db.Decimal(10, 2)
  maxDiscountAmount Decimal?         @db.Decimal(10, 2)
  minOrderAmount    Decimal?         @db.Decimal(10, 2)
  
  // Rules
  validFrom         DateTime?
  validTo           DateTime?
  usageLimit        Int?             // Global usage limit
  usageCount        Int              @default(0)
  usagePerCustomer  Int?             // Limit per customer
  isActive          Boolean          @default(true)
  
  // Targeting
  targetType        CouponTargetType @default(EVERYONE)
  targetProducts    CouponProduct[]
  targetCategories  CouponCategory[]
  targetCustomers   CouponCustomer[]
  
  // History
  carts             Cart[]
  orders            Order[]
  usageHistory      CouponUsageHistory[]

  createdAt         DateTime         @default(now())
  updatedAt         DateTime         @updatedAt
}

model CouponProduct {
  couponId  Int
  productId Int
  coupon    Coupon  @relation(fields: [couponId], references: [id], onDelete: Cascade)
  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)
  @@id([couponId, productId])
}

model CouponCategory {
  couponId   Int
  categoryId Int
  coupon     Coupon   @relation(fields: [couponId], references: [id], onDelete: Cascade)
  category   Category @relation(fields: [categoryId], references: [id], onDelete: Cascade)
  @@id([couponId, categoryId])
}

model CouponCustomer {
  couponId   Int
  customerId Int
  coupon     Coupon   @relation(fields: [couponId], references: [id], onDelete: Cascade)
  customer   Customer @relation(fields: [customerId], references: [id], onDelete: Cascade)
  @@id([couponId, customerId])
}

model CouponUsageHistory {
  id         Int      @id @default(autoincrement())
  couponId   Int
  customerId Int
  orderId    Int?
  
  coupon     Coupon   @relation(fields: [couponId], references: [id], onDelete: Cascade)
  customer   Customer @relation(fields: [customerId], references: [id], onDelete: Cascade)
  
  usedAt     DateTime @default(now())
}

// ------------------------------------------
// LOYALTY SYSTEM
// ------------------------------------------

enum LoyaltyTransactionType {
  EARN
  REDEEM
  ADJUSTMENT
  EXPIRE
}

model LoyaltyTransaction {
  id         Int                    @id @default(autoincrement())
  guid       String                 @unique @default(uuid()) @db.Uuid
  customerId Int
  customer   Customer               @relation(fields: [customerId], references: [id], onDelete: Cascade)
  
  points     Int
  type       LoyaltyTransactionType
  orderId    Int?                   // Reference to Order if applicable
  
  reason     String?
  adminId    String?                @db.Uuid // Admin UUID if manual adjustment
  
  createdAt  DateTime               @default(now())
}

// ------------------------------------------
// IN-APP NOTIFICATIONS
// ------------------------------------------

enum NotificationType {
  GENERAL
  OFFER
  ORDER_UPDATE
  LOYALTY
  COUPON
}

model Notification {
  id         Int              @id @default(autoincrement())
  guid       String           @unique @default(uuid()) @db.Uuid
  customerId Int
  customer   Customer         @relation(fields: [customerId], references: [id], onDelete: Cascade)
  
  type       NotificationType @default(GENERAL)
  titleAr    String
  titleEn    String
  messageAr  String           @db.Text
  messageEn  String           @db.Text
  
  isRead     Boolean          @default(false)
  readAt     DateTime?
  
  createdAt  DateTime         @default(now())
}

// ------------------------------------------
// BANNERS
// ------------------------------------------

enum BannerTargetType {
  LINK
  PRODUCT
  CATEGORY
}

model Banner {
  id          Int              @id @default(autoincrement())
  guid        String           @unique @default(uuid()) @db.Uuid
  titleAr     String?
  titleEn     String?
  subtitleAr  String?
  subtitleEn  String?
  imageUrl    String
  buttonText  String?
  
  targetType  BannerTargetType @default(LINK)
  targetId    String?          // URL, ProductId, or CategoryId
  
  sortOrder   Int              @default(0)
  startDate   DateTime?
  endDate     DateTime?
  isActive    Boolean          @default(true)
  
  createdAt   DateTime         @default(now())
  updatedAt   DateTime         @updatedAt
}

// ------------------------------------------
// DYNAMIC HOME BUILDER
// ------------------------------------------

enum HomeSectionType {
  BANNER_SLIDER
  CATEGORIES
  OFFERS
  BEST_SELLERS
  FEATURED_PRODUCTS
  NEW_PRODUCTS
  RECOMMENDED
  COUPONS
  CUSTOM_PRODUCTS
}

model HomeSection {
  id             Int                  @id @default(autoincrement())
  guid           String               @unique @default(uuid()) @db.Uuid
  type           HomeSectionType
  titleAr        String?
  titleEn        String?
  
  sortOrder      Int                  @default(0)
  maxItems       Int                  @default(10)
  isActive       Boolean              @default(true)
  
  customProducts HomeSectionProduct[]
  
  createdAt      DateTime             @default(now())
  updatedAt      DateTime             @updatedAt
}

model HomeSectionProduct {
  homeSectionId Int
  productId     Int
  homeSection   HomeSection @relation(fields: [homeSectionId], references: [id], onDelete: Cascade)
  product       Product     @relation(fields: [productId], references: [id], onDelete: Cascade)
  
  sortOrder     Int         @default(0)
  @@id([homeSectionId, productId])
}\`;

schema = schema.replace(existingCouponRegex, newDomainModels);

fs.writeFileSync(schemaPath, schema);
console.log('Schema updated successfully.');
