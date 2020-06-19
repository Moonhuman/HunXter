
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
    }
  },
  closeCards: function closeCards() {
    var children = this.node.children;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcRGVjay5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImRlY2siLCJJbnRlZ2VyIiwicm9sZSIsImFkZENhcmQiLCJjYXJkSUQiLCJwdXNoIiwiY2FyZERldGFpbCIsIm5vZGUiLCJpbnN0YW50aWF0ZSIsIm5hbWUiLCJzY2FsZVgiLCJzY2FsZVkiLCJzZXRQb3NpdGlvbiIsInBhcmVudCIsImZpbmQiLCJjbG9zZURldGFpbCIsImRlc3Ryb3kiLCJzaG93Q2FyZHMiLCJpc1BsYXlDYXJkIiwiZ2V0Q29tcG9uZW50Iiwibm93U3RlcCIsImkiLCJsZW5ndGgiLCJ3aW5kb3ciLCJnbG9iYWwiLCJjYXJkbm9kZSIsIm9uIiwiY2xvc2VDYXJkcyIsImNoaWxkcmVuIiwib2ZmIiwiaW5pdERlY2siLCJub3dQbGF5ZXIiLCJjYXJkcyIsIm9uTG9hZCIsInN0YXJ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQUMsSUFBQUEsSUFBSSxFQUFDLENBQUNKLEVBQUUsQ0FBQ0ssT0FBSixDQWhCRztBQWlCUkMsSUFBQUEsSUFBSSxFQUFFO0FBakJFLEdBSFA7QUFzQkxDLEVBQUFBLE9BQU8sRUFBQyxpQkFBU0MsTUFBVCxFQUFnQjtBQUNwQkosSUFBQUEsSUFBSSxDQUFDSyxJQUFMLENBQVVELE1BQVY7QUFDSCxHQXhCSTtBQTBCTEUsRUFBQUEsVUFBVSxFQUFDLHNCQUFVO0FBQ2pCLFFBQUlDLElBQUksR0FBQ1gsRUFBRSxDQUFDWSxXQUFILENBQWUsSUFB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aEVJO0FBa0VMQyxFQUFBQSxLQWxFSyxtQkFrRUk7QUFDWCxTQUFLM0IsSUFBTCxDQUFVbUIsRUFBVixDQUFhLFdBQWIsRUFBeUIsS0FBS0ksUUFBOUIsRUFBdUMsSUFBdkM7QUFDRyxHQXBFSSxDQXNFTDs7QUF0RUssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gY2MuQ2xhc3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIC8vIGZvbzoge1xyXG4gICAgICAgIC8vICAgICAvLyBBVFRSSUJVVEVTOlxyXG4gICAgICAgIC8vICAgICBkZWZhdWx0OiBudWxsLCAgICAgICAgLy8gVGhlIGRlZmF1bHQgdmFsdWUgd2lsbCBiZSB1c2VkIG9ubHkgd2hlbiB0aGUgY29tcG9uZW50IGF0dGFjaGluZ1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdG8gYSBub2RlIGZvciB0aGUgZmlyc3QgdGltZVxyXG4gICAgICAgIC8vICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcclxuICAgICAgICAvLyAgICAgc2VyaWFsaXphYmxlOiB0cnVlLCAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcclxuICAgICAgICAvLyB9LFxyXG4gICAgICAgIC8vIGJhcjoge1xyXG4gICAgICAgIC8vICAgICBnZXQgKCkge1xyXG4gICAgICAgIC8vICAgICAgICAgcmV0dXJuIHRoaXMuX2JhcjtcclxuICAgICAgICAvLyAgICAgfSxcclxuICAgICAgICAvLyAgICAgc2V0ICh2YWx1ZSkge1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5fYmFyID0gdmFsdWU7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9LFxyXG4gICAgICAgIGRlY2s6W2NjLkludGVnZXJdLFxyXG4gICAgICAgIHJvbGU6IG51bGwsXHJcbiAgICB9LFxyXG4gICAgYWRkQ2FyZDpmdW5jdGlvbihjYXJkSUQpe1xyXG4gICAgICAgIGRlY2sucHVzaChjYXJkSUQpO1xyXG4gICAgfSxcclxuXHRcclxuICAgIGNhcmREZXRhaWw6ZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgbm9kZT1jYy5pbnN0YW50aWF0ZSh0aGlzKTtcclxuICAgICAgICBub2RlLm5hbWU9XCJjYXJkX2RldGFpbFwiO1xyXG4gICAgICAgIG5vZGUuc2NhbGVYPTEsbm9kZS5zY2FsZVk9MTtcclxuICAgICAgICBub2RlLnNldFBvc2l0aW9uKDAsMCk7XHJcbiAgICAgICAgbm9kZS5wYXJlbnQ9Y2MuZmluZChcIkNhbnZhc1wiKTtcclxuICAgIH0sXHJcbiAgICBjbG9zZURldGFpbDpmdW5jdGlvbigpe1xyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXMvY2FyZF9kZXRhaWxcIikuZGVzdHJveSgpO1xyXG4gICAgfSxcclxuICAgIHNob3dDYXJkczpmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciBpc1BsYXlDYXJkPShjYy5maW5kKFwiQ2FudmFzXCIpLmdldENvbXBvbmVudChcImdsb2JhbEdhbWVcIikubm93U3RlcD09Myk7XHJcbiAgICAgICAgZm9yICh2YXIgaT0wO2k8dGhpcy5kZWNrLmxlbmd0aDsrK2kpe1xyXG4gICAgICAgICAgICB2YXIgY2FyZElEPXRoaXMuZGVja1tpXTtcclxuICAgICAgICAgICAgdmFyIG5vZGU9Y2MuaW5zdGFudGlhdGUod2luZG93Lmdsb2JhbC5jYXJkbm9kZVtjYXJkSURdKTtcclxuICAgICAgICAgICAgbm9kZS5zY2FsZVg9MC40LG5vZGUuc2NhbGVZPTAuNDtcclxuICAgICAgICAgICAgbm9kZS5zZXRQb3NpdGlvbigyMDAraSoyMDAsMCk7XHJcbiAgICAgICAgICAgIG5vZGUucGFyZW50PXRoaXMubm9kZTtcclxuICAgICAgICAgICAgbm9kZS5vbihcIm1vdXNlZW50ZXJcIix0aGlzLmNhcmREZXRhaWwsbm9kZSk7XHJcbiAgICAgICAgICAgIG5vZGUub24oXCJtb3VzZWxlYXZlXCIsdGhpcy5jbG9zZURldGFpbCxub2RlKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cdGNsb3NlQ2FyZHM6ZnVuY3Rpb24oKXtcclxuXHRcdHZhciBjaGlsZHJlbj10aGlzLm5vZGUuY2hpbGRyZW47XHJcblx0XHRmb3IgKHZhciBpPTA7aTxjaGlsZHJlbi5sZW5ndGg7KytpKVxyXG5cdFx0XHRjaGlsZHJlbltpXS5kZXN0cm95KCk7XHJcblx0XHR0aGlzLm5vZGUub2ZmKFwibW91c2Vkb3duXCIsdGhpcy5jbG9zZUNhcmRzLHRoaXMpO1xyXG5cdFx0dGhpcy5ub2RlLm9uKFwibW91c2Vkb3duXCIsdGhpcy5pbml0RGVjayx0aGlzKTtcclxuICAgIH0sXHJcbiAgICBpbml0RGVjazpmdW5jdGlvbigpe1xyXG5cdFx0dGhpcy5yb2xlPWNjLmZpbmQoXCJDYW52YXNcIikuZ2V0Q29tcG9uZW50KFwiZ2xvYmFsR2FtZVwiKS5ub3dQbGF5ZXI7XHJcblx0XHR0aGlzLmRlY2s9dGhpcy5yb2xlLmdldENvbXBvbmVudChcIlBlcnNvblwiKS5jYXJkcztcclxuICAgICAgICB0aGlzLnNob3dDYXJkcygpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vZmYoXCJtb3VzZWRvd25cIix0aGlzLmluaXREZWNrLHRoaXMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vbihcIm1vdXNlZG93blwiLHRoaXMuY2xvc2VDYXJkcyx0aGlzKTtcclxuICAgIH0sXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIFxyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydCAoKSB7XHJcblx0XHR0aGlzLm5vZGUub24oXCJtb3VzZWRvd25cIix0aGlzLmluaXREZWNrLHRoaXMpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcclxufSk7XHJcbiJdfQ==