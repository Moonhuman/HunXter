"use strict";
cc._RF.push(module, '1c04cewIodMKZmQhbD7lezO', 'globalGame');
// scripts/globalGame.js

"use strict";

window.global = {
  persons: [],
  nowTurn: 0,
  //当前回合数
  isOver: false
};
cc.Class({
  "extends": cc.Component,
  properties: {
    mapObj: null,
    //地图对象
    persons: null,
    //玩家们
    index: 0,
    nowStep: 0,
    nowPlayer: null,
    nowProperty: null,
    isWait: false
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    //加载地图
    this.nowStep = 0;
    this.node.on('update-state', function (msg) {
      //console.log(typeof(this.nowStep));
      this.nowStep = (this.nowStep + 1) % 3;
      this.isWait = false;
    }, this);
    cc.game.on('route-chosen', function (route) {
      //监听玩家选择了哪条路径
      console.log('点击了', route);
      this.nowProperty.moveByRoute(route);
      this.node.emit('update-state', '1'); //玩家移动完成，进入下一步操作
      //玩家头像按照路径移动
    }, this); //console.log(map.posEnable(map.map[0][0],3));
  },
  start: function start() {
    window.global.persons[0].getComponent('Person').bindAvatar(cc.find('Canvas/avatar/avatar1'));
    window.global.persons[1].getComponent('Person').bindAvatar(cc.find('Canvas/avatar/avatar2'));
    window.global.persons[2].getComponent('Person').bindAvatar(cc.find('Canvas/avatar/avatar3'));
    window.global.persons[3].getComponent('Person').bindAvatar(cc.find('Canvas/avatar/avatar4'));
    this.mapObj = cc.find('Canvas/map').getComponent('GetMap'); //console.log(this.mapObj.posEnable(this.mapObj.map[0][0],3));

    this.nowPlayer = window.global.persons[this.index]; //console.log(this.mapObj.map);
    //初始化四个玩家位置
    //console.log(this.mapObj.map[0][0].getPosition());

    window.global.persons[0].getComponent('Person').move2Pos(0, 0);
    window.global.persons[1].getComponent('Person').move2Pos(10, 10);
    window.global.persons[2].getComponent('Person').move2Pos(0, 10);
    window.global.persons[3].getComponent('Person').move2Pos(10, 0);
  },
  update: function update(dt) {
    //判断当前回合是否结束
    console.log("步骤：", this.nowStep);

    switch (this.nowStep) {
      case 0:
        {
          //初始化变量
          if (this.isWait) {
            //正在操作或等待操作
            break;
          }

          console;
          this.nowProperty = this.nowPlayer.getComponent('Person'); //获得玩家属性集合

          this.node.emit('update-state', '1');
          break;
        }

      case 1:
        {
          //玩家移动
          if (this.isWait) {
            //正在操作或等待操作
            break;
          }

          console.log(this.isWait);

          if (this.nowProperty.goEnabled) {
            //判断玩家是否可以行走
            var step = randomNum(1, 6); //掷骰子，玩家步数

            console.log("掷骰子:" + step);
            console.log("当前起点:" + this.nowProperty.posX + "," + this.nowProperty.posY);
            this.mapObj.posEnable(this.mapObj.map[this.nowProperty.posX][this.nowProperty.posY], step);
            this.isWait = true;
          }

          break;
        }

      case 2:
        {
          //切换下一个玩家
          this.index = (this.index + 1) % 4;
          this.nowPlayer = window.global.persons[this.index];
          this.node.emit('update-state', '1');
          break;
        }
    } //console.log(nowProperty.goEnabled);

  }
});

function Person(name, num, pos, parter, node) {
  this.name = name; //玩家昵称

  this.ID = num; //玩家编号

  this.position = pos; //玩家当前位置

  this.attack = 1; //玩家攻击力，初始为1点

  this.blood = 10; //玩家血量,初始为2点，每回合恢复2点

  this.mobility = 2; //玩家行动值

  this.cards = new Array(); //玩家持有卡牌组

  this.myStatus = 1; //0为死亡，1为正常

  this.turn = 1; //玩家回合数

  this.useCardEnabled = 1; //是否使用卡牌，1为可使用卡牌

  this.goEnabled = 1; //是否可以行走,1为可以行走

  this.parter = parter; //设置玩家队友id

  this.node = node; //人物节点

  return this;
} //生成从minNum到maxNum的随机数


function randomNum(minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1, 10);
      break;

    case 2:
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
      break;

    default:
      return 0;
      break;
  }
}

cc._RF.pop();