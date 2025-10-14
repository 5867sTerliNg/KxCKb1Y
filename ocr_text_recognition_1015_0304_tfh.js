// 代码生成时间: 2025-10-15 03:04:22
const { Tesseract } = require('tesseract.js');

/**
 * OCRService class for Optical Character Recognition.
 * This class uses Tesseract.js to recognize text from images.
 */
class OCRService {
  
  /**
   * Initializes the OCR service.
   * @param {string} language - The language to use for OCR.
   */
  constructor(language = 'eng') {
    this.language = language;
  }

  /**
   * Recognizes text from an image.
   * @param {string} imageFilePath - The path to the image file.
   * @returns {Promise<string>} - The recognized text.
   */
  async recognizeText(imageFilePath) {
    try {
      // Check if the file exists before attempting to read it
      const exists = await this.fileExists(imageFilePath);
      if (!exists) {
        throw new Error('Image file does not exist.');
      }

      // Recognize text from the image
      return Tesseract.recognize(
        imageFilePath,
        this.language,
        { logger: m => console.log(m) }
      );
    } catch (error) {
      console.error('Error during text recognition:', error);
      throw error; // Re-throw the error to be handled by the caller
    }
  }

  /**
   * Checks if a file exists at the given path.
   * @param {string} filePath - The path to the file.
   * @returns {Promise<boolean>} - True if the file exists, false otherwise.
   */
  async fileExists(filePath) {
    const fs = require('fs');
    return new Promise((resolve, reject) => {
      fs.access(filePath, fs.constants.F_OK, (err) => {
        resolve(!err);
      });
    });
  }
}

/**
 * Example usage of the OCRService.
 * @param {string} imageFilePath - The path to the image file to be processed.
 */
async function performOCR(imageFilePath) {
  const ocrService = new OCRService();
  try {
    const recognizedText = await ocrService.recognizeText(imageFilePath);
    console.log('Recognized text:', recognizedText);
  } catch (error) {
    console.error('Failed to perform OCR:', error);
  }
}

// Call the example function with a sample image path
// performOCR('./path/to/image.jpg');