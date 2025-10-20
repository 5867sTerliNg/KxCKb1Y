// 代码生成时间: 2025-10-20 17:58:01
const { spawn } = require('child_process');

/**
 * ProcessManager class to manage child processes
 * @class ProcessManager
 */
class ProcessManager {
    #processList = [];

    constructor() {
        this.#processList = [];
    }

    /**
     * Launch a new process
     * @param {string} cmd - The command to execute
     * @param {string[]} args - Arguments for the command
     * @returns {Promise<void>}
     */
    async launch(cmd, args = []) {
        return new Promise((resolve, reject) => {
            try {
                const process = spawn(cmd, args);

                process.on('error', (error) => {
                    console.error("Failed to start process: \${error.message}", error);
                    reject(error);
                });

                process.on('close', (code) => {
                    console.log(`Process exited with code \${code}`);
                    resolve();
                });

                this.#processList.push(process);
            } catch (error) {
                console.error("Error launching process: \${error.message}", error);
                reject(error);
            }
        });
    }

    /**
     * Terminate all managed processes
     * @returns {Promise<void>}
     */
    async terminateAll() {
        return new Promise((resolve, reject) => {
            try {
                this.#processList.forEach((process) => {
                    process.kill();
                });
                this.#processList = [];
                resolve();
            } catch (error) {
                console.error("Error terminating processes: \${error.message}", error);
                reject(error);
            }
        });
    }

    /**
     * Terminate a specific process by index
     * @param {number} index - The index of the process to terminate
     * @returns {Promise<void>}
     */
    async terminate(index) {
        return new Promise((resolve, reject) => {
            try {
                if (index >= 0 && index < this.#processList.length) {
                    const process = this.#processList[index];
                    process.kill();
                    this.#processList.splice(index, 1);
                    resolve();
                } else {
                    throw new Error('Invalid process index');
                }
            } catch (error) {
                console.error("Error terminating process: \${error.message}", error);
                reject(error);
            }
        });
    }
}

// Example usage:
const manager = new ProcessManager();

async function main() {
    try {
        await manager.launch('node', ['some_script.js']);
        await manager.launch('ls', ['-l']);
        // ...
        await manager.terminateAll();
    } catch (error) {
        console.error("An error occurred: \${error.message}", error);
    }
}

main();
