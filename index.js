import sharp from 'sharp';
import { promises as fs } from 'fs';
import crypto from 'crypto';
import path from 'path';

/**
 * Formate une taille en bytes en chaîne lisible.
 * @param {number} bytes - Taille en bytes.
 * @param {number} [decimals=2] - Nombre de décimales.
 * @returns {string} - Taille formatée (ex. "1 KB").
 */
const formatFileSize = (bytes, decimal = 2) => {

    if (typeof bytes !== 'number' || bytes < 0) throw new Error('Bytes must be a non-negative number');
    if(bytes===0) return "0 Bytes";

    const k = 1024;
    const dm = decimal < 0 ? 0 : decimal;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  
    const i = Math.floor(Math.log(bytes) / Math.log(k));
  
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Compresse une image en ajustant sa résolution et sa qualité.
 * @param {string | Buffer} input - Chemin du fichier ou Buffer de l'image.
 * @param {Object} [options] - Options de compression.
 * @param {number} [options.maxWidth=1920] - Largeur maximale.
 * @param {number} [options.maxHeight=1080] - Hauteur maximale.
 * @param {number} [options.quality=0.8] - Qualité (0 à 1 pour JPEG).
 * @param {number} [options.maxSizeMB=2] - Taille max en MB.
 * @param {string} [options.outputFormat='jpeg'] - Format de sortie ('jpeg', 'png', 'webp').
 * @returns {Promise<Buffer>} - Buffer de l'image compressée.
 */

const compressImage = async (input, options = {}) => {
    const {maxWidth=1920,maxHeight=1080,quality=0.8,maxSizeMB=2,outputFormat="jpeg"}=options;

    try{

        let image=sharp(input);
        const metadata=await image.metadata();

        if(metadata.width > maxWidth || metadata.height > maxHeight){
            image=image.resize({
                width:maxWidth,
                height:maxHeight,
                fit:"inside",
                withoutEnlargement:true
            });
        }

        image=image[outputFormat]({ quality: Math.round(quality * 100) });

        let buffer = await image.toBuffer();
        let sizeMB = buffer.length / (1024 * 1024);

        
    if (sizeMB > maxSizeMB) {
        image = sharp(input).resize({
          width: maxWidth,
          height: maxHeight,
          fit: 'inside',
          withoutEnlargement: true,
        })[outputFormat]({ quality: Math.round(Math.max(10, quality * 100 - 20)) });


      buffer = await image.toBuffer();
      sizeMB = buffer.length / (1024 * 1024);

      if (sizeMB > maxSizeMB) {
        throw new Error('Impossible de compresser l’image sous la taille maximale spécifiée');
      }
    }

    return buffer;
    }catch(err){
        throw new Error(`Erreur lors de la compression de l'image ${err}`)
    }
}

const compressMultipleImages = async (inputs, options = {}) => {

    const missingFiles= [];
    
    for (const input of inputs) {
        // Si c'est un Buffer, pas besoin de vérifier l'existence
        if (Buffer.isBuffer(input)) {
            continue;
        }
        
        // Si c'est un chemin de fichier, vérifier qu'il existe
        if (typeof input === 'string') {
            try {
                await fs.access(input);
            } catch (error) {
                missingFiles.push(input);
            }
        }
    }
    
    // Lever une exception si des fichiers sont manquants
    if (missingFiles.length > 0) {
        throw new Error(`Fichiers d'images non trouvés: ${missingFiles.join(', ')}`);
    }
    const promises = inputs.map((input) => compressImage(input, options));
    return Promise.all(promises);
}

// Extraction des métadonnées d'un fichier
const extractMetadata = async (filePath) => {
    const stats = await fs.stat(filePath);
    const metadata = {
      size: formatFileSize(stats.size),
      created: stats.birthtime,
      modified: stats.mtime,
      width:0,
      height:0
    };
    const ext = path.extname(filePath).toLowerCase();
    if (ext === '.jpg' || ext === '.png' || ext === '.webp') {
      const image = sharp(filePath);
      const imgMeta = await image.metadata();
      metadata.width = imgMeta.width;
      metadata.height = imgMeta.height;
    }
    return metadata;
  };
  
  // Chiffrement d'un fichier
  const encryptFile = (filePath, password) => {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath).then((inputBuffer) => {
        const key = crypto.scryptSync(password, 'salt', 32);
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
        const encrypted = Buffer.concat([iv, cipher.update(inputBuffer), cipher.final()]);
        resolve(encrypted);
      }).catch(reject);
    });
  };
  const decryptFile = (encryptedBuffer, password) => {
    return new Promise((resolve, reject) => {
      const key = crypto.scryptSync(password, 'salt', 32);
      const iv = encryptedBuffer.slice(0, 16);
      const encrypted = encryptedBuffer.slice(16);
      const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
      const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
      resolve(decrypted);
    });
  };
  export { formatFileSize, compressImage, compressMultipleImages, extractMetadata, encryptFile, decryptFile };
