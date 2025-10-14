// 代码生成时间: 2025-10-14 19:39:38
// animation_effects.js

// AnimationEffects 类提供了动画效果的实现
class AnimationEffects {
  // 构造函数
  constructor(element) {
    if (!element) {
      throw new Error('Element is required for AnimationEffects');
    }
    this.element = element;
  }

  // 淡入效果
  fadeIn(duration = 1000) {
    this.setAnimation('fadeIn', duration);
  }

  // 淡出效果
  fadeOut(duration = 1000) {
    this.setAnimation('fadeOut', duration);
  }

  // 缩放效果
  // scale: 缩放比例，例如0.5表示缩小到原来的一半，2表示放大两倍
  scale(scale, duration = 1000) {
    this.setAnimation('scale', duration, { scale });
  }

  // 设置动画效果
  setAnimation(animationName, duration, options = {}) {
    const animationOptions = {
      duration: duration,
      iterations: 1
    };
    for (const [key, value] of Object.entries(options)) {
      animationOptions[key] = value;
    }
    this.element.animate([{}, animationOptions], {
      duration: duration,
      iterations: animationOptions.iterations,
      fill: 'forwards'
    });
  }
}

// 导出 AnimationEffects 类
module.exports = AnimationEffects;