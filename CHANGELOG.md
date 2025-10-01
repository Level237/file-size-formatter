# 📦 Changelog

## [1.0.5] - 2025-09-29  
### 🚀 New Release – File Management Features Added  

#### ✨ New Features  
- **`extractMetadata(filePath: string)`**  
  Extracts file metadata (e.g., image dimensions, MIME type, size, etc.).  
  ```ts
  import { extractMetadata } from "@lunel/file-size-formatter";

  const metadata = await extractMetadata("assets/1.png");
  console.log(metadata);
  ```

- **`encryptFile(filePath: string, password: string)`**  
  Encrypts a file using a password/key and generates an `.enc` file.  
  ```ts
  import { encryptFile } from "@lunel/file-size-formatter";
  import { promises as fs } from "fs";

  const encrypted = await encryptFile("assets/level.png", "secretKey");
  await fs.writeFile("assets/encrypt/level.enc", encrypted);
  ```

- **`decryptFile(encryptedBuffer: Buffer, password: string)`**  
  Decrypts a previously encrypted file and restores it to its original format.  
  ```ts
  import { decryptFile } from "@lunel/file-size-formatter";
  import { promises as fs } from "fs";

  const encrypted = await fs.readFile("assets/encrypt/level.enc");
  const decrypted = await decryptFile(encrypted, "secretKey");
  await fs.writeFile("assets/decrypt/level.png", decrypted);
  ```

---

#### 🛠️ Improvements  
- Improved compatibility with `fs.promises`.  
- Enhanced error handling for encryption/decryption workflows.  

---

#### 📌 Notes  
- These functions are available starting from version **1.0.5**.  
- Update your package with:  
  ```sh
  npm install @lunel/file-size-formatter@latest
  ```
