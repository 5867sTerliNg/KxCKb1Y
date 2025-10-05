// 代码生成时间: 2025-10-05 17:48:28
 * @param {string} url 需要检查延迟的网址
 * @returns {Promise<number>} 返回网络延迟，单位为毫秒
 */
async function checkNetworkLatency(url) {
    try {
        const startTime = Date.now(); // 记录开始时间
        await fetch(url); // 发起GET请求
        const endTime = Date.now(); // 记录结束时间
        return endTime - startTime; // 返回网络延迟时间
    } catch (error) {
        console.error('Error checking network latency:', error);
        throw new Error('Failed to check network latency');
    }
}

/**
 * 主函数，用于监控网络延迟
 */
async function monitorNetworkLatency() {
    const urlsToMonitor = [
        'https://www.google.com',
        'https://www.bing.com',
        'https://www.duckduckgo.com'
    ];

    for (const url of urlsToMonitor) {
        try {
            const latency = await checkNetworkLatency(url);
            console.log(`Network latency for ${url} is ${latency} ms`);
        } catch (error) {
            console.error(`Failed to monitor network latency for ${url}: ${error.message}`);
        }
    }
}

// 运行网络延迟监控器
monitorNetworkLatency();