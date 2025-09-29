# @lunel/file-size-formatter

A JavaScript utility for manipulating files: formatting sizes,compressing images.

## Installation

```bash
npm install @lunel/file-size-formatter
```

## Dépendances

- `sharp` for image compression ([voir documentation](https://sharp.pixelplumbing.com/install)).

## Fonctions

### formatFileSize(bytes, decimals = 2)

Formats a size in bytes into a readable string.

```Typescript
const { formatFileSize } = require('@lunel/file-size-formatter');
console.log(formatFileSize(123456789, 1)); // "117.7 MB"
```



### compressImage(input, options)

Compresses an image by adjusting its resolution and quality.

- `input` : File path or Buffer (required).
- `options` :
  - `maxWidth` : Maximum width (default: 1920).
  - `maxHeight` : Max height (default: 1080).
  - `quality` : Quality (0 to 1, default: 0.8).
  - `maxSizeMB` : Maximum size in MB (default: 2).
  - `outputFormat` : Format ('jpeg', 'png', 'webp', défaut : 'jpeg').

```javascript
import { formatFileSize, compressImage, CompressionOptions } from '@lunel/file-size-formatter';
import fs from 'fs';

async function main() {
  const options: CompressionOptions = { maxWidth: 800, quality: 0.7 };
  const buffer = await compressImage('./image.jpg', options);
  fs.writeFileSync('./output.jpg', buffer);
  console.log(`Taille : ${formatFileSize(buffer.length)}`);
}

main();
```

### compressMultipleImages(inputs, options)

Compresses multiple images.

```javascript
const { compressMultipleImages, formatFileSize } = require('@lunel/file-size-formatter');
const fs = require('fs');

async function compressMultiple() {
  const buffers = await compressMultipleImages(['./image1.jpg', './image2.jpg'], { maxWidth: 800 });
  buffers.forEach((buffer, i) => {
    fs.writeFileSync(`./compressed-image${i + 1}.jpg`, buffer);
    console.log(`Taille image ${i + 1} : ${formatFileSize(buffer.length)}`);
  });
}
compressMultiple();
```

## Tests

Run `npm test` with Jest to validate.

## Contribute

Open an issue or pull request on [GitHub](https://github.com/Level237/file-size-formatter).

## Licence

MIT