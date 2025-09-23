const formatFileSize = require('../index.js');

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