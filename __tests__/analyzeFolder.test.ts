import { promises as fs } from 'fs';
import path from 'path';
import { analyzeFolder } from '../index.js';

describe('analyzeFolder', () => {
  const testFolderPath = path.join(__dirname, 'tests');

  beforeAll(async () => {
    // Créer un dossier de test avec des fichiers
    await fs.mkdir(testFolderPath, { recursive: true });
    await fs.writeFile(path.join(testFolderPath, 'file1.txt'), 'Contenu 1');
    await fs.writeFile(path.join(testFolderPath, 'file2.txt'), 'Contenu 2');
  });

  afterAll(async () => {
    // Supprimer le dossier de test
    //await fs.rm(testFolderPath, { recursive: true });
  });

  test('analyse un dossier et calcule la taille totale', async () => {
    const stats : any = await analyzeFolder(testFolderPath);
    expect(stats.totalSize).toBeGreaterThan(0);
    expect(stats.fileCount).toBe(2);
    expect(stats.files).toHaveLength(2);
    expect(stats.files[0].size).toBeGreaterThan(0);
  });

  test('gère les dossiers vides', async () => {
    const emptyFolder : any = path.join(__dirname, 'empty-folder');
    await fs.mkdir(emptyFolder, { recursive: true });
    const stats : any = await analyzeFolder(emptyFolder);
    expect(stats.totalSize).toBe(0);
    expect(stats.fileCount).toBe(0);
    expect(stats.files).toHaveLength(0);
    await fs.rm(emptyFolder, { recursive: true });
  });
});