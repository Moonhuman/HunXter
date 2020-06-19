
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__qc_index__.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}
require('./assets/scripts/Cell');
require('./assets/scripts/GetMap');
require('./assets/scripts/Person');
require('./assets/scripts/globalGame');
require('./assets/scripts/startUI');
require('./assets/scripts/tipWindow');

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
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Person.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c0d9cFPtlNM8a1IZvSmjEWq', 'Person');
// scripts/Person.js

"use strict";

// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var global = require('globalGame');

var person = cc.Class({
  "extends": cc.Component,
  properties: {
    nickname: {
      "default": null,
      get: function get() {
        return this.nickname;
      }
    },
    ID: null,
    position: null,
    attack: 1,
    blood: 10,
    //玩家血量,初始为2点，每回合恢复2点
    mobility: 2,
    //玩家行动值
    cards: null,
    myStatus: 1,
    //0为死亡，1为正常
    turn: 1,
    //玩家回合数
    useCardEnabled: 1,
    //是否使用卡牌，1为可使用卡牌
    goEnabled: {
      "default": 1,
      get: function get() {
        return this._goEnabled;
      }
    },
    //是否可以行走,1为可以行走
    parter: null,
    avatar: null,
    posX: null,
    posY: null
  },
  moveByRoute: function moveByRoute(route) {
    //声明一个动作序列
    //var r=[cc.v2(100,100),cc.v2(100,100),cc.v2(100,100),cc.v2(100,100)];
    //var actArr=new Array();
    //console.log(route);
    var p = cc.tween(this.avatar);

    for (var i = 0; i < route.length; i++) {
      p.to(0.1, {
        position: cc.v2(route[i].x, route[i].y)
      }); //console.log(route[i].getComponent('Cell').mapx+','+route[i].getComponent('Cell').mapy);
    }

    p.start(); //this.avatar.setPosition(route[route.length-1].getPosition());

    this.posX = route[route.length - 1].getComponent('Cell').mapx;
    this.posY = route[route.length - 1].getComponent('Cell').mapy;
    route[route.length - 1].getComponent('Cell').stepOnCell(this.node);
  },
  move2Pos: function move2Pos(x, y) {
    this.posX = x;
    this.posY = y; //this.nowPos.y=y;

    var mapObj = cc.find('Canvas/map').getComponent('GetMap');
    var pos = mapObj.map[x][y].getPosition();
    this.avatar.setPosition(pos); //console.log(pos);
    //console.log(this.nowPos);
  },
  bindAvatar: function bindAvatar(node) {
    //console.log(node);
    this.avatar = node;
  },
  onLoad: function onLoad() {
    this.cards = new Array();
    window.global.persons.push(this.node);
    console.log(this.name + "onLoad");
  },
  start: function start() {//初始化任务
  },
  update: function update(dt) {}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcUGVyc29uLmpzIl0sIm5hbWVzIjpbImdsb2JhbCIsInJlcXVpcmUiLCJwZXJzb24iLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIm5pY2tuYW1lIiwiZ2V0IiwiSUQiLCJwb3NpdGlvbiIsImF0dGFjayIsImJsb29kIiwibW9iaWxpdHkiLCJjYXJkcyIsIm15U3RhdHVzIiwidHVybiIsInVzZUNhcmRFbmFibGVkIiwiZ29FbmFibGVkIiwiX2dvRW5hYmxlZCIsInBhcnRlciIsImF2YXRhciIsInBvc1giLCJwb3NZIiwibW92ZUJ5Um91dGUiLCJyb3V0ZSIsInAiLCJ0d2VlbiIsImkiLCJsZW5ndGgiLCJ0byIsInYyIiwieCIsInkiLCJzdGFydCIsImdldENvbXBvbmVudCIsIm1hcHgiLCJtYXB5Iiwic3RlcE9uQ2VsbCIsIm5vZGUiLCJtb3ZlMlBvcyIsIm1hcE9iaiIsImZpbmQiLCJwb3MiLCJtYXAiLCJnZXRQb3NpdGlvbiIsInNldFBvc2l0aW9uIiwiYmluZEF2YXRhciIsIm9uTG9hZCIsIkFycmF5Iiwid2luZG93IiwicGVyc29ucyIsInB1c2giLCJjb25zb2xlIiwibG9nIiwibmFtZSIsInVwZGF0ZSIsImR0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUlBLE1BQU0sR0FBQ0MsT0FBTyxDQUFDLFlBQUQsQ0FBbEI7O0FBQ0EsSUFBSUMsTUFBTSxHQUFDQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNoQixhQUFTRCxFQUFFLENBQUNFLFNBREk7QUFHaEJDLEVBQUFBLFVBQVUsRUFBRTtBQUNkQyxJQUFBQSxRQUFRLEVBQUU7QUFDVCxpQkFBUSxJQURDO0FBRVRDLE1BQUFBLEdBQUcsRUFBRSxlQUFZO0FBQ2hCLGVBQU8sS0FBS0QsUUFBWjtBQUNBO0FBSlEsS0FESTtBQU9kRSxJQUFBQSxFQUFFLEVBQUMsSUFQVztB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QUEyQixLQUFLYixJQUFoQztBQUNBYyxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLQyxJQUFMLEdBQVUsUUFBdEI7QUFDQSxHQWxFa0I7QUFtRWhCckIsRUFBQUEsS0FuRWdCLG1CQW1FUCxDQUNYO0FBRUcsR0F0RWU7QUF1RWhCc0IsRUFBQUEsTUF2RWdCLGtCQXVFUkMsRUF2RVEsRUF1RUosQ0FHZDtBQTFFa0IsQ0FBVCxDQUFYIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBjYy5DbGFzczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxudmFyIGdsb2JhbD1yZXF1aXJlKCdnbG9iYWxHYW1lJyk7XHJcbnZhciBwZXJzb249Y2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuXHRcdG5pY2tuYW1lOiB7XHJcblx0XHRcdGRlZmF1bHQ6bnVsbCxcclxuXHRcdFx0Z2V0OiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMubmlja25hbWU7XHJcblx0XHRcdH0sXHJcblx0XHR9XHQsXHJcblx0XHRJRDpudWxsLFxyXG5cdFx0cG9zaXRpb246bnVsbCxcclxuXHRcdGF0dGFjazoxLFxyXG5cdFx0Ymxvb2Q6MTAsLy/njqnlrrbooYDph48s5Yid5aeL5Li6MueCue+8jOavj+WbnuWQiOaBouWkjTLngrlcclxuXHRcdG1vYmlsaXR5OjIsLy/njqnlrrbooYzliqjlgLxcclxuXHRcdGNhcmRzOm51bGwsXHJcblx0XHRteVN0YXR1czoxLC8vMOS4uuatu+S6oe+8jDHkuLrmraPluLhcclxuXHRcdHR1cm46MSwvL+eOqeWutuWbnuWQiOaVsFxyXG5cdFx0dXNlQ2FyZEVuYWJsZWQ6MSwvL+aYr+WQpuS9v+eUqOWNoeeJjO+8jDHkuLrlj6/kvb/nlKjljaHniYxcclxuXHRcdGdvRW5hYmxlZDp7XHJcblx0XHRcdGRlZmF1bHQ6MSxcclxuXHRcdFx0Z2V0OiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuX2dvRW5hYmxlZDtcclxuXHRcdFx0fSxcclxuXHRcdH0sLy/mmK/lkKblj6/ku6XooYzotbAsMeS4uuWPr+S7peihjOi1sFxyXG5cdFx0cGFydGVyOm51bGwsXHJcblx0XHRhdmF0YXI6bnVsbCxcclxuXHRcdHBvc1g6bnVsbCxcclxuXHRcdHBvc1k6bnVsbCxcclxuICAgIH0sXHJcblx0bW92ZUJ5Um91dGU6ZnVuY3Rpb24ocm91dGUpe1xyXG5cdFx0Ly/lo7DmmI7kuIDkuKrliqjkvZzluo/liJdcclxuXHRcdC8vdmFyIHI9W2NjLnYyKDEwMCwxMDApLGNjLnYyKDEwMCwxMDApLGNjLnYyKDEwMCwxMDApLGNjLnYyKDEwMCwxMDApXTtcclxuXHRcdC8vdmFyIGFjdEFycj1uZXcgQXJyYXkoKTtcclxuXHRcdC8vY29uc29sZS5sb2cocm91dGUpO1xyXG5cdFx0dmFyIHA9Y2MudHdlZW4odGhpcy5hdmF0YXIpO1xyXG5cdFx0Zm9yICh2YXIgaT0wO2k8cm91dGUubGVuZ3RoO2krKyl7XHJcblx0XHRcdHAudG8oMC4xLHtwb3NpdGlvbjpjYy52Mihyb3V0ZVtpXS54LHJvdXRlW2ldLnkpfSk7XHJcblx0XHRcdC8vY29uc29sZS5sb2cocm91dGVbaV0uZ2V0Q29tcG9uZW50KCdDZWxsJykubWFweCsnLCcrcm91dGVbaV0uZ2V0Q29tcG9uZW50KCdDZWxsJykubWFweSk7XHJcblx0XHR9XHJcblx0XHRwLnN0YXJ0KCk7XHJcblx0XHQvL3RoaXMuYXZhdGFyLnNldFBvc2l0aW9uKHJvdXRlW3JvdXRlLmxlbmd0aC0xXS5nZXRQb3NpdGlvbigpKTtcclxuXHRcdHRoaXMucG9zWD1yb3V0ZVtyb3V0ZS5sZW5ndGgtMV0uZ2V0Q29tcG9uZW50KCdDZWxsJykubWFweDtcclxuXHRcdHRoaXMucG9zWT1yb3V0ZVtyb3V0ZS5sZW5ndGgtMV0uZ2V0Q29tcG9uZW50KCdDZWxsJykubWFweTtcclxuXHRcdFxyXG5cdFx0cm91dGVbcm91dGUubGVuZ3RoLTFdLmdldENvbXBvbmVudCgnQ2VsbCcpLnN0ZXBPbkNlbGwodGhpcy5ub2RlKTtcclxuXHRcclxuXHR9LFxyXG5cdG1vdmUyUG9zOmZ1bmN0aW9uKHgseSl7XHJcblx0XHR0aGlzLnBvc1g9eDtcclxuXHRcdHRoaXMucG9zWT15O1xyXG5cdFx0Ly90aGlzLm5vd1Bvcy55PXk7XHJcblx0XHR2YXIgbWFwT2JqPWNjLmZpbmQoJ0NhbnZhcy9tYXAnKS5nZXRDb21wb25lbnQoJ0dldE1hcCcpO1xyXG5cdFx0dmFyIHBvcz1tYXBPYmoubWFwW3hdW3ldLmdldFBvc2l0aW9uKCk7XHJcblx0XHR0aGlzLmF2YXRhci5zZXRQb3NpdGlvbihwb3MpO1xyXG5cdFx0Ly9jb25zb2xlLmxvZyhwb3MpO1xyXG5cdFx0Ly9jb25zb2xlLmxvZyh0aGlzLm5vd1Bvcyk7XHJcblx0fSxcclxuXHRiaW5kQXZhdGFyOmZ1bmN0aW9uKG5vZGUpe1xyXG5cdFx0Ly9jb25zb2xlLmxvZyhub2RlKTtcclxuXHRcdHRoaXMuYXZhdGFyPW5vZGU7XHJcblx0fSxcclxuXHRvbkxvYWQoKXtcdFxyXG5cdFx0dGhpcy5jYXJkcz1uZXcgQXJyYXkoKTtcclxuXHRcdHdpbmRvdy5nbG9iYWwucGVyc29ucy5wdXNoKHRoaXMubm9kZSk7XHJcblx0XHRjb25zb2xlLmxvZyh0aGlzLm5hbWUrXCJvbkxvYWRcIik7XHJcblx0fSxcclxuICAgIHN0YXJ0ICgpIHtcclxuXHRcdC8v5Yid5aeL5YyW5Lu75YqhXHJcblx0XHRcclxuICAgIH0sXHJcbiAgICB1cGRhdGUgKGR0KSB7XHJcblx0XHRcclxuXHRcdFxyXG5cdH0sXHJcbn0pOyJdfQ==
//------QC-SOURCE-SPLIT------

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
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/globalGame.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1c04cewIodMKZmQhbD7lezO', 'globalGame');
// scripts/globalGame.js

"use strict";

window.global = {
  persons: [],
  nowTurn: 0,
  //当前回合数
  isOver: false,
  cardnode: null,
  bgm: {
    audio: null,
    loop: null,
    volume: null
  }
};
cc.Class({
  "extends": cc.Component,
  properties: {
    mapObj: null,
    //地图对象
    persons: null,
    //玩家们
    index: 0,
    nowStep: 0,
    nowPlayer: null,
    nowProperty: null,
    isWait: false,
    msgBoxConent: null,
    time: 0
  },
  updateUI: function updateUI() {//更新人物血量
  },
  onLoad: function onLoad() {
    //加载地图
    this.nowStep = 0;
    this.msgContent = cc.find('Canvas/msgBox/view/content/item'); //console.log(msgContent.getComponent(cc.Label));

    this.node.on('send-Msg', function (event, poster) {
      var timeStr = '';
      if (parseInt(this.time / 60) < 10) timeStr += "0";
      timeStr += parseInt(this.time / 60) + ":";
      if (this.time - parseInt(this.time / 60) * 60 < 10) timeStr += "0";
      timeStr += this.time - parseInt(this.time / 60) * 60;
      var name = '<color=#43CD80>(' + timeStr + ')' + poster + '</color>';

      if (poster == '系统') {
        name = '<color=#ff0000>(' + timeStr + ')' + poster + '</color>';
      }

      this.msgContent.getComponent(cc.RichText).string += name + ": " + event + '<br/>'; //可能需要动态改变content大小

      cc.find('Canvas/msgBox/view/content').height = this.msgContent.height + 10;
      cc.find('Canvas/msgBox').getComponent(cc.ScrollView).scrollToBottom(0.1); //console.log('Label',this.msgContent.height);
    }, this);
    this.node.on('update-state', function (msg) {
      this.nowStep = (this.nowStep + 1) % 4;
      this.isWait = false;
    }, this);
    cc.game.on('stepOnCell-done', function (event) {
      //触发结束
      this.node.emit('update-state', '1'); //更新状态
      //console.log("触发了特殊格子！");
    }, this);
    cc.game.on('route-chosen', function (route) {
      //监听玩家选择了哪条路径
      //console.log('点击了',route);
      this.nowProperty.moveByRoute(route); //this.node.emit('update-state', '1');//玩家移动完成，进入下一步操作
      //玩家头像按照路径移动
    }, this);
    cc.game.on('roll-dice-done', function (event) {
      console.log('yyy');
      var step = randomNum(1, 6); //掷骰子，玩家步数

      this.node.emit('send-Msg', "获得骰子点数" + step, this.nowProperty.nickname);
      console.log(this.mapObj.posEnable(this.mapObj.map[this.nowProperty.posX][this.nowProperty.posY], step));
    }, this);
    this.InitialCard();
    this.initBgm();
    cc.find('Canvas/time').getComponent(cc.Label).schedule(function () {
      cc.find('Canvas').getComponent('globalGame').time += 1;
      var time = cc.find('Canvas').getComponent('globalGame').time; //console.log(time);

      this.string = "Time: ";
      if (parseInt(time / 60) < 10) this.string += "0";
      this.string += parseInt(time / 60) + ":";
      if (time - parseInt(time / 60) * 60 < 10) this.string += "0";
      this.string += time - parseInt(time / 60) * 60; //cc.find('Canvas').getComponent('globalGame').timeStr=this.string;
    }, 1);
    this.node.emit('send-Msg', '好戏开场了!', '系统');
  },
  start: function start() {
    //初始化人物
    this.initPersons(); //获得地图对象

    this.mapObj = cc.find('Canvas/map').getComponent('GetMap');
    this.nowPlayer = window.global.persons[this.index];
  },
  update: function update(dt) {
    //判断当前回合是否结束
    console.log("是否等待操作", this.isWait);

    switch (this.nowStep) {
      case 0:
        {
          //初始化变量
          if (this.isWait) {
            //正在操作或等待操作
            break;
          } //this.node.emit('send-Msg','进入回合'+window.global.nowTurn,'系统');
          //console.log(this.nowPlayer.name);


          this.nowProperty = this.nowPlayer.getComponent('Person'); //获得玩家属性集合

          this.node.emit('send-Msg', '轮到角色' + this.nowProperty.nickname, '系统');
          this.node.emit('update-state', '1');
          break;
        }

      case 1:
        {
          //玩家移动
          if (this.isWait) {
            //正在操作或等待操作
            break;
          }

          if (this.nowProperty.goEnabled) {
            //判断玩家是否可以行走
            var tip = cc.find('Canvas/tipWin'); //tip.active=true;

            var step = randomNum(1, 6); //掷骰子，玩家步数

            this.node.emit('send-Msg', "获得骰子点数" + step, this.nowProperty.nickname);
            console.log(this.mapObj.posEnable(this.mapObj.map[this.nowProperty.posX][this.nowProperty.posY], step));
            this.isWait = true;
          } else {
            this.nowProperty.goEnabled = 1;
            this.node.emit('update-state', '1');
          }

          break;
        }

      case 2:
        {
          //完成了事件触发或者卡牌触发
          if (this.isWait) {
            //正在操作或等待操作
            break;
          }

          console.log("当前步骤：", this.nowStep);
          console.log("玩家出牌");
          this.node.emit('update-state', '1');
          break;
        }

      case 3:
        {
          //console.log("当前步骤：",this.nowStep);
          //当前玩家的回合数-1
          this.nowProperty.turn -= 1;

          if (this.nowProperty.turn == 0) //当前玩家回合数为0，应该切换玩家
            {
              console.log("切换角色");
              this.nowProperty.turn += 1;
              this.index = (this.index + 1) % 4;
              this.nowPlayer = window.global.persons[this.index];
            }

          this.node.emit('update-state', '1');
          break;
        }
    }
  },
  initPersons: function initPersons() {
    window.global.persons[0].getComponent('Person').bindAvatar(cc.find('Canvas/avatar/avatar1'));
    window.global.persons[1].getComponent('Person').bindAvatar(cc.find('Canvas/avatar/avatar2'));
    window.global.persons[2].getComponent('Person').bindAvatar(cc.find('Canvas/avatar/avatar3'));
    window.global.persons[3].getComponent('Person').bindAvatar(cc.find('Canvas/avatar/avatar4'));
    window.global.persons[0].getComponent('Person').nickname = '老叟';
    window.global.persons[1].getComponent('Person').nickname = '少妇';
    window.global.persons[2].getComponent('Person').nickname = '富商';
    window.global.persons[3].getComponent('Person').nickname = '小女'; //初始化四个玩家位置
    //console.log(this.mapObj.map[0][0].getPosition());

    window.global.persons[0].getComponent('Person').move2Pos(0, 0);
    window.global.persons[1].getComponent('Person').move2Pos(10, 10);
    window.global.persons[2].getComponent('Person').move2Pos(0, 10);
    window.global.persons[3].getComponent('Person').move2Pos(10, 0);

    for (var i = 0; i < window.global.persons.length; i++) {
      var nowPerson = window.global.persons[i];
      var ctx = cc.find("bloodBar/bar", nowPerson).getComponent(cc.Graphics);
      ctx.clear();
      ctx.strokeColor = cc.Color.RED;
      ctx.moveTo(-40, -150);
      ctx.lineWidth = 10;
      ctx.lineTo(60, -150);
      ctx.stroke();
      var text = cc.find("bloodBar/text", nowPerson);
      text.getComponent(cc.Label).fontSize = 25; //console.log(text.getComponent(cc.Label));

      text.setPosition(-100, -150); //设置行动值

      ctx = cc.find("mobilityBar/bar", nowPerson).getComponent(cc.Graphics);
      ctx.clear();
      ctx.strokeColor = cc.Color.GREEN;
      ctx.moveTo(-40, -180);
      ctx.lineTo(60, -180);
      ctx.lineWidth = 10;
      ctx.stroke();
      text = cc.find("mobilityBar/text", nowPerson);
      text.getComponent(cc.Label).fontSize = 25; //console.log(text.getComponent(cc.Label));

      text.setPosition(-100, -200);
    }
  },
  initBgm: function initBgm() {
    cc.loader.loadRes('bgm/天空之城钢琴曲', cc.AudioClip, function (err, clip) {
      var audioID = cc.audioEngine.play(clip, true, 0.5);
    });
  },
  InitialCard: function InitialCard() {
    var cardName = ['炸弹', '精准导弹', '地雷', '庇护', '天使的庇护', '战神的祝福', '虚弱', '团队的力量', '治愈', '圣光普照', '望远镜', '眼睛', '猛男的祝福', '盗取', '束缚', '迷惑', '拯救'];
    var totCardNum = 17;
    window.global.cardnode = new Array();

    for (var i = 0; i < totCardNum; i++) {
      var node = new cc.Node(cardName[i]);
      node.addComponent(cc.Sprite);
      node.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(cc.url.raw('resources/卡牌图片/' + cardName[i] + '.jpg'));
      window.global.cardnode.push(node);
    }

    this.initBgm();
  }
}); //生成从minNum到maxNum的随机数

function randomNum(minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1, 10);
      break;

    case 2:
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
      break;

    default:
      return 0;
      break;
  }
}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2xvYmFsR2FtZS5qcyJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJnbG9iYWwiLCJwZXJzb25zIiwibm93VHVybiIsImlzT3ZlciIsImNhcmRub2RlIiwiYmdtIiwiYXVkaW8iLCJsb29wIiwidm9sdW1lIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJtYXBPYmoiLCJpbmRleCIsIm5vd1N0ZXAiLCJub3dQbGF5ZXIiLCJub3dQcm9wZXJ0eSIsImlzV2FpdCIsIm1zZ0JveENvbmVudCIsInRpbWUiLCJ1cGRhdGVVSSIsIm9uTG9hZCIsIm1zZ0NvbnRlbnQiLCJmaW5kIiwibm9kZSIsIm9uIiwiZXZlbnQiLCJwb3N0ZXIiLCJ0aW1lU3RyIiwicGFyc2VJbnQiLCJuYW1lIiwiZ2V0Q29tcG9uZW50IiwiUmljaFRleHQiLCJzdHJpbmciLCJoZWlnaHQiLCJTY3JvbGxWaWV3Iiwic2Nyb2xsVG9Cb3R0b20iLCJtc2ciLCJnYW1lIiwiZW1pdCIsInJvdXRlIiwibW92ZUJ5Um91dGUiLCJjb25zb2xlIiwibG9nIiwic3RlcCIsInJhbmRvbU51bSIsIm5pY2tuYW1lIiwicG9zRW5hYmxlIiwibWFwIiwicG9zWCIsInBvc1kiLCJJbml0aWFsQ2FyZCIsImluaXRCZ20iLCJMYWJlbCIsInNjaGVkdWxlIiwic3RhcnQiLCJpbml0UGVyc29ucyIsInVwZGF0ZSIsImR0IiwiZ29FbmFibGVkIiwidGlwIiwidHVybiIsImJpbmRBdmF0YXIiLCJtb3ZlMlBvcyIsImkiLCJsZW5ndGgiLCJub3dQZXJzb24iLCJjdHgiLCJHcmFwaGljcyIsImNsZWFyIiwic3Ryb2tlQ29sb3IiLCJDb2xvciIsIlJFRCIsIm1vdmVUbyIsImxpbmVXaWR0aCIsImxpbmVUbyIsInN0cm9rZSIsInRleHQiLCJmb250U2l6ZSIsInNldFBvc2l0aW9uIiwiR1JFRU4iLCJsb2FkZXIiLCJsb2FkUmVzIiwiQXVkaW9DbGlwIiwiZXJyIiwiY2xpcCIsImF1ZGlvSUQiLCJhdWRpb0VuZ2luZSIsInBsYXkiLCJjYXJkTmFtZSIsInRvdENhcmROdW0iLCJBcnJheSIsIk5vZGUiLCJhZGRDb21wb25lbnQiLCJTcHJpdGUiLCJzcHJpdGVGcmFtZSIsIlNwcml0ZUZyYW1lIiwidXJsIiwicmF3IiwicHVzaCIsIm1pbk51bSIsIm1heE51bSIsImFyZ3VtZW50cyIsIk1hdGgiLCJyYW5kb20iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLE1BQU0sQ0FBQ0MsTUFBUCxHQUFjO0FBQ2JDLEVBQUFBLE9BQU8sRUFBQyxFQURLO0FBRWJDLEVBQUFBLE9BQU8sRUFBQyxDQUZLO0FBRUg7QUFDVkMsRUFBQUEsTUFBTSxFQUFDLEtBSE07QUFJYkMsRUFBQUEsUUFBUSxFQUFHLElBSkU7QUFLYkMsRUFBQUEsR0FBRyxFQUFDO0FBQ0hDLElBQUFBLEtBQUssRUFBQyxJQURIO0FBRUhDLElBQUFBLElBQUksRUFBQyxJQUZGO0FBR0hDLElBQUFBLE1BQU0sRUFBQztBQUhKO0FBTFMsQ0FBZDtBQVdBQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDZEMsSUFBQUEsTUFBTSxFQUFDLElBRE87QUFDRjtBQUNaWixJQUFBQSxPQUFPLEVBQUMsSUFGTTtBQUVEO0FBQ2JhLElBQUFBLEtBQUssRUFBQyxDQUhRO0FBSWRDLElBQUFBLE9BQU8sRUFBQyxDQUpNO0FBS2RDLElBQUFBLFNBQVMsRUFBQyxJQUxJO0FBTWRDLElBQUFBLFdBQVcsRUFBQyxJQU5FO0FBT2RDLElBQUFBLE1BQU0sRUFBQyxLQVBPO0FBUWRDLElBQUFBLFlBQVksRUFBQyxJQVJDO0FBU2RDLElBQUFBLElBQUksRUFBQztBQVRTLEdBSFA7QUFlTEMsRUFBQUEsUUFBUSxFQUFDLG9CQUFVLENBQ3JCO0FBQ0EsR0FqQk87QUFtQkxDLEVBQUFBLE1BbkJLLG9CQW1CSztBQUNaO0FBQ0EsU0FBS1AsT0FBTCxHQUFhLENB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YUFBT3ZFLFFBQVEsQ0FBQzBFLElBQUksQ0FBQ0MsTUFBTCxNQUFlSCxNQUFNLEdBQUNELE1BQVAsR0FBYyxDQUE3QixJQUFnQ0EsTUFBakMsRUFBd0MsRUFBeEMsQ0FBZjtBQUNKOztBQUNJO0FBQ0ksYUFBTyxDQUFQO0FBQ0o7QUFUUjtBQVdIIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ3aW5kb3cuZ2xvYmFsPXtcclxuXHRwZXJzb25zOltdLFxyXG5cdG5vd1R1cm46MCwvL+W9k+WJjeWbnuWQiOaVsFxyXG5cdGlzT3ZlcjpmYWxzZSxcclxuXHRjYXJkbm9kZSA6IG51bGwsXHJcblx0YmdtOntcclxuXHRcdGF1ZGlvOm51bGwsXHJcblx0XHRsb29wOm51bGwsXHJcblx0XHR2b2x1bWU6bnVsbCxcclxuXHR9XHJcbn07XHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcblx0XHRtYXBPYmo6bnVsbCwvL+WcsOWbvuWvueixoVxyXG5cdFx0cGVyc29uczpudWxsLC8v546p5a625LusXHJcblx0XHRpbmRleDowLFxyXG5cdFx0bm93U3RlcDowLFxyXG5cdFx0bm93UGxheWVyOm51bGwsXHJcblx0XHRub3dQcm9wZXJ0eTpudWxsLFxyXG5cdFx0aXNXYWl0OmZhbHNlLFxyXG5cdFx0bXNnQm94Q29uZW50Om51bGwsXHJcblx0XHR0aW1lOjAsXHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZVVJOmZ1bmN0aW9uKCl7XHJcblx0XHQvL+abtOaWsOS6uueJqeihgOmHj1xyXG5cdH0sXHJcblxyXG4gICAgb25Mb2FkICgpIHtcclxuXHRcdC8v5Yqg6L295Zyw5Zu+XHJcblx0XHR0aGlzLm5vd1N0ZXA9MDtcclxuXHRcdHRoaXMubXNnQ29udGVudD1jYy5maW5kKCdDYW52YXMvbXNnQm94L3ZpZXcvY29udGVudC9pdGVtJyk7XHJcblx0XHQvL2NvbnNvbGUubG9nKG1zZ0NvbnRlbnQuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKSk7XHJcblx0XHR0aGlzLm5vZGUub24oJ3NlbmQtTXNnJyxmdW5jdGlvbihldmVudCxwb3N0ZXIpe1xyXG5cdFx0XHR2YXIgdGltZVN0cj0nJztcclxuXHRcdFx0aWYgKHBhcnNlSW50KHRoaXMudGltZS82MCk8MTApXHJcblx0XHRcdFx0dGltZVN0cis9XCIwXCJcclxuXHRcdFx0dGltZVN0cis9cGFyc2VJbnQodGhpcy50aW1lLzYwKStcIjpcIjtcclxuXHRcdFx0aWYgKHRoaXMudGltZS1wYXJzZUludCh0aGlzLnRpbWUvNjApKjYwPDEwKVxyXG5cdFx0XHRcdHRpbWVTdHIrPVwiMFwiXHJcblx0XHRcdHRpbWVTdHIrPSh0aGlzLnRpbWUtcGFyc2VJbnQodGhpcy50aW1lLzYwKSo2MCk7XHJcblx0XHRcdFxyXG5cdFx0XHR2YXIgbmFtZT0nPGNvbG9yPSM0M0NEODA+KCcrdGltZVN0cisnKScrcG9zdGVyKyc8L2NvbG9yPic7XHJcblx0XHRcdGlmIChwb3N0ZXI9PSfns7vnu58nKXtcclxuXHRcdFx0XHRuYW1lPSc8Y29sb3I9I2ZmMDAwMD4oJyt0aW1lU3RyKycpJytwb3N0ZXIrJzwvY29sb3I+JztcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLm1zZ0NvbnRlbnQuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmcrPW5hbWUrXCI6IFwiK2V2ZW50Kyc8YnIvPic7XHJcblx0XHRcdC8v5Y+v6IO96ZyA6KaB5Yqo5oCB5pS55Y+YY29udGVudOWkp+Wwj1xyXG5cdFx0XHRcclxuXHRcdFx0Y2MuZmluZCgnQ2FudmFzL21zZ0JveC92aWV3L2NvbnRlbnQnKS5oZWlnaHQ9dGhpcy5tc2dDb250ZW50LmhlaWdodCsxMDtcclxuXHRcdFx0Y2MuZmluZCgnQ2FudmFzL21zZ0JveCcpLmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KS5zY3JvbGxUb0JvdHRvbSgwLjEpO1xyXG5cdFx0XHQvL2NvbnNvbGUubG9nKCdMYWJlbCcsdGhpcy5tc2dDb250ZW50LmhlaWdodCk7XHJcblx0XHRcdCBcclxuXHRcdH0sdGhpcyk7XHJcblx0XHRcdFxyXG5cdFx0dGhpcy5ub2RlLm9uKCd1cGRhdGUtc3RhdGUnLCBmdW5jdGlvbiAobXNnKSB7XHJcblx0XHRcdHRoaXMubm93U3RlcD0odGhpcy5ub3dTdGVwKzEpJTQ7XHJcblx0XHRcdHRoaXMuaXNXYWl0PWZhbHNlO1xyXG5cdFx0XHRcclxuXHRcdH0sdGhpcyk7XHJcblx0XHRjYy5nYW1lLm9uKCdzdGVwT25DZWxsLWRvbmUnLCBmdW5jdGlvbiAoIGV2ZW50ICkgey8v6Kem5Y+R57uT5p2fXHJcblx0XHRcdHRoaXMubm9kZS5lbWl0KCd1cGRhdGUtc3RhdGUnLCAnMScpOy8v5pu05paw54q25oCBXHJcblx0XHRcdC8vY29uc29sZS5sb2coXCLop6blj5HkuobnibnmrormoLzlrZDvvIFcIik7XHJcblx0XHR9LHRoaXMpO1xyXG5cdFx0Y2MuZ2FtZS5vbigncm91dGUtY2hvc2VuJywgZnVuY3Rpb24ocm91dGUpIHsvL+ebkeWQrOeOqeWutumAieaLqeS6huWTquadoei3r+W+hFxyXG5cdFx0XHRcdFx0Ly9jb25zb2xlLmxvZygn54K55Ye75LqGJyxyb3V0ZSk7XHJcblx0XHRcdHRoaXMubm93UHJvcGVydHkubW92ZUJ5Um91dGUocm91dGUpO1xyXG5cdFx0XHRcdFx0Ly90aGlzLm5vZGUuZW1pdCgndXBkYXRlLXN0YXRlJywgJzEnKTsvL+eOqeWutuenu+WKqOWujOaIkO+8jOi/m+WFpeS4i+S4gOatpeaTjeS9nFxyXG5cdFx0XHRcdFx0Ly/njqnlrrblpLTlg4/mjInnhafot6/lvoTnp7vliqhcclxuXHRcdH0sdGhpcyk7XHJcblx0XHRjYy5nYW1lLm9uKCdyb2xsLWRpY2UtZG9uZScsZnVuY3Rpb24oZXZlbnQpe1xyXG5cdFx0XHRjb25zb2xlLmxvZygneXl5Jyk7XHJcblx0XHRcdHZhciBzdGVwPXJhbmRvbU51bSgxLDYpOy8v5o636aqw5a2Q77yM546p5a625q2l5pWwXHJcblx0XHRcdHRoaXMubm9kZS5lbWl0KCdzZW5kLU1zZycsXCLojrflvpfpqrDlrZDngrnmlbBcIitzdGVwLHRoaXMubm93UHJvcGVydHkubmlja25hbWUpO1xyXG5cdFx0XHRjb25zb2xlLmxvZyh0aGlzLm1hcE9iai5wb3NFbmFibGUodGhpcy5tYXBPYmoubWFwW3RoaXMubm93UHJvcGVydHkucG9zWF1bdGhpcy5ub3dQcm9wZXJ0eS5wb3NZXSxzdGVwKSk7XHJcblx0XHRcdFx0XHRcclxuXHRcdH0sdGhpcyk7XHJcblx0XHR0aGlzLkluaXRpYWxDYXJkKCk7XHJcblx0XHR0aGlzLmluaXRCZ20oKTtcclxuXHRcdGNjLmZpbmQoJ0NhbnZhcy90aW1lJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zY2hlZHVsZShmdW5jdGlvbigpIHtcclxuXHRcdFx0XHJcblx0XHRcdGNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudCgnZ2xvYmFsR2FtZScpLnRpbWUrPTE7XHJcblx0XHRcdHZhciB0aW1lPWNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudCgnZ2xvYmFsR2FtZScpLnRpbWU7XHJcblx0XHRcdC8vY29uc29sZS5sb2codGltZSk7XHJcblx0XHRcdHRoaXMuc3RyaW5nPVwiVGltZTogXCJcclxuXHRcdFx0aWYgKHBhcnNlSW50KHRpbWUvNjApPDEwKVxyXG5cdFx0XHRcdHRoaXMuc3RyaW5nKz1cIjBcIlxyXG5cdFx0XHR0aGlzLnN0cmluZys9cGFyc2VJbnQodGltZS82MCkrXCI6XCI7XHJcblx0XHRcdGlmICh0aW1lLXBhcnNlSW50KHRpbWUvNjApKjYwPDEwKVxyXG5cdFx0XHRcdHRoaXMuc3RyaW5nKz1cIjBcIlxyXG5cdFx0XHR0aGlzLnN0cmluZys9KHRpbWUtcGFyc2VJbnQodGltZS82MCkqNjApO1xyXG5cdFx0XHQvL2NjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudCgnZ2xvYmFsR2FtZScpLnRpbWVTdHI9dGhpcy5zdHJpbmc7XHJcblx0XHQgfSwgMSk7XHJcblx0XHQgdGhpcy5ub2RlLmVtaXQoJ3NlbmQtTXNnJywn5aW95oiP5byA5Zy65LqGIScsJ+ezu+e7nycpO1xyXG5cdH0sXHJcblx0XHJcbiAgICBzdGFydCAoKSB7XHJcblx0XHQvL+WIneWni+WMluS6uueJqVxyXG5cdFx0dGhpcy5pbml0UGVyc29ucygpO1xyXG5cdFx0Ly/ojrflvpflnLDlm77lr7nosaFcclxuXHRcdHRoaXMubWFwT2JqPWNjLmZpbmQoJ0NhbnZhcy9tYXAnKS5nZXRDb21wb25lbnQoJ0dldE1hcCcpO1xyXG5cdFxyXG5cdFx0dGhpcy5ub3dQbGF5ZXI9d2luZG93Lmdsb2JhbC5wZXJzb25zW3RoaXMuaW5kZXhdO1xyXG5cdFx0XHJcblx0XHRcclxuXHRcdFxyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGUgKGR0KSB7XHJcblx0XHQvL+WIpOaWreW9k+WJjeWbnuWQiOaYr+WQpue7k+adn1xyXG5cdFx0XHJcblx0XHRjb25zb2xlLmxvZyhcIuaYr+WQpuetieW+heaTjeS9nFwiLHRoaXMuaXNXYWl0KTtcclxuXHRcdHN3aXRjaCAodGhpcy5ub3dTdGVwKXtcclxuXHRcdFx0Y2FzZSAwOnsvL+WIneWni+WMluWPmOmHj1xyXG5cdFx0XHRcdGlmICh0aGlzLmlzV2FpdCl7Ly/mraPlnKjmk43kvZzmiJbnrYnlvoXmk43kvZxcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQvL3RoaXMubm9kZS5lbWl0KCdzZW5kLU1zZycsJ+i/m+WFpeWbnuWQiCcrd2luZG93Lmdsb2JhbC5ub3dUdXJuLCfns7vnu58nKTtcclxuXHRcdFx0XHQvL2NvbnNvbGUubG9nKHRoaXMubm93UGxheWVyLm5hbWUpO1xyXG5cdFx0XHRcdHRoaXMubm93UHJvcGVydHk9dGhpcy5ub3dQbGF5ZXIuZ2V0Q29tcG9uZW50KCdQZXJzb24nKTsvL+iOt+W+l+eOqeWutuWxnuaAp+mbhuWQiFxyXG5cdFx0XHRcdHRoaXMubm9kZS5lbWl0KCdzZW5kLU1zZycsJ+i9ruWIsOinkuiJsicrdGhpcy5ub3dQcm9wZXJ0eS5uaWNrbmFtZSwn57O757ufJyk7XHJcblx0XHRcdFx0dGhpcy5ub2RlLmVtaXQoJ3VwZGF0ZS1zdGF0ZScsICcxJyk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdH1cclxuXHRcdFx0Y2FzZSAxOnsvL+eOqeWutuenu+WKqFxyXG5cdFx0XHRcdGlmICh0aGlzLmlzV2FpdCl7Ly/mraPlnKjmk43kvZzmiJbnrYnlvoXmk43kvZxcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRpZiAodGhpcy5ub3dQcm9wZXJ0eS5nb0VuYWJsZWQpey8v5Yik5pat546p5a625piv5ZCm5Y+v5Lul6KGM6LWwXHJcblx0XHRcdFx0XHR2YXIgdGlwPWNjLmZpbmQoJ0NhbnZhcy90aXBXaW4nKTtcclxuXHRcdFx0XHRcdC8vdGlwLmFjdGl2ZT10cnVlO1xyXG5cdFx0XHRcdFx0dmFyIHN0ZXA9cmFuZG9tTnVtKDEsNik7Ly/mjrfpqrDlrZDvvIznjqnlrrbmraXmlbBcclxuXHRcdFx0XHRcdHRoaXMubm9kZS5lbWl0KCdzZW5kLU1zZycsXCLojrflvpfpqrDlrZDngrnmlbBcIitzdGVwLHRoaXMubm93UHJvcGVydHkubmlja25hbWUpO1xyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2codGhpcy5tYXBPYmoucG9zRW5hYmxlKHRoaXMubWFwT2JqLm1hcFt0aGlzLm5vd1Byb3BlcnR5LnBvc1hdW3RoaXMubm93UHJvcGVydHkucG9zWV0sc3RlcCkpO1xyXG5cdFx0XHRcdFx0dGhpcy5pc1dhaXQ9dHJ1ZTtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2V7XHJcblx0XHRcdFx0XHR0aGlzLm5vd1Byb3BlcnR5LmdvRW5hYmxlZD0xO1xyXG5cdFx0XHRcdFx0dGhpcy5ub2RlLmVtaXQoJ3VwZGF0ZS1zdGF0ZScsICcxJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdCBicmVhaztcclxuXHRcdFx0fVxyXG5cdFx0XHRjYXNlIDI6e1xyXG5cdFx0XHRcdC8v5a6M5oiQ5LqG5LqL5Lu26Kem5Y+R5oiW6ICF5Y2h54mM6Kem5Y+RXHJcblx0XHRcdFx0aWYgKHRoaXMuaXNXYWl0KXsvL+ato+WcqOaTjeS9nOaIluetieW+heaTjeS9nFxyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGNvbnNvbGUubG9nKFwi5b2T5YmN5q2l6aqk77yaXCIsdGhpcy5ub3dTdGVwKTtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhcIueOqeWutuWHuueJjFwiKTtcclxuXHRcdFx0XHR0aGlzLm5vZGUuZW1pdCgndXBkYXRlLXN0YXRlJywgJzEnKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0fVxyXG5cdFx0XHRjYXNlIDM6e1xyXG5cdFx0XHRcdC8vY29uc29sZS5sb2coXCLlvZPliY3mraXpqqTvvJpcIix0aGlzLm5vd1N0ZXApO1xyXG5cdFx0XHRcdC8v5b2T5YmN546p5a6255qE5Zue5ZCI5pWwLTFcclxuXHRcdFx0XHR0aGlzLm5vd1Byb3BlcnR5LnR1cm4tPTE7XHJcblx0XHRcdFx0aWYgKHRoaXMubm93UHJvcGVydHkudHVybj09MCkvL+W9k+WJjeeOqeWutuWbnuWQiOaVsOS4ujDvvIzlupTor6XliIfmjaLnjqnlrrZcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcIuWIh+aNouinkuiJslwiKTtcclxuXHRcdFx0XHRcdHRoaXMubm93UHJvcGVydHkudHVybis9MTtcclxuXHRcdFx0XHRcdHRoaXMuaW5kZXg9KHRoaXMuaW5kZXgrMSklNDtcclxuXHRcdFx0XHRcdHRoaXMubm93UGxheWVyPXdpbmRvdy5nbG9iYWwucGVyc29uc1t0aGlzLmluZGV4XTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0dGhpcy5ub2RlLmVtaXQoJ3VwZGF0ZS1zdGF0ZScsICcxJyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdFxyXG5cdH0sXHJcblx0aW5pdFBlcnNvbnM6ZnVuY3Rpb24oKXtcclxuXHRcdHdpbmRvdy5nbG9iYWwucGVyc29uc1swXS5nZXRDb21wb25lbnQoJ1BlcnNvbicpLmJpbmRBdmF0YXIoY2MuZmluZCgnQ2FudmFzL2F2YXRhci9hdmF0YXIxJykpO1xyXG5cdFx0d2luZG93Lmdsb2JhbC5wZXJzb25zWzFdLmdldENvbXBvbmVudCgnUGVyc29uJykuYmluZEF2YXRhcihjYy5maW5kKCdDYW52YXMvYXZhdGFyL2F2YXRhcjInKSk7XHJcblx0XHR3aW5kb3cuZ2xvYmFsLnBlcnNvbnNbMl0uZ2V0Q29tcG9uZW50KCdQZXJzb24nKS5iaW5kQXZhdGFyKGNjLmZpbmQoJ0NhbnZhcy9hdmF0YXIvYXZhdGFyMycpKTtcclxuXHRcdHdpbmRvdy5nbG9iYWwucGVyc29uc1szXS5nZXRDb21wb25lbnQoJ1BlcnNvbicpLmJpbmRBdmF0YXIoY2MuZmluZCgnQ2FudmFzL2F2YXRhci9hdmF0YXI0JykpO1xyXG5cdFx0d2luZG93Lmdsb2JhbC5wZXJzb25zWzBdLmdldENvbXBvbmVudCgnUGVyc29uJykubmlja25hbWU9J+iAgeWPnyc7XHJcblx0XHR3aW5kb3cuZ2xvYmFsLnBlcnNvbnNbMV0uZ2V0Q29tcG9uZW50KCdQZXJzb24nKS5uaWNrbmFtZT0n5bCR5aaHJztcclxuXHRcdHdpbmRvdy5nbG9iYWwucGVyc29uc1syXS5nZXRDb21wb25lbnQoJ1BlcnNvbicpLm5pY2tuYW1lPSflr4zllYYnO1xyXG5cdFx0d2luZG93Lmdsb2JhbC5wZXJzb25zWzNdLmdldENvbXBvbmVudCgnUGVyc29uJykubmlja25hbWU9J+Wwj+Wlsyc7XHJcblx0XHQvL+WIneWni+WMluWbm+S4queOqeWutuS9jee9rlxyXG5cdFx0Ly9jb25zb2xlLmxvZyh0aGlzLm1hcE9iai5tYXBbMF1bMF0uZ2V0UG9zaXRpb24oKSk7XHJcblx0XHR3aW5kb3cuZ2xvYmFsLnBlcnNvbnNbMF0uZ2V0Q29tcG9uZW50KCdQZXJzb24nKS5tb3ZlMlBvcygwLDApO1xyXG5cdFx0d2luZG93Lmdsb2JhbC5wZXJzb25zWzFdLmdldENvbXBvbmVudCgnUGVyc29uJykubW92ZTJQb3MoMTAsMTApO1xyXG5cdFx0d2luZG93Lmdsb2JhbC5wZXJzb25zWzJdLmdldENvbXBvbmVudCgnUGVyc29uJykubW92ZTJQb3MoMCwxMCk7XHJcblx0XHR3aW5kb3cuZ2xvYmFsLnBlcnNvbnNbM10uZ2V0Q29tcG9uZW50KCdQZXJzb24nKS5tb3ZlMlBvcygxMCwwKTtcclxuXHRcdGZvciAodmFyIGk9MDtpPHdpbmRvdy5nbG9iYWwucGVyc29ucy5sZW5ndGg7aSsrKXtcclxuXHRcdFx0dmFyIG5vd1BlcnNvbj13aW5kb3cuZ2xvYmFsLnBlcnNvbnNbaV07XHJcblx0XHRcdHZhciBjdHg9Y2MuZmluZChcImJsb29kQmFyL2JhclwiLCBub3dQZXJzb24pLmdldENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcblx0XHRcdGN0eC5jbGVhcigpO1xyXG5cdFx0XHRjdHguc3Ryb2tlQ29sb3IgPSBjYy5Db2xvci5SRUQ7XHJcblx0XHRcdGN0eC5tb3ZlVG8oLTQwLCAtMTUwKTtcclxuXHRcdFx0Y3R4LmxpbmVXaWR0aD0xMDtcclxuXHRcdFx0Y3R4LmxpbmVUbyg2MCwgLTE1MCk7XHJcblx0XHRcdGN0eC5zdHJva2UoKTsgICBcclxuXHRcdFx0dmFyIHRleHQ9Y2MuZmluZChcImJsb29kQmFyL3RleHRcIiwgbm93UGVyc29uKTtcclxuXHRcdFx0dGV4dC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLmZvbnRTaXplPTI1O1xyXG5cdFx0XHQvL2NvbnNvbGUubG9nKHRleHQuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKSk7XHJcblx0XHRcdHRleHQuc2V0UG9zaXRpb24oLTEwMCwtMTUwKTtcclxuXHRcdFx0XHJcblx0XHRcdC8v6K6+572u6KGM5Yqo5YC8XHJcblx0XHRcdGN0eD1jYy5maW5kKFwibW9iaWxpdHlCYXIvYmFyXCIsIG5vd1BlcnNvbikuZ2V0Q29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuXHRcdFx0Y3R4LmNsZWFyKCk7XHJcblx0XHRcdGN0eC5zdHJva2VDb2xvciA9IGNjLkNvbG9yLkdSRUVOO1xyXG5cdFx0XHRjdHgubW92ZVRvKC00MCwgLTE4MCk7XHJcblx0XHRcdGN0eC5saW5lVG8oNjAsIC0xODApO1xyXG5cdFx0XHRjdHgubGluZVdpZHRoPTEwO1xyXG5cdFx0XHRjdHguc3Ryb2tlKCk7ICBcclxuXHRcdFx0dGV4dD1jYy5maW5kKFwibW9iaWxpdHlCYXIvdGV4dFwiLCBub3dQZXJzb24pO1xyXG5cdFx0XHR0ZXh0LmdldENvbXBvbmVudChjYy5MYWJlbCkuZm9udFNpemU9MjU7XHJcblx0XHRcdC8vY29uc29sZS5sb2codGV4dC5nZXRDb21wb25lbnQoY2MuTGFiZWwpKTtcclxuXHRcdFx0dGV4dC5zZXRQb3NpdGlvbigtMTAwLC0yMDApO1x0XHRcdFxyXG5cdFx0fVxyXG5cdH0sXHJcblx0aW5pdEJnbTpmdW5jdGlvbigpe1xyXG5cdFx0Y2MubG9hZGVyLmxvYWRSZXMoJ2JnbS/lpKnnqbrkuYvln47pkqLnkLTmm7InLCBjYy5BdWRpb0NsaXAsIGZ1bmN0aW9uIChlcnIsIGNsaXApIHtcclxuXHRcdFx0dmFyIGF1ZGlvSUQgPSBjYy5hdWRpb0VuZ2luZS5wbGF5KGNsaXAsIHRydWUsIDAuNSk7XHJcblx0XHR9KTtcclxuXHR9LFxyXG5cdEluaXRpYWxDYXJkOiBmdW5jdGlvbigpIHtcclxuXHRcdHZhciBjYXJkTmFtZSA9IFsn54K45by5Jywn57K+5YeG5a+85by5Jywn5Zyw6Zu3Jywn5bqH5oqkJywn5aSp5L2/55qE5bqH5oqkJywn5oiY56We55qE56Wd56aPJywn6Jma5byxJywn5Zui6Zif55qE5Yqb6YePJyxcclxuXHRcdFx0XHRcdFx0XHQn5rK75oSIJywn5Zyj5YWJ5pmu54WnJywn5pyb6L+c6ZWcJywn55y8552bJywn54yb55S355qE56Wd56aPJywn55uX5Y+WJywn5p2f57yaJywn6L+35oORJywn5ouv5pWRJ107XHJcblx0XHR2YXIgdG90Q2FyZE51bSA9IDE3O1xyXG5cdFx0d2luZG93Lmdsb2JhbC5jYXJkbm9kZSA9IG5ldyBBcnJheSgpO1xyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0b3RDYXJkTnVtOyBpKyspIHtcclxuXHRcdFx0dmFyIG5vZGUgPSBuZXcgY2MuTm9kZShjYXJkTmFtZVtpXSk7XHJcblx0XHRcdG5vZGUuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSk7XHJcblx0XHRcdG5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBuZXcgY2MuU3ByaXRlRnJhbWUoY2MudXJsLnJhdygncmVzb3VyY2VzL+WNoeeJjOWbvueJhy8nK2NhcmROYW1lW2ldKycuanBnJykpO1xyXG5cdFx0XHR3aW5kb3cuZ2xvYmFsLmNhcmRub2RlLnB1c2gobm9kZSk7XHJcblx0XHR9XHJcblx0XHR0aGlzLmluaXRCZ20oKTtcclxuXHR9LFxyXG59KTtcclxuXHJcblxyXG4vL+eUn+aIkOS7jm1pbk51beWIsG1heE51beeahOmaj+acuuaVsFxyXG5mdW5jdGlvbiByYW5kb21OdW0obWluTnVtLG1heE51bSl7IFxyXG4gICAgc3dpdGNoKGFyZ3VtZW50cy5sZW5ndGgpeyBcclxuICAgICAgICBjYXNlIDE6IFxyXG4gICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQoTWF0aC5yYW5kb20oKSptaW5OdW0rMSwxMCk7IFxyXG4gICAgICAgIGJyZWFrOyBcclxuICAgICAgICBjYXNlIDI6IFxyXG4gICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQoTWF0aC5yYW5kb20oKSoobWF4TnVtLW1pbk51bSsxKSttaW5OdW0sMTApOyBcclxuICAgICAgICBicmVhazsgXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7IFxyXG4gICAgICAgICAgICBicmVhazsgXHJcbiAgICB9IFxyXG59ICJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/GetMap.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e8bc53xDZdPCKLrf/Yatyej', 'GetMap');
// scripts/GetMap.js

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
    basex: 0,
    basey: 0,
    stepx: 0,
    stepy: 0,
    routes: null,
    //暂存计算出来的多条路径
    cell: {
      "default": null,
      type: cc.Prefab
    },
    map: null,
    //二维地图
    adj: null //存边，adj[i][j]是一个数组，数组中每个是与map[i][j]相连的map坐标
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
  // LIFE-CYCLE CALLBACKS:
  GetCell: function GetCell() {
    var map_matrix = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1], [1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1], [1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1], [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1], [1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1], [1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1], [1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];
    this.map = new Array();

    for (var i = 0; i < 11; i++) {
      this.map[i] = new Array();

      for (var j = 0; j < 11; j++) {
        this.map[i][j] = null;

        if (map_matrix[i][j] == 1) {
          var newcell = cc.instantiate(this.cell);
          newcell.parent = this.node; //将cell节点加到map节点之下

          newcell.setPosition(this.basex + this.stepx * i, this.basey + this.stepy * j);
          this.map[i][j] = newcell;
          var cell_js = this.map[i][j].getComponent("Cell");
          cell_js.mapx = i;
          cell_js.mapy = j; //以概率方式随机生成格子类型

          if (i == 0 && j == 0 || i == 0 && j == 10 || i == 10 && j == 0 || i == 10 && j == 10) {
            cell_js.kind = 0;
            continue;
          }

          var p = Math.random();
          if (p < 0.4) cell_js.kind = 0; //空白格
          else if (p < 0.7) cell_js.kind = 1; //卡牌格
            else cell_js.kind = 2; //事件格
        }
      }
    }
  },
  GetEdge: function GetEdge() {
    this.adj = new Array();

    for (var i = 0; i < 11; i++) {
      this.adj[i] = new Array();

      for (var j = 0; j < 11; j++) {
        this.adj[i][j] = new Array();
      }
    } //每一个四元数组表示：坐标(a[0],a[1])的cell和坐标(a[2],a[3])的cell之间有条边


    var edge = [[0, 0, 0, 1], [0, 1, 0, 2], [0, 2, 0, 3], [0, 3, 0, 4], [0, 4, 0, 5], [0, 5, 0, 6], [0, 6, 0, 7], [0, 7, 0, 8], [0, 8, 0, 9], [0, 9, 0, 10], [0, 0, 1, 0], [0, 0, 1, 1], [0, 5, 1, 5], [0, 10, 1, 9], [0, 10, 1, 10], [1, 0, 2, 0], [1, 1, 2, 2], [1, 5, 2, 5], [1, 9, 2, 8], [1, 10, 2, 10], [2, 0, 3, 0], [2, 2, 3, 3], [2, 5, 3, 4], [2, 5, 3, 6], [2, 8, 3, 7], [2, 10, 3, 10], [3, 3, 3, 4], [3, 6, 3, 7], [3, 0, 4, 0], [3, 3, 4, 3], [3, 7, 4, 7], [3, 10, 4, 10], [4, 0, 5, 0], [4, 3, 5, 2], [4, 7, 5, 8], [4, 10, 5, 10], [5, 0, 5, 1], [5, 1, 5, 2], [5, 2, 5, 3], [5, 3, 5, 4], [5, 4, 5, 5], [5, 5, 5, 6], [5, 6, 5, 7], [5, 7, 5, 8], [5, 8, 5, 9], [5, 9, 5, 10], [5, 0, 6, 0], [5, 2, 6, 3], [5, 8, 6, 7], [5, 10, 6, 10], [6, 0, 7, 0], [6, 3, 7, 3], [6, 7, 7, 7], [6, 10, 7, 10], [7, 3, 7, 4], [7, 6, 7, 7], [7, 0, 8, 0], [7, 3, 8, 2], [7, 4, 8, 5], [7, 6, 8, 5], [7, 7, 8, 8], [7, 10, 8, 10], [8, 0, 9, 0], [8, 2, 9, 1], [8, 5, 9, 5], [8, 8, 9, 9], [8, 10, 9, 10], [9, 0, 10, 0], [9, 1, 10, 0], [9, 5, 10, 5], [9, 9, 10, 10], [9, 10, 10, 10], [10, 0, 10, 1], [10, 1, 10, 2], [10, 2, 10, 3], [10, 3, 10, 4], [10, 4, 10, 5], [10, 5, 10, 6], [10, 6, 10, 7], [10, 7, 10, 8], [10, 8, 10, 9], [10, 9, 10, 10]];

    for (var i = 0; i < edge.length; i++) {
      this.adj[edge[i][0]][edge[i][1]].push([edge[i][2], edge[i][3]]);
      this.adj[edge[i][2]][edge[i][3]].push([edge[i][0], edge[i][1]]);
    }
  },
  DfsForRoute: function DfsForRoute(nowpos, num, vis, routes, route) {
    /*
    	nowpos为当前搜索到的cell，num为剩余步数
    	routes:路径集合，route:当前所在的一条路径
    */
    var cell_js = nowpos.getComponent("Cell"); //获得cell节点的js组件，以便获得组件中的属性

    var x = cell_js.mapx,
        y = cell_js.mapy;
    if (vis[x][y] == 1) return;
    vis[x][y] = 1;
    route.push(nowpos);

    if (num == 0) {
      var newroute = [];

      for (var i = 0; i < route.length; i++) {
        newroute.push(route[i]);
      }

      routes.push(newroute);
      route.pop();
      vis[x][y] = 0;
      return;
    }

    for (var i = 0; i < this.adj[x][y].length; i++) {
      this.DfsForRoute(this.map[this.adj[x][y][i][0]][this.adj[x][y][i][1]], num - 1, vis, routes, route);
    }

    route.pop();
    vis[x][y] = 0;
  },
  chooseRoute: function chooseRoute() {
    //此函数下的this是cell.js
    var par = this.node.parent.getComponent("GetMap");
    var route = par.routes[this.routeId];
    /*
    for (var i = 0; i < route.length; i++) {
    	var cell_js = route[i].getComponent("Cell");
    	console.log(cell_js.mapx, cell_js.mapy);
    }
    */
    //关闭所有节点的监听

    for (var i = 0; i < 11; i++) {
      for (var j = 0; j < 11; j++) {
        if (par.map[i][j] == null) continue;
        var cell_js = par.map[i][j].getComponent("Cell");

        if (cell_js.inMonitor == 1) {
          cell_js.inMonitor = 0;
          cell_js.resetColor();
          cell_js.routeId = null; //

          par.map[i][j].off("mousedown", this.chooseRoute, cell_js); //this.node.off("mousedown", this.chooseRoute, cell_js);
        }
      }
    }
    /*
    发送事件
    */


    cc.game.emit('route-chosen', route);
  },
  openMonitor: function openMonitor(routes) {
    //对每条路径的终点开启监听
    for (var i = 0; i < routes.length; i++) {
      var cell = routes[i][routes[i].length - 1];
      var cell_js = cell.getComponent("Cell");
      cell_js.inMonitor = 1;
      cell_js.setColor();
      cell_js.routeId = i;
      cell.on("mousedown", this.chooseRoute, cell_js);
    }
  },
  posEnable: function posEnable(nowpos, num) {
    //nowpos为cell类型的node, num为可移动步数
    //返回二维数组，第二维度的数组是由若干cell类型的node组成
    var vis = []; //标记是否经过

    for (var i = 0; i < 11; i++) {
      vis[i] = [];

      for (var j = 0; j < 11; j++) {
        vis[i][j] = 0;
      }
    }

    var routes = [];
    this.DfsForRoute(nowpos, num, vis, routes, []); //搜索路径

    this.routes = routes; //将得到的多条路径保存

    this.openMonitor(routes); //对每条路径的终点开启监听

    return routes;
  },
  onLoad: function onLoad() {
    this.GetCell(); //构建cell矩阵即map

    this.GetEdge(); //建边

    console.log(this.name + "onLoad");
  },
  start: function start() {//this.posEnable(this.map[0][0], 5);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcR2V0TWFwLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiYmFzZXgiLCJiYXNleSIsInN0ZXB4Iiwic3RlcHkiLCJyb3V0ZXMiLCJjZWxsIiwidHlwZSIsIlByZWZhYiIsIm1hcCIsImFkaiIsIkdldENlbGwiLCJtYXBfbWF0cml4IiwiQXJyYXkiLCJpIiwiaiIsIm5ld2NlbGwiLCJpbnN0YW50aWF0ZSIsInBhcmVudCIsIm5vZGUiLCJzZXRQb3NpdGlvbiIsImNlbGxfanMiLCJnZXRDb21wb25lbnQiLCJtYXB4IiwibWFweSIsImtpbmQiLCJwIiwiTWF0aCIsInJhbmRvbSIsIkdldEVkZ2UiLCJlZGdlIiwibGVuZ3RoIiwicHVzaCIsIkRmc0ZvclJvdXRlIiwibm93cG9zIiwibnVtIiwidmlzIiwicm91dGUiLCJ4IiwieSIsIm5ld3JvdXRlIiwicG9wIiwiY2hvb3NlUm91dGUiLCJwYXIiLCJyb3V0ZUlkIiwiaW5Nb25pdG9yIiwicmVzZXRDb2xvciIsIm9mZiIsImdhbWUiLCJlbWl0Iiwib3Blbk1vbml0b3IiLCJzZXRDb2xvciIsIm9uIiwicG9zRW5hYmxlIiwib25Mb2FkIiwiY29uc29sZSIsImxvZyIsIm5hbWUiLCJzdGFydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ2RDLElBQUFBLEtBQUssRUFBRSxDQURPO0FBRWRDLElBQUFBLEtBQUssRUFBRSxDQUZPO0FBR2RDLElBQUFBLEtBQUssRUFBRSxDQUhPO0FBSWRDLElBQUFBLEtBQUssRUFBRSxDQUpPO0FBS2RDLElBQUFBLE1BQU0sRUFBRSxJQUxNO0FBS0E7QUFDZEMsSUFBQUEsSUFBSSxFQUFFO0FBQ0wsaUJB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QUFDQSxRQUFJQyxHQUFHLEdBQUcsRUFBVixDQUhnQyxDQUdsQjs7QUFDZCxTQUFLLElBQUl0QixDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEVBQXBCLEVBQXdCQSxDQUFDLEVBQXpCLEVBQTZCO0FBQzVCc0IsTUFBQUEsR0FBRyxDQUFDdEIsQ0FBRCxDQUFILEdBQVMsRUFBVDs7QUFDQSxXQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsRUFBcEIsRUFBd0JBLENBQUMsRUFBekIsRUFBNkI7QUFDNUJxQixRQUFBQSxHQUFHLENBQUN0QixDQUFELENBQUgsQ0FBT0MsQ0FBUCxJQUFZLENBQVo7QUFDQTtBQUNEOztBQUNELFFBQUlWLE1BQU0sR0FBRyxFQUFiO0FBQ0EsU0FBSzRCLFdBQUwsQ0FBaUJDLE1BQWpCLEVBQXlCQyxHQUF6QixFQUE4QkMsR0FBOUIsRUFBbUMvQixNQUFuQyxFQUEyQyxFQUEzQyxFQVhnQyxDQVdnQjs7QUFDaEQsU0FBS0EsTUFBTCxHQUFjQSxNQUFkLENBWmdDLENBWVY7O0FBQ3RCLFNBQUs2QyxXQUFMLENBQWlCN0MsTUFBakIsRUFiZ0MsQ0FhTjs7QUFDMUIsV0FBT0EsTUFBUDtBQUNBLEdBeE1PO0FBME1MaUQsRUFBQUEsTUExTUssb0JBME1LO0FBQ1osU0FBSzNDLE9BQUwsR0FEWSxDQUNJOztBQUNoQixTQUFLa0IsT0FBTCxHQUZZLENBRUk7O0FBQ2hCMEIsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksS0FBS0MsSUFBTCxHQUFVLFFBQXRCO0FBQ0EsR0E5TU87QUFnTkxDLEVBQUFBLEtBaE5LLG1CQWdOSSxDQUVYO0FBR0csR0FyTkksQ0F1Tkw7O0FBdk5LLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuXHRcdGJhc2V4OiAwLFxyXG5cdFx0YmFzZXk6IDAsXHJcblx0XHRzdGVweDogMCxcclxuXHRcdHN0ZXB5OiAwLFxyXG5cdFx0cm91dGVzOiBudWxsLCAvL+aaguWtmOiuoeeul+WHuuadpeeahOWkmuadoei3r+W+hFxyXG5cdFx0Y2VsbDoge1xyXG5cdFx0XHRkZWZhdWx0OiBudWxsLFxyXG5cdFx0XHR0eXBlOiBjYy5QcmVmYWIsXHJcblx0XHR9LFxyXG5cdFx0bWFwOiBudWxsLCAvL+S6jOe7tOWcsOWbvlxyXG5cdFx0YWRqOiBudWxsLCAvL+WtmOi+ue+8jGFkaltpXVtqXeaYr+S4gOS4quaVsOe7hO+8jOaVsOe7hOS4reavj+S4quaYr+S4jm1hcFtpXVtqXeebuOi/nueahG1hcOWdkOagh1xyXG4gICAgICAgIC8vIGZvbzoge1xyXG4gICAgICAgIC8vICAgICAvLyBBVFRSSUJVVEVTOlxyXG4gICAgICAgIC8vICAgICBkZWZhdWx0OiBudWxsLCAgICAgICAgLy8gVGhlIGRlZmF1bHQgdmFsdWUgd2lsbCBiZSB1c2VkIG9ubHkgd2hlbiB0aGUgY29tcG9uZW50IGF0dGFjaGluZ1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdG8gYSBub2RlIGZvciB0aGUgZmlyc3QgdGltZVxyXG4gICAgICAgIC8vICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcclxuICAgICAgICAvLyAgICAgc2VyaWFsaXphYmxlOiB0cnVlLCAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcclxuICAgICAgICAvLyB9LFxyXG4gICAgICAgIC8vIGJhcjoge1xyXG4gICAgICAgIC8vICAgICBnZXQgKCkge1xyXG4gICAgICAgIC8vICAgICAgICAgcmV0dXJuIHRoaXMuX2JhcjtcclxuICAgICAgICAvLyAgICAgfSxcclxuICAgICAgICAvLyAgICAgc2V0ICh2YWx1ZSkge1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5fYmFyID0gdmFsdWU7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9LFxyXG4gICAgfSxcclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG5cdEdldENlbGw6IGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIG1hcF9tYXRyaXggPSBbXHJcblx0XHRcdFsxLDEsMSwxLDEsMSwxLDEsMSwxLDFdLFxyXG5cdFx0XHRbMSwxLDAsMCwwLDEsMCwwLDAsMSwxXSxcclxuXHRcdFx0WzEsMCwxLDAsMCwxLDAsMCwxLDAsMV0sXHJcblx0XHRcdFsxLDAsMCwxLDEsMCwxLDEsMCwwLDFdLFxyXG5cdFx0XHRbMSwwLDAsMSwwLDAsMCwxLDAsMCwxXSxcclxuXHRcdFx0WzEsMSwxLDEsMSwxLDEsMSwxLDEsMV0sXHJcblx0XHRcdFsxLDAsMCwxLDAsMCwwLDEsMCwwLDFdLFxyXG5cdFx0XHRbMSwwLDAsMSwxLDAsMSwxLDAsMCwxXSxcclxuXHRcdFx0WzEsMCwxLDAsMCwxLDAsMCwxLDAsMV0sXHJcblx0XHRcdFsxLDEsMCwwLDAsMSwwLDAsMCwxLDFdLFxyXG5cdFx0XHRbMSwxLDEsMSwxLDEsMSwxLDEsMSwxXSxcclxuXHRcdF07XHJcblx0XHR0aGlzLm1hcCA9IG5ldyBBcnJheSgpO1xyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAxMTsgaSsrKSB7XHJcblx0XHRcdHRoaXMubWFwW2ldID0gbmV3IEFycmF5KCk7XHJcblx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgMTE7IGorKykge1xyXG5cdFx0XHRcdHRoaXMubWFwW2ldW2pdID0gbnVsbDtcclxuXHRcdFx0XHRpZiAobWFwX21hdHJpeFtpXVtqXSA9PSAxKSB7XHJcblx0XHRcdFx0XHR2YXIgbmV3Y2VsbCA9IGNjLmluc3RhbnRpYXRlKHRoaXMuY2VsbCk7XHJcblx0XHRcdFx0XHRuZXdjZWxsLnBhcmVudCA9IHRoaXMubm9kZTsgLy/lsIZjZWxs6IqC54K55Yqg5YiwbWFw6IqC54K55LmL5LiLXHJcblx0XHRcdFx0XHRuZXdjZWxsLnNldFBvc2l0aW9uKHRoaXMuYmFzZXgrdGhpcy5zdGVweCppLCB0aGlzLmJhc2V5K3RoaXMuc3RlcHkqaik7XHJcblx0XHRcdFx0XHR0aGlzLm1hcFtpXVtqXSA9IG5ld2NlbGw7XHJcblx0XHRcdFx0XHR2YXIgY2VsbF9qcyA9IHRoaXMubWFwW2ldW2pdLmdldENvbXBvbmVudChcIkNlbGxcIik7XHJcblx0XHRcdFx0XHRjZWxsX2pzLm1hcHggPSBpO1xyXG5cdFx0XHRcdFx0Y2VsbF9qcy5tYXB5ID0gajtcclxuXHRcdFx0XHRcdC8v5Lul5qaC546H5pa55byP6ZqP5py655Sf5oiQ5qC85a2Q57G75Z6LXHJcblx0XHRcdFx0XHRpZiAoKGk9PTAmJmo9PTApIHx8IChpPT0wJiZqPT0xMCkgfHwgKGk9PTEwJiZqPT0wKSB8fCAoaT09MTAmJmo9PTEwKSkge1xyXG5cdFx0XHRcdFx0XHRjZWxsX2pzLmtpbmQgPSAwO1xyXG5cdFx0XHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHZhciBwID0gTWF0aC5yYW5kb20oKTtcclxuXHRcdFx0XHRcdGlmIChwIDwgMC40KVxyXG5cdFx0XHRcdFx0XHRjZWxsX2pzLmtpbmQgPSAwOyAvL+epuueZveagvFxyXG5cdFx0XHRcdFx0ZWxzZSBpZiAocCA8IDAuNylcclxuXHRcdFx0XHRcdFx0Y2VsbF9qcy5raW5kID0gMTsgLy/ljaHniYzmoLxcclxuXHRcdFx0XHRcdGVsc2VcclxuXHRcdFx0XHRcdFx0Y2VsbF9qcy5raW5kID0gMjsgLy/kuovku7bmoLxcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9LFxyXG5cdFxyXG5cdEdldEVkZ2U6IGZ1bmN0aW9uKCkge1xyXG5cdFx0dGhpcy5hZGogPSBuZXcgQXJyYXkoKTtcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgMTE7IGkrKykge1xyXG5cdFx0XHR0aGlzLmFkaltpXSA9IG5ldyBBcnJheSgpO1xyXG5cdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IDExOyBqKyspIHtcclxuXHRcdFx0XHRcdHRoaXMuYWRqW2ldW2pdID0gbmV3IEFycmF5KCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdC8v5q+P5LiA5Liq5Zub5YWD5pWw57uE6KGo56S677ya5Z2Q5qCHKGFbMF0sYVsxXSnnmoRjZWxs5ZKM5Z2Q5qCHKGFbMl0sYVszXSnnmoRjZWxs5LmL6Ze05pyJ5p2h6L65XHJcblx0XHR2YXIgZWRnZSA9IFtcclxuXHRcdFx0WzAsMCwwLDFdLFswLDEsMCwyXSxbMCwyLDAsM10sWzAsMywwLDRdLFswLDQsMCw1XSxcclxuXHRcdFx0WzAsNSwwLDZdLFswLDYsMCw3XSxbMCw3LDAsOF0sWzAsOCwwLDldLFswLDksMCwxMF0sXHJcblx0XHRcdFswLDAsMSwwXSxbMCwwLDEsMV0sWzAsNSwxLDVdLFswLDEwLDEsOV0sWzAsMTAsMSwxMF0sXHJcblx0XHRcdFsxLDAsMiwwXSxbMSwxLDIsMl0sWzEsNSwyLDVdLFsxLDksMiw4XSxbMSwxMCwyLDEwXSxcclxuXHRcdFx0WzIsMCwzLDBdLFsyLDIsMywzXSxbMiw1LDMsNF0sWzIsNSwzLDZdLFsyLDgsMyw3XSxbMiwxMCwzLDEwXSxcclxuXHRcdFx0WzMsMywzLDRdLFszLDYsMyw3XSxcclxuXHRcdFx0WzMsMCw0LDBdLFszLDMsNCwzXSxbMyw3LDQsN10sWzMsMTAsNCwxMF0sXHJcblx0XHRcdFs0LDAsNSwwXSxbNCwzLDUsMl0sWzQsNyw1LDhdLFs0LDEwLDUsMTBdLFxyXG5cdFx0XHRbNSwwLDUsMV0sWzUsMSw1LDJdLFs1LDIsNSwzXSxbNSwzLDUsNF0sWzUsNCw1LDVdLFxyXG5cdFx0XHRbNSw1LDUsNl0sWzUsNiw1LDddLFs1LDcsNSw4XSxbNSw4LDUsOV0sWzUsOSw1LDEwXSxcclxuXHRcdFx0WzUsMCw2LDBdLFs1LDIsNiwzXSxbNSw4LDYsN10sWzUsMTAsNiwxMF0sXHJcblx0XHRcdFs2LDAsNywwXSxbNiwzLDcsM10sWzYsNyw3LDddLFs2LDEwLDcsMTBdLFxyXG5cdFx0XHRbNywzLDcsNF0sWzcsNiw3LDddLFxyXG5cdFx0XHRbNywwLDgsMF0sWzcsMyw4LDJdLFs3LDQsOCw1XSxbNyw2LDgsNV0sWzcsNyw4LDhdLFs3LDEwLDgsMTBdLFxyXG5cdFx0XHRbOCwwLDksMF0sWzgsMiw5LDFdLFs4LDUsOSw1XSxbOCw4LDksOV0sWzgsMTAsOSwxMF0sXHJcblx0XHRcdFs5LDAsMTAsMF0sWzksMSwxMCwwXSxbOSw1LDEwLDVdLFs5LDksMTAsMTBdLFs5LDEwLDEwLDEwXSxcclxuXHRcdFx0WzEwLDAsMTAsMV0sWzEwLDEsMTAsMl0sWzEwLDIsMTAsM10sWzEwLDMsMTAsNF0sWzEwLDQsMTAsNV0sXHJcblx0XHRcdFsxMCw1LDEwLDZdLFsxMCw2LDEwLDddLFsxMCw3LDEwLDhdLFsxMCw4LDEwLDldLFsxMCw5LDEwLDEwXVxyXG5cdFx0XTtcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZWRnZS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR0aGlzLmFkaltlZGdlW2ldWzBdXVtlZGdlW2ldWzFdXS5wdXNoKFtlZGdlW2ldWzJdLCBlZGdlW2ldWzNdXSk7XHJcblx0XHRcdHRoaXMuYWRqW2VkZ2VbaV1bMl1dW2VkZ2VbaV1bM11dLnB1c2goW2VkZ2VbaV1bMF0sIGVkZ2VbaV1bMV1dKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdFxyXG5cdERmc0ZvclJvdXRlOiBmdW5jdGlvbihub3dwb3MsIG51bSwgdmlzLCByb3V0ZXMsIHJvdXRlKSB7XHJcblx0XHQvKlxyXG5cdFx0XHRub3dwb3PkuLrlvZPliY3mkJzntKLliLDnmoRjZWxs77yMbnVt5Li65Ymp5L2Z5q2l5pWwXHJcblx0XHRcdHJvdXRlczrot6/lvoTpm4blkIjvvIxyb3V0ZTrlvZPliY3miYDlnKjnmoTkuIDmnaHot6/lvoRcclxuXHRcdCovXHJcblx0XHR2YXIgY2VsbF9qcyA9IG5vd3Bvcy5nZXRDb21wb25lbnQoXCJDZWxsXCIpOyAvL+iOt+W+l2NlbGzoioLngrnnmoRqc+e7hOS7tu+8jOS7peS+v+iOt+W+l+e7hOS7tuS4reeahOWxnuaAp1xyXG5cdFx0dmFyIHggPSBjZWxsX2pzLm1hcHgsIHkgPSBjZWxsX2pzLm1hcHk7XHJcblx0XHRpZiAodmlzW3hdW3ldID09IDEpXHJcblx0XHRcdHJldHVybjtcclxuXHRcdHZpc1t4XVt5XSA9IDE7XHJcblx0XHRyb3V0ZS5wdXNoKG5vd3Bvcyk7XHJcblx0XHRpZiAobnVtID09IDApIHtcclxuXHRcdFx0dmFyIG5ld3JvdXRlID0gW107XHJcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgcm91dGUubGVuZ3RoOyBpKyspXHJcblx0XHRcdFx0bmV3cm91dGUucHVzaChyb3V0ZVtpXSk7XHJcblx0XHRcdHJvdXRlcy5wdXNoKG5ld3JvdXRlKTtcclxuXHRcdFx0cm91dGUucG9wKCk7XHJcblx0XHRcdHZpc1t4XVt5XSA9IDA7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5hZGpbeF1beV0ubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dGhpcy5EZnNGb3JSb3V0ZSh0aGlzLm1hcFt0aGlzLmFkalt4XVt5XVtpXVswXV1bdGhpcy5hZGpbeF1beV1baV1bMV1dLCBudW0tMSwgdmlzLCByb3V0ZXMsIHJvdXRlKTtcclxuXHRcdH1cclxuXHRcdHJvdXRlLnBvcCgpO1xyXG5cdFx0dmlzW3hdW3ldID0gMDtcclxuXHR9LFxyXG5cdFxyXG5cdGNob29zZVJvdXRlOiBmdW5jdGlvbigpIHtcclxuXHRcdC8v5q2k5Ye95pWw5LiL55qEdGhpc+aYr2NlbGwuanNcclxuXHRcdHZhciBwYXIgPSB0aGlzLm5vZGUucGFyZW50LmdldENvbXBvbmVudChcIkdldE1hcFwiKTtcclxuXHRcdHZhciByb3V0ZSA9IHBhci5yb3V0ZXNbdGhpcy5yb3V0ZUlkXTtcclxuXHRcdFxyXG5cdFx0LypcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgcm91dGUubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGNlbGxfanMgPSByb3V0ZVtpXS5nZXRDb21wb25lbnQoXCJDZWxsXCIpO1xyXG5cdFx0XHRjb25zb2xlLmxvZyhjZWxsX2pzLm1hcHgsIGNlbGxfanMubWFweSk7XHJcblx0XHR9XHJcblx0XHQqL1xyXG5cdFx0XHJcblx0XHQvL+WFs+mXreaJgOacieiKgueCueeahOebkeWQrFxyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAxMTsgaSsrKSB7XHJcblx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgMTE7IGorKykge1xyXG5cdFx0XHRcdGlmIChwYXIubWFwW2ldW2pdID09IG51bGwpXHJcblx0XHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0XHR2YXIgY2VsbF9qcyA9IHBhci5tYXBbaV1bal0uZ2V0Q29tcG9uZW50KFwiQ2VsbFwiKTtcclxuXHRcdFx0XHRpZiAoY2VsbF9qcy5pbk1vbml0b3IgPT0gMSkge1xyXG5cdFx0XHRcdFx0Y2VsbF9qcy5pbk1vbml0b3IgPSAwO1xyXG5cdFx0XHRcdFx0Y2VsbF9qcy5yZXNldENvbG9yKCk7XHJcblx0XHRcdFx0XHRjZWxsX2pzLnJvdXRlSWQgPSBudWxsO1xyXG5cdFx0XHRcdFx0Ly9cclxuXHRcdFx0XHRcdHBhci5tYXBbaV1bal0ub2ZmKFwibW91c2Vkb3duXCIsIHRoaXMuY2hvb3NlUm91dGUsIGNlbGxfanMpO1xyXG5cdFx0XHRcdFx0Ly90aGlzLm5vZGUub2ZmKFwibW91c2Vkb3duXCIsIHRoaXMuY2hvb3NlUm91dGUsIGNlbGxfanMpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHQvKlxyXG5cdFx05Y+R6YCB5LqL5Lu2XHJcblx0XHQqL1xyXG5cdFx0Y2MuZ2FtZS5lbWl0KCdyb3V0ZS1jaG9zZW4nLCByb3V0ZSk7XHJcblx0fSxcclxuXHRcclxuXHRvcGVuTW9uaXRvcjogZnVuY3Rpb24ocm91dGVzKSB7XHJcblx0XHQvL+Wvueavj+adoei3r+W+hOeahOe7iOeCueW8gOWQr+ebkeWQrFxyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCByb3V0ZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGNlbGwgPSByb3V0ZXNbaV1bcm91dGVzW2ldLmxlbmd0aC0xXTtcclxuXHRcdFx0dmFyIGNlbGxfanMgPSBjZWxsLmdldENvbXBvbmVudChcIkNlbGxcIik7XHJcblx0XHRcdGNlbGxfanMuaW5Nb25pdG9yID0gMTtcclxuXHRcdFx0Y2VsbF9qcy5zZXRDb2xvcigpO1xyXG5cdFx0XHRjZWxsX2pzLnJvdXRlSWQgPSBpO1xyXG5cdFx0XHRjZWxsLm9uKFwibW91c2Vkb3duXCIsIHRoaXMuY2hvb3NlUm91dGUsIGNlbGxfanMpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0XHJcblx0cG9zRW5hYmxlOiBmdW5jdGlvbihub3dwb3MsIG51bSkge1xyXG5cdFx0Ly9ub3dwb3PkuLpjZWxs57G75Z6L55qEbm9kZSwgbnVt5Li65Y+v56e75Yqo5q2l5pWwXHJcblx0XHQvL+i/lOWbnuS6jOe7tOaVsOe7hO+8jOesrOS6jOe7tOW6pueahOaVsOe7hOaYr+eUseiLpeW5smNlbGznsbvlnovnmoRub2Rl57uE5oiQXHJcblx0XHR2YXIgdmlzID0gW107IC8v5qCH6K6w5piv5ZCm57uP6L+HXHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IDExOyBpKyspIHtcclxuXHRcdFx0dmlzW2ldID0gW107XHJcblx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgMTE7IGorKykge1xyXG5cdFx0XHRcdHZpc1tpXVtqXSA9IDA7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHZhciByb3V0ZXMgPSBbXTtcclxuXHRcdHRoaXMuRGZzRm9yUm91dGUobm93cG9zLCBudW0sIHZpcywgcm91dGVzLCBbXSk7IC8v5pCc57Si6Lev5b6EXHJcblx0XHR0aGlzLnJvdXRlcyA9IHJvdXRlczsgLy/lsIblvpfliLDnmoTlpJrmnaHot6/lvoTkv53lrZhcclxuXHRcdHRoaXMub3Blbk1vbml0b3Iocm91dGVzKTsgLy/lr7nmr4/mnaHot6/lvoTnmoTnu4jngrnlvIDlkK/nm5HlkKxcclxuXHRcdHJldHVybiByb3V0ZXM7XHJcblx0fSxcclxuXHRcclxuICAgIG9uTG9hZCAoKSB7XHJcblx0XHR0aGlzLkdldENlbGwoKTsgLy/mnoTlu7pjZWxs55+p6Zi15Y2zbWFwXHJcblx0XHR0aGlzLkdldEVkZ2UoKTsgLy/lu7rovrlcclxuXHRcdGNvbnNvbGUubG9nKHRoaXMubmFtZStcIm9uTG9hZFwiKTtcclxuXHR9LFxyXG5cclxuICAgIHN0YXJ0ICgpIHtcclxuXHRcdFxyXG5cdFx0Ly90aGlzLnBvc0VuYWJsZSh0aGlzLm1hcFswXVswXSwgNSk7XHJcblx0XHRcclxuXHRcdFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcclxufSk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/NewScript.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '000f6jgaO5Fr6rBFlOCFLDj', 'NewScript');
// scripts/NewScript.js

"use strict";

// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
cc.Class({
  "extends": cc.Component,
  properties: {// foo: {
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
  // LIFE-CYCLE CALLBACKS:
  // onLoad () {},
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcTmV3U2NyaXB0LmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwic3RhcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRSxDQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWZRLEdBSFA7QUFxQkw7QUFFQTtBQUVBQyxFQUFBQSxLQXpCSyxtQkF5QkksQ0FFUixDQTNCSSxDQTZCTDs7QUE3QkssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gY2MuQ2xhc3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIC8vIGZvbzoge1xyXG4gICAgICAgIC8vICAgICAvLyBBVFRSSUJVVEVTOlxyXG4gICAgICAgIC8vICAgICBkZWZhdWx0OiBudWxsLCAgICAgICAgLy8gVGhlIGRlZmF1bHQgdmFsdWUgd2lsbCBiZSB1c2VkIG9ubHkgd2hlbiB0aGUgY29tcG9uZW50IGF0dGFjaGluZ1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdG8gYSBub2RlIGZvciB0aGUgZmlyc3QgdGltZVxyXG4gICAgICAgIC8vICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcclxuICAgICAgICAvLyAgICAgc2VyaWFsaXphYmxlOiB0cnVlLCAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcclxuICAgICAgICAvLyB9LFxyXG4gICAgICAgIC8vIGJhcjoge1xyXG4gICAgICAgIC8vICAgICBnZXQgKCkge1xyXG4gICAgICAgIC8vICAgICAgICAgcmV0dXJuIHRoaXMuX2JhcjtcclxuICAgICAgICAvLyAgICAgfSxcclxuICAgICAgICAvLyAgICAgc2V0ICh2YWx1ZSkge1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5fYmFyID0gdmFsdWU7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9LFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuXHJcbiAgICAvLyBvbkxvYWQgKCkge30sXHJcblxyXG4gICAgc3RhcnQgKCkge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge30sXHJcbn0pO1xyXG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/startUI.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e9de4KsUm5PGpvP6NWEjcA6', 'startUI');
// scripts/startUI.js

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
    startGameBtn: null,
    exitGameBtn: null
  },
  onLoad: function onLoad() {
    this.startGameBtn = cc.find('Canvas/startGame');
    this.exitGameBtn = cc.find('Canvas/exitBtn');
    console.log(this.startGameBtn);
  },
  start: function start() {},
  startGame: function startGame() {
    console.log('开始游戏');
    cc.director.loadScene("game");
  },
  exitGame: function exitGame() {
    console.log('退出游戏');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcc3RhcnRVSS5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInN0YXJ0R2FtZUJ0biIsImV4aXRHYW1lQnRuIiwib25Mb2FkIiwiZmluZCIsImNvbnNvbGUiLCJsb2ciLCJzdGFydCIsInN0YXJ0R2FtZSIsImRpcmVjdG9yIiwibG9hZFNjZW5lIiwiZXhpdEdhbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNUQyxJQUFBQSxZQUFZLEVBQUMsSUFESjtBQUVaQyxJQUFBQSxXQUFXLEVBQUM7QUFGQSxHQUhQO0FBT1JDLEVBQUFBLE1BUFEsb0JBT0E7QUFDUCxTQUFLRixZQUFMLEdBQWtCSixFQUFFLENBQUNPLElBQUgsQ0FBUSxrQkFBUixDQUFsQjtBQUNBLFNBQUtGLFdBQUwsR0FBaUJMLEVBQUUsQ0FBQ08sSUFBSCxDQUFRLGdCQUFSLENBQWpCO0FBQ0FDLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQUtMLFlBQWpCO0FBQ0EsR0FYTztBQVlMTSxFQUFBQSxLQVpLLG1CQVlJLENBRVIsQ0FkSTtBQWVSQyxFQUFBQSxTQUFTLEVBQUMscUJBQVU7QUFDbkJILElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLE1BQVo7QUFDQVQsSUFBQUEsRUFBRSxDQUFDWSxRQUFILENBQVlDLFNBQVosQ0FBc0IsTUFBdEI7QUFDQSxHQWxCTztBQW1CUkMsRUFBQUEsUUFBUSxFQUFDLG9CQUFVO0FBQ2xCTixJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxNQUFaO0FBQ0EsR0FyQk8sQ0FzQkw7O0FBdEJLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgIHN0YXJ0R2FtZUJ0bjpudWxsLFxyXG5cdCAgIGV4aXRHYW1lQnRuOm51bGwsXHJcbiAgICB9LFxyXG5cdG9uTG9hZCgpe1xyXG5cdFx0dGhpcy5zdGFydEdhbWVCdG49Y2MuZmluZCgnQ2FudmFzL3N0YXJ0R2FtZScpO1xyXG5cdFx0dGhpcy5leGl0R2FtZUJ0bj1jYy5maW5kKCdDYW52YXMvZXhpdEJ0bicpO1xyXG5cdFx0Y29uc29sZS5sb2codGhpcy5zdGFydEdhbWVCdG4pO1xyXG5cdH0sXHJcbiAgICBzdGFydCAoKSB7XHJcblxyXG4gICAgfSxcclxuXHRzdGFydEdhbWU6ZnVuY3Rpb24oKXtcclxuXHRcdGNvbnNvbGUubG9nKCflvIDlp4vmuLjmiI8nKTtcclxuXHRcdGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcImdhbWVcIik7XHJcblx0fSxcclxuXHRleGl0R2FtZTpmdW5jdGlvbigpe1xyXG5cdFx0Y29uc29sZS5sb2coJ+mAgOWHuua4uOaIjycpO1xyXG5cdH0sXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcclxufSk7XHJcbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/tipWindow.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '000f6jgaO5Fr6rBFlOCFLDj', 'tipWindow');
// scripts/tipWindow.js

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
    title: null,
    content: null,
    //内容
    btnOk: null //确认按钮

  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    this.title = this.node.getChildByName('title');
    this.content = this.node.getChildByName('content');
    this.btnOk = this.node.getChildByName('okBtn');
    this.node.active = false;
  },
  start: function start() {},
  hiddenMyself: function hiddenMyself() {
    console.log('xxx');
    console.log(this.node);
    this.node.actice = false;
    this.node.emit('roll-dice-done', '1');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcdGlwV2luZG93LmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwidGl0bGUiLCJjb250ZW50IiwiYnRuT2siLCJvbkxvYWQiLCJub2RlIiwiZ2V0Q2hpbGRCeU5hbWUiLCJhY3RpdmUiLCJzdGFydCIsImhpZGRlbk15c2VsZiIsImNvbnNvbGUiLCJsb2ciLCJhY3RpY2UiLCJlbWl0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsS0FBSyxFQUFDLElBREU7QUFFZEMsSUFBQUEsT0FBTyxFQUFDLElBRk07QUFFRDtBQUNiQyxJQUFBQSxLQUFLLEVBQUMsSUFIUSxDQUdIOztBQUhHLEdBSFA7QUFTTDtBQUVBQyxFQUFBQSxNQVhLLG9CQVdLO0FBQ1osU0FBS0gsS0FBTCxHQUFXLEtBQUtJLElBQUwsQ0FBVUMsY0FBVixDQUF5QixPQUF6QixDQUFYO0FBQ0EsU0FBS0osT0FBTCxHQUFhLEtBQUtHLElBQUwsQ0FBVUMsY0FBVixDQUF5QixTQUF6QixDQUFiO0FBQ0EsU0FBS0gsS0FBTCxHQUFXLEtBQUtFLElBQUwsQ0FBVUMsY0FBVixDQUF5QixPQUF6QixDQUFYO0FBQ0EsU0FBS0QsSUFBTCxDQUFVRSxNQUFWLEdBQW1CLEtBQW5CO0FBQ0EsR0FoQk87QUFrQkxDLEVBQUFBLEtBbEJLLG1CQWtCSSxDQUVSLENBcEJJO0FBcUJSQyxFQUFBQSxZQUFZLEVBQUMsd0JBQVU7QUFDdEJDLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQVo7QUFDQUQsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksS0FBS04sSUFBakI7QUFDQSxTQUFLQSxJQUFMLENBQVVPLE1BQVYsR0FBaUIsS0FBakI7QUFDQSxTQUFLUCxJQUFMLENBQVVRLElBQVYsQ0FBZSxnQkFBZixFQUFnQyxHQUFoQztBQUNBLEdBMUJPLENBMkJMOztBQTNCSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBjYy5DbGFzczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgdGl0bGU6bnVsbCxcclxuXHRcdGNvbnRlbnQ6bnVsbCwvL+WGheWuuVxyXG5cdFx0YnRuT2s6bnVsbCwvL+ehruiupOaMiemSrlxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG5cdFx0dGhpcy50aXRsZT10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3RpdGxlJyk7XHJcblx0XHR0aGlzLmNvbnRlbnQ9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdjb250ZW50Jyk7XHJcblx0XHR0aGlzLmJ0bk9rPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnb2tCdG4nKTtcclxuXHRcdHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuXHR9LFxyXG5cclxuICAgIHN0YXJ0ICgpIHtcclxuXHJcbiAgICB9LFxyXG5cdGhpZGRlbk15c2VsZjpmdW5jdGlvbigpe1xyXG5cdFx0Y29uc29sZS5sb2coJ3h4eCcpO1xyXG5cdFx0Y29uc29sZS5sb2codGhpcy5ub2RlKTtcclxuXHRcdHRoaXMubm9kZS5hY3RpY2U9ZmFsc2U7XHJcblx0XHR0aGlzLm5vZGUuZW1pdCgncm9sbC1kaWNlLWRvbmUnLCcxJyk7XHJcblx0fSxcclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxyXG59KTtcclxuIl19
//------QC-SOURCE-SPLIT------
