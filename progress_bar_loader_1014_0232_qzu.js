// 代码生成时间: 2025-10-14 02:32:23
const readline = require('readline');

// 创建一个 readline interface 对象
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 进度条及加载动画的函数
function progressBarLoader(totalSteps, interval) {
  // 确保传入的参数是有效的
  if (typeof totalSteps !== 'number' || typeof interval !== 'number') {
    throw new Error('Invalid input: totalSteps and interval must be numbers.');
  }
  if (totalSteps <= 0 || interval <= 0) {
    throw new Error('Invalid input: totalSteps and interval must be positive numbers.');
  }

  let currentStep = 0;
  const barWidth = 20;
  const barChar = '-';
  const emptyChar = ' ';
  const bar = '[' + new Array(barWidth + 1).join(emptyChar) + ']';
  const loadingSymbol = '/';

  const printBar = () => {
    rl.write(`${bar} ${loadingSymbol} ${currentStep}/${totalSteps}`);
  };

  const updateBar = () => {
    const filledLength = Math.floor((barWidth - 1) * currentStep / totalSteps);
    const emptyLength = barWidth - filledLength - 1;
    const filled = new Array(filledLength + 1).join(barChar);
    const empty = new Array(emptyLength + 1).join(emptyChar);
    bar.split('').forEach((char, index) => {
      if (index < filledLength) {
        rl.write(barChar);
      } else if (index === filledLength) {
        rl.write(loadingSymbol);
      } else {
        rl.write(emptyChar);
      }
    });
    rl.write(` ${currentStep}/${totalSteps}`);
  };

  // 递增进度条并更新显示
  const increment = () => {
    currentStep++;
    if (currentStep > totalSteps) {
      rl.write('
'); // 完成时打印新行
      rl.close();
    } else {
      updateBar();
      setTimeout(increment, interval);
    }
  };

  // 初始化进度条
  printBar();
  // 启动进度条动画
  increment();
}

// 使用示例：创建一个包含10步的进度条，每200毫秒更新一次
progressBarLoader(10, 200);

// 清理 readline interface 对象，当程序结束时
process.on('exit', () => {
  rl.close();
});
