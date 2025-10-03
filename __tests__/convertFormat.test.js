import { promises as fs } from 'fs';
import path from 'path';
import { convertFormat } from '../index.js';

describe('convertFormat', () => {
  const testFilePath = path.join(__dirname, 'assets/518403136_122180384150290270_1228563726905246380_n.jpg');

  test('converti PNG en JPEG', async () => {
    const buffer = await convertFormat(testFilePath, 'png');
    expect(buffer).toBeInstanceOf(Buffer);
    expect(buffer.length).toBeGreaterThan(0);
    // Optionnel : Écrire le fichier pour vérification manuelle
    await fs.writeFile(path.join(__dirname, 'converted.png'), buffer);
  });

  test('lève une erreur pour un type de fichier non supporté', async () => {
    await expect(convertFormat('./test.txt', 'jpeg')).rejects.toThrow('Type de fichier non supporté pour conversion');
  });
});