import { promises as fs } from 'fs';
import axios from 'axios';
import { compressImage, downloadAndCompress } from '../index'; // Ajuste le chemin selon ton package
import { formatFileSize } from '../index';
import path from 'path';

jest.mock('axios');

describe('downloadAndCompress', () => {
  const mockUrl = 'https://preview.redd.it/love-this-then-download-it-for-free-on-pixabay-link-in-the-v0-3p7tnv33cj6b1.jpg?width=1080&crop=smart&auto=webp&s=5f8807af6de8dfa4cdccaa216276a79a4a3a2b88';
  
  let mockImageArrayBuffer: ArrayBuffer;

  beforeAll(async () => {
    // Charger une vraie image de test et la convertir en ArrayBuffer
    const testImagePath = path.join(__dirname, 'assets', '518403136_122180384150290270_1228563726905246380_n.jpg');
    const imageBuffer = await fs.readFile(testImagePath);
    // Convertir le Buffer Node.js en ArrayBuffer pour simuler la réponse d'axios
    mockImageArrayBuffer = imageBuffer.buffer.slice(imageBuffer.byteOffset, imageBuffer.byteOffset + imageBuffer.byteLength);
  });

  beforeEach(() => {
    // Mocker axios.get pour retourner un ArrayBuffer (comme le fait vraiment axios avec responseType: 'arraybuffer')
    (axios.get as jest.Mock).mockResolvedValue({ data: mockImageArrayBuffer });
  });

  test('télécharge et compresse une image depuis une URL', async () => {
    const compressedBuffer = await downloadAndCompress(mockUrl, { maxWidth: 500 });
    expect(compressedBuffer).toBeInstanceOf(Buffer);
    expect(compressedBuffer.length).toBeGreaterThan(0); // Vérifie que l'image compressée n'est pas vide
    console.log(`Taille compressée : ${formatFileSize(compressedBuffer.length)}`); // Pour débogage
  });

  test('lève une erreur si le téléchargement échoue', async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error('Téléchargement échoué'));
    await expect(compressImage('inexistant.jpg')).rejects.toThrow("Erreur lors de la compression de l'image");
  });
});