
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Deck.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcRGVjay5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImRlY2siLCJJbnRlZ2VyIiwicm9sZSIsImFkZENhcmQiLCJjYXJkSUQiLCJwdXNoIiwiY2hvb3NlX2NhbmNlbCIsImZpbmQiLCJhY3RpdmUiLCJjYXJkRGV0YWlsIiwibm9kZSIsImluc3RhbnRpYXRlIiwibmFtZSIsInNjYWxlWCIsInNjYWxlWSIsInNldFBvc2l0aW9uIiwicGFyZW50IiwiY2xvc2VEZXRhaWwiLCJkZXN0cm95IiwiY2hvb3NlQ2FyZCIsImdldENvbXBvbmVudCIsInNob3dDYXJkcyIsImlzUGxheUNhcmQiLCJub3dTdGVwIiwiaSIsImxlbmd0aCIsIndpbmRvdyIsImdsb2JhbCIsImNhcmRub2RlIiwib24iLCJjb25zb2xlIiwibG9nIiwiY2xvc2VDYXJkcyIsImNoaWxkcmVuIiwib2ZmIiwiaW5pdERlY2siLCJub3dQbGF5ZXIiLCJjYXJkcyIsIm9uTG9hZCIsInN0YXJ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQUMsSUFBQUEsSUFBSSxFQUFDLENBQUNKLEVBQUUsQ0FBQ0ssT0FBSixDQWhCRztBQWlCUkMsSUFBQUEsSUFBSSxFQUFFO0FBakJFLEdBSFA7QUF1QkxDLEVBQUFBLE9BQU8sRUFBQyxpQkFBU0MsTUFBVCxFQUFnQjtBQUNwQkosSUFBQUEsSUFBSSxDQUFDSyxJQUFMLENBQVVELE1BQVY7QUFDSCxHQXpCSTtBQTBCUkUsRUFBQUEsYUFBYSxFQUFD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SUFBSCxDQUFRLGFBQVIsRUFBdUIwQixRQUFwQzs7QUFDQSxTQUFLLElBQUlULENBQUMsR0FBQyxDQUFYLEVBQWFBLENBQUMsR0FBQ1MsUUFBUSxDQUFDUixNQUF4QixFQUErQixFQUFFRCxDQUFqQztBQUNDUyxNQUFBQSxRQUFRLENBQUNULENBQUQsQ0FBUixDQUFZTixPQUFaO0FBREQ7O0FBRUEsU0FBS1IsSUFBTCxDQUFVd0IsR0FBVixDQUFjLFdBQWQsRUFBMEIsS0FBS0YsVUFBL0IsRUFBMEMsSUFBMUM7QUFDQSxTQUFLdEIsSUFBTCxDQUFVbUIsRUFBVixDQUFhLFdBQWIsRUFBeUIsS0FBS00sUUFBOUIsRUFBdUMsSUFBdkM7QUFDRyxHQXhFSTtBQXlFTEEsRUFBQUEsUUFBUSxFQUFDLG9CQUFVO0FBQ3JCLFNBQUtqQyxJQUFMLEdBQVVOLEVBQUUsQ0FBQ1csSUFBSCxDQUFRLFFBQVIsRUFBa0JhLFlBQWxCLENBQStCLFlBQS9CLEVBQTZDZ0IsU0FBdkQ7QUFDQSxTQUFLcEMsSUFBTCxHQUFVLEtBQUtFLElBQUwsQ0FBVWtCLFlBQVYsQ0FBdUIsUUFBdkIsRUFBaUNpQixLQUEzQztBQUNNLFNBQUtoQixTQUFMO0FBQ0EsU0FBS1gsSUFBTCxDQUFVd0IsR0FBVixDQUFjLFdBQWQsRUFBMEIsS0FBS0MsUUFBL0IsRUFBd0MsSUFBeEM7QUFDQSxTQUFLekIsSUFBTCxDQUFVbUIsRUFBVixDQUFhLFdBQWIsRUFBeUIsS0FBS0csVUFBOUIsRUFBeUMsSUFBekM7QUFDSCxHQS9FSTtBQWdGTE0sRUFBQUEsTUFoRkssb0JBZ0ZLLENBRVQsQ0FsRkk7QUFvRkxDLEVBQUFBLEtBcEZLLG1CQW9GSTtBQUNYLFNBQUs3QixJQUFMLENBQVVtQixFQUFWLENBQWEsV0FBYixFQUF5QixLQUFLTSxRQUE5QixFQUF1QyxJQUF2QztBQUNHLEdBdEZJLENBd0ZMOztBQXhGSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBjYy5DbGFzczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgLy8gZm9vOiB7XHJcbiAgICAgICAgLy8gICAgIC8vIEFUVFJJQlVURVM6XHJcbiAgICAgICAgLy8gICAgIGRlZmF1bHQ6IG51bGwsICAgICAgICAvLyBUaGUgZGVmYXVsdCB2YWx1ZSB3aWxsIGJlIHVzZWQgb25seSB3aGVuIHRoZSBjb21wb25lbnQgYXR0YWNoaW5nXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0byBhIG5vZGUgZm9yIHRoZSBmaXJzdCB0aW1lXHJcbiAgICAgICAgLy8gICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxyXG4gICAgICAgIC8vICAgICBzZXJpYWxpemFibGU6IHRydWUsICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxyXG4gICAgICAgIC8vIH0sXHJcbiAgICAgICAgLy8gYmFyOiB7XHJcbiAgICAgICAgLy8gICAgIGdldCAoKSB7XHJcbiAgICAgICAgLy8gICAgICAgICByZXR1cm4gdGhpcy5fYmFyO1xyXG4gICAgICAgIC8vICAgICB9LFxyXG4gICAgICAgIC8vICAgICBzZXQgKHZhbHVlKSB7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLl9iYXIgPSB2YWx1ZTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH0sXHJcbiAgICAgICAgZGVjazpbY2MuSW50ZWdlcl0sXHJcbiAgICAgICAgcm9sZTogbnVsbCxcclxuICAgIH0sXHJcbiAgICBcclxuICAgIGFkZENhcmQ6ZnVuY3Rpb24oY2FyZElEKXtcclxuICAgICAgICBkZWNrLnB1c2goY2FyZElEKTtcclxuICAgIH0sXHJcblx0Y2hvb3NlX2NhbmNlbDpmdW5jdGlvbigpe1xyXG4gICAgICAgIFxyXG5cdFx0Y2MuZmluZCgnQ2FudmFzL2Nob29zZV9jYXJkX2NvbmZpcm0nKS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgY2MuZmluZCgnQ2FudmFzL2Nob29zZV9jYXJkX2NhbmNlbCcpLmFjdGl2ZT1mYWxzZTsgICAgICAgIFxyXG4gICAgfSxcclxuICAgIGNhcmREZXRhaWw6ZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgbm9kZT1jYy5pbnN0YW50aWF0ZSh0aGlzKTtcclxuICAgICAgICBub2RlLm5hbWU9XCJjYXJkX2RldGFpbFwiO1xyXG4gICAgICAgIG5vZGUuc2NhbGVYPTEsbm9kZS5zY2FsZVk9MTtcclxuICAgICAgICBub2RlLnNldFBvc2l0aW9uKDAsMCk7XHJcbiAgICAgICAgbm9kZS5wYXJlbnQ9Y2MuZmluZChcIkNhbnZhc1wiKTtcclxuICAgIH0sXHJcbiAgICBjbG9zZURldGFpbDpmdW5jdGlvbigpe1xyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXMvY2FyZF9kZXRhaWxcIikuZGVzdHJveSgpO1xyXG4gICAgfSxcclxuICAgIGNob29zZUNhcmQ6ZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgZGVjaz1jYy5maW5kKFwiQ2FudmFzL0RlY2tcIikuZ2V0Q29tcG9uZW50KFwiRGVja1wiKTtcclxuICAgICAgICBkZWNrLmNsb3NlRGV0YWlsKCk7XHJcbiAgICAgICAgLy8gZGVjay5jbG9zZUNhcmRzKCk7XHJcbiAgICAgICAgLy/mmL7npLrnoa7lrpov5Y+W5raI5oyJ6ZKuXHJcblx0XHRjYy5maW5kKCdDYW52YXMvY2hvb3NlX2NhcmRfY29uZmlybScpLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9jaG9vc2VfY2FyZF9jYW5jZWwnKS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICBcclxuICAgIH0sXHRcclxuICAgIHNob3dDYXJkczpmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciBpc1BsYXlDYXJkPShjYy5maW5kKFwiQ2FudmFzXCIpLmdldENvbXBvbmVudChcImdsb2JhbEdhbWVcIikubm93U3RlcD09Myk7XHJcbiAgICAgICAgZm9yICh2YXIgaT0wO2k8dGhpcy5kZWNrLmxlbmd0aDsrK2kpe1xyXG4gICAgICAgICAgICB2YXIgY2FyZElEPXRoaXMuZGVja1tpXTtcclxuICAgICAgICAgICAgdmFyIG5vZGU9Y2MuaW5zdGFudGlhdGUod2luZG93Lmdsb2JhbC5jYXJkbm9kZVtjYXJkSURdKTtcclxuICAgICAgICAgICAgbm9kZS5zY2FsZVg9MC40LG5vZGUuc2NhbGVZPTAuNDtcclxuICAgICAgICAgICAgbm9kZS5zZXRQb3NpdGlvbigyMDAraSoyMDAsMCk7XHJcbiAgICAgICAgICAgIG5vZGUucGFyZW50PXRoaXMubm9kZTtcclxuICAgICAgICAgICAgbm9kZS5vbihcIm1vdXNlZW50ZXJcIix0aGlzLmNhcmREZXRhaWwsbm9kZSk7XHJcbiAgICAgICAgICAgIG5vZGUub24oXCJtb3VzZWxlYXZlXCIsdGhpcy5jbG9zZURldGFpbCxub2RlKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJpc3BhbHljYXJkOlwiLGlzUGxheUNhcmQpO1xyXG5cdFx0XHRpZiAoaXNQbGF5Q2FyZD09dHJ1ZSl7XHJcblx0XHRcdCAgICBub2RlLm9uKFwibW91c2Vkb3duXCIsdGhpcy5jaG9vc2VDYXJkLG5vZGUpO1xyXG5cdFx0XHR9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHRjbG9zZUNhcmRzOmZ1bmN0aW9uKCl7XHJcblx0XHR2YXIgY2hpbGRyZW49Y2MuZmluZChcIkNhbnZhcy9EZWNrXCIpLmNoaWxkcmVuO1xyXG5cdFx0Zm9yICh2YXIgaT0wO2k8Y2hpbGRyZW4ubGVuZ3RoOysraSlcclxuXHRcdFx0Y2hpbGRyZW5baV0uZGVzdHJveSgpO1xyXG5cdFx0dGhpcy5ub2RlLm9mZihcIm1vdXNlZG93blwiLHRoaXMuY2xvc2VDYXJkcyx0aGlzKTtcclxuXHRcdHRoaXMubm9kZS5vbihcIm1vdXNlZG93blwiLHRoaXMuaW5pdERlY2ssdGhpcyk7XHJcbiAgICB9LFxyXG4gICAgaW5pdERlY2s6ZnVuY3Rpb24oKXtcclxuXHRcdHRoaXMucm9sZT1jYy5maW5kKFwiQ2FudmFzXCIpLmdldENvbXBvbmVudChcImdsb2JhbEdhbWVcIikubm93UGxheWVyO1xyXG5cdFx0dGhpcy5kZWNrPXRoaXMucm9sZS5nZXRDb21wb25lbnQoXCJQZXJzb25cIikuY2FyZHM7XHJcbiAgICAgICAgdGhpcy5zaG93Q2FyZHMoKTtcclxuICAgICAgICB0aGlzLm5vZGUub2ZmKFwibW91c2Vkb3duXCIsdGhpcy5pbml0RGVjayx0aGlzKTtcclxuICAgICAgICB0aGlzLm5vZGUub24oXCJtb3VzZWRvd25cIix0aGlzLmNsb3NlQ2FyZHMsdGhpcyk7XHJcbiAgICB9LFxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQgKCkge1xyXG5cdFx0dGhpcy5ub2RlLm9uKFwibW91c2Vkb3duXCIsdGhpcy5pbml0RGVjayx0aGlzKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge30sXHJcbn0pO1xyXG4iXX0=