
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Card.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c7d01kf4m1Pi6InQGfSXvtd', 'Card');
// scripts/Card.js

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
    cardCost: [cc.Integer],
    cardFunction: null
  },
  //卡牌响应函数中的this不是card.js
  boom_0: function boom_0(card) {
    cc.find('Canvas/Deck').active = false; //暂时不让点手牌堆

    cc.find('Canvas/end_card_btn').active = false; //暂时不让结束出牌

    cc.find('Canvas/Deck').getComponent('Deck').showTips("请选择要轰炸的地图块");
    var map = cc.find('Canvas/map').getComponent('GetMap');
    map.openAllMonitor('boom-cell-chosen');
  },
  missile_1: function missile_1(card) {
    var role = cc.find('Canvas').getComponent('globalGame').nowPlayer;
    var map = cc.find('Canvas/map').getComponent('GetMap');
    var dis = map.BfsDis(role.getComponent('Person').posX, role.getComponent('Person').posY);
    console.log(dis);
    var index = Number(role.name[6]);
    var teammate = index + 2 > 4 ? index - 2 : index + 2;
    var enemy1 = index + 1 > 4 ? index - 3 : index + 1;
    var enemy2 = teammate + 1 > 4 ? teammate - 3 : teammate + 1;
    enemy1 = cc.find("Canvas/Persons/Person" + enemy1).getComponent('Person');
    enemy2 = cc.find("Canvas/Persons/Person" + enemy2).getComponent('Person');
    if (dis[enemy1.posX][enemy1.posY] <= 5) enemy1.blood -= role.attack;
    if (dis[enemy2.posX][enemy2.posY] <= 5) enemy2.blood -= role.attack;
    role.getComponent('Person').mobility -= card.cardCost[1];
    cc.find('Canvas/Deck').getComponent('Deck').removeCard(1);
  },
  mine_2: function mine_2(card) {
    var role = cc.find('Canvas').getComponent('globalGame').nowProperty;
    var map = cc.find('Canvas/map').getComponent('GetMap');
    map.map[role.posX][role.posY].getComponent('Cell').haveMine = 1;
    map.map[role.posX][role.posY].getComponent('Cell').mineAttack = role.attack * 2;
    role.getComponent('Person').mobility -= card.cardCost[2];
    cc.find('Canvas/Deck').getComponent('Deck').removeCard(2);
  },
  shield_3: function shield_3(card) {
    var role = cc.find('Canvas').getComponent('globalGame').nowProperty;
    role.shield = 1;
    role.mobility -= card.cardCost[3];
    cc.find('Canvas/Deck').getComponent('Deck').removeCard(3);
  },
  halfShield_4: function halfShield_4(card) {
    var role = cc.find('Canvas').getComponent('globalGame').nowPlayer;
    var index = Number(role.name[6]);
    var teammate = index + 2 > 4 ? index - 2 : index + 2;
    teammate = cc.find("Canvas/Persons/Person" + teammate).getComponent('Person');
    role = cc.find('Canvas').getComponent('globalGame').nowProperty;
    role.halfShield += 1;
    if (teammate.isDead == 0) teammate.halfShield += 1;
    role.mobility -= card.cardCost[4];
    cc.find('Canvas/Deck').getComponent('Deck').removeCard(4);
  },
  bless_5: function bless_5(card) {
    var role = cc.find('Canvas').getComponent('globalGame').nowPlayer;
    var index = Number(role.name[6]);
    var teammate = index + 2 > 4 ? index - 2 : index + 2;
    role.getComponent('Person').attcak += 1;
    cc.find("Canvas/Persons/Person" + teammate).getComponent('Person').attack += 1;
    var buff = cc.find('Canvas').getComponent('Buff');
    buff.todoList.push({
      endTurn: window.global.nowTurn + 2,
      person: role,
      act: function act() {
        if (this.person != cc.find('Canvas').getComponent('globalGame').nowPlayer) return false;
        this.person.getComponent('Person').attack = Math.max(0, this.person.getComponent('Person').attack - 1);
        return true;
      }
    });
    buff.todoList.push({
      endTurn: window.global.nowTurn + 2,
      person: cc.find("Canvas/Persons/Person" + teammate),
      act: function act() {
        if (this.person != cc.find('Canvas').getComponent('globalGame').nowPlayer) return false;
        this.person.getComponent('Person').attack = Math.max(0, this.person.getComponent('Person').attack - 1);
        return true;
      }
    });
    role.getComponent('Person').mobility -= card.cardCost[5];
    cc.find('Canvas/Deck').getComponent('Deck').removeCard(5);
  },
  weak_6: function weak_6(card) {
    var role = cc.find('Canvas').getComponent('globalGame').nowPlayer;
    var index = Number(role.name[6]);
    var teammate = index + 2 > 4 ? index - 2 : index + 2;
    var enemy1 = index + 1 > 4 ? index - 3 : index + 1;
    var enemy2 = teammate + 1 > 4 ? teammate - 3 : teammate + 1;
    enemy1 = cc.find("Canvas/Persons/Person" + enemy1).getComponent('Person');
    enemy2 = cc.find("Canvas/Persons/Person" + enemy2).getComponent('Person');
    var buff = cc.find('Canvas').getComponent('Buff');
    buff.todoList.push({
      endTurn: window.global.nowTurn + 2,
      person: [enemy1, enemy1.attack != 0],
      act: function act() {
        if (this.person[0] != cc.find('Canvas').getComponent('globalGame').nowProperty) return false;
        this.person[0].attack += this.person[1];
        return true;
      }
    });
    buff.todoList.push({
      endTurn: window.global.nowTurn + 2,
      person: [enemy2, enemy2.attack != 0],
      act: function act() {
        if (this.person[0] != cc.find('Canvas').getComponent('globalGame').nowProperty) return false;
        this.person[0].attack += this.person[1];
        return true;
      }
    });
    enemy1.attack = Math.max(0, enemy1.attack - 1);
    enemy2.attack = Math.max(0, enemy2.attack - 1);
    role.getComponent('Person').mobility -= card.cardCost[6];
    cc.find('Canvas/Deck').getComponent('Deck').removeCard(6);
  },
  teamForce_7: function teamForce_7(card) {
    var role = cc.find('Canvas').getComponent('globalGame').nowPlayer;
    var index = Number(role.name[6]);
    var teammate = index + 2 > 4 ? index - 2 : index + 2;
    var enemy1 = index + 1 > 4 ? index - 3 : index + 1;
    var enemy2 = teammate + 1 > 4 ? teammate - 3 : teammate + 1;
    role = cc.find("Canvas/Persons/Person" + index).getComponent('Person');
    teammate = cc.find("Canvas/Persons/Person" + teammate).getComponent('Person');
    enemy1 = cc.find("Canvas/Persons/Person" + enemy1).getComponent('Person');
    enemy2 = cc.find("Canvas/Persons/Person" + enemy2).getComponent('Person');
    if (teammate.isDead == 1) cc.find('Canvas/Deck').getComponent('Deck').showTips('队友已死亡，白给 QAQ');else if (7 in teammate.cards) {
      if (teammate.mobility < 5) cc.find('Canvas/Deck').getComponent('Deck').showTips('队友行动值不足，白给 QAQ');else {
        enemy1.blood -= 3;
        enemy2.blood -= 3;
        if (enemy1.blood <= 0) enemy1.isDead = 1;
        if (enemy2.blood <= 0) enemy2.isDead = 1;
      }
    } else {
      cc.find('Canvas/Deck').getComponent('Deck').showTips('队友无此牌，白给 QAQ');
    }
    role.mobility -= card.cardCost[7];
    cc.find('Canvas/Deck').getComponent('Deck').removeCard(7);
  },
  heal_8: function heal_8(card) {
    var role = cc.find('Canvas').getComponent('globalGame').nowProperty;
    role.blood += 1;
    role.mobility -= card.cardCost[8];
    cc.find('Canvas/Deck').getComponent('Deck').removeCard(8);
  },
  holyNova_9: function holyNova_9(card) {
    var role = cc.find('Canvas').getComponent('globalGame').nowPlayer;
    var index = Number(role.name[6]);
    var teammate = index + 2 > 4 ? index - 2 : index + 2;
    var enemy1 = index + 1 > 4 ? index - 3 : index + 1;
    var enemy2 = teammate + 1 > 4 ? teammate - 3 : teammate + 1;
    role = cc.find("Canvas/Persons/Person" + index).getComponent('Person');
    teammate = cc.find("Canvas/Persons/Person" + teammate).getComponent('Person');
    enemy1 = cc.find("Canvas/Persons/Person" + enemy1).getComponent('Person');
    enemy2 = cc.find("Canvas/Persons/Person" + enemy2).getComponent('Person');
    if (role.isDead == 0) role.blood += 2;
    if (teammate.isDead == 0) teammate.blood += 2;
    if (enemy1.isDead == 0) enemy1.blood += 1;
    if (enemy2.isDead == 0) enemy2.blood += 1;
    role.mobility -= card.cardCost[9];
    cc.find('Canvas/Deck').getComponent('Deck').removeCard(9);
  },
  telescope_10: function telescope_10(card) {
    var role = cc.find('Canvas').getComponent('globalGame').nowProperty;
    role.sight++;
    var buff = cc.find('Canvas').getComponent('Buff');
    buff.todoList.push({
      endTurn: window.global.nowTurn + 5,
      person: role,
      act: function act() {
        if (this.person != cc.find('Canvas').getComponent('globalGame').nowProperty) return false;
        this.person.sight--;
        return true;
      }
    });
    role.mobility -= card.cardCost[10];
    cc.find('Canvas/Deck').getComponent('Deck').removeCard(10);
  },
  eye_11: function eye_11(card) {
    cc.find('Canvas/Deck').active = false; //暂时不让点手牌堆

    cc.find('Canvas/end_card_btn').active = false; //暂时不让结束出牌

    cc.find('Canvas/Deck').getComponent('Deck').showTips("请选择要放置眼睛的地图块");
    var map = cc.find('Canvas/map').getComponent('GetMap');
    map.openAllMonitor('eye-cell-chosen');
  },
  tough_12: function tough_12(card) {
    var role = cc.find('Canvas').getComponent('globalGame').nowProperty;
    role.attack *= 2;
    var buff = cc.find('Canvas').getComponent('Buff');
    buff.todoList.push({
      endTurn: window.global.nowTurn + 1,
      person: role,
      act: function act() {
        if (this.person != cc.find('Canvas').getComponent('globalGame').nowProperty) return false;
        this.person.attack = Number(this.person.attack / 2);
        return true;
      }
    });
    role.mobility -= card.cardCost[12];
    cc.find('Canvas/Deck').getComponent('Deck').removeCard(12);
  },
  waitSteal: function waitSteal() {
    //this 为人物的person.js
    var role = cc.find('Canvas').getComponent('globalGame').nowPlayer;
    var index = Number(role.name[6]);
    var teammate = index + 2 > 4 ? index - 2 : index + 2;
    var enemy1 = index + 1 > 4 ? index - 3 : index + 1;
    var enemy2 = teammate + 1 > 4 ? teammate - 3 : teammate + 1;
    role = cc.find("Canvas/Persons/Person" + index).getComponent('Person');
    teammate = cc.find("Canvas/Persons/Person" + teammate).getComponent('Person');
    enemy1 = cc.find("Canvas/Persons/Person" + enemy1).getComponent('Person');
    enemy2 = cc.find("Canvas/Persons/Person" + enemy2).getComponent('Person');

    if (this.cards.length == 0) {
      cc.find('Canvas/Deck').getComponent('Deck').showTips('无手牌可盗取 QAQ');
    } else {
      var rd = Math.floor(Math.random() * this.cards.length);
      var node = cc.instantiate(window.global.cardnode[this.cards[rd]]);
      node.setPosition(0, 0);
      node.on('mousedown', function (event) {
        this.destroy();
      }, node);
      node.parent = this.node.parent.parent;
      role.cards.push(this.cards[rd]);
      this.cards.splice(rd, 1);
    }

    teammate.avatar.off('mousedown', cc.find('Canvas/Card').getComponent('Card').waitSteal, teammate);
    enemy1.avatar.off('mousedown', cc.find('Canvas/Card').getComponent('Card').waitSteal, enemy1);
    enemy2.avatar.off('mousedown', cc.find('Canvas/Card').getComponent('Card').waitSteal, enemy2);
    cc.find('Canvas/Deck').active = true;
    cc.find('Canvas/end_card_btn').active = true;
  },
  steal_13: function steal_13(card) {
    cc.find('Canvas/Deck').active = false; //暂时不让点手牌堆

    cc.find('Canvas/end_card_btn').active = false; //暂时不让结束出牌

    var role = cc.find('Canvas').getComponent('globalGame').nowPlayer;
    var index = Number(role.name[6]);
    var teammate = index + 2 > 4 ? index - 2 : index + 2;
    var enemy1 = index + 1 > 4 ? index - 3 : index + 1;
    var enemy2 = teammate + 1 > 4 ? teammate - 3 : teammate + 1;
    role = cc.find("Canvas/Persons/Person" + index).getComponent('Person');
    teammate = cc.find("Canvas/Persons/Person" + teammate).getComponent('Person');
    enemy1 = cc.find("Canvas/Persons/Person" + enemy1).getComponent('Person');
    enemy2 = cc.find("Canvas/Persons/Person" + enemy2).getComponent('Person');
    var mist = cc.find('Canvas/mist').getComponent('Mist');
    var havePeople = 0;

    if (mist.mistArr[teammate.posX][teammate.posY].active == false) {
      teammate.avatar.on('mousedown', card.waitSteal, teammate);
      havePeople = 1;
    }

    if (mist.mistArr[enemy1.posX][enemy1.posY].active == false) {
      enemy1.avatar.on('mousedown', card.waitSteal, enemy1);
      havePeople = 1;
    }

    if (mist.mistArr[enemy2.posX][enemy2.posY].active == false) {
      enemy2.avatar.on('mousedown', card.waitSteal, enemy2);
      havePeople = 1;
    }

    if (havePeople == 0) cc.find('Canvas/Deck').getComponent('Deck').showTips('视野内无玩家 QAQ');
    role.mobility -= card.cardCost[13];
    cc.find('Canvas/Deck').getComponent('Deck').removeCard(13);
  },
  stopMove: function stopMove() {
    //this为人物的person.js
    var role = cc.find('Canvas').getComponent('globalGame').nowPlayer;
    var index = Number(role.name[6]);
    var teammate = index + 2 > 4 ? index - 2 : index + 2;
    var enemy1 = index + 1 > 4 ? index - 3 : index + 1;
    var enemy2 = teammate + 1 > 4 ? teammate - 3 : teammate + 1;
    role = cc.find("Canvas/Persons/Person" + index).getComponent('Person');
    teammate = cc.find("Canvas/Persons/Person" + teammate).getComponent('Person');
    enemy1 = cc.find("Canvas/Persons/Person" + enemy1).getComponent('Person');
    enemy2 = cc.find("Canvas/Persons/Person" + enemy2).getComponent('Person');
    this.goEnabled = 0;
    enemy1.avatar.off('mousedown', cc.find('Canvas/Card').getComponent('Card').stopMove, enemy1);
    enemy2.avatar.off('mousedown', cc.find('Canvas/Card').getComponent('Card').stopMove, enemy2);
    cc.find('Canvas/Deck').active = true;
    cc.find('Canvas/end_card_btn').active = true;
  },
  tie_14: function tie_14(card) {
    cc.find('Canvas/Deck').active = false; //暂时不让点手牌堆

    cc.find('Canvas/end_card_btn').active = false; //暂时不让结束出牌

    var role = cc.find('Canvas').getComponent('globalGame').nowPlayer;
    var index = Number(role.name[6]);
    var teammate = index + 2 > 4 ? index - 2 : index + 2;
    var enemy1 = index + 1 > 4 ? index - 3 : index + 1;
    var enemy2 = teammate + 1 > 4 ? teammate - 3 : teammate + 1;
    role = cc.find("Canvas/Persons/Person" + index).getComponent('Person');
    teammate = cc.find("Canvas/Persons/Person" + teammate).getComponent('Person');
    enemy1 = cc.find("Canvas/Persons/Person" + enemy1).getComponent('Person');
    enemy2 = cc.find("Canvas/Persons/Person" + enemy2).getComponent('Person');
    var mist = cc.find('Canvas/mist').getComponent('Mist');
    var havePeople = 0;

    if (mist.mistArr[enemy1.posX][enemy1.posY].active == false) {
      enemy1.avatar.on('mousedown', card.stopMove, enemy1);
      havePeople = 1;
    }

    if (mist.mistArr[enemy2.posX][enemy2.posY].active == false) {
      enemy2.avatar.on('mousedown', card.stopMove, enemy2);
      havePeople = 1;
    }

    if (havePeople == 0) {
      cc.find('Canvas/Deck').getComponent('Deck').showTips('视野内无敌人 QAQ');
      cc.find('Canvas/Deck').active = true;
      cc.find('Canvas/end_card_btn').active = true;
    }

    role.mobility -= card.cardCost[14];
    cc.find('Canvas/Deck').getComponent('Deck').removeCard(14);
  },
  stopUseCard: function stopUseCard() {
    //this为人物的person.js
    var role = cc.find('Canvas').getComponent('globalGame').nowPlayer;
    var index = Number(role.name[6]);
    var teammate = index + 2 > 4 ? index - 2 : index + 2;
    var enemy1 = index + 1 > 4 ? index - 3 : index + 1;
    var enemy2 = teammate + 1 > 4 ? teammate - 3 : teammate + 1;
    role = cc.find("Canvas/Persons/Person" + index).getComponent('Person');
    teammate = cc.find("Canvas/Persons/Person" + teammate).getComponent('Person');
    enemy1 = cc.find("Canvas/Persons/Person" + enemy1).getComponent('Person');
    enemy2 = cc.find("Canvas/Persons/Person" + enemy2).getComponent('Person');
    this.useCardEnabled = 0;
    enemy1.avatar.off('mousedown', cc.find('Canvas/Card').getComponent('Card').stopUseCard, enemy1);
    enemy2.avatar.off('mousedown', cc.find('Canvas/Card').getComponent('Card').stopUseCard, enemy2);
    cc.find('Canvas/Deck').active = true;
    cc.find('Canvas/end_card_btn').active = true;
  },
  confuse_15: function confuse_15(card) {
    cc.find('Canvas/Deck').active = false; //暂时不让点手牌堆

    cc.find('Canvas/end_card_btn').active = false; //暂时不让结束出牌

    var role = cc.find('Canvas').getComponent('globalGame').nowPlayer;
    var index = Number(role.name[6]);
    var teammate = index + 2 > 4 ? index - 2 : index + 2;
    var enemy1 = index + 1 > 4 ? index - 3 : index + 1;
    var enemy2 = teammate + 1 > 4 ? teammate - 3 : teammate + 1;
    role = cc.find("Canvas/Persons/Person" + index).getComponent('Person');
    teammate = cc.find("Canvas/Persons/Person" + teammate).getComponent('Person');
    enemy1 = cc.find("Canvas/Persons/Person" + enemy1).getComponent('Person');
    enemy2 = cc.find("Canvas/Persons/Person" + enemy2).getComponent('Person');
    var mist = cc.find('Canvas/mist').getComponent('Mist');
    var havePeople = 0;

    if (mist.mistArr[enemy1.posX][enemy1.posY].active == false) {
      enemy1.avatar.on('mousedown', card.stopUseCard, enemy1);
      havePeople = 1;
    }

    if (mist.mistArr[enemy2.posX][enemy2.posY].active == false) {
      enemy2.avatar.on('mousedown', card.stopUseCard, enemy2);
      havePeople = 1;
    }

    if (havePeople == 0) {
      cc.find('Canvas/Deck').getComponent('Deck').showTips('视野内无敌人 QAQ');
      cc.find('Canvas/Deck').active = true;
      cc.find('Canvas/end_card_btn').active = true;
    }

    role.mobility -= card.cardCost[15];
    cc.find('Canvas/Deck').getComponent('Deck').removeCard(15);
  },
  save_16: function save_16(card) {
    var role = cc.find('Canvas').getComponent('globalGame').nowPlayer;
    var index = Number(role.name[6]);
    var teammate = index + 2 > 4 ? index - 2 : index + 2;
    teammate = cc.find("Canvas/Persons/Person" + teammate).getComponent('Person');

    if (teammate.isDead == 1) {
      teammate.isDead = 0;
      teammate.blood = 5;
      teammate.mobility = 3;
    }

    role.getComponent('Person').mobility -= card.cardCost[16];
    cc.find('Canvas/Deck').getComponent('Deck').removeCard(16);
  },
  onLoad: function onLoad() {
    this.cardCost = [4, 3, 2, 3, 3, 4, 4, 5, 2, 3, 3, 3, 3, 3, 4, 4, 5];
    this.cardFunction = new Array();
    this.cardFunction[0] = this.boom_0;
    this.cardFunction[1] = this.missile_1;
    this.cardFunction[2] = this.mine_2;
    this.cardFunction[3] = this.shield_3;
    this.cardFunction[4] = this.halfShield_4;
    this.cardFunction[5] = this.bless_5;
    this.cardFunction[6] = this.weak_6;
    this.cardFunction[7] = this.teamForce_7;
    this.cardFunction[8] = this.heal_8;
    this.cardFunction[9] = this.holyNova_9;
    this.cardFunction[10] = this.telescope_10;
    this.cardFunction[11] = this.eye_11;
    this.cardFunction[12] = this.tough_12;
    this.cardFunction[13] = this.steal_13;
    this.cardFunction[14] = this.tie_14;
    this.cardFunction[15] = this.confuse_15;
    this.cardFunction[16] = this.save_16; //响应卡牌0炸弹

    cc.game.on('boom-cell-chosen', function (x, y) {
      var boom_cell = [[x, y]];
      var map = cc.find('Canvas/map').getComponent('GetMap');

      for (var i = 0; i < map.adj[x][y].length; i++) {
        boom_cell.push(map.adj[x][y][i]);
      }

      var role = cc.find('Canvas').getComponent('globalGame').nowPlayer;
      var index = Number(role.name[6]);
      var teammate = index + 2 > 4 ? index - 2 : index + 2;
      var enemy1 = index + 1 > 4 ? index - 3 : index + 1;
      var enemy2 = teammate + 1 > 4 ? teammate - 3 : teammate + 1;
      role = cc.find("Canvas/Persons/Person" + index).getComponent('Person');
      teammate = cc.find("Canvas/Persons/Person" + teammate).getComponent('Person');
      enemy1 = cc.find("Canvas/Persons/Person" + enemy1).getComponent('Person');
      enemy2 = cc.find("Canvas/Persons/Person" + enemy2).getComponent('Person');

      for (var i = 0; i < boom_cell.length; i++) {
        if (boom_cell[i][0] == enemy1.posX && boom_cell[i][1] == enemy1.posY) {
          enemy1.blood -= role.attack * 2;
          console.log(enemy1.nickname);
        }

        if (boom_cell[i][0] == enemy2.posX && boom_cell[i][1] == enemy2.posY) {
          enemy2.blood -= role.attack * 2;
          console.log(enemy2.nickname);
        }

        if (enemy1.blood <= 0) enemy1.isDead = 1;
        if (enemy2.blood <= 0) enemy2.isDead = 1;
      }

      role.mobility -= this.cardCost[0];
      cc.find('Canvas/Deck').getComponent('Deck').removeCard(0);
      cc.find('Canvas/Deck').active = true; //恢复卡牌堆

      cc.find('Canvas/end_card_btn').active = true; //恢复结束出牌
    }, this); //响应卡牌11插眼

    cc.game.on('eye-cell-chosen', function (x, y) {
      var eye_cell = [[x, y]];
      var map = cc.find('Canvas/map').getComponent('GetMap');
      var dis = map.BfsDis(x, y);
      var role = cc.find('Canvas').getComponent('globalGame').nowProperty;

      for (var i = 0; i < 11; ++i) {
        for (var j = 0; j < 11; ++j) {
          if (dis[i][j] != -1 && dis[i][j] <= 3) eye_cell.push([i, j]);
        }
      }

      role.eyes.push(eye_cell);
      var buff = cc.find('Canvas').getComponent('Buff');
      buff.todoList.push({
        endTurn: window.global.nowTurn + 5,
        person: role,
        act: function act() {
          if (this.person != cc.find('Canvas').getComponent('globalGame').nowProperty) return false;
          role.eyes.splice(0, 1);
          return true;
        }
      });
      role.mobility -= this.cardCost[11];
      cc.find('Canvas/Deck').getComponent('Deck').removeCard(11);
      cc.find('Canvas/Deck').active = true; //恢复卡牌堆

      cc.find('Canvas/end_card_btn').active = true; //恢复结束出牌
    }, this);
  },
  start: function start() {} // update (dt) {},

});

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcQ2FyZC5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImNhcmRDb3N0IiwiSW50ZWdlciIsImNhcmRGdW5jdGlvbiIsImJvb21fMCIsImNhcmQiLCJmaW5kIiwiYWN0aXZlIiwiZ2V0Q29tcG9uZW50Iiwic2hvd1RpcHMiLCJtYXAiLCJvcGVuQWxsTW9uaXRvciIsIm1pc3NpbGVfMSIsInJvbGUiLCJub3dQbGF5ZXIiLCJkaXMiLCJCZnNEaXMiLCJwb3NYIiwicG9zWSIsImNvbnNvbGUiLCJsb2ciLCJpbmRleCIsIk51bWJlciIsIm5hbWUiLCJ0ZWFtbWF0ZSIsImVuZW15MSIsImVuZW15MiIsImJsb29kIiwiYXR0YWNrIiwibW9iaWxpdHkiLCJyZW1vdmVDYXJkIiwibWluZV8yIiwibm93UHJvcGVydHkiLCJoYXZlTWluZSIsIm1pbmVBdHRhY2siLCJzaGllbGRfMyIsInNoaWVsZCIsImhhbGZTaGllbGRfNCIsImhhbGZTaGllbGQiLCJpc0RlYWQiLCJibGVzc181IiwiYXR0Y2FrIiwiYnVmZiIsInRvZG9MaXN0IiwicHVzaCIsImVuZFR1cm4iLCJ3aW5kb3ciLCJnbG9iYWwiLCJub3dUdXJuIiwicGVyc29uIiwiYWN0IiwiTWF0aCIsIm1heCIsIndlYWtfNiIsInRlYW1Gb3JjZV83IiwiY2FyZHMiLCJoZWFsXzgiLCJob2x5Tm92YV85IiwidGVsZXNjb3BlXzEwIiwic2lnaHQiLCJleWVfMTEiLCJ0b3VnaF8xMiIsIndhaXRTdGVhbCIsImxlbmd0aCIsInJkIiwiZmxvb3IiLCJyYW5kb20iLCJub2RlIiwiaW5zdGFudGlhdGUiLCJjYXJkbm9kZSIsInNldFBvc2l0aW9uIiwib24iLCJldmVudCIsImRlc3Ryb3kiLCJwYXJlbnQiLCJzcGxpY2UiLCJhdmF0YXIiLCJvZmYiLCJzdGVhbF8xMyIsIm1pc3QiLCJoYXZlUGVvcGxlIiwibWlzdEFyciIsInN0b3BNb3ZlIiwiZ29FbmFibGVkIiwidGllXzE0Iiwic3RvcFVzZUNhcmQiLCJ1c2VDYXJkRW5hYmxlZCIsImNvbmZ1c2VfMTUiLCJzYXZlXzE2Iiwib25Mb2FkIiwiQXJyYXkiLCJnYW1lIiwieCIsInkiLCJib29tX2NlbGwiLCJpIiwiYWRqIiwibmlja25hbWUiLCJleWVfY2VsbCIsImoiLCJleWVzIiwic3RhcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxRQUFRLEVBQUMsQ0FBQ0osRUFBRSxDQUFDSyxPQUFKLENBREQ7QUFFUkMsSUFBQUEsWUFBWSxFQUFDO0FBRkwsR0FIUDtBQU9MO0FBRUhDLEVBQUFBLE1BQU0sRUFBRSxnQkFBU0MsSUFBVCxFQUFlO0FBQ3RCUixJQUFBQSxFQUFFLENBQUNTLElBQUgsQ0FBUSxhQUFSLEVBQXVCQyxNQUF2QixHQUFnQyxLQUFoQyxDQURzQixDQUNnQjs7QUFDdENWLElBQUFBLEVBQUUsQ0FBQ1MsSUFBSCxDQUFRLHFCQUFSLEVBQStCQyxNQUEvQixHQUF3QyxLQUF4QyxDQUZzQixDQUV3Qjs7QUFDOUNWLElBQUFBLEVBQUUsQ0FBQ1MsSUFBSCxDQUFRLGFBQVIsRUFBdUJFLFlBQXZCLENBQW9DLE1BQXBDLEVBQTRDQyxRQUE1QyxDQUFxRCxZQUFyRDtBQUNBLFFBQUlDLEdBQUcsR0FBR2IsRUFBRSxDQUFDUyxJQUFILENBQVEsWUFBUixFQUFzQkUsWUFBdEIsQ0FBbUMsUUFBbkMsQ0FBVjtBQUNBRSxJQUFBQSxHQUFHLENBQUNDLGNBQUosQ0FBbUIsa0JBQW5CO0FBQ0EsR0FmTztBQWdCUkMsRUFBQUEsU0FBUyxFQUFFLG1CQUFTUCxJQUFULEVBQWU7QUFDekIsUUFBSVEsSUFBSSxHQUFDaEIsRUFBRSxDQUFDUyxJQUFILENBQVEsUUFBUixFQUFrQkUsWUFBbEIs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QUNwQyxJQUZXO0FBR2xCcUMsUUFBQUEsR0FBRyxFQUFDLGVBQVU7QUFDYixjQUFJLEtBQUtELE1BQUwsSUFBZXBELEVBQUUsQ0FBQ1MsSUFBSCxDQUFRLFFBQVIsRUFBa0JFLFlBQWxCLENBQStCLFlBQS9CLEVBQTZDd0IsV0FBaEUsRUFDQyxPQUFPLEtBQVA7QUFDRG5CLFVBQUFBLElBQUksQ0FBQ3VGLElBQUwsQ0FBVXpCLE1BQVYsQ0FBaUIsQ0FBakIsRUFBbUIsQ0FBbkI7QUFDQSxpQkFBTyxJQUFQO0FBQ0E7QUFSaUIsT0FBbkI7QUFVQTlELE1BQUFBLElBQUksQ0FBQ2dCLFFBQUwsSUFBZSxLQUFLNUIsUUFBTCxDQUFjLEVBQWQsQ0FBZjtBQUNBSixNQUFBQSxFQUFFLENBQUNTLElBQUgsQ0FBUSxhQUFSLEVBQXVCRSxZQUF2QixDQUFvQyxNQUFwQyxFQUE0Q3NCLFVBQTVDLENBQXVELEVBQXZEO0FBQ0FqQyxNQUFBQSxFQUFFLENBQUNTLElBQUgsQ0FBUSxhQUFSLEVBQXVCQyxNQUF2QixHQUFnQyxJQUFoQyxDQXhCNEMsQ0F3Qk47O0FBQ3RDVixNQUFBQSxFQUFFLENBQUNTLElBQUgsQ0FBUSxxQkFBUixFQUErQkMsTUFBL0IsR0FBd0MsSUFBeEMsQ0F6QjRDLENBeUJDO0FBQzdDLEtBMUJELEVBMEJHLElBMUJIO0FBMkJHLEdBM2VJO0FBNmVMOEYsRUFBQUEsS0E3ZUssbUJBNmVJLENBRVIsQ0EvZUksQ0FpZkw7O0FBamZLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBjYXJkQ29zdDpbY2MuSW50ZWdlcl0sXHJcbiAgICAgICAgY2FyZEZ1bmN0aW9uOm51bGwsXHJcbiAgICB9LFxyXG4gICAgLy/ljaHniYzlk43lupTlh73mlbDkuK3nmoR0aGlz5LiN5pivY2FyZC5qc1xyXG5cdFxyXG5cdGJvb21fMDogZnVuY3Rpb24oY2FyZCkge1xyXG5cdFx0Y2MuZmluZCgnQ2FudmFzL0RlY2snKS5hY3RpdmUgPSBmYWxzZTsvL+aaguaXtuS4jeiuqeeCueaJi+eJjOWghlxyXG5cdFx0Y2MuZmluZCgnQ2FudmFzL2VuZF9jYXJkX2J0bicpLmFjdGl2ZSA9IGZhbHNlOy8v5pqC5pe25LiN6K6p57uT5p2f5Ye654mMXHJcblx0XHRjYy5maW5kKCdDYW52YXMvRGVjaycpLmdldENvbXBvbmVudCgnRGVjaycpLnNob3dUaXBzKFwi6K+36YCJ5oup6KaB6L2w54K455qE5Zyw5Zu+5Z2XXCIpO1xyXG5cdFx0dmFyIG1hcCA9IGNjLmZpbmQoJ0NhbnZhcy9tYXAnKS5nZXRDb21wb25lbnQoJ0dldE1hcCcpO1xyXG5cdFx0bWFwLm9wZW5BbGxNb25pdG9yKCdib29tLWNlbGwtY2hvc2VuJyk7XHJcblx0fSxcclxuXHRtaXNzaWxlXzE6IGZ1bmN0aW9uKGNhcmQpIHtcclxuXHRcdHZhciByb2xlPWNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudCgnZ2xvYmFsR2FtZScpLm5vd1BsYXllcjtcclxuXHRcdHZhciBtYXAgPSBjYy5maW5kKCdDYW52YXMvbWFwJykuZ2V0Q29tcG9uZW50KCdHZXRNYXAnKTtcclxuXHRcdHZhciBkaXMgPSBtYXAuQmZzRGlzKHJvbGUuZ2V0Q29tcG9uZW50KCdQZXJzb24nKS5wb3NYLCByb2xlLmdldENvbXBvbmVudCgnUGVyc29uJykucG9zWSk7XHJcblx0XHRjb25zb2xlLmxvZyhkaXMpO1xyXG5cdFx0dmFyIGluZGV4PU51bWJlcihyb2xlLm5hbWVbNl0pO1xyXG4gICAgICAgIHZhciB0ZWFtbWF0ZT1pbmRleCsyPjQ/aW5kZXgtMjppbmRleCsyO1xyXG4gICAgICAgIHZhciBlbmVteTE9aW5kZXgrMT40P2luZGV4LTM6aW5kZXgrMTtcclxuICAgICAgICB2YXIgZW5lbXkyPXRlYW1tYXRlKzE+ND90ZWFtbWF0ZS0zOnRlYW1tYXRlKzE7XHJcblx0XHRlbmVteTEgPSBjYy5maW5kKFwiQ2FudmFzL1BlcnNvbnMvUGVyc29uXCIrZW5lbXkxKS5nZXRDb21wb25lbnQoJ1BlcnNvbicpO1xyXG5cdFx0ZW5lbXkyID0gY2MuZmluZChcIkNhbnZhcy9QZXJzb25zL1BlcnNvblwiK2VuZW15MikuZ2V0Q29tcG9uZW50KCdQZXJzb24nKTtcclxuXHRcdGlmIChkaXNbZW5lbXkxLnBvc1hdW2VuZW15MS5wb3NZXSA8PSA1KVxyXG5cdFx0XHRlbmVteTEuYmxvb2QgLT0gcm9sZS5hdHRhY2s7XHJcblx0XHRpZiAoZGlzW2VuZW15Mi5wb3NYXVtlbmVteTIucG9zWV0gPD0gNSlcclxuXHRcdFx0ZW5lbXkyLmJsb29kIC09IHJvbGUuYXR0YWNrO1xyXG5cdFx0cm9sZS5nZXRDb21wb25lbnQoJ1BlcnNvbicpLm1vYmlsaXR5LT1jYXJkLmNhcmRDb3N0WzFdO1xyXG4gICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9EZWNrJykuZ2V0Q29tcG9uZW50KCdEZWNrJykucmVtb3ZlQ2FyZCgxKTtcclxuXHR9LFxyXG5cdFxyXG5cdG1pbmVfMjogZnVuY3Rpb24oY2FyZCkge1xyXG5cdFx0dmFyIHJvbGU9Y2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdnbG9iYWxHYW1lJykubm93UHJvcGVydHk7XHJcblx0XHR2YXIgbWFwID0gY2MuZmluZCgnQ2FudmFzL21hcCcpLmdldENvbXBvbmVudCgnR2V0TWFwJyk7XHJcblx0XHRtYXAubWFwW3JvbGUucG9zWF1bcm9sZS5wb3NZXS5nZXRDb21wb25lbnQoJ0NlbGwnKS5oYXZlTWluZSA9IDE7XHJcblx0XHRtYXAubWFwW3JvbGUucG9zWF1bcm9sZS5wb3NZXS5nZXRDb21wb25lbnQoJ0NlbGwnKS5taW5lQXR0YWNrID0gcm9sZS5hdHRhY2sgKiAyO1xyXG5cdFx0cm9sZS5nZXRDb21wb25lbnQoJ1BlcnNvbicpLm1vYmlsaXR5LT1jYXJkLmNhcmRDb3N0WzJdO1xyXG4gICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9EZWNrJykuZ2V0Q29tcG9uZW50KCdEZWNrJykucmVtb3ZlQ2FyZCgyKTtcclxuXHR9LFxyXG5cdFxyXG4gICAgc2hpZWxkXzM6ZnVuY3Rpb24oY2FyZCl7XHJcbiAgICAgICAgdmFyIHJvbGU9Y2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdnbG9iYWxHYW1lJykubm93UHJvcGVydHk7XHJcbiAgICAgICAgcm9sZS5zaGllbGQ9MTtcclxuICAgICAgICByb2xlLm1vYmlsaXR5LT1jYXJkLmNhcmRDb3N0WzNdO1xyXG4gICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9EZWNrJykuZ2V0Q29tcG9uZW50KCdEZWNrJykucmVtb3ZlQ2FyZCgzKTtcclxuICAgIH0sXHJcbiAgICBoYWxmU2hpZWxkXzQ6ZnVuY3Rpb24oY2FyZCl7XHJcbiAgICAgICAgdmFyIHJvbGU9Y2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdnbG9iYWxHYW1lJykubm93UGxheWVyO1xyXG4gICAgICAgIHZhciBpbmRleD1OdW1iZXIocm9sZS5uYW1lWzZdKTtcclxuICAgICAgICB2YXIgdGVhbW1hdGU9aW5kZXgrMj40P2luZGV4LTI6aW5kZXgrMjtcclxuICAgICAgICB0ZWFtbWF0ZT1jYy5maW5kKFwiQ2FudmFzL1BlcnNvbnMvUGVyc29uXCIrdGVhbW1hdGUpLmdldENvbXBvbmVudCgnUGVyc29uJyk7XHJcblx0XHRyb2xlID0gY2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdnbG9iYWxHYW1lJykubm93UHJvcGVydHk7XHJcbiAgICAgICAgcm9sZS5oYWxmU2hpZWxkKz0xO1xyXG4gICAgICAgIGlmICh0ZWFtbWF0ZS5pc0RlYWQ9PTApXHJcbiAgICAgICAgICAgIHRlYW1tYXRlLmhhbGZTaGllbGQrPTE7XHJcbiAgICAgICAgcm9sZS5tb2JpbGl0eS09Y2FyZC5jYXJkQ29zdFs0XTtcclxuICAgICAgICBjYy5maW5kKCdDYW52YXMvRGVjaycpLmdldENvbXBvbmVudCgnRGVjaycpLnJlbW92ZUNhcmQoNCk7XHJcbiAgICB9LFxyXG4gICAgYmxlc3NfNTpmdW5jdGlvbihjYXJkKXtcclxuICAgICAgICB2YXIgcm9sZT1jYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoJ2dsb2JhbEdhbWUnKS5ub3dQbGF5ZXI7XHJcbiAgICAgICAgdmFyIGluZGV4PU51bWJlcihyb2xlLm5hbWVbNl0pO1xyXG4gICAgICAgIHZhciB0ZWFtbWF0ZT1pbmRleCsyPjQ/aW5kZXgtMjppbmRleCsyO1xyXG4gICAgICAgIHJvbGUuZ2V0Q29tcG9uZW50KCdQZXJzb24nKS5hdHRjYWsrPTE7XHJcbiAgICAgICAgY2MuZmluZChcIkNhbnZhcy9QZXJzb25zL1BlcnNvblwiK3RlYW1tYXRlKS5nZXRDb21wb25lbnQoJ1BlcnNvbicpLmF0dGFjays9MTsgICAgXHJcbiAgICAgICAgdmFyIGJ1ZmY9Y2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdCdWZmJyk7XHJcbiAgICAgICAgYnVmZi50b2RvTGlzdC5wdXNoKHtcclxuICAgICAgICAgICAgZW5kVHVybjp3aW5kb3cuZ2xvYmFsLm5vd1R1cm4rMixcclxuICAgICAgICAgICAgcGVyc29uOnJvbGUsXHJcbiAgICAgICAgICAgIGFjdDpmdW5jdGlvbigpe1xyXG5cdFx0XHRcdGlmICh0aGlzLnBlcnNvbiAhPSBjYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoJ2dsb2JhbEdhbWUnKS5ub3dQbGF5ZXIpXHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBlcnNvbi5nZXRDb21wb25lbnQoJ1BlcnNvbicpLmF0dGFjaz1NYXRoLm1heCgwLHRoaXMucGVyc29uLmdldENvbXBvbmVudCgnUGVyc29uJykuYXR0YWNrLTEpO1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblx0XHRidWZmLnRvZG9MaXN0LnB1c2goe1xyXG4gICAgICAgICAgICBlbmRUdXJuOndpbmRvdy5nbG9iYWwubm93VHVybisyLFxyXG4gICAgICAgICAgICBwZXJzb246Y2MuZmluZChcIkNhbnZhcy9QZXJzb25zL1BlcnNvblwiK3RlYW1tYXRlKSxcclxuICAgICAgICAgICAgYWN0OmZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0aWYgKHRoaXMucGVyc29uICE9IGNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudCgnZ2xvYmFsR2FtZScpLm5vd1BsYXllcilcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGVyc29uLmdldENvbXBvbmVudCgnUGVyc29uJykuYXR0YWNrPU1hdGgubWF4KDAsdGhpcy5wZXJzb24uZ2V0Q29tcG9uZW50KCdQZXJzb24nKS5hdHRhY2stMSk7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByb2xlLmdldENvbXBvbmVudCgnUGVyc29uJykubW9iaWxpdHktPWNhcmQuY2FyZENvc3RbNV07XHJcbiAgICAgICAgY2MuZmluZCgnQ2FudmFzL0RlY2snKS5nZXRDb21wb25lbnQoJ0RlY2snKS5yZW1vdmVDYXJkKDUpOyAgICAgICAgXHJcbiAgICB9LFxyXG4gICAgd2Vha182OmZ1bmN0aW9uKGNhcmQpe1xyXG4gICAgICAgIHZhciByb2xlPWNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudCgnZ2xvYmFsR2FtZScpLm5vd1BsYXllcjtcclxuICAgICAgICB2YXIgaW5kZXg9TnVtYmVyKHJvbGUubmFtZVs2XSk7XHJcbiAgICAgICAgdmFyIHRlYW1tYXRlPWluZGV4KzI+ND9pbmRleC0yOmluZGV4KzI7XHJcbiAgICAgICAgdmFyIGVuZW15MT1pbmRleCsxPjQ/aW5kZXgtMzppbmRleCsxO1xyXG4gICAgICAgIHZhciBlbmVteTI9dGVhbW1hdGUrMT40P3RlYW1tYXRlLTM6dGVhbW1hdGUrMTtcclxuICAgICAgICBlbmVteTE9Y2MuZmluZChcIkNhbnZhcy9QZXJzb25zL1BlcnNvblwiK2VuZW15MSkuZ2V0Q29tcG9uZW50KCdQZXJzb24nKTtcclxuICAgICAgICBlbmVteTI9Y2MuZmluZChcIkNhbnZhcy9QZXJzb25zL1BlcnNvblwiK2VuZW15MikuZ2V0Q29tcG9uZW50KCdQZXJzb24nKTtcclxuICAgICAgICB2YXIgYnVmZj1jYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoJ0J1ZmYnKTtcclxuICAgICAgICBidWZmLnRvZG9MaXN0LnB1c2goe1xyXG4gICAgICAgICAgICBlbmRUdXJuOndpbmRvdy5nbG9iYWwubm93VHVybisyLFxyXG4gICAgICAgICAgICBwZXJzb246W2VuZW15MSxlbmVteTEuYXR0YWNrIT0wXSxcclxuICAgICAgICAgICAgYWN0OmZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0aWYgKHRoaXMucGVyc29uWzBdICE9IGNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudCgnZ2xvYmFsR2FtZScpLm5vd1Byb3BlcnR5KVxyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wZXJzb25bMF0uYXR0YWNrKz10aGlzLnBlcnNvblsxXTtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pOyBcclxuXHRcdGJ1ZmYudG9kb0xpc3QucHVzaCh7XHJcbiAgICAgICAgICAgIGVuZFR1cm46d2luZG93Lmdsb2JhbC5ub3dUdXJuKzIsXHJcbiAgICAgICAgICAgIHBlcnNvbjpbZW5lbXkyLGVuZW15Mi5hdHRhY2shPTBdLFxyXG4gICAgICAgICAgICBhY3Q6ZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRpZiAodGhpcy5wZXJzb25bMF0gIT0gY2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdnbG9iYWxHYW1lJykubm93UHJvcGVydHkpXHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBlcnNvblswXS5hdHRhY2srPXRoaXMucGVyc29uWzFdO1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZW5lbXkxLmF0dGFjaz1NYXRoLm1heCgwLGVuZW15MS5hdHRhY2stMSk7XHJcbiAgICAgICAgZW5lbXkyLmF0dGFjaz1NYXRoLm1heCgwLGVuZW15Mi5hdHRhY2stMSk7XHJcbiAgICAgICAgcm9sZS5nZXRDb21wb25lbnQoJ1BlcnNvbicpLm1vYmlsaXR5LT1jYXJkLmNhcmRDb3N0WzZdO1xyXG4gICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9EZWNrJykuZ2V0Q29tcG9uZW50KCdEZWNrJykucmVtb3ZlQ2FyZCg2KTtcclxuICAgICAgICBcclxuICAgIH0sXHJcblx0XHJcblx0dGVhbUZvcmNlXzc6IGZ1bmN0aW9uKGNhcmQpIHtcclxuXHRcdHZhciByb2xlPWNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudCgnZ2xvYmFsR2FtZScpLm5vd1BsYXllcjtcclxuICAgICAgICB2YXIgaW5kZXg9TnVtYmVyKHJvbGUubmFtZVs2XSk7XHJcbiAgICAgICAgdmFyIHRlYW1tYXRlPWluZGV4KzI+ND9pbmRleC0yOmluZGV4KzI7XHJcbiAgICAgICAgdmFyIGVuZW15MT1pbmRleCsxPjQ/aW5kZXgtMzppbmRleCsxO1xyXG4gICAgICAgIHZhciBlbmVteTI9dGVhbW1hdGUrMT40P3RlYW1tYXRlLTM6dGVhbW1hdGUrMTtcclxuICAgICAgICByb2xlPWNjLmZpbmQoXCJDYW52YXMvUGVyc29ucy9QZXJzb25cIitpbmRleCkuZ2V0Q29tcG9uZW50KCdQZXJzb24nKTtcclxuICAgICAgICB0ZWFtbWF0ZT1jYy5maW5kKFwiQ2FudmFzL1BlcnNvbnMvUGVyc29uXCIrdGVhbW1hdGUpLmdldENvbXBvbmVudCgnUGVyc29uJyk7XHJcbiAgICAgICAgZW5lbXkxPWNjLmZpbmQoXCJDYW52YXMvUGVyc29ucy9QZXJzb25cIitlbmVteTEpLmdldENvbXBvbmVudCgnUGVyc29uJyk7XHJcbiAgICAgICAgZW5lbXkyPWNjLmZpbmQoXCJDYW52YXMvUGVyc29ucy9QZXJzb25cIitlbmVteTIpLmdldENvbXBvbmVudCgnUGVyc29uJyk7XHJcblx0XHRpZiAodGVhbW1hdGUuaXNEZWFkID09IDEpXHJcblx0XHRcdGNjLmZpbmQoJ0NhbnZhcy9EZWNrJykuZ2V0Q29tcG9uZW50KCdEZWNrJykuc2hvd1RpcHMoJ+mYn+WPi+W3suatu+S6oe+8jOeZvee7mSBRQVEnKTtcclxuXHRcdGVsc2UgaWYgKDcgaW4gdGVhbW1hdGUuY2FyZHMpIHtcclxuXHRcdFx0aWYgKHRlYW1tYXRlLm1vYmlsaXR5IDwgNSlcclxuXHRcdFx0XHRjYy5maW5kKCdDYW52YXMvRGVjaycpLmdldENvbXBvbmVudCgnRGVjaycpLnNob3dUaXBzKCfpmJ/lj4vooYzliqjlgLzkuI3otrPvvIznmb3nu5kgUUFRJyk7XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdGVuZW15MS5ibG9vZCAtPSAzO1xyXG5cdFx0XHRcdGVuZW15Mi5ibG9vZCAtPSAzO1xyXG5cdFx0XHRcdGlmIChlbmVteTEuYmxvb2QgPD0gMClcclxuXHRcdFx0XHRcdGVuZW15MS5pc0RlYWQgPSAxO1xyXG5cdFx0XHRcdGlmIChlbmVteTIuYmxvb2QgPD0gMClcclxuXHRcdFx0XHRcdGVuZW15Mi5pc0RlYWQgPSAxO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0Y2MuZmluZCgnQ2FudmFzL0RlY2snKS5nZXRDb21wb25lbnQoJ0RlY2snKS5zaG93VGlwcygn6Zif5Y+L5peg5q2k54mM77yM55m957uZIFFBUScpO1xyXG5cdFx0fVxyXG5cdFx0cm9sZS5tb2JpbGl0eS09Y2FyZC5jYXJkQ29zdFs3XTtcclxuICAgICAgICBjYy5maW5kKCdDYW52YXMvRGVjaycpLmdldENvbXBvbmVudCgnRGVjaycpLnJlbW92ZUNhcmQoNyk7XHJcblx0fSxcclxuXHRcclxuICAgIGhlYWxfODpmdW5jdGlvbihjYXJkKXtcclxuICAgICAgICB2YXIgcm9sZT1jYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoJ2dsb2JhbEdhbWUnKS5ub3dQcm9wZXJ0eTtcclxuICAgICAgICByb2xlLmJsb29kKz0xO1xyXG4gICAgICAgIHJvbGUubW9iaWxpdHktPWNhcmQuY2FyZENvc3RbOF07XHJcbiAgICAgICAgY2MuZmluZCgnQ2FudmFzL0RlY2snKS5nZXRDb21wb25lbnQoJ0RlY2snKS5yZW1vdmVDYXJkKDgpO1xyXG4gICAgfSxcclxuICAgIGhvbHlOb3ZhXzk6ZnVuY3Rpb24oY2FyZCl7XHJcbiAgICAgICAgdmFyIHJvbGU9Y2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdnbG9iYWxHYW1lJykubm93UGxheWVyO1xyXG4gICAgICAgIHZhciBpbmRleD1OdW1iZXIocm9sZS5uYW1lWzZdKTtcclxuICAgICAgICB2YXIgdGVhbW1hdGU9aW5kZXgrMj40P2luZGV4LTI6aW5kZXgrMjtcclxuICAgICAgICB2YXIgZW5lbXkxPWluZGV4KzE+ND9pbmRleC0zOmluZGV4KzE7XHJcbiAgICAgICAgdmFyIGVuZW15Mj10ZWFtbWF0ZSsxPjQ/dGVhbW1hdGUtMzp0ZWFtbWF0ZSsxO1xyXG4gICAgICAgIHJvbGU9Y2MuZmluZChcIkNhbnZhcy9QZXJzb25zL1BlcnNvblwiK2luZGV4KS5nZXRDb21wb25lbnQoJ1BlcnNvbicpO1xyXG4gICAgICAgIHRlYW1tYXRlPWNjLmZpbmQoXCJDYW52YXMvUGVyc29ucy9QZXJzb25cIit0ZWFtbWF0ZSkuZ2V0Q29tcG9uZW50KCdQZXJzb24nKTtcclxuICAgICAgICBlbmVteTE9Y2MuZmluZChcIkNhbnZhcy9QZXJzb25zL1BlcnNvblwiK2VuZW15MSkuZ2V0Q29tcG9uZW50KCdQZXJzb24nKTtcclxuICAgICAgICBlbmVteTI9Y2MuZmluZChcIkNhbnZhcy9QZXJzb25zL1BlcnNvblwiK2VuZW15MikuZ2V0Q29tcG9uZW50KCdQZXJzb24nKTtcclxuICAgICAgICBpZiAocm9sZS5pc0RlYWQ9PTApXHJcbiAgICAgICAgICAgIHJvbGUuYmxvb2QrPTI7XHJcbiAgICAgICAgaWYgKHRlYW1tYXRlLmlzRGVhZD09MClcclxuICAgICAgICAgICAgdGVhbW1hdGUuYmxvb2QrPTI7XHJcbiAgICAgICAgaWYgKGVuZW15MS5pc0RlYWQ9PTApXHJcbiAgICAgICAgICAgIGVuZW15MS5ibG9vZCs9MTtcclxuICAgICAgICBpZiAoZW5lbXkyLmlzRGVhZD09MClcclxuICAgICAgICAgICAgZW5lbXkyLmJsb29kKz0xO1xyXG4gICAgICAgIHJvbGUubW9iaWxpdHktPWNhcmQuY2FyZENvc3RbOV07XHJcbiAgICAgICAgY2MuZmluZCgnQ2FudmFzL0RlY2snKS5nZXRDb21wb25lbnQoJ0RlY2snKS5yZW1vdmVDYXJkKDkpO1xyXG4gICAgfSxcclxuXHRcclxuXHR0ZWxlc2NvcGVfMTA6IGZ1bmN0aW9uKGNhcmQpIHtcclxuXHRcdHZhciByb2xlPWNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudCgnZ2xvYmFsR2FtZScpLm5vd1Byb3BlcnR5O1xyXG5cdFx0cm9sZS5zaWdodCsrO1xyXG5cdFx0dmFyIGJ1ZmY9Y2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdCdWZmJyk7XHJcbiAgICAgICAgYnVmZi50b2RvTGlzdC5wdXNoKHtcclxuICAgICAgICAgICAgZW5kVHVybjp3aW5kb3cuZ2xvYmFsLm5vd1R1cm4rNSxcclxuICAgICAgICAgICAgcGVyc29uOnJvbGUsXHJcbiAgICAgICAgICAgIGFjdDpmdW5jdGlvbigpe1xyXG5cdFx0XHRcdGlmICh0aGlzLnBlcnNvbiAhPSBjYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoJ2dsb2JhbEdhbWUnKS5ub3dQcm9wZXJ0eSlcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGVyc29uLnNpZ2h0LS07XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByb2xlLm1vYmlsaXR5LT1jYXJkLmNhcmRDb3N0WzEwXTtcclxuICAgICAgICBjYy5maW5kKCdDYW52YXMvRGVjaycpLmdldENvbXBvbmVudCgnRGVjaycpLnJlbW92ZUNhcmQoMTApOyAgICAgICAgXHJcblx0fSxcclxuXHRleWVfMTE6ZnVuY3Rpb24oY2FyZCl7XHJcblx0XHRjYy5maW5kKCdDYW52YXMvRGVjaycpLmFjdGl2ZSA9IGZhbHNlOy8v5pqC5pe25LiN6K6p54K55omL54mM5aCGXHJcblx0XHRjYy5maW5kKCdDYW52YXMvZW5kX2NhcmRfYnRuJykuYWN0aXZlID0gZmFsc2U7Ly/mmoLml7bkuI3orqnnu5PmnZ/lh7rniYxcclxuXHRcdGNjLmZpbmQoJ0NhbnZhcy9EZWNrJykuZ2V0Q29tcG9uZW50KCdEZWNrJykuc2hvd1RpcHMoXCLor7fpgInmi6nopoHmlL7nva7nnLznnZvnmoTlnLDlm77lnZdcIik7XHJcblx0XHR2YXIgbWFwID0gY2MuZmluZCgnQ2FudmFzL21hcCcpLmdldENvbXBvbmVudCgnR2V0TWFwJyk7XHJcblx0XHRtYXAub3BlbkFsbE1vbml0b3IoJ2V5ZS1jZWxsLWNob3NlbicpO1x0XHRcclxuXHR9LFxyXG4gICAgdG91Z2hfMTI6ZnVuY3Rpb24oY2FyZCl7XHJcbiAgICAgICAgdmFyIHJvbGU9Y2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdnbG9iYWxHYW1lJykubm93UHJvcGVydHk7XHJcbiAgICAgICAgcm9sZS5hdHRhY2sqPTI7XHJcbiAgICAgICAgdmFyIGJ1ZmY9Y2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdCdWZmJyk7XHJcbiAgICAgICAgYnVmZi50b2RvTGlzdC5wdXNoKHtcclxuICAgICAgICAgICAgZW5kVHVybjp3aW5kb3cuZ2xvYmFsLm5vd1R1cm4rMSxcclxuICAgICAgICAgICAgcGVyc29uOnJvbGUsXHJcbiAgICAgICAgICAgIGFjdDpmdW5jdGlvbigpe1xyXG5cdFx0XHRcdGlmICh0aGlzLnBlcnNvbiAhPSBjYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoJ2dsb2JhbEdhbWUnKS5ub3dQcm9wZXJ0eSlcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGVyc29uLmF0dGFjaz1OdW1iZXIodGhpcy5wZXJzb24uYXR0YWNrLzIpO1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcm9sZS5tb2JpbGl0eS09Y2FyZC5jYXJkQ29zdFsxMl07XHJcbiAgICAgICAgY2MuZmluZCgnQ2FudmFzL0RlY2snKS5nZXRDb21wb25lbnQoJ0RlY2snKS5yZW1vdmVDYXJkKDEyKTsgICAgICAgIFxyXG4gICAgfSxcclxuXHRcclxuXHR3YWl0U3RlYWw6IGZ1bmN0aW9uKCkge1xyXG5cdFx0Ly90aGlzIOS4uuS6uueJqeeahHBlcnNvbi5qc1xyXG5cdFx0dmFyIHJvbGU9Y2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdnbG9iYWxHYW1lJykubm93UGxheWVyO1xyXG4gICAgICAgIHZhciBpbmRleD1OdW1iZXIocm9sZS5uYW1lWzZdKTtcclxuICAgICAgICB2YXIgdGVhbW1hdGU9aW5kZXgrMj40P2luZGV4LTI6aW5kZXgrMjtcclxuICAgICAgICB2YXIgZW5lbXkxPWluZGV4KzE+ND9pbmRleC0zOmluZGV4KzE7XHJcbiAgICAgICAgdmFyIGVuZW15Mj10ZWFtbWF0ZSsxPjQ/dGVhbW1hdGUtMzp0ZWFtbWF0ZSsxO1xyXG4gICAgICAgIHJvbGU9Y2MuZmluZChcIkNhbnZhcy9QZXJzb25zL1BlcnNvblwiK2luZGV4KS5nZXRDb21wb25lbnQoJ1BlcnNvbicpO1xyXG4gICAgICAgIHRlYW1tYXRlPWNjLmZpbmQoXCJDYW52YXMvUGVyc29ucy9QZXJzb25cIit0ZWFtbWF0ZSkuZ2V0Q29tcG9uZW50KCdQZXJzb24nKTtcclxuICAgICAgICBlbmVteTE9Y2MuZmluZChcIkNhbnZhcy9QZXJzb25zL1BlcnNvblwiK2VuZW15MSkuZ2V0Q29tcG9uZW50KCdQZXJzb24nKTtcclxuICAgICAgICBlbmVteTI9Y2MuZmluZChcIkNhbnZhcy9QZXJzb25zL1BlcnNvblwiK2VuZW15MikuZ2V0Q29tcG9uZW50KCdQZXJzb24nKTtcclxuXHRcdFxyXG5cdFx0aWYgKHRoaXMuY2FyZHMubGVuZ3RoID09IDApIHtcclxuXHRcdFx0Y2MuZmluZCgnQ2FudmFzL0RlY2snKS5nZXRDb21wb25lbnQoJ0RlY2snKS5zaG93VGlwcygn5peg5omL54mM5Y+v55uX5Y+WIFFBUScpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHZhciByZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSp0aGlzLmNhcmRzLmxlbmd0aCk7XHJcblx0XHRcdHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUod2luZG93Lmdsb2JhbC5jYXJkbm9kZVt0aGlzLmNhcmRzW3JkXV0pO1xyXG5cdFx0XHRub2RlLnNldFBvc2l0aW9uKDAsIDApO1xyXG5cdFx0XHRub2RlLm9uKCdtb3VzZWRvd24nLCBmdW5jdGlvbiAoIGV2ZW50ICkge1xyXG5cdFx0XHRcdHRoaXMuZGVzdHJveSgpO1xyXG5cdFx0XHR9LCBub2RlKTtcclxuXHRcdFx0bm9kZS5wYXJlbnQgPSB0aGlzLm5vZGUucGFyZW50LnBhcmVudDtcclxuXHRcdFx0XHJcblx0XHRcdHJvbGUuY2FyZHMucHVzaCh0aGlzLmNhcmRzW3JkXSk7XHJcblx0XHRcdHRoaXMuY2FyZHMuc3BsaWNlKHJkLCAxKTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0dGVhbW1hdGUuYXZhdGFyLm9mZignbW91c2Vkb3duJywgY2MuZmluZCgnQ2FudmFzL0NhcmQnKS5nZXRDb21wb25lbnQoJ0NhcmQnKS53YWl0U3RlYWwsIHRlYW1tYXRlKTtcclxuXHRcdGVuZW15MS5hdmF0YXIub2ZmKCdtb3VzZWRvd24nLCBjYy5maW5kKCdDYW52YXMvQ2FyZCcpLmdldENvbXBvbmVudCgnQ2FyZCcpLndhaXRTdGVhbCwgZW5lbXkxKTtcclxuXHRcdGVuZW15Mi5hdmF0YXIub2ZmKCdtb3VzZWRvd24nLCBjYy5maW5kKCdDYW52YXMvQ2FyZCcpLmdldENvbXBvbmVudCgnQ2FyZCcpLndhaXRTdGVhbCwgZW5lbXkyKTtcclxuXHRcdFxyXG5cdFx0Y2MuZmluZCgnQ2FudmFzL0RlY2snKS5hY3RpdmUgPSB0cnVlO1xyXG5cdFx0Y2MuZmluZCgnQ2FudmFzL2VuZF9jYXJkX2J0bicpLmFjdGl2ZSA9IHRydWU7XHJcblx0fSxcclxuXHRcclxuXHRzdGVhbF8xMzpmdW5jdGlvbihjYXJkKSB7XHJcblx0XHRjYy5maW5kKCdDYW52YXMvRGVjaycpLmFjdGl2ZSA9IGZhbHNlOy8v5pqC5pe25LiN6K6p54K55omL54mM5aCGXHJcblx0XHRjYy5maW5kKCdDYW52YXMvZW5kX2NhcmRfYnRuJykuYWN0aXZlID0gZmFsc2U7Ly/mmoLml7bkuI3orqnnu5PmnZ/lh7rniYxcclxuXHRcdHZhciByb2xlPWNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudCgnZ2xvYmFsR2FtZScpLm5vd1BsYXllcjtcclxuICAgICAgICB2YXIgaW5kZXg9TnVtYmVyKHJvbGUubmFtZVs2XSk7XHJcbiAgICAgICAgdmFyIHRlYW1tYXRlPWluZGV4KzI+ND9pbmRleC0yOmluZGV4KzI7XHJcbiAgICAgICAgdmFyIGVuZW15MT1pbmRleCsxPjQ/aW5kZXgtMzppbmRleCsxO1xyXG4gICAgICAgIHZhciBlbmVteTI9dGVhbW1hdGUrMT40P3RlYW1tYXRlLTM6dGVhbW1hdGUrMTtcclxuICAgICAgICByb2xlPWNjLmZpbmQoXCJDYW52YXMvUGVyc29ucy9QZXJzb25cIitpbmRleCkuZ2V0Q29tcG9uZW50KCdQZXJzb24nKTtcclxuICAgICAgICB0ZWFtbWF0ZT1jYy5maW5kKFwiQ2FudmFzL1BlcnNvbnMvUGVyc29uXCIrdGVhbW1hdGUpLmdldENvbXBvbmVudCgnUGVyc29uJyk7XHJcbiAgICAgICAgZW5lbXkxPWNjLmZpbmQoXCJDYW52YXMvUGVyc29ucy9QZXJzb25cIitlbmVteTEpLmdldENvbXBvbmVudCgnUGVyc29uJyk7XHJcbiAgICAgICAgZW5lbXkyPWNjLmZpbmQoXCJDYW52YXMvUGVyc29ucy9QZXJzb25cIitlbmVteTIpLmdldENvbXBvbmVudCgnUGVyc29uJyk7XHJcblx0XHR2YXIgbWlzdCA9IGNjLmZpbmQoJ0NhbnZhcy9taXN0JykuZ2V0Q29tcG9uZW50KCdNaXN0Jyk7XHJcblx0XHR2YXIgaGF2ZVBlb3BsZSA9IDA7XHJcblx0XHRpZiAobWlzdC5taXN0QXJyW3RlYW1tYXRlLnBvc1hdW3RlYW1tYXRlLnBvc1ldLmFjdGl2ZSA9PSBmYWxzZSkge1xyXG5cdFx0XHR0ZWFtbWF0ZS5hdmF0YXIub24oJ21vdXNlZG93bicsIGNhcmQud2FpdFN0ZWFsLCB0ZWFtbWF0ZSk7XHJcblx0XHRcdGhhdmVQZW9wbGUgPSAxO1xyXG5cdFx0fVxyXG5cdFx0aWYgKG1pc3QubWlzdEFycltlbmVteTEucG9zWF1bZW5lbXkxLnBvc1ldLmFjdGl2ZSA9PSBmYWxzZSkge1xyXG5cdFx0XHRlbmVteTEuYXZhdGFyLm9uKCdtb3VzZWRvd24nLCBjYXJkLndhaXRTdGVhbCwgZW5lbXkxKTtcclxuXHRcdFx0aGF2ZVBlb3BsZSA9IDE7XHJcblx0XHR9XHJcblx0XHRpZiAobWlzdC5taXN0QXJyW2VuZW15Mi5wb3NYXVtlbmVteTIucG9zWV0uYWN0aXZlID09IGZhbHNlKSB7XHJcblx0XHRcdGVuZW15Mi5hdmF0YXIub24oJ21vdXNlZG93bicsIGNhcmQud2FpdFN0ZWFsLCBlbmVteTIpO1xyXG5cdFx0XHRoYXZlUGVvcGxlID0gMTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0aWYgKGhhdmVQZW9wbGUgPT0gMClcclxuXHRcdFx0Y2MuZmluZCgnQ2FudmFzL0RlY2snKS5nZXRDb21wb25lbnQoJ0RlY2snKS5zaG93VGlwcygn6KeG6YeO5YaF5peg546p5a62IFFBUScpO1xyXG5cdFx0cm9sZS5tb2JpbGl0eS09Y2FyZC5jYXJkQ29zdFsxM107XHJcbiAgICAgICAgY2MuZmluZCgnQ2FudmFzL0RlY2snKS5nZXRDb21wb25lbnQoJ0RlY2snKS5yZW1vdmVDYXJkKDEzKTtcclxuXHR9LFxyXG5cdFxyXG5cdHN0b3BNb3ZlOiBmdW5jdGlvbigpIHtcclxuXHRcdC8vdGhpc+S4uuS6uueJqeeahHBlcnNvbi5qc1xyXG5cdFx0dmFyIHJvbGU9Y2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdnbG9iYWxHYW1lJykubm93UGxheWVyO1xyXG4gICAgICAgIHZhciBpbmRleD1OdW1iZXIocm9sZS5uYW1lWzZdKTtcclxuICAgICAgICB2YXIgdGVhbW1hdGU9aW5kZXgrMj40P2luZGV4LTI6aW5kZXgrMjtcclxuICAgICAgICB2YXIgZW5lbXkxPWluZGV4KzE+ND9pbmRleC0zOmluZGV4KzE7XHJcbiAgICAgICAgdmFyIGVuZW15Mj10ZWFtbWF0ZSsxPjQ/dGVhbW1hdGUtMzp0ZWFtbWF0ZSsxO1xyXG4gICAgICAgIHJvbGU9Y2MuZmluZChcIkNhbnZhcy9QZXJzb25zL1BlcnNvblwiK2luZGV4KS5nZXRDb21wb25lbnQoJ1BlcnNvbicpO1xyXG4gICAgICAgIHRlYW1tYXRlPWNjLmZpbmQoXCJDYW52YXMvUGVyc29ucy9QZXJzb25cIit0ZWFtbWF0ZSkuZ2V0Q29tcG9uZW50KCdQZXJzb24nKTtcclxuICAgICAgICBlbmVteTE9Y2MuZmluZChcIkNhbnZhcy9QZXJzb25zL1BlcnNvblwiK2VuZW15MSkuZ2V0Q29tcG9uZW50KCdQZXJzb24nKTtcclxuICAgICAgICBlbmVteTI9Y2MuZmluZChcIkNhbnZhcy9QZXJzb25zL1BlcnNvblwiK2VuZW15MikuZ2V0Q29tcG9uZW50KCdQZXJzb24nKTtcclxuXHRcdFxyXG5cdFx0dGhpcy5nb0VuYWJsZWQgPSAwO1xyXG5cdFx0ZW5lbXkxLmF2YXRhci5vZmYoJ21vdXNlZG93bicsIGNjLmZpbmQoJ0NhbnZhcy9DYXJkJykuZ2V0Q29tcG9uZW50KCdDYXJkJykuc3RvcE1vdmUsIGVuZW15MSk7XHJcblx0XHRlbmVteTIuYXZhdGFyLm9mZignbW91c2Vkb3duJywgY2MuZmluZCgnQ2FudmFzL0NhcmQnKS5nZXRDb21wb25lbnQoJ0NhcmQnKS5zdG9wTW92ZSwgZW5lbXkyKTtcclxuXHRcdFxyXG5cdFx0Y2MuZmluZCgnQ2FudmFzL0RlY2snKS5hY3RpdmUgPSB0cnVlO1xyXG5cdFx0Y2MuZmluZCgnQ2FudmFzL2VuZF9jYXJkX2J0bicpLmFjdGl2ZSA9IHRydWU7XHJcblx0fSxcclxuXHRcclxuXHR0aWVfMTQ6IGZ1bmN0aW9uKGNhcmQpIHtcclxuXHRcdGNjLmZpbmQoJ0NhbnZhcy9EZWNrJykuYWN0aXZlID0gZmFsc2U7Ly/mmoLml7bkuI3orqnngrnmiYvniYzloIZcclxuXHRcdGNjLmZpbmQoJ0NhbnZhcy9lbmRfY2FyZF9idG4nKS5hY3RpdmUgPSBmYWxzZTsvL+aaguaXtuS4jeiuqee7k+adn+WHuueJjFxyXG5cdFx0dmFyIHJvbGU9Y2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdnbG9iYWxHYW1lJykubm93UGxheWVyO1xyXG4gICAgICAgIHZhciBpbmRleD1OdW1iZXIocm9sZS5uYW1lWzZdKTtcclxuICAgICAgICB2YXIgdGVhbW1hdGU9aW5kZXgrMj40P2luZGV4LTI6aW5kZXgrMjtcclxuICAgICAgICB2YXIgZW5lbXkxPWluZGV4KzE+ND9pbmRleC0zOmluZGV4KzE7XHJcbiAgICAgICAgdmFyIGVuZW15Mj10ZWFtbWF0ZSsxPjQ/dGVhbW1hdGUtMzp0ZWFtbWF0ZSsxO1xyXG4gICAgICAgIHJvbGU9Y2MuZmluZChcIkNhbnZhcy9QZXJzb25zL1BlcnNvblwiK2luZGV4KS5nZXRDb21wb25lbnQoJ1BlcnNvbicpO1xyXG4gICAgICAgIHRlYW1tYXRlPWNjLmZpbmQoXCJDYW52YXMvUGVyc29ucy9QZXJzb25cIit0ZWFtbWF0ZSkuZ2V0Q29tcG9uZW50KCdQZXJzb24nKTtcclxuICAgICAgICBlbmVteTE9Y2MuZmluZChcIkNhbnZhcy9QZXJzb25zL1BlcnNvblwiK2VuZW15MSkuZ2V0Q29tcG9uZW50KCdQZXJzb24nKTtcclxuICAgICAgICBlbmVteTI9Y2MuZmluZChcIkNhbnZhcy9QZXJzb25zL1BlcnNvblwiK2VuZW15MikuZ2V0Q29tcG9uZW50KCdQZXJzb24nKTtcclxuXHRcdHZhciBtaXN0ID0gY2MuZmluZCgnQ2FudmFzL21pc3QnKS5nZXRDb21wb25lbnQoJ01pc3QnKTtcclxuXHRcdHZhciBoYXZlUGVvcGxlID0gMDtcclxuXHRcdGlmIChtaXN0Lm1pc3RBcnJbZW5lbXkxLnBvc1hdW2VuZW15MS5wb3NZXS5hY3RpdmUgPT0gZmFsc2UpIHtcclxuXHRcdFx0ZW5lbXkxLmF2YXRhci5vbignbW91c2Vkb3duJywgY2FyZC5zdG9wTW92ZSwgZW5lbXkxKTtcclxuXHRcdFx0aGF2ZVBlb3BsZSA9IDE7XHJcblx0XHR9XHJcblx0XHRpZiAobWlzdC5taXN0QXJyW2VuZW15Mi5wb3NYXVtlbmVteTIucG9zWV0uYWN0aXZlID09IGZhbHNlKSB7XHJcblx0XHRcdGVuZW15Mi5hdmF0YXIub24oJ21vdXNlZG93bicsIGNhcmQuc3RvcE1vdmUsIGVuZW15Mik7XHJcblx0XHRcdGhhdmVQZW9wbGUgPSAxO1xyXG5cdFx0fVxyXG5cdFx0aWYgKGhhdmVQZW9wbGUgPT0gMCkge1xyXG5cdFx0XHRjYy5maW5kKCdDYW52YXMvRGVjaycpLmdldENvbXBvbmVudCgnRGVjaycpLnNob3dUaXBzKCfop4bph47lhoXml6DmlYzkurogUUFRJyk7XHJcblx0XHRcdGNjLmZpbmQoJ0NhbnZhcy9EZWNrJykuYWN0aXZlID0gdHJ1ZTtcclxuXHRcdFx0Y2MuZmluZCgnQ2FudmFzL2VuZF9jYXJkX2J0bicpLmFjdGl2ZSA9IHRydWU7XHJcblx0XHR9XHJcblx0XHRyb2xlLm1vYmlsaXR5LT1jYXJkLmNhcmRDb3N0WzE0XTtcclxuICAgICAgICBjYy5maW5kKCdDYW52YXMvRGVjaycpLmdldENvbXBvbmVudCgnRGVjaycpLnJlbW92ZUNhcmQoMTQpO1xyXG5cdH0sXHJcblx0XHJcblx0c3RvcFVzZUNhcmQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0Ly90aGlz5Li65Lq654mp55qEcGVyc29uLmpzXHJcblx0XHR2YXIgcm9sZT1jYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoJ2dsb2JhbEdhbWUnKS5ub3dQbGF5ZXI7XHJcbiAgICAgICAgdmFyIGluZGV4PU51bWJlcihyb2xlLm5hbWVbNl0pO1xyXG4gICAgICAgIHZhciB0ZWFtbWF0ZT1pbmRleCsyPjQ/aW5kZXgtMjppbmRleCsyO1xyXG4gICAgICAgIHZhciBlbmVteTE9aW5kZXgrMT40P2luZGV4LTM6aW5kZXgrMTtcclxuICAgICAgICB2YXIgZW5lbXkyPXRlYW1tYXRlKzE+ND90ZWFtbWF0ZS0zOnRlYW1tYXRlKzE7XHJcbiAgICAgICAgcm9sZT1jYy5maW5kKFwiQ2FudmFzL1BlcnNvbnMvUGVyc29uXCIraW5kZXgpLmdldENvbXBvbmVudCgnUGVyc29uJyk7XHJcbiAgICAgICAgdGVhbW1hdGU9Y2MuZmluZChcIkNhbnZhcy9QZXJzb25zL1BlcnNvblwiK3RlYW1tYXRlKS5nZXRDb21wb25lbnQoJ1BlcnNvbicpO1xyXG4gICAgICAgIGVuZW15MT1jYy5maW5kKFwiQ2FudmFzL1BlcnNvbnMvUGVyc29uXCIrZW5lbXkxKS5nZXRDb21wb25lbnQoJ1BlcnNvbicpO1xyXG4gICAgICAgIGVuZW15Mj1jYy5maW5kKFwiQ2FudmFzL1BlcnNvbnMvUGVyc29uXCIrZW5lbXkyKS5nZXRDb21wb25lbnQoJ1BlcnNvbicpO1xyXG5cdFx0XHJcblx0XHR0aGlzLnVzZUNhcmRFbmFibGVkID0gMDtcclxuXHRcdGVuZW15MS5hdmF0YXIub2ZmKCdtb3VzZWRvd24nLCBjYy5maW5kKCdDYW52YXMvQ2FyZCcpLmdldENvbXBvbmVudCgnQ2FyZCcpLnN0b3BVc2VDYXJkLCBlbmVteTEpO1xyXG5cdFx0ZW5lbXkyLmF2YXRhci5vZmYoJ21vdXNlZG93bicsIGNjLmZpbmQoJ0NhbnZhcy9DYXJkJykuZ2V0Q29tcG9uZW50KCdDYXJkJykuc3RvcFVzZUNhcmQsIGVuZW15Mik7XHJcblx0XHRcclxuXHRcdGNjLmZpbmQoJ0NhbnZhcy9EZWNrJykuYWN0aXZlID0gdHJ1ZTtcclxuXHRcdGNjLmZpbmQoJ0NhbnZhcy9lbmRfY2FyZF9idG4nKS5hY3RpdmUgPSB0cnVlO1xyXG5cdH0sXHJcblx0XHJcblx0Y29uZnVzZV8xNTogZnVuY3Rpb24oY2FyZCkge1xyXG5cdFx0Y2MuZmluZCgnQ2FudmFzL0RlY2snKS5hY3RpdmUgPSBmYWxzZTsvL+aaguaXtuS4jeiuqeeCueaJi+eJjOWghlxyXG5cdFx0Y2MuZmluZCgnQ2FudmFzL2VuZF9jYXJkX2J0bicpLmFjdGl2ZSA9IGZhbHNlOy8v5pqC5pe25LiN6K6p57uT5p2f5Ye654mMXHJcblx0XHR2YXIgcm9sZT1jYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoJ2dsb2JhbEdhbWUnKS5ub3dQbGF5ZXI7XHJcbiAgICAgICAgdmFyIGluZGV4PU51bWJlcihyb2xlLm5hbWVbNl0pO1xyXG4gICAgICAgIHZhciB0ZWFtbWF0ZT1pbmRleCsyPjQ/aW5kZXgtMjppbmRleCsyO1xyXG4gICAgICAgIHZhciBlbmVteTE9aW5kZXgrMT40P2luZGV4LTM6aW5kZXgrMTtcclxuICAgICAgICB2YXIgZW5lbXkyPXRlYW1tYXRlKzE+ND90ZWFtbWF0ZS0zOnRlYW1tYXRlKzE7XHJcbiAgICAgICAgcm9sZT1jYy5maW5kKFwiQ2FudmFzL1BlcnNvbnMvUGVyc29uXCIraW5kZXgpLmdldENvbXBvbmVudCgnUGVyc29uJyk7XHJcbiAgICAgICAgdGVhbW1hdGU9Y2MuZmluZChcIkNhbnZhcy9QZXJzb25zL1BlcnNvblwiK3RlYW1tYXRlKS5nZXRDb21wb25lbnQoJ1BlcnNvbicpO1xyXG4gICAgICAgIGVuZW15MT1jYy5maW5kKFwiQ2FudmFzL1BlcnNvbnMvUGVyc29uXCIrZW5lbXkxKS5nZXRDb21wb25lbnQoJ1BlcnNvbicpO1xyXG4gICAgICAgIGVuZW15Mj1jYy5maW5kKFwiQ2FudmFzL1BlcnNvbnMvUGVyc29uXCIrZW5lbXkyKS5nZXRDb21wb25lbnQoJ1BlcnNvbicpO1xyXG5cdFx0dmFyIG1pc3QgPSBjYy5maW5kKCdDYW52YXMvbWlzdCcpLmdldENvbXBvbmVudCgnTWlzdCcpO1xyXG5cdFx0dmFyIGhhdmVQZW9wbGUgPSAwO1xyXG5cdFx0aWYgKG1pc3QubWlzdEFycltlbmVteTEucG9zWF1bZW5lbXkxLnBvc1ldLmFjdGl2ZSA9PSBmYWxzZSkge1xyXG5cdFx0XHRlbmVteTEuYXZhdGFyLm9uKCdtb3VzZWRvd24nLCBjYXJkLnN0b3BVc2VDYXJkLCBlbmVteTEpO1xyXG5cdFx0XHRoYXZlUGVvcGxlID0gMTtcclxuXHRcdH1cclxuXHRcdGlmIChtaXN0Lm1pc3RBcnJbZW5lbXkyLnBvc1hdW2VuZW15Mi5wb3NZXS5hY3RpdmUgPT0gZmFsc2UpIHtcclxuXHRcdFx0ZW5lbXkyLmF2YXRhci5vbignbW91c2Vkb3duJywgY2FyZC5zdG9wVXNlQ2FyZCwgZW5lbXkyKTtcclxuXHRcdFx0aGF2ZVBlb3BsZSA9IDE7XHJcblx0XHR9XHJcblx0XHRpZiAoaGF2ZVBlb3BsZSA9PSAwKSB7XHJcblx0XHRcdGNjLmZpbmQoJ0NhbnZhcy9EZWNrJykuZ2V0Q29tcG9uZW50KCdEZWNrJykuc2hvd1RpcHMoJ+inhumHjuWGheaXoOaVjOS6uiBRQVEnKTtcclxuXHRcdFx0Y2MuZmluZCgnQ2FudmFzL0RlY2snKS5hY3RpdmUgPSB0cnVlO1xyXG5cdFx0XHRjYy5maW5kKCdDYW52YXMvZW5kX2NhcmRfYnRuJykuYWN0aXZlID0gdHJ1ZTtcclxuXHRcdH1cclxuXHRcdHJvbGUubW9iaWxpdHktPWNhcmQuY2FyZENvc3RbMTVdO1xyXG4gICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9EZWNrJykuZ2V0Q29tcG9uZW50KCdEZWNrJykucmVtb3ZlQ2FyZCgxNSk7XHJcblx0fSxcclxuXHRcclxuICAgIHNhdmVfMTY6ZnVuY3Rpb24oY2FyZCl7XHJcbiAgICAgICAgdmFyIHJvbGU9Y2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdnbG9iYWxHYW1lJykubm93UGxheWVyO1xyXG4gICAgICAgIHZhciBpbmRleD1OdW1iZXIocm9sZS5uYW1lWzZdKTtcclxuICAgICAgICB2YXIgdGVhbW1hdGU9aW5kZXgrMj40P2luZGV4LTI6aW5kZXgrMjtcclxuICAgICAgICB0ZWFtbWF0ZT1jYy5maW5kKFwiQ2FudmFzL1BlcnNvbnMvUGVyc29uXCIrdGVhbW1hdGUpLmdldENvbXBvbmVudCgnUGVyc29uJyk7XHJcbiAgICAgICAgaWYgKHRlYW1tYXRlLmlzRGVhZD09MSl7XHJcbiAgICAgICAgICAgIHRlYW1tYXRlLmlzRGVhZD0wO1xyXG4gICAgICAgICAgICB0ZWFtbWF0ZS5ibG9vZD01O1xyXG4gICAgICAgICAgICB0ZWFtbWF0ZS5tb2JpbGl0eT0zO1xyXG4gICAgICAgIH1cclxuICAgICAgICByb2xlLmdldENvbXBvbmVudCgnUGVyc29uJykubW9iaWxpdHktPWNhcmQuY2FyZENvc3RbMTZdO1xyXG4gICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9EZWNrJykuZ2V0Q29tcG9uZW50KCdEZWNrJykucmVtb3ZlQ2FyZCgxNik7XHJcbiAgICB9LFxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICB0aGlzLmNhcmRDb3N0PVs0LDMsMiwzLDMsNCw0LDUsMiwzLDMsMywzLDMsNCw0LDVdO1xyXG4gICAgICAgIHRoaXMuY2FyZEZ1bmN0aW9uPW5ldyBBcnJheSgpO1xyXG5cdFx0dGhpcy5jYXJkRnVuY3Rpb25bMF09dGhpcy5ib29tXzA7XHJcblx0XHR0aGlzLmNhcmRGdW5jdGlvblsxXT10aGlzLm1pc3NpbGVfMTtcclxuXHRcdHRoaXMuY2FyZEZ1bmN0aW9uWzJdPXRoaXMubWluZV8yO1xyXG4gICAgICAgIHRoaXMuY2FyZEZ1bmN0aW9uWzNdPXRoaXMuc2hpZWxkXzM7XHJcbiAgICAgICAgdGhpcy5jYXJkRnVuY3Rpb25bNF09dGhpcy5oYWxmU2hpZWxkXzQ7XHJcbiAgICAgICAgdGhpcy5jYXJkRnVuY3Rpb25bNV09dGhpcy5ibGVzc181O1xyXG4gICAgICAgIHRoaXMuY2FyZEZ1bmN0aW9uWzZdPXRoaXMud2Vha182O1xyXG5cdFx0dGhpcy5jYXJkRnVuY3Rpb25bN109dGhpcy50ZWFtRm9yY2VfNztcclxuICAgICAgICB0aGlzLmNhcmRGdW5jdGlvbls4XT10aGlzLmhlYWxfODtcclxuICAgICAgICB0aGlzLmNhcmRGdW5jdGlvbls5XT10aGlzLmhvbHlOb3ZhXzk7XHJcblx0XHR0aGlzLmNhcmRGdW5jdGlvblsxMF09dGhpcy50ZWxlc2NvcGVfMTA7XHJcblx0XHR0aGlzLmNhcmRGdW5jdGlvblsxMV09dGhpcy5leWVfMTE7XHJcbiAgICAgICAgdGhpcy5jYXJkRnVuY3Rpb25bMTJdPXRoaXMudG91Z2hfMTI7XHJcblx0XHR0aGlzLmNhcmRGdW5jdGlvblsxM109dGhpcy5zdGVhbF8xMztcclxuXHRcdHRoaXMuY2FyZEZ1bmN0aW9uWzE0XT10aGlzLnRpZV8xNDtcclxuXHRcdHRoaXMuY2FyZEZ1bmN0aW9uWzE1XT10aGlzLmNvbmZ1c2VfMTU7XHJcbiAgICAgICAgdGhpcy5jYXJkRnVuY3Rpb25bMTZdPXRoaXMuc2F2ZV8xNjtcclxuXHRcdC8v5ZON5bqU5Y2h54mMMOeCuOW8uVxyXG5cdFx0Y2MuZ2FtZS5vbignYm9vbS1jZWxsLWNob3NlbicsIGZ1bmN0aW9uKHgsIHkpIHtcclxuXHRcdFx0dmFyIGJvb21fY2VsbCA9IFtbeCwgeV1dO1xyXG5cdFx0XHR2YXIgbWFwID0gY2MuZmluZCgnQ2FudmFzL21hcCcpLmdldENvbXBvbmVudCgnR2V0TWFwJyk7XHJcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbWFwLmFkalt4XVt5XS5sZW5ndGg7IGkrKylcclxuXHRcdFx0XHRib29tX2NlbGwucHVzaChtYXAuYWRqW3hdW3ldW2ldKTtcclxuXHRcdFx0dmFyIHJvbGU9Y2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdnbG9iYWxHYW1lJykubm93UGxheWVyO1xyXG5cdFx0XHR2YXIgaW5kZXg9TnVtYmVyKHJvbGUubmFtZVs2XSk7XHJcblx0XHRcdHZhciB0ZWFtbWF0ZT1pbmRleCsyPjQ/aW5kZXgtMjppbmRleCsyO1xyXG5cdFx0XHR2YXIgZW5lbXkxPWluZGV4KzE+ND9pbmRleC0zOmluZGV4KzE7XHJcblx0XHRcdHZhciBlbmVteTI9dGVhbW1hdGUrMT40P3RlYW1tYXRlLTM6dGVhbW1hdGUrMTtcclxuXHRcdFx0cm9sZT1jYy5maW5kKFwiQ2FudmFzL1BlcnNvbnMvUGVyc29uXCIraW5kZXgpLmdldENvbXBvbmVudCgnUGVyc29uJyk7XHJcblx0XHRcdHRlYW1tYXRlPWNjLmZpbmQoXCJDYW52YXMvUGVyc29ucy9QZXJzb25cIit0ZWFtbWF0ZSkuZ2V0Q29tcG9uZW50KCdQZXJzb24nKTtcclxuXHRcdFx0ZW5lbXkxPWNjLmZpbmQoXCJDYW52YXMvUGVyc29ucy9QZXJzb25cIitlbmVteTEpLmdldENvbXBvbmVudCgnUGVyc29uJyk7XHJcblx0XHRcdGVuZW15Mj1jYy5maW5kKFwiQ2FudmFzL1BlcnNvbnMvUGVyc29uXCIrZW5lbXkyKS5nZXRDb21wb25lbnQoJ1BlcnNvbicpO1xyXG5cdFx0XHRmb3IgKHZhciBpID0gMDtpIDwgYm9vbV9jZWxsLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0aWYgKGJvb21fY2VsbFtpXVswXSA9PSBlbmVteTEucG9zWCAmJiBib29tX2NlbGxbaV1bMV0gPT0gZW5lbXkxLnBvc1kpIHtcclxuXHRcdFx0XHRcdGVuZW15MS5ibG9vZCAtPSByb2xlLmF0dGFjayoyOyBjb25zb2xlLmxvZyhlbmVteTEubmlja25hbWUpO31cclxuXHRcdFx0XHRpZiAoYm9vbV9jZWxsW2ldWzBdID09IGVuZW15Mi5wb3NYICYmIGJvb21fY2VsbFtpXVsxXSA9PSBlbmVteTIucG9zWSkge1xyXG5cdFx0XHRcdFx0ZW5lbXkyLmJsb29kIC09IHJvbGUuYXR0YWNrKjI7IGNvbnNvbGUubG9nKGVuZW15Mi5uaWNrbmFtZSk7fVxyXG5cdFx0XHRcdGlmIChlbmVteTEuYmxvb2QgPD0gMClcclxuXHRcdFx0XHRcdGVuZW15MS5pc0RlYWQgPSAxO1xyXG5cdFx0XHRcdGlmIChlbmVteTIuYmxvb2QgPD0gMClcclxuXHRcdFx0XHRcdGVuZW15Mi5pc0RlYWQgPSAxO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJvbGUubW9iaWxpdHktPXRoaXMuY2FyZENvc3RbMF07XHJcblx0XHRcdGNjLmZpbmQoJ0NhbnZhcy9EZWNrJykuZ2V0Q29tcG9uZW50KCdEZWNrJykucmVtb3ZlQ2FyZCgwKTtcclxuXHRcdFx0Y2MuZmluZCgnQ2FudmFzL0RlY2snKS5hY3RpdmUgPSB0cnVlOyAvL+aBouWkjeWNoeeJjOWghlxyXG5cdFx0XHRjYy5maW5kKCdDYW52YXMvZW5kX2NhcmRfYnRuJykuYWN0aXZlID0gdHJ1ZTsvL+aBouWkjee7k+adn+WHuueJjFxyXG5cdFx0fSwgdGhpcyk7XHJcblx0XHQvL+WTjeW6lOWNoeeJjDEx5o+S55y8XHJcblx0XHRjYy5nYW1lLm9uKCdleWUtY2VsbC1jaG9zZW4nLCBmdW5jdGlvbih4LCB5KSB7XHJcblx0XHRcdHZhciBleWVfY2VsbCA9IFtbeCwgeV1dO1xyXG5cdFx0XHR2YXIgbWFwID0gY2MuZmluZCgnQ2FudmFzL21hcCcpLmdldENvbXBvbmVudCgnR2V0TWFwJyk7XHJcblx0XHRcdHZhciBkaXMgPSBtYXAuQmZzRGlzKHgseSk7XHJcblx0XHRcdHZhciByb2xlPWNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudCgnZ2xvYmFsR2FtZScpLm5vd1Byb3BlcnR5O1xyXG5cdFx0XHRmb3IgKHZhciBpPTA7aTwxMTsrK2kpXHJcblx0XHRcdFx0Zm9yICh2YXIgaj0wO2o8MTE7KytqKXtcclxuXHRcdFx0XHRcdGlmIChkaXNbaV1bal0hPS0xJiZkaXNbaV1bal08PTMpXHJcblx0XHRcdFx0XHRcdGV5ZV9jZWxsLnB1c2goW2ksal0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0cm9sZS5leWVzLnB1c2goZXllX2NlbGwpO1xyXG5cdFx0XHR2YXIgYnVmZj1jYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoJ0J1ZmYnKTtcclxuXHRcdFx0YnVmZi50b2RvTGlzdC5wdXNoKHtcclxuXHRcdFx0XHRlbmRUdXJuOndpbmRvdy5nbG9iYWwubm93VHVybis1LFxyXG5cdFx0XHRcdHBlcnNvbjpyb2xlLFxyXG5cdFx0XHRcdGFjdDpmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0aWYgKHRoaXMucGVyc29uICE9IGNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudCgnZ2xvYmFsR2FtZScpLm5vd1Byb3BlcnR5KVxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0XHRyb2xlLmV5ZXMuc3BsaWNlKDAsMSk7XHJcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRyb2xlLm1vYmlsaXR5LT10aGlzLmNhcmRDb3N0WzExXTtcclxuXHRcdFx0Y2MuZmluZCgnQ2FudmFzL0RlY2snKS5nZXRDb21wb25lbnQoJ0RlY2snKS5yZW1vdmVDYXJkKDExKTtcclxuXHRcdFx0Y2MuZmluZCgnQ2FudmFzL0RlY2snKS5hY3RpdmUgPSB0cnVlOyAvL+aBouWkjeWNoeeJjOWghlxyXG5cdFx0XHRjYy5maW5kKCdDYW52YXMvZW5kX2NhcmRfYnRuJykuYWN0aXZlID0gdHJ1ZTsvL+aBouWkjee7k+adn+WHuueJjFxyXG5cdFx0fSwgdGhpcyk7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0ICgpIHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxyXG59KTtcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiJdfQ==