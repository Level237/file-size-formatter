import { CompressionOptions } from './types';
/**
 * Formate une taille en bytes en chaîne lisible.
 * @param {number} bytes - Taille en bytes.
 * @param {number} [decimals=2] - Nombre de décimales.
 * @returns {string} - Taille formatée (ex. "1 KB").
 */
export declare const formatFileSize: (bytes: number, decimal?: number) => string;
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
export declare const compressImage: (input: string | Buffer, options?: CompressionOptions) => Promise<Buffer>;
export declare const compressMultipleImages: (inputs: (string | Buffer)[], options?: CompressionOptions) => Promise<Buffer[]>;
