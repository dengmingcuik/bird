class Game {
  constructor() {
    this.sky = new Sky();
    this.land = new Land(-100);
    this.bird = new Bird();
    // 柱子对生成器
    this.pipePareProducer = new PipePareProducer(-100);
    this.timer = null; //游戏定时器
    this.tick = 16; // 移动时间间隔 毫秒
    this.gameOver = false;
  }

  /**
   * 判断两个矩形是否碰撞
   * @param {*} rec1 
   * @param {*} rec2 
   */
  isHit(rec1, rec2) {
    // 横向：两个矩形中心点的横向距离是否小于矩形宽度之和的一半
    // 纵向：两个矩形中心点的纵向距离是否小于矩形高度之和的一半
    const centerX1 = rec1.left + rec1.width / 2;
    const centerY1 = rec1.top + rec1.height / 2;
    const centerX2 = rec2.left + rec2.width / 2;
    const centerY2 = rec2.top + rec2.height / 2;
    const disX = Math.abs(centerX1 - centerX2);
    const disY = Math.abs(centerY1 - centerY2);
    if (disX < (rec1.width + rec2.width) / 2 && disY < (rec1.height + rec2.height) / 2) {
      return true;
    }
    return false;
  }

  /**
   * 开始游戏
   */
  start() {
    if (this.timer) {
      return;
    }
    if (this.gameOver) {
      window.location.reload(); //如果游戏结束按开始就刷新页面
    }
    const duration = this.tick / 1000;
    this.pipePareProducer.startProducer(); //开始生成柱子对
    this.bird.startSwing();
    this.timer = setInterval(() => {
      this.sky.move(duration);
      this.land.move(duration);
      this.bird.move(duration);
      this.pipePareProducer.pares.forEach(pare => {
        pare.move(duration);
      })
      if (this.isGameOver()) {
        this.stop();
        this.gameOver = true;
        document.getElementsByClassName('mask')[0].style.display = 'block';
      }
    }, this.tick)
  }

  /**
   * 判断游戏是否结束
   */
  isGameOver() {
    if (this.bird.top === this.bird.maxY) {
      // 鸟碰到了大地
      return true;
    }
    // 检查鸟和柱子是否碰撞
    for (let i = 0; i < this.pipePareProducer.pares.length; i++) {
      const pare = this.pipePareProducer.pares[i];
      if (this.isHit(this.bird, pare.upPipe) || this.isHit(this.bird, pare.downPipe)) {
        return true;
      }
    }
    return false;
  }

  /**
   * 暂停游戏
   */
  stop() {
    clearInterval(this.timer);
    this.timer = null;
    this.pipePareProducer.stopProducer();
    this.bird.stopSwing();
  }

  /**
   * 绑定事件
   */
  regEvent() {
    window.onkeydown = (e) => {
      if (e.key == 'Enter') {
        if (this.timer) {
          this.stop();
        } else {
          this.start();
        }
      } else if (e.key == ' ') {
        this.bird.jump();
      }
    }
  }
}

const game = new Game();
game.regEvent();