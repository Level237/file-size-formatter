# Changelog

## [1.0.6] - 2025-10-03
### ✨ Added
- **`analyzeFolder(path)`**  
  Analyze a folder and return statistics:  
  - Total folder size  
  - List of files with their individual sizes  
  Example:
  ```ts
  import { analyzeFolder, formatFileSize } from '@lunel/file-size-formatter';

  const stats = await analyzeFolder("utils");
  console.log(`Total size: ${formatFileSize(stats.totalSize)}`);
  stats.files.forEach(file => console.log(`${file.name} : ${formatFileSize(file.size)}`));
  ```

- **`downloadAndCompress(url, options)`**  
  Download an image from a URL and compress it according to the defined options (e.g., resizing).  
  Example:
  ```ts
  import { downloadAndCompress } from '@lunel/file-size-formatter';
  import fs from 'fs/promises';

  const buffer = await downloadAndCompress('https://example.com/image.jpg', { maxWidth: 500 });
  await fs.writeFile('./compressed.jpg', buffer);
  ```

- **`convertFormat(filePath, format)`**  
  Convert an image from one format to another (e.g., PNG → WebP).  
  Example:
  ```ts
  import { convertFormat } from '@lunel/file-size-formatter';
  import fs from 'fs/promises';

  const buffer = await convertFormat('assets/1.png', 'webp');
  await fs.writeFile('convert.webp', buffer);
  ```

### 🛠 Improvements
- General performance improvements for image processing.  
- More robust error handling during conversions and downloads.  

---
