// 代码生成时间: 2025-09-23 06:42:30
 * Features:
 * - Extracts files from ZIP archives.
 * - Supports error handling and reporting.
 * - Follows best practices for code structure and maintainability.
 */

// Import necessary modules
const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');

// Function to extract a ZIP file to a specified directory
function extractZipFile(zipFilePath, outputDirectory) {
  // Check if the ZIP file exists
  if (!fs.existsSync(zipFilePath)) {
    throw new Error(`The file ${zipFilePath} does not exist.`);
  }

  // Create the output directory if it does not exist
  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory, { recursive: true });
  }

  // Create a new AdmZip instance and extract the ZIP file
  const zip = new AdmZip(zipFilePath);
  if (zip.getEntries().length === 0) {
    throw new Error(`The ZIP file ${zipFilePath} is empty.`);
  }
  zip.extractAllTo(outputDirectory, /* overwrite */ true);

  console.log(`Files extracted successfully to ${outputDirectory}`);
}

// Function to handle extraction, including error handling
function handleExtraction(zipFilePath, outputDirectory) {
  try {
    extractZipFile(zipFilePath, outputDirectory);
  } catch (error) {
    console.error(`Failed to extract ZIP file: ${error.message}`);
  }
}

// Example usage
// handleExtraction('path/to/your/file.zip', 'path/to/output/directory');

// Export the functions for use in other modules
module.exports = {
  extractZipFile,
  handleExtraction
};