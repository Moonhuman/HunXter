"use strict";
cc._RF.push(module, '9060egENLhOEaz4Ec2U2i28', 'Tips');
// scripts/Tips.js

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
    clock: 90
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    this.node.width = 350;
    this.node.height = 100;
  },
  start: function start() {},
  update: function update(dt) {
    this.clock--;
    this.node.opacity -= 2;
    if (this.clock == 0) this.node.destroy();
  }
});

cc._RF.pop();