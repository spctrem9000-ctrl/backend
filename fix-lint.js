const fs = require('fs');

function replaceInFile(file, replacements) {
  let content = fs.readFileSync(file, 'utf8');
  for (const { search, replace } of replacements) {
    content = content.replace(search, replace);
  }
  fs.writeFileSync(file, content);
}

replaceInFile('D:/Menu/backend/src/common/guards/jwt-auth.guard.ts', [
  { search: 'info: any', replace: '_info: any' }
]);

replaceInFile('D:/Menu/backend/src/modules/cart/dto/cart.dto.ts', [
  { search: 'IsNumber, ', replace: '' },
  { search: 'ValidateNested, ', replace: '' },
  { search: 'IsNumber }', replace: '}' }
]);

replaceInFile('D:/Menu/backend/src/modules/engagement/controllers/admin-notification.controller.ts', [
  { search: 'Get, ', replace: '' },
  { search: 'ApiOperation, ', replace: '' }
]);

replaceInFile('D:/Menu/backend/src/modules/order/services/checkout.service.ts', [
  { search: 'PaymentMethod, ', replace: '' },
  { search: ', PaymentMethod', replace: '' }
]);

replaceInFile('D:/Menu/backend/src/modules/product/services/product-history.service.ts', [
  { search: /catch \(error\)/g, replace: 'catch (_error)' }
]);

replaceInFile('D:/Menu/backend/src/modules/product/services/product-insight.service.ts', [
  { search: /catch \(error\)/g, replace: 'catch (_error)' }
]);

replaceInFile('D:/Menu/backend/src/modules/storage/providers/local-storage.provider.ts', [
  { search: /catch \(e\)/g, replace: 'catch (_e)' }
]);

replaceInFile('D:/Menu/backend/src/modules/storage/providers/r2-storage.provider.ts', [
  { search: /catch \(e\)/g, replace: 'catch (_e)' }
]);

console.log('Lint errors fixed.');
