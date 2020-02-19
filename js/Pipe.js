const gameWidth = gameDom.clientWidth;

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
/**
 * 单个柱子
 */
class Pipe extends Rectangle {
  /**
   * @param {*} pipeHeight 柱子高度
   * @param {*} pipeTop 柱子纵坐标
   * @param {*} xSpeed 横向速度
   * @param {*} dom dom对象
   */
  constructor(pipeHeight, pipeTop, xSpeed, dom) {
    super(52, pipeHeight, gameWidth, pipeTop, xSpeed, 0, dom);
  }

  /**
   * 如果柱子向左移出去了，就移除
   */
  onMove() {
    if (this.left <= -this.width) {
      this.dom.remove();
    }
  }
}

/**
 * 柱子对
 */
class PipePare {
  /**
   * @param {*} xSpeed 横向速度，像素/秒，须和大地保持统一
   */
  constructor(xSpeed) {
    this.spaceHeight = 150; // 柱子对空隙高度
    this.minHeight = 80; //柱子最小高度
    this.maxHeight = landTop - this.spaceHeight - this.minHeight; //柱子最大高度
    const upHeight = getRandom(this.minHeight, this.maxHeight); //上柱子高度
    const downHeight = landTop - this.spaceHeight - upHeight; //下柱子高度
    const downTop = landTop - downHeight; // 下柱子纵坐标
    const upDom = document.createElement('div');
    upDom.className = 'pipe up';
    const downDom = document.createElement('div');
    downDom.className = 'pipe down';
    this.upPipe = new Pipe(upHeight, 0, xSpeed, upDom); //上柱子对象
    this.downPipe = new Pipe(downHeight, downTop, xSpeed, downDom); // 下柱子对象
    gameDom.appendChild(upDom);
    gameDom.appendChild(downDom);
  }

  /**
   * 判断该柱子对是否还在可视范围内
   */
  get useLess() {
    return this.upPipe.left <= -this.upPipe.width;
  }

  /**
   * 
   * @param {*} duration 时间 像素/秒
   */
  move(duration) {
    this.upPipe.move(duration);
    this.downPipe.move(duration);
  }
}

/**
 * 用于不断产生柱子对
 */
class PipePareProducer {
  /**
   * @param {*} xSpeed 横向速度，像素/秒，须和大地保持统一
   */
  constructor(xSpeed) {
    this.pares = []; // 柱子对数组
    this.timer = null;
    this.tick = 1500; //两个柱子对间隔毫秒数
    this.xSpeed = xSpeed;
  }

  /**
   * 开始产生柱子对
   */
  startProducer() {
    if (this.timer) {
      return;
    }
    this.timer = setInterval(() => {
      this.pares.push(new PipePare(this.xSpeed))
      // 如果柱子对不在可视区就从数组中移除
      for (let i = 0; i < this.pares.length; i++) {
        var pare = this.pares[i];
        if (pare.useLess) {
          this.pares.splice(i, 1);
          i--;
        }
      }
    }, this.tick);
  }

  /**
   * 停止产生柱子对
   */
  stopProducer() {
    clearInterval(this.timer);
    this.timer = null;
  }
}