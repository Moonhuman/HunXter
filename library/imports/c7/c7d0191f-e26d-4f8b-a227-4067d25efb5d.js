"use strict";
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
  shield_3: function shield_3(card) {
    var role = cc.find('Canvas').getComponent('globalGame').nowProperty;
    role.shield = 1;
    role.mobility -= card.cardCost[3];
    cc.find('Canvas/Deck').getComponent('Deck').removeCard(3);
  },
  halfShield_4: function halfShield_4(card) {
    var role = cc.find('Canvas').getComponent('globalGame').nowProperty;
    var index = Number(role.name[6]);
    var teammate = index + 2 > 4 ? index - 2 : index + 2;
    teammate = cc.find("Canvas/Persons/Person" + teammate).getComponent('Person');
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
      person: [role, cc.find("Canvas/Persons/Person" + teammate)],
      act: function act() {
        this.person[0].getComponent('Person').attack = Math.max(0, this.person[0].getComponent('Person').attack - 1);
        this.person[1].getComponent('Person').attack = Math.max(0, this.person[1].getComponent('Person').attack - 1);
      }
    });
    role.mobility -= card.cardCost[5];
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
      person: [enemy1, enemy1.attack != 0, enemy2, enemy2.attack != 0],
      act: function act() {
        this.person[0].attack += person[1];
        this.attack[2].attack += person[3];
      }
    });
    enemy1.attack = Math.max(0, enemy1.attack - 1);
    enemy2.attack = Math.max(0, enemy2.attack - 1);
    role.mobility -= card.cardCost[6];
    cc.find('Canvas/Deck').getComponent('Deck').removeCard(6);
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
  tough_12: function tough_12(card) {
    var role = cc.find('Canvas').getComponent('globalGame').nowProperty;
    role.attack *= 2;
    var buff = cc.find('Canvas').getComponent('Buff');
    buff.todoList.push({
      endTurn: window.global.nowTurn + 1,
      person: role,
      act: function act() {
        this.person.attack = Number(this.person.attack / 2);
      }
    });
    role.mobility -= card.cardCost[12];
    cc.find('Canvas/Deck').getComponent('Deck').removeCard(12);
  },
  save_16: function save_16(card) {
    var role = cc.find('Canvas').getComponent('globalGame').nowProperty;
    var index = Number(role.name[6]);
    var teammate = index + 2 > 4 ? index - 2 : index + 2;
    teammate = cc.find("Canvas/Persons/Person" + teammate).getComponent('Person');

    if (teammate.isDead == 1) {
      teammate.isDead = 0;
      teammate.blood = 5;
      teammate.mobility = 3;
    }

    role.mobility -= card.cardCost[16];
    cc.find('Canvas/Deck').getComponent('Deck').removeCard(16);
  },
  onLoad: function onLoad() {
    this.cardCost = [0, 0, 0, 0, 0, 1111110, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //[4,3,2,3,3,4,4,5,2,3,3,3,3,3,4,4,5];

    this.cardFunction = new Array();
    this.cardFunction[3] = this.shield_3;
    this.cardFunction[4] = this.halfShield_4;
    this.cardFunction[5] = this.bless_5;
    this.cardFunction[6] = this.weak_6;
    this.cardFunction[8] = this.heal_8;
    this.cardFunction[9] = this.holyNova_9;
    this.cardFunction[12] = this.tough_12;
    this.cardFunction[16] = this.save_16;
  },
  start: function start() {} // update (dt) {},

});

cc._RF.pop();