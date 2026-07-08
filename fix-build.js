const fs = require('fs');

// Fix 1: admin-product.controller.ts
const adminProdCtrl = 'D:/Menu/backend/src/modules/product/controllers/admin-product.controller.ts';
let apc = fs.readFileSync(adminProdCtrl, 'utf8');
apc = apc.replace(/import { Controller, Post, Body, Param, Get, Query, ParseIntPipe, UseGuards }/, 'import { Controller, Post, Body, Param, Get, Query, ParseIntPipe, UseGuards, Patch }');
fs.writeFileSync(adminProdCtrl, apc);

// Fix 2: admin-gallery.controller.ts
const galleryCtrl = 'D:/Menu/backend/src/modules/product/controllers/admin-gallery.controller.ts';
let gc = fs.readFileSync(galleryCtrl, 'utf8');
gc = gc.replace(/this\.storageService\.uploadFile\(file, 'products'\)/g, "this.storageService.uploadSingle(file, 'products')");
gc = gc.replace(/\.deleteFile\('products', filename\)/g, ".delete('products', filename)");
fs.writeFileSync(galleryCtrl, gc);

// Fix 3: storage.factory.ts
const storageFactory = 'D:/Menu/backend/src/modules/storage/storage.factory.ts';
let sf = fs.readFileSync(storageFactory, 'utf8');
sf = sf.replace(/import { LocalStorageProvider } from '.\/providers\/local-storage.provider';\r?\nimport { LocalStorageProvider } from '.\/providers\/local-storage.provider';/, "import { LocalStorageProvider } from './providers/local-storage.provider';");
fs.writeFileSync(storageFactory, sf);

// Fix 4: product.repository.ts
const prodRepo = 'D:/Menu/backend/src/modules/product/product.repository.ts';
let pr = fs.readFileSync(prodRepo, 'utf8');
pr = pr.replace(/details: details/g, 'details: details as any');
fs.writeFileSync(prodRepo, pr);

// Fix 5: category.service.ts
const catSvc = 'D:/Menu/backend/src/modules/category/category.service.ts';
let cs = fs.readFileSync(catSvc, 'utf8');
cs = cs.replace(/const count = category\?\._count\?\.products/g, 'const count = (category as any)?._count?.products');
fs.writeFileSync(catSvc, cs);

// Fix 6: auth.service.ts missing ForgotPasswordDto
const authSvc = 'D:/Menu/backend/src/modules/auth/auth.service.ts';
let asvc = fs.readFileSync(authSvc, 'utf8');
asvc = asvc.replace(/async forgotPassword\(dto: ForgotPasswordDto\) \{/g, 'async forgotPassword(dto: any) {');
fs.writeFileSync(authSvc, asvc);

console.log('Fixes applied.');
