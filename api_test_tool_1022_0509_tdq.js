// 代码生成时间: 2025-10-22 05:09:43
const axios = require('axios');

/**
 * API测试工具
 * 该工具用于对API进行测试，发送请求并打印响应
 *
 * @param {string} url - 要测试的API的URL
 * @param {string} method - HTTP方法（GET, POST, PUT, DELETE等）
 * @param {object} data - 发送的数据（如果是GET请求，则作为查询参数发送）
 * @param {object} headers - 要发送的HTTP头
 */
function testApi(url, method, data = {}, headers = {}) {
  return axios({
    method: method,
    url: url,
    params: method === 'GET' ? data : {},
    data: method !== 'GET' ? data : {},
    headers: headers
  }).then(response => {
    // 打印响应数据
    console.log('Response:', response.data);
    return response;
  }).catch(error => {
    // 错误处理
    console.error('Error:', error.message);
    throw error;
  });
}

// 示例用法
const url = 'https://api.example.com/data';
const method = 'GET'; // 可以更改为POST, PUT, DELETE等
const data = {
  query: 'value'
};
const headers = {
  'Content-Type': 'application/json'
};

testApi(url, method, data, headers);