
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
    this.node.color = cc.Color.RED;
  },
  resetColor: function resetColor() {
    //还原cell的颜色
    this.node.color = cc.color(255, 255, 255, 255);
  },
  stepOnCell: function stepOnCell(person) {
    //获取person节点的组件
    var person_js = person.getComponent('Person');

    if (this.kind == 0) {
      //空白格
      cc.game.emit('stepOnCell-done');
      return;
    } else if (this.kind == 1) {
      //卡牌格
      var cardName = ['炸弹', '精准导弹', '地雷', '庇护', '天使的庇护', '战神的祝福', '虚弱', '团队的力量', '治愈', '圣光普照', '望远镜', '眼睛', '猛男的祝福', '盗取', '束缚', '迷惑', '拯救'];
      var rand_val = Math.random();

      if (rand_val < 0.5) {
        //随机获得1张牌
        var totCardNum = 17;
        var cardID = Math.floor(Math.random() * totCardNum);
        console.log(cardID);
        person_js.cards.push(cardID); //创建用来提示获得卡牌的精灵节点

        var note = new cc.Node();
        note.addComponent(cc.Sprite);
        note.setPosition(0, 0);
        note.parent = this.node.parent.parent;
        var self = note;
        cc.loader.loadRes('卡牌图片/' + cardName[cardID], cc.SpriteFrame, function (err, spriteFrame) {
          self.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        }); //开启note节点的监听，点击后消失

        note.on('mousedown', function (event) {
          cc.game.emit('stepOnCell-done');
          this.destroy();
        }, note);
      } else {
        cc.game.emit('stepOnCell-done');
      }
    } else if (this.kind == 2) {
      //事件格
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
        //to do
        //warning: 下回合记得改变
        //warning: 下回合记得改变
        //warning: 下回合记得改变
      } else if (rand_event == 1) {
        //监狱
        event_name = "监狱"; //下回合不可走

        person_js.goEnabled = 0; //to do
        //warning: 下回合记得改变
        //warning: 下回合记得改变
        //warning: 下回合记得改变
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

      note.on('mousedown', function (event) {
        cc.game.emit('stepOnCell-done');
        this.destroy();
      }, note);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcQ2VsbC5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIm1hcHgiLCJtYXB5Iiwia2luZCIsImluTW9uaXRvciIsInJvdXRlSUQiLCJzZXRDb2xvciIsIm5vZGUiLCJjb2xvciIsIkNvbG9yIiwiUkVEIiwicmVzZXRDb2xvciIsInN0ZXBPbkNlbGwiLCJwZXJzb24iLCJwZXJzb25fanMiLCJnZXRDb21wb25lbnQiLCJnYW1lIiwiZW1pdCIsImNhcmROYW1lIiwicmFuZF92YWwiLCJNYXRoIiwicmFuZG9tIiwidG90Q2FyZE51bSIsImNhcmRJRCIsImZsb29yIiwiY29uc29sZSIsImxvZyIsImNhcmRzIiwicHVzaCIsIm5vdGUiLCJOb2RlIiwiYWRkQ29tcG9uZW50IiwiU3ByaXRlIiwic2V0UG9zaXRpb24iLCJwYXJlbnQiLCJzZWxmIiwibG9hZGVyIiwibG9hZFJlcyIsIlNwcml0ZUZyYW1lIiwiZXJyIiwic3ByaXRlRnJhbWUiLCJvbiIsImV2ZW50IiwiZGVzdHJveSIsInJhbmRfZXZlbnQiLCJldmVudF9uYW1lIiwidXNlQ2FyZEVuYWJsZWQiLCJnb0VuYWJsZWQiLCJibG9vZCIsInR1cm4iLCJvbkxvYWQiLCJzdGFydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ2RDLElBQUFBLElBQUksRUFBRSxDQURRO0FBQ0w7QUFDVEMsSUFBQUEsSUFBSSxFQUFFLENBRlE7QUFFTjtBQUNSQyxJQUFBQSxJQUFJLEVBQUUsSUFIUTtBQUdGO0FBQ1pDLElBQUFBLFNBQVMsRUFBRSxDQUpHO0FBSUE7QUFDZEMsSUFBQUEsT0FBTyxFQUFFLElBTEssQ0FLQztBQUVUO0FBQ0E7QUFDQTtB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LE1BQUgsQ0FBVUMsT0FBVixDQUFrQixNQUFsQixFQUEwQnhDLEVBQUUsQ0FBQ3lDLFdBQTdCLEVBQTBDLFVBQVVDLEdBQVYsRUFBZUMsV0FBZixFQUE0QjtBQUNyRUwsUUFBQUEsSUFBSSxDQUFDNUIsSUFBTCxDQUFVUSxZQUFWLENBQXVCbEIsRUFBRSxDQUFDbUMsTUFBMUIsRUFBa0NRLFdBQWxDLEdBQWdEQSxXQUFoRDtBQUNBLE9BRkQ7QUFHQSxLQUpELE1BS0ssSUFBSSxLQUFLckMsSUFBTCxJQUFhLENBQWpCLEVBQW9CO0FBQUU7QUFDMUJOLE1BQUFBLEVBQUUsQ0FBQ3VDLE1BQUgsQ0FBVUMsT0FBVixDQUFrQixLQUFsQixFQUF5QnhDLEVBQUUsQ0FBQ3lDLFdBQTVCLEVBQXlDLFVBQVVDLEdBQVYsRUFBZUMsV0FBZixFQUE0QjtBQUNwRUwsUUFBQUEsSUFBSSxDQUFDNUIsSUFBTCxDQUFVUSxZQUFWLENBQXVCbEIsRUFBRSxDQUFDbUMsTUFBMUIsRUFBa0NRLFdBQWxDLEdBQWdEQSxXQUFoRDtBQUNBLE9BRkQ7QUFHQSxLQUpJLE1BS0E7QUFBRTtBQUNOM0MsTUFBQUEsRUFBRSxDQUFDdUMsTUFBSCxDQUFVQyxPQUFWLENBQWtCLEtBQWxCLEVBQXlCeEMsRUFBRSxDQUFDeUMsV0FBNUIsRUFBeUMsVUFBVUMsR0FBVixFQUFlQyxXQUFmLEVBQTRCO0FBQ3BFTCxRQUFBQSxJQUFJLENBQUM1QixJQUFMLENBQVVRLFlBQVYsQ0FBdUJsQixFQUFFLENBQUNtQyxNQUExQixFQUFrQ1EsV0FBbEMsR0FBZ0RBLFdBQWhEO0FBQ0EsT0FGRDtBQUdBO0FBQ0UsR0EzSkksQ0E2Skw7O0FBN0pLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG5cdFx0bWFweDogMCwgLy/lnKhtYXBbaV1bal3kuK3nmoTmqKrlnZDmoIdcblx0XHRtYXB5OiAwLC8v5ZyobWFwW2ldW2pd5Lit55qE57q15Z2Q5qCHXG5cdFx0a2luZDogbnVsbCwgLy/moLzlrZDnmoTnsbvlnovvvIwwOuepuueZveagvO+8jDE65Y2h54mM5qC877yMMjrkuovku7bmoLxcblx0XHRpbk1vbml0b3I6IDAsIC8v55So5p2l5Yik5pat5piv5ZCm5aSE5LqO55uR5ZCs5Lit55qE5qCH6K6wXG5cdFx0cm91dGVJRDogbnVsbCwgLy/orrDlvZXov5nkuKpjZWxs5pivbWFw5Lit5ZOq5p2hcm91dGXnmoTnu4jngrnvvIzljbPlnKhyb3V0ZXPkuK3nmoTkuIvmoIdcblx0XHRcbiAgICAgICAgLy8gZm9vOiB7XG4gICAgICAgIC8vICAgICAvLyBBVFRSSUJVVEVTOlxuICAgICAgICAvLyAgICAgZGVmYXVsdDogbnVsbCwgICAgICAgIC8vIFRoZSBkZWZhdWx0IHZhbHVlIHdpbGwgYmUgdXNlZCBvbmx5IHdoZW4gdGhlIGNvbXBvbmVudCBhdHRhY2hpbmdcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0byBhIG5vZGUgZm9yIHRoZSBmaXJzdCB0aW1lXG4gICAgICAgIC8vICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcbiAgICAgICAgLy8gICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIGJhcjoge1xuICAgICAgICAvLyAgICAgZ2V0ICgpIHtcbiAgICAgICAgLy8gICAgICAgICByZXR1cm4gdGhpcy5fYmFyO1xuICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgLy8gICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLl9iYXIgPSB2YWx1ZTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfSxcbiAgICB9LFxuXHRcblx0c2V0Q29sb3I6IGZ1bmN0aW9uKCkge1xuXHRcdC8v6K6+572uY2VsbOeahOminOiJsuS4uue6ouiJsu+8jOihqOekuuWPr+i1sFxuXHRcdHRoaXMubm9kZS5jb2xvciA9IGNjLkNvbG9yLlJFRDtcblx0fSxcblx0XG5cdHJlc2V0Q29sb3I6IGZ1bmN0aW9uKCkge1xuXHRcdC8v6L+Y5Y6fY2VsbOeahOminOiJslxuXHRcdHRoaXMubm9kZS5jb2xvciA9IGNjLmNvbG9yKDI1NSwyNTUsMjU1LDI1NSk7XG5cdH0sXG5cdFxuXHRzdGVwT25DZWxsOiBmdW5jdGlvbihwZXJzb24pIHtcblx0XHRcblx0XHQvL+iOt+WPlnBlcnNvbuiKgueCueeahOe7hOS7tlxuXHRcdHZhciBwZXJzb25fanMgPSBwZXJzb24uZ2V0Q29tcG9uZW50KCdQZXJzb24nKTtcblx0XHRcblx0XHRpZiAodGhpcy5raW5kID09IDApIHsvL+epuueZveagvFxuXHRcdFx0Y2MuZ2FtZS5lbWl0KCdzdGVwT25DZWxsLWRvbmUnKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0ZWxzZSBpZiAodGhpcy5raW5kID09IDEpIHsvL+WNoeeJjOagvFxuXHRcdFx0dmFyIGNhcmROYW1lID0gWyfngrjlvLknLCfnsr7lh4blr7zlvLknLCflnLDpm7cnLCfluofmiqQnLCflpKnkvb/nmoTluofmiqQnLCfmiJjnpZ7nmoTnpZ3npo8nLCfomZrlvLEnLCflm6LpmJ/nmoTlipvph48nLFxuXHRcdFx0XHRcdFx0XHQn5rK75oSIJywn5Zyj5YWJ5pmu54WnJywn5pyb6L+c6ZWcJywn55y8552bJywn54yb55S355qE56Wd56aPJywn55uX5Y+WJywn5p2f57yaJywn6L+35oORJywn5ouv5pWRJ107XG5cdFx0XHR2YXIgcmFuZF92YWwgPSBNYXRoLnJhbmRvbSgpO1xuXHRcdFx0aWYgKHJhbmRfdmFsIDwgMC41KSB7XG5cdFx0XHRcdC8v6ZqP5py66I635b6XMeW8oOeJjFxuXHRcdFx0XHR2YXIgdG90Q2FyZE51bSA9IDE3XG5cdFx0XHRcdHZhciBjYXJkSUQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqdG90Q2FyZE51bSk7XG5cdFx0XHRcdGNvbnNvbGUubG9nKGNhcmRJRCk7XG5cdFx0XHRcdHBlcnNvbl9qcy5jYXJkcy5wdXNoKGNhcmRJRCk7XG5cdFx0XHRcdFxuXHRcdFx0XHQvL+WIm+W7uueUqOadpeaPkOekuuiOt+W+l+WNoeeJjOeahOeyvueBteiKgueCuVxuXHRcdFx0XHR2YXIgbm90ZSA9IG5ldyBjYy5Ob2RlKCk7XG5cdFx0XHRcdG5vdGUuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSk7XG5cdFx0XHRcdG5vdGUuc2V0UG9zaXRpb24oMCwgMCk7XG5cdFx0XHRcdG5vdGUucGFyZW50ID0gdGhpcy5ub2RlLnBhcmVudC5wYXJlbnQ7XG5cdFx0XHRcdHZhciBzZWxmID0gbm90ZTtcblx0XHRcdFx0Y2MubG9hZGVyLmxvYWRSZXMoJ+WNoeeJjOWbvueJhy8nK2NhcmROYW1lW2NhcmRJRF0sIGNjLlNwcml0ZUZyYW1lLCBmdW5jdGlvbiAoZXJyLCBzcHJpdGVGcmFtZSkge1xuXHRcdFx0XHRcdHNlbGYuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBzcHJpdGVGcmFtZTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdC8v5byA5ZCvbm90ZeiKgueCueeahOebkeWQrO+8jOeCueWHu+WQjua2iOWksVxuXHRcdFx0XHRub3RlLm9uKCdtb3VzZWRvd24nLCBmdW5jdGlvbiAoIGV2ZW50ICkge1xuXHRcdFx0XHRcdGNjLmdhbWUuZW1pdCgnc3RlcE9uQ2VsbC1kb25lJyk7XG5cdFx0XHRcdFx0dGhpcy5kZXN0cm95KCk7XG5cdFx0XHRcdH0sIG5vdGUpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZXtcblx0XHRcdFx0Y2MuZ2FtZS5lbWl0KCdzdGVwT25DZWxsLWRvbmUnKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZSBpZiAodGhpcy5raW5kID09IDIpIHsgLy/kuovku7bmoLxcblx0XHRcdFxuXHRcdFx0Ly/pmo/mnLrkuqfnlJ825Liq5LqL5Lu25LmL5LiAXG5cdFx0XHR2YXIgcmFuZF9ldmVudCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSo2KTtcblx0XHRcdC8v5Yib5bu655So5p2l5o+Q56S66I635b6X6Kem5Y+R5LqL5Lu255qE57K+54G16IqC54K5XG5cdFx0XHR2YXIgbm90ZSA9IG5ldyBjYy5Ob2RlKCk7XG4gICAgICAgICAgICBub3RlLmFkZENvbXBvbmVudChjYy5TcHJpdGUpO1xuXHRcdFx0bm90ZS5zZXRQb3NpdGlvbigwLCAwKTtcblx0XHRcdG5vdGUucGFyZW50ID0gdGhpcy5ub2RlLnBhcmVudC5wYXJlbnQ7XG5cdFx0XHR2YXIgc2VsZiA9IG5vdGUsIGV2ZW50X25hbWU7XG5cdFx0XHRpZiAocmFuZF9ldmVudCA9PSAwKSB7IC8v6Zm36ZixXG5cdFx0XHRcdGV2ZW50X25hbWUgPSBcIumZt+mYsVwiO1xuXHRcdFx0XHRwZXJzb25fanMudXNlQ2FyZEVuYWJsZWQgPSAwOyAvL+acrOWbnuWQiOS4jeWPr+S9v+eUqOWNoeeJjCzkuIvlm57lkIjnva4xXG5cdFx0XHRcdC8vdG8gZG9cblx0XHRcdFx0Ly93YXJuaW5nOiDkuIvlm57lkIjorrDlvpfmlLnlj5hcblx0XHRcdFx0Ly93YXJuaW5nOiDkuIvlm57lkIjorrDlvpfmlLnlj5hcblx0XHRcdFx0Ly93YXJuaW5nOiDkuIvlm57lkIjorrDlvpfmlLnlj5hcblx0XHRcdH1cdFxuXHRcdFx0ZWxzZSBpZiAocmFuZF9ldmVudCA9PSAxKSB7IC8v55uR54uxXG5cdFx0XHRcdGV2ZW50X25hbWUgPSBcIuebkeeLsVwiOyAvL+S4i+WbnuWQiOS4jeWPr+i1sFxuXHRcdFx0XHRwZXJzb25fanMuZ29FbmFibGVkID0gMDtcblx0XHRcdFx0Ly90byBkb1xuXHRcdFx0XHQvL3dhcm5pbmc6IOS4i+WbnuWQiOiusOW+l+aUueWPmFxuXHRcdFx0XHQvL3dhcm5pbmc6IOS4i+WbnuWQiOiusOW+l+aUueWPmFxuXHRcdFx0XHQvL3dhcm5pbmc6IOS4i+WbnuWQiOiusOW+l+aUueWPmFxuXHRcdFx0fVx0XG5cdFx0XHRlbHNlIGlmIChyYW5kX2V2ZW50ID09IDIpIHsgLy/mgbbprZRcblx0XHRcdFx0ZXZlbnRfbmFtZSA9IFwi5oG26a2UXCI7ICAvL+aNn+WkseS4gOa7tOihgOmHj1xuXHRcdFx0XHRwZXJzb25fanMuYmxvb2QtLTtcblx0XHRcdH1cdFxuXHRcdFx0ZWxzZSBpZiAocmFuZF9ldmVudCA9PSAzKSB7IC8v5aWl5Yip57uZXG5cdFx0XHRcdGV2ZW50X25hbWUgPSBcIuWlpeWIqee7mVwiO1xuXHRcdFx0XHRwZXJzb25fanMudHVybisrOyAvL+iOt+W+l+WbnuWQiFxuXHRcdFx0fVx0XG5cdFx0XHRlbHNlIGlmIChyYW5kX2V2ZW50ID09IDQpIHsgLy/op4bph45cblx0XHRcdFx0ZXZlbnRfbmFtZSA9IFwi6KeG6YeOXCI7ICAvL3RvIGRvXG5cdFx0XHR9XHRcblx0XHRcdGVsc2UgaWYgKHJhbmRfZXZlbnQgPT0gNSkgeyAvL+WkqeS9v1xuXHRcdFx0XHRldmVudF9uYW1lID0gXCLlpKnkvb9cIjtcblx0XHRcdFx0cGVyc29uX2pzLmJsb29kID0gTWF0aC5mbG9vcihwZXJzb25fanMuYmxvb2QqMS41KTtcblx0XHRcdH1cdFxuXHRcdFx0Y2MubG9hZGVyLmxvYWRSZXMoJ+S6i+S7tuWbvueJhy8nK2V2ZW50X25hbWUsIGNjLlNwcml0ZUZyYW1lLCBmdW5jdGlvbiAoZXJyLCBzcHJpdGVGcmFtZSkge1xuXHRcdFx0XHRzZWxmLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gc3ByaXRlRnJhbWU7XG5cdFx0XHR9KTtcblx0XHRcdC8v5byA5ZCvbm90ZeiKgueCueeahOebkeWQrO+8jOeCueWHu+WQjua2iOWksVxuXHRcdFx0bm90ZS5vbignbW91c2Vkb3duJywgZnVuY3Rpb24gKCBldmVudCApIHtcblx0XHRcdFx0Y2MuZ2FtZS5lbWl0KCdzdGVwT25DZWxsLWRvbmUnKTtcblx0XHRcdFx0dGhpcy5kZXN0cm95KCk7XG5cdFx0XHRcdFxuXHRcdFx0fSwgbm90ZSk7XG5cdFx0XHRcblx0XHR9XG5cdH0sXG5cdFxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuXG4gICAgb25Mb2FkICgpIHtcblx0XHRcblx0fSxcblxuICAgIHN0YXJ0ICgpIHtcblx0XHQvL+iuvue9ruagvOWtkOWbvueJh1xuXHRcdFxuXHRcdHZhciBzZWxmID0gdGhpcztcblx0XHRpZiAodGhpcy5raW5kID09IDApIHsgLy/nqbrnmb3moLxcblx0XHRcdGNjLmxvYWRlci5sb2FkUmVzKFwiY2VsbFwiLCBjYy5TcHJpdGVGcmFtZSwgZnVuY3Rpb24gKGVyciwgc3ByaXRlRnJhbWUpIHtcblx0XHRcdFx0c2VsZi5ub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gc3ByaXRlRnJhbWU7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0ZWxzZSBpZiAodGhpcy5raW5kID09IDEpIHsgLy/ljaHniYzmoLxcblx0XHRcdGNjLmxvYWRlci5sb2FkUmVzKFwi5oq95Y2h5qC8XCIsIGNjLlNwcml0ZUZyYW1lLCBmdW5jdGlvbiAoZXJyLCBzcHJpdGVGcmFtZSkge1xuXHRcdFx0XHRzZWxmLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBzcHJpdGVGcmFtZTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRlbHNlIHsgLy/kuovku7bmoLxcblx0XHRcdGNjLmxvYWRlci5sb2FkUmVzKFwi5LqL5Lu25qC8XCIsIGNjLlNwcml0ZUZyYW1lLCBmdW5jdGlvbiAoZXJyLCBzcHJpdGVGcmFtZSkge1xuXHRcdFx0XHRzZWxmLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBzcHJpdGVGcmFtZTtcblx0XHRcdH0pO1xuXHRcdH1cbiAgICB9LFxuXG4gICAgLy8gdXBkYXRlIChkdCkge30sXG59KTtcblxuXG5cblxuXG5cblxuXG5cblxuXG5cbiJdfQ==