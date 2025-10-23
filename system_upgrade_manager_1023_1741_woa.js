// 代码生成时间: 2025-10-23 17:41:16
const fs = require('fs');
const path = require('path');

/**
 * System Upgrade Manager
 * This module handles the system upgrades by comparing version numbers
 * and applying updates when necessary.
 */
class SystemUpgradeManager {

  /**
   * Constructor for SystemUpgradeManager
   * @param {string} currentVersion - The current version of the system
   * @param {string} upgradePath - Path to the directory containing upgrade files
   */
  constructor(currentVersion, upgradePath) {
    this.currentVersion = currentVersion;
    this.upgradePath = upgradePath;
  }

  /**
   * Check for available upgrades and apply them
   * @returns {Promise} A promise that resolves when all upgrades are applied
   */
  async checkAndApplyUpgrades() {
    try {
      const upgradeFiles = await this.listUpgradeFiles();
      for (const file of upgradeFiles) {
        await this.applyUpgrade(file);
      }
    } catch (error) {
      console.error('Failed to apply upgrades:', error);
      throw error;
    }
  }

  /**
   * List all upgrade files in the specified directory
   * @returns {Promise<Array<string>>} A promise that resolves with an array of upgrade file names
   */
  listUpgradeFiles() {
    return new Promise((resolve, reject) => {
      fs.readdir(this.upgradePath, (err, files) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(files.filter(file => this.isUpgradeFile(file)));
      });
    });
  }

  /**
   * Check if a file is an upgrade file
   * @param {string} fileName - The name of the file to check
   * @returns {boolean} True if the file is an upgrade file, false otherwise
   */
  isUpgradeFile(fileName) {
    return fileName.startsWith(this.currentVersion) && fileName.endsWith('.js');
  }

  /**
   * Apply an upgrade by running the corresponding JavaScript file
   * @param {string} upgradeFile - The name of the upgrade file to apply
   * @returns {Promise} A promise that resolves when the upgrade is applied
   */
  applyUpgrade(upgradeFile) {
    return new Promise((resolve, reject) => {
      const upgradePath = path.join(this.upgradePath, upgradeFile);
      fs.access(upgradePath, fs.constants.F_OK | fs.constants.R_OK, (err) => {
        if (err) {
          reject(err);
          return;
        }
        const upgradeModule = require(upgradePath);
        if (upgradeModule.upgrade) {
          upgradeModule.upgrade(this.currentVersion)
            .then(resolve)
            .catch(reject);
        } else {
          reject(new Error(`No upgrade function found in ${upgradeFile}`));
        }
      });
    });
  }
}

// Example usage
const manager = new SystemUpgradeManager('1.0.0', './upgrades');
manager.checkAndApplyUpgrades()
  .then(() => console.log('All upgrades applied successfully'))
  .catch(error => console.error('Error applying upgrades:', error));