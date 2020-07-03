"use strict";
cc._RF.push(module, '259840RgRdFe5d9dTqGHGSc', 'AI');
// scripts/AI.js

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
    cardCost: null,
    cardFunction: null
  },
  aiMove: function aiMove(routes) {
    var index = Math.floor(Math.random() * routes.length);
    cc.game.emit('route-chosen', routes[index]);
  },
  aiTie: function aiTie(card) {
    var role = cc.find('Canvas').getComponent('globalGame').nowPlayer;
    var canSee = cc.find('Canvas').getComponent('AI').enemyInSight(role);

    if (canSee.length) {
      var index = Math.floor(Math.random() * canSee.length);
      canSee[index].goEnabled = 0;
    }

    role.mobility -= card.cardCost[14];
    cc.find('Canvas/Deck').getComponent('Deck').removeCard(14);
  },
  aiConfuse: function aiConfuse(card) {
    var role = cc.find('Canvas').getComponent('globalGame').nowPlayer;
    var canSee = cc.find('Canvas').getComponent('AI').enemyInSight(role);

    if (canSee.length) {
      var index = Math.floor(Math.random() * canSee.length);
      canSee[index].useCardEnabled = 0;
    }

    role.mobility -= card.cardCost[15];
    cc.find('Canvas/Deck').getComponent('Deck').removeCard(15);
  },
  enemyInSight: function enemyInSight(role) {
    //返回role和队友的视野内的敌人
    var index = Number(role.name[6]);
    var teammate = index + 2 > 4 ? index - 2 : index + 2;
    var enemy1 = index + 1 > 4 ? index - 3 : index + 1;
    var enemy2 = teammate + 1 > 4 ? teammate - 3 : teammate + 1;
    enemy1 = cc.find("Canvas/Persons/Person" + enemy1).getComponent('Person');
    enemy2 = cc.find("Canvas/Persons/Person" + enemy2).getComponent('Person');
    role = role.getComponent('Person');
    teammate = cc.find("Canvas/Persons/Person" + teammate).getComponent('Person');
    var dis1 = cc.find('Canvas/map').getComponent('GetMap').BfsDis(role.posX, role.posY);
    var dis2 = cc.find('Canvas/map').getComponent('GetMap').BfsDis(teammate.posX, teammate.posY);
    var e12 = [null, enemy1, enemy2];
    var canSee = [];
    var vis = [0, 0, 0];

    for (var i = 1; i <= 2; i++) {
      if (e12[i].isDead == 1) continue;

      if (dis1[e12[i].posX][e12[i].posY] <= role.sight) {
        canSee.push(e12[i]);
        continue;
      }

      if (dis2[e12[i].posX][e12[i].posY] <= teammate.sight) {
        canSee.push(e12[i]);
        continue;
      }

      for (var j = 0; j < role.eyes.length; j++) {
        for (var k = 0; k < role.eyes[j].length; k++) {
          if (e12[i].posX == role.eyes[j][k][0] && e12[i].posY == role.eyes[j][k][1]) if (vis[i] == 0) {
            canSee.push(e12[i]);
            vis[i] = 1;
          }
        }
      }

      for (var j = 0; j < teammate.eyes.length; j++) {
        for (var k = 0; k < teammate.eyes[j].length; k++) {
          if (e12[i].posX == teammate.eyes[j][k][0] && e12[i].posY == teammate.eyes[j][k][1]) if (vis[i] == 0) {
            canSee.push(e12[i]);
            vis[i] = 1;
          }
        }
      }
    }

    return canSee;
  },
  aiBoom: function aiBoom(card) {
    var role = cc.find('Canvas').getComponent('globalGame').nowPlayer;
    var canSee = cc.find('Canvas').getComponent('AI').enemyInSight(role);
    var boom_cell = [],
        x,
        y;

    if (canSee.length) {
      var index = Math.floor(Math.random() * canSee.length);
      boom_cell.push([e12[index].posX, e12[index].posY]);
      x = e12[index].posX;
      y = e12[index].posY;
    } else {
      var map_matrix = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1], [1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1], [1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1], [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1], [1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1], [1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1], [1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];

      while (1) {
        var r = Math.floor(Math.random() * 11),
            c = Math.floor(Math.random() * 11);

        if (map_matrix[r][c] == 1) {
          boom_cell.push([r, c]);
          x = r, y = c;
          break;
        }
      }
    }

    var map = cc.find('Canvas/map').getComponent('GetMap');

    for (var i = 0; i < map.adj[x][y].length; i++) {
      boom_cell.push(map.adj[x][y][i]);
    }

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

    role.mobility -= card.cardCost[0];
    cc.find('Canvas/Deck').getComponent('Deck').removeCard(0);
  },
  aiUseCard: function aiUseCard(role) {
    while (role.cards.length > 0) {
      if (Math.random() < 0.5) {
        var index = Math.floor(Math.random() * role.cards.length);
        var cardID = role.cards[index];
        if (this.cardCost[cardID] > role.mobility) continue;
        if (cardID == 0 || cardID == 11 || cardID == 13 || cardID == 14 || cardID == 15) this.cardFunction[cardID](cc.find('Canvas/Card').getComponent('Card'));else cc.find('Canvas/Card').getComponent('Card').cardFunction[cardID](cc.find('Canvas/Card').getComponent('Card'));
      } else break;
    }
  },
  aiEye: function aiEye(card) {
    var x, y;
    var eye_cell = [];
    var map_matrix = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1], [1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1], [1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1], [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1], [1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1], [1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1], [1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];

    while (1) {
      var r = Math.floor(Math.random() * 11),
          c = Math.floor(Math.random() * 11);

      if (map_matrix[r][c] == 1) {
        eye_cell.push([r, c]);
        x = r, y = c;
        break;
      }
    }

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
    role.mobility -= card.cardCost[11];
    cc.find('Canvas/Deck').getComponent('Deck').removeCard(11);
  },
  // LIFE-CYCLE CALLBACKS:
  aiSteal: function aiSteal(card) {
    var role = cc.find('Canvas').getComponent('globalGame').nowPlayer;
    var canSee = cc.find('Canvas').getComponent('AI').enemyInSight(role);

    if (canSee.length) {
      var index = Math.floor(Math.random() * canSee.length);

      if (canSee[index].cards.length) {
        var rd = Math.floor(Math.random() * canSee[index].cards.length);
        role.cards.push(canSee[index].cards[rd]);
        canSee[index].cards.splice(rd, 1);
      }
    }

    role.mobility -= card.cardCost[13];
    cc.find('Canvas/Deck').getComponent('Deck').removeCard(13);
  },
  onLoad: function onLoad() {
    this.cardFunction = new Array();
    this.cardFunction[0] = this.aiBoom;
    this.cardFunction[11] = this.aiEye;
    this.cardFunction[14] = this.aiTie;
    this.cardFunction[15] = this.aiConfuse;
    this.cardCost = [4, 3, 2, 3, 3, 4, 4, 5, 2, 3, 3, 3, 3, 3, 4, 4, 5];
  },
  start: function start() {} // update (dt) {},

});

cc._RF.pop();