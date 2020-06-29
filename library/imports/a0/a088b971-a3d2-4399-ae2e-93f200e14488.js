"use strict";
cc._RF.push(module, 'a088blxo9JDma4uk/IA4USI', 'Cell');
// scripts/Cell.js

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
    mapx: 0,
    //在map[i][j]中的横坐标
    mapy: 0,
    //在map[i][j]中的纵坐标
    kind: null,
    //格子的类型，0:空白格，1:卡牌格，2:事件格
    inMonitor: 0,
    //用来判断是否处于监听中的标记
    routeID: null //记录这个cell是map中哪条route的终点，即在routes中的下标

  },
  setColor: function setColor() {
    //设置cell的颜色为绿色，表示可走
    this.node.color = cc.color(102, 255, 102, 255);
  },
  resetColor: function resetColor() {
    //还原cell的颜色
    this.node.color = cc.color(255, 255, 255, 255);
  },
  getOneCard: function getOneCard(person_js, cardName, totCardNum) {
    //随机获得1张牌
    var cardID = Math.floor(Math.random() * totCardNum);
    person_js.cards.push(cardID); //创建用来提示获得卡牌的精灵节点

    var node = cc.instantiate(window.global.cardnode[cardID]);
    node.setPosition(0, 0); //开启note节点的监听，点击后消失

    node.msg = '获得卡牌:' + cardName[cardID];
    node.on('mousedown', function (event) {
      cc.game.emit('stepOnCell-done', this.msg);
      this.destroy();
    }, node);
    node.parent = this.node.parent.parent;
  },
  chooseFromThree: function chooseFromThree(cardName, totCardNum) {
    var cd = [];
    cd[0] = Math.floor(Math.random() * totCardNum);
    cd[1] = Math.floor(Math.random() * totCardNum);
    cd[2] = Math.floor(Math.random() * totCardNum);
    console.log(cd);

    for (var i = 0; i < 3; i++) {
      var node = cc.instantiate(window.global.cardnode[cd[i]]);
      node.name = 'chooseFromThree' + i;
      node.setPosition(-500 + 500 * i, 0);
      node.cardID = cd[i];
      node.msg = '获得卡牌:' + cardName[cd[i]];
      node.on('mousedown', function (event) {
        var person_js = cc.find('Canvas').getComponent('globalGame').nowPlayer.getComponent('Person');
        console.log('得到卡牌:' + this.cardID);
        person_js.cards.push(this.cardID);
        cc.game.emit('stepOnCell-done', this.msg);

        for (var j = 0; j < 3; j++) {
          cc.find('Canvas/chooseFromThree' + j).destroy();
        }
      }, node);
      node.parent = this.node.parent.parent;
    }
  },
  eventAction: function eventAction(person_js) {
    //随机产生6个事件之一
    var rand_event = Math.floor(Math.random() * 6); //创建用来提示获得触发事件的精灵节点

    var note = new cc.Node();
    note.addComponent(cc.Sprite);
    note.setPosition(0, 0);
    note.parent = this.node.parent.parent;
    var self = note,
        event_name;

    if (rand_event == 0) {
      //陷阱
      event_name = "陷阱";
      person_js.useCardEnabled = 0; //本回合不可使用卡牌,下回合置1
      //warning: 下回合记得改变
    } else if (rand_event == 1) {
      //监狱
      event_name = "监狱"; //下回合不可走

      person_js.goEnabled = 0; //warning: 下回合记得改变
    } else if (rand_event == 2) {
      //恶魔
      event_name = "恶魔"; //损失一滴血量

      person_js.blood--;
    } else if (rand_event == 3) {
      //奥利给
      event_name = "奥利给";
      person_js.turn++; //获得回合
    } else if (rand_event == 4) {
      //视野
      event_name = "视野"; //to do
    } else if (rand_event == 5) {
      //天使
      event_name = "天使";
      person_js.blood = Math.floor(person_js.blood * 1.5);
    }

    cc.loader.loadRes('事件图片/' + event_name, cc.SpriteFrame, function (err, spriteFrame) {
      self.getComponent(cc.Sprite).spriteFrame = spriteFrame;
    }); //开启note节点的监听，点击后消失

    note.msg = '触发事件:' + event_name;
    note.on('mousedown', function (event) {
      cc.game.emit('stepOnCell-done', this.msg);
      this.destroy();
    }, note);
  },
  specialJudge: function specialJudge(role) {
    if (this.haveMine == 1) {
      role.exposed = 1;
      role.blood -= this.mineAttack;
      if (role.blood <= 0) role.isDead = 1;
      console.log('****', this.mineAttack);
      var buff = cc.find('Canvas').getComponent('Buff');
      buff.todoList.push({
        endTurn: window.global.nowTurn + 1,
        person: role,
        act: function act() {
          if (this.person != cc.find('Canvas').getComponent('globalGame').nowProperty) return false;
          this.person.exposed = 0;
          return true;
        }
      });
      this.haveMine = 0;
    }
  },
  stepOnCell: function stepOnCell(person) {
    //获取person节点的组件
    var person_js = person.getComponent('Person');
    this.specialJudge(person_js);

    if (this.kind == 0) {
      //空白格
      cc.game.emit('stepOnCell-done', ''); //发送空串

      return;
    } else if (this.kind == 1) {
      //卡牌格
      var cardName = ['炸弹', '精准导弹', '地雷', '庇护', '天使的庇护', '战神的祝福', '虚弱', '团队的力量', '治愈', '圣光普照', '望远镜', '眼睛', '猛男的祝福', '盗取', '束缚', '迷惑', '拯救'];
      var totCardNum = 17;
      var rand_val = Math.random();
      console.log('rand_val' + rand_val);

      if (rand_val < 0.5) {
        //得到一张牌
        this.getOneCard(person_js, cardName, totCardNum);
      } else {
        //三张中抽一张
        this.chooseFromThree(cardName, totCardNum);
      }
    } else if (this.kind == 2) {
      //事件格
      this.eventAction(person_js); //响应事件
    }
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {},
  start: function start() {
    //设置格子图片
    var self = this;

    if (this.kind == 0) {
      //空白格
      cc.loader.loadRes("cell", cc.SpriteFrame, function (err, spriteFrame) {
        self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
      });
    } else if (this.kind == 1) {
      //卡牌格
      cc.loader.loadRes("抽卡格", cc.SpriteFrame, function (err, spriteFrame) {
        self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
      });
    } else {
      //事件格
      cc.loader.loadRes("事件格", cc.SpriteFrame, function (err, spriteFrame) {
        self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
      });
    }
  } // update (dt) {},

});

cc._RF.pop();