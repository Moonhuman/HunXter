
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
    this.cardCost = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //[4,3,2,3,3,4,4,5,2,3,3,3,3,3,4,4,5];

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcQ2FyZC5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImNhcmRDb3N0IiwiSW50ZWdlciIsImNhcmRGdW5jdGlvbiIsImJvb21fMCIsImNhcmQiLCJmaW5kIiwiYWN0aXZlIiwiZ2V0Q29tcG9uZW50Iiwic2hvd1RpcHMiLCJtYXAiLCJvcGVuQWxsTW9uaXRvciIsIm1pc3NpbGVfMSIsInJvbGUiLCJub3dQbGF5ZXIiLCJkaXMiLCJCZnNEaXMiLCJwb3NYIiwicG9zWSIsImNvbnNvbGUiLCJsb2ciLCJpbmRleCIsIk51bWJlciIsIm5hbWUiLCJ0ZWFtbWF0ZSIsImVuZW15MSIsImVuZW15MiIsImJsb29kIiwiYXR0YWNrIiwibW9iaWxpdHkiLCJyZW1vdmVDYXJkIiwibWluZV8yIiwibm93UHJvcGVydHkiLCJoYXZlTWluZSIsIm1pbmVBdHRhY2siLCJzaGllbGRfMyIsInNoaWVsZCIsImhhbGZTaGllbGRfNCIsImhhbGZTaGllbGQiLCJpc0RlYWQiLCJibGVzc181IiwiYXR0Y2FrIiwiYnVmZiIsInRvZG9MaXN0IiwicHVzaCIsImVuZFR1cm4iLCJ3aW5kb3ciLCJnbG9iYWwiLCJub3dUdXJuIiwicGVyc29uIiwiYWN0IiwiTWF0aCIsIm1heCIsIndlYWtfNiIsInRlYW1Gb3JjZV83IiwiY2FyZHMiLCJoZWFsXzgiLCJob2x5Tm92YV85IiwidGVsZXNjb3BlXzEwIiwic2lnaHQiLCJleWVfMTEiLCJ0b3VnaF8xMiIsIndhaXRTdGVhbCIsImxlbmd0aCIsInJkIiwiZmxvb3IiLCJyYW5kb20iLCJub2RlIiwiaW5zdGFudGlhdGUiLCJjYXJkbm9kZSIsInNldFBvc2l0aW9uIiwib24iLCJldmVudCIsImRlc3Ryb3kiLCJwYXJlbnQiLCJzcGxpY2UiLCJhdmF0YXIiLCJvZmYiLCJzdGVhbF8xMyIsIm1pc3QiLCJoYXZlUGVvcGxlIiwibWlzdEFyciIsInN0b3BNb3ZlIiwiZ29FbmFibGVkIiwidGllXzE0Iiwic3RvcFVzZUNhcmQiLCJ1c2VDYXJkRW5hYmxlZCIsImNvbmZ1c2VfMTUiLCJzYXZlXzE2Iiwib25Mb2FkIiwiQXJyYXkiLCJnYW1lIiwieCIsInkiLCJib29tX2NlbGwiLCJpIiwiYWRqIiwibmlja25hbWUiLCJleWVfY2VsbCIsImoiLCJleWVzIiwic3RhcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxRQUFRLEVBQUMsQ0FBQ0osRUFBRSxDQUFDSyxPQUFKLENBREQ7QUFFUkMsSUFBQUEsWUFBWSxFQUFDO0FBRkwsR0FIUDtBQU9MO0FBRUhDLEVBQUFBLE1BQU0sRUFBRSxnQkFBU0MsSUFBVCxFQUFlO0FBQ3RCUixJQUFBQSxFQUFFLENBQUNTLElBQUgsQ0FBUSxhQUFSLEVBQXVCQyxNQUF2QixHQUFnQyxLQUFoQyxDQURzQixDQUNnQjs7QUFDdENWLElBQUFBLEVBQUUsQ0FBQ1MsSUFBSCxDQUFRLHFCQUFSLEVBQStCQyxNQUEvQixHQUF3QyxLQUF4QyxDQUZzQixDQUV3Qjs7QUFDOUNWLElBQUFBLEVBQUUsQ0FBQ1MsSUFBSCxDQUFRLGFBQVIsRUFBdUJFLFlBQXZCLENBQW9DLE1BQXBDLEVBQTRDQyxRQUE1QyxDQUFxRCxZQUFyRDtBQUNBLFFBQUlDLEdBQUcsR0FBR2IsRUFBRSxDQUFDUyxJQUFILENBQVEsWUFBUixFQUFzQkUsWUFBdEIsQ0FBbUMsUUFBbkMsQ0FBVjtBQUNBRSxJQUFBQSxHQUFHLENBQUNDLGNBQUosQ0FBbUIsa0JBQW5CO0FBQ0EsR0FmTztBQWdCUkMsRUFBQUEsU0FBUyxFQUFFLG1CQUFTUCxJQUFULEVBQWU7QUFDekIsUUFBSVEsSUFBSSxHQUFDaEIsRUFBRSxDQUFDUyxJQUFILENBQVEsUUFBUixFQUFrQkUsWUFBbEIsQ0FBK0IsWUFBL0IsRUFBNkNNLFNBQXREO0FBQ0EsUUFBSUosR0FBRyxHQUFHYixFQUFFLENBQUNTLElBQUgsQ0FBUSxZQUFSLEVBQXNCRSxZQUF0QixDQUFtQyxRQUFuQyxDQUFWO0FBQ0EsUUFBSU8sR0FBRyxHQUFHTCxHQUFHLENBQUNNLE1BQUosQ0FBV0gsSUFBSSxDQUFDTCxZQUFMLENBQWtCLFFBQWxCLEVBQTRCUyxJQUF2QyxFQUE2Q0osSUFBSSxDQUFDTCxZQUFMLENBQWtCLFFBQWxCLEVBQTRCVSxJQUF6RSxDQUFWO0FBQ0FDLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZTCxHQUFaO0FBQ0EsUUFBSU0sS0FBSyxHQUFDQyxNQUFNLENBQUNULElBQUksQ0FBQ1UsSUFBTCxDQUFVLENBQVYsQ0FBRCxDQUFoQjtBQUNNLFFBQUlDLFFBQVEsR0FBQ0gsS0FBSyxHQUFDLENBQU4sR0FBUSxDQUFSLEdBQVVBLEtBQUssR0FBQyxDQUFoQixHQUFrQkEsS0FBSyxHQUFDLENBQXJDO0FBQ0EsUUFBSUksTUFBTSxHQUFDSixLQUFLLEdBQUMsQ0FBTixHQUFRLENBQVIsR0FBVUEsS0FBSyxHQUFDLENBQWhCLEdBQWtCQSxLQUFLLEdBQUMsQ0FBbkM7QUFDQSxRQUFJSyxNQUFNLEdBQUNGLFFBQVEsR0FBQyxDQUFULEdBQVcsQ0FBWCxHQUFhQSxRQUFRLEdBQUMsQ0FBdEIsR0FBd0JBLFFBQVEsR0FBQyxDQUE1QztBQUNOQyxJQUFBQSxNQUFNLEdBQUc1QixFQUFFLENBQUNTLElBQUgsQ0FBUSwwQkFBd0JtQixNQUFoQyxFQUF3Q2pCLFlBQXhDLENBQXFELFFBQXJELENBQVQ7QUFDQWtCLElBQUFBLE1BQU0sR0FBRzdCLEVBQUUsQ0FBQ1MsSUFBSCxDQUFRLDBCQUF3Qm9CLE1BQWhDLEVBQXdDbEIsWUFBeEMsQ0FBcUQsUUFBckQsQ0FBVDtBQUNBLFFBQUlPLEdBQUcsQ0FBQ1UsTUFBTSxDQUFDUixJQUFSLENBQUgsQ0FBaUJRLE1BQU0sQ0FBQ1AsSUFBeEIsS0FBaUMsQ0FBckMsRUFDQ08sTUFBTSxDQUFDRSxLQUFQLElBQWdCZCxJQUFJLENBQUNlLE1BQXJCO0FBQ0QsUUFBSWIsR0FBRyxDQUFDVyxNQUFNLENBQUNULElBQVIsQ0FBSCxDQUFpQlMsTUFBTSxDQUFDUixJQUF4QixLQUFpQyxDQUFyQyxFQUNDUSxNQUFNLENBQUNDLEtBQVAsSUFBZ0JkLElBQUksQ0FBQ2UsTUFBckI7QUFDRGYsSUFBQUEsSUFBSSxDQUFDTCxZQUFMLENBQWtCLFFBQWxCLEVBQTRCcUIsUUFBNUIsSUFBc0N4QixJQUFJLENBQUNKLFFBQUwsQ0FBYyxDQUFkLENBQXRDO0FBQ01KLElBQUFBLEVBQUUsQ0FBQ1MsSUFBSCxDQUFRLGFBQVIsRUFBdUJFLFlBQXZCLENBQW9DLE1BQXBDLEVBQTRDc0IsVUFBNUMsQ0FBdUQsQ0FBdkQ7QUFDTixHQWpDTztBQW1DUkMsRUFBQUEsTUFBTSxFQUFFLGdCQUFTMUIsSUFBVCxFQUFlO0FBQ3RCLFFBQUlRLElBQUksR0FBQ2hCLEVBQUUsQ0FBQ1MsSUFBSCxDQUFRLFFBQVIsRUFBa0JFLFlBQWxCLENBQStCLFlBQS9CLEVBQTZDd0IsV0FBdEQ7QUFDQSxRQUFJdEIsR0FBRyxHQUFHYixFQUFFLENBQUNTLElBQUgsQ0FBUSxZQUFSLEVBQXNCRSxZQUF0QixDQUFtQyxRQUFuQyxDQUFWO0FBQ0FFLElBQUFBLEdBQUcsQ0FBQ0EsR0FBSixDQUFRRyxJQUFJLENBQUNJLElBQWIsRUFBbUJKLElBQUksQ0FBQ0ssSUFBeEIsRUFBOEJWLFlBQTlCLENBQTJDLE1BQTNDLEVBQW1EeUIsUUFBbkQsR0FBOEQsQ0FBOUQ7QUFDQXZCLElBQUFBLEdBQUcsQ0FBQ0EsR0FBSixDQUFRRyxJQUFJLENBQUNJLElBQWIsRUFBbUJKLElBQUksQ0FBQ0ssSUFBeEIsRUFBOEJWLFlBQTlCLENBQTJDLE1BQTNDLEVBQW1EMEIsVUFBbkQsR0FBZ0VyQixJQUFJLENBQUNlLE1BQUwsR0FBYyxDQUE5RTtBQUNBZixJQUFBQSxJQUFJLENBQUNMLFlBQUwsQ0FBa0IsUUFBbEIsRUFBNEJxQixRQUE1QixJQUFzQ3hCLElBQUksQ0FBQ0osUUFBTCxDQUFjLENBQWQsQ0FBdEM7QUFDTUosSUFBQUEsRUFBRSxDQUFDUyxJQUFILENBQVEsYUFBUixFQUF1QkUsWUFBdkIsQ0FBb0MsTUFBcEMsRUFBNENzQixVQUE1QyxDQUF1RCxDQUF2RDtBQUNOLEdBMUNPO0FBNENMSyxFQUFBQSxRQUFRLEVBQUMsa0JBQVM5QixJQUFULEVBQWM7QUFDbkIsUUFBSVEsSUFBSSxHQUFDaEIsRUFBRSxDQUFDUyxJQUFILENBQVEsUUFBUixFQUFrQkUsWUFBbEIsQ0FBK0IsWUFBL0IsRUFBNkN3QixXQUF0RDtBQUNBbkIsSUFBQUEsSUFBSSxDQUFDdUIsTUFBTCxHQUFZLENBQVo7QUFDQXZCLElBQUFBLElBQUksQ0FBQ2dCLFFBQUwsSUFBZXhCLElBQUksQ0FBQ0osUUFBTCxDQUFjLENBQWQsQ0FBZjtBQUNBSixJQUFBQSxFQUFFLENBQUNTLElBQUgsQ0FBUSxhQUFSLEVBQXVCRSxZQUF2QixDQUFvQyxNQUFwQyxFQUE0Q3NCLFVBQTVDLENBQXVELENBQXZEO0FBQ0gsR0FqREk7QUFrRExPLEVBQUFBLFlBQVksRUFBQyxzQkFBU2hDLElBQVQsRUFBYztBQUN2QixRQUFJUSxJQUFJLEdBQUNoQixFQUFFLENBQUNTLElBQUgsQ0FBUSxRQUFSLEVBQWtCRSxZQUFsQixDQUErQixZQUEvQixFQUE2Q00sU0FBdEQ7QUFDQSxRQUFJTyxLQUFLLEdBQUNDLE1BQU0sQ0FBQ1QsSUFBSSxDQUFDVSxJQUFMLENBQVUsQ0FBVixDQUFELENBQWhCO0FBQ0EsUUFBSUMsUUFBUSxHQUFDSCxLQUFLLEdBQUMsQ0FBTixHQUFRLENBQVIsR0FBVUEsS0FBSyxHQUFDLENBQWhCLEdBQWtCQSxLQUFLLEdBQUMsQ0FBckM7QUFDQUcsSUFBQUEsUUFBUSxHQUFDM0IsRUFBRSxDQUFDUyxJQUFILENBQVEsMEJBQXdCa0IsUUFBaEMsRUFBMENoQixZQUExQyxDQUF1RCxRQUF2RCxDQUFUO0FBQ05LLElBQUFBLElBQUksR0FBR2hCLEVBQUUsQ0FBQ1MsSUFBSCxDQUFRLFFBQVIsRUFBa0JFLFlBQWxCLENBQStCLFlBQS9CLEVBQTZDd0IsV0FBcEQ7QUFDTW5CLElBQUFBLElBQUksQ0FBQ3lCLFVBQUwsSUFBaUIsQ0FBakI7QUFDQSxRQUFJZCxRQUFRLENBQUNlLE1BQVQsSUFBaUIsQ0FBckIsRUFDSWYsUUFBUSxDQUFDYyxVQUFULElBQXFCLENBQXJCO0FBQ0p6QixJQUFBQSxJQUFJLENBQUNnQixRQUFMLElBQWV4QixJQUFJLENBQUNKLFFBQUwsQ0FBYyxDQUFkLENBQWY7QUFDQUosSUFBQUEsRUFBRSxDQUFDUyxJQUFILENBQVEsYUFBUixFQUF1QkUsWUFBdkIsQ0FBb0MsTUFBcEMsRUFBNENzQixVQUE1QyxDQUF1RCxDQUF2RDtBQUNILEdBN0RJO0FBOERMVSxFQUFBQSxPQUFPLEVBQUMsaUJBQVNuQyxJQUFULEVBQWM7QUFDbEIsUUFBSVEsSUFBSSxHQUFDaEIsRUFBRSxDQUFDUyxJQUFILENBQVEsUUFBUixFQUFrQkUsWUFBbEIsQ0FBK0IsWUFBL0IsRUFBNkNNLFNBQXREO0FBQ0EsUUFBSU8sS0FBSyxHQUFDQyxNQUFNLENBQUNULElBQUksQ0FBQ1UsSUFBTCxDQUFVLENBQVYsQ0FBRCxDQUFoQjtBQUNBLFFBQUlDLFFBQVEsR0FBQ0gsS0FBSyxHQUFDLENBQU4sR0FBUSxDQUFSLEdBQVVBLEtBQUssR0FBQyxDQUFoQixHQUFrQkEsS0FBSyxHQUFDLENBQXJDO0FBQ0FSLElBQUFBLElBQUksQ0FBQ0wsWUFBTCxDQUFrQixRQUFsQixFQUE0QmlDLE1BQTVCLElBQW9DLENBQXBDO0FBQ0E1QyxJQUFBQSxFQUFFLENBQUNTLElBQUgsQ0FBUSwwQkFBd0JrQixRQUFoQyxFQUEwQ2hCLFlBQTFDLENBQXVELFFBQXZELEVBQWlFb0IsTUFBakUsSUFBeUUsQ0FBekU7QUFDQSxRQUFJYyxJQUFJLEdBQUM3QyxFQUFFLENBQUNTLElBQUgsQ0FBUSxRQUFSLEVBQWtCRSxZQUFsQixDQUErQixNQUEvQixDQUFUO0FBQ0FrQyxJQUFBQSxJQUFJLENBQUNDLFFBQUwsQ0FBY0MsSUFBZCxDQUFtQjtBQUNmQyxNQUFBQSxPQUFPLEVBQUNDLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjQyxPQUFkLEdBQXNCLENBRGY7QUFFZkMsTUFBQUEsTUFBTSxFQUFDcEMsSUFGUTtBQUdmcUMsTUFBQUEsR0FBRyxFQUFDLGVBQVU7QUFDdEIsWUFBSSxLQUFLRCxNQUFMLElBQWVwRCxFQUFFLENBQUNTLElBQUgsQ0FBUSxRQUFSLEVBQWtCRSxZQUFsQixDQUErQixZQUEvQixFQUE2Q00sU0FBaEUsRUFDQyxPQUFPLEtBQVA7QUFDVyxhQUFLbUMsTUFBTCxDQUFZekMsWUFBWixDQUF5QixRQUF6QixFQUFtQ29CLE1BQW5DLEdBQTBDdUIsSUFBSSxDQUFDQyxHQUFMLENBQVMsQ0FBVCxFQUFXLEtBQUtILE1BQUwsQ0FBWXpDLFlBQVosQ0FBeUIsUUFBekIsRUFBbUNvQixNQUFuQyxHQUEwQyxDQUFyRCxDQUExQztBQUNaLGVBQU8sSUFBUDtBQUNTO0FBUmMsS0FBbkI7QUFVTmMsSUFBQUEsSUFBSSxDQUFDQyxRQUFMLENBQWNDLElBQWQsQ0FBbUI7QUFDVEMsTUFBQUEsT0FBTyxFQUFDQyxNQUFNLENBQUNDLE1BQVAsQ0FBY0MsT0FBZCxHQUFzQixDQURyQjtBQUVUQyxNQUFBQSxNQUFNLEVBQUNwRCxFQUFFLENBQUNTLElBQUgsQ0FBUSwwQkFBd0JrQixRQUFoQyxDQUZFO0FBR1QwQixNQUFBQSxHQUFHLEVBQUMsZUFBVTtBQUN0QixZQUFJLEtBQUtELE1BQUwsSUFBZXBELEVBQUUsQ0FBQ1MsSUFBSCxDQUFRLFFBQVIsRUFBa0JFLFlBQWxCLENBQStCLFlBQS9CLEVBQTZDTSxTQUFoRSxFQUNDLE9BQU8sS0FBUDtBQUNXLGFBQUttQyxNQUFMLENBQVl6QyxZQUFaLENBQXlCLFFBQXpCLEVBQW1Db0IsTUFBbkMsR0FBMEN1QixJQUFJLENBQUNDLEdBQUwsQ0FBUyxDQUFULEVBQVcsS0FBS0gsTUFBTCxDQUFZekMsWUFBWixDQUF5QixRQUF6QixFQUFtQ29CLE1BQW5DLEdBQTBDLENBQXJELENBQTFDO0FBQ1osZUFBTyxJQUFQO0FBQ1M7QUFSUSxLQUFuQjtBQVVNZixJQUFBQSxJQUFJLENBQUNMLFlBQUwsQ0FBa0IsUUFBbEIsRUFBNEJxQixRQUE1QixJQUFzQ3hCLElBQUksQ0FBQ0osUUFBTCxDQUFjLENBQWQsQ0FBdEM7QUFDQUosSUFBQUEsRUFBRSxDQUFDUyxJQUFILENBQVEsYUFBUixFQUF1QkUsWUFBdkIsQ0FBb0MsTUFBcEMsRUFBNENzQixVQUE1QyxDQUF1RCxDQUF2RDtBQUNILEdBM0ZJO0FBNEZMdUIsRUFBQUEsTUFBTSxFQUFDLGdCQUFTaEQsSUFBVCxFQUFjO0FBQ2pCLFFBQUlRLElBQUksR0FBQ2hCLEVBQUUsQ0FBQ1MsSUFBSCxDQUFRLFFBQVIsRUFBa0JFLFlBQWxCLENBQStCLFlBQS9CLEVBQTZDTSxTQUF0RDtBQUNBLFFBQUlPLEtBQUssR0FBQ0MsTUFBTSxDQUFDVCxJQUFJLENBQUNVLElBQUwsQ0FBVSxDQUFWLENBQUQsQ0FBaEI7QUFDQSxRQUFJQyxRQUFRLEdBQUNILEtBQUssR0FBQyxDQUFOLEdBQVEsQ0FBUixHQUFVQSxLQUFLLEdBQUMsQ0FBaEIsR0FBa0JBLEtBQUssR0FBQyxDQUFyQztBQUNBLFFBQUlJLE1BQU0sR0FBQ0osS0FBSyxHQUFDLENBQU4sR0FBUSxDQUFSLEdBQVVBLEtBQUssR0FBQyxDQUFoQixHQUFrQkEsS0FBSyxHQUFDLENBQW5DO0FBQ0EsUUFBSUssTUFBTSxHQUFDRixRQUFRLEdBQUMsQ0FBVCxHQUFXLENBQVgsR0FBYUEsUUFBUSxHQUFDLENBQXRCLEdBQXdCQSxRQUFRLEdBQUMsQ0FBNUM7QUFDQUMsSUFBQUEsTUFBTSxHQUFDNUIsRUFBRSxDQUFDUyxJQUFILENBQVEsMEJBQXdCbUIsTUFBaEMsRUFBd0NqQixZQUF4QyxDQUFxRCxRQUFyRCxDQUFQO0FBQ0FrQixJQUFBQSxNQUFNLEdBQUM3QixFQUFFLENBQUNTLElBQUgsQ0FBUSwwQkFBd0JvQixNQUFoQyxFQUF3Q2xCLFlBQXhDLENBQXFELFFBQXJELENBQVA7QUFDQSxRQUFJa0MsSUFBSSxHQUFDN0MsRUFBRSxDQUFDUyxJQUFILENBQVEsUUFBUixFQUFrQkUsWUFBbEIsQ0FBK0IsTUFBL0IsQ0FBVDtBQUNBa0MsSUFBQUEsSUFBSSxDQUFDQyxRQUFMLENBQWNDLElBQWQsQ0FBbUI7QUFDZkMsTUFBQUEsT0FBTyxFQUFDQyxNQUFNLENBQUNDLE1BQVAsQ0FBY0MsT0FBZCxHQUFzQixDQURmO0FBRWZDLE1BQUFBLE1BQU0sRUFBQyxDQUFDeEIsTUFBRCxFQUFRQSxNQUFNLENBQUNHLE1BQVAsSUFBZSxDQUF2QixDQUZRO0FBR2ZzQixNQUFBQSxHQUFHLEVBQUMsZUFBVTtBQUN0QixZQUFJLEtBQUtELE1BQUwsQ0FBWSxDQUFaLEtBQWtCcEQsRUFBRSxDQUFDUyxJQUFILENBQVEsUUFBUixFQUFrQkUsWUFBbEIsQ0FBK0IsWUFBL0IsRUFBNkN3QixXQUFuRSxFQUNDLE9BQU8sS0FBUDtBQUNXLGFBQUtpQixNQUFMLENBQVksQ0FBWixFQUFlckIsTUFBZixJQUF1QixLQUFLcUIsTUFBTCxDQUFZLENBQVosQ0FBdkI7QUFDWixlQUFPLElBQVA7QUFDUztBQVJjLEtBQW5CO0FBVU5QLElBQUFBLElBQUksQ0FBQ0MsUUFBTCxDQUFjQyxJQUFkLENBQW1CO0FBQ1RDLE1BQUFBLE9BQU8sRUFBQ0MsTUFBTSxDQUFDQyxNQUFQLENBQWNDLE9BQWQsR0FBc0IsQ0FEckI7QUFFVEMsTUFBQUEsTUFBTSxFQUFDLENBQUN2QixNQUFELEVBQVFBLE1BQU0sQ0FBQ0UsTUFBUCxJQUFlLENBQXZCLENBRkU7QUFHVHNCLE1BQUFBLEdBQUcsRUFBQyxlQUFVO0FBQ3RCLFlBQUksS0FBS0QsTUFBTCxDQUFZLENBQVosS0FBa0JwRCxFQUFFLENBQUNTLElBQUgsQ0FBUSxRQUFSLEVBQWtCRSxZQUFsQixDQUErQixZQUEvQixFQUE2Q3dCLFdBQW5FLEVBQ0MsT0FBTyxLQUFQO0FBQ1csYUFBS2lCLE1BQUwsQ0FBWSxDQUFaLEVBQWVyQixNQUFmLElBQXVCLEtBQUtxQixNQUFMLENBQVksQ0FBWixDQUF2QjtBQUNaLGVBQU8sSUFBUDtBQUNTO0FBUlEsS0FBbkI7QUFVTXhCLElBQUFBLE1BQU0sQ0FBQ0csTUFBUCxHQUFjdUIsSUFBSSxDQUFDQyxHQUFMLENBQVMsQ0FBVCxFQUFXM0IsTUFBTSxDQUFDRyxNQUFQLEdBQWMsQ0FBekIsQ0FBZDtBQUNBRixJQUFBQSxNQUFNLENBQUNFLE1BQVAsR0FBY3VCLElBQUksQ0FBQ0MsR0FBTCxDQUFTLENBQVQsRUFBVzFCLE1BQU0sQ0FBQ0UsTUFBUCxHQUFjLENBQXpCLENBQWQ7QUFDQWYsSUFBQUEsSUFBSSxDQUFDTCxZQUFMLENBQWtCLFFBQWxCLEVBQTRCcUIsUUFBNUIsSUFBc0N4QixJQUFJLENBQUNKLFFBQUwsQ0FBYyxDQUFkLENBQXRDO0FBQ0FKLElBQUFBLEVBQUUsQ0FBQ1MsSUFBSCxDQUFRLGFBQVIsRUFBdUJFLFlBQXZCLENBQW9DLE1BQXBDLEVBQTRDc0IsVUFBNUMsQ0FBdUQsQ0FBdkQ7QUFFSCxHQTlISTtBQWdJUndCLEVBQUFBLFdBQVcsRUFBRSxxQkFBU2pELElBQVQsRUFBZTtBQUMzQixRQUFJUSxJQUFJLEdBQUNoQixFQUFFLENBQUNTLElBQUgsQ0FBUSxRQUFSLEVBQWtCRSxZQUFsQixDQUErQixZQUEvQixFQUE2Q00sU0FBdEQ7QUFDTSxRQUFJTyxLQUFLLEdBQUNDLE1BQU0sQ0FBQ1QsSUFBSSxDQUFDVSxJQUFMLENBQVUsQ0FBVixDQUFELENBQWhCO0FBQ0EsUUFBSUMsUUFBUSxHQUFDSCxLQUFLLEdBQUMsQ0FBTixHQUFRLENBQVIsR0FBVUEsS0FBSyxHQUFDLENBQWhCLEdBQWtCQSxLQUFLLEdBQUMsQ0FBckM7QUFDQSxRQUFJSSxNQUFNLEdBQUNKLEtBQUssR0FBQyxDQUFOLEdBQVEsQ0FBUixHQUFVQSxLQUFLLEdBQUMsQ0FBaEIsR0FBa0JBLEtBQUssR0FBQyxDQUFuQztBQUNBLFFBQUlLLE1BQU0sR0FBQ0YsUUFBUSxHQUFDLENBQVQsR0FBVyxDQUFYLEdBQWFBLFFBQVEsR0FBQyxDQUF0QixHQUF3QkEsUUFBUSxHQUFDLENBQTVDO0FBQ0FYLElBQUFBLElBQUksR0FBQ2hCLEVBQUUsQ0FBQ1MsSUFBSCxDQUFRLDBCQUF3QmUsS0FBaEMsRUFBdUNiLFlBQXZDLENBQW9ELFFBQXBELENBQUw7QUFDQWdCLElBQUFBLFFBQVEsR0FBQzNCLEVBQUUsQ0FBQ1MsSUFBSCxDQUFRLDBCQUF3QmtCLFFBQWhDLEVBQTBDaEIsWUFBMUMsQ0FBdUQsUUFBdkQsQ0FBVDtBQUNBaUIsSUFBQUEsTUFBTSxHQUFDNUIsRUFBRSxDQUFDUyxJQUFILENBQVEsMEJBQXdCbUIsTUFBaEMsRUFBd0NqQixZQUF4QyxDQUFxRCxRQUFyRCxDQUFQO0FBQ0FrQixJQUFBQSxNQUFNLEdBQUM3QixFQUFFLENBQUNTLElBQUgsQ0FBUSwwQkFBd0JvQixNQUFoQyxFQUF3Q2xCLFlBQXhDLENBQXFELFFBQXJELENBQVA7QUFDTixRQUFJZ0IsUUFBUSxDQUFDZSxNQUFULElBQW1CLENBQXZCLEVBQ0MxQyxFQUFFLENBQUNTLElBQUgsQ0FBUSxhQUFSLEVBQXVCRSxZQUF2QixDQUFvQyxNQUFwQyxFQUE0Q0MsUUFBNUMsQ0FBcUQsY0FBckQsRUFERCxLQUVLLElBQUksS0FBS2UsUUFBUSxDQUFDK0IsS0FBbEIsRUFBeUI7QUFDN0IsVUFBSS9CLFFBQVEsQ0FBQ0ssUUFBVCxHQUFvQixDQUF4QixFQUNDaEMsRUFBRSxDQUFDUyxJQUFILENBQVEsYUFBUixFQUF1QkUsWUFBdkIsQ0FBb0MsTUFBcEMsRUFBNENDLFFBQTVDLENBQXFELGdCQUFyRCxFQURELEtBRUs7QUFDSmdCLFFBQUFBLE1BQU0sQ0FBQ0UsS0FBUCxJQUFnQixDQUFoQjtBQUNBRCxRQUFBQSxNQUFNLENBQUNDLEtBQVAsSUFBZ0IsQ0FBaEI7QUFDQSxZQUFJRixNQUFNLENBQUNFLEtBQVAsSUFBZ0IsQ0FBcEIsRUFDQ0YsTUFBTSxDQUFDYyxNQUFQLEdBQWdCLENBQWhCO0FBQ0QsWUFBSWIsTUFBTSxDQUFDQyxLQUFQLElBQWdCLENBQXBCLEVBQ0NELE1BQU0sQ0FBQ2EsTUFBUCxHQUFnQixDQUFoQjtBQUNEO0FBQ0QsS0FYSSxNQVlBO0FBQ0oxQyxNQUFBQSxFQUFFLENBQUNTLElBQUgsQ0FBUSxhQUFSLEVBQXVCRSxZQUF2QixDQUFvQyxNQUFwQyxFQUE0Q0MsUUFBNUMsQ0FBcUQsY0FBckQ7QUFDQTtBQUNESSxJQUFBQSxJQUFJLENBQUNnQixRQUFMLElBQWV4QixJQUFJLENBQUNKLFFBQUwsQ0FBYyxDQUFkLENBQWY7QUFDTUosSUFBQUEsRUFBRSxDQUFDUyxJQUFILENBQVEsYUFBUixFQUF1QkUsWUFBdkIsQ0FBb0MsTUFBcEMsRUFBNENzQixVQUE1QyxDQUF1RCxDQUF2RDtBQUNOLEdBN0pPO0FBK0pMMEIsRUFBQUEsTUFBTSxFQUFDLGdCQUFTbkQsSUFBVCxFQUFjO0FBQ2pCLFFBQUlRLElBQUksR0FBQ2hCLEVBQUUsQ0FBQ1MsSUFBSCxDQUFRLFFBQVIsRUFBa0JFLFlBQWxCLENBQStCLFlBQS9CLEVBQTZDd0IsV0FBdEQ7QUFDQW5CLElBQUFBLElBQUksQ0FBQ2MsS0FBTCxJQUFZLENBQVo7QUFDQWQsSUFBQUEsSUFBSSxDQUFDZ0IsUUFBTCxJQUFleEIsSUFBSSxDQUFDSixRQUFMLENBQWMsQ0FBZCxDQUFmO0FBQ0FKLElBQUFBLEVBQUUsQ0FBQ1MsSUFBSCxDQUFRLGFBQVIsRUFBdUJFLFlBQXZCLENBQW9DLE1BQXBDLEVBQTRDc0IsVUFBNUMsQ0FBdUQsQ0FBdkQ7QUFDSCxHQXBLSTtBQXFLTDJCLEVBQUFBLFVBQVUsRUFBQyxvQkFBU3BELElBQVQsRUFBYztBQUNyQixRQUFJUSxJQUFJLEdBQUNoQixFQUFFLENBQUNTLElBQUgsQ0FBUSxRQUFSLEVBQWtCRSxZQUFsQixDQUErQixZQUEvQixFQUE2Q00sU0FBdEQ7QUFDQSxRQUFJTyxLQUFLLEdBQUNDLE1BQU0sQ0FBQ1QsSUFBSSxDQUFDVSxJQUFMLENBQVUsQ0FBVixDQUFELENBQWhCO0FBQ0EsUUFBSUMsUUFBUSxHQUFDSCxLQUFLLEdBQUMsQ0FBTixHQUFRLENBQVIsR0FBVUEsS0FBSyxHQUFDLENBQWhCLEdBQWtCQSxLQUFLLEdBQUMsQ0FBckM7QUFDQSxRQUFJSSxNQUFNLEdBQUNKLEtBQUssR0FBQyxDQUFOLEdBQVEsQ0FBUixHQUFVQSxLQUFLLEdBQUMsQ0FBaEIsR0FBa0JBLEtBQUssR0FBQyxDQUFuQztBQUNBLFFBQUlLLE1BQU0sR0FBQ0YsUUFBUSxHQUFDLENBQVQsR0FBVyxDQUFYLEdBQWFBLFFBQVEsR0FBQyxDQUF0QixHQUF3QkEsUUFBUSxHQUFDLENBQTVDO0FBQ0FYLElBQUFBLElBQUksR0FBQ2hCLEVBQUUsQ0FBQ1MsSUFBSCxDQUFRLDBCQUF3QmUsS0FBaEMsRUFBdUNiLFlBQXZDLENBQW9ELFFBQXBELENBQUw7QUFDQWdCLElBQUFBLFFBQVEsR0FBQzNCLEVBQUUsQ0FBQ1MsSUFBSCxDQUFRLDBCQUF3QmtCLFFBQWhDLEVBQTBDaEIsWUFBMUMsQ0FBdUQsUUFBdkQsQ0FBVDtBQUNBaUIsSUFBQUEsTUFBTSxHQUFDNUIsRUFBRSxDQUFDUyxJQUFILENBQVEsMEJBQXdCbUIsTUFBaEMsRUFBd0NqQixZQUF4QyxDQUFxRCxRQUFyRCxDQUFQO0FBQ0FrQixJQUFBQSxNQUFNLEdBQUM3QixFQUFFLENBQUNTLElBQUgsQ0FBUSwwQkFBd0JvQixNQUFoQyxFQUF3Q2xCLFlBQXhDLENBQXFELFFBQXJELENBQVA7QUFDQSxRQUFJSyxJQUFJLENBQUMwQixNQUFMLElBQWEsQ0FBakIsRUFDSTFCLElBQUksQ0FBQ2MsS0FBTCxJQUFZLENBQVo7QUFDSixRQUFJSCxRQUFRLENBQUNlLE1BQVQsSUFBaUIsQ0FBckIsRUFDSWYsUUFBUSxDQUFDRyxLQUFULElBQWdCLENBQWhCO0FBQ0osUUFBSUYsTUFBTSxDQUFDYyxNQUFQLElBQWUsQ0FBbkIsRUFDSWQsTUFBTSxDQUFDRSxLQUFQLElBQWMsQ0FBZDtBQUNKLFFBQUlELE1BQU0sQ0FBQ2EsTUFBUCxJQUFlLENBQW5CLEVBQ0liLE1BQU0sQ0FBQ0MsS0FBUCxJQUFjLENBQWQ7QUFDSmQsSUFBQUEsSUFBSSxDQUFDZ0IsUUFBTCxJQUFleEIsSUFBSSxDQUFDSixRQUFMLENBQWMsQ0FBZCxDQUFmO0FBQ0FKLElBQUFBLEVBQUUsQ0FBQ1MsSUFBSCxDQUFRLGFBQVIsRUFBdUJFLFlBQXZCLENBQW9DLE1BQXBDLEVBQTRDc0IsVUFBNUMsQ0FBdUQsQ0FBdkQ7QUFDSCxHQXpMSTtBQTJMUjRCLEVBQUFBLFlBQVksRUFBRSxzQkFBU3JELElBQVQsRUFBZTtBQUM1QixRQUFJUSxJQUFJLEdBQUNoQixFQUFFLENBQUNTLElBQUgsQ0FBUSxRQUFSLEVBQWtCRSxZQUFsQixDQUErQixZQUEvQixFQUE2Q3dCLFdBQXREO0FBQ0FuQixJQUFBQSxJQUFJLENBQUM4QyxLQUFMO0FBQ0EsUUFBSWpCLElBQUksR0FBQzdDLEVBQUUsQ0FBQ1MsSUFBSCxDQUFRLFFBQVIsRUFBa0JFLFlBQWxCLENBQStCLE1BQS9CLENBQVQ7QUFDTWtDLElBQUFBLElBQUksQ0FBQ0MsUUFBTCxDQUFjQyxJQUFkLENBQW1CO0FBQ2ZDLE1BQUFBLE9BQU8sRUFBQ0MsTUFBTSxDQUFDQyxNQUFQLENBQWNDLE9BQWQsR0FBc0IsQ0FEZjtBQUVmQyxNQUFBQSxNQUFNLEVBQUNwQyxJQUZRO0FBR2ZxQyxNQUFBQSxHQUFHLEVBQUMsZUFBVTtBQUN0QixZQUFJLEtBQUtELE1BQUwsSUFBZXBELEVBQUUsQ0FBQ1MsSUFBSCxDQUFRLFFBQVIsRUFBa0JFLFlBQWxCLENBQStCLFlBQS9CLEVBQTZDd0IsV0FBaEUsRUFDQyxPQUFPLEtBQVA7QUFDVyxhQUFLaUIsTUFBTCxDQUFZVSxLQUFaO0FBQ1osZUFBTyxJQUFQO0FBQ1M7QUFSYyxLQUFuQjtBQVVBOUMsSUFBQUEsSUFBSSxDQUFDZ0IsUUFBTCxJQUFleEIsSUFBSSxDQUFDSixRQUFMLENBQWMsRUFBZCxDQUFmO0FBQ0FKLElBQUFBLEVBQUUsQ0FBQ1MsSUFBSCxDQUFRLGFBQVIsRUFBdUJFLFlBQXZCLENBQW9DLE1BQXBDLEVBQTRDc0IsVUFBNUMsQ0FBdUQsRUFBdkQ7QUFDTixHQTNNTztBQTRNUjhCLEVBQUFBLE1BQU0sRUFBQyxnQkFBU3ZELElBQVQsRUFBYztBQUNwQlIsSUFBQUEsRUFBRSxDQUFDUyxJQUFILENBQVEsYUFBUixFQUF1QkMsTUFBdkIsR0FBZ0MsS0FBaEMsQ0FEb0IsQ0FDa0I7O0FBQ3RDVixJQUFBQSxFQUFFLENBQUNTLElBQUgsQ0FBUSxxQkFBUixFQUErQkMsTUFBL0IsR0FBd0MsS0FBeEMsQ0FGb0IsQ0FFMEI7O0FBQzlDVixJQUFBQSxFQUFFLENBQUNTLElBQUgsQ0FBUSxhQUFSLEVBQXVCRSxZQUF2QixDQUFvQyxNQUFwQyxFQUE0Q0MsUUFBNUMsQ0FBcUQsY0FBckQ7QUFDQSxRQUFJQyxHQUFHLEdBQUdiLEVBQUUsQ0FBQ1MsSUFBSCxDQUFRLFlBQVIsRUFBc0JFLFlBQXRCLENBQW1DLFFBQW5DLENBQVY7QUFDQUUsSUFBQUEsR0FBRyxDQUFDQyxjQUFKLENBQW1CLGlCQUFuQjtBQUNBLEdBbE5PO0FBbU5Ma0QsRUFBQUEsUUFBUSxFQUFDLGtCQUFTeEQsSUFBVCxFQUFjO0FBQ25CLFFBQUlRLElBQUksR0FBQ2hCLEVBQUUsQ0FBQ1MsSUFBSCxDQUFRLFFBQVIsRUFBa0JFLFlBQWxCLENBQStCLFlBQS9CLEVBQTZDd0IsV0FBdEQ7QUFDQW5CLElBQUFBLElBQUksQ0FBQ2UsTUFBTCxJQUFhLENBQWI7QUFDQSxRQUFJYyxJQUFJLEdBQUM3QyxFQUFFLENBQUNTLElBQUgsQ0FBUSxRQUFSLEVBQWtCRSxZQUFsQixDQUErQixNQUEvQixDQUFUO0FBQ0FrQyxJQUFBQSxJQUFJLENBQUNDLFFBQUwsQ0FBY0MsSUFBZCxDQUFtQjtBQUNmQyxNQUFBQSxPQUFPLEVBQUNDLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjQyxPQUFkLEdBQXNCLENBRGY7QUFFZkMsTUFBQUEsTUFBTSxFQUFDcEMsSUFGUTtBQUdmcUMsTUFBQUEsR0FBRyxFQUFDLGVBQVU7QUFDdEIsWUFBSSxLQUFLRCxNQUFMLElBQWVwRCxFQUFFLENBQUNTLElBQUgsQ0FBUSxRQUFSLEVBQWtCRSxZQUFsQixDQUErQixZQUEvQixFQUE2Q3dCLFdBQWhFLEVBQ0MsT0FBTyxLQUFQO0FBQ1csYUFBS2lCLE1BQUwsQ0FBWXJCLE1BQVosR0FBbUJOLE1BQU0sQ0FBQyxLQUFLMkIsTUFBTCxDQUFZckIsTUFBWixHQUFtQixDQUFwQixDQUF6QjtBQUNaLGVBQU8sSUFBUDtBQUNTO0FBUmMsS0FBbkI7QUFVQWYsSUFBQUEsSUFBSSxDQUFDZ0IsUUFBTCxJQUFleEIsSUFBSSxDQUFDSixRQUFMLENBQWMsRUFBZCxDQUFmO0FBQ0FKLElBQUFBLEVBQUUsQ0FBQ1MsSUFBSCxDQUFRLGFBQVIsRUFBdUJFLFlBQXZCLENBQW9DLE1BQXBDLEVBQTRDc0IsVUFBNUMsQ0FBdUQsRUFBdkQ7QUFDSCxHQW5PSTtBQXFPUmdDLEVBQUFBLFNBQVMsRUFBRSxxQkFBVztBQUNyQjtBQUNBLFFBQUlqRCxJQUFJLEdBQUNoQixFQUFFLENBQUNTLElBQUgsQ0FBUSxRQUFSLEVBQWtCRSxZQUFsQixDQUErQixZQUEvQixFQUE2Q00sU0FBdEQ7QUFDTSxRQUFJTyxLQUFLLEdBQUNDLE1BQU0sQ0FBQ1QsSUFBSSxDQUFDVSxJQUFMLENBQVUsQ0FBVixDQUFELENBQWhCO0FBQ0EsUUFBSUMsUUFBUSxHQUFDSCxLQUFLLEdBQUMsQ0FBTixHQUFRLENBQVIsR0FBVUEsS0FBSyxHQUFDLENBQWhCLEdBQWtCQSxLQUFLLEdBQUMsQ0FBckM7QUFDQSxRQUFJSSxNQUFNLEdBQUNKLEtBQUssR0FBQyxDQUFOLEdBQVEsQ0FBUixHQUFVQSxLQUFLLEdBQUMsQ0FBaEIsR0FBa0JBLEtBQUssR0FBQyxDQUFuQztBQUNBLFFBQUlLLE1BQU0sR0FBQ0YsUUFBUSxHQUFDLENBQVQsR0FBVyxDQUFYLEdBQWFBLFFBQVEsR0FBQyxDQUF0QixHQUF3QkEsUUFBUSxHQUFDLENBQTVDO0FBQ0FYLElBQUFBLElBQUksR0FBQ2hCLEVBQUUsQ0FBQ1MsSUFBSCxDQUFRLDBCQUF3QmUsS0FBaEMsRUFBdUNiLFlBQXZDLENBQW9ELFFBQXBELENBQUw7QUFDQWdCLElBQUFBLFFBQVEsR0FBQzNCLEVBQUUsQ0FBQ1MsSUFBSCxDQUFRLDBCQUF3QmtCLFFBQWhDLEVBQTBDaEIsWUFBMUMsQ0FBdUQsUUFBdkQsQ0FBVDtBQUNBaUIsSUFBQUEsTUFBTSxHQUFDNUIsRUFBRSxDQUFDUyxJQUFILENBQVEsMEJBQXdCbUIsTUFBaEMsRUFBd0NqQixZQUF4QyxDQUFxRCxRQUFyRCxDQUFQO0FBQ0FrQixJQUFBQSxNQUFNLEdBQUM3QixFQUFFLENBQUNTLElBQUgsQ0FBUSwwQkFBd0JvQixNQUFoQyxFQUF3Q2xCLFlBQXhDLENBQXFELFFBQXJELENBQVA7O0FBRU4sUUFBSSxLQUFLK0MsS0FBTCxDQUFXUSxNQUFYLElBQXFCLENBQXpCLEVBQTRCO0FBQzNCbEUsTUFBQUEsRUFBRSxDQUFDUyxJQUFILENBQVEsYUFBUixFQUF1QkUsWUFBdkIsQ0FBb0MsTUFBcEMsRUFBNENDLFFBQTVDLENBQXFELFlBQXJEO0FBQ0EsS0FGRCxNQUdLO0FBQ0osVUFBSXVELEVBQUUsR0FBR2IsSUFBSSxDQUFDYyxLQUFMLENBQVdkLElBQUksQ0FBQ2UsTUFBTCxLQUFjLEtBQUtYLEtBQUwsQ0FBV1EsTUFBcEMsQ0FBVDtBQUNBLFVBQUlJLElBQUksR0FBR3RFLEVBQUUsQ0FBQ3VFLFdBQUgsQ0FBZXRCLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjc0IsUUFBZCxDQUF1QixLQUFLZCxLQUFMLENBQVdTLEVBQVgsQ0FBdkIsQ0FBZixDQUFYO0FBQ0FHLE1BQUFBLElBQUksQ0FBQ0csV0FBTCxDQUFpQixDQUFqQixFQUFvQixDQUFwQjtBQUNBSCxNQUFBQSxJQUFJLENBQUNJLEVBQUwsQ0FBUSxXQUFSLEVBQXFCLFVBQVdDLEtBQVgsRUFBbUI7QUFDdkMsYUFBS0MsT0FBTDtBQUNBLE9BRkQsRUFFR04sSUFGSDtBQUdBQSxNQUFBQSxJQUFJLENBQUNPLE1BQUwsR0FBYyxLQUFLUCxJQUFMLENBQVVPLE1BQVYsQ0FBaUJBLE1BQS9CO0FBRUE3RCxNQUFBQSxJQUFJLENBQUMwQyxLQUFMLENBQVdYLElBQVgsQ0FBZ0IsS0FBS1csS0FBTCxDQUFXUyxFQUFYLENBQWhCO0FBQ0EsV0FBS1QsS0FBTCxDQUFXb0IsTUFBWCxDQUFrQlgsRUFBbEIsRUFBc0IsQ0FBdEI7QUFDQTs7QUFFRHhDLElBQUFBLFFBQVEsQ0FBQ29ELE1BQVQsQ0FBZ0JDLEdBQWhCLENBQW9CLFdBQXBCLEVBQWlDaEYsRUFBRSxDQUFDUyxJQUFILENBQVEsYUFBUixFQUF1QkUsWUFBdkIsQ0FBb0MsTUFBcEMsRUFBNENzRCxTQUE3RSxFQUF3RnRDLFFBQXhGO0FBQ0FDLElBQUFBLE1BQU0sQ0FBQ21ELE1BQVAsQ0FBY0MsR0FBZCxDQUFrQixXQUFsQixFQUErQmhGLEVBQUUsQ0FBQ1MsSUFBSCxDQUFRLGFBQVIsRUFBdUJFLFlBQXZCLENBQW9DLE1BQXBDLEVBQTRDc0QsU0FBM0UsRUFBc0ZyQyxNQUF0RjtBQUNBQyxJQUFBQSxNQUFNLENBQUNrRCxNQUFQLENBQWNDLEdBQWQsQ0FBa0IsV0FBbEIsRUFBK0JoRixFQUFFLENBQUNTLElBQUgsQ0FBUSxhQUFSLEVBQXVCRSxZQUF2QixDQUFvQyxNQUFwQyxFQUE0Q3NELFNBQTNFLEVBQXNGcEMsTUFBdEY7QUFFQTdCLElBQUFBLEVBQUUsQ0FBQ1MsSUFBSCxDQUFRLGFBQVIsRUFBdUJDLE1BQXZCLEdBQWdDLElBQWhDO0FBQ0FWLElBQUFBLEVBQUUsQ0FBQ1MsSUFBSCxDQUFRLHFCQUFSLEVBQStCQyxNQUEvQixHQUF3QyxJQUF4QztBQUNBLEdBdlFPO0FBeVFSdUUsRUFBQUEsUUFBUSxFQUFDLGtCQUFTekUsSUFBVCxFQUFlO0FBQ3ZCUixJQUFBQSxFQUFFLENBQUNTLElBQUgsQ0FBUSxhQUFSLEVBQXVCQyxNQUF2QixHQUFnQyxLQUFoQyxDQUR1QixDQUNlOztBQUN0Q1YsSUFBQUEsRUFBRSxDQUFDUyxJQUFILENBQVEscUJBQVIsRUFBK0JDLE1BQS9CLEdBQXdDLEtBQXhDLENBRnVCLENBRXVCOztBQUM5QyxRQUFJTSxJQUFJLEdBQUNoQixFQUFFLENBQUNTLElBQUgsQ0FBUSxRQUFSLEVBQWtCRSxZQUFsQixDQUErQixZQUEvQixFQUE2Q00sU0FBdEQ7QUFDTSxRQUFJTyxLQUFLLEdBQUNDLE1BQU0sQ0FBQ1QsSUFBSSxDQUFDVSxJQUFMLENBQVUsQ0FBVixDQUFELENBQWhCO0FBQ0EsUUFBSUMsUUFBUSxHQUFDSCxLQUFLLEdBQUMsQ0FBTixHQUFRLENBQVIsR0FBVUEsS0FBSyxHQUFDLENBQWhCLEdBQWtCQSxLQUFLLEdBQUMsQ0FBckM7QUFDQSxRQUFJSSxNQUFNLEdBQUNKLEtBQUssR0FBQyxDQUFOLEdBQVEsQ0FBUixHQUFVQSxLQUFLLEdBQUMsQ0FBaEIsR0FBa0JBLEtBQUssR0FBQyxDQUFuQztBQUNBLFFBQUlLLE1BQU0sR0FBQ0YsUUFBUSxHQUFDLENBQVQsR0FBVyxDQUFYLEdBQWFBLFFBQVEsR0FBQyxDQUF0QixHQUF3QkEsUUFBUSxHQUFDLENBQTVDO0FBQ0FYLElBQUFBLElBQUksR0FBQ2hCLEVBQUUsQ0FBQ1MsSUFBSCxDQUFRLDBCQUF3QmUsS0FBaEMsRUFBdUNiLFlBQXZDLENBQW9ELFFBQXBELENBQUw7QUFDQWdCLElBQUFBLFFBQVEsR0FBQzNCLEVBQUUsQ0FBQ1MsSUFBSCxDQUFRLDBCQUF3QmtCLFFBQWhDLEVBQTBDaEIsWUFBMUMsQ0FBdUQsUUFBdkQsQ0FBVDtBQUNBaUIsSUFBQUEsTUFBTSxHQUFDNUIsRUFBRSxDQUFDUyxJQUFILENBQVEsMEJBQXdCbUIsTUFBaEMsRUFBd0NqQixZQUF4QyxDQUFxRCxRQUFyRCxDQUFQO0FBQ0FrQixJQUFBQSxNQUFNLEdBQUM3QixFQUFFLENBQUNTLElBQUgsQ0FBUSwwQkFBd0JvQixNQUFoQyxFQUF3Q2xCLFlBQXhDLENBQXFELFFBQXJELENBQVA7QUFDTixRQUFJdUUsSUFBSSxHQUFHbEYsRUFBRSxDQUFDUyxJQUFILENBQVEsYUFBUixFQUF1QkUsWUFBdkIsQ0FBb0MsTUFBcEMsQ0FBWDtBQUNBLFFBQUl3RSxVQUFVLEdBQUcsQ0FBakI7O0FBQ0EsUUFBSUQsSUFBSSxDQUFDRSxPQUFMLENBQWF6RCxRQUFRLENBQUNQLElBQXRCLEVBQTRCTyxRQUFRLENBQUNOLElBQXJDLEVBQTJDWCxNQUEzQyxJQUFxRCxLQUF6RCxFQUFnRTtBQUMvRGlCLE1BQUFBLFFBQVEsQ0FBQ29ELE1BQVQsQ0FBZ0JMLEVBQWhCLENBQW1CLFdBQW5CLEVBQWdDbEUsSUFBSSxDQUFDeUQsU0FBckMsRUFBZ0R0QyxRQUFoRDtBQUNBd0QsTUFBQUEsVUFBVSxHQUFHLENBQWI7QUFDQTs7QUFDRCxRQUFJRCxJQUFJLENBQUNFLE9BQUwsQ0FBYXhELE1BQU0sQ0FBQ1IsSUFBcEIsRUFBMEJRLE1BQU0sQ0FBQ1AsSUFBakMsRUFBdUNYLE1BQXZDLElBQWlELEtBQXJELEVBQTREO0FBQzNEa0IsTUFBQUEsTUFBTSxDQUFDbUQsTUFBUCxDQUFjTCxFQUFkLENBQWlCLFdBQWpCLEVBQThCbEUsSUFBSSxDQUFDeUQsU0FBbkMsRUFBOENyQyxNQUE5QztBQUNBdUQsTUFBQUEsVUFBVSxHQUFHLENBQWI7QUFDQTs7QUFDRCxRQUFJRCxJQUFJLENBQUNFLE9BQUwsQ0FBYXZELE1BQU0sQ0FBQ1QsSUFBcEIsRUFBMEJTLE1BQU0sQ0FBQ1IsSUFBakMsRUFBdUNYLE1BQXZDLElBQWlELEtBQXJELEVBQTREO0FBQzNEbUIsTUFBQUEsTUFBTSxDQUFDa0QsTUFBUCxDQUFjTCxFQUFkLENBQWlCLFdBQWpCLEVBQThCbEUsSUFBSSxDQUFDeUQsU0FBbkMsRUFBOENwQyxNQUE5QztBQUNBc0QsTUFBQUEsVUFBVSxHQUFHLENBQWI7QUFDQTs7QUFFRCxRQUFJQSxVQUFVLElBQUksQ0FBbEIsRUFDQ25GLEVBQUUsQ0FBQ1MsSUFBSCxDQUFRLGFBQVIsRUFBdUJFLFlBQXZCLENBQW9DLE1BQXBDLEVBQTRDQyxRQUE1QyxDQUFxRCxZQUFyRDtBQUNESSxJQUFBQSxJQUFJLENBQUNnQixRQUFMLElBQWV4QixJQUFJLENBQUNKLFFBQUwsQ0FBYyxFQUFkLENBQWY7QUFDTUosSUFBQUEsRUFBRSxDQUFDUyxJQUFILENBQVEsYUFBUixFQUF1QkUsWUFBdkIsQ0FBb0MsTUFBcEMsRUFBNENzQixVQUE1QyxDQUF1RCxFQUF2RDtBQUNOLEdBeFNPO0FBMFNSb0QsRUFBQUEsUUFBUSxFQUFFLG9CQUFXO0FBQ3BCO0FBQ0EsUUFBSXJFLElBQUksR0FBQ2hCLEVBQUUsQ0FBQ1MsSUFBSCxDQUFRLFFBQVIsRUFBa0JFLFlBQWxCLENBQStCLFlBQS9CLEVBQTZDTSxTQUF0RDtBQUNNLFFBQUlPLEtBQUssR0FBQ0MsTUFBTSxDQUFDVCxJQUFJLENBQUNVLElBQUwsQ0FBVSxDQUFWLENBQUQsQ0FBaEI7QUFDQSxRQUFJQyxRQUFRLEdBQUNILEtBQUssR0FBQyxDQUFOLEdBQVEsQ0FBUixHQUFVQSxLQUFLLEdBQUMsQ0FBaEIsR0FBa0JBLEtBQUssR0FBQyxDQUFyQztBQUNBLFFBQUlJLE1BQU0sR0FBQ0osS0FBSyxHQUFDLENBQU4sR0FBUSxDQUFSLEdBQVVBLEtBQUssR0FBQyxDQUFoQixHQUFrQkEsS0FBSyxHQUFDLENBQW5DO0FBQ0EsUUFBSUssTUFBTSxHQUFDRixRQUFRLEdBQUMsQ0FBVCxHQUFXLENBQVgsR0FBYUEsUUFBUSxHQUFDLENBQXRCLEdBQXdCQSxRQUFRLEdBQUMsQ0FBNUM7QUFDQVgsSUFBQUEsSUFBSSxHQUFDaEIsRUFBRSxDQUFDUyxJQUFILENBQVEsMEJBQXdCZSxLQUFoQyxFQUF1Q2IsWUFBdkMsQ0FBb0QsUUFBcEQsQ0FBTDtBQUNBZ0IsSUFBQUEsUUFBUSxHQUFDM0IsRUFBRSxDQUFDUyxJQUFILENBQVEsMEJBQXdCa0IsUUFBaEMsRUFBMENoQixZQUExQyxDQUF1RCxRQUF2RCxDQUFUO0FBQ0FpQixJQUFBQSxNQUFNLEdBQUM1QixFQUFFLENBQUNTLElBQUgsQ0FBUSwwQkFBd0JtQixNQUFoQyxFQUF3Q2pCLFlBQXhDLENBQXFELFFBQXJELENBQVA7QUFDQWtCLElBQUFBLE1BQU0sR0FBQzdCLEVBQUUsQ0FBQ1MsSUFBSCxDQUFRLDBCQUF3Qm9CLE1BQWhDLEVBQXdDbEIsWUFBeEMsQ0FBcUQsUUFBckQsQ0FBUDtBQUVOLFNBQUsyRSxTQUFMLEdBQWlCLENBQWpCO0FBQ0ExRCxJQUFBQSxNQUFNLENBQUNtRCxNQUFQLENBQWNDLEdBQWQsQ0FBa0IsV0FBbEIsRUFBK0JoRixFQUFFLENBQUNTLElBQUgsQ0FBUSxhQUFSLEVBQXVCRSxZQUF2QixDQUFvQyxNQUFwQyxFQUE0QzBFLFFBQTNFLEVBQXFGekQsTUFBckY7QUFDQUMsSUFBQUEsTUFBTSxDQUFDa0QsTUFBUCxDQUFjQyxHQUFkLENBQWtCLFdBQWxCLEVBQStCaEYsRUFBRSxDQUFDUyxJQUFILENBQVEsYUFBUixFQUF1QkUsWUFBdkIsQ0FBb0MsTUFBcEMsRUFBNEMwRSxRQUEzRSxFQUFxRnhELE1BQXJGO0FBRUE3QixJQUFBQSxFQUFFLENBQUNTLElBQUgsQ0FBUSxhQUFSLEVBQXVCQyxNQUF2QixHQUFnQyxJQUFoQztBQUNBVixJQUFBQSxFQUFFLENBQUNTLElBQUgsQ0FBUSxxQkFBUixFQUErQkMsTUFBL0IsR0FBd0MsSUFBeEM7QUFDQSxHQTVUTztBQThUUjZFLEVBQUFBLE1BQU0sRUFBRSxnQkFBUy9FLElBQVQsRUFBZTtBQUN0QlIsSUFBQUEsRUFBRSxDQUFDUyxJQUFILENBQVEsYUFBUixFQUF1QkMsTUFBdkIsR0FBZ0MsS0FBaEMsQ0FEc0IsQ0FDZ0I7O0FBQ3RDVixJQUFBQSxFQUFFLENBQUNTLElBQUgsQ0FBUSxxQkFBUixFQUErQkMsTUFBL0IsR0FBd0MsS0FBeEMsQ0FGc0IsQ0FFd0I7O0FBQzlDLFFBQUlNLElBQUksR0FBQ2hCLEVBQUUsQ0FBQ1MsSUFBSCxDQUFRLFFBQVIsRUFBa0JFLFlBQWxCLENBQStCLFlBQS9CLEVBQTZDTSxTQUF0RDtBQUNNLFFBQUlPLEtBQUssR0FBQ0MsTUFBTSxDQUFDVCxJQUFJLENBQUNVLElBQUwsQ0FBVSxDQUFWLENBQUQsQ0FBaEI7QUFDQSxRQUFJQyxRQUFRLEdBQUNILEtBQUssR0FBQyxDQUFOLEdBQVEsQ0FBUixHQUFVQSxLQUFLLEdBQUMsQ0FBaEIsR0FBa0JBLEtBQUssR0FBQyxDQUFyQztBQUNBLFFBQUlJLE1BQU0sR0FBQ0osS0FBSyxHQUFDLENBQU4sR0FBUSxDQUFSLEdBQVVBLEtBQUssR0FBQyxDQUFoQixHQUFrQkEsS0FBSyxHQUFDLENBQW5DO0FBQ0EsUUFBSUssTUFBTSxHQUFDRixRQUFRLEdBQUMsQ0FBVCxHQUFXLENBQVgsR0FBYUEsUUFBUSxHQUFDLENBQXRCLEdBQXdCQSxRQUFRLEdBQUMsQ0FBNUM7QUFDQVgsSUFBQUEsSUFBSSxHQUFDaEIsRUFBRSxDQUFDUyxJQUFILENBQVEsMEJBQXdCZSxLQUFoQyxFQUF1Q2IsWUFBdkMsQ0FBb0QsUUFBcEQsQ0FBTDtBQUNBZ0IsSUFBQUEsUUFBUSxHQUFDM0IsRUFBRSxDQUFDUyxJQUFILENBQVEsMEJBQXdCa0IsUUFBaEMsRUFBMENoQixZQUExQyxDQUF1RCxRQUF2RCxDQUFUO0FBQ0FpQixJQUFBQSxNQUFNLEdBQUM1QixFQUFFLENBQUNTLElBQUgsQ0FBUSwwQkFBd0JtQixNQUFoQyxFQUF3Q2pCLFlBQXhDLENBQXFELFFBQXJELENBQVA7QUFDQWtCLElBQUFBLE1BQU0sR0FBQzdCLEVBQUUsQ0FBQ1MsSUFBSCxDQUFRLDBCQUF3Qm9CLE1BQWhDLEVBQXdDbEIsWUFBeEMsQ0FBcUQsUUFBckQsQ0FBUDtBQUNOLFFBQUl1RSxJQUFJLEdBQUdsRixFQUFFLENBQUNTLElBQUgsQ0FBUSxhQUFSLEVBQXVCRSxZQUF2QixDQUFvQyxNQUFwQyxDQUFYO0FBQ0EsUUFBSXdFLFVBQVUsR0FBRyxDQUFqQjs7QUFDQSxRQUFJRCxJQUFJLENBQUNFLE9BQUwsQ0FBYXhELE1BQU0sQ0FBQ1IsSUFBcEIsRUFBMEJRLE1BQU0sQ0FBQ1AsSUFBakMsRUFBdUNYLE1BQXZDLElBQWlELEtBQXJELEVBQTREO0FBQzNEa0IsTUFBQUEsTUFBTSxDQUFDbUQsTUFBUCxDQUFjTCxFQUFkLENBQWlCLFdBQWpCLEVBQThCbEUsSUFBSSxDQUFDNkUsUUFBbkMsRUFBNkN6RCxNQUE3QztBQUNBdUQsTUFBQUEsVUFBVSxHQUFHLENBQWI7QUFDQTs7QUFDRCxRQUFJRCxJQUFJLENBQUNFLE9BQUwsQ0FBYXZELE1BQU0sQ0FBQ1QsSUFBcEIsRUFBMEJTLE1BQU0sQ0FBQ1IsSUFBakMsRUFBdUNYLE1BQXZDLElBQWlELEtBQXJELEVBQTREO0FBQzNEbUIsTUFBQUEsTUFBTSxDQUFDa0QsTUFBUCxDQUFjTCxFQUFkLENBQWlCLFdBQWpCLEVBQThCbEUsSUFBSSxDQUFDNkUsUUFBbkMsRUFBNkN4RCxNQUE3QztBQUNBc0QsTUFBQUEsVUFBVSxHQUFHLENBQWI7QUFDQTs7QUFDRCxRQUFJQSxVQUFVLElBQUksQ0FBbEIsRUFBcUI7QUFDcEJuRixNQUFBQSxFQUFFLENBQUNTLElBQUgsQ0FBUSxhQUFSLEVBQXVCRSxZQUF2QixDQUFvQyxNQUFwQyxFQUE0Q0MsUUFBNUMsQ0FBcUQsWUFBckQ7QUFDQVosTUFBQUEsRUFBRSxDQUFDUyxJQUFILENBQVEsYUFBUixFQUF1QkMsTUFBdkIsR0FBZ0MsSUFBaEM7QUFDQVYsTUFBQUEsRUFBRSxDQUFDUyxJQUFILENBQVEscUJBQVIsRUFBK0JDLE1BQS9CLEdBQXdDLElBQXhDO0FBQ0E7O0FBQ0RNLElBQUFBLElBQUksQ0FBQ2dCLFFBQUwsSUFBZXhCLElBQUksQ0FBQ0osUUFBTCxDQUFjLEVBQWQsQ0FBZjtBQUNNSixJQUFBQSxFQUFFLENBQUNTLElBQUgsQ0FBUSxhQUFSLEVBQXVCRSxZQUF2QixDQUFvQyxNQUFwQyxFQUE0Q3NCLFVBQTVDLENBQXVELEVBQXZEO0FBQ04sR0EzVk87QUE2VlJ1RCxFQUFBQSxXQUFXLEVBQUUsdUJBQVc7QUFDdkI7QUFDQSxRQUFJeEUsSUFBSSxHQUFDaEIsRUFBRSxDQUFDUyxJQUFILENBQVEsUUFBUixFQUFrQkUsWUFBbEIsQ0FBK0IsWUFBL0IsRUFBNkNNLFNBQXREO0FBQ00sUUFBSU8sS0FBSyxHQUFDQyxNQUFNLENBQUNULElBQUksQ0FBQ1UsSUFBTCxDQUFVLENBQVYsQ0FBRCxDQUFoQjtBQUNBLFFBQUlDLFFBQVEsR0FBQ0gsS0FBSyxHQUFDLENBQU4sR0FBUSxDQUFSLEdBQVVBLEtBQUssR0FBQyxDQUFoQixHQUFrQkEsS0FBSyxHQUFDLENBQXJDO0FBQ0EsUUFBSUksTUFBTSxHQUFDSixLQUFLLEdBQUMsQ0FBTixHQUFRLENBQVIsR0FBVUEsS0FBSyxHQUFDLENBQWhCLEdBQWtCQSxLQUFLLEdBQUMsQ0FBbkM7QUFDQSxRQUFJSyxNQUFNLEdBQUNGLFFBQVEsR0FBQyxDQUFULEdBQVcsQ0FBWCxHQUFhQSxRQUFRLEdBQUMsQ0FBdEIsR0FBd0JBLFFBQVEsR0FBQyxDQUE1QztBQUNBWCxJQUFBQSxJQUFJLEdBQUNoQixFQUFFLENBQUNTLElBQUgsQ0FBUSwwQkFBd0JlLEtBQWhDLEVBQXVDYixZQUF2QyxDQUFvRCxRQUFwRCxDQUFMO0FBQ0FnQixJQUFBQSxRQUFRLEdBQUMzQixFQUFFLENBQUNTLElBQUgsQ0FBUSwwQkFBd0JrQixRQUFoQyxFQUEwQ2hCLFlBQTFDLENBQXVELFFBQXZELENBQVQ7QUFDQWlCLElBQUFBLE1BQU0sR0FBQzVCLEVBQUUsQ0FBQ1MsSUFBSCxDQUFRLDBCQUF3Qm1CLE1BQWhDLEVBQXdDakIsWUFBeEMsQ0FBcUQsUUFBckQsQ0FBUDtBQUNBa0IsSUFBQUEsTUFBTSxHQUFDN0IsRUFBRSxDQUFDUyxJQUFILENBQVEsMEJBQXdCb0IsTUFBaEMsRUFBd0NsQixZQUF4QyxDQUFxRCxRQUFyRCxDQUFQO0FBRU4sU0FBSzhFLGNBQUwsR0FBc0IsQ0FBdEI7QUFDQTdELElBQUFBLE1BQU0sQ0FBQ21ELE1BQVAsQ0FBY0MsR0FBZCxDQUFrQixXQUFsQixFQUErQmhGLEVBQUUsQ0FBQ1MsSUFBSCxDQUFRLGFBQVIsRUFBdUJFLFlBQXZCLENBQW9DLE1BQXBDLEVBQTRDNkUsV0FBM0UsRUFBd0Y1RCxNQUF4RjtBQUNBQyxJQUFBQSxNQUFNLENBQUNrRCxNQUFQLENBQWNDLEdBQWQsQ0FBa0IsV0FBbEIsRUFBK0JoRixFQUFFLENBQUNTLElBQUgsQ0FBUSxhQUFSLEVBQXVCRSxZQUF2QixDQUFvQyxNQUFwQyxFQUE0QzZFLFdBQTNFLEVBQXdGM0QsTUFBeEY7QUFFQTdCLElBQUFBLEVBQUUsQ0FBQ1MsSUFBSCxDQUFRLGFBQVIsRUFBdUJDLE1BQXZCLEdBQWdDLElBQWhDO0FBQ0FWLElBQUFBLEVBQUUsQ0FBQ1MsSUFBSCxDQUFRLHFCQUFSLEVBQStCQyxNQUEvQixHQUF3QyxJQUF4QztBQUNBLEdBL1dPO0FBaVhSZ0YsRUFBQUEsVUFBVSxFQUFFLG9CQUFTbEYsSUFBVCxFQUFlO0FBQzFCUixJQUFBQSxFQUFFLENBQUNTLElBQUgsQ0FBUSxhQUFSLEVBQXVCQyxNQUF2QixHQUFnQyxLQUFoQyxDQUQwQixDQUNZOztBQUN0Q1YsSUFBQUEsRUFBRSxDQUFDUyxJQUFILENBQVEscUJBQVIsRUFBK0JDLE1BQS9CLEdBQXdDLEtBQXhDLENBRjBCLENBRW9COztBQUM5QyxRQUFJTSxJQUFJLEdBQUNoQixFQUFFLENBQUNTLElBQUgsQ0FBUSxRQUFSLEVBQWtCRSxZQUFsQixDQUErQixZQUEvQixFQUE2Q00sU0FBdEQ7QUFDTSxRQUFJTyxLQUFLLEdBQUNDLE1BQU0sQ0FBQ1QsSUFBSSxDQUFDVSxJQUFMLENBQVUsQ0FBVixDQUFELENBQWhCO0FBQ0EsUUFBSUMsUUFBUSxHQUFDSCxLQUFLLEdBQUMsQ0FBTixHQUFRLENBQVIsR0FBVUEsS0FBSyxHQUFDLENBQWhCLEdBQWtCQSxLQUFLLEdBQUMsQ0FBckM7QUFDQSxRQUFJSSxNQUFNLEdBQUNKLEtBQUssR0FBQyxDQUFOLEdBQVEsQ0FBUixHQUFVQSxLQUFLLEdBQUMsQ0FBaEIsR0FBa0JBLEtBQUssR0FBQyxDQUFuQztBQUNBLFFBQUlLLE1BQU0sR0FBQ0YsUUFBUSxHQUFDLENBQVQsR0FBVyxDQUFYLEdBQWFBLFFBQVEsR0FBQyxDQUF0QixHQUF3QkEsUUFBUSxHQUFDLENBQTVDO0FBQ0FYLElBQUFBLElBQUksR0FBQ2hCLEVBQUUsQ0FBQ1MsSUFBSCxDQUFRLDBCQUF3QmUsS0FBaEMsRUFBdUNiLFlBQXZDLENBQW9ELFFBQXBELENBQUw7QUFDQWdCLElBQUFBLFFBQVEsR0FBQzNCLEVBQUUsQ0FBQ1MsSUFBSCxDQUFRLDBCQUF3QmtCLFFBQWhDLEVBQTBDaEIsWUFBMUMsQ0FBdUQsUUFBdkQsQ0FBVDtBQUNBaUIsSUFBQUEsTUFBTSxHQUFDNUIsRUFBRSxDQUFDUyxJQUFILENBQVEsMEJBQXdCbUIsTUFBaEMsRUFBd0NqQixZQUF4QyxDQUFxRCxRQUFyRCxDQUFQO0FBQ0FrQixJQUFBQSxNQUFNLEdBQUM3QixFQUFFLENBQUNTLElBQUgsQ0FBUSwwQkFBd0JvQixNQUFoQyxFQUF3Q2xCLFlBQXhDLENBQXFELFFBQXJELENBQVA7QUFDTixRQUFJdUUsSUFBSSxHQUFHbEYsRUFBRSxDQUFDUyxJQUFILENBQVEsYUFBUixFQUF1QkUsWUFBdkIsQ0FBb0MsTUFBcEMsQ0FBWDtBQUNBLFFBQUl3RSxVQUFVLEdBQUcsQ0FBakI7O0FBQ0EsUUFBSUQsSUFBSSxDQUFDRSxPQUFMLENBQWF4RCxNQUFNLENBQUNSLElBQXBCLEVBQTBCUSxNQUFNLENBQUNQLElBQWpDLEVBQXVDWCxNQUF2QyxJQUFpRCxLQUFyRCxFQUE0RDtBQUMzRGtCLE1BQUFBLE1BQU0sQ0FBQ21ELE1BQVAsQ0FBY0wsRUFBZCxDQUFpQixXQUFqQixFQUE4QmxFLElBQUksQ0FBQ2dGLFdBQW5DLEVBQWdENUQsTUFBaEQ7QUFDQXVELE1BQUFBLFVBQVUsR0FBRyxDQUFiO0FBQ0E7O0FBQ0QsUUFBSUQsSUFBSSxDQUFDRSxPQUFMLENBQWF2RCxNQUFNLENBQUNULElBQXBCLEVBQTBCUyxNQUFNLENBQUNSLElBQWpDLEVBQXVDWCxNQUF2QyxJQUFpRCxLQUFyRCxFQUE0RDtBQUMzRG1CLE1BQUFBLE1BQU0sQ0FBQ2tELE1BQVAsQ0FBY0wsRUFBZCxDQUFpQixXQUFqQixFQUE4QmxFLElBQUksQ0FBQ2dGLFdBQW5DLEVBQWdEM0QsTUFBaEQ7QUFDQXNELE1BQUFBLFVBQVUsR0FBRyxDQUFiO0FBQ0E7O0FBQ0QsUUFBSUEsVUFBVSxJQUFJLENBQWxCLEVBQXFCO0FBQ3BCbkYsTUFBQUEsRUFBRSxDQUFDUyxJQUFILENBQVEsYUFBUixFQUF1QkUsWUFBdkIsQ0FBb0MsTUFBcEMsRUFBNENDLFFBQTVDLENBQXFELFlBQXJEO0FBQ0FaLE1BQUFBLEVBQUUsQ0FBQ1MsSUFBSCxDQUFRLGFBQVIsRUFBdUJDLE1BQXZCLEdBQWdDLElBQWhDO0FBQ0FWLE1BQUFBLEVBQUUsQ0FBQ1MsSUFBSCxDQUFRLHFCQUFSLEVBQStCQyxNQUEvQixHQUF3QyxJQUF4QztBQUNBOztBQUNETSxJQUFBQSxJQUFJLENBQUNnQixRQUFMLElBQWV4QixJQUFJLENBQUNKLFFBQUwsQ0FBYyxFQUFkLENBQWY7QUFDTUosSUFBQUEsRUFBRSxDQUFDUyxJQUFILENBQVEsYUFBUixFQUF1QkUsWUFBdkIsQ0FBb0MsTUFBcEMsRUFBNENzQixVQUE1QyxDQUF1RCxFQUF2RDtBQUNOLEdBOVlPO0FBZ1pMMEQsRUFBQUEsT0FBTyxFQUFDLGlCQUFTbkYsSUFBVCxFQUFjO0FBQ2xCLFFBQUlRLElBQUksR0FBQ2hCLEVBQUUsQ0FBQ1MsSUFBSCxDQUFRLFFBQVIsRUFBa0JFLFlBQWxCLENBQStCLFlBQS9CLEVBQTZDTSxTQUF0RDtBQUNBLFFBQUlPLEtBQUssR0FBQ0MsTUFBTSxDQUFDVCxJQUFJLENBQUNVLElBQUwsQ0FBVSxDQUFWLENBQUQsQ0FBaEI7QUFDQSxRQUFJQyxRQUFRLEdBQUNILEtBQUssR0FBQyxDQUFOLEdBQVEsQ0FBUixHQUFVQSxLQUFLLEdBQUMsQ0FBaEIsR0FBa0JBLEtBQUssR0FBQyxDQUFyQztBQUNBRyxJQUFBQSxRQUFRLEdBQUMzQixFQUFFLENBQUNTLElBQUgsQ0FBUSwwQkFBd0JrQixRQUFoQyxFQUEwQ2hCLFlBQTFDLENBQXVELFFBQXZELENBQVQ7O0FBQ0EsUUFBSWdCLFFBQVEsQ0FBQ2UsTUFBVCxJQUFpQixDQUFyQixFQUF1QjtBQUNuQmYsTUFBQUEsUUFBUSxDQUFDZSxNQUFULEdBQWdCLENBQWhCO0FBQ0FmLE1BQUFBLFFBQVEsQ0FBQ0csS0FBVCxHQUFlLENBQWY7QUFDQUgsTUFBQUEsUUFBUSxDQUFDSyxRQUFULEdBQWtCLENBQWxCO0FBQ0g7O0FBQ0RoQixJQUFBQSxJQUFJLENBQUNMLFlBQUwsQ0FBa0IsUUFBbEIsRUFBNEJxQixRQUE1QixJQUFzQ3hCLElBQUksQ0FBQ0osUUFBTCxDQUFjLEVBQWQsQ0FBdEM7QUFDQUosSUFBQUEsRUFBRSxDQUFDUyxJQUFILENBQVEsYUFBUixFQUF1QkUsWUFBdkIsQ0FBb0MsTUFBcEMsRUFBNENzQixVQUE1QyxDQUF1RCxFQUF2RDtBQUNILEdBNVpJO0FBNlpMMkQsRUFBQUEsTUE3Wkssb0JBNlpLO0FBQ04sU0FBS3hGLFFBQUwsR0FBYyxDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLEVBQXVCLENBQXZCLEVBQXlCLENBQXpCLEVBQTJCLENBQTNCLEVBQTZCLENBQTdCLEVBQStCLENBQS9CLEVBQWlDLENBQWpDLEVBQW1DLENBQW5DLEVBQXFDLENBQXJDLEVBQXVDLENBQXZDLEVBQXlDLENBQXpDLEVBQTJDLENBQTNDLENBQWQsQ0FETSxDQUNzRDs7QUFDNUQsU0FBS0UsWUFBTCxHQUFrQixJQUFJdUYsS0FBSixFQUFsQjtBQUNOLFNBQUt2RixZQUFMLENBQWtCLENBQWxCLElBQXFCLEtBQUtDLE1BQTFCO0FBQ0EsU0FBS0QsWUFBTCxDQUFrQixDQUFsQixJQUFxQixLQUFLUyxTQUExQjtBQUNBLFNBQUtULFlBQUwsQ0FBa0IsQ0FBbEIsSUFBcUIsS0FBSzRCLE1BQTFCO0FBQ00sU0FBSzVCLFlBQUwsQ0FBa0IsQ0FBbEIsSUFBcUIsS0FBS2dDLFFBQTFCO0FBQ0EsU0FBS2hDLFlBQUwsQ0FBa0IsQ0FBbEIsSUFBcUIsS0FBS2tDLFlBQTFCO0FBQ0EsU0FBS2xDLFlBQUwsQ0FBa0IsQ0FBbEIsSUFBcUIsS0FBS3FDLE9BQTFCO0FBQ0EsU0FBS3JDLFlBQUwsQ0FBa0IsQ0FBbEIsSUFBcUIsS0FBS2tELE1BQTFCO0FBQ04sU0FBS2xELFlBQUwsQ0FBa0IsQ0FBbEIsSUFBcUIsS0FBS21ELFdBQTFCO0FBQ00sU0FBS25ELFlBQUwsQ0FBa0IsQ0FBbEIsSUFBcUIsS0FBS3FELE1BQTFCO0FBQ0EsU0FBS3JELFlBQUwsQ0FBa0IsQ0FBbEIsSUFBcUIsS0FBS3NELFVBQTFCO0FBQ04sU0FBS3RELFlBQUwsQ0FBa0IsRUFBbEIsSUFBc0IsS0FBS3VELFlBQTNCO0FBQ0EsU0FBS3ZELFlBQUwsQ0FBa0IsRUFBbEIsSUFBc0IsS0FBS3lELE1BQTNCO0FBQ00sU0FBS3pELFlBQUwsQ0FBa0IsRUFBbEIsSUFBc0IsS0FBSzBELFFBQTNCO0FBQ04sU0FBSzFELFlBQUwsQ0FBa0IsRUFBbEIsSUFBc0IsS0FBSzJFLFFBQTNCO0FBQ0EsU0FBSzNFLFlBQUwsQ0FBa0IsRUFBbEIsSUFBc0IsS0FBS2lGLE1BQTNCO0FBQ0EsU0FBS2pGLFlBQUwsQ0FBa0IsRUFBbEIsSUFBc0IsS0FBS29GLFVBQTNCO0FBQ00sU0FBS3BGLFlBQUwsQ0FBa0IsRUFBbEIsSUFBc0IsS0FBS3FGLE9BQTNCLENBbkJNLENBb0JaOztBQUNBM0YsSUFBQUEsRUFBRSxDQUFDOEYsSUFBSCxDQUFRcEIsRUFBUixDQUFXLGtCQUFYLEVBQStCLFVBQVNxQixDQUFULEVBQVlDLENBQVosRUFBZTtBQUM3QyxVQUFJQyxTQUFTLEdBQUcsQ0FBQyxDQUFDRixDQUFELEVBQUlDLENBQUosQ0FBRCxDQUFoQjtBQUNBLFVBQUluRixHQUFHLEdBQUdiLEVBQUUsQ0FBQ1MsSUFBSCxDQUFRLFlBQVIsRUFBc0JFLFlBQXRCLENBQW1DLFFBQW5DLENBQVY7O0FBQ0EsV0FBSyxJQUFJdUYsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR3JGLEdBQUcsQ0FBQ3NGLEdBQUosQ0FBUUosQ0FBUixFQUFXQyxDQUFYLEVBQWM5QixNQUFsQyxFQUEwQ2dDLENBQUMsRUFBM0M7QUFDQ0QsUUFBQUEsU0FBUyxDQUFDbEQsSUFBVixDQUFlbEMsR0FBRyxDQUFDc0YsR0FBSixDQUFRSixDQUFSLEVBQVdDLENBQVgsRUFBY0UsQ0FBZCxDQUFmO0FBREQ7O0FBRUEsVUFBSWxGLElBQUksR0FBQ2hCLEVBQUUsQ0FBQ1MsSUFBSCxDQUFRLFFBQVIsRUFBa0JFLFlBQWxCLENBQStCLFlBQS9CLEVBQTZDTSxTQUF0RDtBQUNBLFVBQUlPLEtBQUssR0FBQ0MsTUFBTSxDQUFDVCxJQUFJLENBQUNVLElBQUwsQ0FBVSxDQUFWLENBQUQsQ0FBaEI7QUFDQSxVQUFJQyxRQUFRLEdBQUNILEtBQUssR0FBQyxDQUFOLEdBQVEsQ0FBUixHQUFVQSxLQUFLLEdBQUMsQ0FBaEIsR0FBa0JBLEtBQUssR0FBQyxDQUFyQztBQUNBLFVBQUlJLE1BQU0sR0FBQ0osS0FBSyxHQUFDLENBQU4sR0FBUSxDQUFSLEdBQVVBLEtBQUssR0FBQyxDQUFoQixHQUFrQkEsS0FBSyxHQUFDLENBQW5DO0FBQ0EsVUFBSUssTUFBTSxHQUFDRixRQUFRLEdBQUMsQ0FBVCxHQUFXLENBQVgsR0FBYUEsUUFBUSxHQUFDLENBQXRCLEdBQXdCQSxRQUFRLEdBQUMsQ0FBNUM7QUFDQVgsTUFBQUEsSUFBSSxHQUFDaEIsRUFBRSxDQUFDUyxJQUFILENBQVEsMEJBQXdCZSxLQUFoQyxFQUF1Q2IsWUFBdkMsQ0FBb0QsUUFBcEQsQ0FBTDtBQUNBZ0IsTUFBQUEsUUFBUSxHQUFDM0IsRUFBRSxDQUFDUyxJQUFILENBQVEsMEJBQXdCa0IsUUFBaEMsRUFBMENoQixZQUExQyxDQUF1RCxRQUF2RCxDQUFUO0FBQ0FpQixNQUFBQSxNQUFNLEdBQUM1QixFQUFFLENBQUNTLElBQUgsQ0FBUSwwQkFBd0JtQixNQUFoQyxFQUF3Q2pCLFlBQXhDLENBQXFELFFBQXJELENBQVA7QUFDQWtCLE1BQUFBLE1BQU0sR0FBQzdCLEVBQUUsQ0FBQ1MsSUFBSCxDQUFRLDBCQUF3Qm9CLE1BQWhDLEVBQXdDbEIsWUFBeEMsQ0FBcUQsUUFBckQsQ0FBUDs7QUFDQSxXQUFLLElBQUl1RixDQUFDLEdBQUcsQ0FBYixFQUFlQSxDQUFDLEdBQUdELFNBQVMsQ0FBQy9CLE1BQTdCLEVBQXFDZ0MsQ0FBQyxFQUF0QyxFQUEwQztBQUN6QyxZQUFJRCxTQUFTLENBQUNDLENBQUQsQ0FBVCxDQUFhLENBQWIsS0FBbUJ0RSxNQUFNLENBQUNSLElBQTFCLElBQWtDNkUsU0FBUyxDQUFDQyxDQUFELENBQVQsQ0FBYSxDQUFiLEtBQW1CdEUsTUFBTSxDQUFDUCxJQUFoRSxFQUFzRTtBQUNyRU8sVUFBQUEsTUFBTSxDQUFDRSxLQUFQLElBQWdCZCxJQUFJLENBQUNlLE1BQUwsR0FBWSxDQUE1QjtBQUErQlQsVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlLLE1BQU0sQ0FBQ3dFLFFBQW5CO0FBQThCOztBQUM5RCxZQUFJSCxTQUFTLENBQUNDLENBQUQsQ0FBVCxDQUFhLENBQWIsS0FBbUJyRSxNQUFNLENBQUNULElBQTFCLElBQWtDNkUsU0FBUyxDQUFDQyxDQUFELENBQVQsQ0FBYSxDQUFiLEtBQW1CckUsTUFBTSxDQUFDUixJQUFoRSxFQUFzRTtBQUNyRVEsVUFBQUEsTUFBTSxDQUFDQyxLQUFQLElBQWdCZCxJQUFJLENBQUNlLE1BQUwsR0FBWSxDQUE1QjtBQUErQlQsVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlNLE1BQU0sQ0FBQ3VFLFFBQW5CO0FBQThCOztBQUM5RCxZQUFJeEUsTUFBTSxDQUFDRSxLQUFQLElBQWdCLENBQXBCLEVBQ0NGLE1BQU0sQ0FBQ2MsTUFBUCxHQUFnQixDQUFoQjtBQUNELFlBQUliLE1BQU0sQ0FBQ0MsS0FBUCxJQUFnQixDQUFwQixFQUNDRCxNQUFNLENBQUNhLE1BQVAsR0FBZ0IsQ0FBaEI7QUFDRDs7QUFDRDFCLE1BQUFBLElBQUksQ0FBQ2dCLFFBQUwsSUFBZSxLQUFLNUIsUUFBTCxDQUFjLENBQWQsQ0FBZjtBQUNBSixNQUFBQSxFQUFFLENBQUNTLElBQUgsQ0FBUSxhQUFSLEVBQXVCRSxZQUF2QixDQUFvQyxNQUFwQyxFQUE0Q3NCLFVBQTVDLENBQXVELENBQXZEO0FBQ0FqQyxNQUFBQSxFQUFFLENBQUNTLElBQUgsQ0FBUSxhQUFSLEVBQXVCQyxNQUF2QixHQUFnQyxJQUFoQyxDQTFCNkMsQ0EwQlA7O0FBQ3RDVixNQUFBQSxFQUFFLENBQUNTLElBQUgsQ0FBUSxxQkFBUixFQUErQkMsTUFBL0IsR0FBd0MsSUFBeEMsQ0EzQjZDLENBMkJBO0FBQzdDLEtBNUJELEVBNEJHLElBNUJILEVBckJZLENBa0RaOztBQUNBVixJQUFBQSxFQUFFLENBQUM4RixJQUFILENBQVFwQixFQUFSLENBQVcsaUJBQVgsRUFBOEIsVUFBU3FCLENBQVQsRUFBWUMsQ0FBWixFQUFlO0FBQzVDLFVBQUlLLFFBQVEsR0FBRyxDQUFDLENBQUNOLENBQUQsRUFBSUMsQ0FBSixDQUFELENBQWY7QUFDQSxVQUFJbkYsR0FBRyxHQUFHYixFQUFFLENBQUNTLElBQUgsQ0FBUSxZQUFSLEVBQXNCRSxZQUF0QixDQUFtQyxRQUFuQyxDQUFWO0FBQ0EsVUFBSU8sR0FBRyxHQUFHTCxHQUFHLENBQUNNLE1BQUosQ0FBVzRFLENBQVgsRUFBYUMsQ0FBYixDQUFWO0FBQ0EsVUFBSWhGLElBQUksR0FBQ2hCLEVBQUUsQ0FBQ1MsSUFBSCxDQUFRLFFBQVIsRUFBa0JFLFlBQWxCLENBQStCLFlBQS9CLEVBQTZDd0IsV0FBdEQ7O0FBQ0EsV0FBSyxJQUFJK0QsQ0FBQyxHQUFDLENBQVgsRUFBYUEsQ0FBQyxHQUFDLEVBQWYsRUFBa0IsRUFBRUEsQ0FBcEI7QUFDQyxhQUFLLElBQUlJLENBQUMsR0FBQyxDQUFYLEVBQWFBLENBQUMsR0FBQyxFQUFmLEVBQWtCLEVBQUVBLENBQXBCLEVBQXNCO0FBQ3JCLGNBQUlwRixHQUFHLENBQUNnRixDQUFELENBQUgsQ0FBT0ksQ0FBUCxLQUFXLENBQUMsQ0FBWixJQUFlcEYsR0FBRyxDQUFDZ0YsQ0FBRCxDQUFILENBQU9JLENBQVAsS0FBVyxDQUE5QixFQUNDRCxRQUFRLENBQUN0RCxJQUFULENBQWMsQ0FBQ21ELENBQUQsRUFBR0ksQ0FBSCxDQUFkO0FBQ0Q7QUFKRjs7QUFLQXRGLE1BQUFBLElBQUksQ0FBQ3VGLElBQUwsQ0FBVXhELElBQVYsQ0FBZXNELFFBQWY7QUFDQSxVQUFJeEQsSUFBSSxHQUFDN0MsRUFBRSxDQUFDUyxJQUFILENBQVEsUUFBUixFQUFrQkUsWUFBbEIsQ0FBK0IsTUFBL0IsQ0FBVDtBQUNBa0MsTUFBQUEsSUFBSSxDQUFDQyxRQUFMLENBQWNDLElBQWQsQ0FBbUI7QUFDbEJDLFFBQUFBLE9BQU8sRUFBQ0MsTUFBTSxDQUFDQyxNQUFQLENBQWNDLE9BQWQsR0FBc0IsQ0FEWjtBQUVsQkMsUUFBQUEsTUFBTSxFQUFDcEMsSUFGVztBQUdsQnFDLFFBQUFBLEdBQUcsRUFBQyxlQUFVO0FBQ2IsY0FBSSxLQUFLRCxNQUFMLElBQWVwRCxFQUFFLENBQUNTLElBQUgsQ0FBUSxRQUFSLEVBQWtCRSxZQUFsQixDQUErQixZQUEvQixFQUE2Q3dCLFdBQWhFLEVBQ0MsT0FBTyxLQUFQO0FBQ0RuQixVQUFBQSxJQUFJLENBQUN1RixJQUFMLENBQVV6QixNQUFWLENBQWlCLENBQWpCLEVBQW1CLENBQW5CO0FBQ0EsaUJBQU8sSUFBUDtBQUNBO0FBUmlCLE9BQW5CO0FBVUE5RCxNQUFBQSxJQUFJLENBQUNnQixRQUFMLElBQWUsS0FBSzVCLFFBQUwsQ0FBYyxFQUFkLENBQWY7QUFDQUosTUFBQUEsRUFBRSxDQUFDUyxJQUFILENBQVEsYUFBUixFQUF1QkUsWUFBdkIsQ0FBb0MsTUFBcEMsRUFBNENzQixVQUE1QyxDQUF1RCxFQUF2RDtBQUNBakMsTUFBQUEsRUFBRSxDQUFDUyxJQUFILENBQVEsYUFBUixFQUF1QkMsTUFBdkIsR0FBZ0MsSUFBaEMsQ0F4QjRDLENBd0JOOztBQUN0Q1YsTUFBQUEsRUFBRSxDQUFDUyxJQUFILENBQVEscUJBQVIsRUFBK0JDLE1BQS9CLEdBQXdDLElBQXhDLENBekI0QyxDQXlCQztBQUM3QyxLQTFCRCxFQTBCRyxJQTFCSDtBQTJCRyxHQTNlSTtBQTZlTDhGLEVBQUFBLEtBN2VLLG1CQTZlSSxDQUVSLENBL2VJLENBaWZMOztBQWpmSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBjYy5DbGFzczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgY2FyZENvc3Q6W2NjLkludGVnZXJdLFxyXG4gICAgICAgIGNhcmRGdW5jdGlvbjpudWxsLFxyXG4gICAgfSxcclxuICAgIC8v5Y2h54mM5ZON5bqU5Ye95pWw5Lit55qEdGhpc+S4jeaYr2NhcmQuanNcclxuXHRcclxuXHRib29tXzA6IGZ1bmN0aW9uKGNhcmQpIHtcclxuXHRcdGNjLmZpbmQoJ0NhbnZhcy9EZWNrJykuYWN0aXZlID0gZmFsc2U7Ly/mmoLml7bkuI3orqnngrnmiYvniYzloIZcclxuXHRcdGNjLmZpbmQoJ0NhbnZhcy9lbmRfY2FyZF9idG4nKS5hY3RpdmUgPSBmYWxzZTsvL+aaguaXtuS4jeiuqee7k+adn+WHuueJjFxyXG5cdFx0Y2MuZmluZCgnQ2FudmFzL0RlY2snKS5nZXRDb21wb25lbnQoJ0RlY2snKS5zaG93VGlwcyhcIuivt+mAieaLqeimgei9sOeCuOeahOWcsOWbvuWdl1wiKTtcclxuXHRcdHZhciBtYXAgPSBjYy5maW5kKCdDYW52YXMvbWFwJykuZ2V0Q29tcG9uZW50KCdHZXRNYXAnKTtcclxuXHRcdG1hcC5vcGVuQWxsTW9uaXRvcignYm9vbS1jZWxsLWNob3NlbicpO1xyXG5cdH0sXHJcblx0bWlzc2lsZV8xOiBmdW5jdGlvbihjYXJkKSB7XHJcblx0XHR2YXIgcm9sZT1jYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoJ2dsb2JhbEdhbWUnKS5ub3dQbGF5ZXI7XHJcblx0XHR2YXIgbWFwID0gY2MuZmluZCgnQ2FudmFzL21hcCcpLmdldENvbXBvbmVudCgnR2V0TWFwJyk7XHJcblx0XHR2YXIgZGlzID0gbWFwLkJmc0Rpcyhyb2xlLmdldENvbXBvbmVudCgnUGVyc29uJykucG9zWCwgcm9sZS5nZXRDb21wb25lbnQoJ1BlcnNvbicpLnBvc1kpO1xyXG5cdFx0Y29uc29sZS5sb2coZGlzKTtcclxuXHRcdHZhciBpbmRleD1OdW1iZXIocm9sZS5uYW1lWzZdKTtcclxuICAgICAgICB2YXIgdGVhbW1hdGU9aW5kZXgrMj40P2luZGV4LTI6aW5kZXgrMjtcclxuICAgICAgICB2YXIgZW5lbXkxPWluZGV4KzE+ND9pbmRleC0zOmluZGV4KzE7XHJcbiAgICAgICAgdmFyIGVuZW15Mj10ZWFtbWF0ZSsxPjQ/dGVhbW1hdGUtMzp0ZWFtbWF0ZSsxO1xyXG5cdFx0ZW5lbXkxID0gY2MuZmluZChcIkNhbnZhcy9QZXJzb25zL1BlcnNvblwiK2VuZW15MSkuZ2V0Q29tcG9uZW50KCdQZXJzb24nKTtcclxuXHRcdGVuZW15MiA9IGNjLmZpbmQoXCJDYW52YXMvUGVyc29ucy9QZXJzb25cIitlbmVteTIpLmdldENvbXBvbmVudCgnUGVyc29uJyk7XHJcblx0XHRpZiAoZGlzW2VuZW15MS5wb3NYXVtlbmVteTEucG9zWV0gPD0gNSlcclxuXHRcdFx0ZW5lbXkxLmJsb29kIC09IHJvbGUuYXR0YWNrO1xyXG5cdFx0aWYgKGRpc1tlbmVteTIucG9zWF1bZW5lbXkyLnBvc1ldIDw9IDUpXHJcblx0XHRcdGVuZW15Mi5ibG9vZCAtPSByb2xlLmF0dGFjaztcclxuXHRcdHJvbGUuZ2V0Q29tcG9uZW50KCdQZXJzb24nKS5tb2JpbGl0eS09Y2FyZC5jYXJkQ29zdFsxXTtcclxuICAgICAgICBjYy5maW5kKCdDYW52YXMvRGVjaycpLmdldENvbXBvbmVudCgnRGVjaycpLnJlbW92ZUNhcmQoMSk7XHJcblx0fSxcclxuXHRcclxuXHRtaW5lXzI6IGZ1bmN0aW9uKGNhcmQpIHtcclxuXHRcdHZhciByb2xlPWNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudCgnZ2xvYmFsR2FtZScpLm5vd1Byb3BlcnR5O1xyXG5cdFx0dmFyIG1hcCA9IGNjLmZpbmQoJ0NhbnZhcy9tYXAnKS5nZXRDb21wb25lbnQoJ0dldE1hcCcpO1xyXG5cdFx0bWFwLm1hcFtyb2xlLnBvc1hdW3JvbGUucG9zWV0uZ2V0Q29tcG9uZW50KCdDZWxsJykuaGF2ZU1pbmUgPSAxO1xyXG5cdFx0bWFwLm1hcFtyb2xlLnBvc1hdW3JvbGUucG9zWV0uZ2V0Q29tcG9uZW50KCdDZWxsJykubWluZUF0dGFjayA9IHJvbGUuYXR0YWNrICogMjtcclxuXHRcdHJvbGUuZ2V0Q29tcG9uZW50KCdQZXJzb24nKS5tb2JpbGl0eS09Y2FyZC5jYXJkQ29zdFsyXTtcclxuICAgICAgICBjYy5maW5kKCdDYW52YXMvRGVjaycpLmdldENvbXBvbmVudCgnRGVjaycpLnJlbW92ZUNhcmQoMik7XHJcblx0fSxcclxuXHRcclxuICAgIHNoaWVsZF8zOmZ1bmN0aW9uKGNhcmQpe1xyXG4gICAgICAgIHZhciByb2xlPWNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudCgnZ2xvYmFsR2FtZScpLm5vd1Byb3BlcnR5O1xyXG4gICAgICAgIHJvbGUuc2hpZWxkPTE7XHJcbiAgICAgICAgcm9sZS5tb2JpbGl0eS09Y2FyZC5jYXJkQ29zdFszXTtcclxuICAgICAgICBjYy5maW5kKCdDYW52YXMvRGVjaycpLmdldENvbXBvbmVudCgnRGVjaycpLnJlbW92ZUNhcmQoMyk7XHJcbiAgICB9LFxyXG4gICAgaGFsZlNoaWVsZF80OmZ1bmN0aW9uKGNhcmQpe1xyXG4gICAgICAgIHZhciByb2xlPWNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudCgnZ2xvYmFsR2FtZScpLm5vd1BsYXllcjtcclxuICAgICAgICB2YXIgaW5kZXg9TnVtYmVyKHJvbGUubmFtZVs2XSk7XHJcbiAgICAgICAgdmFyIHRlYW1tYXRlPWluZGV4KzI+ND9pbmRleC0yOmluZGV4KzI7XHJcbiAgICAgICAgdGVhbW1hdGU9Y2MuZmluZChcIkNhbnZhcy9QZXJzb25zL1BlcnNvblwiK3RlYW1tYXRlKS5nZXRDb21wb25lbnQoJ1BlcnNvbicpO1xyXG5cdFx0cm9sZSA9IGNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudCgnZ2xvYmFsR2FtZScpLm5vd1Byb3BlcnR5O1xyXG4gICAgICAgIHJvbGUuaGFsZlNoaWVsZCs9MTtcclxuICAgICAgICBpZiAodGVhbW1hdGUuaXNEZWFkPT0wKVxyXG4gICAgICAgICAgICB0ZWFtbWF0ZS5oYWxmU2hpZWxkKz0xO1xyXG4gICAgICAgIHJvbGUubW9iaWxpdHktPWNhcmQuY2FyZENvc3RbNF07XHJcbiAgICAgICAgY2MuZmluZCgnQ2FudmFzL0RlY2snKS5nZXRDb21wb25lbnQoJ0RlY2snKS5yZW1vdmVDYXJkKDQpO1xyXG4gICAgfSxcclxuICAgIGJsZXNzXzU6ZnVuY3Rpb24oY2FyZCl7XHJcbiAgICAgICAgdmFyIHJvbGU9Y2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdnbG9iYWxHYW1lJykubm93UGxheWVyO1xyXG4gICAgICAgIHZhciBpbmRleD1OdW1iZXIocm9sZS5uYW1lWzZdKTtcclxuICAgICAgICB2YXIgdGVhbW1hdGU9aW5kZXgrMj40P2luZGV4LTI6aW5kZXgrMjtcclxuICAgICAgICByb2xlLmdldENvbXBvbmVudCgnUGVyc29uJykuYXR0Y2FrKz0xO1xyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXMvUGVyc29ucy9QZXJzb25cIit0ZWFtbWF0ZSkuZ2V0Q29tcG9uZW50KCdQZXJzb24nKS5hdHRhY2srPTE7ICAgIFxyXG4gICAgICAgIHZhciBidWZmPWNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudCgnQnVmZicpO1xyXG4gICAgICAgIGJ1ZmYudG9kb0xpc3QucHVzaCh7XHJcbiAgICAgICAgICAgIGVuZFR1cm46d2luZG93Lmdsb2JhbC5ub3dUdXJuKzIsXHJcbiAgICAgICAgICAgIHBlcnNvbjpyb2xlLFxyXG4gICAgICAgICAgICBhY3Q6ZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRpZiAodGhpcy5wZXJzb24gIT0gY2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdnbG9iYWxHYW1lJykubm93UGxheWVyKVxyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wZXJzb24uZ2V0Q29tcG9uZW50KCdQZXJzb24nKS5hdHRhY2s9TWF0aC5tYXgoMCx0aGlzLnBlcnNvbi5nZXRDb21wb25lbnQoJ1BlcnNvbicpLmF0dGFjay0xKTtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cdFx0YnVmZi50b2RvTGlzdC5wdXNoKHtcclxuICAgICAgICAgICAgZW5kVHVybjp3aW5kb3cuZ2xvYmFsLm5vd1R1cm4rMixcclxuICAgICAgICAgICAgcGVyc29uOmNjLmZpbmQoXCJDYW52YXMvUGVyc29ucy9QZXJzb25cIit0ZWFtbWF0ZSksXHJcbiAgICAgICAgICAgIGFjdDpmdW5jdGlvbigpe1xyXG5cdFx0XHRcdGlmICh0aGlzLnBlcnNvbiAhPSBjYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoJ2dsb2JhbEdhbWUnKS5ub3dQbGF5ZXIpXHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBlcnNvbi5nZXRDb21wb25lbnQoJ1BlcnNvbicpLmF0dGFjaz1NYXRoLm1heCgwLHRoaXMucGVyc29uLmdldENvbXBvbmVudCgnUGVyc29uJykuYXR0YWNrLTEpO1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcm9sZS5nZXRDb21wb25lbnQoJ1BlcnNvbicpLm1vYmlsaXR5LT1jYXJkLmNhcmRDb3N0WzVdO1xyXG4gICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9EZWNrJykuZ2V0Q29tcG9uZW50KCdEZWNrJykucmVtb3ZlQ2FyZCg1KTsgICAgICAgIFxyXG4gICAgfSxcclxuICAgIHdlYWtfNjpmdW5jdGlvbihjYXJkKXtcclxuICAgICAgICB2YXIgcm9sZT1jYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoJ2dsb2JhbEdhbWUnKS5ub3dQbGF5ZXI7XHJcbiAgICAgICAgdmFyIGluZGV4PU51bWJlcihyb2xlLm5hbWVbNl0pO1xyXG4gICAgICAgIHZhciB0ZWFtbWF0ZT1pbmRleCsyPjQ/aW5kZXgtMjppbmRleCsyO1xyXG4gICAgICAgIHZhciBlbmVteTE9aW5kZXgrMT40P2luZGV4LTM6aW5kZXgrMTtcclxuICAgICAgICB2YXIgZW5lbXkyPXRlYW1tYXRlKzE+ND90ZWFtbWF0ZS0zOnRlYW1tYXRlKzE7XHJcbiAgICAgICAgZW5lbXkxPWNjLmZpbmQoXCJDYW52YXMvUGVyc29ucy9QZXJzb25cIitlbmVteTEpLmdldENvbXBvbmVudCgnUGVyc29uJyk7XHJcbiAgICAgICAgZW5lbXkyPWNjLmZpbmQoXCJDYW52YXMvUGVyc29ucy9QZXJzb25cIitlbmVteTIpLmdldENvbXBvbmVudCgnUGVyc29uJyk7XHJcbiAgICAgICAgdmFyIGJ1ZmY9Y2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdCdWZmJyk7XHJcbiAgICAgICAgYnVmZi50b2RvTGlzdC5wdXNoKHtcclxuICAgICAgICAgICAgZW5kVHVybjp3aW5kb3cuZ2xvYmFsLm5vd1R1cm4rMixcclxuICAgICAgICAgICAgcGVyc29uOltlbmVteTEsZW5lbXkxLmF0dGFjayE9MF0sXHJcbiAgICAgICAgICAgIGFjdDpmdW5jdGlvbigpe1xyXG5cdFx0XHRcdGlmICh0aGlzLnBlcnNvblswXSAhPSBjYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoJ2dsb2JhbEdhbWUnKS5ub3dQcm9wZXJ0eSlcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGVyc29uWzBdLmF0dGFjays9dGhpcy5wZXJzb25bMV07XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTsgXHJcblx0XHRidWZmLnRvZG9MaXN0LnB1c2goe1xyXG4gICAgICAgICAgICBlbmRUdXJuOndpbmRvdy5nbG9iYWwubm93VHVybisyLFxyXG4gICAgICAgICAgICBwZXJzb246W2VuZW15MixlbmVteTIuYXR0YWNrIT0wXSxcclxuICAgICAgICAgICAgYWN0OmZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0aWYgKHRoaXMucGVyc29uWzBdICE9IGNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudCgnZ2xvYmFsR2FtZScpLm5vd1Byb3BlcnR5KVxyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wZXJzb25bMF0uYXR0YWNrKz10aGlzLnBlcnNvblsxXTtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGVuZW15MS5hdHRhY2s9TWF0aC5tYXgoMCxlbmVteTEuYXR0YWNrLTEpO1xyXG4gICAgICAgIGVuZW15Mi5hdHRhY2s9TWF0aC5tYXgoMCxlbmVteTIuYXR0YWNrLTEpO1xyXG4gICAgICAgIHJvbGUuZ2V0Q29tcG9uZW50KCdQZXJzb24nKS5tb2JpbGl0eS09Y2FyZC5jYXJkQ29zdFs2XTtcclxuICAgICAgICBjYy5maW5kKCdDYW52YXMvRGVjaycpLmdldENvbXBvbmVudCgnRGVjaycpLnJlbW92ZUNhcmQoNik7XHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG5cdFxyXG5cdHRlYW1Gb3JjZV83OiBmdW5jdGlvbihjYXJkKSB7XHJcblx0XHR2YXIgcm9sZT1jYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoJ2dsb2JhbEdhbWUnKS5ub3dQbGF5ZXI7XHJcbiAgICAgICAgdmFyIGluZGV4PU51bWJlcihyb2xlLm5hbWVbNl0pO1xyXG4gICAgICAgIHZhciB0ZWFtbWF0ZT1pbmRleCsyPjQ/aW5kZXgtMjppbmRleCsyO1xyXG4gICAgICAgIHZhciBlbmVteTE9aW5kZXgrMT40P2luZGV4LTM6aW5kZXgrMTtcclxuICAgICAgICB2YXIgZW5lbXkyPXRlYW1tYXRlKzE+ND90ZWFtbWF0ZS0zOnRlYW1tYXRlKzE7XHJcbiAgICAgICAgcm9sZT1jYy5maW5kKFwiQ2FudmFzL1BlcnNvbnMvUGVyc29uXCIraW5kZXgpLmdldENvbXBvbmVudCgnUGVyc29uJyk7XHJcbiAgICAgICAgdGVhbW1hdGU9Y2MuZmluZChcIkNhbnZhcy9QZXJzb25zL1BlcnNvblwiK3RlYW1tYXRlKS5nZXRDb21wb25lbnQoJ1BlcnNvbicpO1xyXG4gICAgICAgIGVuZW15MT1jYy5maW5kKFwiQ2FudmFzL1BlcnNvbnMvUGVyc29uXCIrZW5lbXkxKS5nZXRDb21wb25lbnQoJ1BlcnNvbicpO1xyXG4gICAgICAgIGVuZW15Mj1jYy5maW5kKFwiQ2FudmFzL1BlcnNvbnMvUGVyc29uXCIrZW5lbXkyKS5nZXRDb21wb25lbnQoJ1BlcnNvbicpO1xyXG5cdFx0aWYgKHRlYW1tYXRlLmlzRGVhZCA9PSAxKVxyXG5cdFx0XHRjYy5maW5kKCdDYW52YXMvRGVjaycpLmdldENvbXBvbmVudCgnRGVjaycpLnNob3dUaXBzKCfpmJ/lj4vlt7LmrbvkuqHvvIznmb3nu5kgUUFRJyk7XHJcblx0XHRlbHNlIGlmICg3IGluIHRlYW1tYXRlLmNhcmRzKSB7XHJcblx0XHRcdGlmICh0ZWFtbWF0ZS5tb2JpbGl0eSA8IDUpXHJcblx0XHRcdFx0Y2MuZmluZCgnQ2FudmFzL0RlY2snKS5nZXRDb21wb25lbnQoJ0RlY2snKS5zaG93VGlwcygn6Zif5Y+L6KGM5Yqo5YC85LiN6Laz77yM55m957uZIFFBUScpO1xyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRlbmVteTEuYmxvb2QgLT0gMztcclxuXHRcdFx0XHRlbmVteTIuYmxvb2QgLT0gMztcclxuXHRcdFx0XHRpZiAoZW5lbXkxLmJsb29kIDw9IDApXHJcblx0XHRcdFx0XHRlbmVteTEuaXNEZWFkID0gMTtcclxuXHRcdFx0XHRpZiAoZW5lbXkyLmJsb29kIDw9IDApXHJcblx0XHRcdFx0XHRlbmVteTIuaXNEZWFkID0gMTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdGNjLmZpbmQoJ0NhbnZhcy9EZWNrJykuZ2V0Q29tcG9uZW50KCdEZWNrJykuc2hvd1RpcHMoJ+mYn+WPi+aXoOatpOeJjO+8jOeZvee7mSBRQVEnKTtcclxuXHRcdH1cclxuXHRcdHJvbGUubW9iaWxpdHktPWNhcmQuY2FyZENvc3RbN107XHJcbiAgICAgICAgY2MuZmluZCgnQ2FudmFzL0RlY2snKS5nZXRDb21wb25lbnQoJ0RlY2snKS5yZW1vdmVDYXJkKDcpO1xyXG5cdH0sXHJcblx0XHJcbiAgICBoZWFsXzg6ZnVuY3Rpb24oY2FyZCl7XHJcbiAgICAgICAgdmFyIHJvbGU9Y2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdnbG9iYWxHYW1lJykubm93UHJvcGVydHk7XHJcbiAgICAgICAgcm9sZS5ibG9vZCs9MTtcclxuICAgICAgICByb2xlLm1vYmlsaXR5LT1jYXJkLmNhcmRDb3N0WzhdO1xyXG4gICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9EZWNrJykuZ2V0Q29tcG9uZW50KCdEZWNrJykucmVtb3ZlQ2FyZCg4KTtcclxuICAgIH0sXHJcbiAgICBob2x5Tm92YV85OmZ1bmN0aW9uKGNhcmQpe1xyXG4gICAgICAgIHZhciByb2xlPWNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudCgnZ2xvYmFsR2FtZScpLm5vd1BsYXllcjtcclxuICAgICAgICB2YXIgaW5kZXg9TnVtYmVyKHJvbGUubmFtZVs2XSk7XHJcbiAgICAgICAgdmFyIHRlYW1tYXRlPWluZGV4KzI+ND9pbmRleC0yOmluZGV4KzI7XHJcbiAgICAgICAgdmFyIGVuZW15MT1pbmRleCsxPjQ/aW5kZXgtMzppbmRleCsxO1xyXG4gICAgICAgIHZhciBlbmVteTI9dGVhbW1hdGUrMT40P3RlYW1tYXRlLTM6dGVhbW1hdGUrMTtcclxuICAgICAgICByb2xlPWNjLmZpbmQoXCJDYW52YXMvUGVyc29ucy9QZXJzb25cIitpbmRleCkuZ2V0Q29tcG9uZW50KCdQZXJzb24nKTtcclxuICAgICAgICB0ZWFtbWF0ZT1jYy5maW5kKFwiQ2FudmFzL1BlcnNvbnMvUGVyc29uXCIrdGVhbW1hdGUpLmdldENvbXBvbmVudCgnUGVyc29uJyk7XHJcbiAgICAgICAgZW5lbXkxPWNjLmZpbmQoXCJDYW52YXMvUGVyc29ucy9QZXJzb25cIitlbmVteTEpLmdldENvbXBvbmVudCgnUGVyc29uJyk7XHJcbiAgICAgICAgZW5lbXkyPWNjLmZpbmQoXCJDYW52YXMvUGVyc29ucy9QZXJzb25cIitlbmVteTIpLmdldENvbXBvbmVudCgnUGVyc29uJyk7XHJcbiAgICAgICAgaWYgKHJvbGUuaXNEZWFkPT0wKVxyXG4gICAgICAgICAgICByb2xlLmJsb29kKz0yO1xyXG4gICAgICAgIGlmICh0ZWFtbWF0ZS5pc0RlYWQ9PTApXHJcbiAgICAgICAgICAgIHRlYW1tYXRlLmJsb29kKz0yO1xyXG4gICAgICAgIGlmIChlbmVteTEuaXNEZWFkPT0wKVxyXG4gICAgICAgICAgICBlbmVteTEuYmxvb2QrPTE7XHJcbiAgICAgICAgaWYgKGVuZW15Mi5pc0RlYWQ9PTApXHJcbiAgICAgICAgICAgIGVuZW15Mi5ibG9vZCs9MTtcclxuICAgICAgICByb2xlLm1vYmlsaXR5LT1jYXJkLmNhcmRDb3N0WzldO1xyXG4gICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9EZWNrJykuZ2V0Q29tcG9uZW50KCdEZWNrJykucmVtb3ZlQ2FyZCg5KTtcclxuICAgIH0sXHJcblx0XHJcblx0dGVsZXNjb3BlXzEwOiBmdW5jdGlvbihjYXJkKSB7XHJcblx0XHR2YXIgcm9sZT1jYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoJ2dsb2JhbEdhbWUnKS5ub3dQcm9wZXJ0eTtcclxuXHRcdHJvbGUuc2lnaHQrKztcclxuXHRcdHZhciBidWZmPWNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudCgnQnVmZicpO1xyXG4gICAgICAgIGJ1ZmYudG9kb0xpc3QucHVzaCh7XHJcbiAgICAgICAgICAgIGVuZFR1cm46d2luZG93Lmdsb2JhbC5ub3dUdXJuKzUsXHJcbiAgICAgICAgICAgIHBlcnNvbjpyb2xlLFxyXG4gICAgICAgICAgICBhY3Q6ZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRpZiAodGhpcy5wZXJzb24gIT0gY2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdnbG9iYWxHYW1lJykubm93UHJvcGVydHkpXHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBlcnNvbi5zaWdodC0tO1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcm9sZS5tb2JpbGl0eS09Y2FyZC5jYXJkQ29zdFsxMF07XHJcbiAgICAgICAgY2MuZmluZCgnQ2FudmFzL0RlY2snKS5nZXRDb21wb25lbnQoJ0RlY2snKS5yZW1vdmVDYXJkKDEwKTsgICAgICAgIFxyXG5cdH0sXHJcblx0ZXllXzExOmZ1bmN0aW9uKGNhcmQpe1xyXG5cdFx0Y2MuZmluZCgnQ2FudmFzL0RlY2snKS5hY3RpdmUgPSBmYWxzZTsvL+aaguaXtuS4jeiuqeeCueaJi+eJjOWghlxyXG5cdFx0Y2MuZmluZCgnQ2FudmFzL2VuZF9jYXJkX2J0bicpLmFjdGl2ZSA9IGZhbHNlOy8v5pqC5pe25LiN6K6p57uT5p2f5Ye654mMXHJcblx0XHRjYy5maW5kKCdDYW52YXMvRGVjaycpLmdldENvbXBvbmVudCgnRGVjaycpLnNob3dUaXBzKFwi6K+36YCJ5oup6KaB5pS+572u55y8552b55qE5Zyw5Zu+5Z2XXCIpO1xyXG5cdFx0dmFyIG1hcCA9IGNjLmZpbmQoJ0NhbnZhcy9tYXAnKS5nZXRDb21wb25lbnQoJ0dldE1hcCcpO1xyXG5cdFx0bWFwLm9wZW5BbGxNb25pdG9yKCdleWUtY2VsbC1jaG9zZW4nKTtcdFx0XHJcblx0fSxcclxuICAgIHRvdWdoXzEyOmZ1bmN0aW9uKGNhcmQpe1xyXG4gICAgICAgIHZhciByb2xlPWNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudCgnZ2xvYmFsR2FtZScpLm5vd1Byb3BlcnR5O1xyXG4gICAgICAgIHJvbGUuYXR0YWNrKj0yO1xyXG4gICAgICAgIHZhciBidWZmPWNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudCgnQnVmZicpO1xyXG4gICAgICAgIGJ1ZmYudG9kb0xpc3QucHVzaCh7XHJcbiAgICAgICAgICAgIGVuZFR1cm46d2luZG93Lmdsb2JhbC5ub3dUdXJuKzEsXHJcbiAgICAgICAgICAgIHBlcnNvbjpyb2xlLFxyXG4gICAgICAgICAgICBhY3Q6ZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRpZiAodGhpcy5wZXJzb24gIT0gY2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdnbG9iYWxHYW1lJykubm93UHJvcGVydHkpXHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBlcnNvbi5hdHRhY2s9TnVtYmVyKHRoaXMucGVyc29uLmF0dGFjay8yKTtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJvbGUubW9iaWxpdHktPWNhcmQuY2FyZENvc3RbMTJdO1xyXG4gICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9EZWNrJykuZ2V0Q29tcG9uZW50KCdEZWNrJykucmVtb3ZlQ2FyZCgxMik7ICAgICAgICBcclxuICAgIH0sXHJcblx0XHJcblx0d2FpdFN0ZWFsOiBmdW5jdGlvbigpIHtcclxuXHRcdC8vdGhpcyDkuLrkurrniannmoRwZXJzb24uanNcclxuXHRcdHZhciByb2xlPWNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudCgnZ2xvYmFsR2FtZScpLm5vd1BsYXllcjtcclxuICAgICAgICB2YXIgaW5kZXg9TnVtYmVyKHJvbGUubmFtZVs2XSk7XHJcbiAgICAgICAgdmFyIHRlYW1tYXRlPWluZGV4KzI+ND9pbmRleC0yOmluZGV4KzI7XHJcbiAgICAgICAgdmFyIGVuZW15MT1pbmRleCsxPjQ/aW5kZXgtMzppbmRleCsxO1xyXG4gICAgICAgIHZhciBlbmVteTI9dGVhbW1hdGUrMT40P3RlYW1tYXRlLTM6dGVhbW1hdGUrMTtcclxuICAgICAgICByb2xlPWNjLmZpbmQoXCJDYW52YXMvUGVyc29ucy9QZXJzb25cIitpbmRleCkuZ2V0Q29tcG9uZW50KCdQZXJzb24nKTtcclxuICAgICAgICB0ZWFtbWF0ZT1jYy5maW5kKFwiQ2FudmFzL1BlcnNvbnMvUGVyc29uXCIrdGVhbW1hdGUpLmdldENvbXBvbmVudCgnUGVyc29uJyk7XHJcbiAgICAgICAgZW5lbXkxPWNjLmZpbmQoXCJDYW52YXMvUGVyc29ucy9QZXJzb25cIitlbmVteTEpLmdldENvbXBvbmVudCgnUGVyc29uJyk7XHJcbiAgICAgICAgZW5lbXkyPWNjLmZpbmQoXCJDYW52YXMvUGVyc29ucy9QZXJzb25cIitlbmVteTIpLmdldENvbXBvbmVudCgnUGVyc29uJyk7XHJcblx0XHRcclxuXHRcdGlmICh0aGlzLmNhcmRzLmxlbmd0aCA9PSAwKSB7XHJcblx0XHRcdGNjLmZpbmQoJ0NhbnZhcy9EZWNrJykuZ2V0Q29tcG9uZW50KCdEZWNrJykuc2hvd1RpcHMoJ+aXoOaJi+eJjOWPr+ebl+WPliBRQVEnKTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHR2YXIgcmQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqdGhpcy5jYXJkcy5sZW5ndGgpO1xyXG5cdFx0XHR2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHdpbmRvdy5nbG9iYWwuY2FyZG5vZGVbdGhpcy5jYXJkc1tyZF1dKTtcclxuXHRcdFx0bm9kZS5zZXRQb3NpdGlvbigwLCAwKTtcclxuXHRcdFx0bm9kZS5vbignbW91c2Vkb3duJywgZnVuY3Rpb24gKCBldmVudCApIHtcclxuXHRcdFx0XHR0aGlzLmRlc3Ryb3koKTtcclxuXHRcdFx0fSwgbm9kZSk7XHJcblx0XHRcdG5vZGUucGFyZW50ID0gdGhpcy5ub2RlLnBhcmVudC5wYXJlbnQ7XHJcblx0XHRcdFxyXG5cdFx0XHRyb2xlLmNhcmRzLnB1c2godGhpcy5jYXJkc1tyZF0pO1xyXG5cdFx0XHR0aGlzLmNhcmRzLnNwbGljZShyZCwgMSk7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHRlYW1tYXRlLmF2YXRhci5vZmYoJ21vdXNlZG93bicsIGNjLmZpbmQoJ0NhbnZhcy9DYXJkJykuZ2V0Q29tcG9uZW50KCdDYXJkJykud2FpdFN0ZWFsLCB0ZWFtbWF0ZSk7XHJcblx0XHRlbmVteTEuYXZhdGFyLm9mZignbW91c2Vkb3duJywgY2MuZmluZCgnQ2FudmFzL0NhcmQnKS5nZXRDb21wb25lbnQoJ0NhcmQnKS53YWl0U3RlYWwsIGVuZW15MSk7XHJcblx0XHRlbmVteTIuYXZhdGFyLm9mZignbW91c2Vkb3duJywgY2MuZmluZCgnQ2FudmFzL0NhcmQnKS5nZXRDb21wb25lbnQoJ0NhcmQnKS53YWl0U3RlYWwsIGVuZW15Mik7XHJcblx0XHRcclxuXHRcdGNjLmZpbmQoJ0NhbnZhcy9EZWNrJykuYWN0aXZlID0gdHJ1ZTtcclxuXHRcdGNjLmZpbmQoJ0NhbnZhcy9lbmRfY2FyZF9idG4nKS5hY3RpdmUgPSB0cnVlO1xyXG5cdH0sXHJcblx0XHJcblx0c3RlYWxfMTM6ZnVuY3Rpb24oY2FyZCkge1xyXG5cdFx0Y2MuZmluZCgnQ2FudmFzL0RlY2snKS5hY3RpdmUgPSBmYWxzZTsvL+aaguaXtuS4jeiuqeeCueaJi+eJjOWghlxyXG5cdFx0Y2MuZmluZCgnQ2FudmFzL2VuZF9jYXJkX2J0bicpLmFjdGl2ZSA9IGZhbHNlOy8v5pqC5pe25LiN6K6p57uT5p2f5Ye654mMXHJcblx0XHR2YXIgcm9sZT1jYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoJ2dsb2JhbEdhbWUnKS5ub3dQbGF5ZXI7XHJcbiAgICAgICAgdmFyIGluZGV4PU51bWJlcihyb2xlLm5hbWVbNl0pO1xyXG4gICAgICAgIHZhciB0ZWFtbWF0ZT1pbmRleCsyPjQ/aW5kZXgtMjppbmRleCsyO1xyXG4gICAgICAgIHZhciBlbmVteTE9aW5kZXgrMT40P2luZGV4LTM6aW5kZXgrMTtcclxuICAgICAgICB2YXIgZW5lbXkyPXRlYW1tYXRlKzE+ND90ZWFtbWF0ZS0zOnRlYW1tYXRlKzE7XHJcbiAgICAgICAgcm9sZT1jYy5maW5kKFwiQ2FudmFzL1BlcnNvbnMvUGVyc29uXCIraW5kZXgpLmdldENvbXBvbmVudCgnUGVyc29uJyk7XHJcbiAgICAgICAgdGVhbW1hdGU9Y2MuZmluZChcIkNhbnZhcy9QZXJzb25zL1BlcnNvblwiK3RlYW1tYXRlKS5nZXRDb21wb25lbnQoJ1BlcnNvbicpO1xyXG4gICAgICAgIGVuZW15MT1jYy5maW5kKFwiQ2FudmFzL1BlcnNvbnMvUGVyc29uXCIrZW5lbXkxKS5nZXRDb21wb25lbnQoJ1BlcnNvbicpO1xyXG4gICAgICAgIGVuZW15Mj1jYy5maW5kKFwiQ2FudmFzL1BlcnNvbnMvUGVyc29uXCIrZW5lbXkyKS5nZXRDb21wb25lbnQoJ1BlcnNvbicpO1xyXG5cdFx0dmFyIG1pc3QgPSBjYy5maW5kKCdDYW52YXMvbWlzdCcpLmdldENvbXBvbmVudCgnTWlzdCcpO1xyXG5cdFx0dmFyIGhhdmVQZW9wbGUgPSAwO1xyXG5cdFx0aWYgKG1pc3QubWlzdEFyclt0ZWFtbWF0ZS5wb3NYXVt0ZWFtbWF0ZS5wb3NZXS5hY3RpdmUgPT0gZmFsc2UpIHtcclxuXHRcdFx0dGVhbW1hdGUuYXZhdGFyLm9uKCdtb3VzZWRvd24nLCBjYXJkLndhaXRTdGVhbCwgdGVhbW1hdGUpO1xyXG5cdFx0XHRoYXZlUGVvcGxlID0gMTtcclxuXHRcdH1cclxuXHRcdGlmIChtaXN0Lm1pc3RBcnJbZW5lbXkxLnBvc1hdW2VuZW15MS5wb3NZXS5hY3RpdmUgPT0gZmFsc2UpIHtcclxuXHRcdFx0ZW5lbXkxLmF2YXRhci5vbignbW91c2Vkb3duJywgY2FyZC53YWl0U3RlYWwsIGVuZW15MSk7XHJcblx0XHRcdGhhdmVQZW9wbGUgPSAxO1xyXG5cdFx0fVxyXG5cdFx0aWYgKG1pc3QubWlzdEFycltlbmVteTIucG9zWF1bZW5lbXkyLnBvc1ldLmFjdGl2ZSA9PSBmYWxzZSkge1xyXG5cdFx0XHRlbmVteTIuYXZhdGFyLm9uKCdtb3VzZWRvd24nLCBjYXJkLndhaXRTdGVhbCwgZW5lbXkyKTtcclxuXHRcdFx0aGF2ZVBlb3BsZSA9IDE7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdGlmIChoYXZlUGVvcGxlID09IDApXHJcblx0XHRcdGNjLmZpbmQoJ0NhbnZhcy9EZWNrJykuZ2V0Q29tcG9uZW50KCdEZWNrJykuc2hvd1RpcHMoJ+inhumHjuWGheaXoOeOqeWutiBRQVEnKTtcclxuXHRcdHJvbGUubW9iaWxpdHktPWNhcmQuY2FyZENvc3RbMTNdO1xyXG4gICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9EZWNrJykuZ2V0Q29tcG9uZW50KCdEZWNrJykucmVtb3ZlQ2FyZCgxMyk7XHJcblx0fSxcclxuXHRcclxuXHRzdG9wTW92ZTogZnVuY3Rpb24oKSB7XHJcblx0XHQvL3RoaXPkuLrkurrniannmoRwZXJzb24uanNcclxuXHRcdHZhciByb2xlPWNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudCgnZ2xvYmFsR2FtZScpLm5vd1BsYXllcjtcclxuICAgICAgICB2YXIgaW5kZXg9TnVtYmVyKHJvbGUubmFtZVs2XSk7XHJcbiAgICAgICAgdmFyIHRlYW1tYXRlPWluZGV4KzI+ND9pbmRleC0yOmluZGV4KzI7XHJcbiAgICAgICAgdmFyIGVuZW15MT1pbmRleCsxPjQ/aW5kZXgtMzppbmRleCsxO1xyXG4gICAgICAgIHZhciBlbmVteTI9dGVhbW1hdGUrMT40P3RlYW1tYXRlLTM6dGVhbW1hdGUrMTtcclxuICAgICAgICByb2xlPWNjLmZpbmQoXCJDYW52YXMvUGVyc29ucy9QZXJzb25cIitpbmRleCkuZ2V0Q29tcG9uZW50KCdQZXJzb24nKTtcclxuICAgICAgICB0ZWFtbWF0ZT1jYy5maW5kKFwiQ2FudmFzL1BlcnNvbnMvUGVyc29uXCIrdGVhbW1hdGUpLmdldENvbXBvbmVudCgnUGVyc29uJyk7XHJcbiAgICAgICAgZW5lbXkxPWNjLmZpbmQoXCJDYW52YXMvUGVyc29ucy9QZXJzb25cIitlbmVteTEpLmdldENvbXBvbmVudCgnUGVyc29uJyk7XHJcbiAgICAgICAgZW5lbXkyPWNjLmZpbmQoXCJDYW52YXMvUGVyc29ucy9QZXJzb25cIitlbmVteTIpLmdldENvbXBvbmVudCgnUGVyc29uJyk7XHJcblx0XHRcclxuXHRcdHRoaXMuZ29FbmFibGVkID0gMDtcclxuXHRcdGVuZW15MS5hdmF0YXIub2ZmKCdtb3VzZWRvd24nLCBjYy5maW5kKCdDYW52YXMvQ2FyZCcpLmdldENvbXBvbmVudCgnQ2FyZCcpLnN0b3BNb3ZlLCBlbmVteTEpO1xyXG5cdFx0ZW5lbXkyLmF2YXRhci5vZmYoJ21vdXNlZG93bicsIGNjLmZpbmQoJ0NhbnZhcy9DYXJkJykuZ2V0Q29tcG9uZW50KCdDYXJkJykuc3RvcE1vdmUsIGVuZW15Mik7XHJcblx0XHRcclxuXHRcdGNjLmZpbmQoJ0NhbnZhcy9EZWNrJykuYWN0aXZlID0gdHJ1ZTtcclxuXHRcdGNjLmZpbmQoJ0NhbnZhcy9lbmRfY2FyZF9idG4nKS5hY3RpdmUgPSB0cnVlO1xyXG5cdH0sXHJcblx0XHJcblx0dGllXzE0OiBmdW5jdGlvbihjYXJkKSB7XHJcblx0XHRjYy5maW5kKCdDYW52YXMvRGVjaycpLmFjdGl2ZSA9IGZhbHNlOy8v5pqC5pe25LiN6K6p54K55omL54mM5aCGXHJcblx0XHRjYy5maW5kKCdDYW52YXMvZW5kX2NhcmRfYnRuJykuYWN0aXZlID0gZmFsc2U7Ly/mmoLml7bkuI3orqnnu5PmnZ/lh7rniYxcclxuXHRcdHZhciByb2xlPWNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudCgnZ2xvYmFsR2FtZScpLm5vd1BsYXllcjtcclxuICAgICAgICB2YXIgaW5kZXg9TnVtYmVyKHJvbGUubmFtZVs2XSk7XHJcbiAgICAgICAgdmFyIHRlYW1tYXRlPWluZGV4KzI+ND9pbmRleC0yOmluZGV4KzI7XHJcbiAgICAgICAgdmFyIGVuZW15MT1pbmRleCsxPjQ/aW5kZXgtMzppbmRleCsxO1xyXG4gICAgICAgIHZhciBlbmVteTI9dGVhbW1hdGUrMT40P3RlYW1tYXRlLTM6dGVhbW1hdGUrMTtcclxuICAgICAgICByb2xlPWNjLmZpbmQoXCJDYW52YXMvUGVyc29ucy9QZXJzb25cIitpbmRleCkuZ2V0Q29tcG9uZW50KCdQZXJzb24nKTtcclxuICAgICAgICB0ZWFtbWF0ZT1jYy5maW5kKFwiQ2FudmFzL1BlcnNvbnMvUGVyc29uXCIrdGVhbW1hdGUpLmdldENvbXBvbmVudCgnUGVyc29uJyk7XHJcbiAgICAgICAgZW5lbXkxPWNjLmZpbmQoXCJDYW52YXMvUGVyc29ucy9QZXJzb25cIitlbmVteTEpLmdldENvbXBvbmVudCgnUGVyc29uJyk7XHJcbiAgICAgICAgZW5lbXkyPWNjLmZpbmQoXCJDYW52YXMvUGVyc29ucy9QZXJzb25cIitlbmVteTIpLmdldENvbXBvbmVudCgnUGVyc29uJyk7XHJcblx0XHR2YXIgbWlzdCA9IGNjLmZpbmQoJ0NhbnZhcy9taXN0JykuZ2V0Q29tcG9uZW50KCdNaXN0Jyk7XHJcblx0XHR2YXIgaGF2ZVBlb3BsZSA9IDA7XHJcblx0XHRpZiAobWlzdC5taXN0QXJyW2VuZW15MS5wb3NYXVtlbmVteTEucG9zWV0uYWN0aXZlID09IGZhbHNlKSB7XHJcblx0XHRcdGVuZW15MS5hdmF0YXIub24oJ21vdXNlZG93bicsIGNhcmQuc3RvcE1vdmUsIGVuZW15MSk7XHJcblx0XHRcdGhhdmVQZW9wbGUgPSAxO1xyXG5cdFx0fVxyXG5cdFx0aWYgKG1pc3QubWlzdEFycltlbmVteTIucG9zWF1bZW5lbXkyLnBvc1ldLmFjdGl2ZSA9PSBmYWxzZSkge1xyXG5cdFx0XHRlbmVteTIuYXZhdGFyLm9uKCdtb3VzZWRvd24nLCBjYXJkLnN0b3BNb3ZlLCBlbmVteTIpO1xyXG5cdFx0XHRoYXZlUGVvcGxlID0gMTtcclxuXHRcdH1cclxuXHRcdGlmIChoYXZlUGVvcGxlID09IDApIHtcclxuXHRcdFx0Y2MuZmluZCgnQ2FudmFzL0RlY2snKS5nZXRDb21wb25lbnQoJ0RlY2snKS5zaG93VGlwcygn6KeG6YeO5YaF5peg5pWM5Lq6IFFBUScpO1xyXG5cdFx0XHRjYy5maW5kKCdDYW52YXMvRGVjaycpLmFjdGl2ZSA9IHRydWU7XHJcblx0XHRcdGNjLmZpbmQoJ0NhbnZhcy9lbmRfY2FyZF9idG4nKS5hY3RpdmUgPSB0cnVlO1xyXG5cdFx0fVxyXG5cdFx0cm9sZS5tb2JpbGl0eS09Y2FyZC5jYXJkQ29zdFsxNF07XHJcbiAgICAgICAgY2MuZmluZCgnQ2FudmFzL0RlY2snKS5nZXRDb21wb25lbnQoJ0RlY2snKS5yZW1vdmVDYXJkKDE0KTtcclxuXHR9LFxyXG5cdFxyXG5cdHN0b3BVc2VDYXJkOiBmdW5jdGlvbigpIHtcclxuXHRcdC8vdGhpc+S4uuS6uueJqeeahHBlcnNvbi5qc1xyXG5cdFx0dmFyIHJvbGU9Y2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdnbG9iYWxHYW1lJykubm93UGxheWVyO1xyXG4gICAgICAgIHZhciBpbmRleD1OdW1iZXIocm9sZS5uYW1lWzZdKTtcclxuICAgICAgICB2YXIgdGVhbW1hdGU9aW5kZXgrMj40P2luZGV4LTI6aW5kZXgrMjtcclxuICAgICAgICB2YXIgZW5lbXkxPWluZGV4KzE+ND9pbmRleC0zOmluZGV4KzE7XHJcbiAgICAgICAgdmFyIGVuZW15Mj10ZWFtbWF0ZSsxPjQ/dGVhbW1hdGUtMzp0ZWFtbWF0ZSsxO1xyXG4gICAgICAgIHJvbGU9Y2MuZmluZChcIkNhbnZhcy9QZXJzb25zL1BlcnNvblwiK2luZGV4KS5nZXRDb21wb25lbnQoJ1BlcnNvbicpO1xyXG4gICAgICAgIHRlYW1tYXRlPWNjLmZpbmQoXCJDYW52YXMvUGVyc29ucy9QZXJzb25cIit0ZWFtbWF0ZSkuZ2V0Q29tcG9uZW50KCdQZXJzb24nKTtcclxuICAgICAgICBlbmVteTE9Y2MuZmluZChcIkNhbnZhcy9QZXJzb25zL1BlcnNvblwiK2VuZW15MSkuZ2V0Q29tcG9uZW50KCdQZXJzb24nKTtcclxuICAgICAgICBlbmVteTI9Y2MuZmluZChcIkNhbnZhcy9QZXJzb25zL1BlcnNvblwiK2VuZW15MikuZ2V0Q29tcG9uZW50KCdQZXJzb24nKTtcclxuXHRcdFxyXG5cdFx0dGhpcy51c2VDYXJkRW5hYmxlZCA9IDA7XHJcblx0XHRlbmVteTEuYXZhdGFyLm9mZignbW91c2Vkb3duJywgY2MuZmluZCgnQ2FudmFzL0NhcmQnKS5nZXRDb21wb25lbnQoJ0NhcmQnKS5zdG9wVXNlQ2FyZCwgZW5lbXkxKTtcclxuXHRcdGVuZW15Mi5hdmF0YXIub2ZmKCdtb3VzZWRvd24nLCBjYy5maW5kKCdDYW52YXMvQ2FyZCcpLmdldENvbXBvbmVudCgnQ2FyZCcpLnN0b3BVc2VDYXJkLCBlbmVteTIpO1xyXG5cdFx0XHJcblx0XHRjYy5maW5kKCdDYW52YXMvRGVjaycpLmFjdGl2ZSA9IHRydWU7XHJcblx0XHRjYy5maW5kKCdDYW52YXMvZW5kX2NhcmRfYnRuJykuYWN0aXZlID0gdHJ1ZTtcclxuXHR9LFxyXG5cdFxyXG5cdGNvbmZ1c2VfMTU6IGZ1bmN0aW9uKGNhcmQpIHtcclxuXHRcdGNjLmZpbmQoJ0NhbnZhcy9EZWNrJykuYWN0aXZlID0gZmFsc2U7Ly/mmoLml7bkuI3orqnngrnmiYvniYzloIZcclxuXHRcdGNjLmZpbmQoJ0NhbnZhcy9lbmRfY2FyZF9idG4nKS5hY3RpdmUgPSBmYWxzZTsvL+aaguaXtuS4jeiuqee7k+adn+WHuueJjFxyXG5cdFx0dmFyIHJvbGU9Y2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdnbG9iYWxHYW1lJykubm93UGxheWVyO1xyXG4gICAgICAgIHZhciBpbmRleD1OdW1iZXIocm9sZS5uYW1lWzZdKTtcclxuICAgICAgICB2YXIgdGVhbW1hdGU9aW5kZXgrMj40P2luZGV4LTI6aW5kZXgrMjtcclxuICAgICAgICB2YXIgZW5lbXkxPWluZGV4KzE+ND9pbmRleC0zOmluZGV4KzE7XHJcbiAgICAgICAgdmFyIGVuZW15Mj10ZWFtbWF0ZSsxPjQ/dGVhbW1hdGUtMzp0ZWFtbWF0ZSsxO1xyXG4gICAgICAgIHJvbGU9Y2MuZmluZChcIkNhbnZhcy9QZXJzb25zL1BlcnNvblwiK2luZGV4KS5nZXRDb21wb25lbnQoJ1BlcnNvbicpO1xyXG4gICAgICAgIHRlYW1tYXRlPWNjLmZpbmQoXCJDYW52YXMvUGVyc29ucy9QZXJzb25cIit0ZWFtbWF0ZSkuZ2V0Q29tcG9uZW50KCdQZXJzb24nKTtcclxuICAgICAgICBlbmVteTE9Y2MuZmluZChcIkNhbnZhcy9QZXJzb25zL1BlcnNvblwiK2VuZW15MSkuZ2V0Q29tcG9uZW50KCdQZXJzb24nKTtcclxuICAgICAgICBlbmVteTI9Y2MuZmluZChcIkNhbnZhcy9QZXJzb25zL1BlcnNvblwiK2VuZW15MikuZ2V0Q29tcG9uZW50KCdQZXJzb24nKTtcclxuXHRcdHZhciBtaXN0ID0gY2MuZmluZCgnQ2FudmFzL21pc3QnKS5nZXRDb21wb25lbnQoJ01pc3QnKTtcclxuXHRcdHZhciBoYXZlUGVvcGxlID0gMDtcclxuXHRcdGlmIChtaXN0Lm1pc3RBcnJbZW5lbXkxLnBvc1hdW2VuZW15MS5wb3NZXS5hY3RpdmUgPT0gZmFsc2UpIHtcclxuXHRcdFx0ZW5lbXkxLmF2YXRhci5vbignbW91c2Vkb3duJywgY2FyZC5zdG9wVXNlQ2FyZCwgZW5lbXkxKTtcclxuXHRcdFx0aGF2ZVBlb3BsZSA9IDE7XHJcblx0XHR9XHJcblx0XHRpZiAobWlzdC5taXN0QXJyW2VuZW15Mi5wb3NYXVtlbmVteTIucG9zWV0uYWN0aXZlID09IGZhbHNlKSB7XHJcblx0XHRcdGVuZW15Mi5hdmF0YXIub24oJ21vdXNlZG93bicsIGNhcmQuc3RvcFVzZUNhcmQsIGVuZW15Mik7XHJcblx0XHRcdGhhdmVQZW9wbGUgPSAxO1xyXG5cdFx0fVxyXG5cdFx0aWYgKGhhdmVQZW9wbGUgPT0gMCkge1xyXG5cdFx0XHRjYy5maW5kKCdDYW52YXMvRGVjaycpLmdldENvbXBvbmVudCgnRGVjaycpLnNob3dUaXBzKCfop4bph47lhoXml6DmlYzkurogUUFRJyk7XHJcblx0XHRcdGNjLmZpbmQoJ0NhbnZhcy9EZWNrJykuYWN0aXZlID0gdHJ1ZTtcclxuXHRcdFx0Y2MuZmluZCgnQ2FudmFzL2VuZF9jYXJkX2J0bicpLmFjdGl2ZSA9IHRydWU7XHJcblx0XHR9XHJcblx0XHRyb2xlLm1vYmlsaXR5LT1jYXJkLmNhcmRDb3N0WzE1XTtcclxuICAgICAgICBjYy5maW5kKCdDYW52YXMvRGVjaycpLmdldENvbXBvbmVudCgnRGVjaycpLnJlbW92ZUNhcmQoMTUpO1xyXG5cdH0sXHJcblx0XHJcbiAgICBzYXZlXzE2OmZ1bmN0aW9uKGNhcmQpe1xyXG4gICAgICAgIHZhciByb2xlPWNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudCgnZ2xvYmFsR2FtZScpLm5vd1BsYXllcjtcclxuICAgICAgICB2YXIgaW5kZXg9TnVtYmVyKHJvbGUubmFtZVs2XSk7XHJcbiAgICAgICAgdmFyIHRlYW1tYXRlPWluZGV4KzI+ND9pbmRleC0yOmluZGV4KzI7XHJcbiAgICAgICAgdGVhbW1hdGU9Y2MuZmluZChcIkNhbnZhcy9QZXJzb25zL1BlcnNvblwiK3RlYW1tYXRlKS5nZXRDb21wb25lbnQoJ1BlcnNvbicpO1xyXG4gICAgICAgIGlmICh0ZWFtbWF0ZS5pc0RlYWQ9PTEpe1xyXG4gICAgICAgICAgICB0ZWFtbWF0ZS5pc0RlYWQ9MDtcclxuICAgICAgICAgICAgdGVhbW1hdGUuYmxvb2Q9NTtcclxuICAgICAgICAgICAgdGVhbW1hdGUubW9iaWxpdHk9MztcclxuICAgICAgICB9XHJcbiAgICAgICAgcm9sZS5nZXRDb21wb25lbnQoJ1BlcnNvbicpLm1vYmlsaXR5LT1jYXJkLmNhcmRDb3N0WzE2XTtcclxuICAgICAgICBjYy5maW5kKCdDYW52YXMvRGVjaycpLmdldENvbXBvbmVudCgnRGVjaycpLnJlbW92ZUNhcmQoMTYpO1xyXG4gICAgfSxcclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgdGhpcy5jYXJkQ29zdD1bMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMF07Ly9bNCwzLDIsMywzLDQsNCw1LDIsMywzLDMsMywzLDQsNCw1XTtcclxuICAgICAgICB0aGlzLmNhcmRGdW5jdGlvbj1uZXcgQXJyYXkoKTtcclxuXHRcdHRoaXMuY2FyZEZ1bmN0aW9uWzBdPXRoaXMuYm9vbV8wO1xyXG5cdFx0dGhpcy5jYXJkRnVuY3Rpb25bMV09dGhpcy5taXNzaWxlXzE7XHJcblx0XHR0aGlzLmNhcmRGdW5jdGlvblsyXT10aGlzLm1pbmVfMjtcclxuICAgICAgICB0aGlzLmNhcmRGdW5jdGlvblszXT10aGlzLnNoaWVsZF8zO1xyXG4gICAgICAgIHRoaXMuY2FyZEZ1bmN0aW9uWzRdPXRoaXMuaGFsZlNoaWVsZF80O1xyXG4gICAgICAgIHRoaXMuY2FyZEZ1bmN0aW9uWzVdPXRoaXMuYmxlc3NfNTtcclxuICAgICAgICB0aGlzLmNhcmRGdW5jdGlvbls2XT10aGlzLndlYWtfNjtcclxuXHRcdHRoaXMuY2FyZEZ1bmN0aW9uWzddPXRoaXMudGVhbUZvcmNlXzc7XHJcbiAgICAgICAgdGhpcy5jYXJkRnVuY3Rpb25bOF09dGhpcy5oZWFsXzg7XHJcbiAgICAgICAgdGhpcy5jYXJkRnVuY3Rpb25bOV09dGhpcy5ob2x5Tm92YV85O1xyXG5cdFx0dGhpcy5jYXJkRnVuY3Rpb25bMTBdPXRoaXMudGVsZXNjb3BlXzEwO1xyXG5cdFx0dGhpcy5jYXJkRnVuY3Rpb25bMTFdPXRoaXMuZXllXzExO1xyXG4gICAgICAgIHRoaXMuY2FyZEZ1bmN0aW9uWzEyXT10aGlzLnRvdWdoXzEyO1xyXG5cdFx0dGhpcy5jYXJkRnVuY3Rpb25bMTNdPXRoaXMuc3RlYWxfMTM7XHJcblx0XHR0aGlzLmNhcmRGdW5jdGlvblsxNF09dGhpcy50aWVfMTQ7XHJcblx0XHR0aGlzLmNhcmRGdW5jdGlvblsxNV09dGhpcy5jb25mdXNlXzE1O1xyXG4gICAgICAgIHRoaXMuY2FyZEZ1bmN0aW9uWzE2XT10aGlzLnNhdmVfMTY7XHJcblx0XHQvL+WTjeW6lOWNoeeJjDDngrjlvLlcclxuXHRcdGNjLmdhbWUub24oJ2Jvb20tY2VsbC1jaG9zZW4nLCBmdW5jdGlvbih4LCB5KSB7XHJcblx0XHRcdHZhciBib29tX2NlbGwgPSBbW3gsIHldXTtcclxuXHRcdFx0dmFyIG1hcCA9IGNjLmZpbmQoJ0NhbnZhcy9tYXAnKS5nZXRDb21wb25lbnQoJ0dldE1hcCcpO1xyXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1hcC5hZGpbeF1beV0ubGVuZ3RoOyBpKyspXHJcblx0XHRcdFx0Ym9vbV9jZWxsLnB1c2gobWFwLmFkalt4XVt5XVtpXSk7XHJcblx0XHRcdHZhciByb2xlPWNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudCgnZ2xvYmFsR2FtZScpLm5vd1BsYXllcjtcclxuXHRcdFx0dmFyIGluZGV4PU51bWJlcihyb2xlLm5hbWVbNl0pO1xyXG5cdFx0XHR2YXIgdGVhbW1hdGU9aW5kZXgrMj40P2luZGV4LTI6aW5kZXgrMjtcclxuXHRcdFx0dmFyIGVuZW15MT1pbmRleCsxPjQ/aW5kZXgtMzppbmRleCsxO1xyXG5cdFx0XHR2YXIgZW5lbXkyPXRlYW1tYXRlKzE+ND90ZWFtbWF0ZS0zOnRlYW1tYXRlKzE7XHJcblx0XHRcdHJvbGU9Y2MuZmluZChcIkNhbnZhcy9QZXJzb25zL1BlcnNvblwiK2luZGV4KS5nZXRDb21wb25lbnQoJ1BlcnNvbicpO1xyXG5cdFx0XHR0ZWFtbWF0ZT1jYy5maW5kKFwiQ2FudmFzL1BlcnNvbnMvUGVyc29uXCIrdGVhbW1hdGUpLmdldENvbXBvbmVudCgnUGVyc29uJyk7XHJcblx0XHRcdGVuZW15MT1jYy5maW5kKFwiQ2FudmFzL1BlcnNvbnMvUGVyc29uXCIrZW5lbXkxKS5nZXRDb21wb25lbnQoJ1BlcnNvbicpO1xyXG5cdFx0XHRlbmVteTI9Y2MuZmluZChcIkNhbnZhcy9QZXJzb25zL1BlcnNvblwiK2VuZW15MikuZ2V0Q29tcG9uZW50KCdQZXJzb24nKTtcclxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7aSA8IGJvb21fY2VsbC5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdGlmIChib29tX2NlbGxbaV1bMF0gPT0gZW5lbXkxLnBvc1ggJiYgYm9vbV9jZWxsW2ldWzFdID09IGVuZW15MS5wb3NZKSB7XHJcblx0XHRcdFx0XHRlbmVteTEuYmxvb2QgLT0gcm9sZS5hdHRhY2sqMjsgY29uc29sZS5sb2coZW5lbXkxLm5pY2tuYW1lKTt9XHJcblx0XHRcdFx0aWYgKGJvb21fY2VsbFtpXVswXSA9PSBlbmVteTIucG9zWCAmJiBib29tX2NlbGxbaV1bMV0gPT0gZW5lbXkyLnBvc1kpIHtcclxuXHRcdFx0XHRcdGVuZW15Mi5ibG9vZCAtPSByb2xlLmF0dGFjayoyOyBjb25zb2xlLmxvZyhlbmVteTIubmlja25hbWUpO31cclxuXHRcdFx0XHRpZiAoZW5lbXkxLmJsb29kIDw9IDApXHJcblx0XHRcdFx0XHRlbmVteTEuaXNEZWFkID0gMTtcclxuXHRcdFx0XHRpZiAoZW5lbXkyLmJsb29kIDw9IDApXHJcblx0XHRcdFx0XHRlbmVteTIuaXNEZWFkID0gMTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyb2xlLm1vYmlsaXR5LT10aGlzLmNhcmRDb3N0WzBdO1xyXG5cdFx0XHRjYy5maW5kKCdDYW52YXMvRGVjaycpLmdldENvbXBvbmVudCgnRGVjaycpLnJlbW92ZUNhcmQoMCk7XHJcblx0XHRcdGNjLmZpbmQoJ0NhbnZhcy9EZWNrJykuYWN0aXZlID0gdHJ1ZTsgLy/mgaLlpI3ljaHniYzloIZcclxuXHRcdFx0Y2MuZmluZCgnQ2FudmFzL2VuZF9jYXJkX2J0bicpLmFjdGl2ZSA9IHRydWU7Ly/mgaLlpI3nu5PmnZ/lh7rniYxcclxuXHRcdH0sIHRoaXMpO1xyXG5cdFx0Ly/lk43lupTljaHniYwxMeaPkuecvFxyXG5cdFx0Y2MuZ2FtZS5vbignZXllLWNlbGwtY2hvc2VuJywgZnVuY3Rpb24oeCwgeSkge1xyXG5cdFx0XHR2YXIgZXllX2NlbGwgPSBbW3gsIHldXTtcclxuXHRcdFx0dmFyIG1hcCA9IGNjLmZpbmQoJ0NhbnZhcy9tYXAnKS5nZXRDb21wb25lbnQoJ0dldE1hcCcpO1xyXG5cdFx0XHR2YXIgZGlzID0gbWFwLkJmc0Rpcyh4LHkpO1xyXG5cdFx0XHR2YXIgcm9sZT1jYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoJ2dsb2JhbEdhbWUnKS5ub3dQcm9wZXJ0eTtcclxuXHRcdFx0Zm9yICh2YXIgaT0wO2k8MTE7KytpKVxyXG5cdFx0XHRcdGZvciAodmFyIGo9MDtqPDExOysrail7XHJcblx0XHRcdFx0XHRpZiAoZGlzW2ldW2pdIT0tMSYmZGlzW2ldW2pdPD0zKVxyXG5cdFx0XHRcdFx0XHRleWVfY2VsbC5wdXNoKFtpLGpdKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdHJvbGUuZXllcy5wdXNoKGV5ZV9jZWxsKTtcclxuXHRcdFx0dmFyIGJ1ZmY9Y2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdCdWZmJyk7XHJcblx0XHRcdGJ1ZmYudG9kb0xpc3QucHVzaCh7XHJcblx0XHRcdFx0ZW5kVHVybjp3aW5kb3cuZ2xvYmFsLm5vd1R1cm4rNSxcclxuXHRcdFx0XHRwZXJzb246cm9sZSxcclxuXHRcdFx0XHRhY3Q6ZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdGlmICh0aGlzLnBlcnNvbiAhPSBjYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoJ2dsb2JhbEdhbWUnKS5ub3dQcm9wZXJ0eSlcclxuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdFx0cm9sZS5leWVzLnNwbGljZSgwLDEpO1xyXG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdFx0cm9sZS5tb2JpbGl0eS09dGhpcy5jYXJkQ29zdFsxMV07XHJcblx0XHRcdGNjLmZpbmQoJ0NhbnZhcy9EZWNrJykuZ2V0Q29tcG9uZW50KCdEZWNrJykucmVtb3ZlQ2FyZCgxMSk7XHJcblx0XHRcdGNjLmZpbmQoJ0NhbnZhcy9EZWNrJykuYWN0aXZlID0gdHJ1ZTsgLy/mgaLlpI3ljaHniYzloIZcclxuXHRcdFx0Y2MuZmluZCgnQ2FudmFzL2VuZF9jYXJkX2J0bicpLmFjdGl2ZSA9IHRydWU7Ly/mgaLlpI3nu5PmnZ/lh7rniYxcclxuXHRcdH0sIHRoaXMpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydCAoKSB7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcclxufSk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4iXX0=