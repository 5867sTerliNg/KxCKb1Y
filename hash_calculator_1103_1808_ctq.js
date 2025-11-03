// 代码生成时间: 2025-11-03 18:08:21
const crypto = require('crypto');

/**
 * 哈希值计算工具
 * @module HashCalculator
 */

class HashCalculator {
  /**
   * 创建一个新的哈希值计算工具实例
   * @param {string} algorithm - 哈希算法名称，例如 'sha256'
   */
  constructor(algorithm) {
    this.algorithm = algorithm;
  }

  /**
   * 计算给定数据的哈希值
   * @param {string} data - 需要计算哈希值的数据
   * @returns {Promise<string>} - 计算得到的哈希值
   */
  calculateHash(data) {
    return new Promise((resolve, reject) => {
      try {
        const hash = crypto.createHash(this.algorithm);
        hash.update(data);
        const result = hash.digest('hex');
        resolve(result);
      } catch (error) {
        reject(new Error(`Failed to calculate hash: ${error.message}`));
      }
    });
  }
}

/**
 * 使用示例
 */
(async () => {
  try {
    // 使用 'sha256' 算法创建哈希值计算工具实例
    const hashCalculator = new HashCalculator('sha256');
    
    // 计算字符串 'Hello, world!' 的哈希值
    const data = 'Hello, world!';
    const hashValue = await hashCalculator.calculateHash(data);
    console.log(`The hash value of '${data}' is: ${hashValue}`);
  } catch (error) {
    console.error('Error:', error.message);
  }
})();