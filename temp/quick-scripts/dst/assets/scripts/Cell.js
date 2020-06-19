
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Cell.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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

  },
  setColor: function setColor() {
    //设置cell的颜色为红色，表示可走
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
  stepOnCell: function stepOnCell(person) {
    //获取person节点的组件
    var person_js = person.getComponent('Person');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcQ2VsbC5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIm1hcHgiLCJtYXB5Iiwia2luZCIsImluTW9uaXRvciIsInJvdXRlSUQiLCJzZXRDb2xvciIsIm5vZGUiLCJjb2xvciIsInJlc2V0Q29sb3IiLCJnZXRPbmVDYXJkIiwicGVyc29uX2pzIiwiY2FyZE5hbWUiLCJ0b3RDYXJkTnVtIiwiY2FyZElEIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiY2FyZHMiLCJwdXNoIiwiaW5zdGFudGlhdGUiLCJ3aW5kb3ciLCJnbG9iYWwiLCJjYXJkbm9kZSIsInNldFBvc2l0aW9uIiwibXNnIiwib24iLCJldmVudCIsImdhbWUiLCJlbWl0IiwiZGVzdHJveSIsInBhcmVudCIsImNob29zZUZyb21UaHJlZSIsImNkIiwiY29uc29sZSIsImxvZyIsImkiLCJuYW1lIiwiZmluZCIsImdldENvbXBvbmVudCIsIm5vd1BsYXllciIsImoiLCJldmVudEFjdGlvbiIsInJhbmRfZXZlbnQiLCJub3RlIiwiTm9kZSIsImFkZENvbXBvbmVudCIsIlNwcml0ZSIsInNlbGYiLCJldmVudF9uYW1lIiwidXNlQ2FyZEVuYWJsZWQiLCJnb0VuYWJsZWQiLCJibG9vZCIsInR1cm4iLCJsb2FkZXIiLCJsb2FkUmVzIiwiU3ByaXRlRnJhbWUiLCJlcnIiLCJzcHJpdGVGcmFtZSIsInN0ZXBPbkNlbGwiLCJwZXJzb24iLCJyYW5kX3ZhbCIsIm9uTG9hZCIsInN0YXJ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDZEMsSUFBQUEsSUFBSSxFQUFFLENBRFE7QUFDTDtBQUNUQyxJQUFBQSxJQUFJLEVBQUUsQ0FG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LEVBQUUsQ0FBQzJELFdBQTdCLEVBQTBDLFVBQVVDLEdBQVYsRUFBZUMsV0FBZixFQUE0QjtBQUNyRVYsUUFBQUEsSUFBSSxDQUFDekMsSUFBTCxDQUFVZ0MsWUFBVixDQUF1QjFDLEVBQUUsQ0FBQ2tELE1BQTFCLEVBQWtDVyxXQUFsQyxHQUFnREEsV0FBaEQ7QUFDQSxPQUZEO0FBR0EsS0FKRCxNQUtLLElBQUksS0FBS3ZELElBQUwsSUFBYSxDQUFqQixFQUFvQjtBQUFFO0FBQzFCTixNQUFBQSxFQUFFLENBQUN5RCxNQUFILENBQVVDLE9BQVYsQ0FBa0IsS0FBbEIsRUFBeUIxRCxFQUFFLENBQUMyRCxXQUE1QixFQUF5QyxVQUFVQyxHQUFWLEVBQWVDLFdBQWYsRUFBNEI7QUFDcEVWLFFBQUFBLElBQUksQ0FBQ3pDLElBQUwsQ0FBVWdDLFlBQVYsQ0FBdUIxQyxFQUFFLENBQUNrRCxNQUExQixFQUFrQ1csV0FBbEMsR0FBZ0RBLFdBQWhEO0FBQ0EsT0FGRDtBQUdBLEtBSkksTUFLQTtBQUFFO0FBQ043RCxNQUFBQSxFQUFFLENBQUN5RCxNQUFILENBQVVDLE9BQVYsQ0FBa0IsS0FBbEIsRUFBeUIxRCxFQUFFLENBQUMyRCxXQUE1QixFQUF5QyxVQUFVQyxHQUFWLEVBQWVDLFdBQWYsRUFBNEI7QUFDcEVWLFFBQUFBLElBQUksQ0FBQ3pDLElBQUwsQ0FBVWdDLFlBQVYsQ0FBdUIxQyxFQUFFLENBQUNrRCxNQUExQixFQUFrQ1csV0FBbEMsR0FBZ0RBLFdBQWhEO0FBQ0EsT0FGRDtBQUdBO0FBQ0UsR0FuTEksQ0FxTEw7O0FBckxLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG5cdFx0bWFweDogMCwgLy/lnKhtYXBbaV1bal3kuK3nmoTmqKrlnZDmoIdcblx0XHRtYXB5OiAwLC8v5ZyobWFwW2ldW2pd5Lit55qE57q15Z2Q5qCHXG5cdFx0a2luZDogbnVsbCwgLy/moLzlrZDnmoTnsbvlnovvvIwwOuepuueZveagvO+8jDE65Y2h54mM5qC877yMMjrkuovku7bmoLxcblx0XHRpbk1vbml0b3I6IDAsIC8v55So5p2l5Yik5pat5piv5ZCm5aSE5LqO55uR5ZCs5Lit55qE5qCH6K6wXG5cdFx0cm91dGVJRDogbnVsbCwgLy/orrDlvZXov5nkuKpjZWxs5pivbWFw5Lit5ZOq5p2hcm91dGXnmoTnu4jngrnvvIzljbPlnKhyb3V0ZXPkuK3nmoTkuIvmoIdcblx0XHRcbiAgICAgICAgLy8gZm9vOiB7XG4gICAgICAgIC8vICAgICAvLyBBVFRSSUJVVEVTOlxuICAgICAgICAvLyAgICAgZGVmYXVsdDogbnVsbCwgICAgICAgIC8vIFRoZSBkZWZhdWx0IHZhbHVlIHdpbGwgYmUgdXNlZCBvbmx5IHdoZW4gdGhlIGNvbXBvbmVudCBhdHRhY2hpbmdcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0byBhIG5vZGUgZm9yIHRoZSBmaXJzdCB0aW1lXG4gICAgICAgIC8vICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcbiAgICAgICAgLy8gICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIGJhcjoge1xuICAgICAgICAvLyAgICAgZ2V0ICgpIHtcbiAgICAgICAgLy8gICAgICAgICByZXR1cm4gdGhpcy5fYmFyO1xuICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgLy8gICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLl9iYXIgPSB2YWx1ZTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfSxcbiAgICB9LFxuXHRcblx0c2V0Q29sb3I6IGZ1bmN0aW9uKCkge1xuXHRcdC8v6K6+572uY2VsbOeahOminOiJsuS4uue6ouiJsu+8jOihqOekuuWPr+i1sFxuXHRcdHRoaXMubm9kZS5jb2xvciA9IGNjLmNvbG9yKDEwMiwyNTUsMTAyLDI1NSk7XG5cdH0sXG5cdFxuXHRyZXNldENvbG9yOiBmdW5jdGlvbigpIHtcblx0XHQvL+i/mOWOn2NlbGznmoTpopzoibJcblx0XHR0aGlzLm5vZGUuY29sb3IgPSBjYy5jb2xvcigyNTUsMjU1LDI1NSwyNTUpO1xuXHR9LFxuXHRcblx0Z2V0T25lQ2FyZDogZnVuY3Rpb24ocGVyc29uX2pzLCBjYXJkTmFtZSwgdG90Q2FyZE51bSkge1xuXHRcdC8v6ZqP5py66I635b6XMeW8oOeJjFxuXHRcdHZhciBjYXJkSUQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqdG90Q2FyZE51bSk7XG5cdFx0cGVyc29uX2pzLmNhcmRzLnB1c2goY2FyZElEKTtcblx0XHQvL+WIm+W7uueUqOadpeaPkOekuuiOt+W+l+WNoeeJjOeahOeyvueBteiKgueCuVxuXHRcdHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUod2luZG93Lmdsb2JhbC5jYXJkbm9kZVtjYXJkSURdKTtcblx0XHRub2RlLnNldFBvc2l0aW9uKDAsIDApO1xuXHRcdC8v5byA5ZCvbm90ZeiKgueCueeahOebkeWQrO+8jOeCueWHu+WQjua2iOWksVxuXHRcdG5vZGUubXNnID0gJ+iOt+W+l+WNoeeJjDonK2NhcmROYW1lW2NhcmRJRF07XG5cdFx0bm9kZS5vbignbW91c2Vkb3duJywgZnVuY3Rpb24gKCBldmVudCApIHtcblx0XHRcdGNjLmdhbWUuZW1pdCgnc3RlcE9uQ2VsbC1kb25lJywgdGhpcy5tc2cpO1xuXHRcdFx0dGhpcy5kZXN0cm95KCk7XG5cdFx0fSwgbm9kZSk7XG5cdFx0bm9kZS5wYXJlbnQgPSB0aGlzLm5vZGUucGFyZW50LnBhcmVudDtcblx0fSxcblx0XG5cdGNob29zZUZyb21UaHJlZTogZnVuY3Rpb24oY2FyZE5hbWUsIHRvdENhcmROdW0pIHtcblx0XHR2YXIgY2QgPSBbXTtcblx0XHRjZFswXSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSp0b3RDYXJkTnVtKTtcblx0XHRjZFsxXSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSp0b3RDYXJkTnVtKTtcblx0XHRjZFsyXSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSp0b3RDYXJkTnVtKTtcblx0XHRcblx0XHRjb25zb2xlLmxvZyhjZCk7XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IDM7IGkrKykge1xuXHRcdFx0dmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh3aW5kb3cuZ2xvYmFsLmNhcmRub2RlW2NkW2ldXSk7XG5cdFx0XHRub2RlLm5hbWUgPSAnY2hvb3NlRnJvbVRocmVlJytpO1xuXHRcdFx0bm9kZS5zZXRQb3NpdGlvbigtNTAwKzUwMCppLCAwKTtcblx0XHRcdG5vZGUuY2FyZElEID0gY2RbaV07XG5cdFx0XHRub2RlLm1zZyA9ICfojrflvpfljaHniYw6JytjYXJkTmFtZVtjZFtpXV07XG5cdFx0XHRub2RlLm9uKCdtb3VzZWRvd24nLCBmdW5jdGlvbihldmVudCkge1xuXHRcdFx0XHR2YXIgcGVyc29uX2pzID0gY2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdnbG9iYWxHYW1lJykubm93UGxheWVyLmdldENvbXBvbmVudCgnUGVyc29uJyk7XG5cdFx0XHRcdGNvbnNvbGUubG9nKCflvpfliLDljaHniYw6Jyt0aGlzLmNhcmRJRCk7XG5cdFx0XHRcdHBlcnNvbl9qcy5jYXJkcy5wdXNoKHRoaXMuY2FyZElEKTtcblx0XHRcdFx0Y2MuZ2FtZS5lbWl0KCdzdGVwT25DZWxsLWRvbmUnLCB0aGlzLm1zZyk7XG5cdFx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgMzsgaisrKSB7XG5cdFx0XHRcdFx0Y2MuZmluZCgnQ2FudmFzL2Nob29zZUZyb21UaHJlZScraikuZGVzdHJveSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LCBub2RlKVxuXHRcdFx0bm9kZS5wYXJlbnQgPSB0aGlzLm5vZGUucGFyZW50LnBhcmVudDtcblx0XHR9XG5cdFx0XG5cdH0sXG5cdFxuXHRldmVudEFjdGlvbjogZnVuY3Rpb24ocGVyc29uX2pzKSB7XG5cdFx0Ly/pmo/mnLrkuqfnlJ825Liq5LqL5Lu25LmL5LiAXG5cdFx0dmFyIHJhbmRfZXZlbnQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqNik7XG5cdFx0Ly/liJvlu7rnlKjmnaXmj5DnpLrojrflvpfop6blj5Hkuovku7bnmoTnsr7ngbXoioLngrlcblx0XHR2YXIgbm90ZSA9IG5ldyBjYy5Ob2RlKCk7XG5cdFx0bm90ZS5hZGRDb21wb25lbnQoY2MuU3ByaXRlKTtcblx0XHRub3RlLnNldFBvc2l0aW9uKDAsIDApO1xuXHRcdG5vdGUucGFyZW50ID0gdGhpcy5ub2RlLnBhcmVudC5wYXJlbnQ7XG5cdFx0dmFyIHNlbGYgPSBub3RlLCBldmVudF9uYW1lO1xuXHRcdGlmIChyYW5kX2V2ZW50ID09IDApIHsgLy/pmbfpmLFcblx0XHRcdGV2ZW50X25hbWUgPSBcIumZt+mYsVwiO1xuXHRcdFx0cGVyc29uX2pzLnVzZUNhcmRFbmFibGVkID0gMDsgLy/mnKzlm57lkIjkuI3lj6/kvb/nlKjljaHniYws5LiL5Zue5ZCI572uMVxuXHRcdFx0Ly93YXJuaW5nOiDkuIvlm57lkIjorrDlvpfmlLnlj5hcblx0XHR9XG5cdFx0ZWxzZSBpZiAocmFuZF9ldmVudCA9PSAxKSB7IC8v55uR54uxXG5cdFx0XHRldmVudF9uYW1lID0gXCLnm5Hni7FcIjsgLy/kuIvlm57lkIjkuI3lj6/otbBcblx0XHRcdHBlcnNvbl9qcy5nb0VuYWJsZWQgPSAwO1xuXHRcdFx0Ly93YXJuaW5nOiDkuIvlm57lkIjorrDlvpfmlLnlj5hcblx0XHR9XG5cdFx0ZWxzZSBpZiAocmFuZF9ldmVudCA9PSAyKSB7IC8v5oG26a2UXG5cdFx0XHRldmVudF9uYW1lID0gXCLmgbbprZRcIjsgIC8v5o2f5aSx5LiA5ru06KGA6YePXG5cdFx0XHRwZXJzb25fanMuYmxvb2QtLTtcblx0XHR9XG5cdFx0ZWxzZSBpZiAocmFuZF9ldmVudCA9PSAzKSB7IC8v5aWl5Yip57uZXG5cdFx0XHRldmVudF9uYW1lID0gXCLlpaXliKnnu5lcIjtcblx0XHRcdHBlcnNvbl9qcy50dXJuKys7IC8v6I635b6X5Zue5ZCIXG5cdFx0fVxuXHRcdGVsc2UgaWYgKHJhbmRfZXZlbnQgPT0gNCkgeyAvL+inhumHjlxuXHRcdFx0ZXZlbnRfbmFtZSA9IFwi6KeG6YeOXCI7ICAvL3RvIGRvXG5cdFx0fVxuXHRcdGVsc2UgaWYgKHJhbmRfZXZlbnQgPT0gNSkgeyAvL+WkqeS9v1xuXHRcdFx0ZXZlbnRfbmFtZSA9IFwi5aSp5L2/XCI7XG5cdFx0XHRwZXJzb25fanMuYmxvb2QgPSBNYXRoLmZsb29yKHBlcnNvbl9qcy5ibG9vZCoxLjUpO1xuXHRcdH1cblx0XHRjYy5sb2FkZXIubG9hZFJlcygn5LqL5Lu25Zu+54mHLycrZXZlbnRfbmFtZSwgY2MuU3ByaXRlRnJhbWUsIGZ1bmN0aW9uIChlcnIsIHNwcml0ZUZyYW1lKSB7XG5cdFx0XHRzZWxmLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gc3ByaXRlRnJhbWU7XG5cdFx0fSk7XG5cdFx0Ly/lvIDlkK9ub3Rl6IqC54K555qE55uR5ZCs77yM54K55Ye75ZCO5raI5aSxXG5cdFx0bm90ZS5tc2cgPSAn6Kem5Y+R5LqL5Lu2OicrZXZlbnRfbmFtZTtcblx0XHRub3RlLm9uKCdtb3VzZWRvd24nLCBmdW5jdGlvbiAoIGV2ZW50ICkge1xuXHRcdFx0Y2MuZ2FtZS5lbWl0KCdzdGVwT25DZWxsLWRvbmUnLCB0aGlzLm1zZyk7XG5cdFx0XHR0aGlzLmRlc3Ryb3koKTtcblx0XHRcdFxuXHRcdH0sIG5vdGUpO1xuXHR9LFxuXHRcblx0c3RlcE9uQ2VsbDogZnVuY3Rpb24ocGVyc29uKSB7XG5cdFx0XG5cdFx0Ly/ojrflj5ZwZXJzb27oioLngrnnmoTnu4Tku7Zcblx0XHR2YXIgcGVyc29uX2pzID0gcGVyc29uLmdldENvbXBvbmVudCgnUGVyc29uJyk7XG5cdFx0XG5cdFx0aWYgKHRoaXMua2luZCA9PSAwKSB7Ly/nqbrnmb3moLxcblx0XHRcdGNjLmdhbWUuZW1pdCgnc3RlcE9uQ2VsbC1kb25lJywgJycpOyAvL+WPkemAgeepuuS4slxuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRlbHNlIGlmICh0aGlzLmtpbmQgPT0gMSkgey8v5Y2h54mM5qC8XG5cdFx0XHR2YXIgY2FyZE5hbWUgPSBbJ+eCuOW8uScsJ+eyvuWHhuWvvOW8uScsJ+WcsOmbtycsJ+W6h+aKpCcsJ+WkqeS9v+eahOW6h+aKpCcsJ+aImOelnueahOelneemjycsJ+iZmuW8sScsJ+WboumYn+eahOWKm+mHjycsXG5cdFx0XHRcdFx0XHRcdCfmsrvmhIgnLCflnKPlhYnmma7nhacnLCfmnJvov5zplZwnLCfnnLznnZsnLCfnjJvnlLfnmoTnpZ3npo8nLCfnm5flj5YnLCfmnZ/nvJonLCfov7fmg5EnLCfmi6/mlZEnXTtcblx0XHRcdHZhciB0b3RDYXJkTnVtID0gMTdcblx0XHRcdHZhciByYW5kX3ZhbCA9IE1hdGgucmFuZG9tKCk7XG5cdFx0XHRjb25zb2xlLmxvZygncmFuZF92YWwnK3JhbmRfdmFsKTtcblx0XHRcdGlmIChyYW5kX3ZhbCA8IDAuNSkgeyAvL+W+l+WIsOS4gOW8oOeJjFxuXHRcdFx0XHR0aGlzLmdldE9uZUNhcmQocGVyc29uX2pzLCBjYXJkTmFtZSwgdG90Q2FyZE51bSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNleyAvL+S4ieW8oOS4reaKveS4gOW8oFxuXHRcdFx0XHR0aGlzLmNob29zZUZyb21UaHJlZShjYXJkTmFtZSwgdG90Q2FyZE51bSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2UgaWYgKHRoaXMua2luZCA9PSAyKSB7IC8v5LqL5Lu25qC8XG5cdFx0XHR0aGlzLmV2ZW50QWN0aW9uKHBlcnNvbl9qcyk7IC8v5ZON5bqU5LqL5Lu2XG5cdFx0fVxuXHR9LFxuXHRcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcblxuICAgIG9uTG9hZCAoKSB7XG5cdFx0XG5cdH0sXG5cbiAgICBzdGFydCAoKSB7XG5cdFx0Ly/orr7nva7moLzlrZDlm77niYdcblx0XHRcblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cdFx0aWYgKHRoaXMua2luZCA9PSAwKSB7IC8v56m655m95qC8XG5cdFx0XHRjYy5sb2FkZXIubG9hZFJlcyhcImNlbGxcIiwgY2MuU3ByaXRlRnJhbWUsIGZ1bmN0aW9uIChlcnIsIHNwcml0ZUZyYW1lKSB7XG5cdFx0XHRcdHNlbGYubm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHNwcml0ZUZyYW1lO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGVsc2UgaWYgKHRoaXMua2luZCA9PSAxKSB7IC8v5Y2h54mM5qC8XG5cdFx0XHRjYy5sb2FkZXIubG9hZFJlcyhcIuaKveWNoeagvFwiLCBjYy5TcHJpdGVGcmFtZSwgZnVuY3Rpb24gKGVyciwgc3ByaXRlRnJhbWUpIHtcblx0XHRcdFx0c2VsZi5ub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gc3ByaXRlRnJhbWU7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0ZWxzZSB7IC8v5LqL5Lu25qC8XG5cdFx0XHRjYy5sb2FkZXIubG9hZFJlcyhcIuS6i+S7tuagvFwiLCBjYy5TcHJpdGVGcmFtZSwgZnVuY3Rpb24gKGVyciwgc3ByaXRlRnJhbWUpIHtcblx0XHRcdFx0c2VsZi5ub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gc3ByaXRlRnJhbWU7XG5cdFx0XHR9KTtcblx0XHR9XG4gICAgfSxcblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxufSk7XG5cblxuXG5cblxuXG5cblxuXG5cblxuXG4iXX0=