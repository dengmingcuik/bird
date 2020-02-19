const landDom = document.getElementsByClassName('land')[0];
const landStyle = getComputedStyle(landDom);
const landWidth = parseFloat(landStyle.width);
const landHeight = parseFloat(landStyle.height);
const landTop = parseFloat(landStyle.top)

/**
 * 大地
 */
class Land extends Rectangle {
  /**
   * @param {*} xSpeed 横向速度，像素/秒，须和柱子保持统一
   */
  constructor(xSpeed) {
    super(landWidth, landHeight, 0, landTop, xSpeed, 0, landDom);
  }

  /**
   * 判断是否到达临界点，如果到了让left清零
   */
  onMove() {
    if (this.left <= -landWidth / 2) {
      this.left = 0;
    }
  }
}