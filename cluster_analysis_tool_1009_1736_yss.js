// 代码生成时间: 2025-10-09 17:36:34
 * It is designed to be clear, maintainable, and extensible.
 */

// Import necessary modules
const kmeans = require('k-means-clustering');

/**
 * Perform cluster analysis using k-means algorithm.
 * @param {Array<Array<number>>} data - The dataset to be clustered.
 * @param {number} k - The number of clusters to form.
 * @param {number} [maxIterations] - The maximum number of iterations to run the algorithm for.
 * @returns {Array<Array<number>>} - The clusters formed by the algorithm.
 */
function performClusterAnalysis(data, k, maxIterations = 100) {
    // Input validation
    if (!Array.isArray(data) || !data.every(Array.isArray)) {
        throw new Error('Data must be an array of arrays.');
    }
    if (typeof k !== 'number' || k <= 0) {
        throw new Error('The number of clusters (k) must be a positive integer.');
    }
    if (maxIterations !== undefined && (typeof maxIterations !== 'number' || maxIterations <= 0)) {
        throw new Error('Maximum iterations must be a positive integer.');
    }

    // Perform clustering
    try {
        // Using k-means clustering library
        const clusters = kmeans(data, k, maxIterations);
        return clusters;
    } catch (error) {
        // Handle any errors from the clustering library
        throw new Error(`An error occurred during clustering: ${error.message}`);
    }
}

// Example usage
const data = [
    [1, 2],
    [1, 4],
    [1, 0],
    [10, 2],
    [10, 4],
    [10, 0]
];

const numberOfClusters = 2;
const maxIterations = 100;

performClusterAnalysis(data, numberOfClusters, maxIterations)
    .then(clusters => {
        console.log('Clusters formed:', clusters);
    })
    .catch(error => {
        console.error('Clustering failed:', error.message);
    });

// Export the performClusterAnalysis function for use in other modules
module.exports = {
    performClusterAnalysis
};