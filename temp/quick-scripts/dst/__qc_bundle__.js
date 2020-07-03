
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
require('./assets/scripts/AI');
require('./assets/scripts/Buff');
require('./assets/scripts/Card');
require('./assets/scripts/Cell');
require('./assets/scripts/Deck');
require('./assets/scripts/GetMap');
require('./assets/scripts/Mist');
require('./assets/scripts/Person');
require('./assets/scripts/SpriteIndex');
require('./assets/scripts/Tips');
require('./assets/scripts/globalGame');
require('./assets/scripts/startUI');
require('./assets/scripts/tabWin');
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
  end_card_btn_func: function end_card_btn_func() {
    cc.game.emit('update-state', '1');
    cc.find("Canvas/end_card_btn").active = false;
    window.global.card_end_btn_showed = 0;
  },
  updateUI: function updateUI() {//更新人物血量
  },
  onKeyDown: function onKeyDown(event) {
    //键盘按下
    console.log(event);

    switch (event.keyCode) {
      case 9:
        {
          //按下tab
          var tab = cc.find('Canvas/Tab');
          tab.active = true;
          tab.getComponent('tabWin').showTab();
          break;
        }
    }
  },
  onKeyUp: function onKeyUp(event) {
    //键盘释放
    switch (event.keyCode) {
      case 9:
        {
          //释放tab
          var tab = cc.find('Canvas/Tab');
          tab.active = false; //console.log('Press a key');

          break;
        }
    }
  },
  onLoad: function onLoad() {
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this); //加载地图

    this.nowStep = 0;
    this.msgContent = cc.find('Canvas/msgBox/view/content/item'); //console.log(msgContent.getComponent(cc.Label));

    cc.game.on('send-Msg', function (event, poster) {
      if (event == '') {
        return;
      }

      var timeStr = '';
      if (parseInt(this.time / 60) < 10) timeStr += "0";
      timeStr += parseInt(this.time / 60) + ":";
      if (this.time - parseInt(this.time / 60) * 60 < 10) timeStr += "0";
      timeStr += this.time - parseInt(this.time / 60) * 60;
      var name = '<color=#43CD80>(' + timeStr + ')' + poster + '</color>';
      ;

      if (poster == '系统') {
        name = '<color=#ff0000>(' + timeStr + ')' + poster + '</color>';
      }

      this.msgContent.getComponent(cc.RichText).string += name + ": " + event + '<br/>'; //可能需要动态改变content大小

      cc.find('Canvas/msgBox/view/content').height = this.msgContent.height + 10;
      cc.find('Canvas/msgBox').getComponent(cc.ScrollView).scrollToBottom(0.1); //console.log('Label',this.msgContent.height);
    }, this);
    cc.game.on('update-state', function (msg) {
      this.nowStep = (this.nowStep + 1) % 5;
      this.isWait = false;
    }, this);
    cc.game.on('stepOnCell-done', function (event) {
      //触发结束
      cc.game.emit('update-state', '1'); //更新状态

      console.log(event);
      cc.game.emit('send-Msg', event, this.nowProperty.nickname);
    }, this);
    cc.game.on('route-chosen', function (route) {
      //监听玩家选择了哪条路径
      //console.log('点击了',route);
      this.nowProperty.moveByRoute(route); //this.node.emit('update-state', '1');//玩家移动完成，进入下一步操作
      //玩家头像按照路径移动
    }, this);
    cc.game.on('roll-dice-done', function (step) {
      cc.game.emit('send-Msg', "获得骰子点数" + step, this.nowProperty.nickname);
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
    cc.game.emit('send-Msg', '好戏开场了!', '系统');
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
          }

          if (this.index == 0) {
            window.global.nowTurn += 1;

            for (var i = 0; i < window.global.persons.length; i++) {
              var property = window.global.persons[i].getComponent('Person');

              if (property.isDead == 0) {
                property.mobility += 2;
              }
            }
          }

          var buff = this.node.getComponent('Buff');

          for (var i = 0; i < buff.todoList.length; i++) {
            if (buff.todoList[i].endTurn == window.global.nowTurn) {
              if (buff.todoList[i].act()) {
                buff.todoList.splice(i, 1);
              }
            }
          }

          this.nowProperty = this.nowPlayer.getComponent('Person'); //获得玩家属性集合

          cc.game.emit('send-Msg', '轮到角色' + this.nowProperty.nickname, '系统');
          cc.game.emit('update-state', '1');
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
            var tip = cc.find('Canvas/tipWin');
            if (this.nowProperty.nickname == '老叟') tip.getComponent('tipWindow').startRollDice();else {
              var dice = cc.find('Canvas/tipWin/dice').getComponent('SpriteIndex');
              dice.next();
              cc.game.emit('roll-dice-done', dice.index + 1);
            }
            this.isWait = true;
          } else {
            this.nowProperty.goEnabled = 1;
            cc.game.emit('update-state', '1');
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
          cc.game.emit('update-state', '1');
          break;
        }

      case 3:
        {
          //等待玩家出牌并结束
          if (this.nowProperty.useCardEnabled == 1) {
            //可以出牌
            if (this.nowPlayer.name == 'Person1') {
              if (window.global.card_end_btn_showed != 1) {
                var btn = cc.find('Canvas/end_card_btn');
                btn.active = true;
                window.global.card_end_btn_showed = 1;
              }
            } else {
              cc.find('Canvas').getComponent('AI').aiUseCard(this.nowProperty);
              cc.game.emit('update-state', '1');
            }
          } else {
            this.nowProperty.useCardEnabled = 1;
            cc.game.emit('update-state', '1');
          }

          break;
        }

      case 4:
        {
          //这里原本是case:3
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

          cc.game.emit('update-state', '1');
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
      var audioID = cc.audioEngine.play(clip, true, 0.1);
    });
  },
  InitialCard: function InitialCard() {
    var cardName = ['炸弹', '精准导弹', '地雷', '庇护', '天使的庇护', '战神的祝福', '虚弱', '团队的力量', '治愈', '圣光普照', '望远镜', '眼睛', '猛男的祝福', '盗取', '束缚', '迷惑', '拯救'];
    var totCardNum = 17;
    window.global.cardnode = new Array();

    for (var i = 0; i < totCardNum; i++) {
      var node = new cc.Node(cardName[i]);
      node.addComponent(cc.Sprite);
      node.cardName = cardName[i];
      cc.loader.loadRes('卡牌图片/' + node.cardName, cc.SpriteFrame, function (err, spriteFrame) {
        this.getComponent(cc.Sprite).spriteFrame = spriteFrame;
      }.bind(node));
      window.global.cardnode.push(node);
    } //隐藏结束按钮


    cc.find('Canvas/end_card_btn').active = false; //隐藏选牌确定按钮

    cc.find('Canvas/choose_card_confirm').active = false; //隐藏选牌取消按钮

    cc.find('Canvas/choose_card_cancel').active = false; //初始化BGM

    this.initBgm();
  },
  openMenu: function openMenu() {
    cc.game.end();
    console.log('开始游戏');
    cc.director.loadScene("开始界面");
  }
}); //生成从minNum到maxNum的随机数

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2xvYmFsR2FtZS5qcyJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJnbG9iYWwiLCJwZXJzb25zIiwibm93VHVybiIsImlzT3ZlciIsImNhcmRub2RlIiwiYmdtIiwiYXVkaW8iLCJsb29wIiwidm9sdW1lIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJtYXBPYmoiLCJpbmRleCIsIm5vd1N0ZXAiLCJub3dQbGF5ZXIiLCJub3dQcm9wZXJ0eSIsImlzV2FpdCIsIm1zZ0JveENvbmVudCIsInRpbWUiLCJlbmRfY2FyZF9idG5fZnVuYyIsImdhbWUiLCJlbWl0IiwiZmluZCIsImFjdGl2ZSIsImNhcmRfZW5kX2J0bl9zaG93ZWQiLCJ1cGRhdGVVSSIsIm9uS2V5RG93biIsImV2ZW50IiwiY29uc29sZSIsImxvZyIsImtleUNvZGUiLCJ0YWIiLCJnZXRDb21wb25lbnQiLCJzaG93VGFiIiwib25LZXlVcCIsIm9uTG9hZCIsInN5c3RlbUV2ZW50Iiwib24iLCJTeXN0ZW1FdmVudCIsIkV2ZW50VHlwZSIsIktFWV9ET1dOIiwiS0VZX1VQIiwibXNnQ29udGVudCIsInBvc3RlciIsInRpbWVTdHIiLCJwYXJzZUludCIsIm5hbWUiLCJSaWNoVGV4dCIsInN0cmluZyIsImhlaWdodCIsIlNjcm9sbFZpZXciLCJzY3JvbGxUb0JvdHRvbSIsIm1zZyIsIm5pY2tuYW1lIiwicm91dGUiLCJtb3ZlQnlSb3V0ZSIsInN0ZXAiLCJwb3NFbmFibGUiLCJtYXAiLCJwb3NYIiwicG9zWSIsIkluaXRpYWxDYXJkIiwiaW5pdEJnbSIsIkxhYmVsIiwic2NoZWR1bGUiLCJzdGFydCIsImluaXRQZXJzb25zIiwidXBkYXRlIiwiZHQiLCJpIiwibGVuZ3RoIiwicHJvcGVydHkiLCJpc0RlYWQiLCJtb2JpbGl0eSIsImJ1ZmYiLCJub2RlIiwidG9kb0xpc3QiLCJlbmRUdXJuIiwiYWN0Iiwic3BsaWNlIiwiZ29FbmFibGVkIiwidGlwIiwic3RhcnRSb2xsRGljZSIsImRpY2UiLCJuZXh0IiwidXNlQ2FyZEVuYWJsZWQiLCJidG4iLCJhaVVzZUNhcmQiLCJ0dXJuIiwiYmluZEF2YXRhciIsIm1vdmUyUG9zIiwibm93UGVyc29uIiwiY3R4IiwiR3JhcGhpY3MiLCJjbGVhciIsInN0cm9rZUNvbG9yIiwiQ29sb3IiLCJSRUQiLCJtb3ZlVG8iLCJsaW5lV2lkdGgiLCJsaW5lVG8iLCJzdHJva2UiLCJ0ZXh0IiwiZm9udFNpemUiLCJzZXRQb3NpdGlvbiIsIkdSRUVOIiwibG9hZGVyIiwibG9hZFJlcyIsIkF1ZGlvQ2xpcCIsImVyciIsImNsaXAiLCJhdWRpb0lEIiwiYXVkaW9FbmdpbmUiLCJwbGF5IiwiY2FyZE5hbWUiLCJ0b3RDYXJkTnVtIiwiQXJyYXkiLCJOb2RlIiwiYWRkQ29tcG9uZW50IiwiU3ByaXRlIiwiU3ByaXRlRnJhbWUiLCJzcHJpdGVGcmFtZSIsImJpbmQiLCJwdXNoIiwib3Blbk1lbnUiLCJlbmQiLCJkaXJlY3RvciIsImxvYWRTY2VuZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsTUFBTSxDQUFDQyxNQUFQLEdBQWM7QUFDYkMsRUFBQUEsT0FBTyxFQUFDLEVBREs7QUFFYkMsRUFBQUEsT0FBTyxFQUFDLENBRks7QUFFSDtBQUNWQyxFQUFBQSxNQUFNLEVBQUMsS0FITTtBQUliQyxFQUFBQSxRQUFRLEVBQUcsSUFKRTtBQUtiQyxFQUFBQSxHQUFHLEVBQUM7QUFDSEMsSUFBQUEsS0FBSyxFQUFDLElBREg7QUFFSEMsSUFBQUEsSUFBSSxFQUFDLElBRkY7QUFHSEMsSUFBQUEsTUFBTSxFQUFDO0FBSEo7QUFMUyxDQUFkO0FBV0FDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNkQyxJQUFBQSxNQUFNLEVBQUMsSUFETztBQUNGO0FBQ1paLElBQUFBLE9BQU8sRUFBQyxJQUZNO0FBRUQ7QUFDYmEsSUFBQUEsS0FBSyxFQUFDLENBSFE7QUFJZEMsSUFBQUEsT0FBTyxFQUFDLENBSk07QUFLZEMsSUFBQUEsU0FBUyxFQUFDLElBTEk7QUFNZEMsSUFBQUEsV0FBVyxFQUFDLElBTkU7QUFPZEMsSUFBQUEsTUFBTSxFQUFDLEtBUE87QUFRZEMsSUFBQUEsWUFBWSxFQUFDLElBUkM7QUFTZEMsSUFBQUEsSUFBSSxFQUFDO0FBVFMsR0FIUDtBQWVSQyxFQUFBQSxpQkFBaUIsRUFBQyw2QkFBVztBQUM1QlosSUFBQUEsRUFBRSxDQUFDYSxJQUFILENBQVFDLElBQVIsQ0FBYSxjQUFiLEVBQTZCLEdBQTdCO0FBQ0FkLElBQUFBLEVBQUUsQ0FBQ2UsSUFBSCxDQUFRLHFCQUFSLEVBQStCQyxNQUEvQixHQUF3QyxLQUF4QztBQUNBMUIsSUFBQUEsTUFBTSxDQUFDQyxNQUFQLENBQWMwQixtQkFBZCxHQUFvQyxDQUFwQztBQUNBLEdBbkJPO0FBcUJMQyxFQUFBQSxRQUFRLEVBQUMsb0JBQVUsQ0FDckI7QUFDQSxHQXZCTztBQXdCUkMsRUFBQUEsU0FBUyxFQUFFLG1CQUFVQyxLQUFWLEVBQWlCO0FBQUM7QUFDNUJDLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZRixLQUFaOztBQUNNLFlBQU9BLEtBQUssQ0FBQ0csT0FBYjtBQUNJLFdBQUssQ0FBTDtBQUNUO0FBQUM7QUFDQSxjQUFJQyxHQUFHLEdBQUN4QixFQUFFLENBQUNlLElBQUgsQ0FBUSxZQUFSLENBQVI7QUFDQVMsVUFBQUEsR0FBRyxDQUFDUixNQUFKLEdBQVcsSUFBWDtBQUNBUSxVQUFBQSxHQUFHLENBQUNDLFlBQUosQ0FBaUIsUUFBakIsRUFBMkJDLE9BQTNCO0FBRVk7QUFDWjtBQVJJO0FBVUgsR0FwQ0k7QUFzQ0xDLEVBQUFBLE9BQU8sRUFBRSxpQkFBVVAsS0FBVixFQUFpQjtBQUFDO0FBQ3ZCLFlBQU9BLEtBQUssQ0FBQ0csT0FBYjtBQUNJLFdBQUssQ0FBTDtBQUNDO0FBQUM7QUFDVixjQUFJQyxHQUFHLEdBQUN4QixFQUFFLENBQUNlLElBQUgsQ0FBUSxZQUFSLENBQVI7QUFDQVMsVUFBQUEsR0FBRyxDQUFDUixNQUFKLEdBQVcsS0FBWCxDQUZTLENBR1Q7O0FBQ1k7QUFDWjtBQVBJO0FBU0gsR0FoREk7QUFpRExZLEVBQUFBLE1BakRLLG9CQWlESztBQUNaNUIsSUFBQUEsRUFBRSxDQUFDNkIsV0FBSCxDQUFlQyxFQUFmLENBQWtCOUIsRUFBRSxDQUFDK0IsV0FBSCxDQUFlQyxTQUFmLENBQXlCQyxRQUEzQyxFQUFxRCxLQUFLZCxTQUExRCxFQUFxRSxJQUFyRTtBQUNNbkIsSUFBQUEsRUFBRSxDQUFDNkIsV0FBSCxDQUFlQyxFQUFmLENBQWtCOUIsRUFBRSxDQUFDK0IsV0FBSCxDQUFlQyxTQUFmLENBQXlCRSxNQUEzQyxFQUFtRCxLQUFLUCxPQUF4RCxFQUFpRSxJQUFqRSxFQUZNLENBR1o7O0FBQ0EsU0FBS3JCLE9BQUwsR0FBYSxDQUFiO0FBQ0EsU0FBSzZCLFVBQUwsR0FBZ0JuQyxFQUFFLENBQUNlLElBQUgsQ0FBUSxpQ0FBUixDQUFoQixDQUxZLENBTVo7O0FBQ0FmLElBQUFBLEVBQUUsQ0FBQ2EsSUFBSCxDQUFRaUIsRUFBUixDQUFXLFVBQVgsRUFBc0IsVUFBU1YsS0FBVCxFQUFlZ0IsTUFBZixFQUFzQjtBQUMzQyxVQUFJaEIsS0FBSyxJQUFFLEVBQVgsRUFBYztBQUNiO0FBQ0E7O0FBQ0QsVUFBSWlCLE9BQU8sR0FBQyxFQUFaO0FBQ0EsVUFBSUMsUUFBUSxDQUFDLEtBQUszQixJQUFMLEdBQVUsRUFBWCxDQUFSLEdBQXVCLEVBQTNCLEVBQ0MwQixPQUFPLElBQUUsR0FBVDtBQUNEQSxNQUFBQSxPQUFPLElBQUVDLFFBQVEsQ0FBQyxLQUFLM0IsSUFBTCxHQUFVLEVBQVgsQ0FBUixHQUF1QixHQUFoQztBQUNBLFVBQUksS0FBS0EsSUFBTCxHQUFVMkIsUUFBUSxDQUFDLEtBQUszQixJQUFMLEdBQVUsRUFBWCxDQUFSLEdBQXVCLEVBQWpDLEdBQW9DLEVBQXhDLEVBQ0MwQixPQUFPLElBQUUsR0FBVDtBQUNEQSxNQUFBQSxPQUFPLElBQUcsS0FBSzFCLElBQUwsR0FBVTJCLFFBQVEsQ0FBQyxLQUFLM0IsSUFBTCxHQUFVLEVBQVgsQ0FBUixHQUF1QixFQUEzQztBQUVBLFVBQUk0QixJQUFJLEdBQUMscUJBQW1CRixPQUFuQixHQUEyQixHQUEzQixHQUErQkQsTUFBL0IsR0FBc0MsVUFBL0M7QUFBMEQ7O0FBQzFELFVBQUlBLE1BQU0sSUFBRSxJQUFaLEVBQWlCO0FBQ2hCRyxRQUFBQSxJQUFJLEdBQUMscUJBQW1CRixPQUFuQixHQUEyQixHQUEzQixHQUErQkQsTUFBL0IsR0FBc0MsVUFBM0M7QUFDQTs7QUFDRCxXQUFLRCxVQUFMLENBQWdCVixZQUFoQixDQUE2QnpCLEVBQUUsQ0FBQ3dDLFFBQWhDLEVBQTBDQyxNQUExQyxJQUFrREYsSUFBSSxHQUFDLElBQUwsR0FBVW5CLEtBQVYsR0FBZ0IsT0FBbEUsQ0FoQjJDLENBaUIzQzs7QUFFQXBCLE1BQUFBLEVBQUUsQ0FBQ2UsSUFBSCxDQUFRLDRCQUFSLEVBQXNDMkIsTUFBdEMsR0FBNkMsS0FBS1AsVUFBTCxDQUFnQk8sTUFBaEIsR0FBdUIsRUFBcEU7QUFDQTFDLE1BQUFBLEVBQUUsQ0FBQ2UsSUFBSCxDQUFRLGVBQVIsRUFBeUJVLFlBQXpCLENBQXNDekIsRUFBRSxDQUFDMkMsVUFBekMsRUFBcURDLGNBQXJELENBQW9FLEdBQXBFLEVBcEIyQyxDQXFCM0M7QUFFQSxLQXZCRCxFQXVCRSxJQXZCRjtBQXlCQTVDLElBQUFBLEVBQUUsQ0FBQ2EsSUFBSCxDQUFRaUIsRUFBUixDQUFXLGNBQVgsRUFBMkIsVUFBVWUsR0FBVixFQUFlO0FBQ3pDLFdBQUt2QyxPQUFMLEdBQWEsQ0FBQyxLQUFLQSxPQUFMLEdBQWEsQ0FBZCxJQUFpQixDQUE5QjtBQUNBLFdBQUtHLE1BQUwsR0FBWSxLQUFaO0FBRUEsS0FKRCxFQUlFLElBSkY7QUFLQVQsSUFBQUEsRUFBRSxDQUFDYSxJQUFILENBQVFpQixFQUFSLENBQVcsaUJBQVgsRUFBOEIsVUFBV1YsS0FBWCxFQUFtQjtBQUFDO0FBQ2pEcEIsTUFBQUEsRUFBRSxDQUFDYSxJQUFILENBQVFDLElBQVIsQ0FBYSxjQUFiLEVBQTZCLEdBQTdCLEVBRGdELENBQ2Q7O0FBQ2xDTyxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWUYsS0FBWjtBQUNBcEIsTUFBQUEsRUFBRSxDQUFDYSxJQUFILENBQVFDLElBQVIsQ0FBYSxVQUFiLEVBQXdCTSxLQUF4QixFQUE4QixLQUFLWixXQUFMLENBQWlCc0MsUUFBL0M7QUFDQSxLQUpELEVBSUUsSUFKRjtBQUtBOUMsSUFBQUEsRUFBRSxDQUFDYSxJQUFILENBQVFpQixFQUFSLENBQVcsY0FBWCxFQUEyQixVQUFTaUIsS0FBVCxFQUFnQjtBQUFDO0FBQ3pDO0FBQ0YsV0FBS3ZDLFdBQUwsQ0FBaUJ3QyxXQUFqQixDQUE2QkQsS0FBN0IsRUFGMEMsQ0FHeEM7QUFDQTtBQUNGLEtBTEQsRUFLRSxJQUxGO0FBTUEvQyxJQUFBQSxFQUFFLENBQUNhLElBQUgsQ0FBUWlCLEVBQVIsQ0FBVyxnQkFBWCxFQUE0QixVQUFTbUIsSUFBVCxFQUFjO0FBQ3pDakQsTUFBQUEsRUFBRSxDQUFDYSxJQUFILENBQVFDLElBQVIsQ0FBYSxVQUFiLEVBQXdCLFdBQVNtQyxJQUFqQyxFQUFzQyxLQUFLekMsV0FBTCxDQUFpQnNDLFFBQXZEO0FBQ0F6QixNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLbEIsTUFBTCxDQUFZOEMsU0FBWixDQUFzQixLQUFLOUMsTUFBTCxDQUFZK0MsR0FBWixDQUFnQixLQUFLM0MsV0FBTCxDQUFpQjRDLElBQWpDLEVBQXVDLEtBQUs1QyxXQUFMLENBQWlCNkMsSUFBeEQsQ0FBdEIsRUFBb0ZKLElBQXBGLENBQVo7QUFDQSxLQUhELEVBR0UsSUFIRjtBQUlBLFNBQUtLLFdBQUw7QUFDQSxTQUFLQyxPQUFMO0FBQ0F2RCxJQUFBQSxFQUFFLENBQUNlLElBQUgsQ0FBUSxhQUFSLEVBQXVCVSxZQUF2QixDQUFvQ3pCLEVBQUUsQ0FBQ3dELEtBQXZDLEVBQThDQyxRQUE5QyxDQUF1RCxZQUFXO0FBRWpFekQsTUFBQUEsRUFBRSxDQUFDZSxJQUFILENBQVEsUUFBUixFQUFrQlUsWUFBbEIsQ0FBK0IsWUFBL0IsRUFBNkNkLElBQTdDLElBQW1ELENBQW5EO0FBQ0EsVUFBSUEsSUFBSSxHQUFDWCxFQUFFLENBQUNlLElBQUgsQ0FBUSxRQUFSLEVBQWtCVSxZQUFsQixDQUErQixZQUEvQixFQUE2Q2QsSUFBdEQsQ0FIaUUsQ0FJakU7O0FBQ0EsV0FBSzhCLE1BQUwsR0FBWSxRQUFaO0FBQ0EsVUFBSUgsUUFBUSxDQUFDM0IsSUFBSSxHQUFDLEVBQU4sQ0FBUixHQUFrQixFQUF0QixFQUNDLEtBQUs4QixNQUFMLElBQWEsR0FBYjtBQUNELFdBQUtBLE1BQUwsSUFBYUgsUUFBUSxDQUFDM0IsSUFBSSxHQUFDLEVBQU4sQ0FBUixHQUFrQixHQUEvQjtBQUNBLFVBQUlBLElBQUksR0FBQzJCLFFBQVEsQ0FBQzNCLElBQUksR0FBQyxFQUFOLENBQVIsR0FBa0IsRUFBdkIsR0FBMEIsRUFBOUIsRUFDQyxLQUFLOEIsTUFBTCxJQUFhLEdBQWI7QUFDRCxXQUFLQSxNQUFMLElBQWM5QixJQUFJLEdBQUMyQixRQUFRLENBQUMzQixJQUFJLEdBQUMsRUFBTixDQUFSLEdBQWtCLEVBQXJDLENBWGlFLENBWWpFO0FBQ0MsS0FiRixFQWFJLENBYko7QUFjQ1gsSUFBQUEsRUFBRSxDQUFDYSxJQUFILENBQVFDLElBQVIsQ0FBYSxVQUFiLEVBQXdCLFFBQXhCLEVBQWlDLElBQWpDO0FBQ0QsR0F0SE87QUF3SEw0QyxFQUFBQSxLQXhISyxtQkF3SEk7QUFDWDtBQUNBLFNBQUtDLFdBQUwsR0FGVyxDQUdYOztBQUNBLFNBQUt2RCxNQUFMLEdBQVlKLEVBQUUsQ0FBQ2UsSUFBSCxDQUFRLFlBQVIsRUFBc0JVLFlBQXRCLENBQW1DLFFBQW5DLENBQVo7QUFFQSxTQUFLbEIsU0FBTCxHQUFlakIsTUFBTSxDQUFDQyxNQUFQLENBQWNDLE9BQWQsQ0FBc0IsS0FBS2EsS0FBM0IsQ0FBZjtBQUlHLEdBbElJO0FBb0lMdUQsRUFBQUEsTUFwSUssa0JBb0lHQyxFQXBJSCxFQW9JTztBQUNkO0FBRUF4QyxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxRQUFaLEVBQXFCLEtBQUtiLE1BQTFCOztBQUNBLFlBQVEsS0FBS0gsT0FBYjtBQUNDLFdBQUssQ0FBTDtBQUFPO0FBQUM7QUFDUCxjQUFJLEtBQUtHLE1BQVQsRUFBZ0I7QUFBQztBQUNoQjtBQUNBOztBQUNELGNBQUksS0FBS0osS0FBTCxJQUFZLENBQWhCLEVBQWtCO0FBQ2pCZixZQUFBQSxNQUFNLENBQUNDLE1BQVAsQ0FBY0UsT0FBZCxJQUF1QixDQUF2Qjs7QUFFQSxpQkFBSyxJQUFJcUUsQ0FBQyxHQUFDLENBQVgsRUFBYUEsQ0FBQyxHQUFDeEUsTUFBTSxDQUFDQyxNQUFQLENBQWNDLE9BQWQsQ0FBc0J1RSxNQUFyQyxFQUE0Q0QsQ0FBQyxFQUE3QyxFQUFnRDtBQUMvQyxrQkFBSUUsUUFBUSxHQUFDMUUsTUFBTSxDQUFDQyxNQUFQLENBQWNDLE9BQWQsQ0FBc0JzRSxDQUF0QixFQUF5QnJDLFlBQXpCLENBQXNDLFFBQXRDLENBQWI7O0FBQ0Esa0JBQUl1QyxRQUFRLENBQUNDLE1BQVQsSUFBaUIsQ0FBckIsRUFBdUI7QUFDdEJELGdCQUFBQSxRQUFRLENBQUNFLFFBQVQsSUFBbUIsQ0FBbkI7QUFDQTtBQUNEO0FBRUQ7O0FBQ0QsY0FBSUMsSUFBSSxHQUFDLEtBQUtDLElBQUwsQ0FBVTNDLFlBQVYsQ0FBdUIsTUFBdkIsQ0FBVDs7QUFDQSxlQUFLLElBQUlxQyxDQUFDLEdBQUMsQ0FBWCxFQUFhQSxDQUFDLEdBQUNLLElBQUksQ0FBQ0UsUUFBTCxDQUFjTixNQUE3QixFQUFvQ0QsQ0FBQyxFQUFyQyxFQUF3QztBQUN2QyxnQkFBSUssSUFBSSxDQUFDRSxRQUFMLENBQWNQLENBQWQsRUFBaUJRLE9BQWpCLElBQTBCaEYsTUFBTSxDQUFDQyxNQUFQLENBQWNFLE9BQTVDLEVBQW9EO0FBQ25ELGtCQUFJMEUsSUFBSSxDQUFDRSxRQUFMLENBQWNQLENBQWQsRUFBaUJTLEdBQWpCLEVBQUosRUFBMkI7QUFDMUJKLGdCQUFBQSxJQUFJLENBQUNFLFFBQUwsQ0FBY0csTUFBZCxDQUFxQlYsQ0FBckIsRUFBdUIsQ0FBdkI7QUFDQTtBQUNEO0FBQ0Q7O0FBRUQsZUFBS3RELFdBQUwsR0FBaUIsS0FBS0QsU0FBTCxDQUFla0IsWUFBZixDQUE0QixRQUE1QixDQUFqQixDQXhCTSxDQXdCaUQ7O0FBQ3ZEekIsVUFBQUEsRUFBRSxDQUFDYSxJQUFILENBQVFDLElBQVIsQ0FBYSxVQUFiLEVBQXdCLFNBQU8sS0FBS04sV0FBTCxDQUFpQnNDLFFBQWhELEVBQXlELElBQXpEO0FBQ0E5QyxVQUFBQSxFQUFFLENBQUNhLElBQUgsQ0FBUUMsSUFBUixDQUFhLGNBQWIsRUFBNkIsR0FBN0I7QUFFQTtBQUNBOztBQUNELFdBQUssQ0FBTDtBQUFPO0FBQUM7QUFDUCxjQUFJLEtBQUtMLE1BQVQsRUFBZ0I7QUFBQztBQUNoQjtBQUNBOztBQUdELGNBQUksS0FBS0QsV0FBTCxDQUFpQmlFLFNBQXJCLEVBQStCO0FBQUM7QUFDL0IsZ0JBQUlDLEdBQUcsR0FBQzFFLEVBQUUsQ0FBQ2UsSUFBSCxDQUFRLGVBQVIsQ0FBUjtBQUNBLGdCQUFJLEtBQUtQLFdBQUwsQ0FBaUJzQyxRQUFqQixJQUEyQixJQUEvQixFQUNDNEIsR0FBRyxDQUFDakQsWUFBSixDQUFpQixXQUFqQixFQUE4QmtELGFBQTlCLEdBREQsS0FFSTtBQUNILGtCQUFJQyxJQUFJLEdBQUM1RSxFQUFFLENBQUNlLElBQUgsQ0FBUSxvQkFBUixFQUE4QlUsWUFBOUIsQ0FBMkMsYUFBM0MsQ0FBVDtBQUNBbUQsY0FBQUEsSUFBSSxDQUFDQyxJQUFMO0FBQ0E3RSxjQUFBQSxFQUFFLENBQUNhLElBQUgsQ0FBUUMsSUFBUixDQUFhLGdCQUFiLEVBQThCOEQsSUFBSSxDQUFDdkUsS0FBTCxHQUFXLENBQXpDO0FBQ0E7QUFDRCxpQkFBS0ksTUFBTCxHQUFZLElBQVo7QUFDQSxXQVZELE1BV0k7QUFDSCxpQkFBS0QsV0FBTCxDQUFpQmlFLFNBQWpCLEdBQTJCLENBQTNCO0FBQ0F6RSxZQUFBQSxFQUFFLENBQUNhLElBQUgsQ0FBUUMsSUFBUixDQUFhLGNBQWIsRUFBNkIsR0FBN0I7QUFDQTs7QUFDQTtBQUNEOztBQUNELFdBQUssQ0FBTDtBQUFPO0FBQ047QUFDQSxjQUFJLEtBQUtMLE1BQVQsRUFBZ0I7QUFBQztBQUNoQjtBQUNBOztBQUNEWSxVQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxPQUFaLEVBQW9CLEtBQUtoQixPQUF6QjtBQUNBZSxVQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxNQUFaO0FBQ0F0QixVQUFBQSxFQUFFLENBQUNhLElBQUgsQ0FBUUMsSUFBUixDQUFhLGNBQWIsRUFBNkIsR0FBN0I7QUFDQTtBQUNBOztBQUNELFdBQUssQ0FBTDtBQUFRO0FBQ1A7QUFDQSxjQUFJLEtBQUtOLFdBQUwsQ0FBaUJzRSxjQUFqQixJQUFtQyxDQUF2QyxFQUEwQztBQUN6QztBQUNBLGdCQUFJLEtBQUt2RSxTQUFMLENBQWVnQyxJQUFmLElBQXVCLFNBQTNCLEVBQXNDO0FBQ3JDLGtCQUFJakQsTUFBTSxDQUFDQyxNQUFQLENBQWMwQixtQkFBZCxJQUFxQyxDQUF6QyxFQUE0QztBQUMzQyxvQkFBSThELEdBQUcsR0FBRy9FLEVBQUUsQ0FBQ2UsSUFBSCxDQUFRLHFCQUFSLENBQVY7QUFDQWdFLGdCQUFBQSxHQUFHLENBQUMvRCxNQUFKLEdBQWEsSUFBYjtBQUNBMUIsZ0JBQUFBLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjMEIsbUJBQWQsR0FBb0MsQ0FBcEM7QUFDQTtBQUNELGFBTkQsTUFPSztBQUVIakIsY0FBQUEsRUFBRSxDQUFDZSxJQUFILENBQVEsUUFBUixFQUFrQlUsWUFBbEIsQ0FBK0IsSUFBL0IsRUFBcUN1RCxTQUFyQyxDQUErQyxLQUFLeEUsV0FBcEQ7QUFDQVIsY0FBQUEsRUFBRSxDQUFDYSxJQUFILENBQVFDLElBQVIsQ0FBYSxjQUFiLEVBQTZCLEdBQTdCO0FBRUQ7QUFFRCxXQWhCRCxNQWlCSztBQUNKLGlCQUFLTixXQUFMLENBQWlCc0UsY0FBakIsR0FBa0MsQ0FBbEM7QUFDQTlFLFlBQUFBLEVBQUUsQ0FBQ2EsSUFBSCxDQUFRQyxJQUFSLENBQWEsY0FBYixFQUE2QixHQUE3QjtBQUNBOztBQUNEO0FBQ0E7O0FBQ0QsV0FBSyxDQUFMO0FBQU87QUFBRTtBQUNSO0FBQ0E7QUFDQSxlQUFLTixXQUFMLENBQWlCeUUsSUFBakIsSUFBdUIsQ0FBdkI7O0FBQ0EsY0FBSSxLQUFLekUsV0FBTCxDQUFpQnlFLElBQWpCLElBQXVCLENBQTNCLEVBQTZCO0FBQzdCO0FBQ0M1RCxjQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxNQUFaO0FBQ0EsbUJBQUtkLFdBQUwsQ0FBaUJ5RSxJQUFqQixJQUF1QixDQUF2QjtBQUNBLG1CQUFLNUUsS0FBTCxHQUFXLENBQUMsS0FBS0EsS0FBTCxHQUFXLENBQVosSUFBZSxDQUExQjtBQUNBLG1CQUFLRSxTQUFMLEdBQWVqQixNQUFNLENBQUNDLE1BQVAsQ0FBY0MsT0FBZCxDQUFzQixLQUFLYSxLQUEzQixDQUFmO0FBQ0E7O0FBRURMLFVBQUFBLEVBQUUsQ0FBQ2EsSUFBSCxDQUFRQyxJQUFSLENBQWEsY0FBYixFQUE2QixHQUE3QjtBQUNBO0FBQ0E7QUF2R0Y7QUEwR0EsR0FsUE87QUFtUFI2QyxFQUFBQSxXQUFXLEVBQUMsdUJBQVU7QUFDckJyRSxJQUFBQSxNQUFNLENBQUNDLE1BQVAsQ0FBY0MsT0FBZCxDQUFzQixDQUF0QixFQUF5QmlDLFlBQXpCLENBQXNDLFFBQXRDLEVBQWdEeUQsVUFBaEQsQ0FBMkRsRixFQUFFLENBQUNlLElBQUgsQ0FBUSx1QkFBUixDQUEzRDtBQUNBekIsSUFBQUEsTUFBTSxDQUFDQyxNQUFQLENBQWNDLE9BQWQsQ0FBc0IsQ0FBdEIsRUFBeUJpQyxZQUF6QixDQUFzQyxRQUF0QyxFQUFnRHlELFVBQWhELENBQTJEbEYsRUFBRSxDQUFDZSxJQUFILENBQVEsdUJBQVIsQ0FBM0Q7QUFDQXpCLElBQUFBLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjQyxPQUFkLENBQXNCLENBQXRCLEVBQXlCaUMsWUFBekIsQ0FBc0MsUUFBdEMsRUFBZ0R5RCxVQUFoRCxDQUEyRGxGLEVBQUUsQ0FBQ2UsSUFBSCxDQUFRLHVCQUFSLENBQTNEO0FBQ0F6QixJQUFBQSxNQUFNLENBQUNDLE1BQVAsQ0FBY0MsT0FBZCxDQUFzQixDQUF0QixFQUF5QmlDLFlBQXpCLENBQXNDLFFBQXRDLEVBQWdEeUQsVUFBaEQsQ0FBMkRsRixFQUFFLENBQUNlLElBQUgsQ0FBUSx1QkFBUixDQUEzRDtBQUNBekIsSUFBQUEsTUFBTSxDQUFDQyxNQUFQLENBQWNDLE9BQWQsQ0FBc0IsQ0FBdEIsRUFBeUJpQyxZQUF6QixDQUFzQyxRQUF0QyxFQUFnRHFCLFFBQWhELEdBQXlELElBQXpEO0FBQ0F4RCxJQUFBQSxNQUFNLENBQUNDLE1BQVAsQ0FBY0MsT0FBZCxDQUFzQixDQUF0QixFQUF5QmlDLFlBQXpCLENBQXNDLFFBQXRDLEVBQWdEcUIsUUFBaEQsR0FBeUQsSUFBekQ7QUFDQXhELElBQUFBLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjQyxPQUFkLENBQXNCLENBQXRCLEVBQXlCaUMsWUFBekIsQ0FBc0MsUUFBdEMsRUFBZ0RxQixRQUFoRCxHQUF5RCxJQUF6RDtBQUNBeEQsSUFBQUEsTUFBTSxDQUFDQyxNQUFQLENBQWNDLE9BQWQsQ0FBc0IsQ0FBdEIsRUFBeUJpQyxZQUF6QixDQUFzQyxRQUF0QyxFQUFnRHFCLFFBQWhELEdBQXlELElBQXpELENBUnFCLENBU3JCO0FBQ0E7O0FBQ0F4RCxJQUFBQSxNQUFNLENBQUNDLE1BQVAsQ0FBY0MsT0FBZCxDQUFzQixDQUF0QixFQUF5QmlDLFlBQXpCLENBQXNDLFFBQXRDLEVBQWdEMEQsUUFBaEQsQ0FBeUQsQ0FBekQsRUFBMkQsQ0FBM0Q7QUFDQTdGLElBQUFBLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjQyxPQUFkLENBQXNCLENBQXRCLEVBQXlCaUMsWUFBekIsQ0FBc0MsUUFBdEMsRUFBZ0QwRCxRQUFoRCxDQUF5RCxFQUF6RCxFQUE0RCxFQUE1RDtBQUNBN0YsSUFBQUEsTUFBTSxDQUFDQyxNQUFQLENBQWNDLE9BQWQsQ0FBc0IsQ0FBdEIsRUFBeUJpQyxZQUF6QixDQUFzQyxRQUF0QyxFQUFnRDBELFFBQWhELENBQXlELENBQXpELEVBQTJELEVBQTNEO0FBQ0E3RixJQUFBQSxNQUFNLENBQUNDLE1BQVAsQ0FBY0MsT0FBZCxDQUFzQixDQUF0QixFQUF5QmlDLFlBQXpCLENBQXNDLFFBQXRDLEVBQWdEMEQsUUFBaEQsQ0FBeUQsRUFBekQsRUFBNEQsQ0FBNUQ7O0FBQ0EsU0FBSyxJQUFJckIsQ0FBQyxHQUFDLENBQVgsRUFBYUEsQ0FBQyxHQUFDeEUsTUFBTSxDQUFDQyxNQUFQLENBQWNDLE9BQWQsQ0FBc0J1RSxNQUFyQyxFQUE0Q0QsQ0FBQyxFQUE3QyxFQUFnRDtBQUMvQyxVQUFJc0IsU0FBUyxHQUFDOUYsTUFBTSxDQUFDQyxNQUFQLENBQWNDLE9BQWQsQ0FBc0JzRSxDQUF0QixDQUFkO0FBQ0EsVUFBSXVCLEdBQUcsR0FBQ3JGLEVBQUUsQ0FBQ2UsSUFBSCxDQUFRLGNBQVIsRUFBd0JxRSxTQUF4QixFQUFtQzNELFlBQW5DLENBQWdEekIsRUFBRSxDQUFDc0YsUUFBbkQsQ0FBUjtBQUNBRCxNQUFBQSxHQUFHLENBQUNFLEtBQUo7QUFDQUYsTUFBQUEsR0FBRyxDQUFDRyxXQUFKLEdBQWtCeEYsRUFBRSxDQUFDeUYsS0FBSCxDQUFTQyxHQUEzQjtBQUNBTCxNQUFBQSxHQUFHLENBQUNNLE1BQUosQ0FBVyxDQUFDLEVBQVosRUFBZ0IsQ0FBQyxHQUFqQjtBQUNBTixNQUFBQSxHQUFHLENBQUNPLFNBQUosR0FBYyxFQUFkO0FBQ0FQLE1BQUFBLEdBQUcsQ0FBQ1EsTUFBSixDQUFXLEVBQVgsRUFBZSxDQUFDLEdBQWhCO0FBQ0FSLE1BQUFBLEdBQUcsQ0FBQ1MsTUFBSjtBQUNBLFVBQUlDLElBQUksR0FBQy9GLEVBQUUsQ0FBQ2UsSUFBSCxDQUFRLGVBQVIsRUFBeUJxRSxTQUF6QixDQUFUO0FBQ0FXLE1BQUFBLElBQUksQ0FBQ3RFLFlBQUwsQ0FBa0J6QixFQUFFLENBQUN3RCxLQUFyQixFQUE0QndDLFFBQTVCLEdBQXFDLEVBQXJDLENBVitDLENBVy9DOztBQUNBRCxNQUFBQSxJQUFJLENBQUNFLFdBQUwsQ0FBaUIsQ0FBQyxHQUFsQixFQUFzQixDQUFDLEdBQXZCLEVBWitDLENBYy9DOztBQUNBWixNQUFBQSxHQUFHLEdBQUNyRixFQUFFLENBQUNlLElBQUgsQ0FBUSxpQkFBUixFQUEyQnFFLFNBQTNCLEVBQXNDM0QsWUFBdEMsQ0FBbUR6QixFQUFFLENBQUNzRixRQUF0RCxDQUFKO0FBQ0FELE1BQUFBLEdBQUcsQ0FBQ0UsS0FBSjtBQUNBRixNQUFBQSxHQUFHLENBQUNHLFdBQUosR0FBa0J4RixFQUFFLENBQUN5RixLQUFILENBQVNTLEtBQTNCO0FBQ0FiLE1BQUFBLEdBQUcsQ0FBQ00sTUFBSixDQUFXLENBQUMsRUFBWixFQUFnQixDQUFDLEdBQWpCO0FBQ0FOLE1BQUFBLEdBQUcsQ0FBQ1EsTUFBSixDQUFXLEVBQVgsRUFBZSxDQUFDLEdBQWhCO0FBQ0FSLE1BQUFBLEdBQUcsQ0FBQ08sU0FBSixHQUFjLEVBQWQ7QUFDQVAsTUFBQUEsR0FBRyxDQUFDUyxNQUFKO0FBQ0FDLE1BQUFBLElBQUksR0FBQy9GLEVBQUUsQ0FBQ2UsSUFBSCxDQUFRLGtCQUFSLEVBQTRCcUUsU0FBNUIsQ0FBTDtBQUNBVyxNQUFBQSxJQUFJLENBQUN0RSxZQUFMLENBQWtCekIsRUFBRSxDQUFDd0QsS0FBckIsRUFBNEJ3QyxRQUE1QixHQUFxQyxFQUFyQyxDQXZCK0MsQ0F3Qi9DOztBQUNBRCxNQUFBQSxJQUFJLENBQUNFLFdBQUwsQ0FBaUIsQ0FBQyxHQUFsQixFQUFzQixDQUFDLEdBQXZCO0FBQ0E7QUFDRCxHQTdSTztBQThSUjFDLEVBQUFBLE9BQU8sRUFBQyxtQkFBVTtBQUNqQnZELElBQUFBLEVBQUUsQ0FBQ21HLE1BQUgsQ0FBVUMsT0FBVixDQUFrQixhQUFsQixFQUFpQ3BHLEVBQUUsQ0FBQ3FHLFNBQXBDLEVBQStDLFVBQVVDLEdBQVYsRUFBZUMsSUFBZixFQUFxQjtBQUNuRSxVQUFJQyxPQUFPLEdBQUd4RyxFQUFFLENBQUN5RyxXQUFILENBQWVDLElBQWYsQ0FBb0JILElBQXBCLEVBQTBCLElBQTFCLEVBQWdDLEdBQWhDLENBQWQ7QUFDQSxLQUZEO0FBR0EsR0FsU087QUFtU1JqRCxFQUFBQSxXQUFXLEVBQUUsdUJBQVc7QUFDdkIsUUFBSXFELFFBQVEsR0FBRyxDQUFDLElBQUQsRUFBTSxNQUFOLEVBQWEsSUFBYixFQUFrQixJQUFsQixFQUF1QixPQUF2QixFQUErQixPQUEvQixFQUF1QyxJQUF2QyxFQUE0QyxPQUE1QyxFQUNWLElBRFUsRUFDTCxNQURLLEVBQ0UsS0FERixFQUNRLElBRFIsRUFDYSxPQURiLEVBQ3FCLElBRHJCLEVBQzBCLElBRDFCLEVBQytCLElBRC9CLEVBQ29DLElBRHBDLENBQWY7QUFFQSxRQUFJQyxVQUFVLEdBQUcsRUFBakI7QUFDQXRILElBQUFBLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjSSxRQUFkLEdBQXlCLElBQUlrSCxLQUFKLEVBQXpCOztBQUNBLFNBQUssSUFBSS9DLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUc4QyxVQUFwQixFQUFnQzlDLENBQUMsRUFBakMsRUFBcUM7QUFFcEMsVUFBSU0sSUFBSSxHQUFHLElBQUlwRSxFQUFFLENBQUM4RyxJQUFQLENBQVlILFFBQVEsQ0FBQzdDLENBQUQsQ0FBcEIsQ0FBWDtBQUNBTSxNQUFBQSxJQUFJLENBQUMyQyxZQUFMLENBQWtCL0csRUFBRSxDQUFDZ0gsTUFBckI7QUFDQTVDLE1BQUFBLElBQUksQ0FBQ3VDLFFBQUwsR0FBZ0JBLFFBQVEsQ0FBQzdDLENBQUQsQ0FBeEI7QUFDQTlELE1BQUFBLEVBQUUsQ0FBQ21HLE1BQUgsQ0FBVUMsT0FBVixDQUFrQixVQUFRaEMsSUFBSSxDQUFDdUMsUUFBL0IsRUFBd0MzRyxFQUFFLENBQUNpSCxXQUEzQyxFQUF1RCxVQUFTWCxHQUFULEVBQWFZLFdBQWIsRUFBMEI7QUFDdkUsYUFBS3pGLFlBQUwsQ0FBa0J6QixFQUFFLENBQUNnSCxNQUFyQixFQUE2QkUsV0FBN0IsR0FBMkNBLFdBQTNDO0FBQ04sT0FGbUQsQ0FFbERDLElBRmtELENBRTdDL0MsSUFGNkMsQ0FBdkQ7QUFHQTlFLE1BQUFBLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjSSxRQUFkLENBQXVCeUgsSUFBdkIsQ0FBNEJoRCxJQUE1QjtBQUNBLEtBZHNCLENBZXZCOzs7QUFDQXBFLElBQUFBLEVBQUUsQ0FBQ2UsSUFBSCxDQUFRLHFCQUFSLEVBQStCQyxNQUEvQixHQUF3QyxLQUF4QyxDQWhCdUIsQ0FpQnZCOztBQUNBaEIsSUFBQUEsRUFBRSxDQUFDZSxJQUFILENBQVEsNEJBQVIsRUFBc0NDLE1BQXRDLEdBQTZDLEtBQTdDLENBbEJ1QixDQW1CdkI7O0FBQ0FoQixJQUFBQSxFQUFFLENBQUNlLElBQUgsQ0FBUSwyQkFBUixFQUFxQ0MsTUFBckMsR0FBNEMsS0FBNUMsQ0FwQnVCLENBcUJ2Qjs7QUFDQSxTQUFLdUMsT0FBTDtBQUNBLEdBMVRPO0FBMlRSOEQsRUFBQUEsUUFBUSxFQUFDLG9CQUFVO0FBRWxCckgsSUFBQUEsRUFBRSxDQUFDYSxJQUFILENBQVF5RyxHQUFSO0FBQ0FqRyxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxNQUFaO0FBQ0F0QixJQUFBQSxFQUFFLENBQUN1SCxRQUFILENBQVlDLFNBQVosQ0FBc0IsTUFBdEI7QUFFQTtBQWpVTyxDQUFULEdBcVVBIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ3aW5kb3cuZ2xvYmFsPXtcblx0cGVyc29uczpbXSxcblx0bm93VHVybjowLC8v5b2T5YmN5Zue5ZCI5pWwXG5cdGlzT3ZlcjpmYWxzZSxcblx0Y2FyZG5vZGUgOiBudWxsLFxuXHRiZ206e1xuXHRcdGF1ZGlvOm51bGwsXG5cdFx0bG9vcDpudWxsLFxuXHRcdHZvbHVtZTpudWxsLFxuXHR9XG59O1xuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcblx0XHRtYXBPYmo6bnVsbCwvL+WcsOWbvuWvueixoVxuXHRcdHBlcnNvbnM6bnVsbCwvL+eOqeWutuS7rFxuXHRcdGluZGV4OjAsXG5cdFx0bm93U3RlcDowLFxuXHRcdG5vd1BsYXllcjpudWxsLFxuXHRcdG5vd1Byb3BlcnR5Om51bGwsXG5cdFx0aXNXYWl0OmZhbHNlLFxuXHRcdG1zZ0JveENvbmVudDpudWxsLFxuXHRcdHRpbWU6MCxcbiAgICB9LFxuXHRcblx0ZW5kX2NhcmRfYnRuX2Z1bmM6ZnVuY3Rpb24oKSB7XG5cdFx0Y2MuZ2FtZS5lbWl0KCd1cGRhdGUtc3RhdGUnLCAnMScpO1xuXHRcdGNjLmZpbmQoXCJDYW52YXMvZW5kX2NhcmRfYnRuXCIpLmFjdGl2ZSA9IGZhbHNlO1xuXHRcdHdpbmRvdy5nbG9iYWwuY2FyZF9lbmRfYnRuX3Nob3dlZCA9IDA7XG5cdH0sXG5cdFxuICAgIHVwZGF0ZVVJOmZ1bmN0aW9uKCl7XG5cdFx0Ly/mm7TmlrDkurrnianooYDph49cblx0fSxcblx0b25LZXlEb3duOiBmdW5jdGlvbiAoZXZlbnQpIHsvL+mUruebmOaMieS4i1xuXHRcdGNvbnNvbGUubG9nKGV2ZW50KTtcbiAgICAgICAgc3dpdGNoKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgICAgICAgIGNhc2UgOTpcblx0XHRcdHsvL+aMieS4i3RhYlxuXHRcdFx0XHR2YXIgdGFiPWNjLmZpbmQoJ0NhbnZhcy9UYWInKTtcblx0XHRcdFx0dGFiLmFjdGl2ZT10cnVlO1xuXHRcdFx0XHR0YWIuZ2V0Q29tcG9uZW50KCd0YWJXaW4nKS5zaG93VGFiKCk7XG5cdFx0XHRcbiAgICAgICAgICAgICAgICBicmVhaztcblx0XHRcdH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvbktleVVwOiBmdW5jdGlvbiAoZXZlbnQpIHsvL+mUruebmOmHiuaUvlxuICAgICAgICBzd2l0Y2goZXZlbnQua2V5Q29kZSkge1xuICAgICAgICAgICAgY2FzZSA5OlxuICAgICAgICAgICAgIHsvL+mHiuaUvnRhYlxuXHRcdFx0XHR2YXIgdGFiPWNjLmZpbmQoJ0NhbnZhcy9UYWInKTtcblx0XHRcdFx0dGFiLmFjdGl2ZT1mYWxzZTtcblx0XHRcdFx0Ly9jb25zb2xlLmxvZygnUHJlc3MgYSBrZXknKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblx0XHRcdH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgb25Mb2FkICgpIHtcblx0XHRjYy5zeXN0ZW1FdmVudC5vbihjYy5TeXN0ZW1FdmVudC5FdmVudFR5cGUuS0VZX0RPV04sIHRoaXMub25LZXlEb3duLCB0aGlzKTtcbiAgICAgICAgY2Muc3lzdGVtRXZlbnQub24oY2MuU3lzdGVtRXZlbnQuRXZlbnRUeXBlLktFWV9VUCwgdGhpcy5vbktleVVwLCB0aGlzKTtcblx0XHQvL+WKoOi9veWcsOWbvlxuXHRcdHRoaXMubm93U3RlcD0wO1xuXHRcdHRoaXMubXNnQ29udGVudD1jYy5maW5kKCdDYW52YXMvbXNnQm94L3ZpZXcvY29udGVudC9pdGVtJyk7XG5cdFx0Ly9jb25zb2xlLmxvZyhtc2dDb250ZW50LmdldENvbXBvbmVudChjYy5MYWJlbCkpO1xuXHRcdGNjLmdhbWUub24oJ3NlbmQtTXNnJyxmdW5jdGlvbihldmVudCxwb3N0ZXIpe1xuXHRcdFx0aWYgKGV2ZW50PT0nJyl7XG5cdFx0XHRcdHJldHVybiA7XG5cdFx0XHR9XG5cdFx0XHR2YXIgdGltZVN0cj0nJztcblx0XHRcdGlmIChwYXJzZUludCh0aGlzLnRpbWUvNjApPDEwKVxuXHRcdFx0XHR0aW1lU3RyKz1cIjBcIlxuXHRcdFx0dGltZVN0cis9cGFyc2VJbnQodGhpcy50aW1lLzYwKStcIjpcIjtcblx0XHRcdGlmICh0aGlzLnRpbWUtcGFyc2VJbnQodGhpcy50aW1lLzYwKSo2MDwxMClcblx0XHRcdFx0dGltZVN0cis9XCIwXCJcblx0XHRcdHRpbWVTdHIrPSh0aGlzLnRpbWUtcGFyc2VJbnQodGhpcy50aW1lLzYwKSo2MCk7XG5cdFx0XHRcblx0XHRcdHZhciBuYW1lPSc8Y29sb3I9IzQzQ0Q4MD4oJyt0aW1lU3RyKycpJytwb3N0ZXIrJzwvY29sb3I+Jzs7XG5cdFx0XHRpZiAocG9zdGVyPT0n57O757ufJyl7XG5cdFx0XHRcdG5hbWU9Jzxjb2xvcj0jZmYwMDAwPignK3RpbWVTdHIrJyknK3Bvc3RlcisnPC9jb2xvcj4nO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5tc2dDb250ZW50LmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nKz1uYW1lK1wiOiBcIitldmVudCsnPGJyLz4nO1xuXHRcdFx0Ly/lj6/og73pnIDopoHliqjmgIHmlLnlj5hjb250ZW505aSn5bCPXG5cdFx0XHRcblx0XHRcdGNjLmZpbmQoJ0NhbnZhcy9tc2dCb3gvdmlldy9jb250ZW50JykuaGVpZ2h0PXRoaXMubXNnQ29udGVudC5oZWlnaHQrMTA7XG5cdFx0XHRjYy5maW5kKCdDYW52YXMvbXNnQm94JykuZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpLnNjcm9sbFRvQm90dG9tKDAuMSk7XG5cdFx0XHQvL2NvbnNvbGUubG9nKCdMYWJlbCcsdGhpcy5tc2dDb250ZW50LmhlaWdodCk7XG5cdFx0XHQgXG5cdFx0fSx0aGlzKTtcblx0XHRcdFxuXHRcdGNjLmdhbWUub24oJ3VwZGF0ZS1zdGF0ZScsIGZ1bmN0aW9uIChtc2cpIHtcblx0XHRcdHRoaXMubm93U3RlcD0odGhpcy5ub3dTdGVwKzEpJTU7XG5cdFx0XHR0aGlzLmlzV2FpdD1mYWxzZTtcblx0XHRcdFxuXHRcdH0sdGhpcyk7XG5cdFx0Y2MuZ2FtZS5vbignc3RlcE9uQ2VsbC1kb25lJywgZnVuY3Rpb24gKCBldmVudCApIHsvL+inpuWPkee7k+adn1xuXHRcdFx0Y2MuZ2FtZS5lbWl0KCd1cGRhdGUtc3RhdGUnLCAnMScpOy8v5pu05paw54q25oCBXG5cdFx0XHRjb25zb2xlLmxvZyhldmVudCk7XG5cdFx0XHRjYy5nYW1lLmVtaXQoJ3NlbmQtTXNnJyxldmVudCx0aGlzLm5vd1Byb3BlcnR5Lm5pY2tuYW1lKTtcblx0XHR9LHRoaXMpO1xuXHRcdGNjLmdhbWUub24oJ3JvdXRlLWNob3NlbicsIGZ1bmN0aW9uKHJvdXRlKSB7Ly/nm5HlkKznjqnlrrbpgInmi6nkuoblk6rmnaHot6/lvoRcblx0XHRcdFx0XHQvL2NvbnNvbGUubG9nKCfngrnlh7vkuoYnLHJvdXRlKTtcblx0XHRcdHRoaXMubm93UHJvcGVydHkubW92ZUJ5Um91dGUocm91dGUpO1xuXHRcdFx0XHRcdC8vdGhpcy5ub2RlLmVtaXQoJ3VwZGF0ZS1zdGF0ZScsICcxJyk7Ly/njqnlrrbnp7vliqjlrozmiJDvvIzov5vlhaXkuIvkuIDmraXmk43kvZxcblx0XHRcdFx0XHQvL+eOqeWutuWktOWDj+aMieeFp+i3r+W+hOenu+WKqFxuXHRcdH0sdGhpcyk7XG5cdFx0Y2MuZ2FtZS5vbigncm9sbC1kaWNlLWRvbmUnLGZ1bmN0aW9uKHN0ZXApe1xuXHRcdFx0Y2MuZ2FtZS5lbWl0KCdzZW5kLU1zZycsXCLojrflvpfpqrDlrZDngrnmlbBcIitzdGVwLHRoaXMubm93UHJvcGVydHkubmlja25hbWUpO1xuXHRcdFx0Y29uc29sZS5sb2codGhpcy5tYXBPYmoucG9zRW5hYmxlKHRoaXMubWFwT2JqLm1hcFt0aGlzLm5vd1Byb3BlcnR5LnBvc1hdW3RoaXMubm93UHJvcGVydHkucG9zWV0sc3RlcCkpO1xuXHRcdH0sdGhpcyk7XG5cdFx0dGhpcy5Jbml0aWFsQ2FyZCgpO1xuXHRcdHRoaXMuaW5pdEJnbSgpO1xuXHRcdGNjLmZpbmQoJ0NhbnZhcy90aW1lJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zY2hlZHVsZShmdW5jdGlvbigpIHtcblx0XHRcdFxuXHRcdFx0Y2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdnbG9iYWxHYW1lJykudGltZSs9MTtcblx0XHRcdHZhciB0aW1lPWNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudCgnZ2xvYmFsR2FtZScpLnRpbWU7XG5cdFx0XHQvL2NvbnNvbGUubG9nKHRpbWUpO1xuXHRcdFx0dGhpcy5zdHJpbmc9XCJUaW1lOiBcIlxuXHRcdFx0aWYgKHBhcnNlSW50KHRpbWUvNjApPDEwKVxuXHRcdFx0XHR0aGlzLnN0cmluZys9XCIwXCJcblx0XHRcdHRoaXMuc3RyaW5nKz1wYXJzZUludCh0aW1lLzYwKStcIjpcIjtcblx0XHRcdGlmICh0aW1lLXBhcnNlSW50KHRpbWUvNjApKjYwPDEwKVxuXHRcdFx0XHR0aGlzLnN0cmluZys9XCIwXCJcblx0XHRcdHRoaXMuc3RyaW5nKz0odGltZS1wYXJzZUludCh0aW1lLzYwKSo2MCk7XG5cdFx0XHQvL2NjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudCgnZ2xvYmFsR2FtZScpLnRpbWVTdHI9dGhpcy5zdHJpbmc7XG5cdFx0IH0sIDEpO1xuXHRcdCBjYy5nYW1lLmVtaXQoJ3NlbmQtTXNnJywn5aW95oiP5byA5Zy65LqGIScsJ+ezu+e7nycpO1xuXHR9LFxuXHRcbiAgICBzdGFydCAoKSB7XG5cdFx0Ly/liJ3lp4vljJbkurrnialcblx0XHR0aGlzLmluaXRQZXJzb25zKCk7XG5cdFx0Ly/ojrflvpflnLDlm77lr7nosaFcblx0XHR0aGlzLm1hcE9iaj1jYy5maW5kKCdDYW52YXMvbWFwJykuZ2V0Q29tcG9uZW50KCdHZXRNYXAnKTtcblx0XG5cdFx0dGhpcy5ub3dQbGF5ZXI9d2luZG93Lmdsb2JhbC5wZXJzb25zW3RoaXMuaW5kZXhdO1xuXHRcdFxuXHRcdFxuXHRcdFxuICAgIH0sXG5cbiAgICB1cGRhdGUgKGR0KSB7XG5cdFx0Ly/liKTmlq3lvZPliY3lm57lkIjmmK/lkKbnu5PmnZ9cblx0XHRcblx0XHRjb25zb2xlLmxvZyhcIuaYr+WQpuetieW+heaTjeS9nFwiLHRoaXMuaXNXYWl0KTtcblx0XHRzd2l0Y2ggKHRoaXMubm93U3RlcCl7XG5cdFx0XHRjYXNlIDA6ey8v5Yid5aeL5YyW5Y+Y6YePXG5cdFx0XHRcdGlmICh0aGlzLmlzV2FpdCl7Ly/mraPlnKjmk43kvZzmiJbnrYnlvoXmk43kvZxcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAodGhpcy5pbmRleD09MCl7XG5cdFx0XHRcdFx0d2luZG93Lmdsb2JhbC5ub3dUdXJuKz0xO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdGZvciAodmFyIGk9MDtpPHdpbmRvdy5nbG9iYWwucGVyc29ucy5sZW5ndGg7aSsrKXtcblx0XHRcdFx0XHRcdHZhciBwcm9wZXJ0eT13aW5kb3cuZ2xvYmFsLnBlcnNvbnNbaV0uZ2V0Q29tcG9uZW50KCdQZXJzb24nKTtcblx0XHRcdFx0XHRcdGlmIChwcm9wZXJ0eS5pc0RlYWQ9PTApe1xuXHRcdFx0XHRcdFx0XHRwcm9wZXJ0eS5tb2JpbGl0eSs9Mjtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XG5cdFx0XHRcdH1cblx0XHRcdFx0dmFyIGJ1ZmY9dGhpcy5ub2RlLmdldENvbXBvbmVudCgnQnVmZicpO1xuXHRcdFx0XHRmb3IgKHZhciBpPTA7aTxidWZmLnRvZG9MaXN0Lmxlbmd0aDtpKyspe1xuXHRcdFx0XHRcdGlmIChidWZmLnRvZG9MaXN0W2ldLmVuZFR1cm49PXdpbmRvdy5nbG9iYWwubm93VHVybil7XG5cdFx0XHRcdFx0XHRpZiAoYnVmZi50b2RvTGlzdFtpXS5hY3QoKSl7XG5cdFx0XHRcdFx0XHRcdGJ1ZmYudG9kb0xpc3Quc3BsaWNlKGksMSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0XHR0aGlzLm5vd1Byb3BlcnR5PXRoaXMubm93UGxheWVyLmdldENvbXBvbmVudCgnUGVyc29uJyk7Ly/ojrflvpfnjqnlrrblsZ7mgKfpm4blkIhcblx0XHRcdFx0Y2MuZ2FtZS5lbWl0KCdzZW5kLU1zZycsJ+i9ruWIsOinkuiJsicrdGhpcy5ub3dQcm9wZXJ0eS5uaWNrbmFtZSwn57O757ufJyk7XG5cdFx0XHRcdGNjLmdhbWUuZW1pdCgndXBkYXRlLXN0YXRlJywgJzEnKTtcblx0XHRcdFx0XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0Y2FzZSAxOnsvL+eOqeWutuenu+WKqFxuXHRcdFx0XHRpZiAodGhpcy5pc1dhaXQpey8v5q2j5Zyo5pON5L2c5oiW562J5b6F5pON5L2cXG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHRcdFxuXHRcdFx0XHRpZiAodGhpcy5ub3dQcm9wZXJ0eS5nb0VuYWJsZWQpey8v5Yik5pat546p5a625piv5ZCm5Y+v5Lul6KGM6LWwXG5cdFx0XHRcdFx0dmFyIHRpcD1jYy5maW5kKCdDYW52YXMvdGlwV2luJyk7XG5cdFx0XHRcdFx0aWYgKHRoaXMubm93UHJvcGVydHkubmlja25hbWU9PSfogIHlj58nKVxuXHRcdFx0XHRcdFx0dGlwLmdldENvbXBvbmVudCgndGlwV2luZG93Jykuc3RhcnRSb2xsRGljZSgpO1xuXHRcdFx0XHRcdGVsc2V7XG5cdFx0XHRcdFx0XHR2YXIgZGljZT1jYy5maW5kKCdDYW52YXMvdGlwV2luL2RpY2UnKS5nZXRDb21wb25lbnQoJ1Nwcml0ZUluZGV4Jyk7XG5cdFx0XHRcdFx0XHRkaWNlLm5leHQoKTtcblx0XHRcdFx0XHRcdGNjLmdhbWUuZW1pdCgncm9sbC1kaWNlLWRvbmUnLGRpY2UuaW5kZXgrMSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHRoaXMuaXNXYWl0PXRydWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZXtcblx0XHRcdFx0XHR0aGlzLm5vd1Byb3BlcnR5LmdvRW5hYmxlZD0xO1xuXHRcdFx0XHRcdGNjLmdhbWUuZW1pdCgndXBkYXRlLXN0YXRlJywgJzEnKTtcblx0XHRcdFx0fVxuXHRcdFx0XHQgYnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRjYXNlIDI6e1xuXHRcdFx0XHQvL+WujOaIkOS6huS6i+S7tuinpuWPkeaIluiAheWNoeeJjOinpuWPkVxuXHRcdFx0XHRpZiAodGhpcy5pc1dhaXQpey8v5q2j5Zyo5pON5L2c5oiW562J5b6F5pON5L2cXG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y29uc29sZS5sb2coXCLlvZPliY3mraXpqqTvvJpcIix0aGlzLm5vd1N0ZXApO1xuXHRcdFx0XHRjb25zb2xlLmxvZyhcIueOqeWutuWHuueJjFwiKTtcblx0XHRcdFx0Y2MuZ2FtZS5lbWl0KCd1cGRhdGUtc3RhdGUnLCAnMScpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGNhc2UgMzoge1xuXHRcdFx0XHQvL+etieW+heeOqeWutuWHuueJjOW5tue7k+adn1xuXHRcdFx0XHRpZiAodGhpcy5ub3dQcm9wZXJ0eS51c2VDYXJkRW5hYmxlZCA9PSAxKSB7XG5cdFx0XHRcdFx0Ly/lj6/ku6Xlh7rniYxcblx0XHRcdFx0XHRpZiAodGhpcy5ub3dQbGF5ZXIubmFtZSA9PSAnUGVyc29uMScpIHtcblx0XHRcdFx0XHRcdGlmICh3aW5kb3cuZ2xvYmFsLmNhcmRfZW5kX2J0bl9zaG93ZWQgIT0gMSkge1xuXHRcdFx0XHRcdFx0XHR2YXIgYnRuID0gY2MuZmluZCgnQ2FudmFzL2VuZF9jYXJkX2J0bicpO1xuXHRcdFx0XHRcdFx0XHRidG4uYWN0aXZlID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0d2luZG93Lmdsb2JhbC5jYXJkX2VuZF9idG5fc2hvd2VkID0gMTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0Y2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdBSScpLmFpVXNlQ2FyZCh0aGlzLm5vd1Byb3BlcnR5KTtcblx0XHRcdFx0XHRcdFx0Y2MuZ2FtZS5lbWl0KCd1cGRhdGUtc3RhdGUnLCAnMScpO1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFxuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMubm93UHJvcGVydHkudXNlQ2FyZEVuYWJsZWQgPSAxO1xuXHRcdFx0XHRcdGNjLmdhbWUuZW1pdCgndXBkYXRlLXN0YXRlJywgJzEnKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGNhc2UgNDp7IC8v6L+Z6YeM5Y6f5pys5pivY2FzZTozXG5cdFx0XHRcdC8vY29uc29sZS5sb2coXCLlvZPliY3mraXpqqTvvJpcIix0aGlzLm5vd1N0ZXApO1xuXHRcdFx0XHQvL+W9k+WJjeeOqeWutueahOWbnuWQiOaVsC0xXG5cdFx0XHRcdHRoaXMubm93UHJvcGVydHkudHVybi09MTtcblx0XHRcdFx0aWYgKHRoaXMubm93UHJvcGVydHkudHVybj09MCkvL+W9k+WJjeeOqeWutuWbnuWQiOaVsOS4ujDvvIzlupTor6XliIfmjaLnjqnlrrZcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwi5YiH5o2i6KeS6ImyXCIpO1xuXHRcdFx0XHRcdHRoaXMubm93UHJvcGVydHkudHVybis9MTtcblx0XHRcdFx0XHR0aGlzLmluZGV4PSh0aGlzLmluZGV4KzEpJTQ7XG5cdFx0XHRcdFx0dGhpcy5ub3dQbGF5ZXI9d2luZG93Lmdsb2JhbC5wZXJzb25zW3RoaXMuaW5kZXhdO1xuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0XHRjYy5nYW1lLmVtaXQoJ3VwZGF0ZS1zdGF0ZScsICcxJyk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRcblx0fSxcblx0aW5pdFBlcnNvbnM6ZnVuY3Rpb24oKXtcblx0XHR3aW5kb3cuZ2xvYmFsLnBlcnNvbnNbMF0uZ2V0Q29tcG9uZW50KCdQZXJzb24nKS5iaW5kQXZhdGFyKGNjLmZpbmQoJ0NhbnZhcy9hdmF0YXIvYXZhdGFyMScpKTtcblx0XHR3aW5kb3cuZ2xvYmFsLnBlcnNvbnNbMV0uZ2V0Q29tcG9uZW50KCdQZXJzb24nKS5iaW5kQXZhdGFyKGNjLmZpbmQoJ0NhbnZhcy9hdmF0YXIvYXZhdGFyMicpKTtcblx0XHR3aW5kb3cuZ2xvYmFsLnBlcnNvbnNbMl0uZ2V0Q29tcG9uZW50KCdQZXJzb24nKS5iaW5kQXZhdGFyKGNjLmZpbmQoJ0NhbnZhcy9hdmF0YXIvYXZhdGFyMycpKTtcblx0XHR3aW5kb3cuZ2xvYmFsLnBlcnNvbnNbM10uZ2V0Q29tcG9uZW50KCdQZXJzb24nKS5iaW5kQXZhdGFyKGNjLmZpbmQoJ0NhbnZhcy9hdmF0YXIvYXZhdGFyNCcpKTtcblx0XHR3aW5kb3cuZ2xvYmFsLnBlcnNvbnNbMF0uZ2V0Q29tcG9uZW50KCdQZXJzb24nKS5uaWNrbmFtZT0n6ICB5Y+fJztcblx0XHR3aW5kb3cuZ2xvYmFsLnBlcnNvbnNbMV0uZ2V0Q29tcG9uZW50KCdQZXJzb24nKS5uaWNrbmFtZT0n5bCR5aaHJztcblx0XHR3aW5kb3cuZ2xvYmFsLnBlcnNvbnNbMl0uZ2V0Q29tcG9uZW50KCdQZXJzb24nKS5uaWNrbmFtZT0n5a+M5ZWGJztcblx0XHR3aW5kb3cuZ2xvYmFsLnBlcnNvbnNbM10uZ2V0Q29tcG9uZW50KCdQZXJzb24nKS5uaWNrbmFtZT0n5bCP5aWzJztcblx0XHQvL+WIneWni+WMluWbm+S4queOqeWutuS9jee9rlxuXHRcdC8vY29uc29sZS5sb2codGhpcy5tYXBPYmoubWFwWzBdWzBdLmdldFBvc2l0aW9uKCkpO1xuXHRcdHdpbmRvdy5nbG9iYWwucGVyc29uc1swXS5nZXRDb21wb25lbnQoJ1BlcnNvbicpLm1vdmUyUG9zKDAsMCk7XG5cdFx0d2luZG93Lmdsb2JhbC5wZXJzb25zWzFdLmdldENvbXBvbmVudCgnUGVyc29uJykubW92ZTJQb3MoMTAsMTApO1xuXHRcdHdpbmRvdy5nbG9iYWwucGVyc29uc1syXS5nZXRDb21wb25lbnQoJ1BlcnNvbicpLm1vdmUyUG9zKDAsMTApO1xuXHRcdHdpbmRvdy5nbG9iYWwucGVyc29uc1szXS5nZXRDb21wb25lbnQoJ1BlcnNvbicpLm1vdmUyUG9zKDEwLDApO1xuXHRcdGZvciAodmFyIGk9MDtpPHdpbmRvdy5nbG9iYWwucGVyc29ucy5sZW5ndGg7aSsrKXtcblx0XHRcdHZhciBub3dQZXJzb249d2luZG93Lmdsb2JhbC5wZXJzb25zW2ldO1xuXHRcdFx0dmFyIGN0eD1jYy5maW5kKFwiYmxvb2RCYXIvYmFyXCIsIG5vd1BlcnNvbikuZ2V0Q29tcG9uZW50KGNjLkdyYXBoaWNzKTtcblx0XHRcdGN0eC5jbGVhcigpO1xuXHRcdFx0Y3R4LnN0cm9rZUNvbG9yID0gY2MuQ29sb3IuUkVEO1xuXHRcdFx0Y3R4Lm1vdmVUbygtNDAsIC0xNTApO1xuXHRcdFx0Y3R4LmxpbmVXaWR0aD0xMDtcblx0XHRcdGN0eC5saW5lVG8oNjAsIC0xNTApO1xuXHRcdFx0Y3R4LnN0cm9rZSgpOyAgIFxuXHRcdFx0dmFyIHRleHQ9Y2MuZmluZChcImJsb29kQmFyL3RleHRcIiwgbm93UGVyc29uKTtcblx0XHRcdHRleHQuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5mb250U2l6ZT0yNTtcblx0XHRcdC8vY29uc29sZS5sb2codGV4dC5nZXRDb21wb25lbnQoY2MuTGFiZWwpKTtcblx0XHRcdHRleHQuc2V0UG9zaXRpb24oLTEwMCwtMTUwKTtcblx0XHRcdFxuXHRcdFx0Ly/orr7nva7ooYzliqjlgLxcblx0XHRcdGN0eD1jYy5maW5kKFwibW9iaWxpdHlCYXIvYmFyXCIsIG5vd1BlcnNvbikuZ2V0Q29tcG9uZW50KGNjLkdyYXBoaWNzKTtcblx0XHRcdGN0eC5jbGVhcigpO1xuXHRcdFx0Y3R4LnN0cm9rZUNvbG9yID0gY2MuQ29sb3IuR1JFRU47XG5cdFx0XHRjdHgubW92ZVRvKC00MCwgLTE4MCk7XG5cdFx0XHRjdHgubGluZVRvKDYwLCAtMTgwKTtcblx0XHRcdGN0eC5saW5lV2lkdGg9MTA7XG5cdFx0XHRjdHguc3Ryb2tlKCk7ICBcblx0XHRcdHRleHQ9Y2MuZmluZChcIm1vYmlsaXR5QmFyL3RleHRcIiwgbm93UGVyc29uKTtcblx0XHRcdHRleHQuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5mb250U2l6ZT0yNTtcblx0XHRcdC8vY29uc29sZS5sb2codGV4dC5nZXRDb21wb25lbnQoY2MuTGFiZWwpKTtcblx0XHRcdHRleHQuc2V0UG9zaXRpb24oLTEwMCwtMjAwKTtcdFx0XHRcblx0XHR9XG5cdH0sXG5cdGluaXRCZ206ZnVuY3Rpb24oKXtcblx0XHRjYy5sb2FkZXIubG9hZFJlcygnYmdtL+WkqeepuuS5i+WfjumSoueQtOabsicsIGNjLkF1ZGlvQ2xpcCwgZnVuY3Rpb24gKGVyciwgY2xpcCkge1xuXHRcdFx0dmFyIGF1ZGlvSUQgPSBjYy5hdWRpb0VuZ2luZS5wbGF5KGNsaXAsIHRydWUsIDAuMSk7XG5cdFx0fSk7XG5cdH0sXG5cdEluaXRpYWxDYXJkOiBmdW5jdGlvbigpIHtcblx0XHR2YXIgY2FyZE5hbWUgPSBbJ+eCuOW8uScsJ+eyvuWHhuWvvOW8uScsJ+WcsOmbtycsJ+W6h+aKpCcsJ+WkqeS9v+eahOW6h+aKpCcsJ+aImOelnueahOelneemjycsJ+iZmuW8sScsJ+WboumYn+eahOWKm+mHjycsXG5cdFx0XHRcdFx0XHRcdCfmsrvmhIgnLCflnKPlhYnmma7nhacnLCfmnJvov5zplZwnLCfnnLznnZsnLCfnjJvnlLfnmoTnpZ3npo8nLCfnm5flj5YnLCfmnZ/nvJonLCfov7fmg5EnLCfmi6/mlZEnXTtcblx0XHR2YXIgdG90Q2FyZE51bSA9IDE3O1xuXHRcdHdpbmRvdy5nbG9iYWwuY2FyZG5vZGUgPSBuZXcgQXJyYXkoKTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHRvdENhcmROdW07IGkrKykge1xuXHRcdFx0XG5cdFx0XHR2YXIgbm9kZSA9IG5ldyBjYy5Ob2RlKGNhcmROYW1lW2ldKTtcblx0XHRcdG5vZGUuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSk7XG5cdFx0XHRub2RlLmNhcmROYW1lID0gY2FyZE5hbWVbaV07XG5cdFx0XHRjYy5sb2FkZXIubG9hZFJlcygn5Y2h54mM5Zu+54mHLycrbm9kZS5jYXJkTmFtZSxjYy5TcHJpdGVGcmFtZSxmdW5jdGlvbihlcnIsc3ByaXRlRnJhbWUpIHtcblx0wqAgwqAgwqAgwqAgwqAgwqAgdGhpcy5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHNwcml0ZUZyYW1lO1xuXHRcdMKgIMKgIH0uYmluZChub2RlKSk7XG5cdFx0XHR3aW5kb3cuZ2xvYmFsLmNhcmRub2RlLnB1c2gobm9kZSk7XHRcblx0XHR9XG5cdFx0Ly/pmpDol4/nu5PmnZ/mjInpkq5cblx0XHRjYy5maW5kKCdDYW52YXMvZW5kX2NhcmRfYnRuJykuYWN0aXZlID0gZmFsc2U7XG5cdFx0Ly/pmpDol4/pgInniYznoa7lrprmjInpkq5cblx0XHRjYy5maW5kKCdDYW52YXMvY2hvb3NlX2NhcmRfY29uZmlybScpLmFjdGl2ZT1mYWxzZTtcblx0XHQvL+makOiXj+mAieeJjOWPlua2iOaMiemSrlxuXHRcdGNjLmZpbmQoJ0NhbnZhcy9jaG9vc2VfY2FyZF9jYW5jZWwnKS5hY3RpdmU9ZmFsc2U7XG5cdFx0Ly/liJ3lp4vljJZCR01cblx0XHR0aGlzLmluaXRCZ20oKTtcblx0fSxcblx0b3Blbk1lbnU6ZnVuY3Rpb24oKXtcblx0XHRcblx0XHRjYy5nYW1lLmVuZCgpO1xuXHRcdGNvbnNvbGUubG9nKCflvIDlp4vmuLjmiI8nKTtcblx0XHRjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCLlvIDlp4vnlYzpnaJcIik7XG5cdFx0XG5cdH1cbn0pO1xuXG5cbi8v55Sf5oiQ5LuObWluTnVt5YiwbWF4TnVt55qE6ZqP5py65pWwXG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/AI.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcQUkuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJjYXJkQ29zdCIsImNhcmRGdW5jdGlvbiIsImFpTW92ZSIsInJvdXRlcyIsImluZGV4IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwibGVuZ3RoIiwiZ2FtZSIsImVtaXQiLCJhaVRpZSIsImNhcmQiLCJyb2xlIiwiZmluZCIsImdldENvbXBvbmVudCIsIm5vd1BsYXllciIsImNhblNlZSIsImVuZW15SW5TaWdodCIsImdvRW5hYmxlZCIsIm1vYmlsaXR5IiwicmVtb3ZlQ2FyZCIsImFpQ29uZnVzZSIsInVzZUNhcmRFbmFibGVkIiwiTnVtYmVyIiwibmFtZSIsInRlYW1tYXRlIiwiZW5lbXkxIiwiZW5lbXkyIiwiZGlzMSIsIkJmc0RpcyIsInBvc1giLCJwb3NZIiwiZGlzMiIsImUxMiIsInZpcyIsImkiLCJpc0RlYWQiLCJzaWdodCIsInB1c2giLCJqIiwiZXllcyIsImsiLCJhaUJvb20iLCJib29tX2NlbGwiLCJ4IiwieSIsIm1hcF9tYXRyaXgiLCJyIiwiYyIsIm1hcCIsImFkaiIsImJsb29kIiwiYXR0YWNrIiwiY29uc29sZSIsImxvZyIsIm5pY2tuYW1lIiwiYWlVc2VDYXJkIiwiY2FyZHMiLCJjYXJkSUQiLCJhaUV5ZSIsImV5ZV9jZWxsIiwiZGlzIiwibm93UHJvcGVydHkiLCJidWZmIiwidG9kb0xpc3QiLCJlbmRUdXJuIiwid2luZG93IiwiZ2xvYmFsIiwibm93VHVybiIsInBlcnNvbiIsImFjdCIsInNwbGljZSIsImFpU3RlYWwiLCJyZCIsIm9uTG9hZCIsIkFycmF5Iiwic3RhcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVB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LEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLENBRGUsRUFFZixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLENBRmUsRUFHZixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLENBSGUsRUFJZixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLENBSmUsRUFLZixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLENBTGUsRUFNZixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLENBTmUsRUFPZixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLENBUGUsRUFRZixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENB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QUNBekQsUUFBQUEsTUFBTSxDQUFDYixLQUFELENBQU4sQ0FBY3NELEtBQWQsQ0FBb0JjLE1BQXBCLENBQTJCRSxFQUEzQixFQUErQixDQUEvQjtBQUNBO0FBQ0Q7O0FBQ0Q3RCxJQUFBQSxJQUFJLENBQUNPLFFBQUwsSUFBZVIsSUFBSSxDQUFDWixRQUFMLENBQWMsRUFBZCxDQUFmO0FBQ0FKLElBQUFBLEVBQUUsQ0FBQ2tCLElBQUgsQ0FBUSxhQUFSLEVBQXVCQyxZQUF2QixDQUFvQyxNQUFwQyxFQUE0Q00sVUFBNUMsQ0FBdUQsRUFBdkQ7QUFDQSxHQXBOTztBQXNOTHNELEVBQUFBLE1BdE5LLG9CQXNOSztBQUNaLFNBQUsxRSxZQUFMLEdBQW9CLElBQUkyRSxLQUFKLEVBQXBCO0FBQ0EsU0FBSzNFLFlBQUwsQ0FBa0IsQ0FBbEIsSUFBdUIsS0FBSzBDLE1BQTVCO0FBQ0EsU0FBSzFDLFlBQUwsQ0FBa0IsRUFBbEIsSUFBd0IsS0FBSzJELEtBQTdCO0FBQ0EsU0FBSzNELFlBQUwsQ0FBa0IsRUFBbEIsSUFBd0IsS0FBS1UsS0FBN0I7QUFDQSxTQUFLVixZQUFMLENBQWtCLEVBQWxCLElBQXdCLEtBQUtxQixTQUE3QjtBQUNBLFNBQUt0QixRQUFMLEdBQWMsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQixDQUFyQixFQUF1QixDQUF2QixFQUF5QixDQUF6QixFQUEyQixDQUEzQixFQUE2QixDQUE3QixFQUErQixDQUEvQixFQUFpQyxDQUFqQyxDQUFkO0FBQ0EsR0E3Tk87QUErTkw2RSxFQUFBQSxLQS9OSyxtQkErTkksQ0FFUixDQWpPSSxDQW1PTDs7QUFuT0ssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gY2MuQ2xhc3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGNhcmRDb3N0OiBudWxsLFxyXG5cdFx0Y2FyZEZ1bmN0aW9uOiBudWxsLFxyXG4gICAgfSxcclxuXHRcclxuXHRhaU1vdmU6IGZ1bmN0aW9uKHJvdXRlcykge1xyXG5cdFx0dmFyIGluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKnJvdXRlcy5sZW5ndGgpO1xyXG5cdFx0Y2MuZ2FtZS5lbWl0KCdyb3V0ZS1jaG9zZW4nLCByb3V0ZXNbaW5kZXhdKTtcclxuXHR9LFxyXG5cdFxyXG5cdGFpVGllOiBmdW5jdGlvbihjYXJkKSB7XHJcblx0XHR2YXIgcm9sZT1jYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoJ2dsb2JhbEdhbWUnKS5ub3dQbGF5ZXI7XHJcblx0XHR2YXIgY2FuU2VlID0gIGNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudCgnQUknKS5lbmVteUluU2lnaHQocm9sZSk7XHJcblx0XHRpZiAoY2FuU2VlLmxlbmd0aCkge1xyXG5cdFx0XHR2YXIgaW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqY2FuU2VlLmxlbmd0aCk7XHJcblx0XHRcdGNhblNlZVtpbmRleF0uZ29FbmFibGVkID0gMDtcclxuXHRcdH1cclxuXHRcdHJvbGUubW9iaWxpdHktPWNhcmQuY2FyZENvc3RbMTRdO1xyXG4gICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9EZWNrJykuZ2V0Q29tcG9uZW50KCdEZWNrJykucmVtb3ZlQ2FyZCgxNCk7XHJcblx0fSxcclxuXHRcclxuXHRhaUNvbmZ1c2U6IGZ1bmN0aW9uKGNhcmQpIHtcclxuXHRcdHZhciByb2xlPWNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudCgnZ2xvYmFsR2FtZScpLm5vd1BsYXllcjtcclxuXHRcdHZhciBjYW5TZWUgPSAgY2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdBSScpLmVuZW15SW5TaWdodChyb2xlKTtcclxuXHRcdGlmIChjYW5TZWUubGVuZ3RoKSB7XHJcblx0XHRcdHZhciBpbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSpjYW5TZWUubGVuZ3RoKTtcclxuXHRcdFx0Y2FuU2VlW2luZGV4XS51c2VDYXJkRW5hYmxlZCA9IDA7XHJcblx0XHR9XHJcblx0XHRyb2xlLm1vYmlsaXR5LT1jYXJkLmNhcmRDb3N0WzE1XTtcclxuICAgICAgICBjYy5maW5kKCdDYW52YXMvRGVjaycpLmdldENvbXBvbmVudCgnRGVjaycpLnJlbW92ZUNhcmQoMTUpO1xyXG5cdH0sXHJcblx0XHJcblx0ZW5lbXlJblNpZ2h0OiBmdW5jdGlvbihyb2xlKSB7XHJcblx0XHQvL+i/lOWbnnJvbGXlkozpmJ/lj4vnmoTop4bph47lhoXnmoTmlYzkurpcclxuXHRcdHZhciBpbmRleD1OdW1iZXIocm9sZS5uYW1lWzZdKTtcclxuICAgICAgICB2YXIgdGVhbW1hdGU9aW5kZXgrMj40P2luZGV4LTI6aW5kZXgrMjtcclxuXHRcdHZhciBlbmVteTE9aW5kZXgrMT40P2luZGV4LTM6aW5kZXgrMTtcclxuICAgICAgICB2YXIgZW5lbXkyPXRlYW1tYXRlKzE+ND90ZWFtbWF0ZS0zOnRlYW1tYXRlKzE7XHJcbiAgICAgICAgZW5lbXkxPWNjLmZpbmQoXCJDYW52YXMvUGVyc29ucy9QZXJzb25cIitlbmVteTEpLmdldENvbXBvbmVudCgnUGVyc29uJyk7XHJcbiAgICAgICAgZW5lbXkyPWNjLmZpbmQoXCJDYW52YXMvUGVyc29ucy9QZXJzb25cIitlbmVteTIpLmdldENvbXBvbmVudCgnUGVyc29uJyk7XHJcblx0XHRyb2xlPXJvbGUuZ2V0Q29tcG9uZW50KCdQZXJzb24nKTtcclxuXHRcdHRlYW1tYXRlPWNjLmZpbmQoXCJDYW52YXMvUGVyc29ucy9QZXJzb25cIit0ZWFtbWF0ZSkuZ2V0Q29tcG9uZW50KCdQZXJzb24nKTtcclxuXHRcdHZhciBkaXMxID0gY2MuZmluZCgnQ2FudmFzL21hcCcpLmdldENvbXBvbmVudCgnR2V0TWFwJykuQmZzRGlzKHJvbGUucG9zWCwgcm9sZS5wb3NZKTtcclxuXHRcdHZhciBkaXMyID0gY2MuZmluZCgnQ2FudmFzL21hcCcpLmdldENvbXBvbmVudCgnR2V0TWFwJykuQmZzRGlzKHRlYW1tYXRlLnBvc1gsIHRlYW1tYXRlLnBvc1kpO1xyXG5cdFx0dmFyIGUxMiA9IFtudWxsLCBlbmVteTEsIGVuZW15Ml07XHJcblx0XHR2YXIgY2FuU2VlID0gW107XHJcblx0XHR2YXIgdmlzID0gWzAsIDAsIDBdO1xyXG5cdFx0Zm9yICh2YXIgaSA9IDE7IGkgPD0gMjsgaSsrKSB7XHJcblx0XHRcdGlmIChlMTJbaV0uaXNEZWFkID09IDEpXHJcblx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdGlmIChkaXMxW2UxMltpXS5wb3NYXVtlMTJbaV0ucG9zWV0gPD0gcm9sZS5zaWdodCkge1xyXG5cdFx0XHRcdGNhblNlZS5wdXNoKGUxMltpXSk7XHJcblx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKGRpczJbZTEyW2ldLnBvc1hdW2UxMltpXS5wb3NZXSA8PSB0ZWFtbWF0ZS5zaWdodCkge1xyXG5cdFx0XHRcdGNhblNlZS5wdXNoKGUxMltpXSk7XHJcblx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdH1cclxuXHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCByb2xlLmV5ZXMubGVuZ3RoOyBqKyspXHJcblx0XHRcdFx0Zm9yICh2YXIgayA9IDA7IGsgPCByb2xlLmV5ZXNbal0ubGVuZ3RoOyBrKyspXHJcblx0XHRcdFx0XHRpZiAoZTEyW2ldLnBvc1ggPT0gcm9sZS5leWVzW2pdW2tdWzBdICYmIGUxMltpXS5wb3NZID09IHJvbGUuZXllc1tqXVtrXVsxXSlcclxuXHRcdFx0XHRcdFx0aWYgKHZpc1tpXSA9PSAwKSB7XHJcblx0XHRcdFx0XHRcdFx0Y2FuU2VlLnB1c2goZTEyW2ldKTtcclxuXHRcdFx0XHRcdFx0XHR2aXNbaV0gPSAxO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgdGVhbW1hdGUuZXllcy5sZW5ndGg7IGorKylcclxuXHRcdFx0XHRmb3IgKHZhciBrID0gMDsgayA8IHRlYW1tYXRlLmV5ZXNbal0ubGVuZ3RoOyBrKyspXHJcblx0XHRcdFx0XHRpZiAoZTEyW2ldLnBvc1ggPT0gdGVhbW1hdGUuZXllc1tqXVtrXVswXSAmJiBlMTJbaV0ucG9zWSA9PSB0ZWFtbWF0ZS5leWVzW2pdW2tdWzFdKVxyXG5cdFx0XHRcdFx0XHRpZiAodmlzW2ldID09IDApIHtcclxuXHRcdFx0XHRcdFx0XHRjYW5TZWUucHVzaChlMTJbaV0pO1xyXG5cdFx0XHRcdFx0XHRcdHZpc1tpXSA9IDE7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiBjYW5TZWU7XHJcblx0fSxcclxuXHRcclxuXHRhaUJvb206IGZ1bmN0aW9uKGNhcmQpIHtcclxuXHRcdHZhciByb2xlPWNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudCgnZ2xvYmFsR2FtZScpLm5vd1BsYXllcjtcclxuXHRcdHZhciBjYW5TZWUgPSAgY2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdBSScpLmVuZW15SW5TaWdodChyb2xlKTtcclxuXHRcdHZhciBib29tX2NlbGwgPSBbXSwgeCwgeTtcclxuXHRcdGlmIChjYW5TZWUubGVuZ3RoKSB7XHJcblx0XHRcdHZhciBpbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSpjYW5TZWUubGVuZ3RoKTtcclxuXHRcdFx0Ym9vbV9jZWxsLnB1c2goW2UxMltpbmRleF0ucG9zWCwgZTEyW2luZGV4XS5wb3NZXSk7XHJcblx0XHRcdHggPSBlMTJbaW5kZXhdLnBvc1g7XHJcblx0XHRcdHkgPSBlMTJbaW5kZXhdLnBvc1k7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dmFyIG1hcF9tYXRyaXggPSBbXHJcblx0XHRcdFx0WzEsMSwxLDEsMSwxLDEsMSwxLDEsMV0sXHJcblx0XHRcdFx0WzEsMSwwLDAsMCwxLDAsMCwwLDEsMV0sXHJcblx0XHRcdFx0WzEsMCwxLDAsMCwxLDAsMCwxLDAsMV0sXHJcblx0XHRcdFx0WzEsMCwwLDEsMSwwLDEsMSwwLDAsMV0sXHJcblx0XHRcdFx0WzEsMCwwLDEsMCwwLDAsMSwwLDAsMV0sXHJcblx0XHRcdFx0WzEsMSwxLDEsMSwxLDEsMSwxLDEsMV0sXHJcblx0XHRcdFx0WzEsMCwwLDEsMCwwLDAsMSwwLDAsMV0sXHJcblx0XHRcdFx0WzEsMCwwLDEsMSwwLDEsMSwwLDAsMV0sXHJcblx0XHRcdFx0WzEsMCwxLDAsMCwxLDAsMCwxLDAsMV0sXHJcblx0XHRcdFx0WzEsMSwwLDAsMCwxLDAsMCwwLDEsMV0sXHJcblx0XHRcdFx0WzEsMSwxLDEsMSwxLDEsMSwxLDEsMV0sXHJcblx0XHRcdF07XHJcblx0XHRcdHdoaWxlICgxKSB7XHJcblx0XHRcdFx0dmFyIHIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMTEpLCBjID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjExKTtcclxuXHRcdFx0XHRpZiAobWFwX21hdHJpeFtyXVtjXSA9PSAxKSB7XHJcblx0XHRcdFx0XHRib29tX2NlbGwucHVzaChbciwgY10pO1xyXG5cdFx0XHRcdFx0eCA9IHIsIHkgPSBjO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHR2YXIgbWFwID0gY2MuZmluZCgnQ2FudmFzL21hcCcpLmdldENvbXBvbmVudCgnR2V0TWFwJyk7XHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1hcC5hZGpbeF1beV0ubGVuZ3RoOyBpKyspXHJcblx0XHRcdGJvb21fY2VsbC5wdXNoKG1hcC5hZGpbeF1beV1baV0pO1xyXG5cdFx0Zm9yICh2YXIgaSA9IDA7aSA8IGJvb21fY2VsbC5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRpZiAoYm9vbV9jZWxsW2ldWzBdID09IGVuZW15MS5wb3NYICYmIGJvb21fY2VsbFtpXVsxXSA9PSBlbmVteTEucG9zWSkge1xyXG5cdFx0XHRcdGVuZW15MS5ibG9vZCAtPSByb2xlLmF0dGFjayoyOyBjb25zb2xlLmxvZyhlbmVteTEubmlja25hbWUpO31cclxuXHRcdFx0aWYgKGJvb21fY2VsbFtpXVswXSA9PSBlbmVteTIucG9zWCAmJiBib29tX2NlbGxbaV1bMV0gPT0gZW5lbXkyLnBvc1kpIHtcclxuXHRcdFx0XHRlbmVteTIuYmxvb2QgLT0gcm9sZS5hdHRhY2sqMjsgY29uc29sZS5sb2coZW5lbXkyLm5pY2tuYW1lKTt9XHJcblx0XHRcdGlmIChlbmVteTEuYmxvb2QgPD0gMClcclxuXHRcdFx0XHRlbmVteTEuaXNEZWFkID0gMTtcclxuXHRcdFx0aWYgKGVuZW15Mi5ibG9vZCA8PSAwKVxyXG5cdFx0XHRcdGVuZW15Mi5pc0RlYWQgPSAxO1xyXG5cdFx0fVxyXG5cdFx0cm9sZS5tb2JpbGl0eS09Y2FyZC5jYXJkQ29zdFswXTtcclxuXHRcdGNjLmZpbmQoJ0NhbnZhcy9EZWNrJykuZ2V0Q29tcG9uZW50KCdEZWNrJykucmVtb3ZlQ2FyZCgwKTtcclxuXHR9LFxyXG5cdFxyXG5cdGFpVXNlQ2FyZDogZnVuY3Rpb24ocm9sZSkge1xyXG5cdFx0d2hpbGUgKHJvbGUuY2FyZHMubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRpZiAoTWF0aC5yYW5kb20oKSA8IDAuNSkge1xyXG5cdFx0XHRcdHZhciBpbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSpyb2xlLmNhcmRzLmxlbmd0aCk7XHJcblx0XHRcdFx0dmFyIGNhcmRJRCA9IHJvbGUuY2FyZHNbaW5kZXhdO1xyXG5cdFx0XHRcdGlmICh0aGlzLmNhcmRDb3N0W2NhcmRJRF0gPiByb2xlLm1vYmlsaXR5KVxyXG5cdFx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0aWYgKGNhcmRJRCA9PSAwIHx8IGNhcmRJRCA9PSAxMSB8fCBjYXJkSUQgPT0gMTMgfHwgY2FyZElEID09IDE0IHx8IGNhcmRJRCA9PSAxNSlcclxuXHRcdFx0XHRcdHRoaXMuY2FyZEZ1bmN0aW9uW2NhcmRJRF0oY2MuZmluZCgnQ2FudmFzL0NhcmQnKS5nZXRDb21wb25lbnQoJ0NhcmQnKSk7XHJcblx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0Y2MuZmluZCgnQ2FudmFzL0NhcmQnKS5nZXRDb21wb25lbnQoJ0NhcmQnKS5jYXJkRnVuY3Rpb25bY2FyZElEXShjYy5maW5kKCdDYW52YXMvQ2FyZCcpLmdldENvbXBvbmVudCgnQ2FyZCcpKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHR9XHJcblx0XHRcclxuXHR9LFxyXG5cdFxyXG5cdGFpRXllOiBmdW5jdGlvbihjYXJkKSB7XHJcblx0XHR2YXIgeCwgeTtcclxuXHRcdHZhciBleWVfY2VsbCA9IFtdO1xyXG5cdFx0dmFyIG1hcF9tYXRyaXggPSBbXHJcblx0XHRcdFx0WzEsMSwxLDEsMSwxLDEsMSwxLDEsMV0sXHJcblx0XHRcdFx0WzEsMSwwLDAsMCwxLDAsMCwwLDEsMV0sXHJcblx0XHRcdFx0WzEsMCwxLDAsMCwxLDAsMCwxLDAsMV0sXHJcblx0XHRcdFx0WzEsMCwwLDEsMSwwLDEsMSwwLDAsMV0sXHJcblx0XHRcdFx0WzEsMCwwLDEsMCwwLDAsMSwwLDAsMV0sXHJcblx0XHRcdFx0WzEsMSwxLDEsMSwxLDEsMSwxLDEsMV0sXHJcblx0XHRcdFx0WzEsMCwwLDEsMCwwLDAsMSwwLDAsMV0sXHJcblx0XHRcdFx0WzEsMCwwLDEsMSwwLDEsMSwwLDAsMV0sXHJcblx0XHRcdFx0WzEsMCwxLDAsMCwxLDAsMCwxLDAsMV0sXHJcblx0XHRcdFx0WzEsMSwwLDAsMCwxLDAsMCwwLDEsMV0sXHJcblx0XHRcdFx0WzEsMSwxLDEsMSwxLDEsMSwxLDEsMV0sXHJcblx0XHRcdF07XHJcblx0XHR3aGlsZSAoMSkge1xyXG5cdFx0XHR2YXIgciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoxMSksIGMgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMTEpO1xyXG5cdFx0XHRpZiAobWFwX21hdHJpeFtyXVtjXSA9PSAxKSB7XHJcblx0XHRcdFx0ZXllX2NlbGwucHVzaChbciwgY10pO1xyXG5cdFx0XHRcdHggPSByLCB5ID0gYztcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0dmFyIG1hcCA9IGNjLmZpbmQoJ0NhbnZhcy9tYXAnKS5nZXRDb21wb25lbnQoJ0dldE1hcCcpO1xyXG5cdFx0dmFyIGRpcyA9IG1hcC5CZnNEaXMoeCx5KTtcclxuXHRcdHZhciByb2xlPWNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudCgnZ2xvYmFsR2FtZScpLm5vd1Byb3BlcnR5O1xyXG5cdFx0Zm9yICh2YXIgaT0wO2k8MTE7KytpKVxyXG5cdFx0XHRmb3IgKHZhciBqPTA7ajwxMTsrK2ope1xyXG5cdFx0XHRcdGlmIChkaXNbaV1bal0hPS0xJiZkaXNbaV1bal08PTMpXHJcblx0XHRcdFx0XHRleWVfY2VsbC5wdXNoKFtpLGpdKTtcclxuXHRcdFx0fVxyXG5cdFx0cm9sZS5leWVzLnB1c2goZXllX2NlbGwpO1xyXG5cdFx0dmFyIGJ1ZmY9Y2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdCdWZmJyk7XHJcblx0XHRidWZmLnRvZG9MaXN0LnB1c2goe1xyXG5cdFx0XHRlbmRUdXJuOndpbmRvdy5nbG9iYWwubm93VHVybis1LFxyXG5cdFx0XHRwZXJzb246cm9sZSxcclxuXHRcdFx0YWN0OmZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0aWYgKHRoaXMucGVyc29uICE9IGNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudCgnZ2xvYmFsR2FtZScpLm5vd1Byb3BlcnR5KVxyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdHJvbGUuZXllcy5zcGxpY2UoMCwxKTtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHRyb2xlLm1vYmlsaXR5LT1jYXJkLmNhcmRDb3N0WzExXTtcclxuXHRcdGNjLmZpbmQoJ0NhbnZhcy9EZWNrJykuZ2V0Q29tcG9uZW50KCdEZWNrJykucmVtb3ZlQ2FyZCgxMSk7XHJcblx0fSxcclxuXHRcclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG5cclxuXHRhaVN0ZWFsOiBmdW5jdGlvbihjYXJkKSB7XHJcblx0XHR2YXIgcm9sZT1jYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoJ2dsb2JhbEdhbWUnKS5ub3dQbGF5ZXI7XHJcblx0XHR2YXIgY2FuU2VlID0gIGNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudCgnQUknKS5lbmVteUluU2lnaHQocm9sZSk7XHJcblx0XHRpZiAoY2FuU2VlLmxlbmd0aCkge1xyXG5cdFx0XHR2YXIgaW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqY2FuU2VlLmxlbmd0aCk7XHJcblx0XHRcdFxyXG5cdFx0XHRpZiAoY2FuU2VlW2luZGV4XS5jYXJkcy5sZW5ndGgpIHtcclxuXHRcdFx0XHR2YXIgcmQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqY2FuU2VlW2luZGV4XS5jYXJkcy5sZW5ndGgpO1xyXG5cdFx0XHRcdHJvbGUuY2FyZHMucHVzaChjYW5TZWVbaW5kZXhdLmNhcmRzW3JkXSk7XHJcblx0XHRcdFx0Y2FuU2VlW2luZGV4XS5jYXJkcy5zcGxpY2UocmQsIDEpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyb2xlLm1vYmlsaXR5LT1jYXJkLmNhcmRDb3N0WzEzXTtcclxuXHRcdGNjLmZpbmQoJ0NhbnZhcy9EZWNrJykuZ2V0Q29tcG9uZW50KCdEZWNrJykucmVtb3ZlQ2FyZCgxMyk7XHJcblx0fSxcclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG5cdFx0dGhpcy5jYXJkRnVuY3Rpb24gPSBuZXcgQXJyYXkoKTtcclxuXHRcdHRoaXMuY2FyZEZ1bmN0aW9uWzBdID0gdGhpcy5haUJvb207XHJcblx0XHR0aGlzLmNhcmRGdW5jdGlvblsxMV0gPSB0aGlzLmFpRXllO1xyXG5cdFx0dGhpcy5jYXJkRnVuY3Rpb25bMTRdID0gdGhpcy5haVRpZTtcclxuXHRcdHRoaXMuY2FyZEZ1bmN0aW9uWzE1XSA9IHRoaXMuYWlDb25mdXNlO1xyXG5cdFx0dGhpcy5jYXJkQ29zdD1bNCwzLDIsMywzLDQsNCw1LDIsMywzLDMsMywzLDQsNCw1XTtcclxuXHR9LFxyXG5cclxuICAgIHN0YXJ0ICgpIHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxyXG59KTtcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Card.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c7d01kf4m1Pi6InQGfSXvtd', 'Card');
// scripts/Card.js

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
    cardCost: [cc.Integer],
    cardFunction: null
  },
  //卡牌响应函数中的this不是card.js
  boom_0: function boom_0(card) {
    cc.find('Canvas/Deck').active = false; //暂时不让点手牌堆

    cc.find('Canvas/end_card_btn').active = false; //暂时不让结束出牌

    cc.find('Canvas/Deck').getComponent('Deck').showTips("请选择要轰炸的地图块");
    var map = cc.find('Canvas/map').getComponent('GetMap');
    map.openAllMonitor('boom-cell-chosen');
  },
  missile_1: function missile_1(card) {
    var role = cc.find('Canvas').getComponent('globalGame').nowPlayer;
    var map = cc.find('Canvas/map').getComponent('GetMap');
    var dis = map.BfsDis(role.getComponent('Person').posX, role.getComponent('Person').posY);
    console.log(dis);
    var index = Number(role.name[6]);
    var teammate = index + 2 > 4 ? index - 2 : index + 2;
    var enemy1 = index + 1 > 4 ? index - 3 : index + 1;
    var enemy2 = teammate + 1 > 4 ? teammate - 3 : teammate + 1;
    enemy1 = cc.find("Canvas/Persons/Person" + enemy1).getComponent('Person');
    enemy2 = cc.find("Canvas/Persons/Person" + enemy2).getComponent('Person');
    if (dis[enemy1.posX][enemy1.posY] <= 5) enemy1.blood -= role.attack;
    if (dis[enemy2.posX][enemy2.posY] <= 5) enemy2.blood -= role.attack;
    role.getComponent('Person').mobility -= card.cardCost[1];
    cc.find('Canvas/Deck').getComponent('Deck').removeCard(1);
  },
  mine_2: function mine_2(card) {
    var role = cc.find('Canvas').getComponent('globalGame').nowProperty;
    var map = cc.find('Canvas/map').getComponent('GetMap');
    map.map[role.posX][role.posY].getComponent('Cell').haveMine = 1;
    map.map[role.posX][role.posY].getComponent('Cell').mineAttack = role.attack * 2;
    role.getComponent('Person').mobility -= card.cardCost[2];
    cc.find('Canvas/Deck').getComponent('Deck').removeCard(2);
  },
  shield_3: function shield_3(card) {
    var role = cc.find('Canvas').getComponent('globalGame').nowProperty;
    role.shield = 1;
    role.mobility -= card.cardCost[3];
    cc.find('Canvas/Deck').getComponent('Deck').removeCard(3);
  },
  halfShield_4: function halfShield_4(card) {
    var role = cc.find('Canvas').getComponent('globalGame').nowPlayer;
    var index = Number(role.name[6]);
    var teammate = index + 2 > 4 ? index - 2 : index + 2;
    teammate = cc.find("Canvas/Persons/Person" + teammate).getComponent('Person');
    role = cc.find('Canvas').getComponent('globalGame').nowProperty;
    role.halfShield += 1;
    if (teammate.isDead == 0) teammate.halfShield += 1;
    role.mobility -= card.cardCost[4];
    cc.find('Canvas/Deck').getComponent('Deck').removeCard(4);
  },
  bless_5: function bless_5(card) {
    var role = cc.find('Canvas').getComponent('globalGame').nowPlayer;
    var index = Number(role.name[6]);
    var teammate = index + 2 > 4 ? index - 2 : index + 2;
    role.getComponent('Person').attcak += 1;
    cc.find("Canvas/Persons/Person" + teammate).getComponent('Person').attack += 1;
    var buff = cc.find('Canvas').getComponent('Buff');
    buff.todoList.push({
      endTurn: window.global.nowTurn + 2,
      person: role,
      act: function act() {
        if (this.person != cc.find('Canvas').getComponent('globalGame').nowPlayer) return false;
        this.person.getComponent('Person').attack = Math.max(0, this.person.getComponent('Person').attack - 1);
        return true;
      }
    });
    buff.todoList.push({
      endTurn: window.global.nowTurn + 2,
      person: cc.find("Canvas/Persons/Person" + teammate),
      act: function act() {
        if (this.person != cc.find('Canvas').getComponent('globalGame').nowPlayer) return false;
        this.person.getComponent('Person').attack = Math.max(0, this.person.getComponent('Person').attack - 1);
        return true;
      }
    });
    role.getComponent('Person').mobility -= card.cardCost[5];
    cc.find('Canvas/Deck').getComponent('Deck').removeCard(5);
  },
  weak_6: function weak_6(card) {
    var role = cc.find('Canvas').getComponent('globalGame').nowPlayer;
    var index = Number(role.name[6]);
    var teammate = index + 2 > 4 ? index - 2 : index + 2;
    var enemy1 = index + 1 > 4 ? index - 3 : index + 1;
    var enemy2 = teammate + 1 > 4 ? teammate - 3 : teammate + 1;
    enemy1 = cc.find("Canvas/Persons/Person" + enemy1).getComponent('Person');
    enemy2 = cc.find("Canvas/Persons/Person" + enemy2).getComponent('Person');
    var buff = cc.find('Canvas').getComponent('Buff');
    buff.todoList.push({
      endTurn: window.global.nowTurn + 2,
      person: [enemy1, enemy1.attack != 0],
      act: function act() {
        if (this.person[0] != cc.find('Canvas').getComponent('globalGame').nowProperty) return false;
        this.person[0].attack += this.person[1];
        return true;
      }
    });
    buff.todoList.push({
      endTurn: window.global.nowTurn + 2,
      person: [enemy2, enemy2.attack != 0],
      act: function act() {
        if (this.person[0] != cc.find('Canvas').getComponent('globalGame').nowProperty) return false;
        this.person[0].attack += this.person[1];
        return true;
      }
    });
    enemy1.attack = Math.max(0, enemy1.attack - 1);
    enemy2.attack = Math.max(0, enemy2.attack - 1);
    role.getComponent('Person').mobility -= card.cardCost[6];
    cc.find('Canvas/Deck').getComponent('Deck').removeCard(6);
  },
  teamForce_7: function teamForce_7(card) {
    var role = cc.find('Canvas').getComponent('globalGame').nowPlayer;
    var index = Number(role.name[6]);
    var teammate = index + 2 > 4 ? index - 2 : index + 2;
    var enemy1 = index + 1 > 4 ? index - 3 : index + 1;
    var enemy2 = teammate + 1 > 4 ? teammate - 3 : teammate + 1;
    role = cc.find("Canvas/Persons/Person" + index).getComponent('Person');
    teammate = cc.find("Canvas/Persons/Person" + teammate).getComponent('Person');
    enemy1 = cc.find("Canvas/Persons/Person" + enemy1).getComponent('Person');
    enemy2 = cc.find("Canvas/Persons/Person" + enemy2).getComponent('Person');
    if (teammate.isDead == 1) cc.find('Canvas/Deck').getComponent('Deck').showTips('队友已死亡，白给 QAQ');else if (7 in teammate.cards) {
      if (teammate.mobility < 5) cc.find('Canvas/Deck').getComponent('Deck').showTips('队友行动值不足，白给 QAQ');else {
        enemy1.blood -= 3;
        enemy2.blood -= 3;
        if (enemy1.blood <= 0) enemy1.isDead = 1;
        if (enemy2.blood <= 0) enemy2.isDead = 1;
      }
    } else {
      cc.find('Canvas/Deck').getComponent('Deck').showTips('队友无此牌，白给 QAQ');
    }
    role.mobility -= card.cardCost[7];
    cc.find('Canvas/Deck').getComponent('Deck').removeCard(7);
  },
  heal_8: function heal_8(card) {
    var role = cc.find('Canvas').getComponent('globalGame').nowProperty;
    role.blood += 1;
    role.mobility -= card.cardCost[8];
    cc.find('Canvas/Deck').getComponent('Deck').removeCard(8);
  },
  holyNova_9: function holyNova_9(card) {
    var role = cc.find('Canvas').getComponent('globalGame').nowPlayer;
    var index = Number(role.name[6]);
    var teammate = index + 2 > 4 ? index - 2 : index + 2;
    var enemy1 = index + 1 > 4 ? index - 3 : index + 1;
    var enemy2 = teammate + 1 > 4 ? teammate - 3 : teammate + 1;
    role = cc.find("Canvas/Persons/Person" + index).getComponent('Person');
    teammate = cc.find("Canvas/Persons/Person" + teammate).getComponent('Person');
    enemy1 = cc.find("Canvas/Persons/Person" + enemy1).getComponent('Person');
    enemy2 = cc.find("Canvas/Persons/Person" + enemy2).getComponent('Person');
    if (role.isDead == 0) role.blood += 2;
    if (teammate.isDead == 0) teammate.blood += 2;
    if (enemy1.isDead == 0) enemy1.blood += 1;
    if (enemy2.isDead == 0) enemy2.blood += 1;
    role.mobility -= card.cardCost[9];
    cc.find('Canvas/Deck').getComponent('Deck').removeCard(9);
  },
  telescope_10: function telescope_10(card) {
    var role = cc.find('Canvas').getComponent('globalGame').nowProperty;
    role.sight++;
    var buff = cc.find('Canvas').getComponent('Buff');
    buff.todoList.push({
      endTurn: window.global.nowTurn + 5,
      person: role,
      act: function act() {
        if (this.person != cc.find('Canvas').getComponent('globalGame').nowProperty) return false;
        this.person.sight--;
        return true;
      }
    });
    role.mobility -= card.cardCost[10];
    cc.find('Canvas/Deck').getComponent('Deck').removeCard(10);
  },
  eye_11: function eye_11(card) {
    cc.find('Canvas/Deck').active = false; //暂时不让点手牌堆

    cc.find('Canvas/end_card_btn').active = false; //暂时不让结束出牌

    cc.find('Canvas/Deck').getComponent('Deck').showTips("请选择要放置眼睛的地图块");
    var map = cc.find('Canvas/map').getComponent('GetMap');
    map.openAllMonitor('eye-cell-chosen');
  },
  tough_12: function tough_12(card) {
    var role = cc.find('Canvas').getComponent('globalGame').nowProperty;
    role.attack *= 2;
    var buff = cc.find('Canvas').getComponent('Buff');
    buff.todoList.push({
      endTurn: window.global.nowTurn + 1,
      person: role,
      act: function act() {
        if (this.person != cc.find('Canvas').getComponent('globalGame').nowProperty) return false;
        this.person.attack = Number(this.person.attack / 2);
        return true;
      }
    });
    role.mobility -= card.cardCost[12];
    cc.find('Canvas/Deck').getComponent('Deck').removeCard(12);
  },
  waitSteal: function waitSteal() {
    //this 为人物的person.js
    var role = cc.find('Canvas').getComponent('globalGame').nowPlayer;
    var index = Number(role.name[6]);
    var teammate = index + 2 > 4 ? index - 2 : index + 2;
    var enemy1 = index + 1 > 4 ? index - 3 : index + 1;
    var enemy2 = teammate + 1 > 4 ? teammate - 3 : teammate + 1;
    role = cc.find("Canvas/Persons/Person" + index).getComponent('Person');
    teammate = cc.find("Canvas/Persons/Person" + teammate).getComponent('Person');
    enemy1 = cc.find("Canvas/Persons/Person" + enemy1).getComponent('Person');
    enemy2 = cc.find("Canvas/Persons/Person" + enemy2).getComponent('Person');

    if (this.cards.length == 0) {
      cc.find('Canvas/Deck').getComponent('Deck').showTips('无手牌可盗取 QAQ');
    } else {
      var rd = Math.floor(Math.random() * this.cards.length);
      var node = cc.instantiate(window.global.cardnode[this.cards[rd]]);
      node.setPosition(0, 0);
      node.on('mousedown', function (event) {
        this.destroy();
      }, node);
      node.parent = this.node.parent.parent;
      role.cards.push(this.cards[rd]);
      this.cards.splice(rd, 1);
    }

    teammate.avatar.off('mousedown', cc.find('Canvas/Card').getComponent('Card').waitSteal, teammate);
    enemy1.avatar.off('mousedown', cc.find('Canvas/Card').getComponent('Card').waitSteal, enemy1);
    enemy2.avatar.off('mousedown', cc.find('Canvas/Card').getComponent('Card').waitSteal, enemy2);
    cc.find('Canvas/Deck').active = true;
    cc.find('Canvas/end_card_btn').active = true;
  },
  steal_13: function steal_13(card) {
    cc.find('Canvas/Deck').active = false; //暂时不让点手牌堆

    cc.find('Canvas/end_card_btn').active = false; //暂时不让结束出牌

    var role = cc.find('Canvas').getComponent('globalGame').nowPlayer;
    var index = Number(role.name[6]);
    var teammate = index + 2 > 4 ? index - 2 : index + 2;
    var enemy1 = index + 1 > 4 ? index - 3 : index + 1;
    var enemy2 = teammate + 1 > 4 ? teammate - 3 : teammate + 1;
    role = cc.find("Canvas/Persons/Person" + index).getComponent('Person');
    teammate = cc.find("Canvas/Persons/Person" + teammate).getComponent('Person');
    enemy1 = cc.find("Canvas/Persons/Person" + enemy1).getComponent('Person');
    enemy2 = cc.find("Canvas/Persons/Person" + enemy2).getComponent('Person');
    var mist = cc.find('Canvas/mist').getComponent('Mist');
    var havePeople = 0;

    if (mist.mistArr[teammate.posX][teammate.posY].active == false) {
      teammate.avatar.on('mousedown', card.waitSteal, teammate);
      havePeople = 1;
    }

    if (mist.mistArr[enemy1.posX][enemy1.posY].active == false) {
      enemy1.avatar.on('mousedown', card.waitSteal, enemy1);
      havePeople = 1;
    }

    if (mist.mistArr[enemy2.posX][enemy2.posY].active == false) {
      enemy2.avatar.on('mousedown', card.waitSteal, enemy2);
      havePeople = 1;
    }

    if (havePeople == 0) cc.find('Canvas/Deck').getComponent('Deck').showTips('视野内无玩家 QAQ');
    role.mobility -= card.cardCost[13];
    cc.find('Canvas/Deck').getComponent('Deck').removeCard(13);
  },
  stopMove: function stopMove() {
    //this为人物的person.js
    var role = cc.find('Canvas').getComponent('globalGame').nowPlayer;
    var index = Number(role.name[6]);
    var teammate = index + 2 > 4 ? index - 2 : index + 2;
    var enemy1 = index + 1 > 4 ? index - 3 : index + 1;
    var enemy2 = teammate + 1 > 4 ? teammate - 3 : teammate + 1;
    role = cc.find("Canvas/Persons/Person" + index).getComponent('Person');
    teammate = cc.find("Canvas/Persons/Person" + teammate).getComponent('Person');
    enemy1 = cc.find("Canvas/Persons/Person" + enemy1).getComponent('Person');
    enemy2 = cc.find("Canvas/Persons/Person" + enemy2).getComponent('Person');
    this.goEnabled = 0;
    enemy1.avatar.off('mousedown', cc.find('Canvas/Card').getComponent('Card').stopMove, enemy1);
    enemy2.avatar.off('mousedown', cc.find('Canvas/Card').getComponent('Card').stopMove, enemy2);
    cc.find('Canvas/Deck').active = true;
    cc.find('Canvas/end_card_btn').active = true;
  },
  tie_14: function tie_14(card) {
    cc.find('Canvas/Deck').active = false; //暂时不让点手牌堆

    cc.find('Canvas/end_card_btn').active = false; //暂时不让结束出牌

    var role = cc.find('Canvas').getComponent('globalGame').nowPlayer;
    var index = Number(role.name[6]);
    var teammate = index + 2 > 4 ? index - 2 : index + 2;
    var enemy1 = index + 1 > 4 ? index - 3 : index + 1;
    var enemy2 = teammate + 1 > 4 ? teammate - 3 : teammate + 1;
    role = cc.find("Canvas/Persons/Person" + index).getComponent('Person');
    teammate = cc.find("Canvas/Persons/Person" + teammate).getComponent('Person');
    enemy1 = cc.find("Canvas/Persons/Person" + enemy1).getComponent('Person');
    enemy2 = cc.find("Canvas/Persons/Person" + enemy2).getComponent('Person');
    var mist = cc.find('Canvas/mist').getComponent('Mist');
    var havePeople = 0;

    if (mist.mistArr[enemy1.posX][enemy1.posY].active == false) {
      enemy1.avatar.on('mousedown', card.stopMove, enemy1);
      havePeople = 1;
    }

    if (mist.mistArr[enemy2.posX][enemy2.posY].active == false) {
      enemy2.avatar.on('mousedown', card.stopMove, enemy2);
      havePeople = 1;
    }

    if (havePeople == 0) {
      cc.find('Canvas/Deck').getComponent('Deck').showTips('视野内无敌人 QAQ');
      cc.find('Canvas/Deck').active = true;
      cc.find('Canvas/end_card_btn').active = true;
    }

    role.mobility -= card.cardCost[14];
    cc.find('Canvas/Deck').getComponent('Deck').removeCard(14);
  },
  stopUseCard: function stopUseCard() {
    //this为人物的person.js
    var role = cc.find('Canvas').getComponent('globalGame').nowPlayer;
    var index = Number(role.name[6]);
    var teammate = index + 2 > 4 ? index - 2 : index + 2;
    var enemy1 = index + 1 > 4 ? index - 3 : index + 1;
    var enemy2 = teammate + 1 > 4 ? teammate - 3 : teammate + 1;
    role = cc.find("Canvas/Persons/Person" + index).getComponent('Person');
    teammate = cc.find("Canvas/Persons/Person" + teammate).getComponent('Person');
    enemy1 = cc.find("Canvas/Persons/Person" + enemy1).getComponent('Person');
    enemy2 = cc.find("Canvas/Persons/Person" + enemy2).getComponent('Person');
    this.useCardEnabled = 0;
    enemy1.avatar.off('mousedown', cc.find('Canvas/Card').getComponent('Card').stopUseCard, enemy1);
    enemy2.avatar.off('mousedown', cc.find('Canvas/Card').getComponent('Card').stopUseCard, enemy2);
    cc.find('Canvas/Deck').active = true;
    cc.find('Canvas/end_card_btn').active = true;
  },
  confuse_15: function confuse_15(card) {
    cc.find('Canvas/Deck').active = false; //暂时不让点手牌堆

    cc.find('Canvas/end_card_btn').active = false; //暂时不让结束出牌

    var role = cc.find('Canvas').getComponent('globalGame').nowPlayer;
    var index = Number(role.name[6]);
    var teammate = index + 2 > 4 ? index - 2 : index + 2;
    var enemy1 = index + 1 > 4 ? index - 3 : index + 1;
    var enemy2 = teammate + 1 > 4 ? teammate - 3 : teammate + 1;
    role = cc.find("Canvas/Persons/Person" + index).getComponent('Person');
    teammate = cc.find("Canvas/Persons/Person" + teammate).getComponent('Person');
    enemy1 = cc.find("Canvas/Persons/Person" + enemy1).getComponent('Person');
    enemy2 = cc.find("Canvas/Persons/Person" + enemy2).getComponent('Person');
    var mist = cc.find('Canvas/mist').getComponent('Mist');
    var havePeople = 0;

    if (mist.mistArr[enemy1.posX][enemy1.posY].active == false) {
      enemy1.avatar.on('mousedown', card.stopUseCard, enemy1);
      havePeople = 1;
    }

    if (mist.mistArr[enemy2.posX][enemy2.posY].active == false) {
      enemy2.avatar.on('mousedown', card.stopUseCard, enemy2);
      havePeople = 1;
    }

    if (havePeople == 0) {
      cc.find('Canvas/Deck').getComponent('Deck').showTips('视野内无敌人 QAQ');
      cc.find('Canvas/Deck').active = true;
      cc.find('Canvas/end_card_btn').active = true;
    }

    role.mobility -= card.cardCost[15];
    cc.find('Canvas/Deck').getComponent('Deck').removeCard(15);
  },
  save_16: function save_16(card) {
    var role = cc.find('Canvas').getComponent('globalGame').nowPlayer;
    var index = Number(role.name[6]);
    var teammate = index + 2 > 4 ? index - 2 : index + 2;
    teammate = cc.find("Canvas/Persons/Person" + teammate).getComponent('Person');

    if (teammate.isDead == 1) {
      teammate.isDead = 0;
      teammate.blood = 5;
      teammate.mobility = 3;
    }

    role.getComponent('Person').mobility -= card.cardCost[16];
    cc.find('Canvas/Deck').getComponent('Deck').removeCard(16);
  },
  onLoad: function onLoad() {
    this.cardCost = [4, 3, 2, 3, 3, 4, 4, 5, 2, 3, 3, 3, 3, 3, 4, 4, 5];
    this.cardFunction = new Array();
    this.cardFunction[0] = this.boom_0;
    this.cardFunction[1] = this.missile_1;
    this.cardFunction[2] = this.mine_2;
    this.cardFunction[3] = this.shield_3;
    this.cardFunction[4] = this.halfShield_4;
    this.cardFunction[5] = this.bless_5;
    this.cardFunction[6] = this.weak_6;
    this.cardFunction[7] = this.teamForce_7;
    this.cardFunction[8] = this.heal_8;
    this.cardFunction[9] = this.holyNova_9;
    this.cardFunction[10] = this.telescope_10;
    this.cardFunction[11] = this.eye_11;
    this.cardFunction[12] = this.tough_12;
    this.cardFunction[13] = this.steal_13;
    this.cardFunction[14] = this.tie_14;
    this.cardFunction[15] = this.confuse_15;
    this.cardFunction[16] = this.save_16; //响应卡牌0炸弹

    cc.game.on('boom-cell-chosen', function (x, y) {
      var boom_cell = [[x, y]];
      var map = cc.find('Canvas/map').getComponent('GetMap');

      for (var i = 0; i < map.adj[x][y].length; i++) {
        boom_cell.push(map.adj[x][y][i]);
      }

      var role = cc.find('Canvas').getComponent('globalGame').nowPlayer;
      var index = Number(role.name[6]);
      var teammate = index + 2 > 4 ? index - 2 : index + 2;
      var enemy1 = index + 1 > 4 ? index - 3 : index + 1;
      var enemy2 = teammate + 1 > 4 ? teammate - 3 : teammate + 1;
      role = cc.find("Canvas/Persons/Person" + index).getComponent('Person');
      teammate = cc.find("Canvas/Persons/Person" + teammate).getComponent('Person');
      enemy1 = cc.find("Canvas/Persons/Person" + enemy1).getComponent('Person');
      enemy2 = cc.find("Canvas/Persons/Person" + enemy2).getComponent('Person');

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

      role.mobility -= this.cardCost[0];
      cc.find('Canvas/Deck').getComponent('Deck').removeCard(0);
      cc.find('Canvas/Deck').active = true; //恢复卡牌堆

      cc.find('Canvas/end_card_btn').active = true; //恢复结束出牌
    }, this); //响应卡牌11插眼

    cc.game.on('eye-cell-chosen', function (x, y) {
      var eye_cell = [[x, y]];
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
      role.mobility -= this.cardCost[11];
      cc.find('Canvas/Deck').getComponent('Deck').removeCard(11);
      cc.find('Canvas/Deck').active = true; //恢复卡牌堆

      cc.find('Canvas/end_card_btn').active = true; //恢复结束出牌
    }, this);
  },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcQ2FyZC5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImNhcmRDb3N0IiwiSW50ZWdlciIsImNhcmRGdW5jdGlvbiIsImJvb21fMCIsImNhcmQiLCJmaW5kIiwiYWN0aXZlIiwiZ2V0Q29tcG9uZW50Iiwic2hvd1RpcHMiLCJtYXAiLCJvcGVuQWxsTW9uaXRvciIsIm1pc3NpbGVfMSIsInJvbGUiLCJub3dQbGF5ZXIiLCJkaXMiLCJCZnNEaXMiLCJwb3NYIiwicG9zWSIsImNvbnNvbGUiLCJsb2ciLCJpbmRleCIsIk51bWJlciIsIm5hbWUiLCJ0ZWFtbWF0ZSIsImVuZW15MSIsImVuZW15MiIsImJsb29kIiwiYXR0YWNrIiwibW9iaWxpdHkiLCJyZW1vdmVDYXJkIiwibWluZV8yIiwibm93UHJvcGVydHkiLCJoYXZlTWluZSIsIm1pbmVBdHRhY2siLCJzaGllbGRfMyIsInNoaWVsZCIsImhhbGZTaGllbGRfNCIsImhhbGZTaGllbGQiLCJpc0RlYWQiLCJibGVzc181IiwiYXR0Y2FrIiwiYnVmZiIsInRvZG9MaXN0IiwicHVzaCIsImVuZFR1cm4iLCJ3aW5kb3ciLCJnbG9iYWwiLCJub3dUdXJuIiwicGVyc29uIiwiYWN0IiwiTWF0aCIsIm1heCIsIndlYWtfNiIsInRlYW1Gb3JjZV83IiwiY2FyZHMiLCJoZWFsXzgiLCJob2x5Tm92YV85IiwidGVsZXNjb3BlXzEwIiwic2lnaHQiLCJleWVfMTEiLCJ0b3VnaF8xMiIsIndhaXRTdGVhbCIsImxlbmd0aCIsInJkIiwiZmxvb3IiLCJyYW5kb20iLCJub2RlIiwiaW5zdGFudGlhdGUiLCJjYXJkbm9kZSIsInNldFBvc2l0aW9uIiwib24iLCJldmVudCIsImRlc3Ryb3kiLCJwYXJlbnQiLCJzcGxpY2UiLCJhdmF0YXIiLCJvZmYiLCJzdGVhbF8xMyIsIm1pc3QiLCJoYXZlUGVvcGxlIiwibWlzdEFyciIsInN0b3BNb3ZlIiwiZ29FbmFibGVkIiwidGllXzE0Iiwic3RvcFVzZUNhcmQiLCJ1c2VDYXJkRW5hYmxlZCIsImNvbmZ1c2VfMTUiLCJzYXZlXzE2Iiwib25Mb2FkIiwiQXJyYXkiLCJnYW1lIiwieCIsInkiLCJib29tX2NlbGwiLCJpIiwiYWRqIiwibmlja25hbWUiLCJleWVfY2VsbCIsImoiLCJleWVzIiwic3RhcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxRQUFRLEVBQUMsQ0FBQ0osRUFBRSxDQUFDSyxPQUFKLENBREQ7QUFFUkMsSUFBQUEsWUFBWSxFQUFDO0FBRkwsR0FIUDtBQU9MO0FBRUhDLEVBQUFBLE1BQU0sRUFBRSxnQkFBU0MsSUFBVCxFQUFlO0FBQ3RCUixJQUFBQSxFQUFFLENBQUNTLElBQUgsQ0FBUSxhQUFSLEVBQXVCQyxNQUF2QixHQUFnQyxLQUFoQyxDQURzQixDQUNnQjs7QUFDdENWLElBQUFBLEVBQUUsQ0FBQ1MsSUFBSCxDQUFRLHFCQUFSLEVBQStCQyxNQUEvQixHQUF3QyxLQUF4QyxDQUZzQixDQUV3Qjs7QUFDOUNWLElBQUFBLEVBQUUsQ0FBQ1MsSUFBSCxDQUFRLGFBQVIsRUFBdUJFLFlBQXZCLENBQW9DLE1BQXBDLEVBQTRDQyxRQUE1QyxDQUFxRCxZQUFyRDtBQUNBLFFBQUlDLEdBQUcsR0FBR2IsRUFBRSxDQUFDUyxJQUFILENBQVEsWUFBUixFQUFzQkUsWUFBdEIsQ0FBbUMsUUFBbkMsQ0FBVjtBQUNBRSxJQUFBQSxHQUFHLENBQUNDLGNBQUosQ0FBbUIsa0JBQW5CO0FBQ0EsR0FmTztBQWdCUkMsRUFBQUEsU0FBUyxFQUFFLG1CQUFTUCxJQUFULEVBQWU7QUFDekIsUUFBSVEsSUFBSSxHQUFDaEIsRUFBRSxDQUFDUyxJQUFILENBQVEsUUFBUixFQUFrQkUsWUFBbEIs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QUNwQyxJQUZXO0FBR2xCcUMsUUFBQUEsR0FBRyxFQUFDLGVBQVU7QUFDYixjQUFJLEtBQUtELE1BQUwsSUFBZXBELEVBQUUsQ0FBQ1MsSUFBSCxDQUFRLFFBQVIsRUFBa0JFLFlBQWxCLENBQStCLFlBQS9CLEVBQTZDd0IsV0FBaEUsRUFDQyxPQUFPLEtBQVA7QUFDRG5CLFVBQUFBLElBQUksQ0FBQ3VGLElBQUwsQ0FBVXpCLE1BQVYsQ0FBaUIsQ0FBakIsRUFBbUIsQ0FBbkI7QUFDQSxpQkFBTyxJQUFQO0FBQ0E7QUFSaUIsT0FBbkI7QUFVQTlELE1BQUFBLElBQUksQ0FBQ2dCLFFBQUwsSUFBZSxLQUFLNUIsUUFBTCxDQUFjLEVBQWQsQ0FBZjtBQUNBSixNQUFBQSxFQUFFLENBQUNTLElBQUgsQ0FBUSxhQUFSLEVBQXVCRSxZQUF2QixDQUFvQyxNQUFwQyxFQUE0Q3NCLFVBQTVDLENBQXVELEVBQXZEO0FBQ0FqQyxNQUFBQSxFQUFFLENBQUNTLElBQUgsQ0FBUSxhQUFSLEVBQXVCQyxNQUF2QixHQUFnQyxJQUFoQyxDQXhCNEMsQ0F3Qk47O0FBQ3RDVixNQUFBQSxFQUFFLENBQUNTLElBQUgsQ0FBUSxxQkFBUixFQUErQkMsTUFBL0IsR0FBd0MsSUFBeEMsQ0F6QjRDLENBeUJDO0FBQzdDLEtBMUJELEVBMEJHLElBMUJIO0FBMkJHLEdBM2VJO0FBNmVMOEYsRUFBQUEsS0E3ZUssbUJBNmVJLENBRVIsQ0EvZUksQ0FpZkw7O0FBamZLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBjYXJkQ29zdDpbY2MuSW50ZWdlcl0sXHJcbiAgICAgICAgY2FyZEZ1bmN0aW9uOm51bGwsXHJcbiAgICB9LFxyXG4gICAgLy/ljaHniYzlk43lupTlh73mlbDkuK3nmoR0aGlz5LiN5pivY2FyZC5qc1xyXG5cdFxyXG5cdGJvb21fMDogZnVuY3Rpb24oY2FyZCkge1xyXG5cdFx0Y2MuZmluZCgnQ2FudmFzL0RlY2snKS5hY3RpdmUgPSBmYWxzZTsvL+aaguaXtuS4jeiuqeeCueaJi+eJjOWghlxyXG5cdFx0Y2MuZmluZCgnQ2FudmFzL2VuZF9jYXJkX2J0bicpLmFjdGl2ZSA9IGZhbHNlOy8v5pqC5pe25LiN6K6p57uT5p2f5Ye654mMXHJcblx0XHRjYy5maW5kKCdDYW52YXMvRGVjaycpLmdldENvbXBvbmVudCgnRGVjaycpLnNob3dUaXBzKFwi6K+36YCJ5oup6KaB6L2w54K455qE5Zyw5Zu+5Z2XXCIpO1xyXG5cdFx0dmFyIG1hcCA9IGNjLmZpbmQoJ0NhbnZhcy9tYXAnKS5nZXRDb21wb25lbnQoJ0dldE1hcCcpO1xyXG5cdFx0bWFwLm9wZW5BbGxNb25pdG9yKCdib29tLWNlbGwtY2hvc2VuJyk7XHJcblx0fSxcclxuXHRtaXNzaWxlXzE6IGZ1bmN0aW9uKGNhcmQpIHtcclxuXHRcdHZhciByb2xlPWNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudCgnZ2xvYmFsR2FtZScpLm5vd1BsYXllcjtcclxuXHRcdHZhciBtYXAgPSBjYy5maW5kKCdDYW52YXMvbWFwJykuZ2V0Q29tcG9uZW50KCdHZXRNYXAnKTtcclxuXHRcdHZhciBkaXMgPSBtYXAuQmZzRGlzKHJvbGUuZ2V0Q29tcG9uZW50KCdQZXJzb24nKS5wb3NYLCByb2xlLmdldENvbXBvbmVudCgnUGVyc29uJykucG9zWSk7XHJcblx0XHRjb25zb2xlLmxvZyhkaXMpO1xyXG5cdFx0dmFyIGluZGV4PU51bWJlcihyb2xlLm5hbWVbNl0pO1xyXG4gICAgICAgIHZhciB0ZWFtbWF0ZT1pbmRleCsyPjQ/aW5kZXgtMjppbmRleCsyO1xyXG4gICAgICAgIHZhciBlbmVteTE9aW5kZXgrMT40P2luZGV4LTM6aW5kZXgrMTtcclxuICAgICAgICB2YXIgZW5lbXkyPXRlYW1tYXRlKzE+ND90ZWFtbWF0ZS0zOnRlYW1tYXRlKzE7XHJcblx0XHRlbmVteTEgPSBjYy5maW5kKFwiQ2FudmFzL1BlcnNvbnMvUGVyc29uXCIrZW5lbXkxKS5nZXRDb21wb25lbnQoJ1BlcnNvbicpO1xyXG5cdFx0ZW5lbXkyID0gY2MuZmluZChcIkNhbnZhcy9QZXJzb25zL1BlcnNvblwiK2VuZW15MikuZ2V0Q29tcG9uZW50KCdQZXJzb24nKTtcclxuXHRcdGlmIChkaXNbZW5lbXkxLnBvc1hdW2VuZW15MS5wb3NZXSA8PSA1KVxyXG5cdFx0XHRlbmVteTEuYmxvb2QgLT0gcm9sZS5hdHRhY2s7XHJcblx0XHRpZiAoZGlzW2VuZW15Mi5wb3NYXVtlbmVteTIucG9zWV0gPD0gNSlcclxuXHRcdFx0ZW5lbXkyLmJsb29kIC09IHJvbGUuYXR0YWNrO1xyXG5cdFx0cm9sZS5nZXRDb21wb25lbnQoJ1BlcnNvbicpLm1vYmlsaXR5LT1jYXJkLmNhcmRDb3N0WzFdO1xyXG4gICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9EZWNrJykuZ2V0Q29tcG9uZW50KCdEZWNrJykucmVtb3ZlQ2FyZCgxKTtcclxuXHR9LFxyXG5cdFxyXG5cdG1pbmVfMjogZnVuY3Rpb24oY2FyZCkge1xyXG5cdFx0dmFyIHJvbGU9Y2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdnbG9iYWxHYW1lJykubm93UHJvcGVydHk7XHJcblx0XHR2YXIgbWFwID0gY2MuZmluZCgnQ2FudmFzL21hcCcpLmdldENvbXBvbmVudCgnR2V0TWFwJyk7XHJcblx0XHRtYXAubWFwW3JvbGUucG9zWF1bcm9sZS5wb3NZXS5nZXRDb21wb25lbnQoJ0NlbGwnKS5oYXZlTWluZSA9IDE7XHJcblx0XHRtYXAubWFwW3JvbGUucG9zWF1bcm9sZS5wb3NZXS5nZXRDb21wb25lbnQoJ0NlbGwnKS5taW5lQXR0YWNrID0gcm9sZS5hdHRhY2sgKiAyO1xyXG5cdFx0cm9sZS5nZXRDb21wb25lbnQoJ1BlcnNvbicpLm1vYmlsaXR5LT1jYXJkLmNhcmRDb3N0WzJdO1xyXG4gICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9EZWNrJykuZ2V0Q29tcG9uZW50KCdEZWNrJykucmVtb3ZlQ2FyZCgyKTtcclxuXHR9LFxyXG5cdFxyXG4gICAgc2hpZWxkXzM6ZnVuY3Rpb24oY2FyZCl7XHJcbiAgICAgICAgdmFyIHJvbGU9Y2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdnbG9iYWxHYW1lJykubm93UHJvcGVydHk7XHJcbiAgICAgICAgcm9sZS5zaGllbGQ9MTtcclxuICAgICAgICByb2xlLm1vYmlsaXR5LT1jYXJkLmNhcmRDb3N0WzNdO1xyXG4gICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9EZWNrJykuZ2V0Q29tcG9uZW50KCdEZWNrJykucmVtb3ZlQ2FyZCgzKTtcclxuICAgIH0sXHJcbiAgICBoYWxmU2hpZWxkXzQ6ZnVuY3Rpb24oY2FyZCl7XHJcbiAgICAgICAgdmFyIHJvbGU9Y2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdnbG9iYWxHYW1lJykubm93UGxheWVyO1xyXG4gICAgICAgIHZhciBpbmRleD1OdW1iZXIocm9sZS5uYW1lWzZdKTtcclxuICAgICAgICB2YXIgdGVhbW1hdGU9aW5kZXgrMj40P2luZGV4LTI6aW5kZXgrMjtcclxuICAgICAgICB0ZWFtbWF0ZT1jYy5maW5kKFwiQ2FudmFzL1BlcnNvbnMvUGVyc29uXCIrdGVhbW1hdGUpLmdldENvbXBvbmVudCgnUGVyc29uJyk7XHJcblx0XHRyb2xlID0gY2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdnbG9iYWxHYW1lJykubm93UHJvcGVydHk7XHJcbiAgICAgICAgcm9sZS5oYWxmU2hpZWxkKz0xO1xyXG4gICAgICAgIGlmICh0ZWFtbWF0ZS5pc0RlYWQ9PTApXHJcbiAgICAgICAgICAgIHRlYW1tYXRlLmhhbGZTaGllbGQrPTE7XHJcbiAgICAgICAgcm9sZS5tb2JpbGl0eS09Y2FyZC5jYXJkQ29zdFs0XTtcclxuICAgICAgICBjYy5maW5kKCdDYW52YXMvRGVjaycpLmdldENvbXBvbmVudCgnRGVjaycpLnJlbW92ZUNhcmQoNCk7XHJcbiAgICB9LFxyXG4gICAgYmxlc3NfNTpmdW5jdGlvbihjYXJkKXtcclxuICAgICAgICB2YXIgcm9sZT1jYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoJ2dsb2JhbEdhbWUnKS5ub3dQbGF5ZXI7XHJcbiAgICAgICAgdmFyIGluZGV4PU51bWJlcihyb2xlLm5hbWVbNl0pO1xyXG4gICAgICAgIHZhciB0ZWFtbWF0ZT1pbmRleCsyPjQ/aW5kZXgtMjppbmRleCsyO1xyXG4gICAgICAgIHJvbGUuZ2V0Q29tcG9uZW50KCdQZXJzb24nKS5hdHRjYWsrPTE7XHJcbiAgICAgICAgY2MuZmluZChcIkNhbnZhcy9QZXJzb25zL1BlcnNvblwiK3RlYW1tYXRlKS5nZXRDb21wb25lbnQoJ1BlcnNvbicpLmF0dGFjays9MTsgICAgXHJcbiAgICAgICAgdmFyIGJ1ZmY9Y2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdCdWZmJyk7XHJcbiAgICAgICAgYnVmZi50b2RvTGlzdC5wdXNoKHtcclxuICAgICAgICAgICAgZW5kVHVybjp3aW5kb3cuZ2xvYmFsLm5vd1R1cm4rMixcclxuICAgICAgICAgICAgcGVyc29uOnJvbGUsXHJcbiAgICAgICAgICAgIGFjdDpmdW5jdGlvbigpe1xyXG5cdFx0XHRcdGlmICh0aGlzLnBlcnNvbiAhPSBjYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoJ2dsb2JhbEdhbWUnKS5ub3dQbGF5ZXIpXHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBlcnNvbi5nZXRDb21wb25lbnQoJ1BlcnNvbicpLmF0dGFjaz1NYXRoLm1heCgwLHRoaXMucGVyc29uLmdldENvbXBvbmVudCgnUGVyc29uJykuYXR0YWNrLTEpO1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblx0XHRidWZmLnRvZG9MaXN0LnB1c2goe1xyXG4gICAgICAgICAgICBlbmRUdXJuOndpbmRvdy5nbG9iYWwubm93VHVybisyLFxyXG4gICAgICAgICAgICBwZXJzb246Y2MuZmluZChcIkNhbnZhcy9QZXJzb25zL1BlcnNvblwiK3RlYW1tYXRlKSxcclxuICAgICAgICAgICAgYWN0OmZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0aWYgKHRoaXMucGVyc29uICE9IGNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudCgnZ2xvYmFsR2FtZScpLm5vd1BsYXllcilcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGVyc29uLmdldENvbXBvbmVudCgnUGVyc29uJykuYXR0YWNrPU1hdGgubWF4KDAsdGhpcy5wZXJzb24uZ2V0Q29tcG9uZW50KCdQZXJzb24nKS5hdHRhY2stMSk7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByb2xlLmdldENvbXBvbmVudCgnUGVyc29uJykubW9iaWxpdHktPWNhcmQuY2FyZENvc3RbNV07XHJcbiAgICAgICAgY2MuZmluZCgnQ2FudmFzL0RlY2snKS5nZXRDb21wb25lbnQoJ0RlY2snKS5yZW1vdmVDYXJkKDUpOyAgICAgICAgXHJcbiAgICB9LFxyXG4gICAgd2Vha182OmZ1bmN0aW9uKGNhcmQpe1xyXG4gICAgICAgIHZhciByb2xlPWNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudCgnZ2xvYmFsR2FtZScpLm5vd1BsYXllcjtcclxuICAgICAgICB2YXIgaW5kZXg9TnVtYmVyKHJvbGUubmFtZVs2XSk7XHJcbiAgICAgICAgdmFyIHRlYW1tYXRlPWluZGV4KzI+ND9pbmRleC0yOmluZGV4KzI7XHJcbiAgICAgICAgdmFyIGVuZW15MT1pbmRleCsxPjQ/aW5kZXgtMzppbmRleCsxO1xyXG4gICAgICAgIHZhciBlbmVteTI9dGVhbW1hdGUrMT40P3RlYW1tYXRlLTM6dGVhbW1hdGUrMTtcclxuICAgICAgICBlbmVteTE9Y2MuZmluZChcIkNhbnZhcy9QZXJzb25zL1BlcnNvblwiK2VuZW15MSkuZ2V0Q29tcG9uZW50KCdQZXJzb24nKTtcclxuICAgICAgICBlbmVteTI9Y2MuZmluZChcIkNhbnZhcy9QZXJzb25zL1BlcnNvblwiK2VuZW15MikuZ2V0Q29tcG9uZW50KCdQZXJzb24nKTtcclxuICAgICAgICB2YXIgYnVmZj1jYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoJ0J1ZmYnKTtcclxuICAgICAgICBidWZmLnRvZG9MaXN0LnB1c2goe1xyXG4gICAgICAgICAgICBlbmRUdXJuOndpbmRvdy5nbG9iYWwubm93VHVybisyLFxyXG4gICAgICAgICAgICBwZXJzb246W2VuZW15MSxlbmVteTEuYXR0YWNrIT0wXSxcclxuICAgICAgICAgICAgYWN0OmZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0aWYgKHRoaXMucGVyc29uWzBdICE9IGNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudCgnZ2xvYmFsR2FtZScpLm5vd1Byb3BlcnR5KVxyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wZXJzb25bMF0uYXR0YWNrKz10aGlzLnBlcnNvblsxXTtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pOyBcclxuXHRcdGJ1ZmYudG9kb0xpc3QucHVzaCh7XHJcbiAgICAgICAgICAgIGVuZFR1cm46d2luZG93Lmdsb2JhbC5ub3dUdXJuKzIsXHJcbiAgICAgICAgICAgIHBlcnNvbjpbZW5lbXkyLGVuZW15Mi5hdHRhY2shPTBdLFxyXG4gICAgICAgICAgICBhY3Q6ZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRpZiAodGhpcy5wZXJzb25bMF0gIT0gY2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdnbG9iYWxHYW1lJykubm93UHJvcGVydHkpXHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBlcnNvblswXS5hdHRhY2srPXRoaXMucGVyc29uWzFdO1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZW5lbXkxLmF0dGFjaz1NYXRoLm1heCgwLGVuZW15MS5hdHRhY2stMSk7XHJcbiAgICAgICAgZW5lbXkyLmF0dGFjaz1NYXRoLm1heCgwLGVuZW15Mi5hdHRhY2stMSk7XHJcbiAgICAgICAgcm9sZS5nZXRDb21wb25lbnQoJ1BlcnNvbicpLm1vYmlsaXR5LT1jYXJkLmNhcmRDb3N0WzZdO1xyXG4gICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9EZWNrJykuZ2V0Q29tcG9uZW50KCdEZWNrJykucmVtb3ZlQ2FyZCg2KTtcclxuICAgICAgICBcclxuICAgIH0sXHJcblx0XHJcblx0dGVhbUZvcmNlXzc6IGZ1bmN0aW9uKGNhcmQpIHtcclxuXHRcdHZhciByb2xlPWNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudCgnZ2xvYmFsR2FtZScpLm5vd1BsYXllcjtcclxuICAgICAgICB2YXIgaW5kZXg9TnVtYmVyKHJvbGUubmFtZVs2XSk7XHJcbiAgICAgICAgdmFyIHRlYW1tYXRlPWluZGV4KzI+ND9pbmRleC0yOmluZGV4KzI7XHJcbiAgICAgICAgdmFyIGVuZW15MT1pbmRleCsxPjQ/aW5kZXgtMzppbmRleCsxO1xyXG4gICAgICAgIHZhciBlbmVteTI9dGVhbW1hdGUrMT40P3RlYW1tYXRlLTM6dGVhbW1hdGUrMTtcclxuICAgICAgICByb2xlPWNjLmZpbmQoXCJDYW52YXMvUGVyc29ucy9QZXJzb25cIitpbmRleCkuZ2V0Q29tcG9uZW50KCdQZXJzb24nKTtcclxuICAgICAgICB0ZWFtbWF0ZT1jYy5maW5kKFwiQ2FudmFzL1BlcnNvbnMvUGVyc29uXCIrdGVhbW1hdGUpLmdldENvbXBvbmVudCgnUGVyc29uJyk7XHJcbiAgICAgICAgZW5lbXkxPWNjLmZpbmQoXCJDYW52YXMvUGVyc29ucy9QZXJzb25cIitlbmVteTEpLmdldENvbXBvbmVudCgnUGVyc29uJyk7XHJcbiAgICAgICAgZW5lbXkyPWNjLmZpbmQoXCJDYW52YXMvUGVyc29ucy9QZXJzb25cIitlbmVteTIpLmdldENvbXBvbmVudCgnUGVyc29uJyk7XHJcblx0XHRpZiAodGVhbW1hdGUuaXNEZWFkID09IDEpXHJcblx0XHRcdGNjLmZpbmQoJ0NhbnZhcy9EZWNrJykuZ2V0Q29tcG9uZW50KCdEZWNrJykuc2hvd1RpcHMoJ+mYn+WPi+W3suatu+S6oe+8jOeZvee7mSBRQVEnKTtcclxuXHRcdGVsc2UgaWYgKDcgaW4gdGVhbW1hdGUuY2FyZHMpIHtcclxuXHRcdFx0aWYgKHRlYW1tYXRlLm1vYmlsaXR5IDwgNSlcclxuXHRcdFx0XHRjYy5maW5kKCdDYW52YXMvRGVjaycpLmdldENvbXBvbmVudCgnRGVjaycpLnNob3dUaXBzKCfpmJ/lj4vooYzliqjlgLzkuI3otrPvvIznmb3nu5kgUUFRJyk7XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdGVuZW15MS5ibG9vZCAtPSAzO1xyXG5cdFx0XHRcdGVuZW15Mi5ibG9vZCAtPSAzO1xyXG5cdFx0XHRcdGlmIChlbmVteTEuYmxvb2QgPD0gMClcclxuXHRcdFx0XHRcdGVuZW15MS5pc0RlYWQgPSAxO1xyXG5cdFx0XHRcdGlmIChlbmVteTIuYmxvb2QgPD0gMClcclxuXHRcdFx0XHRcdGVuZW15Mi5pc0RlYWQgPSAxO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0Y2MuZmluZCgnQ2FudmFzL0RlY2snKS5nZXRDb21wb25lbnQoJ0RlY2snKS5zaG93VGlwcygn6Zif5Y+L5peg5q2k54mM77yM55m957uZIFFBUScpO1xyXG5cdFx0fVxyXG5cdFx0cm9sZS5tb2JpbGl0eS09Y2FyZC5jYXJkQ29zdFs3XTtcclxuICAgICAgICBjYy5maW5kKCdDYW52YXMvRGVjaycpLmdldENvbXBvbmVudCgnRGVjaycpLnJlbW92ZUNhcmQoNyk7XHJcblx0fSxcclxuXHRcclxuICAgIGhlYWxfODpmdW5jdGlvbihjYXJkKXtcclxuICAgICAgICB2YXIgcm9sZT1jYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoJ2dsb2JhbEdhbWUnKS5ub3dQcm9wZXJ0eTtcclxuICAgICAgICByb2xlLmJsb29kKz0xO1xyXG4gICAgICAgIHJvbGUubW9iaWxpdHktPWNhcmQuY2FyZENvc3RbOF07XHJcbiAgICAgICAgY2MuZmluZCgnQ2FudmFzL0RlY2snKS5nZXRDb21wb25lbnQoJ0RlY2snKS5yZW1vdmVDYXJkKDgpO1xyXG4gICAgfSxcclxuICAgIGhvbHlOb3ZhXzk6ZnVuY3Rpb24oY2FyZCl7XHJcbiAgICAgICAgdmFyIHJvbGU9Y2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdnbG9iYWxHYW1lJykubm93UGxheWVyO1xyXG4gICAgICAgIHZhciBpbmRleD1OdW1iZXIocm9sZS5uYW1lWzZdKTtcclxuICAgICAgICB2YXIgdGVhbW1hdGU9aW5kZXgrMj40P2luZGV4LTI6aW5kZXgrMjtcclxuICAgICAgICB2YXIgZW5lbXkxPWluZGV4KzE+ND9pbmRleC0zOmluZGV4KzE7XHJcbiAgICAgICAgdmFyIGVuZW15Mj10ZWFtbWF0ZSsxPjQ/dGVhbW1hdGUtMzp0ZWFtbWF0ZSsxO1xyXG4gICAgICAgIHJvbGU9Y2MuZmluZChcIkNhbnZhcy9QZXJzb25zL1BlcnNvblwiK2luZGV4KS5nZXRDb21wb25lbnQoJ1BlcnNvbicpO1xyXG4gICAgICAgIHRlYW1tYXRlPWNjLmZpbmQoXCJDYW52YXMvUGVyc29ucy9QZXJzb25cIit0ZWFtbWF0ZSkuZ2V0Q29tcG9uZW50KCdQZXJzb24nKTtcclxuICAgICAgICBlbmVteTE9Y2MuZmluZChcIkNhbnZhcy9QZXJzb25zL1BlcnNvblwiK2VuZW15MSkuZ2V0Q29tcG9uZW50KCdQZXJzb24nKTtcclxuICAgICAgICBlbmVteTI9Y2MuZmluZChcIkNhbnZhcy9QZXJzb25zL1BlcnNvblwiK2VuZW15MikuZ2V0Q29tcG9uZW50KCdQZXJzb24nKTtcclxuICAgICAgICBpZiAocm9sZS5pc0RlYWQ9PTApXHJcbiAgICAgICAgICAgIHJvbGUuYmxvb2QrPTI7XHJcbiAgICAgICAgaWYgKHRlYW1tYXRlLmlzRGVhZD09MClcclxuICAgICAgICAgICAgdGVhbW1hdGUuYmxvb2QrPTI7XHJcbiAgICAgICAgaWYgKGVuZW15MS5pc0RlYWQ9PTApXHJcbiAgICAgICAgICAgIGVuZW15MS5ibG9vZCs9MTtcclxuICAgICAgICBpZiAoZW5lbXkyLmlzRGVhZD09MClcclxuICAgICAgICAgICAgZW5lbXkyLmJsb29kKz0xO1xyXG4gICAgICAgIHJvbGUubW9iaWxpdHktPWNhcmQuY2FyZENvc3RbOV07XHJcbiAgICAgICAgY2MuZmluZCgnQ2FudmFzL0RlY2snKS5nZXRDb21wb25lbnQoJ0RlY2snKS5yZW1vdmVDYXJkKDkpO1xyXG4gICAgfSxcclxuXHRcclxuXHR0ZWxlc2NvcGVfMTA6IGZ1bmN0aW9uKGNhcmQpIHtcclxuXHRcdHZhciByb2xlPWNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudCgnZ2xvYmFsR2FtZScpLm5vd1Byb3BlcnR5O1xyXG5cdFx0cm9sZS5zaWdodCsrO1xyXG5cdFx0dmFyIGJ1ZmY9Y2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdCdWZmJyk7XHJcbiAgICAgICAgYnVmZi50b2RvTGlzdC5wdXNoKHtcclxuICAgICAgICAgICAgZW5kVHVybjp3aW5kb3cuZ2xvYmFsLm5vd1R1cm4rNSxcclxuICAgICAgICAgICAgcGVyc29uOnJvbGUsXHJcbiAgICAgICAgICAgIGFjdDpmdW5jdGlvbigpe1xyXG5cdFx0XHRcdGlmICh0aGlzLnBlcnNvbiAhPSBjYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoJ2dsb2JhbEdhbWUnKS5ub3dQcm9wZXJ0eSlcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGVyc29uLnNpZ2h0LS07XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByb2xlLm1vYmlsaXR5LT1jYXJkLmNhcmRDb3N0WzEwXTtcclxuICAgICAgICBjYy5maW5kKCdDYW52YXMvRGVjaycpLmdldENvbXBvbmVudCgnRGVjaycpLnJlbW92ZUNhcmQoMTApOyAgICAgICAgXHJcblx0fSxcclxuXHRleWVfMTE6ZnVuY3Rpb24oY2FyZCl7XHJcblx0XHRjYy5maW5kKCdDYW52YXMvRGVjaycpLmFjdGl2ZSA9IGZhbHNlOy8v5pqC5pe25LiN6K6p54K55omL54mM5aCGXHJcblx0XHRjYy5maW5kKCdDYW52YXMvZW5kX2NhcmRfYnRuJykuYWN0aXZlID0gZmFsc2U7Ly/mmoLml7bkuI3orqnnu5PmnZ/lh7rniYxcclxuXHRcdGNjLmZpbmQoJ0NhbnZhcy9EZWNrJykuZ2V0Q29tcG9uZW50KCdEZWNrJykuc2hvd1RpcHMoXCLor7fpgInmi6nopoHmlL7nva7nnLznnZvnmoTlnLDlm77lnZdcIik7XHJcblx0XHR2YXIgbWFwID0gY2MuZmluZCgnQ2FudmFzL21hcCcpLmdldENvbXBvbmVudCgnR2V0TWFwJyk7XHJcblx0XHRtYXAub3BlbkFsbE1vbml0b3IoJ2V5ZS1jZWxsLWNob3NlbicpO1x0XHRcclxuXHR9LFxyXG4gICAgdG91Z2hfMTI6ZnVuY3Rpb24oY2FyZCl7XHJcbiAgICAgICAgdmFyIHJvbGU9Y2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdnbG9iYWxHYW1lJykubm93UHJvcGVydHk7XHJcbiAgICAgICAgcm9sZS5hdHRhY2sqPTI7XHJcbiAgICAgICAgdmFyIGJ1ZmY9Y2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdCdWZmJyk7XHJcbiAgICAgICAgYnVmZi50b2RvTGlzdC5wdXNoKHtcclxuICAgICAgICAgICAgZW5kVHVybjp3aW5kb3cuZ2xvYmFsLm5vd1R1cm4rMSxcclxuICAgICAgICAgICAgcGVyc29uOnJvbGUsXHJcbiAgICAgICAgICAgIGFjdDpmdW5jdGlvbigpe1xyXG5cdFx0XHRcdGlmICh0aGlzLnBlcnNvbiAhPSBjYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoJ2dsb2JhbEdhbWUnKS5ub3dQcm9wZXJ0eSlcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGVyc29uLmF0dGFjaz1OdW1iZXIodGhpcy5wZXJzb24uYXR0YWNrLzIpO1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcm9sZS5tb2JpbGl0eS09Y2FyZC5jYXJkQ29zdFsxMl07XHJcbiAgICAgICAgY2MuZmluZCgnQ2FudmFzL0RlY2snKS5nZXRDb21wb25lbnQoJ0RlY2snKS5yZW1vdmVDYXJkKDEyKTsgICAgICAgIFxyXG4gICAgfSxcclxuXHRcclxuXHR3YWl0U3RlYWw6IGZ1bmN0aW9uKCkge1xyXG5cdFx0Ly90aGlzIOS4uuS6uueJqeeahHBlcnNvbi5qc1xyXG5cdFx0dmFyIHJvbGU9Y2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdnbG9iYWxHYW1lJykubm93UGxheWVyO1xyXG4gICAgICAgIHZhciBpbmRleD1OdW1iZXIocm9sZS5uYW1lWzZdKTtcclxuICAgICAgICB2YXIgdGVhbW1hdGU9aW5kZXgrMj40P2luZGV4LTI6aW5kZXgrMjtcclxuICAgICAgICB2YXIgZW5lbXkxPWluZGV4KzE+ND9pbmRleC0zOmluZGV4KzE7XHJcbiAgICAgICAgdmFyIGVuZW15Mj10ZWFtbWF0ZSsxPjQ/dGVhbW1hdGUtMzp0ZWFtbWF0ZSsxO1xyXG4gICAgICAgIHJvbGU9Y2MuZmluZChcIkNhbnZhcy9QZXJzb25zL1BlcnNvblwiK2luZGV4KS5nZXRDb21wb25lbnQoJ1BlcnNvbicpO1xyXG4gICAgICAgIHRlYW1tYXRlPWNjLmZpbmQoXCJDYW52YXMvUGVyc29ucy9QZXJzb25cIit0ZWFtbWF0ZSkuZ2V0Q29tcG9uZW50KCdQZXJzb24nKTtcclxuICAgICAgICBlbmVteTE9Y2MuZmluZChcIkNhbnZhcy9QZXJzb25zL1BlcnNvblwiK2VuZW15MSkuZ2V0Q29tcG9uZW50KCdQZXJzb24nKTtcclxuICAgICAgICBlbmVteTI9Y2MuZmluZChcIkNhbnZhcy9QZXJzb25zL1BlcnNvblwiK2VuZW15MikuZ2V0Q29tcG9uZW50KCdQZXJzb24nKTtcclxuXHRcdFxyXG5cdFx0aWYgKHRoaXMuY2FyZHMubGVuZ3RoID09IDApIHtcclxuXHRcdFx0Y2MuZmluZCgnQ2FudmFzL0RlY2snKS5nZXRDb21wb25lbnQoJ0RlY2snKS5zaG93VGlwcygn5peg5omL54mM5Y+v55uX5Y+WIFFBUScpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHZhciByZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSp0aGlzLmNhcmRzLmxlbmd0aCk7XHJcblx0XHRcdHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUod2luZG93Lmdsb2JhbC5jYXJkbm9kZVt0aGlzLmNhcmRzW3JkXV0pO1xyXG5cdFx0XHRub2RlLnNldFBvc2l0aW9uKDAsIDApO1xyXG5cdFx0XHRub2RlLm9uKCdtb3VzZWRvd24nLCBmdW5jdGlvbiAoIGV2ZW50ICkge1xyXG5cdFx0XHRcdHRoaXMuZGVzdHJveSgpO1xyXG5cdFx0XHR9LCBub2RlKTtcclxuXHRcdFx0bm9kZS5wYXJlbnQgPSB0aGlzLm5vZGUucGFyZW50LnBhcmVudDtcclxuXHRcdFx0XHJcblx0XHRcdHJvbGUuY2FyZHMucHVzaCh0aGlzLmNhcmRzW3JkXSk7XHJcblx0XHRcdHRoaXMuY2FyZHMuc3BsaWNlKHJkLCAxKTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0dGVhbW1hdGUuYXZhdGFyLm9mZignbW91c2Vkb3duJywgY2MuZmluZCgnQ2FudmFzL0NhcmQnKS5nZXRDb21wb25lbnQoJ0NhcmQnKS53YWl0U3RlYWwsIHRlYW1tYXRlKTtcclxuXHRcdGVuZW15MS5hdmF0YXIub2ZmKCdtb3VzZWRvd24nLCBjYy5maW5kKCdDYW52YXMvQ2FyZCcpLmdldENvbXBvbmVudCgnQ2FyZCcpLndhaXRTdGVhbCwgZW5lbXkxKTtcclxuXHRcdGVuZW15Mi5hdmF0YXIub2ZmKCdtb3VzZWRvd24nLCBjYy5maW5kKCdDYW52YXMvQ2FyZCcpLmdldENvbXBvbmVudCgnQ2FyZCcpLndhaXRTdGVhbCwgZW5lbXkyKTtcclxuXHRcdFxyXG5cdFx0Y2MuZmluZCgnQ2FudmFzL0RlY2snKS5hY3RpdmUgPSB0cnVlO1xyXG5cdFx0Y2MuZmluZCgnQ2FudmFzL2VuZF9jYXJkX2J0bicpLmFjdGl2ZSA9IHRydWU7XHJcblx0fSxcclxuXHRcclxuXHRzdGVhbF8xMzpmdW5jdGlvbihjYXJkKSB7XHJcblx0XHRjYy5maW5kKCdDYW52YXMvRGVjaycpLmFjdGl2ZSA9IGZhbHNlOy8v5pqC5pe25LiN6K6p54K55omL54mM5aCGXHJcblx0XHRjYy5maW5kKCdDYW52YXMvZW5kX2NhcmRfYnRuJykuYWN0aXZlID0gZmFsc2U7Ly/mmoLml7bkuI3orqnnu5PmnZ/lh7rniYxcclxuXHRcdHZhciByb2xlPWNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudCgnZ2xvYmFsR2FtZScpLm5vd1BsYXllcjtcclxuICAgICAgICB2YXIgaW5kZXg9TnVtYmVyKHJvbGUubmFtZVs2XSk7XHJcbiAgICAgICAgdmFyIHRlYW1tYXRlPWluZGV4KzI+ND9pbmRleC0yOmluZGV4KzI7XHJcbiAgICAgICAgdmFyIGVuZW15MT1pbmRleCsxPjQ/aW5kZXgtMzppbmRleCsxO1xyXG4gICAgICAgIHZhciBlbmVteTI9dGVhbW1hdGUrMT40P3RlYW1tYXRlLTM6dGVhbW1hdGUrMTtcclxuICAgICAgICByb2xlPWNjLmZpbmQoXCJDYW52YXMvUGVyc29ucy9QZXJzb25cIitpbmRleCkuZ2V0Q29tcG9uZW50KCdQZXJzb24nKTtcclxuICAgICAgICB0ZWFtbWF0ZT1jYy5maW5kKFwiQ2FudmFzL1BlcnNvbnMvUGVyc29uXCIrdGVhbW1hdGUpLmdldENvbXBvbmVudCgnUGVyc29uJyk7XHJcbiAgICAgICAgZW5lbXkxPWNjLmZpbmQoXCJDYW52YXMvUGVyc29ucy9QZXJzb25cIitlbmVteTEpLmdldENvbXBvbmVudCgnUGVyc29uJyk7XHJcbiAgICAgICAgZW5lbXkyPWNjLmZpbmQoXCJDYW52YXMvUGVyc29ucy9QZXJzb25cIitlbmVteTIpLmdldENvbXBvbmVudCgnUGVyc29uJyk7XHJcblx0XHR2YXIgbWlzdCA9IGNjLmZpbmQoJ0NhbnZhcy9taXN0JykuZ2V0Q29tcG9uZW50KCdNaXN0Jyk7XHJcblx0XHR2YXIgaGF2ZVBlb3BsZSA9IDA7XHJcblx0XHRpZiAobWlzdC5taXN0QXJyW3RlYW1tYXRlLnBvc1hdW3RlYW1tYXRlLnBvc1ldLmFjdGl2ZSA9PSBmYWxzZSkge1xyXG5cdFx0XHR0ZWFtbWF0ZS5hdmF0YXIub24oJ21vdXNlZG93bicsIGNhcmQud2FpdFN0ZWFsLCB0ZWFtbWF0ZSk7XHJcblx0XHRcdGhhdmVQZW9wbGUgPSAxO1xyXG5cdFx0fVxyXG5cdFx0aWYgKG1pc3QubWlzdEFycltlbmVteTEucG9zWF1bZW5lbXkxLnBvc1ldLmFjdGl2ZSA9PSBmYWxzZSkge1xyXG5cdFx0XHRlbmVteTEuYXZhdGFyLm9uKCdtb3VzZWRvd24nLCBjYXJkLndhaXRTdGVhbCwgZW5lbXkxKTtcclxuXHRcdFx0aGF2ZVBlb3BsZSA9IDE7XHJcblx0XHR9XHJcblx0XHRpZiAobWlzdC5taXN0QXJyW2VuZW15Mi5wb3NYXVtlbmVteTIucG9zWV0uYWN0aXZlID09IGZhbHNlKSB7XHJcblx0XHRcdGVuZW15Mi5hdmF0YXIub24oJ21vdXNlZG93bicsIGNhcmQud2FpdFN0ZWFsLCBlbmVteTIpO1xyXG5cdFx0XHRoYXZlUGVvcGxlID0gMTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0aWYgKGhhdmVQZW9wbGUgPT0gMClcclxuXHRcdFx0Y2MuZmluZCgnQ2FudmFzL0RlY2snKS5nZXRDb21wb25lbnQoJ0RlY2snKS5zaG93VGlwcygn6KeG6YeO5YaF5peg546p5a62IFFBUScpO1xyXG5cdFx0cm9sZS5tb2JpbGl0eS09Y2FyZC5jYXJkQ29zdFsxM107XHJcbiAgICAgICAgY2MuZmluZCgnQ2FudmFzL0RlY2snKS5nZXRDb21wb25lbnQoJ0RlY2snKS5yZW1vdmVDYXJkKDEzKTtcclxuXHR9LFxyXG5cdFxyXG5cdHN0b3BNb3ZlOiBmdW5jdGlvbigpIHtcclxuXHRcdC8vdGhpc+S4uuS6uueJqeeahHBlcnNvbi5qc1xyXG5cdFx0dmFyIHJvbGU9Y2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdnbG9iYWxHYW1lJykubm93UGxheWVyO1xyXG4gICAgICAgIHZhciBpbmRleD1OdW1iZXIocm9sZS5uYW1lWzZdKTtcclxuICAgICAgICB2YXIgdGVhbW1hdGU9aW5kZXgrMj40P2luZGV4LTI6aW5kZXgrMjtcclxuICAgICAgICB2YXIgZW5lbXkxPWluZGV4KzE+ND9pbmRleC0zOmluZGV4KzE7XHJcbiAgICAgICAgdmFyIGVuZW15Mj10ZWFtbWF0ZSsxPjQ/dGVhbW1hdGUtMzp0ZWFtbWF0ZSsxO1xyXG4gICAgICAgIHJvbGU9Y2MuZmluZChcIkNhbnZhcy9QZXJzb25zL1BlcnNvblwiK2luZGV4KS5nZXRDb21wb25lbnQoJ1BlcnNvbicpO1xyXG4gICAgICAgIHRlYW1tYXRlPWNjLmZpbmQoXCJDYW52YXMvUGVyc29ucy9QZXJzb25cIit0ZWFtbWF0ZSkuZ2V0Q29tcG9uZW50KCdQZXJzb24nKTtcclxuICAgICAgICBlbmVteTE9Y2MuZmluZChcIkNhbnZhcy9QZXJzb25zL1BlcnNvblwiK2VuZW15MSkuZ2V0Q29tcG9uZW50KCdQZXJzb24nKTtcclxuICAgICAgICBlbmVteTI9Y2MuZmluZChcIkNhbnZhcy9QZXJzb25zL1BlcnNvblwiK2VuZW15MikuZ2V0Q29tcG9uZW50KCdQZXJzb24nKTtcclxuXHRcdFxyXG5cdFx0dGhpcy5nb0VuYWJsZWQgPSAwO1xyXG5cdFx0ZW5lbXkxLmF2YXRhci5vZmYoJ21vdXNlZG93bicsIGNjLmZpbmQoJ0NhbnZhcy9DYXJkJykuZ2V0Q29tcG9uZW50KCdDYXJkJykuc3RvcE1vdmUsIGVuZW15MSk7XHJcblx0XHRlbmVteTIuYXZhdGFyLm9mZignbW91c2Vkb3duJywgY2MuZmluZCgnQ2FudmFzL0NhcmQnKS5nZXRDb21wb25lbnQoJ0NhcmQnKS5zdG9wTW92ZSwgZW5lbXkyKTtcclxuXHRcdFxyXG5cdFx0Y2MuZmluZCgnQ2FudmFzL0RlY2snKS5hY3RpdmUgPSB0cnVlO1xyXG5cdFx0Y2MuZmluZCgnQ2FudmFzL2VuZF9jYXJkX2J0bicpLmFjdGl2ZSA9IHRydWU7XHJcblx0fSxcclxuXHRcclxuXHR0aWVfMTQ6IGZ1bmN0aW9uKGNhcmQpIHtcclxuXHRcdGNjLmZpbmQoJ0NhbnZhcy9EZWNrJykuYWN0aXZlID0gZmFsc2U7Ly/mmoLml7bkuI3orqnngrnmiYvniYzloIZcclxuXHRcdGNjLmZpbmQoJ0NhbnZhcy9lbmRfY2FyZF9idG4nKS5hY3RpdmUgPSBmYWxzZTsvL+aaguaXtuS4jeiuqee7k+adn+WHuueJjFxyXG5cdFx0dmFyIHJvbGU9Y2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdnbG9iYWxHYW1lJykubm93UGxheWVyO1xyXG4gICAgICAgIHZhciBpbmRleD1OdW1iZXIocm9sZS5uYW1lWzZdKTtcclxuICAgICAgICB2YXIgdGVhbW1hdGU9aW5kZXgrMj40P2luZGV4LTI6aW5kZXgrMjtcclxuICAgICAgICB2YXIgZW5lbXkxPWluZGV4KzE+ND9pbmRleC0zOmluZGV4KzE7XHJcbiAgICAgICAgdmFyIGVuZW15Mj10ZWFtbWF0ZSsxPjQ/dGVhbW1hdGUtMzp0ZWFtbWF0ZSsxO1xyXG4gICAgICAgIHJvbGU9Y2MuZmluZChcIkNhbnZhcy9QZXJzb25zL1BlcnNvblwiK2luZGV4KS5nZXRDb21wb25lbnQoJ1BlcnNvbicpO1xyXG4gICAgICAgIHRlYW1tYXRlPWNjLmZpbmQoXCJDYW52YXMvUGVyc29ucy9QZXJzb25cIit0ZWFtbWF0ZSkuZ2V0Q29tcG9uZW50KCdQZXJzb24nKTtcclxuICAgICAgICBlbmVteTE9Y2MuZmluZChcIkNhbnZhcy9QZXJzb25zL1BlcnNvblwiK2VuZW15MSkuZ2V0Q29tcG9uZW50KCdQZXJzb24nKTtcclxuICAgICAgICBlbmVteTI9Y2MuZmluZChcIkNhbnZhcy9QZXJzb25zL1BlcnNvblwiK2VuZW15MikuZ2V0Q29tcG9uZW50KCdQZXJzb24nKTtcclxuXHRcdHZhciBtaXN0ID0gY2MuZmluZCgnQ2FudmFzL21pc3QnKS5nZXRDb21wb25lbnQoJ01pc3QnKTtcclxuXHRcdHZhciBoYXZlUGVvcGxlID0gMDtcclxuXHRcdGlmIChtaXN0Lm1pc3RBcnJbZW5lbXkxLnBvc1hdW2VuZW15MS5wb3NZXS5hY3RpdmUgPT0gZmFsc2UpIHtcclxuXHRcdFx0ZW5lbXkxLmF2YXRhci5vbignbW91c2Vkb3duJywgY2FyZC5zdG9wTW92ZSwgZW5lbXkxKTtcclxuXHRcdFx0aGF2ZVBlb3BsZSA9IDE7XHJcblx0XHR9XHJcblx0XHRpZiAobWlzdC5taXN0QXJyW2VuZW15Mi5wb3NYXVtlbmVteTIucG9zWV0uYWN0aXZlID09IGZhbHNlKSB7XHJcblx0XHRcdGVuZW15Mi5hdmF0YXIub24oJ21vdXNlZG93bicsIGNhcmQuc3RvcE1vdmUsIGVuZW15Mik7XHJcblx0XHRcdGhhdmVQZW9wbGUgPSAxO1xyXG5cdFx0fVxyXG5cdFx0aWYgKGhhdmVQZW9wbGUgPT0gMCkge1xyXG5cdFx0XHRjYy5maW5kKCdDYW52YXMvRGVjaycpLmdldENvbXBvbmVudCgnRGVjaycpLnNob3dUaXBzKCfop4bph47lhoXml6DmlYzkurogUUFRJyk7XHJcblx0XHRcdGNjLmZpbmQoJ0NhbnZhcy9EZWNrJykuYWN0aXZlID0gdHJ1ZTtcclxuXHRcdFx0Y2MuZmluZCgnQ2FudmFzL2VuZF9jYXJkX2J0bicpLmFjdGl2ZSA9IHRydWU7XHJcblx0XHR9XHJcblx0XHRyb2xlLm1vYmlsaXR5LT1jYXJkLmNhcmRDb3N0WzE0XTtcclxuICAgICAgICBjYy5maW5kKCdDYW52YXMvRGVjaycpLmdldENvbXBvbmVudCgnRGVjaycpLnJlbW92ZUNhcmQoMTQpO1xyXG5cdH0sXHJcblx0XHJcblx0c3RvcFVzZUNhcmQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0Ly90aGlz5Li65Lq654mp55qEcGVyc29uLmpzXHJcblx0XHR2YXIgcm9sZT1jYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoJ2dsb2JhbEdhbWUnKS5ub3dQbGF5ZXI7XHJcbiAgICAgICAgdmFyIGluZGV4PU51bWJlcihyb2xlLm5hbWVbNl0pO1xyXG4gICAgICAgIHZhciB0ZWFtbWF0ZT1pbmRleCsyPjQ/aW5kZXgtMjppbmRleCsyO1xyXG4gICAgICAgIHZhciBlbmVteTE9aW5kZXgrMT40P2luZGV4LTM6aW5kZXgrMTtcclxuICAgICAgICB2YXIgZW5lbXkyPXRlYW1tYXRlKzE+ND90ZWFtbWF0ZS0zOnRlYW1tYXRlKzE7XHJcbiAgICAgICAgcm9sZT1jYy5maW5kKFwiQ2FudmFzL1BlcnNvbnMvUGVyc29uXCIraW5kZXgpLmdldENvbXBvbmVudCgnUGVyc29uJyk7XHJcbiAgICAgICAgdGVhbW1hdGU9Y2MuZmluZChcIkNhbnZhcy9QZXJzb25zL1BlcnNvblwiK3RlYW1tYXRlKS5nZXRDb21wb25lbnQoJ1BlcnNvbicpO1xyXG4gICAgICAgIGVuZW15MT1jYy5maW5kKFwiQ2FudmFzL1BlcnNvbnMvUGVyc29uXCIrZW5lbXkxKS5nZXRDb21wb25lbnQoJ1BlcnNvbicpO1xyXG4gICAgICAgIGVuZW15Mj1jYy5maW5kKFwiQ2FudmFzL1BlcnNvbnMvUGVyc29uXCIrZW5lbXkyKS5nZXRDb21wb25lbnQoJ1BlcnNvbicpO1xyXG5cdFx0XHJcblx0XHR0aGlzLnVzZUNhcmRFbmFibGVkID0gMDtcclxuXHRcdGVuZW15MS5hdmF0YXIub2ZmKCdtb3VzZWRvd24nLCBjYy5maW5kKCdDYW52YXMvQ2FyZCcpLmdldENvbXBvbmVudCgnQ2FyZCcpLnN0b3BVc2VDYXJkLCBlbmVteTEpO1xyXG5cdFx0ZW5lbXkyLmF2YXRhci5vZmYoJ21vdXNlZG93bicsIGNjLmZpbmQoJ0NhbnZhcy9DYXJkJykuZ2V0Q29tcG9uZW50KCdDYXJkJykuc3RvcFVzZUNhcmQsIGVuZW15Mik7XHJcblx0XHRcclxuXHRcdGNjLmZpbmQoJ0NhbnZhcy9EZWNrJykuYWN0aXZlID0gdHJ1ZTtcclxuXHRcdGNjLmZpbmQoJ0NhbnZhcy9lbmRfY2FyZF9idG4nKS5hY3RpdmUgPSB0cnVlO1xyXG5cdH0sXHJcblx0XHJcblx0Y29uZnVzZV8xNTogZnVuY3Rpb24oY2FyZCkge1xyXG5cdFx0Y2MuZmluZCgnQ2FudmFzL0RlY2snKS5hY3RpdmUgPSBmYWxzZTsvL+aaguaXtuS4jeiuqeeCueaJi+eJjOWghlxyXG5cdFx0Y2MuZmluZCgnQ2FudmFzL2VuZF9jYXJkX2J0bicpLmFjdGl2ZSA9IGZhbHNlOy8v5pqC5pe25LiN6K6p57uT5p2f5Ye654mMXHJcblx0XHR2YXIgcm9sZT1jYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoJ2dsb2JhbEdhbWUnKS5ub3dQbGF5ZXI7XHJcbiAgICAgICAgdmFyIGluZGV4PU51bWJlcihyb2xlLm5hbWVbNl0pO1xyXG4gICAgICAgIHZhciB0ZWFtbWF0ZT1pbmRleCsyPjQ/aW5kZXgtMjppbmRleCsyO1xyXG4gICAgICAgIHZhciBlbmVteTE9aW5kZXgrMT40P2luZGV4LTM6aW5kZXgrMTtcclxuICAgICAgICB2YXIgZW5lbXkyPXRlYW1tYXRlKzE+ND90ZWFtbWF0ZS0zOnRlYW1tYXRlKzE7XHJcbiAgICAgICAgcm9sZT1jYy5maW5kKFwiQ2FudmFzL1BlcnNvbnMvUGVyc29uXCIraW5kZXgpLmdldENvbXBvbmVudCgnUGVyc29uJyk7XHJcbiAgICAgICAgdGVhbW1hdGU9Y2MuZmluZChcIkNhbnZhcy9QZXJzb25zL1BlcnNvblwiK3RlYW1tYXRlKS5nZXRDb21wb25lbnQoJ1BlcnNvbicpO1xyXG4gICAgICAgIGVuZW15MT1jYy5maW5kKFwiQ2FudmFzL1BlcnNvbnMvUGVyc29uXCIrZW5lbXkxKS5nZXRDb21wb25lbnQoJ1BlcnNvbicpO1xyXG4gICAgICAgIGVuZW15Mj1jYy5maW5kKFwiQ2FudmFzL1BlcnNvbnMvUGVyc29uXCIrZW5lbXkyKS5nZXRDb21wb25lbnQoJ1BlcnNvbicpO1xyXG5cdFx0dmFyIG1pc3QgPSBjYy5maW5kKCdDYW52YXMvbWlzdCcpLmdldENvbXBvbmVudCgnTWlzdCcpO1xyXG5cdFx0dmFyIGhhdmVQZW9wbGUgPSAwO1xyXG5cdFx0aWYgKG1pc3QubWlzdEFycltlbmVteTEucG9zWF1bZW5lbXkxLnBvc1ldLmFjdGl2ZSA9PSBmYWxzZSkge1xyXG5cdFx0XHRlbmVteTEuYXZhdGFyLm9uKCdtb3VzZWRvd24nLCBjYXJkLnN0b3BVc2VDYXJkLCBlbmVteTEpO1xyXG5cdFx0XHRoYXZlUGVvcGxlID0gMTtcclxuXHRcdH1cclxuXHRcdGlmIChtaXN0Lm1pc3RBcnJbZW5lbXkyLnBvc1hdW2VuZW15Mi5wb3NZXS5hY3RpdmUgPT0gZmFsc2UpIHtcclxuXHRcdFx0ZW5lbXkyLmF2YXRhci5vbignbW91c2Vkb3duJywgY2FyZC5zdG9wVXNlQ2FyZCwgZW5lbXkyKTtcclxuXHRcdFx0aGF2ZVBlb3BsZSA9IDE7XHJcblx0XHR9XHJcblx0XHRpZiAoaGF2ZVBlb3BsZSA9PSAwKSB7XHJcblx0XHRcdGNjLmZpbmQoJ0NhbnZhcy9EZWNrJykuZ2V0Q29tcG9uZW50KCdEZWNrJykuc2hvd1RpcHMoJ+inhumHjuWGheaXoOaVjOS6uiBRQVEnKTtcclxuXHRcdFx0Y2MuZmluZCgnQ2FudmFzL0RlY2snKS5hY3RpdmUgPSB0cnVlO1xyXG5cdFx0XHRjYy5maW5kKCdDYW52YXMvZW5kX2NhcmRfYnRuJykuYWN0aXZlID0gdHJ1ZTtcclxuXHRcdH1cclxuXHRcdHJvbGUubW9iaWxpdHktPWNhcmQuY2FyZENvc3RbMTVdO1xyXG4gICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9EZWNrJykuZ2V0Q29tcG9uZW50KCdEZWNrJykucmVtb3ZlQ2FyZCgxNSk7XHJcblx0fSxcclxuXHRcclxuICAgIHNhdmVfMTY6ZnVuY3Rpb24oY2FyZCl7XHJcbiAgICAgICAgdmFyIHJvbGU9Y2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdnbG9iYWxHYW1lJykubm93UGxheWVyO1xyXG4gICAgICAgIHZhciBpbmRleD1OdW1iZXIocm9sZS5uYW1lWzZdKTtcclxuICAgICAgICB2YXIgdGVhbW1hdGU9aW5kZXgrMj40P2luZGV4LTI6aW5kZXgrMjtcclxuICAgICAgICB0ZWFtbWF0ZT1jYy5maW5kKFwiQ2FudmFzL1BlcnNvbnMvUGVyc29uXCIrdGVhbW1hdGUpLmdldENvbXBvbmVudCgnUGVyc29uJyk7XHJcbiAgICAgICAgaWYgKHRlYW1tYXRlLmlzRGVhZD09MSl7XHJcbiAgICAgICAgICAgIHRlYW1tYXRlLmlzRGVhZD0wO1xyXG4gICAgICAgICAgICB0ZWFtbWF0ZS5ibG9vZD01O1xyXG4gICAgICAgICAgICB0ZWFtbWF0ZS5tb2JpbGl0eT0zO1xyXG4gICAgICAgIH1cclxuICAgICAgICByb2xlLmdldENvbXBvbmVudCgnUGVyc29uJykubW9iaWxpdHktPWNhcmQuY2FyZENvc3RbMTZdO1xyXG4gICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9EZWNrJykuZ2V0Q29tcG9uZW50KCdEZWNrJykucmVtb3ZlQ2FyZCgxNik7XHJcbiAgICB9LFxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICB0aGlzLmNhcmRDb3N0PVs0LDMsMiwzLDMsNCw0LDUsMiwzLDMsMywzLDMsNCw0LDVdO1xyXG4gICAgICAgIHRoaXMuY2FyZEZ1bmN0aW9uPW5ldyBBcnJheSgpO1xyXG5cdFx0dGhpcy5jYXJkRnVuY3Rpb25bMF09dGhpcy5ib29tXzA7XHJcblx0XHR0aGlzLmNhcmRGdW5jdGlvblsxXT10aGlzLm1pc3NpbGVfMTtcclxuXHRcdHRoaXMuY2FyZEZ1bmN0aW9uWzJdPXRoaXMubWluZV8yO1xyXG4gICAgICAgIHRoaXMuY2FyZEZ1bmN0aW9uWzNdPXRoaXMuc2hpZWxkXzM7XHJcbiAgICAgICAgdGhpcy5jYXJkRnVuY3Rpb25bNF09dGhpcy5oYWxmU2hpZWxkXzQ7XHJcbiAgICAgICAgdGhpcy5jYXJkRnVuY3Rpb25bNV09dGhpcy5ibGVzc181O1xyXG4gICAgICAgIHRoaXMuY2FyZEZ1bmN0aW9uWzZdPXRoaXMud2Vha182O1xyXG5cdFx0dGhpcy5jYXJkRnVuY3Rpb25bN109dGhpcy50ZWFtRm9yY2VfNztcclxuICAgICAgICB0aGlzLmNhcmRGdW5jdGlvbls4XT10aGlzLmhlYWxfODtcclxuICAgICAgICB0aGlzLmNhcmRGdW5jdGlvbls5XT10aGlzLmhvbHlOb3ZhXzk7XHJcblx0XHR0aGlzLmNhcmRGdW5jdGlvblsxMF09dGhpcy50ZWxlc2NvcGVfMTA7XHJcblx0XHR0aGlzLmNhcmRGdW5jdGlvblsxMV09dGhpcy5leWVfMTE7XHJcbiAgICAgICAgdGhpcy5jYXJkRnVuY3Rpb25bMTJdPXRoaXMudG91Z2hfMTI7XHJcblx0XHR0aGlzLmNhcmRGdW5jdGlvblsxM109dGhpcy5zdGVhbF8xMztcclxuXHRcdHRoaXMuY2FyZEZ1bmN0aW9uWzE0XT10aGlzLnRpZV8xNDtcclxuXHRcdHRoaXMuY2FyZEZ1bmN0aW9uWzE1XT10aGlzLmNvbmZ1c2VfMTU7XHJcbiAgICAgICAgdGhpcy5jYXJkRnVuY3Rpb25bMTZdPXRoaXMuc2F2ZV8xNjtcclxuXHRcdC8v5ZON5bqU5Y2h54mMMOeCuOW8uVxyXG5cdFx0Y2MuZ2FtZS5vbignYm9vbS1jZWxsLWNob3NlbicsIGZ1bmN0aW9uKHgsIHkpIHtcclxuXHRcdFx0dmFyIGJvb21fY2VsbCA9IFtbeCwgeV1dO1xyXG5cdFx0XHR2YXIgbWFwID0gY2MuZmluZCgnQ2FudmFzL21hcCcpLmdldENvbXBvbmVudCgnR2V0TWFwJyk7XHJcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbWFwLmFkalt4XVt5XS5sZW5ndGg7IGkrKylcclxuXHRcdFx0XHRib29tX2NlbGwucHVzaChtYXAuYWRqW3hdW3ldW2ldKTtcclxuXHRcdFx0dmFyIHJvbGU9Y2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdnbG9iYWxHYW1lJykubm93UGxheWVyO1xyXG5cdFx0XHR2YXIgaW5kZXg9TnVtYmVyKHJvbGUubmFtZVs2XSk7XHJcblx0XHRcdHZhciB0ZWFtbWF0ZT1pbmRleCsyPjQ/aW5kZXgtMjppbmRleCsyO1xyXG5cdFx0XHR2YXIgZW5lbXkxPWluZGV4KzE+ND9pbmRleC0zOmluZGV4KzE7XHJcblx0XHRcdHZhciBlbmVteTI9dGVhbW1hdGUrMT40P3RlYW1tYXRlLTM6dGVhbW1hdGUrMTtcclxuXHRcdFx0cm9sZT1jYy5maW5kKFwiQ2FudmFzL1BlcnNvbnMvUGVyc29uXCIraW5kZXgpLmdldENvbXBvbmVudCgnUGVyc29uJyk7XHJcblx0XHRcdHRlYW1tYXRlPWNjLmZpbmQoXCJDYW52YXMvUGVyc29ucy9QZXJzb25cIit0ZWFtbWF0ZSkuZ2V0Q29tcG9uZW50KCdQZXJzb24nKTtcclxuXHRcdFx0ZW5lbXkxPWNjLmZpbmQoXCJDYW52YXMvUGVyc29ucy9QZXJzb25cIitlbmVteTEpLmdldENvbXBvbmVudCgnUGVyc29uJyk7XHJcblx0XHRcdGVuZW15Mj1jYy5maW5kKFwiQ2FudmFzL1BlcnNvbnMvUGVyc29uXCIrZW5lbXkyKS5nZXRDb21wb25lbnQoJ1BlcnNvbicpO1xyXG5cdFx0XHRmb3IgKHZhciBpID0gMDtpIDwgYm9vbV9jZWxsLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0aWYgKGJvb21fY2VsbFtpXVswXSA9PSBlbmVteTEucG9zWCAmJiBib29tX2NlbGxbaV1bMV0gPT0gZW5lbXkxLnBvc1kpIHtcclxuXHRcdFx0XHRcdGVuZW15MS5ibG9vZCAtPSByb2xlLmF0dGFjayoyOyBjb25zb2xlLmxvZyhlbmVteTEubmlja25hbWUpO31cclxuXHRcdFx0XHRpZiAoYm9vbV9jZWxsW2ldWzBdID09IGVuZW15Mi5wb3NYICYmIGJvb21fY2VsbFtpXVsxXSA9PSBlbmVteTIucG9zWSkge1xyXG5cdFx0XHRcdFx0ZW5lbXkyLmJsb29kIC09IHJvbGUuYXR0YWNrKjI7IGNvbnNvbGUubG9nKGVuZW15Mi5uaWNrbmFtZSk7fVxyXG5cdFx0XHRcdGlmIChlbmVteTEuYmxvb2QgPD0gMClcclxuXHRcdFx0XHRcdGVuZW15MS5pc0RlYWQgPSAxO1xyXG5cdFx0XHRcdGlmIChlbmVteTIuYmxvb2QgPD0gMClcclxuXHRcdFx0XHRcdGVuZW15Mi5pc0RlYWQgPSAxO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJvbGUubW9iaWxpdHktPXRoaXMuY2FyZENvc3RbMF07XHJcblx0XHRcdGNjLmZpbmQoJ0NhbnZhcy9EZWNrJykuZ2V0Q29tcG9uZW50KCdEZWNrJykucmVtb3ZlQ2FyZCgwKTtcclxuXHRcdFx0Y2MuZmluZCgnQ2FudmFzL0RlY2snKS5hY3RpdmUgPSB0cnVlOyAvL+aBouWkjeWNoeeJjOWghlxyXG5cdFx0XHRjYy5maW5kKCdDYW52YXMvZW5kX2NhcmRfYnRuJykuYWN0aXZlID0gdHJ1ZTsvL+aBouWkjee7k+adn+WHuueJjFxyXG5cdFx0fSwgdGhpcyk7XHJcblx0XHQvL+WTjeW6lOWNoeeJjDEx5o+S55y8XHJcblx0XHRjYy5nYW1lLm9uKCdleWUtY2VsbC1jaG9zZW4nLCBmdW5jdGlvbih4LCB5KSB7XHJcblx0XHRcdHZhciBleWVfY2VsbCA9IFtbeCwgeV1dO1xyXG5cdFx0XHR2YXIgbWFwID0gY2MuZmluZCgnQ2FudmFzL21hcCcpLmdldENvbXBvbmVudCgnR2V0TWFwJyk7XHJcblx0XHRcdHZhciBkaXMgPSBtYXAuQmZzRGlzKHgseSk7XHJcblx0XHRcdHZhciByb2xlPWNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudCgnZ2xvYmFsR2FtZScpLm5vd1Byb3BlcnR5O1xyXG5cdFx0XHRmb3IgKHZhciBpPTA7aTwxMTsrK2kpXHJcblx0XHRcdFx0Zm9yICh2YXIgaj0wO2o8MTE7KytqKXtcclxuXHRcdFx0XHRcdGlmIChkaXNbaV1bal0hPS0xJiZkaXNbaV1bal08PTMpXHJcblx0XHRcdFx0XHRcdGV5ZV9jZWxsLnB1c2goW2ksal0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0cm9sZS5leWVzLnB1c2goZXllX2NlbGwpO1xyXG5cdFx0XHR2YXIgYnVmZj1jYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoJ0J1ZmYnKTtcclxuXHRcdFx0YnVmZi50b2RvTGlzdC5wdXNoKHtcclxuXHRcdFx0XHRlbmRUdXJuOndpbmRvdy5nbG9iYWwubm93VHVybis1LFxyXG5cdFx0XHRcdHBlcnNvbjpyb2xlLFxyXG5cdFx0XHRcdGFjdDpmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0aWYgKHRoaXMucGVyc29uICE9IGNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudCgnZ2xvYmFsR2FtZScpLm5vd1Byb3BlcnR5KVxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0XHRyb2xlLmV5ZXMuc3BsaWNlKDAsMSk7XHJcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRyb2xlLm1vYmlsaXR5LT10aGlzLmNhcmRDb3N0WzExXTtcclxuXHRcdFx0Y2MuZmluZCgnQ2FudmFzL0RlY2snKS5nZXRDb21wb25lbnQoJ0RlY2snKS5yZW1vdmVDYXJkKDExKTtcclxuXHRcdFx0Y2MuZmluZCgnQ2FudmFzL0RlY2snKS5hY3RpdmUgPSB0cnVlOyAvL+aBouWkjeWNoeeJjOWghlxyXG5cdFx0XHRjYy5maW5kKCdDYW52YXMvZW5kX2NhcmRfYnRuJykuYWN0aXZlID0gdHJ1ZTsvL+aBouWkjee7k+adn+WHuueJjFxyXG5cdFx0fSwgdGhpcyk7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0ICgpIHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxyXG59KTtcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiJdfQ==
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

  },
  setColor: function setColor() {
    //设置cell的颜色为绿色，表示可走
    this.node.color = cc.color(102, 255, 102, 255);
  },
  resetColor: function resetColor() {
    //还原cell的颜色
    this.node.color = cc.color(255, 255, 255, 255);
  },
  getOneCard: function getOneCard(person_js, cardName, totCardNum) {
    //随机获得1张牌
    var cardID = Math.floor(Math.random() * totCardNum);
    person_js.cards.push(cardID);

    if (person_js.node.name == 'Person1') {
      //创建用来提示获得卡牌的精灵节点
      var node = cc.instantiate(window.global.cardnode[cardID]);
      node.setPosition(0, 0); //开启note节点的监听，点击后消失

      node.msg = '获得卡牌:' + cardName[cardID];
      node.on('mousedown', function (event) {
        cc.game.emit('stepOnCell-done', this.msg);
        this.destroy();
      }, node);
      node.parent = this.node.parent.parent;
    } else cc.game.emit('stepOnCell-done', '获得卡牌:' + cardName[cardID]);
  },
  chooseFromThree: function chooseFromThree(cardName, totCardNum) {
    var cd = [];
    cd[0] = Math.floor(Math.random() * totCardNum);
    cd[1] = Math.floor(Math.random() * totCardNum);
    cd[2] = Math.floor(Math.random() * totCardNum);

    if (cc.find('Canvas').getComponent('globalGame').nowPlayer.name == 'Person1') {
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
    } else {
      var index = Math.floor(Math.random() * 3);
      cc.find('Canvas').getComponent('globalGame').nowProperty.cards.push(cd[index]);
      cc.game.emit('stepOnCell-done', '获得卡牌:' + cardName[cd[index]]);
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

    if (person_js.node.name == 'Person1') {
      cc.loader.loadRes('事件图片/' + event_name, cc.SpriteFrame, function (err, spriteFrame) {
        self.getComponent(cc.Sprite).spriteFrame = spriteFrame;
      }); //开启note节点的监听，点击后消失

      note.msg = '触发事件:' + event_name;
      note.on('mousedown', function (event) {
        cc.game.emit('stepOnCell-done', this.msg);
        this.destroy();
      }, note);
    } else cc.game.emit('stepOnCell-done', '触发事件:' + event_name);
  },
  specialJudge: function specialJudge(role) {
    if (this.haveMine == 1) {
      role.exposed = 1;
      role.blood -= this.mineAttack;
      if (role.blood <= 0) role.isDead = 1;
      console.log('****', this.mineAttack);
      var buff = cc.find('Canvas').getComponent('Buff');
      buff.todoList.push({
        endTurn: window.global.nowTurn + 1,
        person: role,
        act: function act() {
          if (this.person != cc.find('Canvas').getComponent('globalGame').nowProperty) return false;
          this.person.exposed = 0;
          return true;
        }
      });
      this.haveMine = 0;
    }
  },
  stepOnCell: function stepOnCell(person) {
    //获取person节点的组件
    var person_js = person.getComponent('Person');
    this.specialJudge(person_js);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcQ2VsbC5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIm1hcHgiLCJtYXB5Iiwia2luZCIsImluTW9uaXRvciIsInJvdXRlSUQiLCJzZXRDb2xvciIsIm5vZGUiLCJjb2xvciIsInJlc2V0Q29sb3IiLCJnZXRPbmVDYXJkIiwicGVyc29uX2pzIiwiY2FyZE5hbWUiLCJ0b3RDYXJkTnVtIiwiY2FyZElEIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiY2FyZHMiLCJwdXNoIiwibmFtZSIsImluc3RhbnRpYXRlIiwid2luZG93IiwiZ2xvYmFsIiwiY2FyZG5vZGUiLCJzZXRQb3NpdGlvbiIsIm1zZyIsIm9uIiwiZXZlbnQiLCJnYW1lIiwiZW1pdCIsImRlc3Ryb3kiLCJwYXJlbnQiLCJjaG9vc2VGcm9tVGhyZWUiLCJjZCIsImZpbmQiLCJnZXRDb21wb25lbnQiLCJub3dQbGF5ZXIiLCJpIiwiY29uc29sZSIsImxvZyIsImoiLCJpbmRleCIsIm5vd1Byb3BlcnR5IiwiZXZlbnRBY3Rpb24iLCJyYW5kX2V2ZW50Iiwibm90ZSIsIk5vZGUiLCJhZGRDb21wb25lbnQiLCJTcHJpdGUiLCJzZWxmIiwiZXZlbnRfbmFtZSIsInVzZUNhcmRFbmFibGVkIiwiZ29FbmFibGVkIiwiYmxvb2QiLCJ0dXJuIiwibG9hZGVyIiwibG9hZFJlcyIsIlNwcml0ZUZyYW1lIiwiZXJyIiwic3ByaXRlRnJhbWUiLCJzcGVjaWFsSnVkZ2UiLCJyb2xlIiwiaGF2ZU1pbmUiLCJleHBvc2VkIiwibWluZUF0dGFjayIsImlzRGVhZCIsImJ1ZmYiLCJ0b2RvTGlzdCIsImVuZFR1cm4iLCJub3dUdXJuIiwicGVyc29uIiwiYWN0Iiwic3RlcE9uQ2VsbCIsInJhbmRfdmFsIiwib25Mb2FkIiwic3RhcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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RCxFQUFFLENBQUM2RCxXQUE1QixFQUF5QyxVQUFVQyxHQUFWLEVBQWVDLFdBQWYsRUFBNEI7QUFDcEVWLFFBQUFBLElBQUksQ0FBQzNDLElBQUwsQ0FBVTZCLFlBQVYsQ0FBdUJ2QyxFQUFFLENBQUNvRCxNQUExQixFQUFrQ1csV0FBbEMsR0FBZ0RBLFdBQWhEO0FBQ0EsT0FGRDtBQUdBLEtBSkksTUFLQTtBQUFFO0FBQ04vRCxNQUFBQSxFQUFFLENBQUMyRCxNQUFILENBQVVDLE9BQVYsQ0FBa0IsS0FBbEIsRUFBeUI1RCxFQUFFLENBQUM2RCxXQUE1QixFQUF5QyxVQUFVQyxHQUFWLEVBQWVDLFdBQWYsRUFBNEI7QUFDcEVWLFFBQUFBLElBQUksQ0FBQzNDLElBQUwsQ0FBVTZCLFlBQVYsQ0FBdUJ2QyxFQUFFLENBQUNvRCxNQUExQixFQUFrQ1csV0FBbEMsR0FBZ0RBLFdBQWhEO0FBQ0EsT0FGRDtBQUdBO0FBQ0UsR0F6TUksQ0EyTUw7O0FBM01LLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG5cdFx0bWFweDogMCwgLy/lnKhtYXBbaV1bal3kuK3nmoTmqKrlnZDmoIdcblx0XHRtYXB5OiAwLC8v5ZyobWFwW2ldW2pd5Lit55qE57q15Z2Q5qCHXG5cdFx0a2luZDogbnVsbCwgLy/moLzlrZDnmoTnsbvlnovvvIwwOuepuueZveagvO+8jDE65Y2h54mM5qC877yMMjrkuovku7bmoLxcblx0XHRpbk1vbml0b3I6IDAsIC8v55So5p2l5Yik5pat5piv5ZCm5aSE5LqO55uR5ZCs5Lit55qE5qCH6K6wXG5cdFx0cm91dGVJRDogbnVsbCwgLy/orrDlvZXov5nkuKpjZWxs5pivbWFw5Lit5ZOq5p2hcm91dGXnmoTnu4jngrnvvIzljbPlnKhyb3V0ZXPkuK3nmoTkuIvmoIdcblx0XHRcbiAgICB9LFxuXHRcblx0c2V0Q29sb3I6IGZ1bmN0aW9uKCkge1xuXHRcdC8v6K6+572uY2VsbOeahOminOiJsuS4uue7v+iJsu+8jOihqOekuuWPr+i1sFxuXHRcdHRoaXMubm9kZS5jb2xvciA9IGNjLmNvbG9yKDEwMiwyNTUsMTAyLDI1NSk7XG5cdH0sXG5cdFxuXHRyZXNldENvbG9yOiBmdW5jdGlvbigpIHtcblx0XHQvL+i/mOWOn2NlbGznmoTpopzoibJcblx0XHR0aGlzLm5vZGUuY29sb3IgPSBjYy5jb2xvcigyNTUsMjU1LDI1NSwyNTUpO1xuXHR9LFxuXHRcblx0Z2V0T25lQ2FyZDogZnVuY3Rpb24ocGVyc29uX2pzLCBjYXJkTmFtZSwgdG90Q2FyZE51bSkge1xuXHRcdC8v6ZqP5py66I635b6XMeW8oOeJjFxuXHRcdHZhciBjYXJkSUQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqdG90Q2FyZE51bSk7XG5cdFx0cGVyc29uX2pzLmNhcmRzLnB1c2goY2FyZElEKTtcblx0XHRpZiAocGVyc29uX2pzLm5vZGUubmFtZSA9PSAnUGVyc29uMScpIHtcblx0XHQvL+WIm+W7uueUqOadpeaPkOekuuiOt+W+l+WNoeeJjOeahOeyvueBteiKgueCuVxuXHRcdFx0dmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh3aW5kb3cuZ2xvYmFsLmNhcmRub2RlW2NhcmRJRF0pO1xuXHRcdFx0bm9kZS5zZXRQb3NpdGlvbigwLCAwKTtcblx0XHRcdC8v5byA5ZCvbm90ZeiKgueCueeahOebkeWQrO+8jOeCueWHu+WQjua2iOWksVxuXHRcdFx0bm9kZS5tc2cgPSAn6I635b6X5Y2h54mMOicrY2FyZE5hbWVbY2FyZElEXTtcblx0XHRcdG5vZGUub24oJ21vdXNlZG93bicsIGZ1bmN0aW9uICggZXZlbnQgKSB7XG5cdFx0XHRcdGNjLmdhbWUuZW1pdCgnc3RlcE9uQ2VsbC1kb25lJywgdGhpcy5tc2cpO1xuXHRcdFx0XHR0aGlzLmRlc3Ryb3koKTtcblx0XHRcdH0sIG5vZGUpO1xuXHRcdFx0bm9kZS5wYXJlbnQgPSB0aGlzLm5vZGUucGFyZW50LnBhcmVudDtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdFx0Y2MuZ2FtZS5lbWl0KCdzdGVwT25DZWxsLWRvbmUnLCAn6I635b6X5Y2h54mMOicrY2FyZE5hbWVbY2FyZElEXSk7XG5cdH0sXG5cdFxuXHRjaG9vc2VGcm9tVGhyZWU6IGZ1bmN0aW9uKGNhcmROYW1lLCB0b3RDYXJkTnVtKSB7XG5cdFx0dmFyIGNkID0gW107XG5cdFx0Y2RbMF0gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqdG90Q2FyZE51bSk7XG5cdFx0Y2RbMV0gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqdG90Q2FyZE51bSk7XG5cdFx0Y2RbMl0gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqdG90Q2FyZE51bSk7XG5cdFx0XG5cdFx0aWYgKGNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudCgnZ2xvYmFsR2FtZScpLm5vd1BsYXllci5uYW1lID09ICdQZXJzb24xJykge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAzOyBpKyspIHtcblx0XHRcdFx0dmFyIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh3aW5kb3cuZ2xvYmFsLmNhcmRub2RlW2NkW2ldXSk7XG5cdFx0XHRcdG5vZGUubmFtZSA9ICdjaG9vc2VGcm9tVGhyZWUnK2k7XG5cdFx0XHRcdG5vZGUuc2V0UG9zaXRpb24oLTUwMCs1MDAqaSwgMCk7XG5cdFx0XHRcdG5vZGUuY2FyZElEID0gY2RbaV07XG5cdFx0XHRcdG5vZGUubXNnID0gJ+iOt+W+l+WNoeeJjDonK2NhcmROYW1lW2NkW2ldXTtcblx0XHRcdFx0bm9kZS5vbignbW91c2Vkb3duJywgZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRcdFx0XHR2YXIgcGVyc29uX2pzID0gY2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdnbG9iYWxHYW1lJykubm93UGxheWVyLmdldENvbXBvbmVudCgnUGVyc29uJyk7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coJ+W+l+WIsOWNoeeJjDonK3RoaXMuY2FyZElEKTtcblx0XHRcdFx0XHRwZXJzb25fanMuY2FyZHMucHVzaCh0aGlzLmNhcmRJRCk7XG5cdFx0XHRcdFx0Y2MuZ2FtZS5lbWl0KCdzdGVwT25DZWxsLWRvbmUnLCB0aGlzLm1zZyk7XG5cdFx0XHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCAzOyBqKyspIHtcblx0XHRcdFx0XHRcdGNjLmZpbmQoJ0NhbnZhcy9jaG9vc2VGcm9tVGhyZWUnK2opLmRlc3Ryb3koKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sIG5vZGUpXG5cdFx0XHRcdG5vZGUucGFyZW50ID0gdGhpcy5ub2RlLnBhcmVudC5wYXJlbnQ7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dmFyIGluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjMpO1xuXHRcdFx0Y2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdnbG9iYWxHYW1lJykubm93UHJvcGVydHkuY2FyZHMucHVzaChjZFtpbmRleF0pO1xuXHRcdFx0Y2MuZ2FtZS5lbWl0KCdzdGVwT25DZWxsLWRvbmUnLCAn6I635b6X5Y2h54mMOicrY2FyZE5hbWVbY2RbaW5kZXhdXSk7XG5cdFx0fVxuXHR9LFxuXHRcblx0ZXZlbnRBY3Rpb246IGZ1bmN0aW9uKHBlcnNvbl9qcykge1xuXHRcdC8v6ZqP5py65Lqn55SfNuS4quS6i+S7tuS5i+S4gFxuXHRcdHZhciByYW5kX2V2ZW50ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjYpO1xuXHRcdC8v5Yib5bu655So5p2l5o+Q56S66I635b6X6Kem5Y+R5LqL5Lu255qE57K+54G16IqC54K5XG5cdFx0dmFyIG5vdGUgPSBuZXcgY2MuTm9kZSgpO1xuXHRcdG5vdGUuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSk7XG5cdFx0bm90ZS5zZXRQb3NpdGlvbigwLCAwKTtcblx0XHRub3RlLnBhcmVudCA9IHRoaXMubm9kZS5wYXJlbnQucGFyZW50O1xuXHRcdHZhciBzZWxmID0gbm90ZSwgZXZlbnRfbmFtZTtcblx0XHRpZiAocmFuZF9ldmVudCA9PSAwKSB7IC8v6Zm36ZixXG5cdFx0XHRldmVudF9uYW1lID0gXCLpmbfpmLFcIjtcblx0XHRcdHBlcnNvbl9qcy51c2VDYXJkRW5hYmxlZCA9IDA7IC8v5pys5Zue5ZCI5LiN5Y+v5L2/55So5Y2h54mMLOS4i+WbnuWQiOe9rjFcblx0XHRcdC8vd2FybmluZzog5LiL5Zue5ZCI6K6w5b6X5pS55Y+YXG5cdFx0fVxuXHRcdGVsc2UgaWYgKHJhbmRfZXZlbnQgPT0gMSkgeyAvL+ebkeeLsVxuXHRcdFx0ZXZlbnRfbmFtZSA9IFwi55uR54uxXCI7IC8v5LiL5Zue5ZCI5LiN5Y+v6LWwXG5cdFx0XHRwZXJzb25fanMuZ29FbmFibGVkID0gMDtcblx0XHRcdC8vd2FybmluZzog5LiL5Zue5ZCI6K6w5b6X5pS55Y+YXG5cdFx0fVxuXHRcdGVsc2UgaWYgKHJhbmRfZXZlbnQgPT0gMikgeyAvL+aBtumtlFxuXHRcdFx0ZXZlbnRfbmFtZSA9IFwi5oG26a2UXCI7ICAvL+aNn+WkseS4gOa7tOihgOmHj1xuXHRcdFx0cGVyc29uX2pzLmJsb29kLS07XG5cdFx0fVxuXHRcdGVsc2UgaWYgKHJhbmRfZXZlbnQgPT0gMykgeyAvL+WlpeWIqee7mVxuXHRcdFx0ZXZlbnRfbmFtZSA9IFwi5aWl5Yip57uZXCI7XG5cdFx0XHRwZXJzb25fanMudHVybisrOyAvL+iOt+W+l+WbnuWQiFxuXHRcdH1cblx0XHRlbHNlIGlmIChyYW5kX2V2ZW50ID09IDQpIHsgLy/op4bph45cblx0XHRcdGV2ZW50X25hbWUgPSBcIuinhumHjlwiOyAgLy90byBkb1xuXHRcdH1cblx0XHRlbHNlIGlmIChyYW5kX2V2ZW50ID09IDUpIHsgLy/lpKnkvb9cblx0XHRcdGV2ZW50X25hbWUgPSBcIuWkqeS9v1wiO1xuXHRcdFx0cGVyc29uX2pzLmJsb29kID0gTWF0aC5mbG9vcihwZXJzb25fanMuYmxvb2QqMS41KTtcblx0XHR9XG5cdFx0aWYgKHBlcnNvbl9qcy5ub2RlLm5hbWUgPT0gJ1BlcnNvbjEnKSB7XG5cdFx0XHRjYy5sb2FkZXIubG9hZFJlcygn5LqL5Lu25Zu+54mHLycrZXZlbnRfbmFtZSwgY2MuU3ByaXRlRnJhbWUsIGZ1bmN0aW9uIChlcnIsIHNwcml0ZUZyYW1lKSB7XG5cdFx0XHRcdHNlbGYuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBzcHJpdGVGcmFtZTtcblx0XHRcdH0pO1xuXHRcdFx0Ly/lvIDlkK9ub3Rl6IqC54K555qE55uR5ZCs77yM54K55Ye75ZCO5raI5aSxXG5cdFx0XHRub3RlLm1zZyA9ICfop6blj5Hkuovku7Y6JytldmVudF9uYW1lO1xuXHRcdFx0bm90ZS5vbignbW91c2Vkb3duJywgZnVuY3Rpb24gKCBldmVudCApIHtcblx0XHRcdFx0Y2MuZ2FtZS5lbWl0KCdzdGVwT25DZWxsLWRvbmUnLCB0aGlzLm1zZyk7XG5cdFx0XHRcdHRoaXMuZGVzdHJveSgpO1xuXHRcdFx0XHRcblx0XHRcdH0sIG5vdGUpO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0XHRjYy5nYW1lLmVtaXQoJ3N0ZXBPbkNlbGwtZG9uZScsICfop6blj5Hkuovku7Y6JytldmVudF9uYW1lKTtcblx0fSxcblx0XG5cdHNwZWNpYWxKdWRnZTogZnVuY3Rpb24ocm9sZSkge1xuXHRcdGlmICh0aGlzLmhhdmVNaW5lID09IDEpIHtcblx0XHRcdHJvbGUuZXhwb3NlZCA9IDE7XG5cdFx0XHRyb2xlLmJsb29kIC09IHRoaXMubWluZUF0dGFjaztcblx0XHRcdGlmIChyb2xlLmJsb29kIDw9IDApXG5cdFx0XHRcdHJvbGUuaXNEZWFkID0gMTtcblx0XHRcdGNvbnNvbGUubG9nKCcqKioqJywgdGhpcy5taW5lQXR0YWNrKTtcblx0XHRcdHZhciBidWZmPWNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudCgnQnVmZicpO1xuXHRcdFx0YnVmZi50b2RvTGlzdC5wdXNoKHtcblx0XHRcdFx0ZW5kVHVybjp3aW5kb3cuZ2xvYmFsLm5vd1R1cm4rMSxcblx0XHRcdFx0cGVyc29uOnJvbGUsXG5cdFx0XHRcdGFjdDpmdW5jdGlvbigpe1xuXHRcdFx0XHRcdGlmICh0aGlzLnBlcnNvbiAhPSBjYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoJ2dsb2JhbEdhbWUnKS5ub3dQcm9wZXJ0eSlcblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHR0aGlzLnBlcnNvbi5leHBvc2VkID0gMDtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRcblx0XHRcdHRoaXMuaGF2ZU1pbmUgPSAwO1xuXHRcdH1cblx0fSxcblx0XG5cdHN0ZXBPbkNlbGw6IGZ1bmN0aW9uKHBlcnNvbikge1xuXHRcdFxuXHRcdC8v6I635Y+WcGVyc29u6IqC54K555qE57uE5Lu2XG5cdFx0dmFyIHBlcnNvbl9qcyA9IHBlcnNvbi5nZXRDb21wb25lbnQoJ1BlcnNvbicpO1xuXHRcdFxuXHRcdHRoaXMuc3BlY2lhbEp1ZGdlKHBlcnNvbl9qcyk7XG5cdFx0XG5cdFx0aWYgKHRoaXMua2luZCA9PSAwKSB7Ly/nqbrnmb3moLxcblx0XHRcdGNjLmdhbWUuZW1pdCgnc3RlcE9uQ2VsbC1kb25lJywgJycpOyAvL+WPkemAgeepuuS4slxuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRlbHNlIGlmICh0aGlzLmtpbmQgPT0gMSkgey8v5Y2h54mM5qC8XG5cdFx0XHR2YXIgY2FyZE5hbWUgPSBbJ+eCuOW8uScsJ+eyvuWHhuWvvOW8uScsJ+WcsOmbtycsJ+W6h+aKpCcsJ+WkqeS9v+eahOW6h+aKpCcsJ+aImOelnueahOelneemjycsJ+iZmuW8sScsJ+WboumYn+eahOWKm+mHjycsXG5cdFx0XHRcdFx0XHRcdCfmsrvmhIgnLCflnKPlhYnmma7nhacnLCfmnJvov5zplZwnLCfnnLznnZsnLCfnjJvnlLfnmoTnpZ3npo8nLCfnm5flj5YnLCfmnZ/nvJonLCfov7fmg5EnLCfmi6/mlZEnXTtcblx0XHRcdHZhciB0b3RDYXJkTnVtID0gMTdcblx0XHRcdHZhciByYW5kX3ZhbCA9IE1hdGgucmFuZG9tKCk7XG5cdFx0XHRjb25zb2xlLmxvZygncmFuZF92YWwnK3JhbmRfdmFsKTtcblx0XHRcdGlmIChyYW5kX3ZhbCA8IDAuNSkgeyAvL+W+l+WIsOS4gOW8oOeJjFxuXHRcdFx0XHR0aGlzLmdldE9uZUNhcmQocGVyc29uX2pzLCBjYXJkTmFtZSwgdG90Q2FyZE51bSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNleyAvL+S4ieW8oOS4reaKveS4gOW8oFxuXHRcdFx0XHR0aGlzLmNob29zZUZyb21UaHJlZShjYXJkTmFtZSwgdG90Q2FyZE51bSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2UgaWYgKHRoaXMua2luZCA9PSAyKSB7IC8v5LqL5Lu25qC8XG5cdFx0XHR0aGlzLmV2ZW50QWN0aW9uKHBlcnNvbl9qcyk7IC8v5ZON5bqU5LqL5Lu2XG5cdFx0fVxuXHR9LFxuXHRcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcblxuICAgIG9uTG9hZCAoKSB7XG5cdFx0XG5cdH0sXG5cbiAgICBzdGFydCAoKSB7XG5cdFx0Ly/orr7nva7moLzlrZDlm77niYdcblx0XHRcblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cdFx0aWYgKHRoaXMua2luZCA9PSAwKSB7IC8v56m655m95qC8XG5cdFx0XHRjYy5sb2FkZXIubG9hZFJlcyhcImNlbGxcIiwgY2MuU3ByaXRlRnJhbWUsIGZ1bmN0aW9uIChlcnIsIHNwcml0ZUZyYW1lKSB7XG5cdFx0XHRcdHNlbGYubm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHNwcml0ZUZyYW1lO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGVsc2UgaWYgKHRoaXMua2luZCA9PSAxKSB7IC8v5Y2h54mM5qC8XG5cdFx0XHRjYy5sb2FkZXIubG9hZFJlcyhcIuaKveWNoeagvFwiLCBjYy5TcHJpdGVGcmFtZSwgZnVuY3Rpb24gKGVyciwgc3ByaXRlRnJhbWUpIHtcblx0XHRcdFx0c2VsZi5ub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gc3ByaXRlRnJhbWU7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0ZWxzZSB7IC8v5LqL5Lu25qC8XG5cdFx0XHRjYy5sb2FkZXIubG9hZFJlcyhcIuS6i+S7tuagvFwiLCBjYy5TcHJpdGVGcmFtZSwgZnVuY3Rpb24gKGVyciwgc3ByaXRlRnJhbWUpIHtcblx0XHRcdFx0c2VsZi5ub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gc3ByaXRlRnJhbWU7XG5cdFx0XHR9KTtcblx0XHR9XG4gICAgfSxcblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxufSk7XG5cblxuXG5cblxuXG5cblxuXG5cblxuXG4iXX0=
//------QC-SOURCE-SPLIT------

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
    deck: [cc.Integer],
    role: null
  },
  showTips: function showTips(news) {
    var tips = new cc.Node();
    tips.addComponent(cc.Label);
    label = tips.getComponent(cc.Label);
    label.string = news;
    label.fontSize = 50;
    label.enableBold = true;
    tips.color = cc.color(255, 0, 0, 255);
    tips.addComponent('Tips');
    tips.parent = cc.find('Canvas');
  },
  choose_confirm: function choose_confirm() {
    var cardID = window.global.now_choosing_card;
    var role = cc.find('Canvas').getComponent('globalGame').nowProperty;
    var card = cc.find('Canvas/Card').getComponent('Card');

    if (role.mobility < card.cardCost[cardID]) {
      cc.find('Canvas/Deck').getComponent('Deck').showTips("行动值不足！");
    } else {
      card.cardFunction[cardID](card);
      cc.find('Canvas/Deck').getComponent('Deck').closeCards();
    } //关闭按钮


    cc.find('Canvas/choose_card_confirm').active = false;
    cc.find('Canvas/choose_card_cancel').active = false;
  },
  choose_cancel: function choose_cancel() {
    //关闭按钮
    cc.find('Canvas/choose_card_confirm').active = false;
    cc.find('Canvas/choose_card_cancel').active = false;
  },
  cardDetail: function cardDetail() {
    var node = cc.instantiate(this);
    node.name = "card_detail";
    node.scaleX = 0.8, node.scaleY = 0.8;
    node.setPosition(0, 50);
    node.parent = cc.find("Canvas");
  },
  closeDetail: function closeDetail() {
    var node = cc.find("Canvas/card_detail");
    if (node != null) node.destroy();
  },
  removeCard: function removeCard(cardID) {
    var role = cc.find('Canvas').getComponent('globalGame').nowProperty;

    for (var i = 0; i < role.cards.length; ++i) {
      if (role.cards[i] == cardID) {
        role.cards.splice(i, 1);
        break;
      }
    }
  },
  chooseCard: function chooseCard(event) {
    var deck = cc.find("Canvas/Deck").getComponent("Deck");
    deck.closeDetail(); //显示确定/取消按钮

    cc.find('Canvas/choose_card_confirm').active = true;
    cc.find('Canvas/choose_card_cancel').active = true; //重置当前选择的手牌

    window.global.now_choosing_card = this.cardID;
    event.stopPropagation();
  },
  showCards: function showCards() {
    var isPlayCard = cc.find("Canvas").getComponent("globalGame").nowStep == 3;

    for (var i = 0; i < this.deck.length; ++i) {
      var cardID = this.deck[i];
      var node = cc.instantiate(window.global.cardnode[cardID]);
      node.scaleX = 0.4, node.scaleY = 0.4;
      node.setPosition(200 + i * 200, 0);
      node.cardID = cardID;
      node.parent = this.node;
      node.on("mouseenter", this.cardDetail, node);
      node.on("mouseleave", this.closeDetail, node);

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

    deck = cc.find('Canvas/Deck').getComponent('Deck');
    deck.node.off("mousedown", this.closeCards, deck);
    deck.node.on("mousedown", this.initDeck, deck);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcRGVjay5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImRlY2siLCJJbnRlZ2VyIiwicm9sZSIsInNob3dUaXBzIiwibmV3cyIsInRpcHMiLCJOb2RlIiwiYWRkQ29tcG9uZW50IiwiTGFiZWwiLCJsYWJlbCIsImdldENvbXBvbmVudCIsInN0cmluZyIsImZvbnRTaXplIiwiZW5hYmxlQm9sZCIsImNvbG9yIiwicGFyZW50IiwiZmluZCIsImNob29zZV9jb25maXJtIiwiY2FyZElEIiwid2luZG93IiwiZ2xvYmFsIiwibm93X2Nob29zaW5nX2NhcmQiLCJub3dQcm9wZXJ0eSIsImNhcmQiLCJtb2JpbGl0eSIsImNhcmRDb3N0IiwiY2FyZEZ1bmN0aW9uIiwiY2xvc2VDYXJkcyIsImFjdGl2ZSIsImNob29zZV9jYW5jZWwiLCJjYXJkRGV0YWlsIiwibm9kZSIsImluc3RhbnRpYXRlIiwibmFtZSIsInNjYWxlWCIsInNjYWxlWSIsInNldFBvc2l0aW9uIiwiY2xvc2VEZXRhaWwiLCJkZXN0cm95IiwicmVtb3ZlQ2FyZCIsImkiLCJjYXJkcyIsImxlbmd0aCIsInNwbGljZSIsImNob29zZUNhcmQiLCJldmVudCIsInN0b3BQcm9wYWdhdGlvbiIsInNob3dDYXJkcyIsImlzUGxheUNhcmQiLCJub3dTdGVwIiwiY2FyZG5vZGUiLCJvbiIsImNoaWxkcmVuIiwib2ZmIiwiaW5pdERlY2siLCJub3dQbGF5ZXIiLCJvbkxvYWQiLCJzdGFydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLElBQUksRUFBQyxDQUFDSixFQUFFLENBQUNLLE9BQUosQ0FERztBQUVSQyxJQUFB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bUJBd0dJO0FBQ0wsU0FBSzFCLElBQUwsQ0FBVW9CLEVBQVYsQ0FBYSxXQUFiLEVBQXlCLEtBQUtHLFFBQTlCLEVBQXVDLElBQXZDO0FBRUgsR0EzR0ksQ0E2R0w7O0FBN0dLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBkZWNrOltjYy5JbnRlZ2VyXSxcclxuICAgICAgICByb2xlOiBudWxsLFxyXG4gICAgfSxcclxuICAgIFxyXG4gICAgc2hvd1RpcHM6ZnVuY3Rpb24obmV3cyl7XHJcbiAgICAgICAgdmFyIHRpcHM9bmV3IGNjLk5vZGUoKTtcclxuICAgICAgICB0aXBzLmFkZENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgbGFiZWw9dGlwcy5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIGxhYmVsLnN0cmluZz1uZXdzO1xyXG4gICAgICAgIGxhYmVsLmZvbnRTaXplPTUwO1xyXG4gICAgICAgIGxhYmVsLmVuYWJsZUJvbGQ9dHJ1ZTtcclxuICAgICAgICB0aXBzLmNvbG9yPWNjLmNvbG9yKDI1NSwwLDAsMjU1KTtcclxuICAgICAgICB0aXBzLmFkZENvbXBvbmVudCgnVGlwcycpO1xyXG4gICAgICAgIHRpcHMucGFyZW50PWNjLmZpbmQoJ0NhbnZhcycpOyAgICAgICAgXHJcbiAgICB9LFxyXG4gICAgY2hvb3NlX2NvbmZpcm06ZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgY2FyZElEPXdpbmRvdy5nbG9iYWwubm93X2Nob29zaW5nX2NhcmQ7XHJcbiAgICAgICAgdmFyIHJvbGU9Y2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdnbG9iYWxHYW1lJykubm93UHJvcGVydHk7XHJcbiAgICAgICAgdmFyIGNhcmQ9Y2MuZmluZCgnQ2FudmFzL0NhcmQnKS5nZXRDb21wb25lbnQoJ0NhcmQnKTtcclxuICAgICAgICBpZiAocm9sZS5tb2JpbGl0eTxjYXJkLmNhcmRDb3N0W2NhcmRJRF0pe1xyXG4gICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvRGVjaycpLmdldENvbXBvbmVudCgnRGVjaycpLnNob3dUaXBzKFwi6KGM5Yqo5YC85LiN6Laz77yBXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBjYXJkLmNhcmRGdW5jdGlvbltjYXJkSURdKGNhcmQpO1xyXG4gICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvRGVjaycpLmdldENvbXBvbmVudCgnRGVjaycpLmNsb3NlQ2FyZHMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/lhbPpl63mjInpkq5cclxuXHRcdGNjLmZpbmQoJ0NhbnZhcy9jaG9vc2VfY2FyZF9jb25maXJtJykuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9jaG9vc2VfY2FyZF9jYW5jZWwnKS5hY3RpdmU9ZmFsc2U7ICAgICAgICAgICAgXHJcbiAgICB9LFxyXG5cdGNob29zZV9jYW5jZWw6ZnVuY3Rpb24oKXtcclxuICAgICAgICAvL+WFs+mXreaMiemSrlxyXG5cdFx0Y2MuZmluZCgnQ2FudmFzL2Nob29zZV9jYXJkX2NvbmZpcm0nKS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgY2MuZmluZCgnQ2FudmFzL2Nob29zZV9jYXJkX2NhbmNlbCcpLmFjdGl2ZT1mYWxzZTsgICAgICAgIFxyXG4gICAgfSxcclxuICAgIGNhcmREZXRhaWw6ZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgbm9kZT1jYy5pbnN0YW50aWF0ZSh0aGlzKTtcclxuICAgICAgICBub2RlLm5hbWU9XCJjYXJkX2RldGFpbFwiO1xyXG4gICAgICAgIG5vZGUuc2NhbGVYPTAuOCxub2RlLnNjYWxlWT0wLjg7XHJcbiAgICAgICAgbm9kZS5zZXRQb3NpdGlvbigwLDUwKTtcclxuICAgICAgICBub2RlLnBhcmVudD1jYy5maW5kKFwiQ2FudmFzXCIpO1xyXG4gICAgfSxcclxuICAgIGNsb3NlRGV0YWlsOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIG5vZGU9Y2MuZmluZChcIkNhbnZhcy9jYXJkX2RldGFpbFwiKTtcclxuICAgICAgICBpZiAobm9kZSE9bnVsbClcclxuICAgICAgICAgICAgbm9kZS5kZXN0cm95KCk7XHJcbiAgICB9LFxyXG4gICAgcmVtb3ZlQ2FyZDpmdW5jdGlvbihjYXJkSUQpe1xyXG4gICAgICAgIHZhciByb2xlPWNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudCgnZ2xvYmFsR2FtZScpLm5vd1Byb3BlcnR5O1xyXG4gICAgICAgIGZvciAodmFyIGk9MDtpPHJvbGUuY2FyZHMubGVuZ3RoOysraSlcclxuICAgICAgICAgICAgaWYgKHJvbGUuY2FyZHNbaV09PWNhcmRJRCl7XHJcbiAgICAgICAgICAgICAgICByb2xlLmNhcmRzLnNwbGljZShpLDEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBjaG9vc2VDYXJkOmZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICB2YXIgZGVjaz1jYy5maW5kKFwiQ2FudmFzL0RlY2tcIikuZ2V0Q29tcG9uZW50KFwiRGVja1wiKTtcclxuICAgICAgICBkZWNrLmNsb3NlRGV0YWlsKCk7XHJcbiAgICAgICAgLy/mmL7npLrnoa7lrpov5Y+W5raI5oyJ6ZKuXHJcblx0XHRjYy5maW5kKCdDYW52YXMvY2hvb3NlX2NhcmRfY29uZmlybScpLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9jaG9vc2VfY2FyZF9jYW5jZWwnKS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAvL+mHjee9ruW9k+WJjemAieaLqeeahOaJi+eJjFxyXG4gICAgICAgIHdpbmRvdy5nbG9iYWwubm93X2Nob29zaW5nX2NhcmQ9dGhpcy5jYXJkSUQ7XHJcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB9LFx0XHJcbiAgICBzaG93Q2FyZHM6ZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgaXNQbGF5Q2FyZD0oY2MuZmluZChcIkNhbnZhc1wiKS5nZXRDb21wb25lbnQoXCJnbG9iYWxHYW1lXCIpLm5vd1N0ZXA9PTMpO1xyXG4gICAgICAgIGZvciAodmFyIGk9MDtpPHRoaXMuZGVjay5sZW5ndGg7KytpKXtcclxuICAgICAgICAgICAgdmFyIGNhcmRJRD10aGlzLmRlY2tbaV07XHJcbiAgICAgICAgICAgIHZhciBub2RlPWNjLmluc3RhbnRpYXRlKHdpbmRvdy5nbG9iYWwuY2FyZG5vZGVbY2FyZElEXSk7XHJcbiAgICAgICAgICAgIG5vZGUuc2NhbGVYPTAuNCxub2RlLnNjYWxlWT0wLjQ7XHJcbiAgICAgICAgICAgIG5vZGUuc2V0UG9zaXRpb24oMjAwK2kqMjAwLDApO1xyXG4gICAgICAgICAgICBub2RlLmNhcmRJRD1jYXJkSUQ7XHJcbiAgICAgICAgICAgIG5vZGUucGFyZW50PXRoaXMubm9kZTtcclxuICAgICAgICAgICAgbm9kZS5vbihcIm1vdXNlZW50ZXJcIix0aGlzLmNhcmREZXRhaWwsbm9kZSk7XHJcbiAgICAgICAgICAgIG5vZGUub24oXCJtb3VzZWxlYXZlXCIsdGhpcy5jbG9zZURldGFpbCxub2RlKTtcclxuXHRcdFx0aWYgKGlzUGxheUNhcmQ9PXRydWUpe1xyXG5cdFx0XHQgICAgbm9kZS5vbihcIm1vdXNlZG93blwiLHRoaXMuY2hvb3NlQ2FyZCxub2RlKTtcclxuXHRcdFx0fVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblx0Y2xvc2VDYXJkczpmdW5jdGlvbigpe1xyXG5cdFx0dmFyIGNoaWxkcmVuPWNjLmZpbmQoXCJDYW52YXMvRGVja1wiKS5jaGlsZHJlbjtcclxuXHRcdGZvciAodmFyIGk9MDtpPGNoaWxkcmVuLmxlbmd0aDsrK2kpXHJcbiAgICAgICAgICAgIGNoaWxkcmVuW2ldLmRlc3Ryb3koKTtcclxuICAgICAgICBkZWNrPWNjLmZpbmQoJ0NhbnZhcy9EZWNrJykuZ2V0Q29tcG9uZW50KCdEZWNrJyk7XHJcblx0XHRkZWNrLm5vZGUub2ZmKFwibW91c2Vkb3duXCIsdGhpcy5jbG9zZUNhcmRzLGRlY2spO1xyXG5cdFx0ZGVjay5ub2RlLm9uKFwibW91c2Vkb3duXCIsdGhpcy5pbml0RGVjayxkZWNrKTtcclxuICAgIH0sXHJcbiAgICBpbml0RGVjazpmdW5jdGlvbigpe1xyXG5cdFx0dGhpcy5yb2xlPWNjLmZpbmQoXCJDYW52YXNcIikuZ2V0Q29tcG9uZW50KFwiZ2xvYmFsR2FtZVwiKS5ub3dQbGF5ZXI7XHJcblx0XHR0aGlzLmRlY2s9dGhpcy5yb2xlLmdldENvbXBvbmVudChcIlBlcnNvblwiKS5jYXJkcztcclxuICAgICAgICB0aGlzLnNob3dDYXJkcygpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vZmYoXCJtb3VzZWRvd25cIix0aGlzLmluaXREZWNrLHRoaXMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vbihcIm1vdXNlZG93blwiLHRoaXMuY2xvc2VDYXJkcyx0aGlzKTtcclxuICAgIH0sXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIFxyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydCAoKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKFwibW91c2Vkb3duXCIsdGhpcy5pbml0RGVjayx0aGlzKTtcclxuXHRcclxuICAgIH0sXHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge30sXHJcbn0pO1xyXG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Mist.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '7169acSg7NJSr4xdfeK+4B9', 'Mist');
// scripts/Mist.js

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
    singleMist: null,
    mistArr: null,
    cnt: 0,
    map: null
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    this.singleMist = new cc.Node();
    this.singleMist.addComponent(cc.Sprite);
    cc.loader.loadRes('迷雾', cc.SpriteFrame, function (err, spriteFrame) {
      this.getComponent(cc.Sprite).spriteFrame = spriteFrame;
    }.bind(this.singleMist));
  },
  start: function start() {},
  getMistArr: function getMistArr() {
    this.map = cc.find('Canvas/map').getComponent('GetMap');
    var map_matrix = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1], [1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1], [1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1], [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1], [1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1], [1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1], [1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];
    this.mistArr = new Array();

    for (var i = 0; i < 11; i++) {
      this.mistArr[i] = new Array();

      for (var j = 0; j < 11; j++) {
        if (map_matrix[i][j] == 0) this.mistArr[i][j] = null;else {
          this.mistArr[i][j] = cc.instantiate(this.singleMist);
          this.mistArr[i][j].setPosition(this.basex + this.stepx * i, this.basey + this.stepy * j);
          this.mistArr[i][j].parent = this.node;
        }
      }
    }
  },
  update: function update(dt) {
    if (this.cnt == 10) {
      this.getMistArr();
    }

    this.cnt++;

    if (this.cnt == 16) {
      this.cnt -= 5;
      var person = cc.find('Canvas/Persons/Person1').getComponent('Person');
      var dis = this.map.BfsDis(person.posX, person.posY);

      for (var i = 0; i < 11; i++) {
        for (var j = 0; j < 11; j++) {
          if (dis[i][j] == -1) continue;
          if (dis[i][j] <= person.sight) this.mistArr[i][j].active = false;else this.mistArr[i][j].active = true;
        }
      }

      for (var i = 0; i < person.eyes.length; ++i) {
        for (var j = 0; j < person.eyes[i].length; ++j) {
          this.mistArr[person.eyes[i][j][0]][person.eyes[i][j][1]].active = false;
        }
      }

      var index = Number(person.node.name[6]);
      var teammate = index + 2 > 4 ? index - 2 : index + 2;
      var enemy1 = index + 1 > 4 ? index - 3 : index + 1;
      var enemy2 = teammate + 1 > 4 ? teammate - 3 : teammate + 1;
      teammate = cc.find("Canvas/Persons/Person" + teammate).getComponent('Person');
      dis = this.map.BfsDis(teammate.posX, teammate.posY);

      for (var i = 0; i < 11; i++) {
        for (var j = 0; j < 11; j++) {
          if (dis[i][j] == -1) continue;
          if (dis[i][j] <= person.sight) this.mistArr[i][j].active = false;
        }
      }

      for (var i = 0; i < teammate.eyes.length; ++i) {
        for (var j = 0; j < teammate.eyes[i].length; ++j) {
          this.mistArr[teammate.eyes[i][j][0]][teammate.eyes[i][j][1]].active = false;
        }
      }

      enemy1 = cc.find("Canvas/Persons/Person" + enemy1).getComponent('Person');
      enemy2 = cc.find("Canvas/Persons/Person" + enemy2).getComponent('Person');
      if (enemy1.isDead == 0 && enemy1.exposed == 1) this.mistArr[enemy1.posX][enemy1.posY].active = false;
      if (enemy2.isDead == 0 && enemy2.exposed == 1) this.mistArr[enemy2.posX][enemy2.posY].active = false;
      var ps2 = cc.find('Canvas/Persons/Person2').getComponent('Person');
      var ps4 = cc.find('Canvas/Persons/Person4').getComponent('Person');
      if (this.mistArr[ps2.posX][ps2.posY].active == true && ps2.exposed != 1) ps2.avatar.opacity = 0;else ps2.avatar.opacity = 255;
      if (this.mistArr[ps4.posX][ps4.posY].active == true && ps4.exposed != 1) ps4.avatar.opacity = 0;else ps4.avatar.opacity = 255;
    }
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcTWlzdC5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImJhc2V4IiwiYmFzZXkiLCJzdGVweCIsInN0ZXB5Iiwic2luZ2xlTWlzdCIsIm1pc3RBcnIiLCJjbnQiLCJtYXAiLCJvbkxvYWQiLCJOb2RlIiwiYWRkQ29tcG9uZW50IiwiU3ByaXRlIiwibG9hZGVyIiwibG9hZFJlcyIsIlNwcml0ZUZyYW1lIiwiZXJyIiwic3ByaXRlRnJhbWUiLCJnZXRDb21wb25lbnQiLCJiaW5kIiwic3RhcnQiLCJnZXRNaXN0QXJyIiwiZmluZCIsIm1hcF9tYXRyaXgiLCJBcnJheSIsImkiLCJqIiwiaW5zdGFudGlhdGUiLCJzZXRQb3NpdGlvbiIsInBhcmVudCIsIm5vZGUiLCJ1cGRhdGUiLCJkdCIsInBlcnNvbiIsImRpcyIsIkJmc0RpcyIsInBvc1giLCJwb3NZIiwic2lnaHQiLCJhY3RpdmUiLCJleWVzIiwibGVuZ3RoIiwiaW5kZXgiLCJOdW1iZXIiLCJuYW1lIiwidGVhbW1hdGUiLCJlbmVteTEiLCJlbmVteTIiLCJpc0RlYWQiLCJleHBvc2VkIiwicHMyIiwicHM0IiwiYXZhdGFyIiwib3BhY2l0eSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ2RDLElBQUFBLEtBQUssRUFBRSxDQURPO0FBRWRDLElBQUFBLEtBQUssRUFBRSxDQUZPO0FBR2RDLElBQUFBLEtBQUssRUFBRSxDQUhPO0FBSWRDLElBQUFBLEtBQUssRUFBRSxDQUpPO0FBS1JDLElBQUFBLFVBQVUsRUFBRSxJQUxKO0FBTWRDLElBQUFBLE9BQU8sRUFBRSxJQU5LO0FBT2RDLElBQUFBLEdBQUcsRUFBQyxDQVBVO0FBUWRD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V0MsT0FBWCxHQUFxQixHQUFyQjtBQUVEO0FBRUQ7QUE1SE8sQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gY2MuQ2xhc3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG5cdFx0YmFzZXg6IDAsXHJcblx0XHRiYXNleTogMCxcclxuXHRcdHN0ZXB4OiAwLFxyXG5cdFx0c3RlcHk6IDAsXHJcbiAgICAgICAgc2luZ2xlTWlzdDogbnVsbCxcclxuXHRcdG1pc3RBcnI6IG51bGwsXHJcblx0XHRjbnQ6MCxcclxuXHRcdG1hcDpudWxsLFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG5cdFx0dGhpcy5zaW5nbGVNaXN0ID0gbmV3IGNjLk5vZGUoKTtcclxuXHRcdHRoaXMuc2luZ2xlTWlzdC5hZGRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuXHRcdGNjLmxvYWRlci5sb2FkUmVzKCfov7fpm74nLGNjLlNwcml0ZUZyYW1lLGZ1bmN0aW9uKGVycixzcHJpdGVGcmFtZSkge1xyXG7CoCDCoCDCoCDCoCDCoCDCoCB0aGlzLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gc3ByaXRlRnJhbWU7XHJcblx0wqAgwqAgfS5iaW5kKHRoaXMuc2luZ2xlTWlzdCkpO1xyXG5cdH0sXHJcblxyXG4gICAgc3RhcnQgKCkge1xyXG5cdFx0XHJcblx0XHRcclxuICAgIH0sXHJcblx0Z2V0TWlzdEFycjogZnVuY3Rpb24oKSB7XHJcblx0XHR0aGlzLm1hcCA9IGNjLmZpbmQoJ0NhbnZhcy9tYXAnKS5nZXRDb21wb25lbnQoJ0dldE1hcCcpO1xyXG5cdFx0dmFyIG1hcF9tYXRyaXggPSBbXHJcblx0XHRcdFsxLDEsMSwxLDEsMSwxLDEsMSwxLDFdLFxyXG5cdFx0XHRbMSwxLDAsMCwwLDEsMCwwLDAsMSwxXSxcclxuXHRcdFx0WzEsMCwxLDAsMCwxLDAsMCwxLDAsMV0sXHJcblx0XHRcdFsxLDAsMCwxLDEsMCwxLDEsMCwwLDFdLFxyXG5cdFx0XHRbMSwwLDAsMSwwLDAsMCwxLDAsMCwxXSxcclxuXHRcdFx0WzEsMSwxLDEsMSwxLDEsMSwxLDEsMV0sXHJcblx0XHRcdFsxLDAsMCwxLDAsMCwwLDEsMCwwLDFdLFxyXG5cdFx0XHRbMSwwLDAsMSwxLDAsMSwxLDAsMCwxXSxcclxuXHRcdFx0WzEsMCwxLDAsMCwxLDAsMCwxLDAsMV0sXHJcblx0XHRcdFsxLDEsMCwwLDAsMSwwLDAsMCwxLDFdLFxyXG5cdFx0XHRbMSwxLDEsMSwxLDEsMSwxLDEsMSwxXSxcclxuXHRcdF07XHJcblx0XHR0aGlzLm1pc3RBcnIgPSBuZXcgQXJyYXkoKTtcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgMTE7IGkrKykge1xyXG5cdFx0XHR0aGlzLm1pc3RBcnJbaV0gPSBuZXcgQXJyYXkoKTtcclxuXHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCAxMTsgaisrKSB7XHJcblx0XHRcdFx0aWYgKG1hcF9tYXRyaXhbaV1bal0gPT0gMClcclxuXHRcdFx0XHRcdHRoaXMubWlzdEFycltpXVtqXSA9IG51bGw7XHJcblx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdHRoaXMubWlzdEFycltpXVtqXSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuc2luZ2xlTWlzdCk7XHJcblx0XHRcdFx0XHR0aGlzLm1pc3RBcnJbaV1bal0uc2V0UG9zaXRpb24odGhpcy5iYXNleCt0aGlzLnN0ZXB4KmksIHRoaXMuYmFzZXkrdGhpcy5zdGVweSpqKTtcclxuXHRcdFx0XHRcdHRoaXMubWlzdEFycltpXVtqXS5wYXJlbnQgPSB0aGlzLm5vZGU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSxcclxuXHJcbiAgICB1cGRhdGUgKGR0KSB7XHJcblx0XHRpZiAodGhpcy5jbnQgPT0gMTApIHtcclxuXHRcdFx0dGhpcy5nZXRNaXN0QXJyKCk7XHJcblx0XHR9XHJcblx0XHR0aGlzLmNudCsrO1xyXG5cdFx0XHJcblx0XHRcclxuXHRcdGlmICh0aGlzLmNudCA9PSAxNikge1xyXG5cdFx0XHR0aGlzLmNudCAtPSA1O1xyXG5cdFx0XHR2YXIgcGVyc29uID0gY2MuZmluZCgnQ2FudmFzL1BlcnNvbnMvUGVyc29uMScpLmdldENvbXBvbmVudCgnUGVyc29uJyk7XHJcblx0XHRcdHZhciBkaXMgPSB0aGlzLm1hcC5CZnNEaXMocGVyc29uLnBvc1gsIHBlcnNvbi5wb3NZKTtcclxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAxMTsgaSsrKSB7XHJcblx0XHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCAxMTsgaisrKSB7XHJcblx0XHRcdFx0XHRpZiAoZGlzW2ldW2pdID09IC0xKVxyXG5cdFx0XHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0XHRcdGlmIChkaXNbaV1bal0gPD0gcGVyc29uLnNpZ2h0KVxyXG5cdFx0XHRcdFx0XHR0aGlzLm1pc3RBcnJbaV1bal0uYWN0aXZlID0gZmFsc2U7XHJcblx0XHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHRcdHRoaXMubWlzdEFycltpXVtqXS5hY3RpdmUgPSB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRmb3IgKHZhciBpPTA7aTxwZXJzb24uZXllcy5sZW5ndGg7KytpKXtcclxuXHRcdFx0XHRmb3IgKHZhciBqPTA7ajxwZXJzb24uZXllc1tpXS5sZW5ndGg7KytqKXtcclxuXHRcdFx0XHRcdHRoaXMubWlzdEFycltwZXJzb24uZXllc1tpXVtqXVswXV1bcGVyc29uLmV5ZXNbaV1bal1bMV1dLmFjdGl2ZT1mYWxzZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0dmFyIGluZGV4PU51bWJlcihwZXJzb24ubm9kZS5uYW1lWzZdKTtcclxuXHRcdFx0dmFyIHRlYW1tYXRlPWluZGV4KzI+ND9pbmRleC0yOmluZGV4KzI7XHJcblx0XHRcdHZhciBlbmVteTE9aW5kZXgrMT40P2luZGV4LTM6aW5kZXgrMTtcclxuXHRcdFx0dmFyIGVuZW15Mj10ZWFtbWF0ZSsxPjQ/dGVhbW1hdGUtMzp0ZWFtbWF0ZSsxO1xyXG5cdFx0XHR0ZWFtbWF0ZT1jYy5maW5kKFwiQ2FudmFzL1BlcnNvbnMvUGVyc29uXCIrdGVhbW1hdGUpLmdldENvbXBvbmVudCgnUGVyc29uJyk7XHJcblx0XHRcdGRpcyA9IHRoaXMubWFwLkJmc0Rpcyh0ZWFtbWF0ZS5wb3NYLCB0ZWFtbWF0ZS5wb3NZKTtcclxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAxMTsgaSsrKSB7XHJcblx0XHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCAxMTsgaisrKSB7XHJcblx0XHRcdFx0XHRpZiAoZGlzW2ldW2pdID09IC0xKVxyXG5cdFx0XHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0XHRcdGlmIChkaXNbaV1bal0gPD0gcGVyc29uLnNpZ2h0KVxyXG5cdFx0XHRcdFx0XHR0aGlzLm1pc3RBcnJbaV1bal0uYWN0aXZlID0gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdGZvciAodmFyIGk9MDtpPHRlYW1tYXRlLmV5ZXMubGVuZ3RoOysraSl7XHJcblx0XHRcdFx0Zm9yICh2YXIgaj0wO2o8dGVhbW1hdGUuZXllc1tpXS5sZW5ndGg7KytqKVxyXG5cdFx0XHRcdFx0dGhpcy5taXN0QXJyW3RlYW1tYXRlLmV5ZXNbaV1bal1bMF1dW3RlYW1tYXRlLmV5ZXNbaV1bal1bMV1dLmFjdGl2ZT1mYWxzZTtcclxuXHRcdFx0fVx0XHRcdFxyXG5cdFx0XHRcclxuXHRcdFx0ZW5lbXkxPWNjLmZpbmQoXCJDYW52YXMvUGVyc29ucy9QZXJzb25cIitlbmVteTEpLmdldENvbXBvbmVudCgnUGVyc29uJyk7XHJcblx0XHRcdGVuZW15Mj1jYy5maW5kKFwiQ2FudmFzL1BlcnNvbnMvUGVyc29uXCIrZW5lbXkyKS5nZXRDb21wb25lbnQoJ1BlcnNvbicpO1xyXG5cdFx0XHRpZiAoZW5lbXkxLmlzRGVhZCA9PSAwICYmIGVuZW15MS5leHBvc2VkID09IDEpXHJcblx0XHRcdFx0dGhpcy5taXN0QXJyW2VuZW15MS5wb3NYXVtlbmVteTEucG9zWV0uYWN0aXZlID0gZmFsc2U7XHJcblx0XHRcdGlmIChlbmVteTIuaXNEZWFkID09IDAgJiYgZW5lbXkyLmV4cG9zZWQgPT0gMSlcclxuXHRcdFx0XHR0aGlzLm1pc3RBcnJbZW5lbXkyLnBvc1hdW2VuZW15Mi5wb3NZXS5hY3RpdmUgPSBmYWxzZTtcclxuXHRcdFx0XHJcblx0XHRcdHZhciBwczIgPSBjYy5maW5kKCdDYW52YXMvUGVyc29ucy9QZXJzb24yJykuZ2V0Q29tcG9uZW50KCdQZXJzb24nKTtcclxuXHRcdFx0dmFyIHBzNCA9IGNjLmZpbmQoJ0NhbnZhcy9QZXJzb25zL1BlcnNvbjQnKS5nZXRDb21wb25lbnQoJ1BlcnNvbicpO1xyXG5cdFx0XHRpZiAodGhpcy5taXN0QXJyW3BzMi5wb3NYXVtwczIucG9zWV0uYWN0aXZlID09IHRydWUgJiYgcHMyLmV4cG9zZWQgIT0gMSlcclxuXHRcdFx0XHRwczIuYXZhdGFyLm9wYWNpdHkgPSAwO1xyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0cHMyLmF2YXRhci5vcGFjaXR5ID0gMjU1O1xyXG5cdFx0XHRpZiAodGhpcy5taXN0QXJyW3BzNC5wb3NYXVtwczQucG9zWV0uYWN0aXZlID09IHRydWUgJiYgcHM0LmV4cG9zZWQgIT0gMSlcclxuXHRcdFx0XHRwczQuYXZhdGFyLm9wYWNpdHkgPSAwO1xyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0cHM0LmF2YXRhci5vcGFjaXR5ID0gMjU1O1xyXG5cdFx0XHRcclxuXHRcdH1cclxuXHRcdFxyXG5cdH0sXHJcbn0pO1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4iXX0=
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
    cc.game.end();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcc3RhcnRVSS5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInN0YXJ0R2FtZUJ0biIsImV4aXRHYW1lQnRuIiwib25Mb2FkIiwiZmluZCIsImNvbnNvbGUiLCJsb2ciLCJzdGFydCIsInN0YXJ0R2FtZSIsImRpcmVjdG9yIiwibG9hZFNjZW5lIiwiZXhpdEdhbWUiLCJnYW1lIiwiZW5kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDVEMsSUFBQUEsWUFBWSxFQUFDLElBREo7QUFFWkMsSUFBQUEsV0FBVyxFQUFDO0FBRkEsR0FIUDtBQU9SQyxFQUFBQSxNQVBRLG9CQU9BO0FBQ1AsU0FBS0YsWUFBTCxHQUFrQkosRUFBRSxDQUFDTyxJQUFILENBQVEsa0JBQVIsQ0FBbEI7QUFDQSxTQUFLRixXQUFMLEdBQWlCTCxFQUFFLENBQUNPLElBQUgsQ0FBUSxnQkFBUixDQUFqQjtBQUNBQyxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLTCxZQUFqQjtBQUNBLEdBWE87QUFZTE0sRUFBQUEsS0FaSyxtQkFZSSxDQUVSLENBZEk7QUFlUkMsRUFBQUEsU0FBUyxFQUFDLHFCQUFVO0FBQ25CSCxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxNQUFaO0FBQ0FULElBQUFBLEVBQUUsQ0FBQ1ksUUFBSCxDQUFZQyxTQUFaLENBQXNCLE1BQXRCO0FBQ0EsR0FsQk87QUFtQlJDLEVBQUFBLFFBQVEsRUFBQyxvQkFBVTtBQUNsQmQsSUFBQUEsRUFBRSxDQUFDZSxJQUFILENBQVFDLEdBQVI7QUFDQVIsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksTUFBWjtBQUNBLEdBdEJPLENBdUJMOztBQXZCSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBjYy5DbGFzczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgIHN0YXJ0R2FtZUJ0bjpudWxsLFxuXHQgICBleGl0R2FtZUJ0bjpudWxsLFxuICAgIH0sXG5cdG9uTG9hZCgpe1xuXHRcdHRoaXMuc3RhcnRHYW1lQnRuPWNjLmZpbmQoJ0NhbnZhcy9zdGFydEdhbWUnKTtcblx0XHR0aGlzLmV4aXRHYW1lQnRuPWNjLmZpbmQoJ0NhbnZhcy9leGl0QnRuJyk7XG5cdFx0Y29uc29sZS5sb2codGhpcy5zdGFydEdhbWVCdG4pO1xuXHR9LFxuICAgIHN0YXJ0ICgpIHtcblxuICAgIH0sXG5cdHN0YXJ0R2FtZTpmdW5jdGlvbigpe1xuXHRcdGNvbnNvbGUubG9nKCflvIDlp4vmuLjmiI8nKTtcblx0XHRjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJnYW1lXCIpO1xuXHR9LFxuXHRleGl0R2FtZTpmdW5jdGlvbigpe1xuXHRcdGNjLmdhbWUuZW5kKCk7XG5cdFx0Y29uc29sZS5sb2coJ+mAgOWHuua4uOaIjycpO1xuXHR9LFxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxufSk7XG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Tips.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9060egENLhOEaz4Ec2U2i28', 'Tips');
// scripts/Tips.js

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
    clock: 90
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    this.node.width = 350;
    this.node.height = 100;
  },
  start: function start() {},
  update: function update(dt) {
    this.clock--;
    this.node.opacity -= 2;
    if (this.clock == 0) this.node.destroy();
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcVGlwcy5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImNsb2NrIiwib25Mb2FkIiwibm9kZSIsIndpZHRoIiwiaGVpZ2h0Iiwic3RhcnQiLCJ1cGRhdGUiLCJkdCIsIm9wYWNpdHkiLCJkZXN0cm95Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsS0FBSyxFQUFDO0FBREUsR0FIUDtBQU9MO0FBRUFDLEVBQUFBLE1BVEssb0JBU0s7QUFDTixTQUFLQyxJQUFMLENBQVVDLEtBQVYsR0FBZ0IsR0FBaEI7QUFDQSxTQUFLRCxJQUFMLENBQVVFLE1BQVYsR0FBaUIsR0FBakI7QUFDSCxHQVpJO0FBY0xDLEVBQUFBLEtBZEssbUJBY0ksQ0FFUixDQWhCSTtBQWtCTEMsRUFBQUEsTUFsQkssa0JBa0JHQyxFQWxCSCxFQWtCTztBQUNSLFNBQUtQLEtBQUw7QUFDQSxTQUFLRSxJQUFMLENBQVVNLE9BQVYsSUFBbUIsQ0FBbkI7QUFDQSxRQUFJLEtBQUtSLEtBQUwsSUFBWSxDQUFoQixFQUNLLEtBQUtFLElBQUwsQ0FBVU8sT0FBVjtBQUNSO0FBdkJJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBjbG9jazo5MCxcclxuICAgIH0sXHJcblxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICB0aGlzLm5vZGUud2lkdGg9MzUwO1xyXG4gICAgICAgIHRoaXMubm9kZS5oZWlnaHQ9MTAwO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydCAoKSB7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGUgKGR0KSB7XHJcbiAgICAgICAgdGhpcy5jbG9jay0tO1xyXG4gICAgICAgIHRoaXMubm9kZS5vcGFjaXR5LT0yO1xyXG4gICAgICAgIGlmICh0aGlzLmNsb2NrPT0wKVxyXG4gICAgICAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcclxuICAgIH0sXHJcbn0pO1xyXG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/tabWin.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6f195TiZgdPzLEHQoxzdiTT', 'tabWin');
// scripts/tabWin.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    tabpersons: null
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    this.node.active = false;
    this.tabpersons = new Array();
    this.tabpersons.push(cc.find("Persons/Person1", this.node));
    this.tabpersons.push(cc.find("Persons/Person2", this.node));
    this.tabpersons.push(cc.find("Persons/Person3", this.node));
    this.tabpersons.push(cc.find("Persons/Person4", this.node));
    console.log(this.tabpersons);
  },
  start: function start() {},
  showTab: function showTab() {
    for (var i = 0; i < window.global.persons.length; i++) {
      var nowTabPerson = window.global.persons[i].getComponent('Person');
      console.log(this.tabpersons[i]);
      if (this.tabpersons[i] == undefined) break;
      this.tabpersons[i].getChildByName("blood").getComponent(cc.Label).string = nowTabPerson.blood;
      this.tabpersons[i].getChildByName("mobility").getComponent(cc.Label).string = nowTabPerson.mobility; //cc.find("Persons/Person"+i,this.node).getChildByName("mobility").getComponent(cc.Label).blood.string= nowTabPerson.property.mobility;
    }
  } // update (dt) {},

});

function XX(realNode, tabNode) {
  this.property = realNode.getComponent('Person');
  this.blood = tabNode.getChildByName("blood").getComponent(cc.Label);
  this.mobility = tabNode.getChildByName("mobility").getComponent(cc.Label);
  return this;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcdGFiV2luLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwidGFicGVyc29ucyIsIm9uTG9hZCIsIm5vZGUiLCJhY3RpdmUiLCJBcnJheSIsInB1c2giLCJmaW5kIiwiY29uc29sZSIsImxvZyIsInN0YXJ0Iiwic2hvd1RhYiIsImkiLCJ3aW5kb3ciLCJnbG9iYWwiLCJwZXJzb25zIiwibGVuZ3RoIiwibm93VGFiUGVyc29uIiwiZ2V0Q29tcG9uZW50IiwidW5kZWZpbmVkIiwiZ2V0Q2hpbGRCeU5hbWUiLCJMYWJlbCIsInN0cmluZyIsImJsb29kIiwibW9iaWxpdHkiLCJYWCIsInJlYWxOb2RlIiwidGFiTm9kZSIsInByb3BlcnR5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUVBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDVEMsSUFBQUEsVUFBVSxFQUFDO0FBREYsR0FIUDtBQU9MO0FBRURDLEVBQUFBLE1BVE0sb0JBU0k7QUFDVCxTQUFLQyxJQUFMLENBQVVDLE1BQVYsR0FBaUIsS0FBakI7QUFDQSxTQUFLSCxVQUFMLEdBQWdCLElBQUlJLEtBQUosRUFBaEI7QUFDQSxTQUFLSixVQUFMLENBQWdCSyxJQUFoQixDQUFxQlQsRUFBRSxDQUFDVSxJQUFILENBQVEsaUJBQVIsRUFBMEIsS0FBS0osSUFBL0IsQ0FBckI7QUFDQSxTQUFLRixVQUFMLENBQWdCSyxJQUFoQixDQUFxQlQsRUFBRSxDQUFDVSxJQUFILENBQVEsaUJBQVIsRUFBMEIsS0FBS0osSUFBL0IsQ0FBckI7QUFDQSxTQUFLRixVQUFMLENBQWdCSyxJQUFoQixDQUFxQlQsRUFBRSxDQUFDVSxJQUFILENBQVEsaUJBQVIsRUFBMEIsS0FBS0osSUFBL0IsQ0FBckI7QUFDQSxTQUFLRixVQUFMLENBQWdCSyxJQUFoQixDQUFxQlQsRUFBRSxDQUFDVSxJQUFILENBQVEsaUJBQVIsRUFBMEIsS0FBS0osSUFBL0IsQ0FBckI7QUFDQUssSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksS0FBS1IsVUFBakI7QUFDQSxHQWpCSztBQW1CTFMsRUFBQUEsS0FuQkssbUJBbUJJLENBR1IsQ0F0Qkk7QUF1QlJDLEVBQUFBLE9BdkJRLHFCQXVCQztBQUNSLFNBQUssSUFBSUMsQ0FBQyxHQUFDLENBQVgsRUFBYUEsQ0FBQyxHQUFDQyxNQUFNLENBQUNDLE1BQVAsQ0FBY0MsT0FBZCxDQUFzQkMsTUFBckMsRUFBNENKLENBQUMsRUFBN0MsRUFBZ0Q7QUFDL0MsVUFBSUssWUFBWSxHQUFDSixNQUFNLENBQUNDLE1BQVAsQ0FBY0MsT0FBZCxDQUFzQkgsQ0FBdEIsRUFBeUJNLFlBQXpCLENBQXNDLFFBQXRDLENBQWpCO0FBQ0FWLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQUtSLFVBQUwsQ0FBZ0JXLENBQWhCLENBQVo7QUFDQSxVQUFJLEtBQUtYLFVBQUwsQ0FBZ0JXLENBQWhCLEtBQW9CTyxTQUF4QixFQUNDO0FBQ0QsV0FBS2xCLFVBQUwsQ0FBZ0JXLENBQWhCLEVBQW1CUSxjQUFuQixDQUFrQyxPQUFsQyxFQUEyQ0YsWUFBM0MsQ0FBd0RyQixFQUFFLENBQUN3QixLQUEzRCxFQUFrRUMsTUFBbEUsR0FBMEVMLFlBQVksQ0FBQ00sS0FBdkY7QUFDQSxXQUFLdEIsVUFBTCxDQUFnQlcsQ0FBaEIsRUFBbUJRLGNBQW5CLENBQWtDLFVBQWxDLEVBQThDRixZQUE5QyxDQUEyRHJCLEVBQUUsQ0FBQ3dCLEtBQTlELEVBQXFFQyxNQUFyRSxHQUE2RUwsWUFBWSxDQUFDTyxRQUExRixDQU4rQyxDQU8vQztBQUNBO0FBQ0QsR0FqQ08sQ0FrQ0w7O0FBbENLLENBQVQ7O0FBc0NBLFNBQVNDLEVBQVQsQ0FBWUMsUUFBWixFQUFxQkMsT0FBckIsRUFBNkI7QUFDNUIsT0FBS0MsUUFBTCxHQUFjRixRQUFRLENBQUNSLFlBQVQsQ0FBc0IsUUFBdEIsQ0FBZDtBQUNBLE9BQUtLLEtBQUwsR0FBV0ksT0FBTyxDQUFDUCxjQUFSLENBQXVCLE9BQXZCLEVBQWdDRixZQUFoQyxDQUE2Q3JCLEVBQUUsQ0FBQ3dCLEtBQWhELENBQVg7QUFDQSxPQUFLRyxRQUFMLEdBQWNHLE9BQU8sQ0FBQ1AsY0FBUixDQUF1QixVQUF2QixFQUFtQ0YsWUFBbkMsQ0FBZ0RyQixFQUFFLENBQUN3QixLQUFuRCxDQUFkO0FBQ0EsU0FBTyxJQUFQO0FBQ0EiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5cclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgIHRhYnBlcnNvbnM6bnVsbCxcclxuICAgIH0sXHJcblxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gICBvbkxvYWQgKCkge1xyXG5cdCAgIHRoaXMubm9kZS5hY3RpdmU9ZmFsc2U7XHJcblx0ICAgdGhpcy50YWJwZXJzb25zPW5ldyBBcnJheSgpO1xyXG5cdCAgIHRoaXMudGFicGVyc29ucy5wdXNoKGNjLmZpbmQoXCJQZXJzb25zL1BlcnNvbjFcIix0aGlzLm5vZGUpKTtcclxuXHQgICB0aGlzLnRhYnBlcnNvbnMucHVzaChjYy5maW5kKFwiUGVyc29ucy9QZXJzb24yXCIsdGhpcy5ub2RlKSk7XHJcblx0ICAgdGhpcy50YWJwZXJzb25zLnB1c2goY2MuZmluZChcIlBlcnNvbnMvUGVyc29uM1wiLHRoaXMubm9kZSkpO1xyXG5cdCAgIHRoaXMudGFicGVyc29ucy5wdXNoKGNjLmZpbmQoXCJQZXJzb25zL1BlcnNvbjRcIix0aGlzLm5vZGUpKTtcclxuXHQgICBjb25zb2xlLmxvZyh0aGlzLnRhYnBlcnNvbnMpO1xyXG4gICB9LFxyXG5cclxuICAgIHN0YXJ0ICgpIHtcclxuXHQgIFxyXG5cdCAgIFxyXG4gICAgfSxcclxuXHRzaG93VGFiKCl7XHJcblx0XHRmb3IgKHZhciBpPTA7aTx3aW5kb3cuZ2xvYmFsLnBlcnNvbnMubGVuZ3RoO2krKyl7XHJcblx0XHRcdHZhciBub3dUYWJQZXJzb249d2luZG93Lmdsb2JhbC5wZXJzb25zW2ldLmdldENvbXBvbmVudCgnUGVyc29uJyk7XHJcblx0XHRcdGNvbnNvbGUubG9nKHRoaXMudGFicGVyc29uc1tpXSk7XHJcblx0XHRcdGlmICh0aGlzLnRhYnBlcnNvbnNbaV09PXVuZGVmaW5lZClcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0dGhpcy50YWJwZXJzb25zW2ldLmdldENoaWxkQnlOYW1lKFwiYmxvb2RcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9IG5vd1RhYlBlcnNvbi5ibG9vZDtcclxuXHRcdFx0dGhpcy50YWJwZXJzb25zW2ldLmdldENoaWxkQnlOYW1lKFwibW9iaWxpdHlcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9IG5vd1RhYlBlcnNvbi5tb2JpbGl0eTtcclxuXHRcdFx0Ly9jYy5maW5kKFwiUGVyc29ucy9QZXJzb25cIitpLHRoaXMubm9kZSkuZ2V0Q2hpbGRCeU5hbWUoXCJtb2JpbGl0eVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLmJsb29kLnN0cmluZz0gbm93VGFiUGVyc29uLnByb3BlcnR5Lm1vYmlsaXR5O1xyXG5cdFx0fVxyXG5cdH0sXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcclxufSk7XHJcblxyXG5cclxuZnVuY3Rpb24gWFgocmVhbE5vZGUsdGFiTm9kZSl7XHJcblx0dGhpcy5wcm9wZXJ0eT1yZWFsTm9kZS5nZXRDb21wb25lbnQoJ1BlcnNvbicpO1xyXG5cdHRoaXMuYmxvb2Q9dGFiTm9kZS5nZXRDaGlsZEJ5TmFtZShcImJsb29kXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcblx0dGhpcy5tb2JpbGl0eT10YWJOb2RlLmdldENoaWxkQnlOYW1lKFwibW9iaWxpdHlcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuXHRyZXR1cm4gdGhpcztcclxufSJdfQ==
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
    isDead: 0,
    //是否已阵亡，0：活着，1：死了
    shield: 0,
    //可免疫一次伤害的护盾，0: 无, 1: 有
    halfShield: 0,
    //可减半一次伤害的护盾，可累积次数
    sight: 2,
    //视野大小，默认值为2
    eyes: null,
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
    // if (this.node.name == 'Person2' || this.node.name == 'Person4')
    // this.avatar.opacity = 0;
    var p = cc.tween(this.avatar);

    for (var i = 0; i < route.length - 1; i++) {
      p.to(0.2, {
        position: cc.v2(route[i].x, route[i].y)
      });
      Positionchecked(route[i].x, route[i].y, this.node);
      var tmp = new Array();
      tmp.push(route[i].getComponent('Cell').mapx);
      tmp.push(route[i].getComponent('Cell').mapy);
      tmp.push(cc.find('Canvas').getComponent('globalGame').nowProperty);
      p.call(function () {
        this[2].posX = this[0];
        this[2].posY = this[1];
      }, tmp);
    }

    p.to(0.2, {
      position: cc.v2(route[route.length - 1].x, route[route.length - 1].y)
    });
    var tmp = new Array();
    tmp.push(route[route.length - 1].getComponent('Cell').mapx);
    tmp.push(route[route.length - 1].getComponent('Cell').mapy);
    tmp.push(cc.find('Canvas').getComponent('globalGame').nowProperty);
    tmp.push(route[route.length - 1]);
    p.call(function () {
      this[2].posX = this[0];
      this[2].posY = this[1];
      this[3].getComponent('Cell').stepOnCell(this[2].node); // if (this[2].node.name == 'Person2' || this[2].node.name == 'Person4')
      // this[2].avatar.opacity = 255;
    }, tmp);
    p.start(); //this.avatar.setPosition(route[route.length-1].getPosition());
  },
  move2Pos: function move2Pos(x, y) {
    this.posX = x;
    this.posY = y; //this.nowPos.y=y;

    var mapObj = cc.find('Canvas/map').getComponent('GetMap');
    var pos = mapObj.map[x][y].getPosition();
    this.avatar.setPosition(pos);
  },
  bindAvatar: function bindAvatar(node) {
    this.avatar = node;
  },
  onLoad: function onLoad() {
    this.cards = new Array();
    this.eyes = new Array();
    window.global.persons.push(this.node);
    console.log(this.name + "onLoad");
  },
  start: function start() {//初始化任务
  },
  update: function update(dt) {}
});

function Positionchecked(x, y, nowPerson) {
  //一次遍历人物列表上位置，检查是否有其他人，有则计算伤害。
  var persons = window.global.persons;

  for (var i = 0; i < persons.length; i++) {
    if (nowPerson != persons[i] && nowPerson.parter != person[i] && x == persons[i].posX && y == persons[i].posY) {
      //计算伤害
      if (persons[i].isDead == 1) //当前位置玩家已死亡,不需要计算伤害
        {
          break;
        }

      var attack = persons[i].attack;

      if (nowPerson.shield == 1) {
        attack = 0;
      } else if (nowPerson.halfShield > 0) {
        nowPerson.halfShield -= 1;
        attack = Math.round(attack / 2); //四舍五入
      }

      nowPerson.blood -= attack;
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcUGVyc29uLmpzIl0sIm5hbWVzIjpbImdsb2JhbCIsInJlcXVpcmUiLCJwZXJzb24iLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIm5pY2tuYW1lIiwiZ2V0IiwiSUQiLCJwb3NpdGlvbiIsImF0dGFjayIsImJsb29kIiwibW9iaWxpdHkiLCJjYXJkcyIsIm15U3RhdHVzIiwidHVybiIsInVzZUNhcmRFbmFibGVkIiwiZ29FbmFibGVkIiwiX2dvRW5hYmxlZCIsImlzRGVhZCIsInNoaWVsZCIsImhhbGZTaGllbGQiLCJzaWdodCIsImV5ZXMiLCJwYXJ0ZXIiLCJhdmF0YXIiLCJwb3NYIiwicG9zWSIsIm1vdmVCeVJvdXRlIiwicm91dGUiLCJwIiwidHdlZW4iLCJpIiwibGVuZ3RoIiwidG8iLCJ2MiIsIngiLCJ5IiwiUG9zaXRpb25jaGVja2VkIiwibm9kZSIsInRtcCIsIkFycmF5IiwicHVzaCIsImdldENvbXBvbmVudCIsIm1hcHgiLCJtYXB5IiwiZmluZCIsIm5vd1Byb3BlcnR5IiwiY2FsbCIsInN0ZXBPbkNlbGwiLCJzdGFydCIsIm1vdmUyUG9zIiwibWFwT2JqIiwicG9zIiwibWFwIiwiZ2V0UG9zaXRpb24iLCJzZXRQb3NpdGlvbiIsImJpbmRBdmF0YXIiLCJvbkxvYWQiLCJ3aW5kb3ciLCJwZXJzb25zIiwiY29uc29sZSIsImxvZyIsIm5hbWUiLCJ1cGRhdGUiLCJkdCIsIm5vd1BlcnNvbiIsIk1hdGgiLCJyb3VuZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJQSxNQUFNLEdBQUNDLE9BQU8sQ0FBQyxZQUFELENBQWxCOztBQUNBLElBQUlDLE1BQU0sR0FBQ0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDaEIsYUFBU0QsRUFBRSxDQUFDRSxTQURJO0FBR2hCQyxFQUFBQSxVQUFVLEVBQUU7QUFDZEMsSUFBQUEs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UCxDQUFjNkQsT0FBMUI7O0FBQ0EsT0FBSyxJQUFJNUIsQ0FBQyxHQUFDLENBQVgsRUFBYUEsQ0FBQyxHQUFDNEIsT0FBTyxDQUFDM0IsTUFBdkIsRUFBOEJELENBQUMsRUFBL0IsRUFBa0M7QUFDakMsUUFBSWtDLFNBQVMsSUFBRU4sT0FBTyxDQUFDNUIsQ0FBRCxDQUFsQixJQUF5QmtDLFNBQVMsQ0FBQzFDLE1BQVYsSUFBa0J2QixNQUFNLENBQUMrQixDQUFELENBQWpELElBQXdESSxDQUFDLElBQUV3QixPQUFPLENBQUM1QixDQUFELENBQVAsQ0FBV04sSUFBdEUsSUFBK0VXLENBQUMsSUFBRXVCLE9BQU8sQ0FBQzVCLENBQUQsQ0FBUCxDQUFXTCxJQUFqRyxFQUFzRztBQUNyRztBQUNBLFVBQUlpQyxPQUFPLENBQUM1QixDQUFELENBQVAsQ0FBV2IsTUFBWCxJQUFtQixDQUF2QixFQUF5QjtBQUN6QjtBQUNDO0FBQ0E7O0FBQ0QsVUFBSVQsTUFBTSxHQUFDa0QsT0FBTyxDQUFDNUIsQ0FBRCxDQUFQLENBQVd0QixNQUF0Qjs7QUFDQSxVQUFJd0QsU0FBUyxDQUFDOUMsTUFBVixJQUFrQixDQUF0QixFQUF3QjtBQUN2QlYsUUFBQUEsTUFBTSxHQUFFLENBQVI7QUFDQSxPQUZELE1BR0ssSUFBSXdELFNBQVMsQ0FBQzdDLFVBQVYsR0FBcUIsQ0FBekIsRUFBMkI7QUFDL0I2QyxRQUFBQSxTQUFTLENBQUM3QyxVQUFWLElBQXNCLENBQXRCO0FBQ0FYLFFBQUFBLE1BQU0sR0FBRXlELElBQUksQ0FBQ0MsS0FBTCxDQUFXMUQsTUFBTSxHQUFDLENBQWxCLENBQVIsQ0FGK0IsQ0FFRjtBQUM3Qjs7QUFDRHdELE1BQUFBLFNBQVMsQ0FBQ3ZELEtBQVYsSUFBaUJELE1BQWpCO0FBQ0E7QUFDRDtBQUNEIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBjYy5DbGFzczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxudmFyIGdsb2JhbD1yZXF1aXJlKCdnbG9iYWxHYW1lJyk7XG52YXIgcGVyc29uPWNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG5cdFx0bmlja25hbWU6IHtcblx0XHRcdGRlZmF1bHQ6bnVsbCxcblx0XHRcdGdldDogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5uaWNrbmFtZTtcblx0XHRcdH0sXG5cdFx0fVx0LFxuXHRcdElEOm51bGwsXG5cdFx0cG9zaXRpb246bnVsbCxcblx0XHRhdHRhY2s6MSxcblx0XHRibG9vZDoxMCwvL+eOqeWutuihgOmHjyzliJ3lp4vkuLoy54K577yM5q+P5Zue5ZCI5oGi5aSNMueCuVxuXHRcdG1vYmlsaXR5OjIsLy/njqnlrrbooYzliqjlgLxcblx0XHRjYXJkczpudWxsLFxuXHRcdG15U3RhdHVzOjEsLy8w5Li65q275Lqh77yMMeS4uuato+W4uFxuXHRcdHR1cm46MSwvL+eOqeWutuWbnuWQiOaVsFxuXHRcdHVzZUNhcmRFbmFibGVkOjEsLy/mmK/lkKbkvb/nlKjljaHniYzvvIwx5Li65Y+v5L2/55So5Y2h54mMXG5cdFx0Z29FbmFibGVkOntcblx0XHRcdGRlZmF1bHQ6MSxcblx0XHRcdGdldDogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5fZ29FbmFibGVkO1xuXHRcdFx0fSxcblx0XHR9LC8v5piv5ZCm5Y+v5Lul6KGM6LWwLDHkuLrlj6/ku6XooYzotbBcblx0XHRpc0RlYWQ6MCwvL+aYr+WQpuW3sumYteS6oe+8jDDvvJrmtLvnnYDvvIwx77ya5q275LqGXG5cdFx0c2hpZWxkOjAsLy/lj6/lhY3nlqvkuIDmrKHkvKTlrrPnmoTmiqTnm77vvIwwOiDml6AsIDE6IOaciVxuXHRcdGhhbGZTaGllbGQ6MCwvL+WPr+WHj+WNiuS4gOasoeS8pOWus+eahOaKpOebvu+8jOWPr+e0r+enr+asoeaVsFxuXHRcdHNpZ2h0OjIsLy/op4bph47lpKflsI/vvIzpu5jorqTlgLzkuLoyXG5cdFx0ZXllczpudWxsLFxuXHRcdHBhcnRlcjpudWxsLFxuXHRcdGF2YXRhcjpudWxsLFxuXHRcdHBvc1g6bnVsbCxcblx0XHRwb3NZOm51bGwsXG4gICAgfSxcblx0bW92ZUJ5Um91dGU6ZnVuY3Rpb24ocm91dGUpe1xuXHRcdC8v5aOw5piO5LiA5Liq5Yqo5L2c5bqP5YiXXG5cdFx0Ly92YXIgcj1bY2MudjIoMTAwLDEwMCksY2MudjIoMTAwLDEwMCksY2MudjIoMTAwLDEwMCksY2MudjIoMTAwLDEwMCldO1xuXHRcdC8vdmFyIGFjdEFycj1uZXcgQXJyYXkoKTtcblx0XHQvL2NvbnNvbGUubG9nKHJvdXRlKTtcblx0XHQvLyBpZiAodGhpcy5ub2RlLm5hbWUgPT0gJ1BlcnNvbjInIHx8IHRoaXMubm9kZS5uYW1lID09ICdQZXJzb240Jylcblx0XHRcdC8vIHRoaXMuYXZhdGFyLm9wYWNpdHkgPSAwO1xuXHRcdHZhciBwPWNjLnR3ZWVuKHRoaXMuYXZhdGFyKTtcblx0XHRmb3IgKHZhciBpPTA7aTxyb3V0ZS5sZW5ndGgtMTtpKyspe1xuXHRcdFx0cC50bygwLjIse3Bvc2l0aW9uOmNjLnYyKHJvdXRlW2ldLngscm91dGVbaV0ueSl9KTtcblx0XHRcdFBvc2l0aW9uY2hlY2tlZChyb3V0ZVtpXS54LHJvdXRlW2ldLnksdGhpcy5ub2RlKTtcblx0XHRcdHZhciB0bXAgPSBuZXcgQXJyYXkoKTtcblx0XHRcdHRtcC5wdXNoKHJvdXRlW2ldLmdldENvbXBvbmVudCgnQ2VsbCcpLm1hcHgpO1xuXHRcdFx0dG1wLnB1c2gocm91dGVbaV0uZ2V0Q29tcG9uZW50KCdDZWxsJykubWFweSk7XG5cdFx0XHR0bXAucHVzaChjYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoJ2dsb2JhbEdhbWUnKS5ub3dQcm9wZXJ0eSk7XG5cdFx0XHRwLmNhbGwoIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR0aGlzWzJdLnBvc1g9dGhpc1swXTtcblx0XHRcdFx0dGhpc1syXS5wb3NZPXRoaXNbMV07XG5cdFx0XHR9LCB0bXApO1xuXHRcdFx0XG5cdFx0fVxuXHRcdHAudG8oMC4yLHtwb3NpdGlvbjpjYy52Mihyb3V0ZVtyb3V0ZS5sZW5ndGgtMV0ueCxyb3V0ZVtyb3V0ZS5sZW5ndGgtMV0ueSl9KTtcblx0XHR2YXIgdG1wID0gbmV3IEFycmF5KCk7XG5cdFx0dG1wLnB1c2gocm91dGVbcm91dGUubGVuZ3RoLTFdLmdldENvbXBvbmVudCgnQ2VsbCcpLm1hcHgpO1xuXHRcdHRtcC5wdXNoKHJvdXRlW3JvdXRlLmxlbmd0aC0xXS5nZXRDb21wb25lbnQoJ0NlbGwnKS5tYXB5KTtcblx0XHR0bXAucHVzaChjYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoJ2dsb2JhbEdhbWUnKS5ub3dQcm9wZXJ0eSk7XG5cdFx0dG1wLnB1c2gocm91dGVbcm91dGUubGVuZ3RoLTFdKTtcblx0XHRwLmNhbGwoZnVuY3Rpb24oKXtcblx0XHRcdHRoaXNbMl0ucG9zWD10aGlzWzBdO1xuXHRcdFx0dGhpc1syXS5wb3NZPXRoaXNbMV07XG5cdFx0XHR0aGlzWzNdLmdldENvbXBvbmVudCgnQ2VsbCcpLnN0ZXBPbkNlbGwodGhpc1syXS5ub2RlKTtcblx0XHRcdFxuXHRcdFx0Ly8gaWYgKHRoaXNbMl0ubm9kZS5uYW1lID09ICdQZXJzb24yJyB8fCB0aGlzWzJdLm5vZGUubmFtZSA9PSAnUGVyc29uNCcpXG5cdFx0XHRcdC8vIHRoaXNbMl0uYXZhdGFyLm9wYWNpdHkgPSAyNTU7XG5cdFx0XHRcblx0XHR9LHRtcCk7XG5cdFx0cC5zdGFydCgpO1xuXHRcdC8vdGhpcy5hdmF0YXIuc2V0UG9zaXRpb24ocm91dGVbcm91dGUubGVuZ3RoLTFdLmdldFBvc2l0aW9uKCkpO1xuXHRcdFxuXHRcdFxuXHRcdFxuXHRcblx0fSxcblx0bW92ZTJQb3M6ZnVuY3Rpb24oeCx5KXtcblx0XHR0aGlzLnBvc1g9eDtcblx0XHR0aGlzLnBvc1k9eTtcblx0XHQvL3RoaXMubm93UG9zLnk9eTtcblx0XHR2YXIgbWFwT2JqPWNjLmZpbmQoJ0NhbnZhcy9tYXAnKS5nZXRDb21wb25lbnQoJ0dldE1hcCcpO1xuXHRcdHZhciBwb3M9bWFwT2JqLm1hcFt4XVt5XS5nZXRQb3NpdGlvbigpO1xuXHRcdHRoaXMuYXZhdGFyLnNldFBvc2l0aW9uKHBvcyk7XG5cdH0sXG5cdGJpbmRBdmF0YXI6ZnVuY3Rpb24obm9kZSl7XG5cdFx0dGhpcy5hdmF0YXI9bm9kZTtcblx0fSxcblx0b25Mb2FkKCl7XHRcblx0XHR0aGlzLmNhcmRzPW5ldyBBcnJheSgpO1xuXHRcdHRoaXMuZXllcz1uZXcgQXJyYXkoKTtcblx0XHR3aW5kb3cuZ2xvYmFsLnBlcnNvbnMucHVzaCh0aGlzLm5vZGUpO1xuXHRcdGNvbnNvbGUubG9nKHRoaXMubmFtZStcIm9uTG9hZFwiKTtcblx0fSxcbiAgICBzdGFydCAoKSB7XG5cdFx0Ly/liJ3lp4vljJbku7vliqFcblx0XHRcbiAgICB9LFxuICAgIHVwZGF0ZSAoZHQpIHtcblx0XHRcblx0XHRcblx0fSxcbn0pO1xuZnVuY3Rpb24gUG9zaXRpb25jaGVja2VkKHgseSxub3dQZXJzb24pe1xuXHQvL+S4gOasoemBjeWOhuS6uueJqeWIl+ihqOS4iuS9jee9ru+8jOajgOafpeaYr+WQpuacieWFtuS7luS6uu+8jOacieWImeiuoeeul+S8pOWus+OAglxuXHR2YXIgcGVyc29ucz13aW5kb3cuZ2xvYmFsLnBlcnNvbnM7XG5cdGZvciAodmFyIGk9MDtpPHBlcnNvbnMubGVuZ3RoO2krKyl7XG5cdFx0aWYgKG5vd1BlcnNvbiE9cGVyc29uc1tpXSAmJiBub3dQZXJzb24ucGFydGVyIT1wZXJzb25baV0gJiYgeD09cGVyc29uc1tpXS5wb3NYICYmICB5PT1wZXJzb25zW2ldLnBvc1kpe1xuXHRcdFx0Ly/orqHnrpfkvKTlrrNcblx0XHRcdGlmIChwZXJzb25zW2ldLmlzRGVhZD09MSkvL+W9k+WJjeS9jee9rueOqeWutuW3suatu+S6oSzkuI3pnIDopoHorqHnrpfkvKTlrrNcblx0XHRcdHtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHR2YXIgYXR0YWNrPXBlcnNvbnNbaV0uYXR0YWNrO1xuXHRcdFx0aWYgKG5vd1BlcnNvbi5zaGllbGQ9PTEpe1xuXHRcdFx0XHRhdHRhY2s9IDA7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmIChub3dQZXJzb24uaGFsZlNoaWVsZD4wKXtcblx0XHRcdFx0bm93UGVyc29uLmhhbGZTaGllbGQtPTE7XG5cdFx0XHRcdGF0dGFjaz0gTWF0aC5yb3VuZChhdHRhY2svMik7Ly/lm5voiI3kupTlhaVcblx0XHRcdH1cblx0XHRcdG5vd1BlcnNvbi5ibG9vZC09YXR0YWNrO1xuXHRcdH1cblx0fVxufSJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/SpriteIndex.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4e961owjCFBq6BbS/xBKJN1', 'SpriteIndex');
// scripts/SpriteIndex.js

"use strict";

cc.Class({
  "extends": cc.Component,
  //编辑器属性，只在编辑状态有效
  editor: CC_EDITOR && {
    requireComponent: cc.Sprite //要求节点必须有cc.Sprite组件

  },
  properties: {
    spriteFrames: [cc.SpriteFrame],
    //定义一个SpriteFrames数组
    _index: 0,
    //以下划线“_”开始的为私用变量
    index: {
      //index属性控制图片切换
      type: cc.Integer,
      //定义属性为整数类型
      //这次没使用notify方式实现属性值的变化监听，改用getter/setter方式
      get: function get() {
        return this._index;
      },
      //为负数退出 
      set: function set(value) {
        if (value < 0) {
          return;
        } //根据spriteFrames组件长度计算this._index


        this._index = value % this.spriteFrames.length; //获取当前节点上的Sprite组件对象

        var sprite = this.node.getComponent(cc.Sprite); //设置Sprite组件的spriteFrame属性，变换图片

        sprite.spriteFrame = this.spriteFrames[this._index];
      }
    }
  },

  /**
  *next方法，调用index++切换图片，
  *可以方便被cc.Button组件的事件调用
  */
  next: function next() {
    this.index = randomNum(0, 5); //调用自身index属性，编号+1
  }
});

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcU3ByaXRlSW5kZXguanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsImVkaXRvciIsIkNDX0VESVRPUiIsInJlcXVpcmVDb21wb25lbnQiLCJTcHJpdGUiLCJwcm9wZXJ0aWVzIiwic3ByaXRlRnJhbWVzIiwiU3ByaXRlRnJhbWUiLCJfaW5kZXgiLCJpbmRleCIsInR5cGUiLCJJbnRlZ2VyIiwiZ2V0Iiwic2V0IiwidmFsdWUiLCJsZW5ndGgiLCJzcHJpdGUiLCJub2RlIiwiZ2V0Q29tcG9uZW50Iiwic3ByaXRlRnJhbWUiLCJuZXh0IiwicmFuZG9tTnVtIiwibWluTnVtIiwibWF4TnVtIiwiYXJndW1lbnRzIiwicGFyc2VJbnQiLCJNYXRoIiwicmFuZG9tIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNOLGFBQVNELEVBQUUsQ0FBQ0UsU0FETjtBQUMrQjtBQUNyQ0MsRUFBQUEsTUFBTSxFQUFFQyxTQUFTLElBQUk7QUFDakJDLElBQUFBLGdCQUFnQixFQUFFTCxFQUFFLENBQUNNLE1BREosQ0FDZ0I7O0FBRGhCLEdBRmY7QUFJREMsRUFBQUEsVUFBVSxFQUFFO0FBQ2JDLElBQUFBLFlBQVksRUFBRSxDQUFDUixFQUFFLENBQUNTLFdBQUosQ0FERDtBQUNvQjtBQUNqQ0MsSUFBQUEsTUFBTSxFQUFFLENBRks7QUFFb0I7QUFFakNDLElBQUFBLEtBQUssRUFBRTtBQUEwQjtBQUM3QkMsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUNhLE9BRE47QUFDMEI7QUFDN0I7QUFDQUMsTUFBQUEsR0FIRyxpQkFHRztBQUNGLGVBQU8sS0FBS0osTUFBWjtBQUNILE9BTEU7QUFNRjtBQUNBSyxNQUFBQSxHQVBFLGVBT0VDLEtBUEYsRUFPUztBQUNSLFlBQUlBLEtBQUssR0FBRyxDQUFaLEVBQWU7QUFDVjtBQUNKLFNBSE8sQ0FJUDs7O0FBQ0QsYUFBS04sTUFBTCxHQUFjTSxLQUFLLEdBQUcsS0FBS1IsWUFBTCxDQUFrQlMsTUFBeEMsQ0FMUSxDQU1QOztBQUNELFlBQUlDLE1BQU0sR0FBRyxLQUFLQyxJQUFMLENBQVVDLFlBQVYsQ0FBdUJwQixFQUFFLENBQUNNLE1BQTFCLENBQWIsQ0FQUSxDQVFQOztBQUNEWSxRQUFBQSxNQUFNLENBQUNHLFdBQVAsR0FBcUIsS0FBS2IsWUFBTCxDQUFrQixLQUFLRSxNQUF2QixDQUFyQjtBQUNIO0FBakJFO0FBSk0sR0FKWDs7QUE0Qk47Ozs7QUFJQVksRUFBQUEsSUFoQ00sa0JBZ0NDO0FBQ0YsU0FBS1gsS0FBTCxHQUFXWSxTQUFTLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FBcEIsQ0FERSxDQUMwQjtBQUNoQztBQWxDSyxDQUFUOztBQXFDQSxTQUFTQSxTQUFULENBQW1CQyxNQUFuQixFQUEwQkMsTUFBMUIsRUFBaUM7QUFDN0IsVUFBT0MsU0FBUyxDQUFDVCxNQUFqQjtBQUNJLFNBQUssQ0FBTDtBQUNJLGFBQU9VLFFBQVEsQ0FBQ0MsSUFBSSxDQUFDQyxNQUFMLEtBQWNMLE1BQWQsR0FBcUIsQ0FBdEIsRUFBd0IsRUFBeEIsQ0FBZjtBQUNKOztBQUNBLFNBQUssQ0FBTDtBQUNJLGFBQU9HLFFBQVEsQ0FBQ0MsSUFBSSxDQUFDQyxNQUFMLE1BQWVKLE1BQU0sR0FBQ0QsTUFBUCxHQUFjLENBQTdCLElBQWdDQSxNQUFqQyxFQUF3QyxFQUF4QyxDQUFmO0FBQ0o7O0FBQ0k7QUFDSSxhQUFPLENBQVA7QUFDSjtBQVRSO0FBV0giLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNjLkNsYXNzKHtcclxuICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LCAgICAgICAgICAgICAgIC8v57yW6L6R5Zmo5bGe5oCn77yM5Y+q5Zyo57yW6L6R54q25oCB5pyJ5pWIXHJcbiAgIGVkaXRvcjogQ0NfRURJVE9SICYmIHtcclxuICAgICAgIHJlcXVpcmVDb21wb25lbnQ6IGNjLlNwcml0ZSwgICAgIC8v6KaB5rGC6IqC54K55b+F6aG75pyJY2MuU3ByaXRl57uE5Lu2XHJcbiAgIH0sICAgcHJvcGVydGllczoge1xyXG4gICAgICAgc3ByaXRlRnJhbWVzOiBbY2MuU3ByaXRlRnJhbWVdLCAgLy/lrprkuYnkuIDkuKpTcHJpdGVGcmFtZXPmlbDnu4RcclxuICAgICAgIF9pbmRleDogMCwgICAgICAgICAgICAgICAgICAgICAgIC8v5Lul5LiL5YiS57q/4oCcX+KAneW8gOWni+eahOS4uuengeeUqOWPmOmHj1xyXG5cdFx0XHJcbiAgICAgICBpbmRleDogeyAgICAgICAgICAgICAgICAgICAgICAgICAvL2luZGV45bGe5oCn5o6n5Yi25Zu+54mH5YiH5o2iXHJcbiAgICAgICAgICAgdHlwZTogY2MuSW50ZWdlciwgICAgICAgICAgICAvL+WumuS5ieWxnuaAp+S4uuaVtOaVsOexu+Wei1xyXG4gICAgICAgICAgIC8v6L+Z5qyh5rKh5L2/55Sobm90aWZ55pa55byP5a6e546w5bGe5oCn5YC855qE5Y+Y5YyW55uR5ZCs77yM5pS555SoZ2V0dGVyL3NldHRlcuaWueW8j1xyXG4gICAgICAgICAgIGdldCgpIHsgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICByZXR1cm4gdGhpcy5faW5kZXg7XHJcbiAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy/kuLrotJ/mlbDpgIDlh7ogXHJcbiAgICAgICAgICAgIHNldCh2YWx1ZSkgeyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgaWYgKHZhbHVlIDwgMCkgeyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy/moLnmja5zcHJpdGVGcmFtZXPnu4Tku7bplb/luqborqHnrpd0aGlzLl9pbmRleFxyXG4gICAgICAgICAgICAgICB0aGlzLl9pbmRleCA9IHZhbHVlICUgdGhpcy5zcHJpdGVGcmFtZXMubGVuZ3RoOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8v6I635Y+W5b2T5YmN6IqC54K55LiK55qEU3ByaXRl57uE5Lu25a+56LGhXHJcbiAgICAgICAgICAgICAgIGxldCBzcHJpdGUgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy/orr7nva5TcHJpdGXnu4Tku7bnmoRzcHJpdGVGcmFtZeWxnuaAp++8jOWPmOaNouWbvueJh1xyXG4gICAgICAgICAgICAgICBzcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLnNwcml0ZUZyYW1lc1t0aGlzLl9pbmRleF07XHJcbiAgICAgICAgICAgfSxcclxuICAgICAgIH1cclxuICAgfSwgICAgXHJcbiAgIC8qKlxyXG4gICAqbmV4dOaWueazle+8jOiwg+eUqGluZGV4KyvliIfmjaLlm77niYfvvIxcclxuICAgKuWPr+S7peaWueS+v+iiq2NjLkJ1dHRvbue7hOS7tueahOS6i+S7tuiwg+eUqFxyXG4gICAqL1xyXG4gICBuZXh0KCkgeyAgICAgICAgXHJcbiAgICAgICAgdGhpcy5pbmRleD1yYW5kb21OdW0oMCwgNSk7IC8v6LCD55So6Ieq6LqraW5kZXjlsZ7mgKfvvIznvJblj7crMVxyXG4gICB9XHJcbiAgIFxyXG59KTtcclxuZnVuY3Rpb24gcmFuZG9tTnVtKG1pbk51bSxtYXhOdW0peyBcclxuICAgIHN3aXRjaChhcmd1bWVudHMubGVuZ3RoKXsgXHJcbiAgICAgICAgY2FzZSAxOiBcclxuICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KE1hdGgucmFuZG9tKCkqbWluTnVtKzEsMTApOyBcclxuICAgICAgICBicmVhazsgXHJcbiAgICAgICAgY2FzZSAyOiBcclxuICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KE1hdGgucmFuZG9tKCkqKG1heE51bS1taW5OdW0rMSkrbWluTnVtLDEwKTsgXHJcbiAgICAgICAgYnJlYWs7IFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBcclxuICAgICAgICAgICAgICAgIHJldHVybiAwOyBcclxuICAgICAgICAgICAgYnJlYWs7IFxyXG4gICAgfSBcclxufSAiXX0=
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
    btnOk: null,
    //确认按钮
    framesIndex: null,
    count: 0,
    callback: null
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    this.title = this.node.getChildByName('title');
    this.content = this.node.getChildByName('content');
    this.btnOk = this.node.getChildByName('okBtn');
    this.node.active = false;
    this.framesIndex = this.node.getChildByName('dice').getComponent('SpriteIndex');
  },
  start: function start() {},
  hiddenMyself: function hiddenMyself() {
    this.node.active = false;
    cc.game.emit('roll-dice-done', this.framesIndex.index + 1);
  },
  startRollDice: function startRollDice() {
    this.node.active = true;
    this.framesIndex.schedule(function () {
      this.next();
    }, 0.05, 20, 0);
  } //update (dt) {},

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcdGlwV2luZG93LmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwidGl0bGUiLCJjb250ZW50IiwiYnRuT2siLCJmcmFtZXNJbmRleCIsImNvdW50IiwiY2FsbGJhY2siLCJvbkxvYWQiLCJub2RlIiwiZ2V0Q2hpbGRCeU5hbWUiLCJhY3RpdmUiLCJnZXRDb21wb25lbnQiLCJzdGFydCIsImhpZGRlbk15c2VsZiIsImdhbWUiLCJlbWl0IiwiaW5kZXgiLCJzdGFydFJvbGxEaWNlIiwic2NoZWR1bGUiLCJuZXh0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsS0FBSyxFQUFDLElBREU7QUFFZEMsSUFBQUEsT0FBTyxFQUFDLElBRk07QUFFRDtBQUNiQyxJQUFBQSxLQUFLLEVBQUMsSUFIUTtBQUdIO0FBQ1hDLElBQUFBLFdBQVcsRUFBQyxJQUpFO0FBS2RDLElBQUFBLEtBQUssRUFBQyxDQUxRO0FBTWRDLElBQUFBLFFBQVEsRUFBQztBQU5LLEdBSFA7QUFZTDtBQUVBQyxFQUFBQSxNQWRLLG9CQWNLO0FBQ1osU0FBS04sS0FBTCxHQUFXLEtBQUtPLElBQUwsQ0FBVUMsY0FBVixDQUF5QixPQUF6QixDQUFYO0FBQ0EsU0FBS1AsT0FBTCxHQUFhLEtBQUtNLElBQUwsQ0FBVUMsY0FBVixDQUF5QixTQUF6QixDQUFiO0FBQ0EsU0FBS04sS0FBTCxHQUFXLEtBQUtLLElBQUwsQ0FBVUMsY0FBVixDQUF5QixPQUF6QixDQUFYO0FBQ0EsU0FBS0QsSUFBTCxDQUFVRSxNQUFWLEdBQW1CLEtBQW5CO0FBQ0EsU0FBS04sV0FBTCxHQUFpQixLQUFLSSxJQUFMLENBQVVDLGNBQVYsQ0FBeUIsTUFBekIsRUFBaUNFLFlBQWpDLENBQThDLGFBQTlDLENBQWpCO0FBRUEsR0FyQk87QUF1QkxDLEVBQUFBLEtBdkJLLG1CQXVCSSxDQUdSLENBMUJJO0FBMkJSQyxFQUFBQSxZQUFZLEVBQUMsd0JBQVU7QUFFdEIsU0FBS0wsSUFBTCxDQUFVRSxNQUFWLEdBQWlCLEtBQWpCO0FBQ0FiLElBQUFBLEVBQUUsQ0FBQ2lCLElBQUgsQ0FBUUMsSUFBUixDQUFhLGdCQUFiLEVBQThCLEtBQUtYLFdBQUwsQ0FBaUJZLEtBQWpCLEdBQXVCLENBQXJEO0FBQ0EsR0EvQk87QUFnQ1JDLEVBQUFBLGFBQWEsRUFBRSx5QkFBVTtBQUN2QixTQUFLVCxJQUFMLENBQVVFLE1BQVYsR0FBa0IsSUFBbEI7QUFDQSxTQUFLTixXQUFMLENBQWlCYyxRQUFqQixDQUEwQixZQUFVO0FBQ2xDLFdBQUtDLElBQUw7QUFDRCxLQUZELEVBRUUsSUFGRixFQUVPLEVBRlAsRUFFVSxDQUZWO0FBR0QsR0FyQ08sQ0FzQ0w7O0FBdENLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHRpdGxlOm51bGwsXG5cdFx0Y29udGVudDpudWxsLC8v5YaF5a65XG5cdFx0YnRuT2s6bnVsbCwvL+ehruiupOaMiemSrlxuXHRcdGZyYW1lc0luZGV4Om51bGwsXG5cdFx0Y291bnQ6MCxcblx0XHRjYWxsYmFjazpudWxsLFxuICAgIH0sXG5cbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcblxuICAgIG9uTG9hZCAoKSB7XG5cdFx0dGhpcy50aXRsZT10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3RpdGxlJyk7XG5cdFx0dGhpcy5jb250ZW50PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnY29udGVudCcpO1xuXHRcdHRoaXMuYnRuT2s9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdva0J0bicpO1xuXHRcdHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcblx0XHR0aGlzLmZyYW1lc0luZGV4PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnZGljZScpLmdldENvbXBvbmVudCgnU3ByaXRlSW5kZXgnKTtcblx0XHRcblx0fSxcblxuICAgIHN0YXJ0ICgpIHtcblx0XHRcblx0XHRcbiAgICB9LFxuXHRoaWRkZW5NeXNlbGY6ZnVuY3Rpb24oKXtcblx0XHRcblx0XHR0aGlzLm5vZGUuYWN0aXZlPWZhbHNlO1xuXHRcdGNjLmdhbWUuZW1pdCgncm9sbC1kaWNlLWRvbmUnLHRoaXMuZnJhbWVzSW5kZXguaW5kZXgrMSk7XG5cdH0sXG5cdHN0YXJ0Um9sbERpY2U6IGZ1bmN0aW9uKCl7XG5cdFx0XHR0aGlzLm5vZGUuYWN0aXZlID10cnVlO1xuXHRcdFx0dGhpcy5mcmFtZXNJbmRleC5zY2hlZHVsZShmdW5jdGlvbigpe1xuXHRcdFx0XHQgdGhpcy5uZXh0KCk7XG5cdFx0XHR9LDAuMDUsMjAsMCk7XG5cdH0sXG4gICAgLy91cGRhdGUgKGR0KSB7fSxcbn0pO1xuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Buff.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5b078iGJZFN2pS2davkQtPP', 'Buff');
// scripts/Buff.js

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
    todoList: null
    /*
        endTurn:int,    //最后一个生效的回合
        person:cc.node  //person
        act:function
    */

  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    this.todoList = new Array();
  },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcQnVmZi5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInRvZG9MaXN0Iiwib25Mb2FkIiwiQXJyYXkiLCJzdGFydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFFBQVEsRUFBQztBQUNUOzs7Ozs7QUFGUSxHQUhQO0FBWUw7QUFFQUMsRUFBQUEsTUFkSyxvQkFjSztBQUNOLFNBQUtELFFBQUwsR0FBYyxJQUFJRSxLQUFKLEVBQWQ7QUFDSCxHQWhCSTtBQWtCTEMsRUFBQUEsS0FsQkssbUJBa0JJLENBQ1IsQ0FuQkksQ0FxQkw7O0FBckJLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICB0b2RvTGlzdDpudWxsLFxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgICAgIGVuZFR1cm46aW50LCAgICAvL+acgOWQjuS4gOS4queUn+aViOeahOWbnuWQiFxyXG4gICAgICAgICAgICBwZXJzb246Y2Mubm9kZSAgLy9wZXJzb25cclxuICAgICAgICAgICAgYWN0OmZ1bmN0aW9uXHJcbiAgICAgICAgKi9cclxuICAgIH0sXHJcblxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICB0aGlzLnRvZG9MaXN0PW5ldyBBcnJheSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydCAoKSB7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxyXG59KTtcclxuIl19
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
    adj: null,
    //存边，adj[i][j]是一个数组，数组中每个是与map[i][j]相连的map坐标
    signal: null
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
  BfsDis: function BfsDis(sx, sy) {
    var dis = new Array();

    for (var i = 0; i < 11; i++) {
      dis[i] = new Array();

      for (var j = 0; j < 11; j++) {
        dis[i][j] = -1;
      }
    }

    q = [];
    q.push([sx, sy]);
    dis[sx][sy] = 0;

    while (q.length != 0) {
      var f = q[0];
      q.shift();
      var x = f[0],
          y = f[1];

      for (var i = 0; i < this.adj[x][y].length; i++) {
        var nx = this.adj[x][y][i][0],
            ny = this.adj[x][y][i][1];
        if (dis[nx][ny] != -1) continue;
        dis[nx][ny] = dis[x][y] + 1;
        q.push([nx, ny]);
      }
    }

    return dis;
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

    var mist = cc.find('Canvas/mist').getComponent('Mist'); //关闭所有节点的监听

    for (var i = 0; i < 11; i++) {
      for (var j = 0; j < 11; j++) {
        if (par.map[i][j] == null) continue;
        var cell_js = par.map[i][j].getComponent("Cell");

        if (cell_js.inMonitor == 1) {
          cell_js.inMonitor = 0;
          cell_js.resetColor();
          cell_js.routeId = null;
          par.map[i][j].off("mousedown", this.chooseRoute, cell_js);
          mist.mistArr[i][j].color = cc.color(255, 255, 255, 255);
        }
      }
    }
    /*
    发送事件
    */


    cc.game.emit('route-chosen', route);
  },
  FX: function FX() {
    //这里面的this是cell
    console.log(this.getComponent('Cell').mapx, this.getComponent('Cell').mapy);
    var map = cc.find('Canvas/map').getComponent('GetMap');
    cc.game.emit(this.parent.getComponent('GetMap').signal, this.getComponent('Cell').mapx, this.getComponent('Cell').mapy);

    for (var i = 0; i < 11; i++) {
      for (var j = 0; j < 11; j++) {
        if (map.map[i][j] == null) continue;
        map.map[i][j].off('mousedown', map.FX, map.map[i][j]);
      }
    }
  },
  openAllMonitor: function openAllMonitor(sig) {
    this.signal = sig;

    for (var i = 0; i < 11; i++) {
      for (var j = 0; j < 11; j++) {
        if (this.map[i][j] == null) continue;
        this.map[i][j].on('mousedown', this.FX, this.map[i][j]);
      }
    }
  },
  openMonitor: function openMonitor(routes) {
    //对每条路径的终点开启监听
    var mist = cc.find('Canvas/mist').getComponent('Mist');

    for (var i = 0; i < routes.length; i++) {
      var cell = routes[i][routes[i].length - 1];
      var cell_js = cell.getComponent("Cell");
      cell_js.inMonitor = 1;
      cell_js.setColor();
      cell_js.routeId = i;
      cell.on("mousedown", this.chooseRoute, cell_js);
      mist.mistArr[cell_js.mapx][cell_js.mapy].color = cc.color(102, 255, 102, 255);
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

    if (cc.find('Canvas').getComponent('globalGame').nowPlayer.name == 'Person1') this.openMonitor(routes); //对每条路径的终点开启监听
    else cc.find('Canvas').getComponent('AI').aiMove(routes);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcR2V0TWFwLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiYmFzZXgiLCJiYXNleSIsInN0ZXB4Iiwic3RlcHkiLCJyb3V0ZXMiLCJjZWxsIiwidHlwZSIsIlByZWZhYiIsIm1hcCIsImFkaiIsInNpZ25hbCIsIkdldENlbGwiLCJtYXBfbWF0cml4IiwiQXJyYXkiLCJpIiwiaiIsIm5ld2NlbGwiLCJpbnN0YW50aWF0ZSIsInBhcmVudCIsIm5vZGUiLCJzZXRQb3NpdGlvbiIsImNlbGxfanMiLCJnZXRDb21wb25lbnQiLCJtYXB4IiwibWFweSIsImtpbmQiLCJwIiwiTWF0aCIsInJhbmRvbSIsIkdldEVkZ2UiLCJlZGdlIiwibGVuZ3RoIiwicHVzaCIsIkJmc0RpcyIsInN4Iiwic3kiLCJkaXMiLCJxIiwiZiIsInNoaWZ0IiwieCIsInkiLCJueCIsIm55IiwiRGZzRm9yUm91dGUiLCJub3dwb3MiLCJudW0iLCJ2aXMiLCJyb3V0ZSIsIm5ld3JvdXRlIiwicG9wIiwiY2hvb3NlUm91dGUiLCJwYXIiLCJyb3V0ZUlkIiwibWlzdCIsImZpbmQiLCJpbk1vbml0b3IiLCJyZXNldENvbG9yIiwib2ZmIiwibWlzdEFyciIsImNvbG9yIiwiZ2FtZSIsImVtaXQiLCJGWCIsImNvbnNvbGUiLCJsb2ciLCJvcGVuQWxsTW9uaXRvciIsInNpZyIsIm9uIiwib3Blbk1vbml0b3IiLCJzZXRDb2xvciIsInBvc0VuYWJsZSIsIm5vd1BsYXllciIsIm5hbWUiLCJhaU1vdmUiLCJvbkxvYWQiLCJzdGFydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ2RDLElBQUFBLEtBQUssRUFBRSxDQURPO0FB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Q2tELFNBQTdDLENBQXVEQyxJQUF2RCxJQUErRCxTQUFuRSxFQUNDLEtBQUtKLFdBQUwsQ0FBaUJqRSxNQUFqQixFQURELENBQzJCO0FBRDNCLFNBR0NSLEVBQUUsQ0FBQzJELElBQUgsQ0FBUSxRQUFSLEVBQWtCakMsWUFBbEIsQ0FBK0IsSUFBL0IsRUFBcUNvRCxNQUFyQyxDQUE0Q3RFLE1BQTVDO0FBQ0QsV0FBT0EsTUFBUDtBQUNBLEdBbFBPO0FBb1BMdUUsRUFBQUEsTUFwUEssb0JBb1BLO0FBQ1osU0FBS2hFLE9BQUwsR0FEWSxDQUNJOztBQUNoQixTQUFLa0IsT0FBTCxHQUZZLENBRUk7O0FBQ2hCbUMsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksS0FBS1EsSUFBTCxHQUFVLFFBQXRCO0FBQ0EsR0F4UE87QUEwUExHLEVBQUFBLEtBMVBLLG1CQTBQSSxDQUVYO0FBR0csR0EvUEksQ0FpUUw7O0FBalFLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG5cdFx0YmFzZXg6IDAsXG5cdFx0YmFzZXk6IDAsXG5cdFx0c3RlcHg6IDAsXG5cdFx0c3RlcHk6IDAsXG5cdFx0cm91dGVzOiBudWxsLCAvL+aaguWtmOiuoeeul+WHuuadpeeahOWkmuadoei3r+W+hFxuXHRcdGNlbGw6IHtcblx0XHRcdGRlZmF1bHQ6IG51bGwsXG5cdFx0XHR0eXBlOiBjYy5QcmVmYWIsXG5cdFx0fSxcblx0XHRtYXA6IG51bGwsIC8v5LqM57u05Zyw5Zu+XG5cdFx0YWRqOiBudWxsLCAvL+WtmOi+ue+8jGFkaltpXVtqXeaYr+S4gOS4quaVsOe7hO+8jOaVsOe7hOS4reavj+S4quaYr+S4jm1hcFtpXVtqXeebuOi/nueahG1hcOWdkOagh1xuXHRcdHNpZ25hbDogbnVsbCxcbiAgICB9LFxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuXHRHZXRDZWxsOiBmdW5jdGlvbigpIHtcblx0XHR2YXIgbWFwX21hdHJpeCA9IFtcblx0XHRcdFsxLDEsMSwxLDEsMSwxLDEsMSwxLDFdLFxuXHRcdFx0WzEsMSwwLDAsMCwxLDAsMCwwLDEsMV0sXG5cdFx0XHRbMSwwLDEsMCwwLDEsMCwwLDEsMCwxXSxcblx0XHRcdFsxLDAsMCwxLDEsMCwxLDEsMCwwLDFdLFxuXHRcdFx0WzEsMCwwLDEsMCwwLDAsMSwwLDAsMV0sXG5cdFx0XHRbMSwxLDEsMSwxLDEsMSwxLDEsMSwxXSxcblx0XHRcdFsxLDAsMCwxLDAsMCwwLDEsMCwwLDFdLFxuXHRcdFx0WzEsMCwwLDEsMSwwLDEsMSwwLDAsMV0sXG5cdFx0XHRbMSwwLDEsMCwwLDEsMCwwLDEsMCwxXSxcblx0XHRcdFsxLDEsMCwwLDAsMSwwLDAsMCwxLDFdLFxuXHRcdFx0WzEsMSwxLDEsMSwxLDEsMSwxLDEsMV0sXG5cdFx0XTtcblx0XHR0aGlzLm1hcCA9IG5ldyBBcnJheSgpO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgMTE7IGkrKykge1xuXHRcdFx0dGhpcy5tYXBbaV0gPSBuZXcgQXJyYXkoKTtcblx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgMTE7IGorKykge1xuXHRcdFx0XHR0aGlzLm1hcFtpXVtqXSA9IG51bGw7XG5cdFx0XHRcdGlmIChtYXBfbWF0cml4W2ldW2pdID09IDEpIHtcblx0XHRcdFx0XHR2YXIgbmV3Y2VsbCA9IGNjLmluc3RhbnRpYXRlKHRoaXMuY2VsbCk7XG5cdFx0XHRcdFx0bmV3Y2VsbC5wYXJlbnQgPSB0aGlzLm5vZGU7IC8v5bCGY2VsbOiKgueCueWKoOWIsG1hcOiKgueCueS5i+S4i1xuXHRcdFx0XHRcdG5ld2NlbGwuc2V0UG9zaXRpb24odGhpcy5iYXNleCt0aGlzLnN0ZXB4KmksIHRoaXMuYmFzZXkrdGhpcy5zdGVweSpqKTtcblx0XHRcdFx0XHR0aGlzLm1hcFtpXVtqXSA9IG5ld2NlbGw7XG5cdFx0XHRcdFx0dmFyIGNlbGxfanMgPSB0aGlzLm1hcFtpXVtqXS5nZXRDb21wb25lbnQoXCJDZWxsXCIpO1xuXHRcdFx0XHRcdGNlbGxfanMubWFweCA9IGk7XG5cdFx0XHRcdFx0Y2VsbF9qcy5tYXB5ID0gajtcblx0XHRcdFx0XHQvL+S7peamgueOh+aWueW8j+maj+acuueUn+aIkOagvOWtkOexu+Wei1xuXHRcdFx0XHRcdGlmICgoaT09MCYmaj09MCkgfHwgKGk9PTAmJmo9PTEwKSB8fCAoaT09MTAmJmo9PTApIHx8IChpPT0xMCYmaj09MTApKSB7XG5cdFx0XHRcdFx0XHRjZWxsX2pzLmtpbmQgPSAwO1xuXHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHZhciBwID0gTWF0aC5yYW5kb20oKTtcblx0XHRcdFx0XHRpZiAocCA8IDAuNClcblx0XHRcdFx0XHRcdGNlbGxfanMua2luZCA9IDA7IC8v56m655m95qC8XG5cdFx0XHRcdFx0ZWxzZSBpZiAocCA8IDAuNylcblx0XHRcdFx0XHRcdGNlbGxfanMua2luZCA9IDE7IC8v5Y2h54mM5qC8XG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0Y2VsbF9qcy5raW5kID0gMjsgLy/kuovku7bmoLxcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0XG5cdEdldEVkZ2U6IGZ1bmN0aW9uKCkge1xuXHRcdHRoaXMuYWRqID0gbmV3IEFycmF5KCk7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAxMTsgaSsrKSB7XG5cdFx0XHR0aGlzLmFkaltpXSA9IG5ldyBBcnJheSgpO1xuXHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCAxMTsgaisrKSB7XG5cdFx0XHRcdFx0dGhpcy5hZGpbaV1bal0gPSBuZXcgQXJyYXkoKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0Ly/mr4/kuIDkuKrlm5vlhYPmlbDnu4TooajnpLrvvJrlnZDmoIcoYVswXSxhWzFdKeeahGNlbGzlkozlnZDmoIcoYVsyXSxhWzNdKeeahGNlbGzkuYvpl7TmnInmnaHovrlcblx0XHR2YXIgZWRnZSA9IFtcblx0XHRcdFswLDAsMCwxXSxbMCwxLDAsMl0sWzAsMiwwLDNdLFswLDMsMCw0XSxbMCw0LDAsNV0sXG5cdFx0XHRbMCw1LDAsNl0sWzAsNiwwLDddLFswLDcsMCw4XSxbMCw4LDAsOV0sWzAsOSwwLDEwXSxcblx0XHRcdFswLDAsMSwwXSxbMCwwLDEsMV0sWzAsNSwxLDVdLFswLDEwLDEsOV0sWzAsMTAsMSwxMF0sXG5cdFx0XHRbMSwwLDIsMF0sWzEsMSwyLDJdLFsxLDUsMiw1XSxbMSw5LDIsOF0sWzEsMTAsMiwxMF0sXG5cdFx0XHRbMiwwLDMsMF0sWzIsMiwzLDNdLFsyLDUsMyw0XSxbMiw1LDMsNl0sWzIsOCwzLDddLFsyLDEwLDMsMTBdLFxuXHRcdFx0WzMsMywzLDRdLFszLDYsMyw3XSxcblx0XHRcdFszLDAsNCwwXSxbMywzLDQsM10sWzMsNyw0LDddLFszLDEwLDQsMTBdLFxuXHRcdFx0WzQsMCw1LDBdLFs0LDMsNSwyXSxbNCw3LDUsOF0sWzQsMTAsNSwxMF0sXG5cdFx0XHRbNSwwLDUsMV0sWzUsMSw1LDJdLFs1LDIsNSwzXSxbNSwzLDUsNF0sWzUsNCw1LDVdLFxuXHRcdFx0WzUsNSw1LDZdLFs1LDYsNSw3XSxbNSw3LDUsOF0sWzUsOCw1LDldLFs1LDksNSwxMF0sXG5cdFx0XHRbNSwwLDYsMF0sWzUsMiw2LDNdLFs1LDgsNiw3XSxbNSwxMCw2LDEwXSxcblx0XHRcdFs2LDAsNywwXSxbNiwzLDcsM10sWzYsNyw3LDddLFs2LDEwLDcsMTBdLFxuXHRcdFx0WzcsMyw3LDRdLFs3LDYsNyw3XSxcblx0XHRcdFs3LDAsOCwwXSxbNywzLDgsMl0sWzcsNCw4LDVdLFs3LDYsOCw1XSxbNyw3LDgsOF0sWzcsMTAsOCwxMF0sXG5cdFx0XHRbOCwwLDksMF0sWzgsMiw5LDFdLFs4LDUsOSw1XSxbOCw4LDksOV0sWzgsMTAsOSwxMF0sXG5cdFx0XHRbOSwwLDEwLDBdLFs5LDEsMTAsMF0sWzksNSwxMCw1XSxbOSw5LDEwLDEwXSxbOSwxMCwxMCwxMF0sXG5cdFx0XHRbMTAsMCwxMCwxXSxbMTAsMSwxMCwyXSxbMTAsMiwxMCwzXSxbMTAsMywxMCw0XSxbMTAsNCwxMCw1XSxcblx0XHRcdFsxMCw1LDEwLDZdLFsxMCw2LDEwLDddLFsxMCw3LDEwLDhdLFsxMCw4LDEwLDldLFsxMCw5LDEwLDEwXVxuXHRcdF07XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBlZGdlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR0aGlzLmFkaltlZGdlW2ldWzBdXVtlZGdlW2ldWzFdXS5wdXNoKFtlZGdlW2ldWzJdLCBlZGdlW2ldWzNdXSk7XG5cdFx0XHR0aGlzLmFkaltlZGdlW2ldWzJdXVtlZGdlW2ldWzNdXS5wdXNoKFtlZGdlW2ldWzBdLCBlZGdlW2ldWzFdXSk7XG5cdFx0fVxuXHR9LFxuXHRcblx0QmZzRGlzOiBmdW5jdGlvbihzeCwgc3kpIHtcblx0XHR2YXIgZGlzID0gbmV3IEFycmF5KCk7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAxMTsgaSsrKSB7XG5cdFx0XHRkaXNbaV0gPSBuZXcgQXJyYXkoKTtcblx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgMTE7IGorKylcblx0XHRcdFx0ZGlzW2ldW2pdID0gLTE7XG5cdFx0fVxuXHRcdHEgPSBbXTtcblx0XHRxLnB1c2goW3N4LCBzeV0pO1xuXHRcdGRpc1tzeF1bc3ldID0gMDtcblx0XHR3aGlsZSAocS5sZW5ndGggIT0gMCkge1xuXHRcdFx0dmFyIGYgPSBxWzBdO1xuXHRcdFx0cS5zaGlmdCgpO1xuXHRcdFx0dmFyIHggPSBmWzBdLCB5ID0gZlsxXTtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5hZGpbeF1beV0ubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0dmFyIG54ID0gdGhpcy5hZGpbeF1beV1baV1bMF0sIG55ID0gdGhpcy5hZGpbeF1beV1baV1bMV07XG5cdFx0XHRcdGlmIChkaXNbbnhdW255XSAhPSAtMSlcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0ZGlzW254XVtueV0gPSBkaXNbeF1beV0rMTtcblx0XHRcdFx0cS5wdXNoKFtueCwgbnldKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGRpcztcblx0fSxcblx0XG5cdERmc0ZvclJvdXRlOiBmdW5jdGlvbihub3dwb3MsIG51bSwgdmlzLCByb3V0ZXMsIHJvdXRlKSB7XG5cdFx0Lypcblx0XHRcdG5vd3Bvc+S4uuW9k+WJjeaQnOe0ouWIsOeahGNlbGzvvIxudW3kuLrliankvZnmraXmlbBcblx0XHRcdHJvdXRlczrot6/lvoTpm4blkIjvvIxyb3V0ZTrlvZPliY3miYDlnKjnmoTkuIDmnaHot6/lvoRcblx0XHQqL1xuXHRcdHZhciBjZWxsX2pzID0gbm93cG9zLmdldENvbXBvbmVudChcIkNlbGxcIik7IC8v6I635b6XY2VsbOiKgueCueeahGpz57uE5Lu277yM5Lul5L6/6I635b6X57uE5Lu25Lit55qE5bGe5oCnXG5cdFx0dmFyIHggPSBjZWxsX2pzLm1hcHgsIHkgPSBjZWxsX2pzLm1hcHk7XG5cdFx0aWYgKHZpc1t4XVt5XSA9PSAxKVxuXHRcdFx0cmV0dXJuO1xuXHRcdHZpc1t4XVt5XSA9IDE7XG5cdFx0cm91dGUucHVzaChub3dwb3MpO1xuXHRcdGlmIChudW0gPT0gMCkge1xuXHRcdFx0dmFyIG5ld3JvdXRlID0gW107XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHJvdXRlLmxlbmd0aDsgaSsrKVxuXHRcdFx0XHRuZXdyb3V0ZS5wdXNoKHJvdXRlW2ldKTtcblx0XHRcdHJvdXRlcy5wdXNoKG5ld3JvdXRlKTtcblx0XHRcdHJvdXRlLnBvcCgpO1xuXHRcdFx0dmlzW3hdW3ldID0gMDtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmFkalt4XVt5XS5sZW5ndGg7IGkrKykge1xuXHRcdFx0dGhpcy5EZnNGb3JSb3V0ZSh0aGlzLm1hcFt0aGlzLmFkalt4XVt5XVtpXVswXV1bdGhpcy5hZGpbeF1beV1baV1bMV1dLCBudW0tMSwgdmlzLCByb3V0ZXMsIHJvdXRlKTtcblx0XHR9XG5cdFx0cm91dGUucG9wKCk7XG5cdFx0dmlzW3hdW3ldID0gMDtcblx0fSxcblx0XG5cdGNob29zZVJvdXRlOiBmdW5jdGlvbigpIHtcblx0XHQvL+atpOWHveaVsOS4i+eahHRoaXPmmK9jZWxsLmpzXG5cdFx0dmFyIHBhciA9IHRoaXMubm9kZS5wYXJlbnQuZ2V0Q29tcG9uZW50KFwiR2V0TWFwXCIpO1xuXHRcdHZhciByb3V0ZSA9IHBhci5yb3V0ZXNbdGhpcy5yb3V0ZUlkXTtcblx0XHRcblx0XHQvKlxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgcm91dGUubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBjZWxsX2pzID0gcm91dGVbaV0uZ2V0Q29tcG9uZW50KFwiQ2VsbFwiKTtcblx0XHRcdGNvbnNvbGUubG9nKGNlbGxfanMubWFweCwgY2VsbF9qcy5tYXB5KTtcblx0XHR9XG5cdFx0Ki9cblx0XHRcblx0XHR2YXIgbWlzdCA9IGNjLmZpbmQoJ0NhbnZhcy9taXN0JykuZ2V0Q29tcG9uZW50KCdNaXN0Jyk7XG5cdFx0Ly/lhbPpl63miYDmnInoioLngrnnmoTnm5HlkKxcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IDExOyBpKyspIHtcblx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgMTE7IGorKykge1xuXHRcdFx0XHRpZiAocGFyLm1hcFtpXVtqXSA9PSBudWxsKVxuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR2YXIgY2VsbF9qcyA9IHBhci5tYXBbaV1bal0uZ2V0Q29tcG9uZW50KFwiQ2VsbFwiKTtcblx0XHRcdFx0aWYgKGNlbGxfanMuaW5Nb25pdG9yID09IDEpIHtcblx0XHRcdFx0XHRjZWxsX2pzLmluTW9uaXRvciA9IDA7XG5cdFx0XHRcdFx0Y2VsbF9qcy5yZXNldENvbG9yKCk7XG5cdFx0XHRcdFx0Y2VsbF9qcy5yb3V0ZUlkID0gbnVsbDtcblx0XHRcdFx0XHRwYXIubWFwW2ldW2pdLm9mZihcIm1vdXNlZG93blwiLCB0aGlzLmNob29zZVJvdXRlLCBjZWxsX2pzKTtcblx0XHRcdFx0XHRtaXN0Lm1pc3RBcnJbaV1bal0uY29sb3IgPSBjYy5jb2xvcigyNTUsIDI1NSwgMjU1LCAyNTUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdFxuXHRcdC8qXG5cdFx05Y+R6YCB5LqL5Lu2XG5cdFx0Ki9cblx0XHRjYy5nYW1lLmVtaXQoJ3JvdXRlLWNob3NlbicsIHJvdXRlKTtcblx0fSxcblx0Rlg6IGZ1bmN0aW9uKCkge1xuXHRcdC8v6L+Z6YeM6Z2i55qEdGhpc+aYr2NlbGxcblx0XHRjb25zb2xlLmxvZyh0aGlzLmdldENvbXBvbmVudCgnQ2VsbCcpLm1hcHgsIHRoaXMuZ2V0Q29tcG9uZW50KCdDZWxsJykubWFweSk7XG5cdFx0dmFyIG1hcCA9IGNjLmZpbmQoJ0NhbnZhcy9tYXAnKS5nZXRDb21wb25lbnQoJ0dldE1hcCcpO1xuXHRcdGNjLmdhbWUuZW1pdCh0aGlzLnBhcmVudC5nZXRDb21wb25lbnQoJ0dldE1hcCcpLnNpZ25hbCwgdGhpcy5nZXRDb21wb25lbnQoJ0NlbGwnKS5tYXB4LCB0aGlzLmdldENvbXBvbmVudCgnQ2VsbCcpLm1hcHkpO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgMTE7IGkrKykge1xuXHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCAxMTsgaisrKSB7XG5cdFx0XHRcdGlmIChtYXAubWFwW2ldW2pdID09IG51bGwpXG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdG1hcC5tYXBbaV1bal0ub2ZmKCdtb3VzZWRvd24nLCBtYXAuRlgsIG1hcC5tYXBbaV1bal0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0XG5cdG9wZW5BbGxNb25pdG9yOiBmdW5jdGlvbihzaWcpIHtcblx0XHR0aGlzLnNpZ25hbD1zaWc7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAxMTsgaSsrKSB7XG5cdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IDExOyBqKyspIHtcblx0XHRcdFx0aWYgKHRoaXMubWFwW2ldW2pdID09IG51bGwpXG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdHRoaXMubWFwW2ldW2pdLm9uKCdtb3VzZWRvd24nLCB0aGlzLkZYLCB0aGlzLm1hcFtpXVtqXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXHRcblx0b3Blbk1vbml0b3I6IGZ1bmN0aW9uKHJvdXRlcykge1xuXHRcdC8v5a+55q+P5p2h6Lev5b6E55qE57uI54K55byA5ZCv55uR5ZCsXG5cdFx0dmFyIG1pc3QgPSBjYy5maW5kKCdDYW52YXMvbWlzdCcpLmdldENvbXBvbmVudCgnTWlzdCcpO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgcm91dGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgY2VsbCA9IHJvdXRlc1tpXVtyb3V0ZXNbaV0ubGVuZ3RoLTFdO1xuXHRcdFx0dmFyIGNlbGxfanMgPSBjZWxsLmdldENvbXBvbmVudChcIkNlbGxcIik7XG5cdFx0XHRjZWxsX2pzLmluTW9uaXRvciA9IDE7XG5cdFx0XHRjZWxsX2pzLnNldENvbG9yKCk7XG5cdFx0XHRjZWxsX2pzLnJvdXRlSWQgPSBpO1xuXHRcdFx0Y2VsbC5vbihcIm1vdXNlZG93blwiLCB0aGlzLmNob29zZVJvdXRlLCBjZWxsX2pzKTtcblx0XHRcdG1pc3QubWlzdEFycltjZWxsX2pzLm1hcHhdW2NlbGxfanMubWFweV0uY29sb3IgPSBjYy5jb2xvcigxMDIsMjU1LDEwMiwyNTUpO1xuXHRcdH1cblx0fSxcblx0XG5cdFxuXHRcblx0cG9zRW5hYmxlOiBmdW5jdGlvbihub3dwb3MsIG51bSkge1xuXHRcdC8vbm93cG9z5Li6Y2VsbOexu+Wei+eahG5vZGUsIG51beS4uuWPr+enu+WKqOatpeaVsFxuXHRcdC8v6L+U5Zue5LqM57u05pWw57uE77yM56ys5LqM57u05bqm55qE5pWw57uE5piv55Sx6Iul5bmyY2VsbOexu+Wei+eahG5vZGXnu4TmiJBcblx0XHR2YXIgdmlzID0gW107IC8v5qCH6K6w5piv5ZCm57uP6L+HXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAxMTsgaSsrKSB7XG5cdFx0XHR2aXNbaV0gPSBbXTtcblx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgMTE7IGorKykge1xuXHRcdFx0XHR2aXNbaV1bal0gPSAwO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR2YXIgcm91dGVzID0gW107XG5cdFx0dGhpcy5EZnNGb3JSb3V0ZShub3dwb3MsIG51bSwgdmlzLCByb3V0ZXMsIFtdKTsgLy/mkJzntKLot6/lvoRcblx0XHR0aGlzLnJvdXRlcyA9IHJvdXRlczsgLy/lsIblvpfliLDnmoTlpJrmnaHot6/lvoTkv53lrZhcblx0XHRpZiAoY2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdnbG9iYWxHYW1lJykubm93UGxheWVyLm5hbWUgPT0gJ1BlcnNvbjEnKVxuXHRcdFx0dGhpcy5vcGVuTW9uaXRvcihyb3V0ZXMpOyAvL+Wvueavj+adoei3r+W+hOeahOe7iOeCueW8gOWQr+ebkeWQrFxuXHRcdGVsc2Vcblx0XHRcdGNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudCgnQUknKS5haU1vdmUocm91dGVzKTtcblx0XHRyZXR1cm4gcm91dGVzO1xuXHR9LFxuXHRcbiAgICBvbkxvYWQgKCkge1xuXHRcdHRoaXMuR2V0Q2VsbCgpOyAvL+aehOW7umNlbGznn6npmLXljbNtYXBcblx0XHR0aGlzLkdldEVkZ2UoKTsgLy/lu7rovrlcblx0XHRjb25zb2xlLmxvZyh0aGlzLm5hbWUrXCJvbkxvYWRcIik7XG5cdH0sXG5cbiAgICBzdGFydCAoKSB7XG5cdFx0XG5cdFx0Ly90aGlzLnBvc0VuYWJsZSh0aGlzLm1hcFswXVswXSwgNSk7XG5cdFx0XG5cdFx0XG4gICAgfSxcblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxufSk7XG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cbiJdfQ==
//------QC-SOURCE-SPLIT------
