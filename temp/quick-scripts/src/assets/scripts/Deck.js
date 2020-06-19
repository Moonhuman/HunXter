"use strict";
cc._RF.push(module, 'e31f9fOl6FASK8z1DIOII1V', 'Deck');
// scripts/Deck.js

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
    // foo: {
    //     // ATTRIBUTES:
    //     default: null,        // The default value will be used only when the component attaching
    //                           // to a node for the first time
    //     type: cc.SpriteFrame, // optional, default is typeof default
    //     serializable: true,   // optional, default is true
    // },
    // bar: {
    //     get () {
    //         return this._bar;
    //     },
    //     set (value) {
    //         this._bar = value;
    //     }
    // },
    deck: [cc.Integer],
    role: null
  },
  addCard: function addCard(cardID) {
    deck.push(cardID);
  },
  choose_cancel: function choose_cancel() {
    cc.find('Canvas/choose_card_confirm').active = false;
    cc.find('Canvas/choose_card_cancel').active = false;
  },
  cardDetail: function cardDetail() {
    var node = cc.instantiate(this);
    node.name = "card_detail";
    node.scaleX = 1, node.scaleY = 1;
    node.setPosition(0, 0);
    node.parent = cc.find("Canvas");
  },
  closeDetail: function closeDetail() {
    cc.find("Canvas/card_detail").destroy();
  },
  chooseCard: function chooseCard() {
    var deck = cc.find("Canvas/Deck").getComponent("Deck");
    deck.closeDetail(); // deck.closeCards();
    //显示确定/取消按钮

    cc.find('Canvas/choose_card_confirm').active = true;
    cc.find('Canvas/choose_card_cancel').active = true;
  },
  showCards: function showCards() {
    var isPlayCard = cc.find("Canvas").getComponent("globalGame").nowStep == 3;

    for (var i = 0; i < this.deck.length; ++i) {
      var cardID = this.deck[i];
      var node = cc.instantiate(window.global.cardnode[cardID]);
      node.scaleX = 0.4, node.scaleY = 0.4;
      node.setPosition(200 + i * 200, 0);
      node.parent = this.node;
      node.on("mouseenter", this.cardDetail, node);
      node.on("mouseleave", this.closeDetail, node);
      console.log("ispalycard:", isPlayCard);

      if (isPlayCard == true) {
        node.on("mousedown", this.chooseCard, node);
      }
    }
  },
  closeCards: function closeCards() {
    var children = cc.find("Canvas/Deck").children;

    for (var i = 0; i < children.length; ++i) {
      children[i].destroy();
    }

    this.node.off("mousedown", this.closeCards, this);
    this.node.on("mousedown", this.initDeck, this);
  },
  initDeck: function initDeck() {
    this.role = cc.find("Canvas").getComponent("globalGame").nowPlayer;
    this.deck = this.role.getComponent("Person").cards;
    this.showCards();
    this.node.off("mousedown", this.initDeck, this);
    this.node.on("mousedown", this.closeCards, this);
  },
  onLoad: function onLoad() {},
  start: function start() {
    this.node.on("mousedown", this.initDeck, this);
  } // update (dt) {},

});

cc._RF.pop();