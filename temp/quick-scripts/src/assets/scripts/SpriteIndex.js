"use strict";
cc._RF.push(module, '4e961owjCFBq6BbS/xBKJN1', 'SpriteIndex');
// scripts/SpriteIndex.js

"use strict";

cc.Class({
  "extends": cc.Component,
  //编辑器属性，只在编辑状态有效
  editor: CC_EDITOR && {
    requireComponent: cc.Sprite //要求节点必须有cc.Sprite组件

  },
  properties: {
    spriteFrames: [cc.SpriteFrame],
    //定义一个SpriteFrames数组
    _index: 0,
    //以下划线“_”开始的为私用变量
    index: {
      //index属性控制图片切换
      type: cc.Integer,
      //定义属性为整数类型
      //这次没使用notify方式实现属性值的变化监听，改用getter/setter方式
      get: function get() {
        return this._index;
      },
      //为负数退出 
      set: function set(value) {
        if (value < 0) {
          return;
        } //根据spriteFrames组件长度计算this._index


        this._index = value % this.spriteFrames.length; //获取当前节点上的Sprite组件对象

        var sprite = this.node.getComponent(cc.Sprite); //设置Sprite组件的spriteFrame属性，变换图片

        sprite.spriteFrame = this.spriteFrames[this._index];
      }
    }
  },

  /**
  *next方法，调用index++切换图片，
  *可以方便被cc.Button组件的事件调用
  */
  next: function next() {
    this.index = (this.index + 1) % 6; //调用自身index属性，编号+1
  }
});

cc._RF.pop();