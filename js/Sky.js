const skyDom = document.getElementsByClassName('sky')[0];
const skyStyle = getComputedStyle(skyDom);
const skyWidth = parseFloat(skyStyle.width);
const skyHeight = parseFloat(skyStyle.height);

/**
 * 天空
 */
class Sky extends Rectangle {
  constructor() {
    super(skyWidth, skyHeight, 0, 0, -50, 0, skyDom);
  }

  /**
   * 判断是否到达临界点，如果到了让left清零
   */
  onMove() {
    if (this.left <= -skyWidth / 2) {
      this.left = 0;
    }
  }
}