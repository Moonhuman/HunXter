
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
require('./assets/scripts/Buff');
require('./assets/scripts/Card');
require('./assets/scripts/Cell');
require('./assets/scripts/Deck');
require('./assets/scripts/GetMap');
require('./assets/scripts/Person');
require('./assets/scripts/SpriteIndex');
require('./assets/scripts/Tips');
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
  },
  updateUI: function updateUI() {//更新人物血量
  },
  onLoad: function onLoad() {
    //加载地图
    this.nowStep = 0;
    this.msgContent = cc.find('Canvas/msgBox/view/content/item'); //console.log(msgContent.getComponent(cc.Label));

    cc.game.on('send-Msg', function (event, poster) {
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
          } //this.node.emit('send-Msg','进入回合'+window.global.nowTurn,'系统');
          //console.log(this.nowPlayer.name);


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
            tip.getComponent('tipWindow').startRollDice();
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
            var btn = cc.find('Canvas/end_card_btn');
            btn.active = true;
          } else {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2xvYmFsR2FtZS5qcyJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJnbG9iYWwiLCJwZXJzb25zIiwibm93VHVybiIsImlzT3ZlciIsImNhcmRub2RlIiwiYmdtIiwiYXVkaW8iLCJsb29wIiwidm9sdW1lIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJtYXBPYmoiLCJpbmRleCIsIm5vd1N0ZXAiLCJub3dQbGF5ZXIiLCJub3dQcm9wZXJ0eSIsImlzV2FpdCIsIm1zZ0JveENvbmVudCIsInRpbWUiLCJlbmRfY2FyZF9idG5fZnVuYyIsImdhbWUiLCJlbWl0IiwiZmluZCIsImFjdGl2ZSIsInVwZGF0ZVVJIiwib25Mb2FkIiwibXNnQ29udGVudCIsIm9uIiwiZXZlbnQiLCJwb3N0ZXIiLCJ0aW1lU3RyIiwicGFyc2VJbnQiLCJuYW1lIiwiZ2V0Q29tcG9uZW50IiwiUmljaFRleHQiLCJzdHJpbmciLCJoZWlnaHQiLCJTY3JvbGxWaWV3Iiwic2Nyb2xsVG9Cb3R0b20iLCJtc2ciLCJjb25zb2xlIiwibG9nIiwibmlja25hbWUiLCJyb3V0ZSIsIm1vdmVCeVJvdXRlIiwic3RlcCIsInBvc0VuYWJsZSIsIm1hcCIsInBvc1giLCJwb3NZIiwiSW5pdGlhbENhcmQiLCJpbml0QmdtIiwiTGFiZWwiLCJzY2hlZHVsZSIsInN0YXJ0IiwiaW5pdFBlcnNvbnMiLCJ1cGRhdGUiLCJkdCIsImdvRW5hYmxlZCIsInRpcCIsInN0YXJ0Um9sbERpY2UiLCJ1c2VDYXJkRW5hYmxlZCIsImJ0biIsInR1cm4iLCJiaW5kQXZhdGFyIiwibW92ZTJQb3MiLCJpIiwibGVuZ3RoIiwibm93UGVyc29uIiwiY3R4IiwiR3JhcGhpY3MiLCJjbGVhciIsInN0cm9rZUNvbG9yIiwiQ29sb3IiLCJSRUQiLCJtb3ZlVG8iLCJsaW5lV2lkdGgiLCJsaW5lVG8iLCJzdHJva2UiLCJ0ZXh0IiwiZm9udFNpemUiLCJzZXRQb3NpdGlvbiIsIkdSRUVOIiwibG9hZGVyIiwibG9hZFJlcyIsIkF1ZGlvQ2xpcCIsImVyciIsImNsaXAiLCJhdWRpb0lEIiwiYXVkaW9FbmdpbmUiLCJwbGF5IiwiY2FyZE5hbWUiLCJ0b3RDYXJkTnVtIiwiQXJyYXkiLCJub2RlIiwiTm9kZSIsImFkZENvbXBvbmVudCIsIlNwcml0ZSIsIlNwcml0ZUZyYW1lIiwic3ByaXRlRnJhbWUiLCJiaW5kIiwicHVzaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsTUFBTSxDQUFDQyxNQUFQLEdBQWM7QUFDYkMsRUFBQUEsT0FBTyxFQUFDLEVBREs7QUFFYkMsRUFBQUEsT0FBTyxFQUFDLENBRks7QUFFSDtBQUNWQyxFQUFBQSxNQUFNLEVBQUMsS0FITTtBQUliQyxFQUFBQSxRQUFRLEVBQUcsSUFKRTtBQUtiQyxFQUFBQSxHQUFHLEVBQUM7QUFDSEMsSUFBQUEsS0FBSyxFQUFDLElBREg7QUFFSEMsSUFBQUEsSUFBSSxFQUFDLElBRkY7QUFHSEMsSUFBQUEsTUFBTSxFQUFDO0FBSEo7QUFMUyxDQUFkO0FBV0FDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNkQyxJQUFBQSxNQUFNLEVBQUMsSUFETztBQUNGO0FBQ1paLElBQUFBLE9BQU8sRUFBQyxJQUZNO0FBRUQ7QUFDYmEsSUFBQUEsS0FBSyxFQUFDLENBSFE7QUFJZEMsSUFBQUEsT0FBTyxFQUFDLENBSk07QUFLZEMsSUFBQUEsU0FBUyxFQUFDLElBTEk7QUFNZEMsSUFBQUEsV0FBVyxFQUFDLElBTkU7QUFPZEMsSUFBQUEsTUFBTSxFQUFDLEtBUE87QUFRZEMsSUFBQUEsWUFBWSxFQUFDLElBUkM7QUFTZEMsSUFBQUEsSUFBSSxFQUFDO0FBVFMsR0FIUDtBQWVSQyxFQUFBQSxpQkFBaUIsRUFBQyw2QkFBVztBQUM1QlosSUFBQUEsRUFBRSxDQUFDYSxJQUFILENBQVFDLElBQVIsQ0FBYSxjQUFiLEVBQTZCLEdBQTdCO0FB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RSxhQUFLbEUsWUFBTCxDQUFrQjFCLEVBQUUsQ0FBQzBGLE1BQXJCLEVBQTZCRSxXQUE3QixHQUEyQ0EsV0FBM0M7QUFDTixPQUZtRCxDQUVsREMsSUFGa0QsQ0FFN0NOLElBRjZDLENBQXZEO0FBR0FqRyxNQUFBQSxNQUFNLENBQUNDLE1BQVAsQ0FBY0ksUUFBZCxDQUF1Qm1HLElBQXZCLENBQTRCUCxJQUE1QjtBQUNBLEtBZHNCLENBZXZCOzs7QUFDQXZGLElBQUFBLEVBQUUsQ0FBQ2UsSUFBSCxDQUFRLHFCQUFSLEVBQStCQyxNQUEvQixHQUF3QyxLQUF4QyxDQWhCdUIsQ0FpQnZCOztBQUNBaEIsSUFBQUEsRUFBRSxDQUFDZSxJQUFILENBQVEsNEJBQVIsRUFBc0NDLE1BQXRDLEdBQTZDLEtBQTdDLENBbEJ1QixDQW1CdkI7O0FBQ0FoQixJQUFBQSxFQUFFLENBQUNlLElBQUgsQ0FBUSwyQkFBUixFQUFxQ0MsTUFBckMsR0FBNEMsS0FBNUMsQ0FwQnVCLENBcUJ2Qjs7QUFDQSxTQUFLNEIsT0FBTDtBQUNBO0FBeFBPLENBQVQsR0E0UEEiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIndpbmRvdy5nbG9iYWw9e1xuXHRwZXJzb25zOltdLFxuXHRub3dUdXJuOjAsLy/lvZPliY3lm57lkIjmlbBcblx0aXNPdmVyOmZhbHNlLFxuXHRjYXJkbm9kZSA6IG51bGwsXG5cdGJnbTp7XG5cdFx0YXVkaW86bnVsbCxcblx0XHRsb29wOm51bGwsXG5cdFx0dm9sdW1lOm51bGwsXG5cdH1cbn07XG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuXHRcdG1hcE9iajpudWxsLC8v5Zyw5Zu+5a+56LGhXG5cdFx0cGVyc29uczpudWxsLC8v546p5a625LusXG5cdFx0aW5kZXg6MCxcblx0XHRub3dTdGVwOjAsXG5cdFx0bm93UGxheWVyOm51bGwsXG5cdFx0bm93UHJvcGVydHk6bnVsbCxcblx0XHRpc1dhaXQ6ZmFsc2UsXG5cdFx0bXNnQm94Q29uZW50Om51bGwsXG5cdFx0dGltZTowLFxuICAgIH0sXG5cdFxuXHRlbmRfY2FyZF9idG5fZnVuYzpmdW5jdGlvbigpIHtcblx0XHRjYy5nYW1lLmVtaXQoJ3VwZGF0ZS1zdGF0ZScsICcxJyk7XG5cdFx0Y2MuZmluZChcIkNhbnZhcy9lbmRfY2FyZF9idG5cIikuYWN0aXZlID0gZmFsc2U7XG5cdH0sXG5cdFxuICAgIHVwZGF0ZVVJOmZ1bmN0aW9uKCl7XG5cdFx0Ly/mm7TmlrDkurrnianooYDph49cblx0fSxcblxuICAgIG9uTG9hZCAoKSB7XG5cdFx0Ly/liqDovb3lnLDlm75cblx0XHR0aGlzLm5vd1N0ZXA9MDtcblx0XHR0aGlzLm1zZ0NvbnRlbnQ9Y2MuZmluZCgnQ2FudmFzL21zZ0JveC92aWV3L2NvbnRlbnQvaXRlbScpO1xuXHRcdC8vY29uc29sZS5sb2cobXNnQ29udGVudC5nZXRDb21wb25lbnQoY2MuTGFiZWwpKTtcblx0XHRjYy5nYW1lLm9uKCdzZW5kLU1zZycsZnVuY3Rpb24oZXZlbnQscG9zdGVyKXtcblx0XHRcdHZhciB0aW1lU3RyPScnO1xuXHRcdFx0aWYgKHBhcnNlSW50KHRoaXMudGltZS82MCk8MTApXG5cdFx0XHRcdHRpbWVTdHIrPVwiMFwiXG5cdFx0XHR0aW1lU3RyKz1wYXJzZUludCh0aGlzLnRpbWUvNjApK1wiOlwiO1xuXHRcdFx0aWYgKHRoaXMudGltZS1wYXJzZUludCh0aGlzLnRpbWUvNjApKjYwPDEwKVxuXHRcdFx0XHR0aW1lU3RyKz1cIjBcIlxuXHRcdFx0dGltZVN0cis9KHRoaXMudGltZS1wYXJzZUludCh0aGlzLnRpbWUvNjApKjYwKTtcblx0XHRcdFxuXHRcdFx0dmFyIG5hbWU9Jzxjb2xvcj0jNDNDRDgwPignK3RpbWVTdHIrJyknK3Bvc3RlcisnPC9jb2xvcj4nOztcblx0XHRcdGlmIChwb3N0ZXI9PSfns7vnu58nKXtcblx0XHRcdFx0bmFtZT0nPGNvbG9yPSNmZjAwMDA+KCcrdGltZVN0cisnKScrcG9zdGVyKyc8L2NvbG9yPic7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLm1zZ0NvbnRlbnQuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmcrPW5hbWUrXCI6IFwiK2V2ZW50Kyc8YnIvPic7XG5cdFx0XHQvL+WPr+iDvemcgOimgeWKqOaAgeaUueWPmGNvbnRlbnTlpKflsI9cblx0XHRcdFxuXHRcdFx0Y2MuZmluZCgnQ2FudmFzL21zZ0JveC92aWV3L2NvbnRlbnQnKS5oZWlnaHQ9dGhpcy5tc2dDb250ZW50LmhlaWdodCsxMDtcblx0XHRcdGNjLmZpbmQoJ0NhbnZhcy9tc2dCb3gnKS5nZXRDb21wb25lbnQoY2MuU2Nyb2xsVmlldykuc2Nyb2xsVG9Cb3R0b20oMC4xKTtcblx0XHRcdC8vY29uc29sZS5sb2coJ0xhYmVsJyx0aGlzLm1zZ0NvbnRlbnQuaGVpZ2h0KTtcblx0XHRcdCBcblx0XHR9LHRoaXMpO1xuXHRcdFx0XG5cdFx0Y2MuZ2FtZS5vbigndXBkYXRlLXN0YXRlJywgZnVuY3Rpb24gKG1zZykge1xuXHRcdFx0dGhpcy5ub3dTdGVwPSh0aGlzLm5vd1N0ZXArMSklNTtcblx0XHRcdHRoaXMuaXNXYWl0PWZhbHNlO1xuXHRcdFx0XG5cdFx0fSx0aGlzKTtcblx0XHRjYy5nYW1lLm9uKCdzdGVwT25DZWxsLWRvbmUnLCBmdW5jdGlvbiAoIGV2ZW50ICkgey8v6Kem5Y+R57uT5p2fXG5cdFx0XHRjYy5nYW1lLmVtaXQoJ3VwZGF0ZS1zdGF0ZScsICcxJyk7Ly/mm7TmlrDnirbmgIFcblx0XHRcdGNvbnNvbGUubG9nKGV2ZW50KTtcblx0XHRcdGNjLmdhbWUuZW1pdCgnc2VuZC1Nc2cnLGV2ZW50LHRoaXMubm93UHJvcGVydHkubmlja25hbWUpO1xuXHRcdH0sdGhpcyk7XG5cdFx0Y2MuZ2FtZS5vbigncm91dGUtY2hvc2VuJywgZnVuY3Rpb24ocm91dGUpIHsvL+ebkeWQrOeOqeWutumAieaLqeS6huWTquadoei3r+W+hFxuXHRcdFx0XHRcdC8vY29uc29sZS5sb2coJ+eCueWHu+S6hicscm91dGUpO1xuXHRcdFx0dGhpcy5ub3dQcm9wZXJ0eS5tb3ZlQnlSb3V0ZShyb3V0ZSk7XG5cdFx0XHRcdFx0Ly90aGlzLm5vZGUuZW1pdCgndXBkYXRlLXN0YXRlJywgJzEnKTsvL+eOqeWutuenu+WKqOWujOaIkO+8jOi/m+WFpeS4i+S4gOatpeaTjeS9nFxuXHRcdFx0XHRcdC8v546p5a625aS05YOP5oyJ54Wn6Lev5b6E56e75YqoXG5cdFx0fSx0aGlzKTtcblx0XHRjYy5nYW1lLm9uKCdyb2xsLWRpY2UtZG9uZScsZnVuY3Rpb24oc3RlcCl7XG5cdFx0XHRjYy5nYW1lLmVtaXQoJ3NlbmQtTXNnJyxcIuiOt+W+l+mqsOWtkOeCueaVsFwiK3N0ZXAsdGhpcy5ub3dQcm9wZXJ0eS5uaWNrbmFtZSk7XG5cdFx0XHRjb25zb2xlLmxvZyh0aGlzLm1hcE9iai5wb3NFbmFibGUodGhpcy5tYXBPYmoubWFwW3RoaXMubm93UHJvcGVydHkucG9zWF1bdGhpcy5ub3dQcm9wZXJ0eS5wb3NZXSxzdGVwKSk7XG5cdFx0fSx0aGlzKTtcblx0XHR0aGlzLkluaXRpYWxDYXJkKCk7XG5cdFx0dGhpcy5pbml0QmdtKCk7XG5cdFx0Y2MuZmluZCgnQ2FudmFzL3RpbWUnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnNjaGVkdWxlKGZ1bmN0aW9uKCkge1xuXHRcdFx0XG5cdFx0XHRjYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoJ2dsb2JhbEdhbWUnKS50aW1lKz0xO1xuXHRcdFx0dmFyIHRpbWU9Y2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdnbG9iYWxHYW1lJykudGltZTtcblx0XHRcdC8vY29uc29sZS5sb2codGltZSk7XG5cdFx0XHR0aGlzLnN0cmluZz1cIlRpbWU6IFwiXG5cdFx0XHRpZiAocGFyc2VJbnQodGltZS82MCk8MTApXG5cdFx0XHRcdHRoaXMuc3RyaW5nKz1cIjBcIlxuXHRcdFx0dGhpcy5zdHJpbmcrPXBhcnNlSW50KHRpbWUvNjApK1wiOlwiO1xuXHRcdFx0aWYgKHRpbWUtcGFyc2VJbnQodGltZS82MCkqNjA8MTApXG5cdFx0XHRcdHRoaXMuc3RyaW5nKz1cIjBcIlxuXHRcdFx0dGhpcy5zdHJpbmcrPSh0aW1lLXBhcnNlSW50KHRpbWUvNjApKjYwKTtcblx0XHRcdC8vY2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdnbG9iYWxHYW1lJykudGltZVN0cj10aGlzLnN0cmluZztcblx0XHQgfSwgMSk7XG5cdFx0IGNjLmdhbWUuZW1pdCgnc2VuZC1Nc2cnLCflpb3miI/lvIDlnLrkuoYhJywn57O757ufJyk7XG5cdH0sXG5cdFxuICAgIHN0YXJ0ICgpIHtcblx0XHQvL+WIneWni+WMluS6uueJqVxuXHRcdHRoaXMuaW5pdFBlcnNvbnMoKTtcblx0XHQvL+iOt+W+l+WcsOWbvuWvueixoVxuXHRcdHRoaXMubWFwT2JqPWNjLmZpbmQoJ0NhbnZhcy9tYXAnKS5nZXRDb21wb25lbnQoJ0dldE1hcCcpO1xuXHRcblx0XHR0aGlzLm5vd1BsYXllcj13aW5kb3cuZ2xvYmFsLnBlcnNvbnNbdGhpcy5pbmRleF07XG5cdFx0XG5cdFx0XG5cdFx0XG4gICAgfSxcblxuICAgIHVwZGF0ZSAoZHQpIHtcblx0XHQvL+WIpOaWreW9k+WJjeWbnuWQiOaYr+WQpue7k+adn1xuXHRcdFxuXHRcdGNvbnNvbGUubG9nKFwi5piv5ZCm562J5b6F5pON5L2cXCIsdGhpcy5pc1dhaXQpO1xuXHRcdHN3aXRjaCAodGhpcy5ub3dTdGVwKXtcblx0XHRcdGNhc2UgMDp7Ly/liJ3lp4vljJblj5jph49cblx0XHRcdFx0aWYgKHRoaXMuaXNXYWl0KXsvL+ato+WcqOaTjeS9nOaIluetieW+heaTjeS9nFxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHRcdC8vdGhpcy5ub2RlLmVtaXQoJ3NlbmQtTXNnJywn6L+b5YWl5Zue5ZCIJyt3aW5kb3cuZ2xvYmFsLm5vd1R1cm4sJ+ezu+e7nycpO1xuXHRcdFx0XHQvL2NvbnNvbGUubG9nKHRoaXMubm93UGxheWVyLm5hbWUpO1xuXHRcdFx0XHR0aGlzLm5vd1Byb3BlcnR5PXRoaXMubm93UGxheWVyLmdldENvbXBvbmVudCgnUGVyc29uJyk7Ly/ojrflvpfnjqnlrrblsZ7mgKfpm4blkIhcblx0XHRcdFx0Y2MuZ2FtZS5lbWl0KCdzZW5kLU1zZycsJ+i9ruWIsOinkuiJsicrdGhpcy5ub3dQcm9wZXJ0eS5uaWNrbmFtZSwn57O757ufJyk7XG5cdFx0XHRcdGNjLmdhbWUuZW1pdCgndXBkYXRlLXN0YXRlJywgJzEnKTtcblx0XHRcdFx0XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0Y2FzZSAxOnsvL+eOqeWutuenu+WKqFxuXHRcdFx0XHRpZiAodGhpcy5pc1dhaXQpey8v5q2j5Zyo5pON5L2c5oiW562J5b6F5pON5L2cXG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHRcdFxuXHRcdFx0XHRpZiAodGhpcy5ub3dQcm9wZXJ0eS5nb0VuYWJsZWQpey8v5Yik5pat546p5a625piv5ZCm5Y+v5Lul6KGM6LWwXG5cdFx0XHRcdFx0dmFyIHRpcD1jYy5maW5kKCdDYW52YXMvdGlwV2luJyk7XG5cdFx0XHRcdFx0dGlwLmdldENvbXBvbmVudCgndGlwV2luZG93Jykuc3RhcnRSb2xsRGljZSgpO1xuXHRcdFx0XHRcdHRoaXMuaXNXYWl0PXRydWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZXtcblx0XHRcdFx0XHR0aGlzLm5vd1Byb3BlcnR5LmdvRW5hYmxlZD0xO1xuXHRcdFx0XHRcdGNjLmdhbWUuZW1pdCgndXBkYXRlLXN0YXRlJywgJzEnKTtcblx0XHRcdFx0fVxuXHRcdFx0XHQgYnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRjYXNlIDI6e1xuXHRcdFx0XHQvL+WujOaIkOS6huS6i+S7tuinpuWPkeaIluiAheWNoeeJjOinpuWPkVxuXHRcdFx0XHRpZiAodGhpcy5pc1dhaXQpey8v5q2j5Zyo5pON5L2c5oiW562J5b6F5pON5L2cXG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y29uc29sZS5sb2coXCLlvZPliY3mraXpqqTvvJpcIix0aGlzLm5vd1N0ZXApO1xuXHRcdFx0XHRjb25zb2xlLmxvZyhcIueOqeWutuWHuueJjFwiKTtcblx0XHRcdFx0Y2MuZ2FtZS5lbWl0KCd1cGRhdGUtc3RhdGUnLCAnMScpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGNhc2UgMzoge1xuXHRcdFx0XHQvL+etieW+heeOqeWutuWHuueJjOW5tue7k+adn1xuXHRcdFx0XHRpZiAodGhpcy5ub3dQcm9wZXJ0eS51c2VDYXJkRW5hYmxlZCA9PSAxKSB7XG5cdFx0XHRcdFx0Ly/lj6/ku6Xlh7rniYxcblx0XHRcdFx0XHR2YXIgYnRuID0gY2MuZmluZCgnQ2FudmFzL2VuZF9jYXJkX2J0bicpO1xuXHRcdFx0XHRcdGJ0bi5hY3RpdmUgPSB0cnVlO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdGNjLmdhbWUuZW1pdCgndXBkYXRlLXN0YXRlJywgJzEnKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGNhc2UgNDp7IC8v6L+Z6YeM5Y6f5pys5pivY2FzZTozXG5cdFx0XHRcdC8vY29uc29sZS5sb2coXCLlvZPliY3mraXpqqTvvJpcIix0aGlzLm5vd1N0ZXApO1xuXHRcdFx0XHQvL+W9k+WJjeeOqeWutueahOWbnuWQiOaVsC0xXG5cdFx0XHRcdHRoaXMubm93UHJvcGVydHkudHVybi09MTtcblx0XHRcdFx0aWYgKHRoaXMubm93UHJvcGVydHkudHVybj09MCkvL+W9k+WJjeeOqeWutuWbnuWQiOaVsOS4ujDvvIzlupTor6XliIfmjaLnjqnlrrZcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwi5YiH5o2i6KeS6ImyXCIpO1xuXHRcdFx0XHRcdHRoaXMubm93UHJvcGVydHkudHVybis9MTtcblx0XHRcdFx0XHR0aGlzLmluZGV4PSh0aGlzLmluZGV4KzEpJTQ7XG5cdFx0XHRcdFx0dGhpcy5ub3dQbGF5ZXI9d2luZG93Lmdsb2JhbC5wZXJzb25zW3RoaXMuaW5kZXhdO1xuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0XHRjYy5nYW1lLmVtaXQoJ3VwZGF0ZS1zdGF0ZScsICcxJyk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRcblx0fSxcblx0aW5pdFBlcnNvbnM6ZnVuY3Rpb24oKXtcblx0XHR3aW5kb3cuZ2xvYmFsLnBlcnNvbnNbMF0uZ2V0Q29tcG9uZW50KCdQZXJzb24nKS5iaW5kQXZhdGFyKGNjLmZpbmQoJ0NhbnZhcy9hdmF0YXIvYXZhdGFyMScpKTtcblx0XHR3aW5kb3cuZ2xvYmFsLnBlcnNvbnNbMV0uZ2V0Q29tcG9uZW50KCdQZXJzb24nKS5iaW5kQXZhdGFyKGNjLmZpbmQoJ0NhbnZhcy9hdmF0YXIvYXZhdGFyMicpKTtcblx0XHR3aW5kb3cuZ2xvYmFsLnBlcnNvbnNbMl0uZ2V0Q29tcG9uZW50KCdQZXJzb24nKS5iaW5kQXZhdGFyKGNjLmZpbmQoJ0NhbnZhcy9hdmF0YXIvYXZhdGFyMycpKTtcblx0XHR3aW5kb3cuZ2xvYmFsLnBlcnNvbnNbM10uZ2V0Q29tcG9uZW50KCdQZXJzb24nKS5iaW5kQXZhdGFyKGNjLmZpbmQoJ0NhbnZhcy9hdmF0YXIvYXZhdGFyNCcpKTtcblx0XHR3aW5kb3cuZ2xvYmFsLnBlcnNvbnNbMF0uZ2V0Q29tcG9uZW50KCdQZXJzb24nKS5uaWNrbmFtZT0n6ICB5Y+fJztcblx0XHR3aW5kb3cuZ2xvYmFsLnBlcnNvbnNbMV0uZ2V0Q29tcG9uZW50KCdQZXJzb24nKS5uaWNrbmFtZT0n5bCR5aaHJztcblx0XHR3aW5kb3cuZ2xvYmFsLnBlcnNvbnNbMl0uZ2V0Q29tcG9uZW50KCdQZXJzb24nKS5uaWNrbmFtZT0n5a+M5ZWGJztcblx0XHR3aW5kb3cuZ2xvYmFsLnBlcnNvbnNbM10uZ2V0Q29tcG9uZW50KCdQZXJzb24nKS5uaWNrbmFtZT0n5bCP5aWzJztcblx0XHQvL+WIneWni+WMluWbm+S4queOqeWutuS9jee9rlxuXHRcdC8vY29uc29sZS5sb2codGhpcy5tYXBPYmoubWFwWzBdWzBdLmdldFBvc2l0aW9uKCkpO1xuXHRcdHdpbmRvdy5nbG9iYWwucGVyc29uc1swXS5nZXRDb21wb25lbnQoJ1BlcnNvbicpLm1vdmUyUG9zKDAsMCk7XG5cdFx0d2luZG93Lmdsb2JhbC5wZXJzb25zWzFdLmdldENvbXBvbmVudCgnUGVyc29uJykubW92ZTJQb3MoMTAsMTApO1xuXHRcdHdpbmRvdy5nbG9iYWwucGVyc29uc1syXS5nZXRDb21wb25lbnQoJ1BlcnNvbicpLm1vdmUyUG9zKDAsMTApO1xuXHRcdHdpbmRvdy5nbG9iYWwucGVyc29uc1szXS5nZXRDb21wb25lbnQoJ1BlcnNvbicpLm1vdmUyUG9zKDEwLDApO1xuXHRcdGZvciAodmFyIGk9MDtpPHdpbmRvdy5nbG9iYWwucGVyc29ucy5sZW5ndGg7aSsrKXtcblx0XHRcdHZhciBub3dQZXJzb249d2luZG93Lmdsb2JhbC5wZXJzb25zW2ldO1xuXHRcdFx0dmFyIGN0eD1jYy5maW5kKFwiYmxvb2RCYXIvYmFyXCIsIG5vd1BlcnNvbikuZ2V0Q29tcG9uZW50KGNjLkdyYXBoaWNzKTtcblx0XHRcdGN0eC5jbGVhcigpO1xuXHRcdFx0Y3R4LnN0cm9rZUNvbG9yID0gY2MuQ29sb3IuUkVEO1xuXHRcdFx0Y3R4Lm1vdmVUbygtNDAsIC0xNTApO1xuXHRcdFx0Y3R4LmxpbmVXaWR0aD0xMDtcblx0XHRcdGN0eC5saW5lVG8oNjAsIC0xNTApO1xuXHRcdFx0Y3R4LnN0cm9rZSgpOyAgIFxuXHRcdFx0dmFyIHRleHQ9Y2MuZmluZChcImJsb29kQmFyL3RleHRcIiwgbm93UGVyc29uKTtcblx0XHRcdHRleHQuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5mb250U2l6ZT0yNTtcblx0XHRcdC8vY29uc29sZS5sb2codGV4dC5nZXRDb21wb25lbnQoY2MuTGFiZWwpKTtcblx0XHRcdHRleHQuc2V0UG9zaXRpb24oLTEwMCwtMTUwKTtcblx0XHRcdFxuXHRcdFx0Ly/orr7nva7ooYzliqjlgLxcblx0XHRcdGN0eD1jYy5maW5kKFwibW9iaWxpdHlCYXIvYmFyXCIsIG5vd1BlcnNvbikuZ2V0Q29tcG9uZW50KGNjLkdyYXBoaWNzKTtcblx0XHRcdGN0eC5jbGVhcigpO1xuXHRcdFx0Y3R4LnN0cm9rZUNvbG9yID0gY2MuQ29sb3IuR1JFRU47XG5cdFx0XHRjdHgubW92ZVRvKC00MCwgLTE4MCk7XG5cdFx0XHRjdHgubGluZVRvKDYwLCAtMTgwKTtcblx0XHRcdGN0eC5saW5lV2lkdGg9MTA7XG5cdFx0XHRjdHguc3Ryb2tlKCk7ICBcblx0XHRcdHRleHQ9Y2MuZmluZChcIm1vYmlsaXR5QmFyL3RleHRcIiwgbm93UGVyc29uKTtcblx0XHRcdHRleHQuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5mb250U2l6ZT0yNTtcblx0XHRcdC8vY29uc29sZS5sb2codGV4dC5nZXRDb21wb25lbnQoY2MuTGFiZWwpKTtcblx0XHRcdHRleHQuc2V0UG9zaXRpb24oLTEwMCwtMjAwKTtcdFx0XHRcblx0XHR9XG5cdH0sXG5cdGluaXRCZ206ZnVuY3Rpb24oKXtcblx0XHRjYy5sb2FkZXIubG9hZFJlcygnYmdtL+WkqeepuuS5i+WfjumSoueQtOabsicsIGNjLkF1ZGlvQ2xpcCwgZnVuY3Rpb24gKGVyciwgY2xpcCkge1xuXHRcdFx0dmFyIGF1ZGlvSUQgPSBjYy5hdWRpb0VuZ2luZS5wbGF5KGNsaXAsIHRydWUsIDAuMSk7XG5cdFx0fSk7XG5cdH0sXG5cdEluaXRpYWxDYXJkOiBmdW5jdGlvbigpIHtcblx0XHR2YXIgY2FyZE5hbWUgPSBbJ+eCuOW8uScsJ+eyvuWHhuWvvOW8uScsJ+WcsOmbtycsJ+W6h+aKpCcsJ+WkqeS9v+eahOW6h+aKpCcsJ+aImOelnueahOelneemjycsJ+iZmuW8sScsJ+WboumYn+eahOWKm+mHjycsXG5cdFx0XHRcdFx0XHRcdCfmsrvmhIgnLCflnKPlhYnmma7nhacnLCfmnJvov5zplZwnLCfnnLznnZsnLCfnjJvnlLfnmoTnpZ3npo8nLCfnm5flj5YnLCfmnZ/nvJonLCfov7fmg5EnLCfmi6/mlZEnXTtcblx0XHR2YXIgdG90Q2FyZE51bSA9IDE3O1xuXHRcdHdpbmRvdy5nbG9iYWwuY2FyZG5vZGUgPSBuZXcgQXJyYXkoKTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHRvdENhcmROdW07IGkrKykge1xuXHRcdFx0XG5cdFx0XHR2YXIgbm9kZSA9IG5ldyBjYy5Ob2RlKGNhcmROYW1lW2ldKTtcblx0XHRcdG5vZGUuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSk7XG5cdFx0XHRub2RlLmNhcmROYW1lID0gY2FyZE5hbWVbaV07XG5cdFx0XHRjYy5sb2FkZXIubG9hZFJlcygn5Y2h54mM5Zu+54mHLycrbm9kZS5jYXJkTmFtZSxjYy5TcHJpdGVGcmFtZSxmdW5jdGlvbihlcnIsc3ByaXRlRnJhbWUpIHtcblx0wqAgwqAgwqAgwqAgwqAgwqAgdGhpcy5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHNwcml0ZUZyYW1lO1xuXHRcdMKgIMKgIH0uYmluZChub2RlKSk7XG5cdFx0XHR3aW5kb3cuZ2xvYmFsLmNhcmRub2RlLnB1c2gobm9kZSk7XHRcblx0XHR9XG5cdFx0Ly/pmpDol4/nu5PmnZ/mjInpkq5cblx0XHRjYy5maW5kKCdDYW52YXMvZW5kX2NhcmRfYnRuJykuYWN0aXZlID0gZmFsc2U7XG5cdFx0Ly/pmpDol4/pgInniYznoa7lrprmjInpkq5cblx0XHRjYy5maW5kKCdDYW52YXMvY2hvb3NlX2NhcmRfY29uZmlybScpLmFjdGl2ZT1mYWxzZTtcblx0XHQvL+makOiXj+mAieeJjOWPlua2iOaMiemSrlxuXHRcdGNjLmZpbmQoJ0NhbnZhcy9jaG9vc2VfY2FyZF9jYW5jZWwnKS5hY3RpdmU9ZmFsc2U7XG5cdFx0Ly/liJ3lp4vljJZCR01cblx0XHR0aGlzLmluaXRCZ20oKTtcblx0fSxcbn0pO1xuXG5cbi8v55Sf5oiQ5LuObWluTnVt5YiwbWF4TnVt55qE6ZqP5py65pWwXG4iXX0=
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcR2V0TWFwLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiYmFzZXgiLCJiYXNleSIsInN0ZXB4Iiwic3RlcHkiLCJyb3V0ZXMiLCJjZWxsIiwidHlwZSIsIlByZWZhYiIsIm1hcCIsImFkaiIsIkdldENlbGwiLCJtYXBfbWF0cml4IiwiQXJyYXkiLCJpIiwiaiIsIm5ld2NlbGwiLCJpbnN0YW50aWF0ZSIsInBhcmVudCIsIm5vZGUiLCJzZXRQb3NpdGlvbiIsImNlbGxfanMiLCJnZXRDb21wb25lbnQiLCJtYXB4IiwibWFweSIsImtpbmQiLCJwIiwiTWF0aCIsInJhbmRvbSIsIkdldEVkZ2UiLCJlZGdlIiwibGVuZ3RoIiwicHVzaCIsIkRmc0ZvclJvdXRlIiwibm93cG9zIiwibnVtIiwidmlzIiwicm91dGUiLCJ4IiwieSIsIm5ld3JvdXRlIiwicG9wIiwiY2hvb3NlUm91dGUiLCJwYXIiLCJyb3V0ZUlkIiwiaW5Nb25pdG9yIiwicmVzZXRDb2xvciIsIm9mZiIsImdhbWUiLCJlbWl0Iiwib3Blbk1vbml0b3IiLCJzZXRDb2xvciIsIm9uIiwicG9zRW5hYmxlIiwib25Mb2FkIiwiY29uc29sZSIsImxvZyIsIm5hbWUiLCJzdGFydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ2RDLElBQUFBLEtBQUssRUFBRSxDQURPO0FBRWRDLElBQUFBLEtBQUssRUFBRSxDQUZPO0FBR2RDLElBQUFBLEtBQUssRUFBRSxDQUhPO0FBSWRDLElBQUFBLEtBQUssRUFBRSxDQUpPO0FBS2RDLElBQUFBLE1BQU0sRUFBRSxJQUxNO0FBS0E7QUFDZEMsSUFBQUEsSUFBSSxFQUFFO0FBQ0wsaUJB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QUFDQSxRQUFJQyxHQUFHLEdBQUcsRUFBVixDQUhnQyxDQUdsQjs7QUFDZCxTQUFLLElBQUl0QixDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEVBQXBCLEVBQXdCQSxDQUFDLEVBQXpCLEVBQTZCO0FBQzVCc0IsTUFBQUEsR0FBRyxDQUFDdEIsQ0FBRCxDQUFILEdBQVMsRUFBVDs7QUFDQSxXQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsRUFBcEIsRUFBd0JBLENBQUMsRUFBekIsRUFBNkI7QUFDNUJxQixRQUFBQSxHQUFHLENBQUN0QixDQUFELENBQUgsQ0FBT0MsQ0FBUCxJQUFZLENBQVo7QUFDQTtBQUNEOztBQUNELFFBQUlWLE1BQU0sR0FBRyxFQUFiO0FBQ0EsU0FBSzRCLFdBQUwsQ0FBaUJDLE1BQWpCLEVBQXlCQyxHQUF6QixFQUE4QkMsR0FBOUIsRUFBbUMvQixNQUFuQyxFQUEyQyxFQUEzQyxFQVhnQyxDQVdnQjs7QUFDaEQsU0FBS0EsTUFBTCxHQUFjQSxNQUFkLENBWmdDLENBWVY7O0FBQ3RCLFNBQUs2QyxXQUFMLENBQWlCN0MsTUFBakIsRUFiZ0MsQ0FhTjs7QUFDMUIsV0FBT0EsTUFBUDtBQUNBLEdBeE1PO0FBME1MaUQsRUFBQUEsTUExTUssb0JBME1LO0FBQ1osU0FBSzNDLE9BQUwsR0FEWSxDQUNJOztBQUNoQixTQUFLa0IsT0FBTCxHQUZZLENBRUk7O0FBQ2hCMEIsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksS0FBS0MsSUFBTCxHQUFVLFFBQXRCO0FBQ0EsR0E5TU87QUFnTkxDLEVBQUFBLEtBaE5LLG1CQWdOSSxDQUVYO0FBR0csR0FyTkksQ0F1Tkw7O0FBdk5LLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG5cdFx0YmFzZXg6IDAsXG5cdFx0YmFzZXk6IDAsXG5cdFx0c3RlcHg6IDAsXG5cdFx0c3RlcHk6IDAsXG5cdFx0cm91dGVzOiBudWxsLCAvL+aaguWtmOiuoeeul+WHuuadpeeahOWkmuadoei3r+W+hFxuXHRcdGNlbGw6IHtcblx0XHRcdGRlZmF1bHQ6IG51bGwsXG5cdFx0XHR0eXBlOiBjYy5QcmVmYWIsXG5cdFx0fSxcblx0XHRtYXA6IG51bGwsIC8v5LqM57u05Zyw5Zu+XG5cdFx0YWRqOiBudWxsLCAvL+WtmOi+ue+8jGFkaltpXVtqXeaYr+S4gOS4quaVsOe7hO+8jOaVsOe7hOS4reavj+S4quaYr+S4jm1hcFtpXVtqXeebuOi/nueahG1hcOWdkOagh1xuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgIC8vIEFUVFJJQlVURVM6XG4gICAgICAgIC8vICAgICBkZWZhdWx0OiBudWxsLCAgICAgICAgLy8gVGhlIGRlZmF1bHQgdmFsdWUgd2lsbCBiZSB1c2VkIG9ubHkgd2hlbiB0aGUgY29tcG9uZW50IGF0dGFjaGluZ1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRvIGEgbm9kZSBmb3IgdGhlIGZpcnN0IHRpbWVcbiAgICAgICAgLy8gICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgICAgICAvLyAgICAgc2VyaWFsaXphYmxlOiB0cnVlLCAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gfSxcbiAgICAgICAgLy8gYmFyOiB7XG4gICAgICAgIC8vICAgICBnZXQgKCkge1xuICAgICAgICAvLyAgICAgICAgIHJldHVybiB0aGlzLl9iYXI7XG4gICAgICAgIC8vICAgICB9LFxuICAgICAgICAvLyAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuX2JhciA9IHZhbHVlO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9LFxuICAgIH0sXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cdEdldENlbGw6IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBtYXBfbWF0cml4ID0gW1xuXHRcdFx0WzEsMSwxLDEsMSwxLDEsMSwxLDEsMV0sXG5cdFx0XHRbMSwxLDAsMCwwLDEsMCwwLDAsMSwxXSxcblx0XHRcdFsxLDAsMSwwLDAsMSwwLDAsMSwwLDFdLFxuXHRcdFx0WzEsMCwwLDEsMSwwLDEsMSwwLDAsMV0sXG5cdFx0XHRbMSwwLDAsMSwwLDAsMCwxLDAsMCwxXSxcblx0XHRcdFsxLDEsMSwxLDEsMSwxLDEsMSwxLDFdLFxuXHRcdFx0WzEsMCwwLDEsMCwwLDAsMSwwLDAsMV0sXG5cdFx0XHRbMSwwLDAsMSwxLDAsMSwxLDAsMCwxXSxcblx0XHRcdFsxLDAsMSwwLDAsMSwwLDAsMSwwLDFdLFxuXHRcdFx0WzEsMSwwLDAsMCwxLDAsMCwwLDEsMV0sXG5cdFx0XHRbMSwxLDEsMSwxLDEsMSwxLDEsMSwxXSxcblx0XHRdO1xuXHRcdHRoaXMubWFwID0gbmV3IEFycmF5KCk7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAxMTsgaSsrKSB7XG5cdFx0XHR0aGlzLm1hcFtpXSA9IG5ldyBBcnJheSgpO1xuXHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCAxMTsgaisrKSB7XG5cdFx0XHRcdHRoaXMubWFwW2ldW2pdID0gbnVsbDtcblx0XHRcdFx0aWYgKG1hcF9tYXRyaXhbaV1bal0gPT0gMSkge1xuXHRcdFx0XHRcdHZhciBuZXdjZWxsID0gY2MuaW5zdGFudGlhdGUodGhpcy5jZWxsKTtcblx0XHRcdFx0XHRuZXdjZWxsLnBhcmVudCA9IHRoaXMubm9kZTsgLy/lsIZjZWxs6IqC54K55Yqg5YiwbWFw6IqC54K55LmL5LiLXG5cdFx0XHRcdFx0bmV3Y2VsbC5zZXRQb3NpdGlvbih0aGlzLmJhc2V4K3RoaXMuc3RlcHgqaSwgdGhpcy5iYXNleSt0aGlzLnN0ZXB5KmopO1xuXHRcdFx0XHRcdHRoaXMubWFwW2ldW2pdID0gbmV3Y2VsbDtcblx0XHRcdFx0XHR2YXIgY2VsbF9qcyA9IHRoaXMubWFwW2ldW2pdLmdldENvbXBvbmVudChcIkNlbGxcIik7XG5cdFx0XHRcdFx0Y2VsbF9qcy5tYXB4ID0gaTtcblx0XHRcdFx0XHRjZWxsX2pzLm1hcHkgPSBqO1xuXHRcdFx0XHRcdC8v5Lul5qaC546H5pa55byP6ZqP5py655Sf5oiQ5qC85a2Q57G75Z6LXG5cdFx0XHRcdFx0aWYgKChpPT0wJiZqPT0wKSB8fCAoaT09MCYmaj09MTApIHx8IChpPT0xMCYmaj09MCkgfHwgKGk9PTEwJiZqPT0xMCkpIHtcblx0XHRcdFx0XHRcdGNlbGxfanMua2luZCA9IDA7XG5cdFx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dmFyIHAgPSBNYXRoLnJhbmRvbSgpO1xuXHRcdFx0XHRcdGlmIChwIDwgMC40KVxuXHRcdFx0XHRcdFx0Y2VsbF9qcy5raW5kID0gMDsgLy/nqbrnmb3moLxcblx0XHRcdFx0XHRlbHNlIGlmIChwIDwgMC43KVxuXHRcdFx0XHRcdFx0Y2VsbF9qcy5raW5kID0gMTsgLy/ljaHniYzmoLxcblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRjZWxsX2pzLmtpbmQgPSAyOyAvL+S6i+S7tuagvFxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXHRcblx0R2V0RWRnZTogZnVuY3Rpb24oKSB7XG5cdFx0dGhpcy5hZGogPSBuZXcgQXJyYXkoKTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IDExOyBpKyspIHtcblx0XHRcdHRoaXMuYWRqW2ldID0gbmV3IEFycmF5KCk7XG5cdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IDExOyBqKyspIHtcblx0XHRcdFx0XHR0aGlzLmFkaltpXVtqXSA9IG5ldyBBcnJheSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHQvL+avj+S4gOS4quWbm+WFg+aVsOe7hOihqOekuu+8muWdkOaghyhhWzBdLGFbMV0p55qEY2VsbOWSjOWdkOaghyhhWzJdLGFbM10p55qEY2VsbOS5i+mXtOacieadoei+uVxuXHRcdHZhciBlZGdlID0gW1xuXHRcdFx0WzAsMCwwLDFdLFswLDEsMCwyXSxbMCwyLDAsM10sWzAsMywwLDRdLFswLDQsMCw1XSxcblx0XHRcdFswLDUsMCw2XSxbMCw2LDAsN10sWzAsNywwLDhdLFswLDgsMCw5XSxbMCw5LDAsMTBdLFxuXHRcdFx0WzAsMCwxLDBdLFswLDAsMSwxXSxbMCw1LDEsNV0sWzAsMTAsMSw5XSxbMCwxMCwxLDEwXSxcblx0XHRcdFsxLDAsMiwwXSxbMSwxLDIsMl0sWzEsNSwyLDVdLFsxLDksMiw4XSxbMSwxMCwyLDEwXSxcblx0XHRcdFsyLDAsMywwXSxbMiwyLDMsM10sWzIsNSwzLDRdLFsyLDUsMyw2XSxbMiw4LDMsN10sWzIsMTAsMywxMF0sXG5cdFx0XHRbMywzLDMsNF0sWzMsNiwzLDddLFxuXHRcdFx0WzMsMCw0LDBdLFszLDMsNCwzXSxbMyw3LDQsN10sWzMsMTAsNCwxMF0sXG5cdFx0XHRbNCwwLDUsMF0sWzQsMyw1LDJdLFs0LDcsNSw4XSxbNCwxMCw1LDEwXSxcblx0XHRcdFs1LDAsNSwxXSxbNSwxLDUsMl0sWzUsMiw1LDNdLFs1LDMsNSw0XSxbNSw0LDUsNV0sXG5cdFx0XHRbNSw1LDUsNl0sWzUsNiw1LDddLFs1LDcsNSw4XSxbNSw4LDUsOV0sWzUsOSw1LDEwXSxcblx0XHRcdFs1LDAsNiwwXSxbNSwyLDYsM10sWzUsOCw2LDddLFs1LDEwLDYsMTBdLFxuXHRcdFx0WzYsMCw3LDBdLFs2LDMsNywzXSxbNiw3LDcsN10sWzYsMTAsNywxMF0sXG5cdFx0XHRbNywzLDcsNF0sWzcsNiw3LDddLFxuXHRcdFx0WzcsMCw4LDBdLFs3LDMsOCwyXSxbNyw0LDgsNV0sWzcsNiw4LDVdLFs3LDcsOCw4XSxbNywxMCw4LDEwXSxcblx0XHRcdFs4LDAsOSwwXSxbOCwyLDksMV0sWzgsNSw5LDVdLFs4LDgsOSw5XSxbOCwxMCw5LDEwXSxcblx0XHRcdFs5LDAsMTAsMF0sWzksMSwxMCwwXSxbOSw1LDEwLDVdLFs5LDksMTAsMTBdLFs5LDEwLDEwLDEwXSxcblx0XHRcdFsxMCwwLDEwLDFdLFsxMCwxLDEwLDJdLFsxMCwyLDEwLDNdLFsxMCwzLDEwLDRdLFsxMCw0LDEwLDVdLFxuXHRcdFx0WzEwLDUsMTAsNl0sWzEwLDYsMTAsN10sWzEwLDcsMTAsOF0sWzEwLDgsMTAsOV0sWzEwLDksMTAsMTBdXG5cdFx0XTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGVkZ2UubGVuZ3RoOyBpKyspIHtcblx0XHRcdHRoaXMuYWRqW2VkZ2VbaV1bMF1dW2VkZ2VbaV1bMV1dLnB1c2goW2VkZ2VbaV1bMl0sIGVkZ2VbaV1bM11dKTtcblx0XHRcdHRoaXMuYWRqW2VkZ2VbaV1bMl1dW2VkZ2VbaV1bM11dLnB1c2goW2VkZ2VbaV1bMF0sIGVkZ2VbaV1bMV1dKTtcblx0XHR9XG5cdH0sXG5cdFxuXHREZnNGb3JSb3V0ZTogZnVuY3Rpb24obm93cG9zLCBudW0sIHZpcywgcm91dGVzLCByb3V0ZSkge1xuXHRcdC8qXG5cdFx0XHRub3dwb3PkuLrlvZPliY3mkJzntKLliLDnmoRjZWxs77yMbnVt5Li65Ymp5L2Z5q2l5pWwXG5cdFx0XHRyb3V0ZXM66Lev5b6E6ZuG5ZCI77yMcm91dGU65b2T5YmN5omA5Zyo55qE5LiA5p2h6Lev5b6EXG5cdFx0Ki9cblx0XHR2YXIgY2VsbF9qcyA9IG5vd3Bvcy5nZXRDb21wb25lbnQoXCJDZWxsXCIpOyAvL+iOt+W+l2NlbGzoioLngrnnmoRqc+e7hOS7tu+8jOS7peS+v+iOt+W+l+e7hOS7tuS4reeahOWxnuaAp1xuXHRcdHZhciB4ID0gY2VsbF9qcy5tYXB4LCB5ID0gY2VsbF9qcy5tYXB5O1xuXHRcdGlmICh2aXNbeF1beV0gPT0gMSlcblx0XHRcdHJldHVybjtcblx0XHR2aXNbeF1beV0gPSAxO1xuXHRcdHJvdXRlLnB1c2gobm93cG9zKTtcblx0XHRpZiAobnVtID09IDApIHtcblx0XHRcdHZhciBuZXdyb3V0ZSA9IFtdO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCByb3V0ZS5sZW5ndGg7IGkrKylcblx0XHRcdFx0bmV3cm91dGUucHVzaChyb3V0ZVtpXSk7XG5cdFx0XHRyb3V0ZXMucHVzaChuZXdyb3V0ZSk7XG5cdFx0XHRyb3V0ZS5wb3AoKTtcblx0XHRcdHZpc1t4XVt5XSA9IDA7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5hZGpbeF1beV0ubGVuZ3RoOyBpKyspIHtcblx0XHRcdHRoaXMuRGZzRm9yUm91dGUodGhpcy5tYXBbdGhpcy5hZGpbeF1beV1baV1bMF1dW3RoaXMuYWRqW3hdW3ldW2ldWzFdXSwgbnVtLTEsIHZpcywgcm91dGVzLCByb3V0ZSk7XG5cdFx0fVxuXHRcdHJvdXRlLnBvcCgpO1xuXHRcdHZpc1t4XVt5XSA9IDA7XG5cdH0sXG5cdFxuXHRjaG9vc2VSb3V0ZTogZnVuY3Rpb24oKSB7XG5cdFx0Ly/mraTlh73mlbDkuIvnmoR0aGlz5pivY2VsbC5qc1xuXHRcdHZhciBwYXIgPSB0aGlzLm5vZGUucGFyZW50LmdldENvbXBvbmVudChcIkdldE1hcFwiKTtcblx0XHR2YXIgcm91dGUgPSBwYXIucm91dGVzW3RoaXMucm91dGVJZF07XG5cdFx0XG5cdFx0Lypcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHJvdXRlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgY2VsbF9qcyA9IHJvdXRlW2ldLmdldENvbXBvbmVudChcIkNlbGxcIik7XG5cdFx0XHRjb25zb2xlLmxvZyhjZWxsX2pzLm1hcHgsIGNlbGxfanMubWFweSk7XG5cdFx0fVxuXHRcdCovXG5cdFx0XG5cdFx0Ly/lhbPpl63miYDmnInoioLngrnnmoTnm5HlkKxcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IDExOyBpKyspIHtcblx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgMTE7IGorKykge1xuXHRcdFx0XHRpZiAocGFyLm1hcFtpXVtqXSA9PSBudWxsKVxuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR2YXIgY2VsbF9qcyA9IHBhci5tYXBbaV1bal0uZ2V0Q29tcG9uZW50KFwiQ2VsbFwiKTtcblx0XHRcdFx0aWYgKGNlbGxfanMuaW5Nb25pdG9yID09IDEpIHtcblx0XHRcdFx0XHRjZWxsX2pzLmluTW9uaXRvciA9IDA7XG5cdFx0XHRcdFx0Y2VsbF9qcy5yZXNldENvbG9yKCk7XG5cdFx0XHRcdFx0Y2VsbF9qcy5yb3V0ZUlkID0gbnVsbDtcblx0XHRcdFx0XHQvL1xuXHRcdFx0XHRcdHBhci5tYXBbaV1bal0ub2ZmKFwibW91c2Vkb3duXCIsIHRoaXMuY2hvb3NlUm91dGUsIGNlbGxfanMpO1xuXHRcdFx0XHRcdC8vdGhpcy5ub2RlLm9mZihcIm1vdXNlZG93blwiLCB0aGlzLmNob29zZVJvdXRlLCBjZWxsX2pzKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRcblx0XHQvKlxuXHRcdOWPkemAgeS6i+S7tlxuXHRcdCovXG5cdFx0Y2MuZ2FtZS5lbWl0KCdyb3V0ZS1jaG9zZW4nLCByb3V0ZSk7XG5cdH0sXG5cdFxuXHRvcGVuTW9uaXRvcjogZnVuY3Rpb24ocm91dGVzKSB7XG5cdFx0Ly/lr7nmr4/mnaHot6/lvoTnmoTnu4jngrnlvIDlkK/nm5HlkKxcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHJvdXRlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGNlbGwgPSByb3V0ZXNbaV1bcm91dGVzW2ldLmxlbmd0aC0xXTtcblx0XHRcdHZhciBjZWxsX2pzID0gY2VsbC5nZXRDb21wb25lbnQoXCJDZWxsXCIpO1xuXHRcdFx0Y2VsbF9qcy5pbk1vbml0b3IgPSAxO1xuXHRcdFx0Y2VsbF9qcy5zZXRDb2xvcigpO1xuXHRcdFx0Y2VsbF9qcy5yb3V0ZUlkID0gaTtcblx0XHRcdGNlbGwub24oXCJtb3VzZWRvd25cIiwgdGhpcy5jaG9vc2VSb3V0ZSwgY2VsbF9qcyk7XG5cdFx0fVxuXHR9LFxuXHRcblx0cG9zRW5hYmxlOiBmdW5jdGlvbihub3dwb3MsIG51bSkge1xuXHRcdC8vbm93cG9z5Li6Y2VsbOexu+Wei+eahG5vZGUsIG51beS4uuWPr+enu+WKqOatpeaVsFxuXHRcdC8v6L+U5Zue5LqM57u05pWw57uE77yM56ys5LqM57u05bqm55qE5pWw57uE5piv55Sx6Iul5bmyY2VsbOexu+Wei+eahG5vZGXnu4TmiJBcblx0XHR2YXIgdmlzID0gW107IC8v5qCH6K6w5piv5ZCm57uP6L+HXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAxMTsgaSsrKSB7XG5cdFx0XHR2aXNbaV0gPSBbXTtcblx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgMTE7IGorKykge1xuXHRcdFx0XHR2aXNbaV1bal0gPSAwO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR2YXIgcm91dGVzID0gW107XG5cdFx0dGhpcy5EZnNGb3JSb3V0ZShub3dwb3MsIG51bSwgdmlzLCByb3V0ZXMsIFtdKTsgLy/mkJzntKLot6/lvoRcblx0XHR0aGlzLnJvdXRlcyA9IHJvdXRlczsgLy/lsIblvpfliLDnmoTlpJrmnaHot6/lvoTkv53lrZhcblx0XHR0aGlzLm9wZW5Nb25pdG9yKHJvdXRlcyk7IC8v5a+55q+P5p2h6Lev5b6E55qE57uI54K55byA5ZCv55uR5ZCsXG5cdFx0cmV0dXJuIHJvdXRlcztcblx0fSxcblx0XG4gICAgb25Mb2FkICgpIHtcblx0XHR0aGlzLkdldENlbGwoKTsgLy/mnoTlu7pjZWxs55+p6Zi15Y2zbWFwXG5cdFx0dGhpcy5HZXRFZGdlKCk7IC8v5bu66L65XG5cdFx0Y29uc29sZS5sb2codGhpcy5uYW1lK1wib25Mb2FkXCIpO1xuXHR9LFxuXG4gICAgc3RhcnQgKCkge1xuXHRcdFxuXHRcdC8vdGhpcy5wb3NFbmFibGUodGhpcy5tYXBbMF1bMF0sIDUpO1xuXHRcdFxuXHRcdFxuICAgIH0sXG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcbn0pO1xuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG4iXX0=
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcc3RhcnRVSS5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInN0YXJ0R2FtZUJ0biIsImV4aXRHYW1lQnRuIiwib25Mb2FkIiwiZmluZCIsImNvbnNvbGUiLCJsb2ciLCJzdGFydCIsInN0YXJ0R2FtZSIsImRpcmVjdG9yIiwibG9hZFNjZW5lIiwiZXhpdEdhbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNUQyxJQUFBQSxZQUFZLEVBQUMsSUFESjtBQUVaQyxJQUFBQSxXQUFXLEVBQUM7QUFGQSxHQUhQO0FBT1JDLEVBQUFBLE1BUFEsb0JBT0E7QUFDUCxTQUFLRixZQUFMLEdBQWtCSixFQUFFLENBQUNPLElBQUgsQ0FBUSxrQkFBUixDQUFsQjtBQUNBLFNBQUtGLFdBQUwsR0FBaUJMLEVBQUUsQ0FBQ08sSUFBSCxDQUFRLGdCQUFSLENBQWpCO0FBQ0FDLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQUtMLFlBQWpCO0FBQ0EsR0FYTztBQVlMTSxFQUFBQSxLQVpLLG1CQVlJLENBRVIsQ0FkSTtBQWVSQyxFQUFBQSxTQUFTLEVBQUMscUJBQVU7QUFDbkJILElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLE1BQVo7QUFDQVQsSUFBQUEsRUFBRSxDQUFDWSxRQUFILENBQVlDLFNBQVosQ0FBc0IsTUFBdEI7QUFDQSxHQWxCTztBQW1CUkMsRUFBQUEsUUFBUSxFQUFDLG9CQUFVO0FBQ2xCTixJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxNQUFaO0FBQ0EsR0FyQk8sQ0FzQkw7O0FBdEJLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgc3RhcnRHYW1lQnRuOm51bGwsXG5cdCAgIGV4aXRHYW1lQnRuOm51bGwsXG4gICAgfSxcblx0b25Mb2FkKCl7XG5cdFx0dGhpcy5zdGFydEdhbWVCdG49Y2MuZmluZCgnQ2FudmFzL3N0YXJ0R2FtZScpO1xuXHRcdHRoaXMuZXhpdEdhbWVCdG49Y2MuZmluZCgnQ2FudmFzL2V4aXRCdG4nKTtcblx0XHRjb25zb2xlLmxvZyh0aGlzLnN0YXJ0R2FtZUJ0bik7XG5cdH0sXG4gICAgc3RhcnQgKCkge1xuXG4gICAgfSxcblx0c3RhcnRHYW1lOmZ1bmN0aW9uKCl7XG5cdFx0Y29uc29sZS5sb2coJ+W8gOWni+a4uOaIjycpO1xuXHRcdGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcImdhbWVcIik7XG5cdH0sXG5cdGV4aXRHYW1lOmZ1bmN0aW9uKCl7XG5cdFx0Y29uc29sZS5sb2coJ+mAgOWHuua4uOaIjycpO1xuXHR9LFxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxufSk7XG4iXX0=
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcUGVyc29uLmpzIl0sIm5hbWVzIjpbImdsb2JhbCIsInJlcXVpcmUiLCJwZXJzb24iLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIm5pY2tuYW1lIiwiZ2V0IiwiSUQiLCJwb3NpdGlvbiIsImF0dGFjayIsImJsb29kIiwibW9iaWxpdHkiLCJjYXJkcyIsIm15U3RhdHVzIiwidHVybiIsInVzZUNhcmRFbmFibGVkIiwiZ29FbmFibGVkIiwiX2dvRW5hYmxlZCIsImlzRGVhZCIsInNoaWVsZCIsImhhbGZTaGllbGQiLCJwYXJ0ZXIiLCJhdmF0YXIiLCJwb3NYIiwicG9zWSIsIm1vdmVCeVJvdXRlIiwicm91dGUiLCJwIiwidHdlZW4iLCJpIiwibGVuZ3RoIiwidG8iLCJ2MiIsIngiLCJ5Iiwic3RhcnQiLCJnZXRDb21wb25lbnQiLCJtYXB4IiwibWFweSIsInN0ZXBPbkNlbGwiLCJub2RlIiwibW92ZTJQb3MiLCJtYXBPYmoiLCJmaW5kIiwicG9zIiwibWFwIiwiZ2V0UG9zaXRpb24iLCJzZXRQb3NpdGlvbiIsImJpbmRBdmF0YXIiLCJvbkxvYWQiLCJBcnJheSIsIndpbmRvdyIsInBlcnNvbnMiLCJwdXNoIiwiY29uc29sZSIsImxvZyIsIm5hbWUiLCJ1cGRhdGUiLCJkdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJQSxNQUFNLEdBQUNDLE9BQU8sQ0FBQyxZQUFELENBQWxCOztBQUNBLElBQUlDLE1BQU0sR0FBQ0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDaEIsYUFBU0QsRUFBRSxDQUFDRSxTQURJO0FBR2hCQyxFQUFBQSxVQUFVLEVBQUU7QUFDZEMsSUFBQUEsUUFBUSxFQUFFO0FBQ1QsaUJBQVEsSUFEQztBQUVUQyxNQUFBQSxHQUFHLEVBQUUsZUFBWTtBQUNoQixlQUFPLEtBQUtELFFBQVo7QUFDQTtBQUpRLEtB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QUNBLEdBaEVrQjtBQWlFbkJTLEVBQUFBLE1BakVtQixvQkFpRVg7QUFDUCxTQUFLckMsS0FBTCxHQUFXLElBQUlzQyxLQUFKLEVBQVg7QUFDQUMsSUFBQUEsTUFBTSxDQUFDckQsTUFBUCxDQUFjc0QsT0FBZCxDQUFzQkMsSUFBdEIsQ0FBMkIsS0FBS2IsSUFBaEM7QUFDQWMsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksS0FBS0MsSUFBTCxHQUFVLFFBQXRCO0FBQ0EsR0FyRWtCO0FBc0VoQnJCLEVBQUFBLEtBdEVnQixtQkFzRVAsQ0FDWDtBQUVHLEdBekVlO0FBMEVoQnNCLEVBQUFBLE1BMUVnQixrQkEwRVJDLEVBMUVRLEVBMEVKLENBR2Q7QUE3RWtCLENBQVQsQ0FBWCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gY2MuQ2xhc3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcbnZhciBnbG9iYWw9cmVxdWlyZSgnZ2xvYmFsR2FtZScpO1xudmFyIHBlcnNvbj1jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuXHRcdG5pY2tuYW1lOiB7XG5cdFx0XHRkZWZhdWx0Om51bGwsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMubmlja25hbWU7XG5cdFx0XHR9LFxuXHRcdH1cdCxcblx0XHRJRDpudWxsLFxuXHRcdHBvc2l0aW9uOm51bGwsXG5cdFx0YXR0YWNrOjEsXG5cdFx0Ymxvb2Q6MTAsLy/njqnlrrbooYDph48s5Yid5aeL5Li6MueCue+8jOavj+WbnuWQiOaBouWkjTLngrlcblx0XHRtb2JpbGl0eToyLC8v546p5a626KGM5Yqo5YC8XG5cdFx0Y2FyZHM6bnVsbCxcblx0XHRteVN0YXR1czoxLC8vMOS4uuatu+S6oe+8jDHkuLrmraPluLhcblx0XHR0dXJuOjEsLy/njqnlrrblm57lkIjmlbBcblx0XHR1c2VDYXJkRW5hYmxlZDoxLC8v5piv5ZCm5L2/55So5Y2h54mM77yMMeS4uuWPr+S9v+eUqOWNoeeJjFxuXHRcdGdvRW5hYmxlZDp7XG5cdFx0XHRkZWZhdWx0OjEsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuX2dvRW5hYmxlZDtcblx0XHRcdH0sXG5cdFx0fSwvL+aYr+WQpuWPr+S7peihjOi1sCwx5Li65Y+v5Lul6KGM6LWwXG5cdFx0aXNEZWFkOjAsLy/mmK/lkKblt7LpmLXkuqHvvIww77ya5rS7552A77yMMe+8muatu+S6hlxuXHRcdHNoaWVsZDowLC8v5Y+v5YWN55ar5LiA5qyh5Lyk5a6z55qE5oqk55u+77yMMDog5pegLCAxOiDmnIlcblx0XHRoYWxmU2hpZWxkOjAsLy/lj6/lh4/ljYrkuIDmrKHkvKTlrrPnmoTmiqTnm77vvIzlj6/ntK/np6/mrKHmlbBcblx0XHRwYXJ0ZXI6bnVsbCxcblx0XHRhdmF0YXI6bnVsbCxcblx0XHRwb3NYOm51bGwsXG5cdFx0cG9zWTpudWxsLFxuICAgIH0sXG5cdG1vdmVCeVJvdXRlOmZ1bmN0aW9uKHJvdXRlKXtcblx0XHQvL+WjsOaYjuS4gOS4quWKqOS9nOW6j+WIl1xuXHRcdC8vdmFyIHI9W2NjLnYyKDEwMCwxMDApLGNjLnYyKDEwMCwxMDApLGNjLnYyKDEwMCwxMDApLGNjLnYyKDEwMCwxMDApXTtcblx0XHQvL3ZhciBhY3RBcnI9bmV3IEFycmF5KCk7XG5cdFx0Ly9jb25zb2xlLmxvZyhyb3V0ZSk7XG5cdFx0dmFyIHA9Y2MudHdlZW4odGhpcy5hdmF0YXIpO1xuXHRcdGZvciAodmFyIGk9MDtpPHJvdXRlLmxlbmd0aDtpKyspe1xuXHRcdFx0cC50bygwLjEse3Bvc2l0aW9uOmNjLnYyKHJvdXRlW2ldLngscm91dGVbaV0ueSl9KTtcblx0XHRcdC8vY29uc29sZS5sb2cocm91dGVbaV0uZ2V0Q29tcG9uZW50KCdDZWxsJykubWFweCsnLCcrcm91dGVbaV0uZ2V0Q29tcG9uZW50KCdDZWxsJykubWFweSk7XG5cdFx0fVxuXHRcdHAuc3RhcnQoKTtcblx0XHQvL3RoaXMuYXZhdGFyLnNldFBvc2l0aW9uKHJvdXRlW3JvdXRlLmxlbmd0aC0xXS5nZXRQb3NpdGlvbigpKTtcblx0XHR0aGlzLnBvc1g9cm91dGVbcm91dGUubGVuZ3RoLTFdLmdldENvbXBvbmVudCgnQ2VsbCcpLm1hcHg7XG5cdFx0dGhpcy5wb3NZPXJvdXRlW3JvdXRlLmxlbmd0aC0xXS5nZXRDb21wb25lbnQoJ0NlbGwnKS5tYXB5O1xuXHRcdFxuXHRcdHJvdXRlW3JvdXRlLmxlbmd0aC0xXS5nZXRDb21wb25lbnQoJ0NlbGwnKS5zdGVwT25DZWxsKHRoaXMubm9kZSk7XG5cdFxuXHR9LFxuXHRtb3ZlMlBvczpmdW5jdGlvbih4LHkpe1xuXHRcdHRoaXMucG9zWD14O1xuXHRcdHRoaXMucG9zWT15O1xuXHRcdC8vdGhpcy5ub3dQb3MueT15O1xuXHRcdHZhciBtYXBPYmo9Y2MuZmluZCgnQ2FudmFzL21hcCcpLmdldENvbXBvbmVudCgnR2V0TWFwJyk7XG5cdFx0dmFyIHBvcz1tYXBPYmoubWFwW3hdW3ldLmdldFBvc2l0aW9uKCk7XG5cdFx0dGhpcy5hdmF0YXIuc2V0UG9zaXRpb24ocG9zKTtcblx0XHQvL2NvbnNvbGUubG9nKHBvcyk7XG5cdFx0Ly9jb25zb2xlLmxvZyh0aGlzLm5vd1Bvcyk7XG5cdH0sXG5cdGJpbmRBdmF0YXI6ZnVuY3Rpb24obm9kZSl7XG5cdFx0Ly9jb25zb2xlLmxvZyhub2RlKTtcblx0XHR0aGlzLmF2YXRhcj1ub2RlO1xuXHR9LFxuXHRvbkxvYWQoKXtcdFxuXHRcdHRoaXMuY2FyZHM9bmV3IEFycmF5KCk7XG5cdFx0d2luZG93Lmdsb2JhbC5wZXJzb25zLnB1c2godGhpcy5ub2RlKTtcblx0XHRjb25zb2xlLmxvZyh0aGlzLm5hbWUrXCJvbkxvYWRcIik7XG5cdH0sXG4gICAgc3RhcnQgKCkge1xuXHRcdC8v5Yid5aeL5YyW5Lu75YqhXG5cdFx0XG4gICAgfSxcbiAgICB1cGRhdGUgKGR0KSB7XG5cdFx0XG5cdFx0XG5cdH0sXG59KTsiXX0=
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
      card.cardFunction[16](card);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcRGVjay5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImRlY2siLCJJbnRlZ2VyIiwicm9sZSIsInNob3dUaXBzIiwibmV3cyIsInRpcHMiLCJOb2RlIiwiYWRkQ29tcG9uZW50IiwiTGFiZWwiLCJsYWJlbCIsImdldENvbXBvbmVudCIsInN0cmluZyIsImZvbnRTaXplIiwiZW5hYmxlQm9sZCIsImNvbG9yIiwicGFyZW50IiwiZmluZCIsImNob29zZV9jb25maXJtIiwiY2FyZElEIiwid2luZG93IiwiZ2xvYmFsIiwibm93X2Nob29zaW5nX2NhcmQiLCJub3dQcm9wZXJ0eSIsImNhcmQiLCJtb2JpbGl0eSIsImNhcmRDb3N0IiwiY2FyZEZ1bmN0aW9uIiwiY2xvc2VDYXJkcyIsImFjdGl2ZSIsImNob29zZV9jYW5jZWwiLCJjYXJkRGV0YWlsIiwibm9kZSIsImluc3RhbnRpYXRlIiwibmFtZSIsInNjYWxlWCIsInNjYWxlWSIsInNldFBvc2l0aW9uIiwiY2xvc2VEZXRhaWwiLCJkZXN0cm95IiwicmVtb3ZlQ2FyZCIsImkiLCJjYXJkcyIsImxlbmd0aCIsInNwbGljZSIsImNob29zZUNhcmQiLCJldmVudCIsInN0b3BQcm9wYWdhdGlvbiIsInNob3dDYXJkcyIsImlzUGxheUNhcmQiLCJub3dTdGVwIiwiY2FyZG5vZGUiLCJvbiIsImNoaWxkcmVuIiwib2ZmIiwiaW5pdERlY2siLCJub3dQbGF5ZXIiLCJvbkxvYWQiLCJzdGFydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLElBQUksRUFBQyxDQUFDSixFQUFFLENBQUNLLE9BQUosQ0FERztBQUVSQyxJQUFB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QkF5R0k7QUFDTCxTQUFLMUIsSUFBTCxDQUFVb0IsRUFBVixDQUFhLFdBQWIsRUFBeUIsS0FBS0csUUFBOUIsRUFBdUMsSUFBdkM7QUFFSCxHQTVHSSxDQThHTDs7QUE5R0ssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gY2MuQ2xhc3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGRlY2s6W2NjLkludGVnZXJdLFxyXG4gICAgICAgIHJvbGU6IG51bGwsXHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICBzaG93VGlwczpmdW5jdGlvbihuZXdzKXtcclxuICAgICAgICB2YXIgdGlwcz1uZXcgY2MuTm9kZSgpO1xyXG4gICAgICAgIHRpcHMuYWRkQ29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBsYWJlbD10aXBzLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgbGFiZWwuc3RyaW5nPW5ld3M7XHJcbiAgICAgICAgbGFiZWwuZm9udFNpemU9NTA7XHJcbiAgICAgICAgbGFiZWwuZW5hYmxlQm9sZD10cnVlO1xyXG4gICAgICAgIHRpcHMuY29sb3I9Y2MuY29sb3IoMjU1LDAsMCwyNTUpO1xyXG4gICAgICAgIHRpcHMuYWRkQ29tcG9uZW50KCdUaXBzJyk7XHJcbiAgICAgICAgdGlwcy5wYXJlbnQ9Y2MuZmluZCgnQ2FudmFzJyk7ICAgICAgICBcclxuICAgIH0sXHJcbiAgICBjaG9vc2VfY29uZmlybTpmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciBjYXJkSUQ9d2luZG93Lmdsb2JhbC5ub3dfY2hvb3NpbmdfY2FyZDtcclxuICAgICAgICB2YXIgcm9sZT1jYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoJ2dsb2JhbEdhbWUnKS5ub3dQcm9wZXJ0eTtcclxuICAgICAgICB2YXIgY2FyZD1jYy5maW5kKCdDYW52YXMvQ2FyZCcpLmdldENvbXBvbmVudCgnQ2FyZCcpO1xyXG4gICAgICAgIGlmIChyb2xlLm1vYmlsaXR5PGNhcmQuY2FyZENvc3RbY2FyZElEXSl7XHJcbiAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9EZWNrJykuZ2V0Q29tcG9uZW50KCdEZWNrJykuc2hvd1RpcHMoXCLooYzliqjlgLzkuI3otrPvvIFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGNhcmQuY2FyZEZ1bmN0aW9uWzE2XShjYXJkKTtcclxuICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL0RlY2snKS5nZXRDb21wb25lbnQoJ0RlY2snKS5jbG9zZUNhcmRzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5YWz6Zet5oyJ6ZKuXHJcblx0XHRjYy5maW5kKCdDYW52YXMvY2hvb3NlX2NhcmRfY29uZmlybScpLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICBjYy5maW5kKCdDYW52YXMvY2hvb3NlX2NhcmRfY2FuY2VsJykuYWN0aXZlPWZhbHNlOyAgICAgICAgICAgIFxyXG4gICAgfSxcclxuXHRjaG9vc2VfY2FuY2VsOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgLy/lhbPpl63mjInpkq5cclxuXHRcdGNjLmZpbmQoJ0NhbnZhcy9jaG9vc2VfY2FyZF9jb25maXJtJykuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9jaG9vc2VfY2FyZF9jYW5jZWwnKS5hY3RpdmU9ZmFsc2U7ICAgICAgICBcclxuICAgIH0sXHJcbiAgICBjYXJkRGV0YWlsOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIG5vZGU9Y2MuaW5zdGFudGlhdGUodGhpcyk7XHJcbiAgICAgICAgbm9kZS5uYW1lPVwiY2FyZF9kZXRhaWxcIjtcclxuICAgICAgICBub2RlLnNjYWxlWD0wLjgsbm9kZS5zY2FsZVk9MC44O1xyXG4gICAgICAgIG5vZGUuc2V0UG9zaXRpb24oMCw1MCk7XHJcbiAgICAgICAgbm9kZS5wYXJlbnQ9Y2MuZmluZChcIkNhbnZhc1wiKTtcclxuICAgICAgICBcclxuICAgIH0sXHJcbiAgICBjbG9zZURldGFpbDpmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciBub2RlPWNjLmZpbmQoXCJDYW52YXMvY2FyZF9kZXRhaWxcIik7XHJcbiAgICAgICAgaWYgKG5vZGUhPW51bGwpXHJcbiAgICAgICAgICAgIG5vZGUuZGVzdHJveSgpO1xyXG4gICAgfSxcclxuICAgIHJlbW92ZUNhcmQ6ZnVuY3Rpb24oY2FyZElEKXtcclxuICAgICAgICB2YXIgcm9sZT1jYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoJ2dsb2JhbEdhbWUnKS5ub3dQcm9wZXJ0eTtcclxuICAgICAgICBmb3IgKHZhciBpPTA7aTxyb2xlLmNhcmRzLmxlbmd0aDsrK2kpXHJcbiAgICAgICAgICAgIGlmIChyb2xlLmNhcmRzW2ldPT1jYXJkSUQpe1xyXG4gICAgICAgICAgICAgICAgcm9sZS5jYXJkcy5zcGxpY2UoaSwxKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgY2hvb3NlQ2FyZDpmdW5jdGlvbihldmVudCl7XHJcbiAgICAgICAgdmFyIGRlY2s9Y2MuZmluZChcIkNhbnZhcy9EZWNrXCIpLmdldENvbXBvbmVudChcIkRlY2tcIik7XHJcbiAgICAgICAgZGVjay5jbG9zZURldGFpbCgpO1xyXG4gICAgICAgIC8v5pi+56S656Gu5a6aL+WPlua2iOaMiemSrlxyXG5cdFx0Y2MuZmluZCgnQ2FudmFzL2Nob29zZV9jYXJkX2NvbmZpcm0nKS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICBjYy5maW5kKCdDYW52YXMvY2hvb3NlX2NhcmRfY2FuY2VsJykuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgLy/ph43nva7lvZPliY3pgInmi6nnmoTmiYvniYxcclxuICAgICAgICB3aW5kb3cuZ2xvYmFsLm5vd19jaG9vc2luZ19jYXJkPXRoaXMuY2FyZElEO1xyXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfSxcdFxyXG4gICAgc2hvd0NhcmRzOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIGlzUGxheUNhcmQ9KGNjLmZpbmQoXCJDYW52YXNcIikuZ2V0Q29tcG9uZW50KFwiZ2xvYmFsR2FtZVwiKS5ub3dTdGVwPT0zKTtcclxuICAgICAgICBmb3IgKHZhciBpPTA7aTx0aGlzLmRlY2subGVuZ3RoOysraSl7XHJcbiAgICAgICAgICAgIHZhciBjYXJkSUQ9dGhpcy5kZWNrW2ldO1xyXG4gICAgICAgICAgICB2YXIgbm9kZT1jYy5pbnN0YW50aWF0ZSh3aW5kb3cuZ2xvYmFsLmNhcmRub2RlW2NhcmRJRF0pO1xyXG4gICAgICAgICAgICBub2RlLnNjYWxlWD0wLjQsbm9kZS5zY2FsZVk9MC40O1xyXG4gICAgICAgICAgICBub2RlLnNldFBvc2l0aW9uKDIwMCtpKjIwMCwwKTtcclxuICAgICAgICAgICAgbm9kZS5jYXJkSUQ9Y2FyZElEO1xyXG4gICAgICAgICAgICBub2RlLnBhcmVudD10aGlzLm5vZGU7XHJcbiAgICAgICAgICAgIG5vZGUub24oXCJtb3VzZWVudGVyXCIsdGhpcy5jYXJkRGV0YWlsLG5vZGUpO1xyXG4gICAgICAgICAgICBub2RlLm9uKFwibW91c2VsZWF2ZVwiLHRoaXMuY2xvc2VEZXRhaWwsbm9kZSk7XHJcblx0XHRcdGlmIChpc1BsYXlDYXJkPT10cnVlKXtcclxuXHRcdFx0ICAgIG5vZGUub24oXCJtb3VzZWRvd25cIix0aGlzLmNob29zZUNhcmQsbm9kZSk7XHJcblx0XHRcdH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cdGNsb3NlQ2FyZHM6ZnVuY3Rpb24oKXtcclxuXHRcdHZhciBjaGlsZHJlbj1jYy5maW5kKFwiQ2FudmFzL0RlY2tcIikuY2hpbGRyZW47XHJcblx0XHRmb3IgKHZhciBpPTA7aTxjaGlsZHJlbi5sZW5ndGg7KytpKVxyXG4gICAgICAgICAgICBjaGlsZHJlbltpXS5kZXN0cm95KCk7XHJcbiAgICAgICAgZGVjaz1jYy5maW5kKCdDYW52YXMvRGVjaycpLmdldENvbXBvbmVudCgnRGVjaycpO1xyXG5cdFx0ZGVjay5ub2RlLm9mZihcIm1vdXNlZG93blwiLHRoaXMuY2xvc2VDYXJkcyxkZWNrKTtcclxuXHRcdGRlY2subm9kZS5vbihcIm1vdXNlZG93blwiLHRoaXMuaW5pdERlY2ssZGVjayk7XHJcbiAgICB9LFxyXG4gICAgaW5pdERlY2s6ZnVuY3Rpb24oKXtcclxuXHRcdHRoaXMucm9sZT1jYy5maW5kKFwiQ2FudmFzXCIpLmdldENvbXBvbmVudChcImdsb2JhbEdhbWVcIikubm93UGxheWVyO1xyXG5cdFx0dGhpcy5kZWNrPXRoaXMucm9sZS5nZXRDb21wb25lbnQoXCJQZXJzb25cIikuY2FyZHM7XHJcbiAgICAgICAgdGhpcy5zaG93Q2FyZHMoKTtcclxuICAgICAgICB0aGlzLm5vZGUub2ZmKFwibW91c2Vkb3duXCIsdGhpcy5pbml0RGVjayx0aGlzKTtcclxuICAgICAgICB0aGlzLm5vZGUub24oXCJtb3VzZWRvd25cIix0aGlzLmNsb3NlQ2FyZHMsdGhpcyk7XHJcbiAgICB9LFxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQgKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5vbihcIm1vdXNlZG93blwiLHRoaXMuaW5pdERlY2ssdGhpcyk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcclxufSk7XHJcbiJdfQ==
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
  shield_3: function shield_3(card) {
    var role = cc.find('Canvas').getComponent('globalGame').nowProperty;
    role.shield = 1;
    role.mobility -= card.cardCost[3];
    cc.find('Canvas/Deck').getComponent('Deck').removeCard(3);
  },
  halfShield_4: function halfShield_4(card) {
    var role = cc.find('Canvas').getComponent('globalGame').nowProperty;
    var index = Number(role.name[6]);
    var teammate = index + 2 > 4 ? index - 2 : index + 2;
    teammate = cc.find("Canvas/Persons/Person" + teammate).getComponent('Person');
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
      person: [role, cc.find("Canvas/Persons/Person" + teammate)],
      act: function act() {
        this.person[0].getComponent('Person').attack = Math.max(0, this.person[0].getComponent('Person').attack - 1);
        this.person[1].getComponent('Person').attack = Math.max(0, this.person[1].getComponent('Person').attack - 1);
      }
    });
    role.mobility -= card.cardCost[5];
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
      person: [enemy1, enemy1.attack != 0, enemy2, enemy2.attack != 0],
      act: function act() {
        this.person[0].attack += person[1];
        this.attack[2].attack += person[3];
      }
    });
    enemy1.attack = Math.max(0, enemy1.attack - 1);
    enemy2.attack = Math.max(0, enemy2.attack - 1);
    role.mobility -= card.cardCost[6];
    cc.find('Canvas/Deck').getComponent('Deck').removeCard(6);
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
  tough_12: function tough_12(card) {
    var role = cc.find('Canvas').getComponent('globalGame').nowProperty;
    role.attack *= 2;
    var buff = cc.find('Canvas').getComponent('Buff');
    buff.todoList.push({
      endTurn: window.global.nowTurn + 1,
      person: role,
      act: function act() {
        this.person.attack = Number(this.person.attack / 2);
      }
    });
    role.mobility -= card.cardCost[12];
    cc.find('Canvas/Deck').getComponent('Deck').removeCard(12);
  },
  save_16: function save_16(card) {
    var role = cc.find('Canvas').getComponent('globalGame').nowProperty;
    var index = Number(role.name[6]);
    var teammate = index + 2 > 4 ? index - 2 : index + 2;
    teammate = cc.find("Canvas/Persons/Person" + teammate).getComponent('Person');

    if (teammate.isDead == 1) {
      teammate.isDead = 0;
      teammate.blood = 5;
      teammate.mobility = 3;
    }

    role.mobility -= card.cardCost[16];
    cc.find('Canvas/Deck').getComponent('Deck').removeCard(16);
  },
  onLoad: function onLoad() {
    this.cardCost = [0, 0, 0, 0, 0, 1111110, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //[4,3,2,3,3,4,4,5,2,3,3,3,3,3,4,4,5];

    this.cardFunction = new Array();
    this.cardFunction[3] = this.shield_3;
    this.cardFunction[4] = this.halfShield_4;
    this.cardFunction[5] = this.bless_5;
    this.cardFunction[6] = this.weak_6;
    this.cardFunction[8] = this.heal_8;
    this.cardFunction[9] = this.holyNova_9;
    this.cardFunction[12] = this.tough_12;
    this.cardFunction[16] = this.save_16;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcQ2FyZC5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImNhcmRDb3N0IiwiSW50ZWdlciIsImNhcmRGdW5jdGlvbiIsInNoaWVsZF8zIiwiY2FyZCIsInJvbGUiLCJmaW5kIiwiZ2V0Q29tcG9uZW50Iiwibm93UHJvcGVydHkiLCJzaGllbGQiLCJtb2JpbGl0eSIsInJlbW92ZUNhcmQiLCJoYWxmU2hpZWxkXzQiLCJpbmRleCIsIk51bWJlciIsIm5hbWUiLCJ0ZWFtbWF0ZSIsImhhbGZTaGllbGQiLCJpc0RlYWQiLCJibGVzc181Iiwibm93UGxheWVyIiwiYXR0Y2FrIiwiYXR0YWNrIiwiYnVmZiIsInRvZG9MaXN0IiwicHVzaCIsImVuZFR1cm4iLCJ3aW5kb3ciLCJnbG9iYWwiLCJub3dUdXJuIiwicGVyc29uIiwiYWN0IiwiTWF0aCIsIm1heCIsIndlYWtfNiIsImVuZW15MSIsImVuZW15MiIsImhlYWxfOCIsImJsb29kIiwiaG9seU5vdmFfOSIsInRvdWdoXzEyIiwic2F2ZV8xNiIsIm9uTG9hZCIsIkFycmF5Iiwic3RhcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxRQUFRLEVBQUMsQ0FBQ0osRUFBRSxDQUFDSyxPQUFKLENBREQ7QUFFUkMsSUFBQUEsWUFBWSxFQUFDO0FBRkwsR0FIUDtBQU9MO0FBQ0FDLEVBQUFBLFFBQVEsRUFBQyxrQkFBU0MsSUFBVCxFQUFjO0FBQ25CLFFBQUlDLElBQUksR0FBQ1QsRUFBRSxDQUFDVSxJQUFILENBQVEsUUFBUixFQUFrQkMsWUFBbEIsQ0FBK0IsWUFBL0IsRUFBNkNDLFdBQXREO0FBQ0FILElBQUFBLElBQUks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QUFLaEMsWUFBTCxDQUFrQixDQUFsQixJQUFxQixLQUFLbUMsTUFBMUI7QUFDQSxTQUFLbkMsWUFBTCxDQUFrQixDQUFsQixJQUFxQixLQUFLcUMsVUFBMUI7QUFDQSxTQUFLckMsWUFBTCxDQUFrQixFQUFsQixJQUFzQixLQUFLc0MsUUFBM0I7QUFDQSxTQUFLdEMsWUFBTCxDQUFrQixFQUFsQixJQUFzQixLQUFLdUMsT0FBM0I7QUFDSCxHQW5JSTtBQXFJTEcsRUFBQUEsS0FySUssbUJBcUlJLENBRVIsQ0F2SUksQ0F5SUw7O0FBeklLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBjYXJkQ29zdDpbY2MuSW50ZWdlcl0sXHJcbiAgICAgICAgY2FyZEZ1bmN0aW9uOm51bGwsXHJcbiAgICB9LFxyXG4gICAgLy/ljaHniYzlk43lupTlh73mlbDkuK3nmoR0aGlz5LiN5pivY2FyZC5qc1xyXG4gICAgc2hpZWxkXzM6ZnVuY3Rpb24oY2FyZCl7XHJcbiAgICAgICAgdmFyIHJvbGU9Y2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdnbG9iYWxHYW1lJykubm93UHJvcGVydHk7XHJcbiAgICAgICAgcm9sZS5zaGllbGQ9MTtcclxuICAgICAgICByb2xlLm1vYmlsaXR5LT1jYXJkLmNhcmRDb3N0WzNdO1xyXG4gICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9EZWNrJykuZ2V0Q29tcG9uZW50KCdEZWNrJykucmVtb3ZlQ2FyZCgzKTtcclxuICAgIH0sXHJcbiAgICBoYWxmU2hpZWxkXzQ6ZnVuY3Rpb24oY2FyZCl7XHJcbiAgICAgICAgdmFyIHJvbGU9Y2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdnbG9iYWxHYW1lJykubm93UHJvcGVydHk7XHJcbiAgICAgICAgdmFyIGluZGV4PU51bWJlcihyb2xlLm5hbWVbNl0pO1xyXG4gICAgICAgIHZhciB0ZWFtbWF0ZT1pbmRleCsyPjQ/aW5kZXgtMjppbmRleCsyO1xyXG4gICAgICAgIHRlYW1tYXRlPWNjLmZpbmQoXCJDYW52YXMvUGVyc29ucy9QZXJzb25cIit0ZWFtbWF0ZSkuZ2V0Q29tcG9uZW50KCdQZXJzb24nKTtcclxuICAgICAgICByb2xlLmhhbGZTaGllbGQrPTE7XHJcbiAgICAgICAgaWYgKHRlYW1tYXRlLmlzRGVhZD09MClcclxuICAgICAgICAgICAgdGVhbW1hdGUuaGFsZlNoaWVsZCs9MTtcclxuICAgICAgICByb2xlLm1vYmlsaXR5LT1jYXJkLmNhcmRDb3N0WzRdO1xyXG4gICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9EZWNrJykuZ2V0Q29tcG9uZW50KCdEZWNrJykucmVtb3ZlQ2FyZCg0KTtcclxuICAgIH0sXHJcbiAgICBibGVzc181OmZ1bmN0aW9uKGNhcmQpe1xyXG4gICAgICAgIHZhciByb2xlPWNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudCgnZ2xvYmFsR2FtZScpLm5vd1BsYXllcjtcclxuICAgICAgICB2YXIgaW5kZXg9TnVtYmVyKHJvbGUubmFtZVs2XSk7XHJcbiAgICAgICAgdmFyIHRlYW1tYXRlPWluZGV4KzI+ND9pbmRleC0yOmluZGV4KzI7XHJcbiAgICAgICAgcm9sZS5nZXRDb21wb25lbnQoJ1BlcnNvbicpLmF0dGNhays9MTtcclxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzL1BlcnNvbnMvUGVyc29uXCIrdGVhbW1hdGUpLmdldENvbXBvbmVudCgnUGVyc29uJykuYXR0YWNrKz0xOyAgICBcclxuICAgICAgICB2YXIgYnVmZj1jYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoJ0J1ZmYnKTtcclxuICAgICAgICBidWZmLnRvZG9MaXN0LnB1c2goe1xyXG4gICAgICAgICAgICBlbmRUdXJuOndpbmRvdy5nbG9iYWwubm93VHVybisyLFxyXG4gICAgICAgICAgICBwZXJzb246W3JvbGUsY2MuZmluZChcIkNhbnZhcy9QZXJzb25zL1BlcnNvblwiK3RlYW1tYXRlKV0sXHJcbiAgICAgICAgICAgIGFjdDpmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wZXJzb25bMF0uZ2V0Q29tcG9uZW50KCdQZXJzb24nKS5hdHRhY2s9TWF0aC5tYXgoMCx0aGlzLnBlcnNvblswXS5nZXRDb21wb25lbnQoJ1BlcnNvbicpLmF0dGFjay0xKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGVyc29uWzFdLmdldENvbXBvbmVudCgnUGVyc29uJykuYXR0YWNrPU1hdGgubWF4KDAsdGhpcy5wZXJzb25bMV0uZ2V0Q29tcG9uZW50KCdQZXJzb24nKS5hdHRhY2stMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByb2xlLm1vYmlsaXR5LT1jYXJkLmNhcmRDb3N0WzVdO1xyXG4gICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9EZWNrJykuZ2V0Q29tcG9uZW50KCdEZWNrJykucmVtb3ZlQ2FyZCg1KTsgICAgICAgIFxyXG4gICAgfSxcclxuICAgIHdlYWtfNjpmdW5jdGlvbihjYXJkKXtcclxuICAgICAgICB2YXIgcm9sZT1jYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoJ2dsb2JhbEdhbWUnKS5ub3dQbGF5ZXI7XHJcbiAgICAgICAgdmFyIGluZGV4PU51bWJlcihyb2xlLm5hbWVbNl0pO1xyXG4gICAgICAgIHZhciB0ZWFtbWF0ZT1pbmRleCsyPjQ/aW5kZXgtMjppbmRleCsyO1xyXG4gICAgICAgIHZhciBlbmVteTE9aW5kZXgrMT40P2luZGV4LTM6aW5kZXgrMTtcclxuICAgICAgICB2YXIgZW5lbXkyPXRlYW1tYXRlKzE+ND90ZWFtbWF0ZS0zOnRlYW1tYXRlKzE7XHJcbiAgICAgICAgZW5lbXkxPWNjLmZpbmQoXCJDYW52YXMvUGVyc29ucy9QZXJzb25cIitlbmVteTEpLmdldENvbXBvbmVudCgnUGVyc29uJyk7XHJcbiAgICAgICAgZW5lbXkyPWNjLmZpbmQoXCJDYW52YXMvUGVyc29ucy9QZXJzb25cIitlbmVteTIpLmdldENvbXBvbmVudCgnUGVyc29uJyk7XHJcbiAgICAgICAgdmFyIGJ1ZmY9Y2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdCdWZmJyk7XHJcbiAgICAgICAgYnVmZi50b2RvTGlzdC5wdXNoKHtcclxuICAgICAgICAgICAgZW5kVHVybjp3aW5kb3cuZ2xvYmFsLm5vd1R1cm4rMixcclxuICAgICAgICAgICAgcGVyc29uOltlbmVteTEsZW5lbXkxLmF0dGFjayE9MCxlbmVteTIsZW5lbXkyLmF0dGFjayE9MF0sXHJcbiAgICAgICAgICAgIGFjdDpmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wZXJzb25bMF0uYXR0YWNrKz1wZXJzb25bMV07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF0dGFja1syXS5hdHRhY2srPXBlcnNvblszXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pOyAgICAgICAgXHJcbiAgICAgICAgZW5lbXkxLmF0dGFjaz1NYXRoLm1heCgwLGVuZW15MS5hdHRhY2stMSk7XHJcbiAgICAgICAgZW5lbXkyLmF0dGFjaz1NYXRoLm1heCgwLGVuZW15Mi5hdHRhY2stMSk7XHJcbiAgICAgICAgcm9sZS5tb2JpbGl0eS09Y2FyZC5jYXJkQ29zdFs2XTtcclxuICAgICAgICBjYy5maW5kKCdDYW52YXMvRGVjaycpLmdldENvbXBvbmVudCgnRGVjaycpLnJlbW92ZUNhcmQoNik7XHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG4gICAgaGVhbF84OmZ1bmN0aW9uKGNhcmQpe1xyXG4gICAgICAgIHZhciByb2xlPWNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudCgnZ2xvYmFsR2FtZScpLm5vd1Byb3BlcnR5O1xyXG4gICAgICAgIHJvbGUuYmxvb2QrPTE7XHJcbiAgICAgICAgcm9sZS5tb2JpbGl0eS09Y2FyZC5jYXJkQ29zdFs4XTtcclxuICAgICAgICBjYy5maW5kKCdDYW52YXMvRGVjaycpLmdldENvbXBvbmVudCgnRGVjaycpLnJlbW92ZUNhcmQoOCk7XHJcbiAgICB9LFxyXG4gICAgaG9seU5vdmFfOTpmdW5jdGlvbihjYXJkKXtcclxuICAgICAgICB2YXIgcm9sZT1jYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoJ2dsb2JhbEdhbWUnKS5ub3dQbGF5ZXI7XHJcbiAgICAgICAgdmFyIGluZGV4PU51bWJlcihyb2xlLm5hbWVbNl0pO1xyXG4gICAgICAgIHZhciB0ZWFtbWF0ZT1pbmRleCsyPjQ/aW5kZXgtMjppbmRleCsyO1xyXG4gICAgICAgIHZhciBlbmVteTE9aW5kZXgrMT40P2luZGV4LTM6aW5kZXgrMTtcclxuICAgICAgICB2YXIgZW5lbXkyPXRlYW1tYXRlKzE+ND90ZWFtbWF0ZS0zOnRlYW1tYXRlKzE7XHJcbiAgICAgICAgcm9sZT1jYy5maW5kKFwiQ2FudmFzL1BlcnNvbnMvUGVyc29uXCIraW5kZXgpLmdldENvbXBvbmVudCgnUGVyc29uJyk7XHJcbiAgICAgICAgdGVhbW1hdGU9Y2MuZmluZChcIkNhbnZhcy9QZXJzb25zL1BlcnNvblwiK3RlYW1tYXRlKS5nZXRDb21wb25lbnQoJ1BlcnNvbicpO1xyXG4gICAgICAgIGVuZW15MT1jYy5maW5kKFwiQ2FudmFzL1BlcnNvbnMvUGVyc29uXCIrZW5lbXkxKS5nZXRDb21wb25lbnQoJ1BlcnNvbicpO1xyXG4gICAgICAgIGVuZW15Mj1jYy5maW5kKFwiQ2FudmFzL1BlcnNvbnMvUGVyc29uXCIrZW5lbXkyKS5nZXRDb21wb25lbnQoJ1BlcnNvbicpO1xyXG4gICAgICAgIGlmIChyb2xlLmlzRGVhZD09MClcclxuICAgICAgICAgICAgcm9sZS5ibG9vZCs9MjtcclxuICAgICAgICBpZiAodGVhbW1hdGUuaXNEZWFkPT0wKVxyXG4gICAgICAgICAgICB0ZWFtbWF0ZS5ibG9vZCs9MjtcclxuICAgICAgICBpZiAoZW5lbXkxLmlzRGVhZD09MClcclxuICAgICAgICAgICAgZW5lbXkxLmJsb29kKz0xO1xyXG4gICAgICAgIGlmIChlbmVteTIuaXNEZWFkPT0wKVxyXG4gICAgICAgICAgICBlbmVteTIuYmxvb2QrPTE7XHJcbiAgICAgICAgcm9sZS5tb2JpbGl0eS09Y2FyZC5jYXJkQ29zdFs5XTtcclxuICAgICAgICBjYy5maW5kKCdDYW52YXMvRGVjaycpLmdldENvbXBvbmVudCgnRGVjaycpLnJlbW92ZUNhcmQoOSk7XHJcbiAgICB9LFxyXG4gICAgdG91Z2hfMTI6ZnVuY3Rpb24oY2FyZCl7XHJcbiAgICAgICAgdmFyIHJvbGU9Y2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdnbG9iYWxHYW1lJykubm93UHJvcGVydHk7XHJcbiAgICAgICAgcm9sZS5hdHRhY2sqPTI7XHJcbiAgICAgICAgdmFyIGJ1ZmY9Y2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KCdCdWZmJyk7XHJcbiAgICAgICAgYnVmZi50b2RvTGlzdC5wdXNoKHtcclxuICAgICAgICAgICAgZW5kVHVybjp3aW5kb3cuZ2xvYmFsLm5vd1R1cm4rMSxcclxuICAgICAgICAgICAgcGVyc29uOnJvbGUsXHJcbiAgICAgICAgICAgIGFjdDpmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wZXJzb24uYXR0YWNrPU51bWJlcih0aGlzLnBlcnNvbi5hdHRhY2svMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByb2xlLm1vYmlsaXR5LT1jYXJkLmNhcmRDb3N0WzEyXTtcclxuICAgICAgICBjYy5maW5kKCdDYW52YXMvRGVjaycpLmdldENvbXBvbmVudCgnRGVjaycpLnJlbW92ZUNhcmQoMTIpOyAgICAgICAgXHJcbiAgICB9LFxyXG4gICAgc2F2ZV8xNjpmdW5jdGlvbihjYXJkKXtcclxuICAgICAgICB2YXIgcm9sZT1jYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoJ2dsb2JhbEdhbWUnKS5ub3dQcm9wZXJ0eTtcclxuICAgICAgICB2YXIgaW5kZXg9TnVtYmVyKHJvbGUubmFtZVs2XSk7XHJcbiAgICAgICAgdmFyIHRlYW1tYXRlPWluZGV4KzI+ND9pbmRleC0yOmluZGV4KzI7XHJcbiAgICAgICAgdGVhbW1hdGU9Y2MuZmluZChcIkNhbnZhcy9QZXJzb25zL1BlcnNvblwiK3RlYW1tYXRlKS5nZXRDb21wb25lbnQoJ1BlcnNvbicpO1xyXG4gICAgICAgIGlmICh0ZWFtbWF0ZS5pc0RlYWQ9PTEpe1xyXG4gICAgICAgICAgICB0ZWFtbWF0ZS5pc0RlYWQ9MDtcclxuICAgICAgICAgICAgdGVhbW1hdGUuYmxvb2Q9NTtcclxuICAgICAgICAgICAgdGVhbW1hdGUubW9iaWxpdHk9MztcclxuICAgICAgICB9XHJcbiAgICAgICAgcm9sZS5tb2JpbGl0eS09Y2FyZC5jYXJkQ29zdFsxNl07XHJcbiAgICAgICAgY2MuZmluZCgnQ2FudmFzL0RlY2snKS5nZXRDb21wb25lbnQoJ0RlY2snKS5yZW1vdmVDYXJkKDE2KTtcclxuICAgIH0sXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIHRoaXMuY2FyZENvc3Q9WzAsMCwwLDAsMCwxMTExMTEwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDBdOy8vWzQsMywyLDMsMyw0LDQsNSwyLDMsMywzLDMsMyw0LDQsNV07XHJcbiAgICAgICAgdGhpcy5jYXJkRnVuY3Rpb249bmV3IEFycmF5KCk7XHJcbiAgICAgICAgdGhpcy5jYXJkRnVuY3Rpb25bM109dGhpcy5zaGllbGRfMztcclxuICAgICAgICB0aGlzLmNhcmRGdW5jdGlvbls0XT10aGlzLmhhbGZTaGllbGRfNDtcclxuICAgICAgICB0aGlzLmNhcmRGdW5jdGlvbls1XT10aGlzLmJsZXNzXzU7XHJcbiAgICAgICAgdGhpcy5jYXJkRnVuY3Rpb25bNl09dGhpcy53ZWFrXzY7XHJcbiAgICAgICAgdGhpcy5jYXJkRnVuY3Rpb25bOF09dGhpcy5oZWFsXzg7XHJcbiAgICAgICAgdGhpcy5jYXJkRnVuY3Rpb25bOV09dGhpcy5ob2x5Tm92YV85O1xyXG4gICAgICAgIHRoaXMuY2FyZEZ1bmN0aW9uWzEyXT10aGlzLnRvdWdoXzEyO1xyXG4gICAgICAgIHRoaXMuY2FyZEZ1bmN0aW9uWzE2XT10aGlzLnNhdmVfMTY7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0ICgpIHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxyXG59KTtcclxuIl19
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
//------QC-SOURCE-SPLIT------
