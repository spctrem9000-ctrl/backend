const fs = require('fs');

function removeLines(file, regex) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(regex, '');
  fs.writeFileSync(file, content);
}

removeLines('D:/Menu/backend/src/modules/product/services/product-history.service.ts', /^\s*const error = err as Error;\r?\n/gm);
removeLines('D:/Menu/backend/src/modules/product/services/product-insight.service.ts', /^\s*const error = err as Error;\r?\n/gm);
removeLines('D:/Menu/backend/src/modules/storage/providers/local-storage.provider.ts', /^\s*const e = err as Error;\r?\n/gm);
removeLines('D:/Menu/backend/src/modules/storage/providers/r2-storage.provider.ts', /^\s*const e = err as Error;\r?\n/gm);

console.log('Final lint errors fixed.');
