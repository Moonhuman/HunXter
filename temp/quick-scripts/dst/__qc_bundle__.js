
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
    msgBoxConent: null
  },
  updateUI: function updateUI() {//更新人物血量
  },
  onLoad: function onLoad() {
    //加载地图
    this.nowStep = 0;
    this.msgContent = cc.find('Canvas/msgBox/view/content/item'); //console.log(msgContent.getComponent(cc.Label));

    this.node.on('send-Msg', function (event, poster) {
      var name = '<color=#43CD80>' + poster + '</color>';

      if (poster == '系统') {
        name = '<color=#ff0000>' + poster + '</color>';
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
    this.InitialCard();
    this.initBgm();
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
            var step = randomNum(1, 6); //掷骰子，玩家步数

            this.node.emit('send-Msg', "获得骰子点数" + step, this.nowProperty.nickname);
            this.isWait = true;
            console.log(this.mapObj.posEnable(this.mapObj.map[this.nowProperty.posX][this.nowProperty.posY], step));
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
      text.getComponent(cc.Label).fontSize = 25;
      console.log(text.getComponent(cc.Label));
      text.setPosition(-100, -150); //设置行动值

      ctx = cc.find("mobilityBar/bar", nowPerson).getComponent(cc.Graphics);
      ctx.clear();
      ctx.strokeColor = cc.Color.GREEN;
      ctx.moveTo(-40, -180);
      ctx.lineTo(60, -180);
      ctx.lineWidth = 10;
      ctx.stroke();
      text = cc.find("mobilityBar/text", nowPerson);
      text.getComponent(cc.Label).fontSize = 25;
      console.log(text.getComponent(cc.Label));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2xvYmFsR2FtZS5qcyJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJnbG9iYWwiLCJwZXJzb25zIiwibm93VHVybiIsImlzT3ZlciIsImNhcmRub2RlIiwiYmdtIiwiYXVkaW8iLCJsb29wIiwidm9sdW1lIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJtYXBPYmoiLCJpbmRleCIsIm5vd1N0ZXAiLCJub3dQbGF5ZXIiLCJub3dQcm9wZXJ0eSIsImlzV2FpdCIsIm1zZ0JveENvbmVudCIsInVwZGF0ZVVJIiwib25Mb2FkIiwibXNnQ29udGVudCIsImZpbmQiLCJub2RlIiwib24iLCJldmVudCIsInBvc3RlciIsIm5hbWUiLCJnZXRDb21wb25lbnQiLCJSaWNoVGV4dCIsInN0cmluZyIsImhlaWdodCIsIlNjcm9sbFZpZXciLCJzY3JvbGxUb0JvdHRvbSIsIm1zZyIsImdhbWUiLCJlbWl0Iiwicm91dGUiLCJtb3ZlQnlSb3V0ZSIsIkluaXRpYWxDYXJkIiwiaW5pdEJnbSIsInN0YXJ0IiwiaW5pdFBlcnNvbnMiLCJ1cGRhdGUiLCJkdCIsImNvbnNvbGUiLCJsb2ciLCJuaWNrbmFtZSIsImdvRW5hYmxlZCIsInN0ZXAiLCJyYW5kb21OdW0iLCJwb3NFbmFibGUiLCJtYXAiLCJwb3NYIiwicG9zWSIsInR1cm4iLCJiaW5kQXZhdGFyIiwibW92ZTJQb3MiLCJpIiwibGVuZ3RoIiwibm93UGVyc29uIiwiY3R4IiwiR3JhcGhpY3MiLCJjbGVhciIsInN0cm9rZUNvbG9yIiwiQ29sb3IiLCJSRUQiLCJtb3ZlVG8iLCJsaW5lV2lkdGgiLCJsaW5lVG8iLCJzdHJva2UiLCJ0ZXh0IiwiTGFiZWwiLCJmb250U2l6ZSIsInNldFBvc2l0aW9uIiwiR1JFRU4iLCJsb2FkZXIiLCJsb2FkUmVzIiwiQXVkaW9DbGlwIiwiZXJyIiwiY2xpcCIsImF1ZGlvSUQiLCJhdWRpb0VuZ2luZSIsInBsYXkiLCJjYXJkTmFtZSIsInRvdENhcmROdW0iLCJBcnJheSIsIk5vZGUiLCJhZGRDb21wb25lbnQiLCJTcHJpdGUiLCJzcHJpdGVGcmFtZSIsIlNwcml0ZUZyYW1lIiwidXJsIiwicmF3IiwicHVzaCIsIm1pbk51bSIsIm1heE51bSIsImFyZ3VtZW50cyIsInBhcnNlSW50IiwiTWF0aCIsInJhbmRvbSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsTUFBTSxDQUFDQyxNQUFQLEdBQWM7QUFDYkMsRUFBQUEsT0FBTyxFQUFDLEVBREs7QUFFYkMsRUFBQUEsT0FBTyxFQUFDLENBRks7QUFFSDtBQUNWQyxFQUFBQSxNQUFNLEVBQUMsS0FITTtBQUliQyxFQUFBQSxRQUFRLEVBQUcsSUFKRTtBQUtiQyxFQUFBQSxHQUFHLEVBQUM7QUFDSEMsSUFBQUEsS0FBSyxFQUFDLElBREg7QUFFSEMsSUFBQUEsSUFBSSxFQUFDLElBRkY7QUFHSEMsSUFBQUEsTUFBTSxFQUFDO0FBSEo7QUFMUyxDQUFkO0FBV0FDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNkQyxJQUFBQSxNQUFNLEVBQUMsSUFETztBQUNGO0FBQ1paLElBQUFBLE9BQU8sRUFBQyxJQUZNO0FBRUQ7QUFDYmEsSUFBQUEsS0FBSyxFQUFDLENBSFE7QUFJZEMsSUFBQUEsT0FBTyxFQUFDLENBSk07QUFLZEMsSUFBQUEsU0FBUyxFQUFDLElBTEk7QUFNZEMsSUFBQUEsV0FBVyxFQUFDLElBTkU7QUFPZEMsSUFBQUEsTUFBTSxFQUFDLEtBUE87QUFRZEMsSUFBQUEsWUFBWSxFQUFDO0FBUkMsR0FIUDtBQWNMQyxFQUFBQSxRQUFRLEVBQUMsb0JBQVUsQ0FDckI7QUFDQSxHQWhCTztBQWtCTEMsRUFBQUEsTUFsQkssb0JBa0JLO0FBQ1o7QUFDQSxTQUFLTixPQUFMLEdBQWEsQ0FBYjtBQUNBLFNBQUtPLFVBQUwsR0FBZ0JiLEVBQUUsQ0FBQ2MsSUFBSCxDQUFRLGlDQUFSLENBQWhCLENB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bUI2QyxNQUFuQixFQUEwQkMsTUFBMUIsRUFBaUM7QUFDN0IsVUFBT0MsU0FBUyxDQUFDdEMsTUFBakI7QUFDSSxTQUFLLENBQUw7QUFDSSxhQUFPdUMsUUFBUSxDQUFDQyxJQUFJLENBQUNDLE1BQUwsS0FBY0wsTUFBZCxHQUFxQixDQUF0QixFQUF3QixFQUF4QixDQUFmO0FBQ0o7O0FBQ0EsU0FBSyxDQUFMO0FBQ0ksYUFBT0csUUFBUSxDQUFDQyxJQUFJLENBQUNDLE1BQUwsTUFBZUosTUFBTSxHQUFDRCxNQUFQLEdBQWMsQ0FBN0IsSUFBZ0NBLE1BQWpDLEVBQXdDLEVBQXhDLENBQWY7QUFDSjs7QUFDSTtBQUNJLGFBQU8sQ0FBUDtBQUNKO0FBVFI7QUFXSCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsid2luZG93Lmdsb2JhbD17XHJcblx0cGVyc29uczpbXSxcclxuXHRub3dUdXJuOjAsLy/lvZPliY3lm57lkIjmlbBcclxuXHRpc092ZXI6ZmFsc2UsXHJcblx0Y2FyZG5vZGUgOiBudWxsLFxyXG5cdGJnbTp7XHJcblx0XHRhdWRpbzpudWxsLFxyXG5cdFx0bG9vcDpudWxsLFxyXG5cdFx0dm9sdW1lOm51bGwsXHJcblx0fVxyXG59O1xyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG5cdFx0bWFwT2JqOm51bGwsLy/lnLDlm77lr7nosaFcclxuXHRcdHBlcnNvbnM6bnVsbCwvL+eOqeWutuS7rFxyXG5cdFx0aW5kZXg6MCxcclxuXHRcdG5vd1N0ZXA6MCxcclxuXHRcdG5vd1BsYXllcjpudWxsLFxyXG5cdFx0bm93UHJvcGVydHk6bnVsbCxcclxuXHRcdGlzV2FpdDpmYWxzZSxcclxuXHRcdG1zZ0JveENvbmVudDpudWxsLFxyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGVVSTpmdW5jdGlvbigpe1xyXG5cdFx0Ly/mm7TmlrDkurrnianooYDph49cclxuXHR9LFxyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcblx0XHQvL+WKoOi9veWcsOWbvlxyXG5cdFx0dGhpcy5ub3dTdGVwPTA7XHJcblx0XHR0aGlzLm1zZ0NvbnRlbnQ9Y2MuZmluZCgnQ2FudmFzL21zZ0JveC92aWV3L2NvbnRlbnQvaXRlbScpO1xyXG5cdFx0Ly9jb25zb2xlLmxvZyhtc2dDb250ZW50LmdldENvbXBvbmVudChjYy5MYWJlbCkpO1xyXG5cdFx0dGhpcy5ub2RlLm9uKCdzZW5kLU1zZycsZnVuY3Rpb24oZXZlbnQscG9zdGVyKXtcclxuXHRcdFx0dmFyIG5hbWU9Jzxjb2xvcj0jNDNDRDgwPicrcG9zdGVyKyc8L2NvbG9yPic7XHJcblx0XHRcdGlmIChwb3N0ZXI9PSfns7vnu58nKXtcclxuXHRcdFx0XHRuYW1lPSc8Y29sb3I9I2ZmMDAwMD4nK3Bvc3RlcisnPC9jb2xvcj4nO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMubXNnQ29udGVudC5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpLnN0cmluZys9bmFtZStcIjogXCIrZXZlbnQrJzxici8+JztcclxuXHRcdFx0Ly/lj6/og73pnIDopoHliqjmgIHmlLnlj5hjb250ZW505aSn5bCPXHJcblx0XHRcdFxyXG5cdFx0XHRjYy5maW5kKCdDYW52YXMvbXNnQm94L3ZpZXcvY29udGVudCcpLmhlaWdodD10aGlzLm1zZ0NvbnRlbnQuaGVpZ2h0KzEwO1xyXG5cdFx0XHRjYy5maW5kKCdDYW52YXMvbXNnQm94JykuZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpLnNjcm9sbFRvQm90dG9tKDAuMSk7XHJcblx0XHRcdC8vY29uc29sZS5sb2coJ0xhYmVsJyx0aGlzLm1zZ0NvbnRlbnQuaGVpZ2h0KTtcclxuXHRcdFx0IFxyXG5cdFx0fSx0aGlzKTtcclxuXHRcdFx0XHJcblx0XHR0aGlzLm5vZGUub24oJ3VwZGF0ZS1zdGF0ZScsIGZ1bmN0aW9uIChtc2cpIHtcclxuXHRcdFx0dGhpcy5ub3dTdGVwPSh0aGlzLm5vd1N0ZXArMSklNDtcclxuXHRcdFx0dGhpcy5pc1dhaXQ9ZmFsc2U7XHJcblx0XHRcdFxyXG5cdFx0fSx0aGlzKTtcclxuXHRcdGNjLmdhbWUub24oJ3N0ZXBPbkNlbGwtZG9uZScsIGZ1bmN0aW9uICggZXZlbnQgKSB7Ly/op6blj5Hnu5PmnZ9cclxuXHRcdFx0dGhpcy5ub2RlLmVtaXQoJ3VwZGF0ZS1zdGF0ZScsICcxJyk7Ly/mm7TmlrDnirbmgIFcclxuXHRcdFx0Ly9jb25zb2xlLmxvZyhcIuinpuWPkeS6hueJueauiuagvOWtkO+8gVwiKTtcclxuXHRcdH0sdGhpcyk7XHJcblx0XHRjYy5nYW1lLm9uKCdyb3V0ZS1jaG9zZW4nLCBmdW5jdGlvbihyb3V0ZSkgey8v55uR5ZCs546p5a626YCJ5oup5LqG5ZOq5p2h6Lev5b6EXHJcblx0XHRcdFx0XHQvL2NvbnNvbGUubG9nKCfngrnlh7vkuoYnLHJvdXRlKTtcclxuXHRcdFx0dGhpcy5ub3dQcm9wZXJ0eS5tb3ZlQnlSb3V0ZShyb3V0ZSk7XHJcblx0XHRcdFx0XHQvL3RoaXMubm9kZS5lbWl0KCd1cGRhdGUtc3RhdGUnLCAnMScpOy8v546p5a6256e75Yqo5a6M5oiQ77yM6L+b5YWl5LiL5LiA5q2l5pON5L2cXHJcblx0XHRcdFx0XHQvL+eOqeWutuWktOWDj+aMieeFp+i3r+W+hOenu+WKqFxyXG5cdFx0fSx0aGlzKTtcclxuXHRcdHRoaXMuSW5pdGlhbENhcmQoKTtcclxuXHRcdHRoaXMuaW5pdEJnbSgpO1xyXG5cdH0sXHJcblx0XHJcbiAgICBzdGFydCAoKSB7XHJcblx0XHQvL+WIneWni+WMluS6uueJqVxyXG5cdFx0dGhpcy5pbml0UGVyc29ucygpO1xyXG5cdFx0Ly/ojrflvpflnLDlm77lr7nosaFcclxuXHRcdHRoaXMubWFwT2JqPWNjLmZpbmQoJ0NhbnZhcy9tYXAnKS5nZXRDb21wb25lbnQoJ0dldE1hcCcpO1xyXG5cdFxyXG5cdFx0dGhpcy5ub3dQbGF5ZXI9d2luZG93Lmdsb2JhbC5wZXJzb25zW3RoaXMuaW5kZXhdO1xyXG5cdFx0XHJcblx0XHRcclxuXHRcdFxyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGUgKGR0KSB7XHJcblx0XHQvL+WIpOaWreW9k+WJjeWbnuWQiOaYr+WQpue7k+adn1xyXG5cdFx0XHJcblx0XHRjb25zb2xlLmxvZyhcIuaYr+WQpuetieW+heaTjeS9nFwiLHRoaXMuaXNXYWl0KTtcclxuXHRcdHN3aXRjaCAodGhpcy5ub3dTdGVwKXtcclxuXHRcdFx0Y2FzZSAwOnsvL+WIneWni+WMluWPmOmHj1xyXG5cdFx0XHRcdGlmICh0aGlzLmlzV2FpdCl7Ly/mraPlnKjmk43kvZzmiJbnrYnlvoXmk43kvZxcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQvL3RoaXMubm9kZS5lbWl0KCdzZW5kLU1zZycsJ+i/m+WFpeWbnuWQiCcrd2luZG93Lmdsb2JhbC5ub3dUdXJuLCfns7vnu58nKTtcclxuXHRcdFx0XHQvL2NvbnNvbGUubG9nKHRoaXMubm93UGxheWVyLm5hbWUpO1xyXG5cdFx0XHRcdHRoaXMubm93UHJvcGVydHk9dGhpcy5ub3dQbGF5ZXIuZ2V0Q29tcG9uZW50KCdQZXJzb24nKTsvL+iOt+W+l+eOqeWutuWxnuaAp+mbhuWQiFxyXG5cdFx0XHRcdHRoaXMubm9kZS5lbWl0KCdzZW5kLU1zZycsJ+i9ruWIsOinkuiJsicrdGhpcy5ub3dQcm9wZXJ0eS5uaWNrbmFtZSwn57O757ufJyk7XHJcblx0XHRcdFx0dGhpcy5ub2RlLmVtaXQoJ3VwZGF0ZS1zdGF0ZScsICcxJyk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdH1cclxuXHRcdFx0Y2FzZSAxOnsvL+eOqeWutuenu+WKqFxyXG5cdFx0XHRcdGlmICh0aGlzLmlzV2FpdCl7Ly/mraPlnKjmk43kvZzmiJbnrYnlvoXmk43kvZxcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRpZiAodGhpcy5ub3dQcm9wZXJ0eS5nb0VuYWJsZWQpey8v5Yik5pat546p5a625piv5ZCm5Y+v5Lul6KGM6LWwXHJcblx0XHRcdFx0XHR2YXIgc3RlcD1yYW5kb21OdW0oMSw2KTsvL+aOt+mqsOWtkO+8jOeOqeWutuatpeaVsFxyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHR0aGlzLm5vZGUuZW1pdCgnc2VuZC1Nc2cnLFwi6I635b6X6aqw5a2Q54K55pWwXCIrc3RlcCx0aGlzLm5vd1Byb3BlcnR5Lm5pY2tuYW1lKTtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0dGhpcy5pc1dhaXQ9dHJ1ZTtcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKHRoaXMubWFwT2JqLnBvc0VuYWJsZSh0aGlzLm1hcE9iai5tYXBbdGhpcy5ub3dQcm9wZXJ0eS5wb3NYXVt0aGlzLm5vd1Byb3BlcnR5LnBvc1ldLHN0ZXApKTtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNle1xyXG5cdFx0XHRcdFx0dGhpcy5ub3dQcm9wZXJ0eS5nb0VuYWJsZWQ9MTtcclxuXHRcdFx0XHRcdHRoaXMubm9kZS5lbWl0KCd1cGRhdGUtc3RhdGUnLCAnMScpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQgYnJlYWs7XHJcblx0XHRcdH1cclxuXHRcdFx0Y2FzZSAyOntcclxuXHRcdFx0XHQvL+WujOaIkOS6huS6i+S7tuinpuWPkeaIluiAheWNoeeJjOinpuWPkVxyXG5cdFx0XHRcdGlmICh0aGlzLmlzV2FpdCl7Ly/mraPlnKjmk43kvZzmiJbnrYnlvoXmk43kvZxcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRjb25zb2xlLmxvZyhcIuW9k+WJjeatpemqpO+8mlwiLHRoaXMubm93U3RlcCk7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coXCLnjqnlrrblh7rniYxcIik7XHJcblx0XHRcdFx0dGhpcy5ub2RlLmVtaXQoJ3VwZGF0ZS1zdGF0ZScsICcxJyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdH1cclxuXHRcdFx0Y2FzZSAzOntcclxuXHRcdFx0XHQvL2NvbnNvbGUubG9nKFwi5b2T5YmN5q2l6aqk77yaXCIsdGhpcy5ub3dTdGVwKTtcclxuXHRcdFx0XHQvL+W9k+WJjeeOqeWutueahOWbnuWQiOaVsC0xXHJcblx0XHRcdFx0dGhpcy5ub3dQcm9wZXJ0eS50dXJuLT0xO1xyXG5cdFx0XHRcdGlmICh0aGlzLm5vd1Byb3BlcnR5LnR1cm49PTApLy/lvZPliY3njqnlrrblm57lkIjmlbDkuLow77yM5bqU6K+l5YiH5o2i546p5a62XHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCLliIfmjaLop5LoibJcIik7XHJcblx0XHRcdFx0XHR0aGlzLm5vd1Byb3BlcnR5LnR1cm4rPTE7XHJcblx0XHRcdFx0XHR0aGlzLmluZGV4PSh0aGlzLmluZGV4KzEpJTQ7XHJcblx0XHRcdFx0XHR0aGlzLm5vd1BsYXllcj13aW5kb3cuZ2xvYmFsLnBlcnNvbnNbdGhpcy5pbmRleF07XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdHRoaXMubm9kZS5lbWl0KCd1cGRhdGUtc3RhdGUnLCAnMScpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRcclxuXHR9LFxyXG5cdGluaXRQZXJzb25zOmZ1bmN0aW9uKCl7XHJcblx0XHR3aW5kb3cuZ2xvYmFsLnBlcnNvbnNbMF0uZ2V0Q29tcG9uZW50KCdQZXJzb24nKS5iaW5kQXZhdGFyKGNjLmZpbmQoJ0NhbnZhcy9hdmF0YXIvYXZhdGFyMScpKTtcclxuXHRcdHdpbmRvdy5nbG9iYWwucGVyc29uc1sxXS5nZXRDb21wb25lbnQoJ1BlcnNvbicpLmJpbmRBdmF0YXIoY2MuZmluZCgnQ2FudmFzL2F2YXRhci9hdmF0YXIyJykpO1xyXG5cdFx0d2luZG93Lmdsb2JhbC5wZXJzb25zWzJdLmdldENvbXBvbmVudCgnUGVyc29uJykuYmluZEF2YXRhcihjYy5maW5kKCdDYW52YXMvYXZhdGFyL2F2YXRhcjMnKSk7XHJcblx0XHR3aW5kb3cuZ2xvYmFsLnBlcnNvbnNbM10uZ2V0Q29tcG9uZW50KCdQZXJzb24nKS5iaW5kQXZhdGFyKGNjLmZpbmQoJ0NhbnZhcy9hdmF0YXIvYXZhdGFyNCcpKTtcclxuXHRcdHdpbmRvdy5nbG9iYWwucGVyc29uc1swXS5nZXRDb21wb25lbnQoJ1BlcnNvbicpLm5pY2tuYW1lPSfogIHlj58nO1xyXG5cdFx0d2luZG93Lmdsb2JhbC5wZXJzb25zWzFdLmdldENvbXBvbmVudCgnUGVyc29uJykubmlja25hbWU9J+WwkeWmhyc7XHJcblx0XHR3aW5kb3cuZ2xvYmFsLnBlcnNvbnNbMl0uZ2V0Q29tcG9uZW50KCdQZXJzb24nKS5uaWNrbmFtZT0n5a+M5ZWGJztcclxuXHRcdHdpbmRvdy5nbG9iYWwucGVyc29uc1szXS5nZXRDb21wb25lbnQoJ1BlcnNvbicpLm5pY2tuYW1lPSflsI/lpbMnO1xyXG5cdFx0Ly/liJ3lp4vljJblm5vkuKrnjqnlrrbkvY3nva5cclxuXHRcdC8vY29uc29sZS5sb2codGhpcy5tYXBPYmoubWFwWzBdWzBdLmdldFBvc2l0aW9uKCkpO1xyXG5cdFx0d2luZG93Lmdsb2JhbC5wZXJzb25zWzBdLmdldENvbXBvbmVudCgnUGVyc29uJykubW92ZTJQb3MoMCwwKTtcclxuXHRcdHdpbmRvdy5nbG9iYWwucGVyc29uc1sxXS5nZXRDb21wb25lbnQoJ1BlcnNvbicpLm1vdmUyUG9zKDEwLDEwKTtcclxuXHRcdHdpbmRvdy5nbG9iYWwucGVyc29uc1syXS5nZXRDb21wb25lbnQoJ1BlcnNvbicpLm1vdmUyUG9zKDAsMTApO1xyXG5cdFx0d2luZG93Lmdsb2JhbC5wZXJzb25zWzNdLmdldENvbXBvbmVudCgnUGVyc29uJykubW92ZTJQb3MoMTAsMCk7XHJcblx0XHRmb3IgKHZhciBpPTA7aTx3aW5kb3cuZ2xvYmFsLnBlcnNvbnMubGVuZ3RoO2krKyl7XHJcblx0XHRcdHZhciBub3dQZXJzb249d2luZG93Lmdsb2JhbC5wZXJzb25zW2ldO1xyXG5cdFx0XHR2YXIgY3R4PWNjLmZpbmQoXCJibG9vZEJhci9iYXJcIiwgbm93UGVyc29uKS5nZXRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG5cdFx0XHRjdHguY2xlYXIoKTtcclxuXHRcdFx0Y3R4LnN0cm9rZUNvbG9yID0gY2MuQ29sb3IuUkVEO1xyXG5cdFx0XHRjdHgubW92ZVRvKC00MCwgLTE1MCk7XHJcblx0XHRcdGN0eC5saW5lV2lkdGg9MTA7XHJcblx0XHRcdGN0eC5saW5lVG8oNjAsIC0xNTApO1xyXG5cdFx0XHRjdHguc3Ryb2tlKCk7ICAgXHJcblx0XHRcdHZhciB0ZXh0PWNjLmZpbmQoXCJibG9vZEJhci90ZXh0XCIsIG5vd1BlcnNvbik7XHJcblx0XHRcdHRleHQuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5mb250U2l6ZT0yNTtcclxuXHRcdFx0Y29uc29sZS5sb2codGV4dC5nZXRDb21wb25lbnQoY2MuTGFiZWwpKTtcclxuXHRcdFx0dGV4dC5zZXRQb3NpdGlvbigtMTAwLC0xNTApO1xyXG5cdFx0XHRcclxuXHRcdFx0Ly/orr7nva7ooYzliqjlgLxcclxuXHRcdFx0Y3R4PWNjLmZpbmQoXCJtb2JpbGl0eUJhci9iYXJcIiwgbm93UGVyc29uKS5nZXRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG5cdFx0XHRjdHguY2xlYXIoKTtcclxuXHRcdFx0Y3R4LnN0cm9rZUNvbG9yID0gY2MuQ29sb3IuR1JFRU47XHJcblx0XHRcdGN0eC5tb3ZlVG8oLTQwLCAtMTgwKTtcclxuXHRcdFx0Y3R4LmxpbmVUbyg2MCwgLTE4MCk7XHJcblx0XHRcdGN0eC5saW5lV2lkdGg9MTA7XHJcblx0XHRcdGN0eC5zdHJva2UoKTsgIFxyXG5cdFx0XHR0ZXh0PWNjLmZpbmQoXCJtb2JpbGl0eUJhci90ZXh0XCIsIG5vd1BlcnNvbik7XHJcblx0XHRcdHRleHQuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5mb250U2l6ZT0yNTtcclxuXHRcdFx0Y29uc29sZS5sb2codGV4dC5nZXRDb21wb25lbnQoY2MuTGFiZWwpKTtcclxuXHRcdFx0dGV4dC5zZXRQb3NpdGlvbigtMTAwLC0yMDApO1x0XHRcdFxyXG5cdFx0fVxyXG5cdH0sXHJcblx0aW5pdEJnbTpmdW5jdGlvbigpe1xyXG5cdFx0Y2MubG9hZGVyLmxvYWRSZXMoJ2JnbS/lpKnnqbrkuYvln47pkqLnkLTmm7InLCBjYy5BdWRpb0NsaXAsIGZ1bmN0aW9uIChlcnIsIGNsaXApIHtcclxuXHRcdFx0dmFyIGF1ZGlvSUQgPSBjYy5hdWRpb0VuZ2luZS5wbGF5KGNsaXAsIHRydWUsIDAuNSk7XHJcblx0XHR9KTtcclxuXHR9LFxyXG5cdEluaXRpYWxDYXJkOiBmdW5jdGlvbigpIHtcclxuXHRcdHZhciBjYXJkTmFtZSA9IFsn54K45by5Jywn57K+5YeG5a+85by5Jywn5Zyw6Zu3Jywn5bqH5oqkJywn5aSp5L2/55qE5bqH5oqkJywn5oiY56We55qE56Wd56aPJywn6Jma5byxJywn5Zui6Zif55qE5Yqb6YePJyxcclxuXHRcdFx0XHRcdFx0XHQn5rK75oSIJywn5Zyj5YWJ5pmu54WnJywn5pyb6L+c6ZWcJywn55y8552bJywn54yb55S355qE56Wd56aPJywn55uX5Y+WJywn5p2f57yaJywn6L+35oORJywn5ouv5pWRJ107XHJcblx0XHR2YXIgdG90Q2FyZE51bSA9IDE3O1xyXG5cdFx0d2luZG93Lmdsb2JhbC5jYXJkbm9kZSA9IG5ldyBBcnJheSgpO1xyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0b3RDYXJkTnVtOyBpKyspIHtcclxuXHRcdFx0dmFyIG5vZGUgPSBuZXcgY2MuTm9kZShjYXJkTmFtZVtpXSk7XHJcblx0XHRcdG5vZGUuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSk7XHJcblx0XHRcdG5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBuZXcgY2MuU3ByaXRlRnJhbWUoY2MudXJsLnJhdygncmVzb3VyY2VzL+WNoeeJjOWbvueJhy8nK2NhcmROYW1lW2ldKycuanBnJykpO1xyXG5cdFx0XHR3aW5kb3cuZ2xvYmFsLmNhcmRub2RlLnB1c2gobm9kZSk7XHJcblx0XHR9XHJcblx0XHR0aGlzLmluaXRCZ20oKTtcclxuXHR9LFxyXG59KTtcclxuXHJcblxyXG4vL+eUn+aIkOS7jm1pbk51beWIsG1heE51beeahOmaj+acuuaVsFxyXG5mdW5jdGlvbiByYW5kb21OdW0obWluTnVtLG1heE51bSl7IFxyXG4gICAgc3dpdGNoKGFyZ3VtZW50cy5sZW5ndGgpeyBcclxuICAgICAgICBjYXNlIDE6IFxyXG4gICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQoTWF0aC5yYW5kb20oKSptaW5OdW0rMSwxMCk7IFxyXG4gICAgICAgIGJyZWFrOyBcclxuICAgICAgICBjYXNlIDI6IFxyXG4gICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQoTWF0aC5yYW5kb20oKSoobWF4TnVtLW1pbk51bSsxKSttaW5OdW0sMTApOyBcclxuICAgICAgICBicmVhazsgXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7IFxyXG4gICAgICAgICAgICBicmVhazsgXHJcbiAgICB9IFxyXG59ICJdfQ==
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
cc._RF.push(module, 'e9de4KsUm5PGpvP6NWEjcA6', 'NewScript');
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
