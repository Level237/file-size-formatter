const { formatFileSize,compressImage, compressMultipleImages } = require('../index.js');
const path = require('path');
const fs = require('fs');
test('formate correctement 1024 bytes en 1 KB', () => {
    expect(formatFileSize(1024)).toBe('1 KB');
  });

  test('gère 0 bytes', () => {
    expect(formatFileSize(0)).toBe('0 Bytes');
  });
  
  test('formate avec 1 décimale', () => {
    expect(formatFileSize(123456789, 1)).toBe('117.7 MB');
  });
  
  test('lève une erreur pour un nombre négatif', () => {
    expect(() => formatFileSize(-1)).toThrow('Bytes must be a non-negative number');
  });

  describe('compressImage and compressMultipleImages', () => {
    const testFilePath1 = path.join(__dirname, 'assets/518403136_122180384150290270_1228563726905246380_n.jpg');
    const testFilePath2 = path.join(__dirname, 'assets/518403136_122180384150290270_1228563726905246380_n.jpg');
  
    beforeAll(() => {
      // Créez un dossier assets et placez-y de vraies images pour des tests précis
      fs.mkdirSync(path.join(__dirname, 'assets'), { recursive: true });
      // Simuler des fichiers image (remplacez par de vraies images JPEG)
    });
  
    afterAll(() => {
     
      //fs.rmdirSync(path.join(__dirname, 'assets'), { recursive: true });
    });
  
    test('compresse une image avec les options par défaut', async () => {
      const buffer = await compressImage(testFilePath1);
      expect(buffer).toBeInstanceOf(Buffer);
    });
  
    test('compresse plusieurs images', async () => {
      const buffers = await compressMultipleImages([testFilePath1, testFilePath2], { maxWidth: 800, quality: 0.7 });
      expect(buffers).toHaveLength(2);
      expect(buffers[0]).toBeInstanceOf(Buffer);
      expect(buffers[1]).toBeInstanceOf(Buffer);
    });
  
    test('lève une erreur pour un fichier inexistant', async () => {
      await expect(compressImage('inexistant.jpg')).rejects.toThrow("Erreur lors de la compression de l'image");
    });
  });