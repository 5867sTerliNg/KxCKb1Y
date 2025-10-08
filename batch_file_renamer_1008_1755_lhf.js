// 代码生成时间: 2025-10-08 17:55:52
const fs = require('fs');
const path = require('path');

/**
 * Batch file renamer tool using Node.js.
 * @param {string} directoryPath - The path to the directory containing files to rename.
 * @param {string[]} filesToRename - An array of file names to rename.
 * @param {string} newExtension - The new file extension to apply to files.
 */
function batchRenameFiles(directoryPath, filesToRename, newExtension) {
  // Check if the directory exists
  if (!fs.existsSync(directoryPath)) {
    console.error('The specified directory does not exist.');
    return;
  }

  const directoryContents = fs.readdirSync(directoryPath);

  // Filter files to rename based on the provided list
  const filesToProcess = directoryContents.filter(file => filesToRename.includes(file));

  filesToProcess.forEach(file => {
    try {
      const oldPath = path.join(directoryPath, file);
      const stats = fs.statSync(oldPath);
# 扩展功能模块
      
      // Check if the path is a file
# 扩展功能模块
      if (stats.isFile()) {
        const newFileName = path.basename(file, path.extname(file)) + '.' + newExtension;
# 添加错误处理
        const newPath = path.join(directoryPath, newFileName);
        fs.renameSync(oldPath, newPath);
        console.log(`Renamed ${oldPath} to ${newPath}`);
      } else {
        console.warn(`Skipped ${file}, as it is not a file.`);
      }
    } catch (error) {
      console.error(`Error renaming ${file}: ${error.message}`);
    }
  });
}

/**
 * Example usage of the batchRenameFiles function.
 * Renames all '.txt' files in a directory to '.backup' extension.
 */
const exampleDirectoryPath = './exampleDirectory';
# FIXME: 处理边界情况
const exampleFilesToRename = ['file1.txt', 'file2.txt', 'file3.txt'];
const exampleNewExtension = '.backup';

batchRenameFiles(exampleDirectoryPath, exampleFilesToRename, exampleNewExtension);