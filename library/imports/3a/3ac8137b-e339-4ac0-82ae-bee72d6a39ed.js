"use strict";
cc._RF.push(module, '3ac81N74zlKwIKuvuctajnt', 'menu');
// scripts/menu.js

"use strict";

// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
cc.Class({
  "extends": cc.Component,
  properties: {
    music: cc.AudioSource,
    slider: cc.Slider
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    this.node.active = false; //获取这个Slider的Progress,且调用方法传入参数
    //其实就是初始加载声音大小

    this.slider.progress = 0.5;

    this._updateMusicVolume(this.slider.progress);
  },
  _updateMusicVolume: function _updateMusicVolume(progress) {
    this.music.volume = progress;
  },
  //在Slider组件里回调这个函数
  onSliderHEvent: function onSliderHEvent(sender, eventType) {
    console.log(sender.progress);

    this._updateMusicVolume(sender.progress);
  },
  start: function start() {},
  exitGame: function exitGame() {
    cc.game.end();
  },
  backMainView: function backMainView() {
    //cc.game.end();
    cc.director.loadScene("开始界面");
  },
  music: function music() {},
  game: function game() {
    this.node.active = false;
  } // update (dt) {},

});

cc._RF.pop();