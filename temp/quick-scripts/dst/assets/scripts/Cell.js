
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
      node.on('mousedown', function (event) {
        var person_js = cc.find('Canvas').getComponent('globalGame').nowPlayer.getComponent('Person');
        console.log('得到卡牌:' + this.cardID);
        person_js.cards.push(this.cardID);
        cc.game.emit('stepOnCell-done');

        for (var j = 0; j < 3; j++) {
          cc.find('Canvas/chooseFromThree' + j).destroy();
        }
      }, node);
      node.parent = this.node.parent.parent;
    }
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
      var totCardNum = 17;
      var rand_val = Math.random();
      console.log('rand_val' + rand_val);

      if (rand_val < 0.5) {
        //随机获得1张牌
        var cardID = Math.floor(Math.random() * totCardNum);
        person_js.cards.push(cardID); //创建用来提示获得卡牌的精灵节点

        var node = cc.instantiate(window.global.cardnode[cardID]);
        node.setPosition(0, 0); //开启note节点的监听，点击后消失

        node.on('mousedown', function (event) {
          cc.game.emit('stepOnCell-done');
          this.destroy();
        }, node);
        node.parent = this.node.parent.parent;
      } else {
        //三张中抽一张
        this.chooseFromThree(cardName, totCardNum);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcQ2VsbC5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIm1hcHgiLCJtYXB5Iiwia2luZCIsImluTW9uaXRvciIsInJvdXRlSUQiLCJzZXRDb2xvciIsIm5vZGUiLCJjb2xvciIsInJlc2V0Q29sb3IiLCJjaG9vc2VGcm9tVGhyZWUiLCJjYXJkTmFtZSIsInRvdENhcmROdW0iLCJjZCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImNvbnNvbGUiLCJsb2ciLCJpIiwiaW5zdGFudGlhdGUiLCJ3aW5kb3ciLCJnbG9iYWwiLCJjYXJkbm9kZSIsIm5hbWUiLCJzZXRQb3NpdGlvbiIsImNhcmRJRCIsIm9uIiwiZXZlbnQiLCJwZXJzb25fanMiLCJmaW5kIiwiZ2V0Q29tcG9uZW50Iiwibm93UGxheWVyIiwiY2FyZHMiLCJwdXNoIiwiZ2FtZSIsImVtaXQiLCJqIiwiZGVzdHJveSIsInBhcmVudCIsInN0ZXBPbkNlbGwiLCJwZXJzb24iLCJyYW5kX3ZhbCIsInJhbmRfZXZlbnQiLCJub3RlIiwiTm9kZSIsImFkZENvbXBvbmVudCIsIlNwcml0ZSIsInNlbGYiLCJldmVudF9uYW1lIiwidXNlQ2FyZEVuYWJsZWQiLCJnb0VuYWJsZWQiLCJibG9vZCIsInR1cm4iLCJsb2FkZXIiLCJsb2FkUmVzIiwiU3ByaXRlRnJhbWUiLCJlcnIiLCJzcHJpdGVGcmFtZSIsIm9uTG9hZCIsInN0YXJ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDZEMsSUFBQUEsSUFBSSxFQUFFLENBRFE7QUFDTDtBQUNUQyxJQUFBQSxJQUFJLEVBQUUsQ0FGUTtBQUVOO0FBQ1JDLElBQUFBLElBQUksRUFBRSxJQUhR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NUIsRUFBeUMsVUFBVUMsR0FBVixFQUFlQyxXQUFmLEVBQTRCO0FBQ3BFVixRQUFBQSxJQUFJLENBQUN6QyxJQUFMLENBQVV3QixZQUFWLENBQXVCbEMsRUFBRSxDQUFDa0QsTUFBMUIsRUFBa0NXLFdBQWxDLEdBQWdEQSxXQUFoRDtBQUNBLE9BRkQ7QUFHQTtBQUNFLEdBbExJLENBb0xMOztBQXBMSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBjYy5DbGFzczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuXHRcdG1hcHg6IDAsIC8v5ZyobWFwW2ldW2pd5Lit55qE5qiq5Z2Q5qCHXG5cdFx0bWFweTogMCwvL+WcqG1hcFtpXVtqXeS4reeahOe6teWdkOagh1xuXHRcdGtpbmQ6IG51bGwsIC8v5qC85a2Q55qE57G75Z6L77yMMDrnqbrnmb3moLzvvIwxOuWNoeeJjOagvO+8jDI65LqL5Lu25qC8XG5cdFx0aW5Nb25pdG9yOiAwLCAvL+eUqOadpeWIpOaWreaYr+WQpuWkhOS6juebkeWQrOS4reeahOagh+iusFxuXHRcdHJvdXRlSUQ6IG51bGwsIC8v6K6w5b2V6L+Z5LiqY2VsbOaYr21hcOS4reWTquadoXJvdXRl55qE57uI54K577yM5Y2z5Zyocm91dGVz5Lit55qE5LiL5qCHXG5cdFx0XG4gICAgICAgIC8vIGZvbzoge1xuICAgICAgICAvLyAgICAgLy8gQVRUUklCVVRFUzpcbiAgICAgICAgLy8gICAgIGRlZmF1bHQ6IG51bGwsICAgICAgICAvLyBUaGUgZGVmYXVsdCB2YWx1ZSB3aWxsIGJlIHVzZWQgb25seSB3aGVuIHRoZSBjb21wb25lbnQgYXR0YWNoaW5nXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdG8gYSBub2RlIGZvciB0aGUgZmlyc3QgdGltZVxuICAgICAgICAvLyAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XG4gICAgICAgIC8vICAgICBzZXJpYWxpemFibGU6IHRydWUsICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyB9LFxuICAgICAgICAvLyBiYXI6IHtcbiAgICAgICAgLy8gICAgIGdldCAoKSB7XG4gICAgICAgIC8vICAgICAgICAgcmV0dXJuIHRoaXMuX2JhcjtcbiAgICAgICAgLy8gICAgIH0sXG4gICAgICAgIC8vICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5fYmFyID0gdmFsdWU7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH0sXG4gICAgfSxcblx0XG5cdHNldENvbG9yOiBmdW5jdGlvbigpIHtcblx0XHQvL+iuvue9rmNlbGznmoTpopzoibLkuLrnuqLoibLvvIzooajnpLrlj6/otbBcblx0XHR0aGlzLm5vZGUuY29sb3IgPSBjYy5jb2xvcigxMDIsMjU1LDEwMiwyNTUpO1xuXHR9LFxuXHRcblx0cmVzZXRDb2xvcjogZnVuY3Rpb24oKSB7XG5cdFx0Ly/ov5jljp9jZWxs55qE6aKc6ImyXG5cdFx0dGhpcy5ub2RlLmNvbG9yID0gY2MuY29sb3IoMjU1LDI1NSwyNTUsMjU1KTtcblx0fSxcblx0XG5cdGNob29zZUZyb21UaHJlZTogZnVuY3Rpb24oY2FyZE5hbWUsIHRvdENhcmROdW0pIHtcblx0XHR2YXIgY2QgPSBbXTtcblx0XHRjZFswXSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSp0b3RDYXJkTnVtKTtcblx0XHRjZFsxXSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSp0b3RDYXJkTnVtKTtcblx0XHRjZFsyXSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSp0b3RDYXJkTnVtKTtcblx0XHRcblx0XHRjb25zb2xlLmxvZyhjZCk7XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IDM7IGkrKykge1xuXHRcdFx0dmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh3aW5kb3cuZ2xvYmFsLmNhcmRub2RlW2NkW2ldXSk7XG5cdFx0XHRub2RlLm5hbWUgPSAnY2hvb3NlRnJvbVRocmVlJytpO1xuXHRcdFx0bm9kZS5zZXRQb3NpdGlvbigtNTAwKzUwMCppLCAwKTtcblx0XHRcdG5vZGUuY2FyZElEID0gY2RbaV07XG5cdFx0XHRub2RlLm9uKCdtb3VzZWRvd24nLCBmdW5jdGlvbihldmVudCkge1xuXHRcdFx0XHR2YXIgcGVyc29uX2pzID0gY2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdnbG9iYWxHYW1lJykubm93UGxheWVyLmdldENvbXBvbmVudCgnUGVyc29uJyk7XG5cdFx0XHRcdGNvbnNvbGUubG9nKCflvpfliLDljaHniYw6Jyt0aGlzLmNhcmRJRCk7XG5cdFx0XHRcdHBlcnNvbl9qcy5jYXJkcy5wdXNoKHRoaXMuY2FyZElEKTtcblx0XHRcdFx0Y2MuZ2FtZS5lbWl0KCdzdGVwT25DZWxsLWRvbmUnKTtcblx0XHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCAzOyBqKyspIHtcblx0XHRcdFx0XHRjYy5maW5kKCdDYW52YXMvY2hvb3NlRnJvbVRocmVlJytqKS5kZXN0cm95KCk7XG5cdFx0XHRcdH1cblx0XHRcdH0sIG5vZGUpXG5cdFx0XHRub2RlLnBhcmVudCA9IHRoaXMubm9kZS5wYXJlbnQucGFyZW50O1xuXHRcdH1cblx0XHRcblx0fSxcblx0XG5cdHN0ZXBPbkNlbGw6IGZ1bmN0aW9uKHBlcnNvbikge1xuXHRcdFxuXHRcdC8v6I635Y+WcGVyc29u6IqC54K555qE57uE5Lu2XG5cdFx0dmFyIHBlcnNvbl9qcyA9IHBlcnNvbi5nZXRDb21wb25lbnQoJ1BlcnNvbicpO1xuXHRcdFxuXHRcdGlmICh0aGlzLmtpbmQgPT0gMCkgey8v56m655m95qC8XG5cdFx0XHRjYy5nYW1lLmVtaXQoJ3N0ZXBPbkNlbGwtZG9uZScpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRlbHNlIGlmICh0aGlzLmtpbmQgPT0gMSkgey8v5Y2h54mM5qC8XG5cdFx0XHR2YXIgY2FyZE5hbWUgPSBbJ+eCuOW8uScsJ+eyvuWHhuWvvOW8uScsJ+WcsOmbtycsJ+W6h+aKpCcsJ+WkqeS9v+eahOW6h+aKpCcsJ+aImOelnueahOelneemjycsJ+iZmuW8sScsJ+WboumYn+eahOWKm+mHjycsXG5cdFx0XHRcdFx0XHRcdCfmsrvmhIgnLCflnKPlhYnmma7nhacnLCfmnJvov5zplZwnLCfnnLznnZsnLCfnjJvnlLfnmoTnpZ3npo8nLCfnm5flj5YnLCfmnZ/nvJonLCfov7fmg5EnLCfmi6/mlZEnXTtcblx0XHRcdHZhciB0b3RDYXJkTnVtID0gMTdcblx0XHRcdHZhciByYW5kX3ZhbCA9IE1hdGgucmFuZG9tKCk7XG5cdFx0XHRjb25zb2xlLmxvZygncmFuZF92YWwnK3JhbmRfdmFsKTtcblx0XHRcdGlmIChyYW5kX3ZhbCA8IDAuNSkge1xuXHRcdFx0XHQvL+maj+acuuiOt+W+lzHlvKDniYxcblx0XHRcdFx0dmFyIGNhcmRJRCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSp0b3RDYXJkTnVtKTtcblx0XHRcdFx0cGVyc29uX2pzLmNhcmRzLnB1c2goY2FyZElEKTtcblx0XHRcdFx0XG5cdFx0XHRcdC8v5Yib5bu655So5p2l5o+Q56S66I635b6X5Y2h54mM55qE57K+54G16IqC54K5XG5cdFx0XHRcdHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUod2luZG93Lmdsb2JhbC5jYXJkbm9kZVtjYXJkSURdKTtcblx0XHRcdFx0bm9kZS5zZXRQb3NpdGlvbigwLCAwKTtcblx0XHRcdFx0Ly/lvIDlkK9ub3Rl6IqC54K555qE55uR5ZCs77yM54K55Ye75ZCO5raI5aSxXG5cdFx0XHRcdG5vZGUub24oJ21vdXNlZG93bicsIGZ1bmN0aW9uICggZXZlbnQgKSB7XG5cdFx0XHRcdFx0Y2MuZ2FtZS5lbWl0KCdzdGVwT25DZWxsLWRvbmUnKTtcblx0XHRcdFx0XHR0aGlzLmRlc3Ryb3koKTtcblx0XHRcdFx0fSwgbm9kZSk7XG5cdFx0XHRcdG5vZGUucGFyZW50ID0gdGhpcy5ub2RlLnBhcmVudC5wYXJlbnQ7XG5cdFx0XHR9XG5cdFx0XHRlbHNle1xuXHRcdFx0XHQvL+S4ieW8oOS4reaKveS4gOW8oFxuXHRcdFx0XHR0aGlzLmNob29zZUZyb21UaHJlZShjYXJkTmFtZSwgdG90Q2FyZE51bSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2UgaWYgKHRoaXMua2luZCA9PSAyKSB7IC8v5LqL5Lu25qC8XG5cdFx0XHRcblx0XHRcdC8v6ZqP5py65Lqn55SfNuS4quS6i+S7tuS5i+S4gFxuXHRcdFx0dmFyIHJhbmRfZXZlbnQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqNik7XG5cdFx0XHQvL+WIm+W7uueUqOadpeaPkOekuuiOt+W+l+inpuWPkeS6i+S7tueahOeyvueBteiKgueCuVxuXHRcdFx0dmFyIG5vdGUgPSBuZXcgY2MuTm9kZSgpO1xuICAgICAgICAgICAgbm90ZS5hZGRDb21wb25lbnQoY2MuU3ByaXRlKTtcblx0XHRcdG5vdGUuc2V0UG9zaXRpb24oMCwgMCk7XG5cdFx0XHRub3RlLnBhcmVudCA9IHRoaXMubm9kZS5wYXJlbnQucGFyZW50O1xuXHRcdFx0dmFyIHNlbGYgPSBub3RlLCBldmVudF9uYW1lO1xuXHRcdFx0aWYgKHJhbmRfZXZlbnQgPT0gMCkgeyAvL+mZt+mYsVxuXHRcdFx0XHRldmVudF9uYW1lID0gXCLpmbfpmLFcIjtcblx0XHRcdFx0cGVyc29uX2pzLnVzZUNhcmRFbmFibGVkID0gMDsgLy/mnKzlm57lkIjkuI3lj6/kvb/nlKjljaHniYws5LiL5Zue5ZCI572uMVxuXHRcdFx0XHQvL3RvIGRvXG5cdFx0XHRcdC8vd2FybmluZzog5LiL5Zue5ZCI6K6w5b6X5pS55Y+YXG5cdFx0XHRcdC8vd2FybmluZzog5LiL5Zue5ZCI6K6w5b6X5pS55Y+YXG5cdFx0XHRcdC8vd2FybmluZzog5LiL5Zue5ZCI6K6w5b6X5pS55Y+YXG5cdFx0XHR9XHRcblx0XHRcdGVsc2UgaWYgKHJhbmRfZXZlbnQgPT0gMSkgeyAvL+ebkeeLsVxuXHRcdFx0XHRldmVudF9uYW1lID0gXCLnm5Hni7FcIjsgLy/kuIvlm57lkIjkuI3lj6/otbBcblx0XHRcdFx0cGVyc29uX2pzLmdvRW5hYmxlZCA9IDA7XG5cdFx0XHRcdC8vdG8gZG9cblx0XHRcdFx0Ly93YXJuaW5nOiDkuIvlm57lkIjorrDlvpfmlLnlj5hcblx0XHRcdFx0Ly93YXJuaW5nOiDkuIvlm57lkIjorrDlvpfmlLnlj5hcblx0XHRcdFx0Ly93YXJuaW5nOiDkuIvlm57lkIjorrDlvpfmlLnlj5hcblx0XHRcdH1cdFxuXHRcdFx0ZWxzZSBpZiAocmFuZF9ldmVudCA9PSAyKSB7IC8v5oG26a2UXG5cdFx0XHRcdGV2ZW50X25hbWUgPSBcIuaBtumtlFwiOyAgLy/mjZ/lpLHkuIDmu7TooYDph49cblx0XHRcdFx0cGVyc29uX2pzLmJsb29kLS07XG5cdFx0XHR9XHRcblx0XHRcdGVsc2UgaWYgKHJhbmRfZXZlbnQgPT0gMykgeyAvL+WlpeWIqee7mVxuXHRcdFx0XHRldmVudF9uYW1lID0gXCLlpaXliKnnu5lcIjtcblx0XHRcdFx0cGVyc29uX2pzLnR1cm4rKzsgLy/ojrflvpflm57lkIhcblx0XHRcdH1cdFxuXHRcdFx0ZWxzZSBpZiAocmFuZF9ldmVudCA9PSA0KSB7IC8v6KeG6YeOXG5cdFx0XHRcdGV2ZW50X25hbWUgPSBcIuinhumHjlwiOyAgLy90byBkb1xuXHRcdFx0fVx0XG5cdFx0XHRlbHNlIGlmIChyYW5kX2V2ZW50ID09IDUpIHsgLy/lpKnkvb9cblx0XHRcdFx0ZXZlbnRfbmFtZSA9IFwi5aSp5L2/XCI7XG5cdFx0XHRcdHBlcnNvbl9qcy5ibG9vZCA9IE1hdGguZmxvb3IocGVyc29uX2pzLmJsb29kKjEuNSk7XG5cdFx0XHR9XHRcblx0XHRcdGNjLmxvYWRlci5sb2FkUmVzKCfkuovku7blm77niYcvJytldmVudF9uYW1lLCBjYy5TcHJpdGVGcmFtZSwgZnVuY3Rpb24gKGVyciwgc3ByaXRlRnJhbWUpIHtcblx0XHRcdFx0c2VsZi5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHNwcml0ZUZyYW1lO1xuXHRcdFx0fSk7XG5cdFx0XHQvL+W8gOWQr25vdGXoioLngrnnmoTnm5HlkKzvvIzngrnlh7vlkI7mtojlpLFcblx0XHRcdG5vdGUub24oJ21vdXNlZG93bicsIGZ1bmN0aW9uICggZXZlbnQgKSB7XG5cdFx0XHRcdGNjLmdhbWUuZW1pdCgnc3RlcE9uQ2VsbC1kb25lJyk7XG5cdFx0XHRcdHRoaXMuZGVzdHJveSgpO1xuXHRcdFx0XHRcblx0XHRcdH0sIG5vdGUpO1xuXHRcdFx0XG5cdFx0fVxuXHR9LFxuXHRcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcblxuICAgIG9uTG9hZCAoKSB7XG5cdFx0XG5cdH0sXG5cbiAgICBzdGFydCAoKSB7XG5cdFx0Ly/orr7nva7moLzlrZDlm77niYdcblx0XHRcblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cdFx0aWYgKHRoaXMua2luZCA9PSAwKSB7IC8v56m655m95qC8XG5cdFx0XHRjYy5sb2FkZXIubG9hZFJlcyhcImNlbGxcIiwgY2MuU3ByaXRlRnJhbWUsIGZ1bmN0aW9uIChlcnIsIHNwcml0ZUZyYW1lKSB7XG5cdFx0XHRcdHNlbGYubm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHNwcml0ZUZyYW1lO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGVsc2UgaWYgKHRoaXMua2luZCA9PSAxKSB7IC8v5Y2h54mM5qC8XG5cdFx0XHRjYy5sb2FkZXIubG9hZFJlcyhcIuaKveWNoeagvFwiLCBjYy5TcHJpdGVGcmFtZSwgZnVuY3Rpb24gKGVyciwgc3ByaXRlRnJhbWUpIHtcblx0XHRcdFx0c2VsZi5ub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gc3ByaXRlRnJhbWU7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0ZWxzZSB7IC8v5LqL5Lu25qC8XG5cdFx0XHRjYy5sb2FkZXIubG9hZFJlcyhcIuS6i+S7tuagvFwiLCBjYy5TcHJpdGVGcmFtZSwgZnVuY3Rpb24gKGVyciwgc3ByaXRlRnJhbWUpIHtcblx0XHRcdFx0c2VsZi5ub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gc3ByaXRlRnJhbWU7XG5cdFx0XHR9KTtcblx0XHR9XG4gICAgfSxcblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxufSk7XG5cblxuXG5cblxuXG5cblxuXG5cblxuXG4iXX0=