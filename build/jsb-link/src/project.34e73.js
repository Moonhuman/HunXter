window.__require = function e(t, n, o) {
function i(a, c) {
if (!n[a]) {
if (!t[a]) {
var r = a.split("/");
r = r[r.length - 1];
if (!t[r]) {
var l = "function" == typeof __require && __require;
if (!c && l) return l(r, !0);
if (s) return s(r, !0);
throw new Error("Cannot find module '" + a + "'");
}
a = r;
}
var d = n[a] = {
exports: {}
};
t[a][0].call(d.exports, function(e) {
return i(t[a][1][e] || e);
}, d, d.exports, e, t, n, o);
}
return n[a].exports;
}
for (var s = "function" == typeof __require && __require, a = 0; a < o.length; a++) i(o[a]);
return i;
}({
Cell: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "a088blxo9JDma4uk/IA4USI", "Cell");
cc.Class({
extends: cc.Component,
properties: {
mapx: 0,
mapy: 0,
kind: null,
inMonitor: 0,
routeID: null
},
setColor: function() {
this.node.color = cc.color(102, 255, 102, 255);
},
resetColor: function() {
this.node.color = cc.color(255, 255, 255, 255);
},
getOneCard: function(e, t, n) {
var o = Math.floor(Math.random() * n);
e.cards.push(o);
var i = cc.instantiate(window.global.cardnode[o]);
i.setPosition(0, 0);
i.msg = "获得卡牌:" + t[o];
i.on("mousedown", function(e) {
cc.game.emit("stepOnCell-done", this.msg);
this.destroy();
}, i);
i.parent = this.node.parent.parent;
},
chooseFromThree: function(e, t) {
var n = [];
n[0] = Math.floor(Math.random() * t);
n[1] = Math.floor(Math.random() * t);
n[2] = Math.floor(Math.random() * t);
console.log(n);
for (var o = 0; o < 3; o++) {
var i = cc.instantiate(window.global.cardnode[n[o]]);
i.name = "chooseFromThree" + o;
i.setPosition(500 * o - 500, 0);
i.cardID = n[o];
i.msg = "获得卡牌:" + e[n[o]];
i.on("mousedown", function(e) {
var t = cc.find("Canvas").getComponent("globalGame").nowPlayer.getComponent("Person");
console.log("得到卡牌:" + this.cardID);
t.cards.push(this.cardID);
cc.game.emit("stepOnCell-done", this.msg);
for (var n = 0; n < 3; n++) cc.find("Canvas/chooseFromThree" + n).destroy();
}, i);
i.parent = this.node.parent.parent;
}
},
eventAction: function(e) {
var t = Math.floor(6 * Math.random()), n = new cc.Node();
n.addComponent(cc.Sprite);
n.setPosition(0, 0);
n.parent = this.node.parent.parent;
var o, i = n;
if (0 == t) {
o = "陷阱";
e.useCardEnabled = 0;
} else if (1 == t) {
o = "监狱";
e.goEnabled = 0;
} else if (2 == t) {
o = "恶魔";
e.blood--;
} else if (3 == t) {
o = "奥利给";
e.turn++;
} else if (4 == t) o = "视野"; else if (5 == t) {
o = "天使";
e.blood = Math.floor(1.5 * e.blood);
}
cc.loader.loadRes("事件图片/" + o, cc.SpriteFrame, function(e, t) {
i.getComponent(cc.Sprite).spriteFrame = t;
});
n.msg = "触发事件:" + o;
n.on("mousedown", function(e) {
cc.game.emit("stepOnCell-done", this.msg);
this.destroy();
}, n);
},
stepOnCell: function(e) {
var t = e.getComponent("Person");
if (0 != this.kind) if (1 == this.kind) {
var n = [ "炸弹", "精准导弹", "地雷", "庇护", "天使的庇护", "战神的祝福", "虚弱", "团队的力量", "治愈", "圣光普照", "望远镜", "眼睛", "猛男的祝福", "盗取", "束缚", "迷惑", "拯救" ], o = Math.random();
console.log("rand_val" + o);
o < .5 ? this.getOneCard(t, n, 17) : this.chooseFromThree(n, 17);
} else 2 == this.kind && this.eventAction(t); else cc.game.emit("stepOnCell-done", "");
},
onLoad: function() {},
start: function() {
var e = this;
0 == this.kind ? cc.loader.loadRes("cell", cc.SpriteFrame, function(t, n) {
e.node.getComponent(cc.Sprite).spriteFrame = n;
}) : 1 == this.kind ? cc.loader.loadRes("抽卡格", cc.SpriteFrame, function(t, n) {
e.node.getComponent(cc.Sprite).spriteFrame = n;
}) : cc.loader.loadRes("事件格", cc.SpriteFrame, function(t, n) {
e.node.getComponent(cc.Sprite).spriteFrame = n;
});
}
});
cc._RF.pop();
}, {} ],
Deck: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "e31f9fOl6FASK8z1DIOII1V", "Deck");
cc.Class({
extends: cc.Component,
properties: {
deck: [ cc.Integer ],
role: null
},
addCard: function(e) {
deck.push(e);
},
choose_cancel: function() {
cc.find("Canvas/choose_card_confirm").active = !1;
cc.find("Canvas/choose_card_cancel").active = !1;
},
cardDetail: function() {
var e = cc.instantiate(this);
e.name = "card_detail";
e.scaleX = 1, e.scaleY = 1;
e.setPosition(0, 0);
e.parent = cc.find("Canvas");
},
closeDetail: function() {
cc.find("Canvas/card_detail").destroy();
},
chooseCard: function() {
cc.find("Canvas/Deck").getComponent("Deck").closeDetail();
cc.find("Canvas/choose_card_confirm").active = !0;
cc.find("Canvas/choose_card_cancel").active = !0;
},
showCards: function() {
for (var e = 3 == cc.find("Canvas").getComponent("globalGame").nowStep, t = 0; t < this.deck.length; ++t) {
var n = this.deck[t], o = cc.instantiate(window.global.cardnode[n]);
o.scaleX = .4, o.scaleY = .4;
o.setPosition(200 + 200 * t, 0);
o.parent = this.node;
o.on("mouseenter", this.cardDetail, o);
o.on("mouseleave", this.closeDetail, o);
console.log("ispalycard:", e);
1 == e && o.on("mousedown", this.chooseCard, o);
}
},
closeCards: function() {
for (var e = cc.find("Canvas/Deck").children, t = 0; t < e.length; ++t) e[t].destroy();
this.node.off("mousedown", this.closeCards, this);
this.node.on("mousedown", this.initDeck, this);
},
initDeck: function() {
this.role = cc.find("Canvas").getComponent("globalGame").nowPlayer;
this.deck = this.role.getComponent("Person").cards;
this.showCards();
this.node.off("mousedown", this.initDeck, this);
this.node.on("mousedown", this.closeCards, this);
},
onLoad: function() {},
start: function() {
this.node.on("mousedown", this.initDeck, this);
}
});
cc._RF.pop();
}, {} ],
GetMap: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "e8bc53xDZdPCKLrf/Yatyej", "GetMap");
cc.Class({
extends: cc.Component,
properties: {
basex: 0,
basey: 0,
stepx: 0,
stepy: 0,
routes: null,
cell: {
default: null,
type: cc.Prefab
},
map: null,
adj: null
},
GetCell: function() {
var e = [ [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ], [ 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1 ], [ 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1 ], [ 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1 ], [ 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1 ], [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ], [ 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1 ], [ 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1 ], [ 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1 ], [ 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1 ], [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ] ];
this.map = new Array();
for (var t = 0; t < 11; t++) {
this.map[t] = new Array();
for (var n = 0; n < 11; n++) {
this.map[t][n] = null;
if (1 == e[t][n]) {
var o = cc.instantiate(this.cell);
o.parent = this.node;
o.setPosition(this.basex + this.stepx * t, this.basey + this.stepy * n);
this.map[t][n] = o;
var i = this.map[t][n].getComponent("Cell");
i.mapx = t;
i.mapy = n;
if (0 == t && 0 == n || 0 == t && 10 == n || 10 == t && 0 == n || 10 == t && 10 == n) {
i.kind = 0;
continue;
}
var s = Math.random();
i.kind = s < .4 ? 0 : s < .7 ? 1 : 2;
}
}
}
},
GetEdge: function() {
this.adj = new Array();
for (var e = 0; e < 11; e++) {
this.adj[e] = new Array();
for (var t = 0; t < 11; t++) this.adj[e][t] = new Array();
}
var n = [ [ 0, 0, 0, 1 ], [ 0, 1, 0, 2 ], [ 0, 2, 0, 3 ], [ 0, 3, 0, 4 ], [ 0, 4, 0, 5 ], [ 0, 5, 0, 6 ], [ 0, 6, 0, 7 ], [ 0, 7, 0, 8 ], [ 0, 8, 0, 9 ], [ 0, 9, 0, 10 ], [ 0, 0, 1, 0 ], [ 0, 0, 1, 1 ], [ 0, 5, 1, 5 ], [ 0, 10, 1, 9 ], [ 0, 10, 1, 10 ], [ 1, 0, 2, 0 ], [ 1, 1, 2, 2 ], [ 1, 5, 2, 5 ], [ 1, 9, 2, 8 ], [ 1, 10, 2, 10 ], [ 2, 0, 3, 0 ], [ 2, 2, 3, 3 ], [ 2, 5, 3, 4 ], [ 2, 5, 3, 6 ], [ 2, 8, 3, 7 ], [ 2, 10, 3, 10 ], [ 3, 3, 3, 4 ], [ 3, 6, 3, 7 ], [ 3, 0, 4, 0 ], [ 3, 3, 4, 3 ], [ 3, 7, 4, 7 ], [ 3, 10, 4, 10 ], [ 4, 0, 5, 0 ], [ 4, 3, 5, 2 ], [ 4, 7, 5, 8 ], [ 4, 10, 5, 10 ], [ 5, 0, 5, 1 ], [ 5, 1, 5, 2 ], [ 5, 2, 5, 3 ], [ 5, 3, 5, 4 ], [ 5, 4, 5, 5 ], [ 5, 5, 5, 6 ], [ 5, 6, 5, 7 ], [ 5, 7, 5, 8 ], [ 5, 8, 5, 9 ], [ 5, 9, 5, 10 ], [ 5, 0, 6, 0 ], [ 5, 2, 6, 3 ], [ 5, 8, 6, 7 ], [ 5, 10, 6, 10 ], [ 6, 0, 7, 0 ], [ 6, 3, 7, 3 ], [ 6, 7, 7, 7 ], [ 6, 10, 7, 10 ], [ 7, 3, 7, 4 ], [ 7, 6, 7, 7 ], [ 7, 0, 8, 0 ], [ 7, 3, 8, 2 ], [ 7, 4, 8, 5 ], [ 7, 6, 8, 5 ], [ 7, 7, 8, 8 ], [ 7, 10, 8, 10 ], [ 8, 0, 9, 0 ], [ 8, 2, 9, 1 ], [ 8, 5, 9, 5 ], [ 8, 8, 9, 9 ], [ 8, 10, 9, 10 ], [ 9, 0, 10, 0 ], [ 9, 1, 10, 0 ], [ 9, 5, 10, 5 ], [ 9, 9, 10, 10 ], [ 9, 10, 10, 10 ], [ 10, 0, 10, 1 ], [ 10, 1, 10, 2 ], [ 10, 2, 10, 3 ], [ 10, 3, 10, 4 ], [ 10, 4, 10, 5 ], [ 10, 5, 10, 6 ], [ 10, 6, 10, 7 ], [ 10, 7, 10, 8 ], [ 10, 8, 10, 9 ], [ 10, 9, 10, 10 ] ];
for (e = 0; e < n.length; e++) {
this.adj[n[e][0]][n[e][1]].push([ n[e][2], n[e][3] ]);
this.adj[n[e][2]][n[e][3]].push([ n[e][0], n[e][1] ]);
}
},
DfsForRoute: function(e, t, n, o, i) {
var s = e.getComponent("Cell"), a = s.mapx, c = s.mapy;
if (1 != n[a][c]) {
n[a][c] = 1;
i.push(e);
if (0 != t) {
for (l = 0; l < this.adj[a][c].length; l++) this.DfsForRoute(this.map[this.adj[a][c][l][0]][this.adj[a][c][l][1]], t - 1, n, o, i);
i.pop();
n[a][c] = 0;
} else {
for (var r = [], l = 0; l < i.length; l++) r.push(i[l]);
o.push(r);
i.pop();
n[a][c] = 0;
}
}
},
chooseRoute: function() {
for (var e = this.node.parent.getComponent("GetMap"), t = e.routes[this.routeId], n = 0; n < 11; n++) for (var o = 0; o < 11; o++) if (null != e.map[n][o]) {
var i = e.map[n][o].getComponent("Cell");
if (1 == i.inMonitor) {
i.inMonitor = 0;
i.resetColor();
i.routeId = null;
e.map[n][o].off("mousedown", this.chooseRoute, i);
}
}
cc.game.emit("route-chosen", t);
},
openMonitor: function(e) {
for (var t = 0; t < e.length; t++) {
var n = e[t][e[t].length - 1], o = n.getComponent("Cell");
o.inMonitor = 1;
o.setColor();
o.routeId = t;
n.on("mousedown", this.chooseRoute, o);
}
},
posEnable: function(e, t) {
for (var n = [], o = 0; o < 11; o++) {
n[o] = [];
for (var i = 0; i < 11; i++) n[o][i] = 0;
}
var s = [];
this.DfsForRoute(e, t, n, s, []);
this.routes = s;
this.openMonitor(s);
return s;
},
onLoad: function() {
this.GetCell();
this.GetEdge();
console.log(this.name + "onLoad");
},
start: function() {}
});
cc._RF.pop();
}, {} ],
Person: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "c0d9cFPtlNM8a1IZvSmjEWq", "Person");
e("globalGame"), cc.Class({
extends: cc.Component,
properties: {
nickname: {
default: null,
get: function() {
return this.nickname;
}
},
ID: null,
position: null,
attack: 1,
blood: 10,
mobility: 2,
cards: null,
myStatus: 1,
turn: 1,
useCardEnabled: 1,
goEnabled: {
default: 1,
get: function() {
return this._goEnabled;
}
},
parter: null,
avatar: null,
posX: null,
posY: null
},
moveByRoute: function(e) {
for (var t = cc.tween(this.avatar), n = 0; n < e.length; n++) t.to(.1, {
position: cc.v2(e[n].x, e[n].y)
});
t.start();
this.posX = e[e.length - 1].getComponent("Cell").mapx;
this.posY = e[e.length - 1].getComponent("Cell").mapy;
e[e.length - 1].getComponent("Cell").stepOnCell(this.node);
},
move2Pos: function(e, t) {
this.posX = e;
this.posY = t;
var n = cc.find("Canvas/map").getComponent("GetMap").map[e][t].getPosition();
this.avatar.setPosition(n);
},
bindAvatar: function(e) {
this.avatar = e;
},
onLoad: function() {
this.cards = new Array();
window.global.persons.push(this.node);
console.log(this.name + "onLoad");
},
start: function() {},
update: function(e) {}
});
cc._RF.pop();
}, {
globalGame: "globalGame"
} ],
SpriteIndex: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "4e961owjCFBq6BbS/xBKJN1", "SpriteIndex");
cc.Class({
extends: cc.Component,
editor: !1,
properties: {
spriteFrames: [ cc.SpriteFrame ],
_index: 0,
index: {
type: cc.Integer,
get: function() {
return this._index;
},
set: function(e) {
if (!(e < 0)) {
this._index = e % this.spriteFrames.length;
this.node.getComponent(cc.Sprite).spriteFrame = this.spriteFrames[this._index];
}
}
}
},
next: function() {
this.index = (this.index + 1) % 6;
}
});
cc._RF.pop();
}, {} ],
globalGame: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "1c04cewIodMKZmQhbD7lezO", "globalGame");
window.global = {
persons: [],
nowTurn: 0,
isOver: !1,
cardnode: null,
bgm: {
audio: null,
loop: null,
volume: null
}
};
cc.Class({
extends: cc.Component,
properties: {
mapObj: null,
persons: null,
index: 0,
nowStep: 0,
nowPlayer: null,
nowProperty: null,
isWait: !1,
msgBoxConent: null,
time: 0
},
end_card_btn_func: function() {
cc.game.emit("update-state", "1");
cc.find("Canvas/end_card_btn").active = !1;
},
updateUI: function() {},
onLoad: function() {
this.nowStep = 0;
this.msgContent = cc.find("Canvas/msgBox/view/content/item");
cc.game.on("send-Msg", function(e, t) {
var n = "";
parseInt(this.time / 60) < 10 && (n += "0");
n += parseInt(this.time / 60) + ":";
this.time - 60 * parseInt(this.time / 60) < 10 && (n += "0");
var o = "<color=#43CD80>(" + (n += this.time - 60 * parseInt(this.time / 60)) + ")" + t + "</color>";
"系统" == t && (o = "<color=#ff0000>(" + n + ")" + t + "</color>");
this.msgContent.getComponent(cc.RichText).string += o + ": " + e + "<br/>";
cc.find("Canvas/msgBox/view/content").height = this.msgContent.height + 10;
cc.find("Canvas/msgBox").getComponent(cc.ScrollView).scrollToBottom(.1);
}, this);
cc.game.on("update-state", function(e) {
this.nowStep = (this.nowStep + 1) % 5;
this.isWait = !1;
}, this);
cc.game.on("stepOnCell-done", function(e) {
cc.game.emit("update-state", "1");
console.log(e);
cc.game.emit("send-Msg", e, this.nowProperty.nickname);
}, this);
cc.game.on("route-chosen", function(e) {
this.nowProperty.moveByRoute(e);
}, this);
cc.game.on("roll-dice-done", function(e) {
cc.game.emit("send-Msg", "获得骰子点数" + e, this.nowProperty.nickname);
console.log(this.mapObj.posEnable(this.mapObj.map[this.nowProperty.posX][this.nowProperty.posY], e));
}, this);
this.InitialCard();
this.initBgm();
cc.find("Canvas/time").getComponent(cc.Label).schedule(function() {
cc.find("Canvas").getComponent("globalGame").time += 1;
var e = cc.find("Canvas").getComponent("globalGame").time;
this.string = "Time: ";
parseInt(e / 60) < 10 && (this.string += "0");
this.string += parseInt(e / 60) + ":";
e - 60 * parseInt(e / 60) < 10 && (this.string += "0");
this.string += e - 60 * parseInt(e / 60);
}, 1);
cc.game.emit("send-Msg", "好戏开场了!", "系统");
},
start: function() {
this.initPersons();
this.mapObj = cc.find("Canvas/map").getComponent("GetMap");
this.nowPlayer = window.global.persons[this.index];
},
update: function(e) {
console.log("是否等待操作", this.isWait);
switch (this.nowStep) {
case 0:
if (this.isWait) break;
this.nowProperty = this.nowPlayer.getComponent("Person");
cc.game.emit("send-Msg", "轮到角色" + this.nowProperty.nickname, "系统");
cc.game.emit("update-state", "1");
break;

case 1:
if (this.isWait) break;
if (this.nowProperty.goEnabled) {
cc.find("Canvas/tipWin").getComponent("tipWindow").startRollDice();
this.isWait = !0;
} else {
this.nowProperty.goEnabled = 1;
cc.game.emit("update-state", "1");
}
break;

case 2:
if (this.isWait) break;
console.log("当前步骤：", this.nowStep);
console.log("玩家出牌");
cc.game.emit("update-state", "1");
break;

case 3:
if (1 == this.nowProperty.useCardEnabled) {
cc.find("Canvas/end_card_btn").active = !0;
} else cc.game.emit("update-state", "1");
break;

case 4:
this.nowProperty.turn -= 1;
if (0 == this.nowProperty.turn) {
console.log("切换角色");
this.nowProperty.turn += 1;
this.index = (this.index + 1) % 4;
this.nowPlayer = window.global.persons[this.index];
}
cc.game.emit("update-state", "1");
}
},
initPersons: function() {
window.global.persons[0].getComponent("Person").bindAvatar(cc.find("Canvas/avatar/avatar1"));
window.global.persons[1].getComponent("Person").bindAvatar(cc.find("Canvas/avatar/avatar2"));
window.global.persons[2].getComponent("Person").bindAvatar(cc.find("Canvas/avatar/avatar3"));
window.global.persons[3].getComponent("Person").bindAvatar(cc.find("Canvas/avatar/avatar4"));
window.global.persons[0].getComponent("Person").nickname = "老叟";
window.global.persons[1].getComponent("Person").nickname = "少妇";
window.global.persons[2].getComponent("Person").nickname = "富商";
window.global.persons[3].getComponent("Person").nickname = "小女";
window.global.persons[0].getComponent("Person").move2Pos(0, 0);
window.global.persons[1].getComponent("Person").move2Pos(10, 10);
window.global.persons[2].getComponent("Person").move2Pos(0, 10);
window.global.persons[3].getComponent("Person").move2Pos(10, 0);
for (var e = 0; e < window.global.persons.length; e++) {
var t = window.global.persons[e], n = cc.find("bloodBar/bar", t).getComponent(cc.Graphics);
n.clear();
n.strokeColor = cc.Color.RED;
n.moveTo(-40, -150);
n.lineWidth = 10;
n.lineTo(60, -150);
n.stroke();
var o = cc.find("bloodBar/text", t);
o.getComponent(cc.Label).fontSize = 25;
o.setPosition(-100, -150);
(n = cc.find("mobilityBar/bar", t).getComponent(cc.Graphics)).clear();
n.strokeColor = cc.Color.GREEN;
n.moveTo(-40, -180);
n.lineTo(60, -180);
n.lineWidth = 10;
n.stroke();
(o = cc.find("mobilityBar/text", t)).getComponent(cc.Label).fontSize = 25;
o.setPosition(-100, -200);
}
},
initBgm: function() {
cc.loader.loadRes("bgm/天空之城钢琴曲", cc.AudioClip, function(e, t) {
cc.audioEngine.play(t, !0, .1);
});
},
InitialCard: function() {
var e = [ "炸弹", "精准导弹", "地雷", "庇护", "天使的庇护", "战神的祝福", "虚弱", "团队的力量", "治愈", "圣光普照", "望远镜", "眼睛", "猛男的祝福", "盗取", "束缚", "迷惑", "拯救" ];
window.global.cardnode = new Array();
for (var t = 0; t < 17; t++) {
var n = new cc.Node(e[t]);
n.addComponent(cc.Sprite);
n.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(cc.url.raw("resources/卡牌图片/" + e[t] + ".jpg"));
window.global.cardnode.push(n);
}
cc.find("Canvas/end_card_btn").active = !1;
cc.find("Canvas/choose_card_confirm").active = !1;
cc.find("Canvas/choose_card_cancel").active = !1;
this.initBgm();
}
});
cc._RF.pop();
}, {} ],
startUI: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "e9de4KsUm5PGpvP6NWEjcA6", "startUI");
cc.Class({
extends: cc.Component,
properties: {
startGameBtn: null,
exitGameBtn: null
},
onLoad: function() {
this.startGameBtn = cc.find("Canvas/startGame");
this.exitGameBtn = cc.find("Canvas/exitBtn");
console.log(this.startGameBtn);
},
start: function() {},
startGame: function() {
console.log("开始游戏");
cc.director.loadScene("game");
},
exitGame: function() {
console.log("退出游戏");
}
});
cc._RF.pop();
}, {} ],
tipWindow: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "000f6jgaO5Fr6rBFlOCFLDj", "tipWindow");
cc.Class({
extends: cc.Component,
properties: {
title: null,
content: null,
btnOk: null,
framesIndex: null,
count: 0,
callback: null
},
onLoad: function() {
this.title = this.node.getChildByName("title");
this.content = this.node.getChildByName("content");
this.btnOk = this.node.getChildByName("okBtn");
this.node.active = !1;
this.framesIndex = this.node.getChildByName("dice").getComponent("SpriteIndex");
},
start: function() {},
hiddenMyself: function() {
this.node.active = !1;
cc.game.emit("roll-dice-done", this.framesIndex.index + 1);
},
startRollDice: function() {
this.node.active = !0;
this.framesIndex.schedule(function() {
this.next();
}, .05, 20, 0);
}
});
cc._RF.pop();
}, {} ]
}, {}, [ "Cell", "Deck", "GetMap", "Person", "SpriteIndex", "globalGame", "startUI", "tipWindow" ]);