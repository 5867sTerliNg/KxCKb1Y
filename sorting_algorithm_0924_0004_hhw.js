// 代码生成时间: 2025-09-24 00:04:43
// Function to perform Bubble Sort
function bubbleSort(arr) {
    // Check if the input is an array
    if (!Array.isArray(arr)) {
        throw new Error('Input must be an array.');
    }

    // Get the length of the array
    const n = arr.length;

    // Perform Bubble Sort
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap the elements if they are in the wrong order
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }

    return arr;
}

// Example usage of the bubbleSort function
const unsortedArray = [64, 34, 25, 12, 22, 11, 90];

try {
    const sortedArray = bubbleSort(unsortedArray);
    console.log('Sorted array:', sortedArray);
} catch (error) {
    console.error('Error:', error.message);
}

// Export the bubbleSort function for use in other modules
module.exports = bubbleSort;