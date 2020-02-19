/**
 * 父类，可移动的矩形
*/
class Rectangle {
  /**
   * @param {*} width 宽度
   * @param {*} height 高度
   * @param {*} left 横坐标
   * @param {*} top 纵坐标
   * @param {*} xSpeed 横向速度：单位是像素/秒  正数向右，负数向左
   * @param {*} ySpeed 纵向速度：单位是像素/秒  正数向下，负数向上
   * @param {*} dom dom对象
   */
  constructor(width, height, left, top, xSpeed, ySpeed, dom) {
    this.width = width;
    this.height = height;
    this.left = left;
    this.top = top;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed,
    this.dom = dom;
    this.render();
  }

  /**
   * 渲染函数
   */
  render() {
    this.dom.style.width = this.width + 'px';
    this.dom.style.height = this.height + 'px';
    this.dom.style.left = this.left + 'px';
    this.dom.style.top = this.top + 'px';
  }
  
  /**
   * 根据矩形的速度，和指定的时间移动矩形
   * @param {*} duration 时间，单位秒
   */
  move(duration) {
    const disX = this.xSpeed * duration; //横向移动距离
    const disY = this.ySpeed * duration; //纵向移动距离
    this.left += disX;
    this.top += disY;
    // 是否存在onMove方法，如果存在，就在渲染之前调用
    if (this.onMove) {
      this.onMove();
    }
    this.render();
  }
}