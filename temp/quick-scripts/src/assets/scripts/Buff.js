"use strict";
cc._RF.push(module, '5b078iGJZFN2pS2davkQtPP', 'Buff');
// scripts/Buff.js

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
    todoList: null
    /*
        endTurn:int,    //最后一个生效的回合
        person:cc.node  //person
        act:function
    */

  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    this.todoList = new Array();
  },
  start: function start() {} // update (dt) {},

});

cc._RF.pop();