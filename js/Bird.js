const birdDom = document.getElementsByClassName('bird')[0];
const birdStyle = getComputedStyle(birdDom);
const birdWidth = parseFloat(birdStyle.width);
const birdHeight = parseFloat(birdStyle.height);
const birdTop = parseFloat(birdStyle.top);
const birdLeft = parseFloat(birdStyle.left);
const gameDom = document.getElementsByClassName('game')[0];
const gameHeight = gameDom.clientHeight;

/**
 * 小鸟
 */
class Bird extends Rectangle {
  constructor() {
    super(birdWidth, birdHeight, birdLeft, birdTop, 0, 0, birdDom);
    this.g = 1500; // 向下的加速度，单位：像素 / 秒
    this.maxY = gameHeight - landHeight - this.height; // 最大y坐标
    this.swingStatus = 1; // 翅膀状态
    this.timer = null; // 扇动翅膀定时器
    this.render();
  }

  /**
   * 重写render，加上小鸟翅膀的样式
   */
  render() {
    super.render();
    this.dom.className = `bird swing${this.swingStatus}`;
  }

  /**
   * 开始扇动翅膀
   */
  startSwing() {
    if (this.timer) {
      return;
    }
    this.timer = setInterval(() => {
      this.swingStatus++;
      if (this.swingStatus === 4) {
        this.swingStatus = 1;
      }
    }, 200)
  }

  /**
   * 停止扇动翅膀
   */
  stopSwing() {
    clearInterval(this.timer);
    this.timer = null;
  }

  /**
   * 重写move函数，加速度运动
   * @param {*} duration 时间，单位秒
   */
  move(duration) {
    super.move(duration); // 调用父类方法
    this.ySpeed += this.g * duration;
  }

  /**
   * 控制坐标范围
   */
  onMove() {
    if (this.top <= 0) {
      this.top = 0;
    } else if (this.top >= this.maxY) {
      this.top = this.maxY;
    }
  }

  /**
   * 向上跳，直接给一个向上的速度
   */
  jump() {
    this.ySpeed = -450;
  }
}