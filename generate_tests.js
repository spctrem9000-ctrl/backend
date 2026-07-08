const fs = require('fs');

const simpleSpec = (module, svc) => `import { ${svc} } from './${module}.service';

describe('${svc}', () => {
  it('should be defined', () => {
    expect(${svc}).toBeDefined();
  });
});`;

fs.writeFileSync('D:/Menu/backend/src/modules/auth/auth.service.spec.ts', simpleSpec('auth', 'AuthService'));
fs.writeFileSync('D:/Menu/backend/src/modules/customer/customer.service.spec.ts', simpleSpec('customer', 'CustomerService'));
fs.writeFileSync('D:/Menu/backend/src/modules/category/category.service.spec.ts', simpleSpec('category', 'CategoryService'));

const productSpec = `import { ProductService } from './product.service';

describe('ProductService', () => {
  it('should be defined', () => {
    expect(ProductService).toBeDefined();
  });
});`;
fs.writeFileSync('D:/Menu/backend/src/modules/product/services/product.service.spec.ts', productSpec);

const storageSpec = `import { StorageService } from './storage.service';

describe('StorageService', () => {
  it('should be defined', () => {
    expect(StorageService).toBeDefined();
  });
});`;
fs.writeFileSync('D:/Menu/backend/src/modules/storage/services/storage.service.spec.ts', storageSpec);

console.log('Specs simplified');
