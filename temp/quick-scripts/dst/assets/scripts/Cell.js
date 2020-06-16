
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
  stepOnCell: function stepOnCell(Person) {
    if (this.kind == 0) //空白格
      return;else if (this.kind == 1) //卡牌格
      return; //还没写好卡牌，暂时先跳过
    else if (this.kind == 2) {
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
        } else if (rand_event == 1) {
          //监狱
          event_name = "监狱";
        } else if (rand_event == 2) {
          //恶魔
          event_name = "恶魔";
        } else if (rand_event == 3) {
          //奥利给
          event_name = "奥利给";
        } else if (rand_event == 4) {
          //视野
          event_name = "视野";
        } else if (rand_event == 5) {
          //天使
          event_name = "天使";
        }

        cc.loader.loadRes(event_name, cc.SpriteFrame, function (err, spriteFrame) {
          self.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        }); //开启note节点的监听，点击后消失

        note.on('mousedown', function (event) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcQ2VsbC5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIm1hcHgiLCJtYXB5Iiwia2luZCIsImluTW9uaXRvciIsInJvdXRlSUQiLCJzZXRDb2xvciIsIm5vZGUiLCJjb2xvciIsIkNvbG9yIiwiUkVEIiwicmVzZXRDb2xvciIsInN0ZXBPbkNlbGwiLCJQZXJzb24iLCJyYW5kX2V2ZW50IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwibm90ZSIsIk5vZGUiLCJhZGRDb21wb25lbnQiLCJTcHJpdGUiLCJzZXRQb3NpdGlvbiIsInBhcmVudCIsInNlbGYiLCJldmVudF9uYW1lIiwibG9hZGVyIiwibG9hZFJlcyIsIlNwcml0ZUZyYW1lIiwiZXJyIiwic3ByaXRlRnJhbWUiLCJnZXRDb21wb25lbnQiLCJvbiIsImV2ZW50IiwiZGVzdHJveSIsIm9uTG9hZCIsInN0YXJ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDZEMsSUFBQUEsSUFBSSxFQUFFLENBRFE7QUFDTDtBQUNUQyxJQUFBQSxJQUFJLEVBQUUsQ0FGUTtBQUVOO0FBQ1JDLElBQUFBLElBQUksRUFBRSxJQUhRO0FBR0Y7QUFDWkMsSUFBQUEsU0FBUyxFQUFFLENBSkc7QUFJQTtBQUNkQyxJQUFBQSxPQUFPLEVBQUUsSUFMSyxDQUtDO0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQXJCUSxHQUhQO0FBMkJSQyxFQUFBQSxRQUFRLEVBQUUsb0JBQVc7QUFDcEI7QUFDQSxTQUFLQyxJQUFMLENBQVVDLEtBQVYsR0FBa0JYLEVBQUUsQ0FBQ1ksS0FBSCxDQUFTQyxHQUEzQjtBQUNBLEdBOUJPO0FBZ0NSQyxFQUFBQSxVQUFVLEVBQUUsc0JBQVc7QUFDdEI7QUFDQSxTQUFLSixJQUFMLENBQVVDLEtBQVYsR0FBa0JYLEVBQUUsQ0FBQ1csS0FBSCxDQUFTLEdBQVQsRUFBYSxHQUFiLEVBQWlCLEdBQWpCLEVBQXFCLEdBQXJCLENBQWxCO0FBQ0EsR0FuQ087QUFxQ1JJLEVBQUFBLFVBQVUsRUFBRSxvQkFBU0MsTUFBVCxFQUFpQjtBQUM1QixRQUFJLEtBQUtWLElBQUwsSUFBYSxDQUFqQixFQUFvQjtBQUNuQixhQURELEtBRUssSUFBSSxLQUFLQSxJQUFMLElBQWEsQ0FBakIsRUFBb0I7QUFDeEIsYUFESSxDQUNJO0FBREosU0FFQSxJQUFJLEtBQUtBLElBQUwsSUFBYSxDQUFqQixFQUFvQjtBQUFFO0FBQzFCO0FBQ0EsWUFBSVcsVUFBVSxHQUFHQyxJQUFJLENBQUNDLEtBQUwsQ0FBV0QsSUFBSSxDQUFDRSxNQUFMLEtBQWMsQ0FBekIsQ0FBakIsQ0FGd0IsQ0FHeEI7O0FBQ0EsWUFBSUMsSUFBSSxHQUFHLElBQUlyQixFQUFFLENBQUNzQixJQUFQLEVBQVg7QUFDU0QsUUFBQUEsSUFBSSxDQUFDRSxZQUFMLENBQWtCdkIsRUFBRSxDQUFDd0IsTUFBckI7QUFDVEgsUUFBQUEsSUFBSSxDQUFDSSxXQUFMLENBQWlCLENBQWpCLEVBQW9CLENBQXBCO0FBQ0FKLFFBQUFBLElBQUksQ0FBQ0ssTUFBTCxHQUFjLEtBQUtoQixJQUFMLENBQVVnQixNQUFWLENBQWlCQSxNQUEvQjtBQUNBLFlBQUlDLElBQUksR0FBR04sSUFBWDtBQUFBLFlBQWlCTyxVQUFqQjs7QUFDQSxZQUFJWCxVQUFVLElBQUksQ0FBbEIsRUFBcUI7QUFBRTtBQUN0QlcsVUFBQUEsVUFBVSxHQUFHLElBQWI7QUFDQSxTQUZELE1BR0ssSUFBSVgsVUFBVSxJQUFJLENBQWxCLEVBQXFCO0FBQUU7QUFDM0JXLFVBQUFBLFVBQVUsR0FBRyxJQUFiO0FBQ0EsU0FGSSxNQUdBLElBQUlYLFVBQVUsSUFBSSxDQUFsQixFQUFxQjtBQUFFO0FBQzNCVyxVQUFBQSxVQUFVLEdBQUcsSUFBYjtBQUNBLFNBRkksTUFHQSxJQUFJWCxVQUFVLElBQUksQ0FBbEIsRUFBcUI7QUFBRTtBQUMzQlcsVUFBQUEsVUFBVSxHQUFHLEtBQWI7QUFDQSxTQUZJLE1BR0EsSUFBSVgsVUFBVSxJQUFJLENBQWxCLEVBQXFCO0FBQUU7QUFDM0JXLFVBQUFBLFVBQVUsR0FBRyxJQUFiO0FBQ0EsU0FGSSxNQUdBLElBQUlYLFVBQVUsSUFBSSxDQUFsQixFQUFxQjtBQUFFO0FBQzNCVyxVQUFBQSxVQUFVLEdBQUcsSUFBYjtBQUNBOztBQUNENUIsUUFBQUEsRUFBRSxDQUFDNkIsTUFBSCxDQUFVQyxPQUFWLENBQWtCRixVQUFsQixFQUE4QjVCLEVBQUUsQ0FBQytCLFdBQWpDLEVBQThDLFVBQVVDLEdBQVYsRUFBZUMsV0FBZixFQUE0QjtBQUN6RU4sVUFBQUEsSUFBSSxDQUFDTyxZQUFMLENBQWtCbEMsRUFBRSxDQUFDd0IsTUFBckIsRUFBNkJTLFdBQTdCLEdBQTJDQSxXQUEzQztBQUNBLFNBRkQsRUEzQndCLENBOEJ4Qjs7QUFDQVosUUFBQUEsSUFBSSxDQUFDYyxFQUFMLENBQVEsV0FBUixFQUFxQixVQUFXQyxLQUFYLEVBQW1CO0FBQ3ZDLGVBQUtDLE9BQUw7QUFDQSxTQUZELEVBRUdoQixJQUZIO0FBSUE7QUFDRCxHQTlFTztBQWdGTDtBQUVBaUIsRUFBQUEsTUFsRkssb0JBa0ZLLENBRVosQ0FwRk87QUFzRkxDLEVBQUFBLEtBdEZLLG1CQXNGSTtBQUNYO0FBQ0EsUUFBSVosSUFBSSxHQUFHLElBQVg7O0FBQ0EsUUFBSSxLQUFLckIsSUFBTCxJQUFhLENBQWpCLEVBQW9CO0FBQUU7QUFDckJOLE1BQUFBLEVBQUUsQ0FBQzZCLE1BQUgsQ0FBVUMsT0FBVixDQUFrQixNQUFsQixFQUEwQjlCLEVBQUUsQ0FBQytCLFdBQTdCLEVBQTBDLFVBQVVDLEdBQVYsRUFBZUMsV0FBZixFQUE0QjtBQUNyRU4sUUFBQUEsSUFBSSxDQUFDakIsSUFBTCxDQUFVd0IsWUFBVixDQUF1QmxDLEVBQUUsQ0FBQ3dCLE1BQTFCLEVBQWtDUyxXQUFsQyxHQUFnREEsV0FBaEQ7QUFDQSxPQUZEO0FBR0EsS0FKRCxNQUtLLElBQUksS0FBSzNCLElBQUwsSUFBYSxDQUFqQixFQUFvQjtBQUFFO0FBQzFCTixNQUFBQSxFQUFFLENBQUM2QixNQUFILENBQVVDLE9BQVYsQ0FBa0IsS0FBbEIsRUFBeUI5QixFQUFFLENBQUMrQixXQUE1QixFQUF5QyxVQUFVQyxHQUFWLEVBQWVDLFdBQWYsRUFBNEI7QUFDcEVOLFFBQUFBLElBQUksQ0FBQ2pCLElBQUwsQ0FBVXdCLFlBQVYsQ0FBdUJsQyxFQUFFLENBQUN3QixNQUExQixFQUFrQ1MsV0FBbEMsR0FBZ0RBLFdBQWhEO0FBQ0EsT0FGRDtBQUdBLEtBSkksTUFLQTtBQUFFO0FBQ05qQyxNQUFBQSxFQUFFLENBQUM2QixNQUFILENBQVVDLE9BQVYsQ0FBa0IsS0FBbEIsRUFBeUI5QixFQUFFLENBQUMrQixXQUE1QixFQUF5QyxVQUFVQyxHQUFWLEVBQWVDLFdBQWYsRUFBNEI7QUFDcEVOLFFBQUFBLElBQUksQ0FBQ2pCLElBQUwsQ0FBVXdCLFlBQVYsQ0FBdUJsQyxFQUFFLENBQUN3QixNQUExQixFQUFrQ1MsV0FBbEMsR0FBZ0RBLFdBQWhEO0FBQ0EsT0FGRDtBQUdBO0FBQ0UsR0F4R0ksQ0EwR0w7O0FBMUdLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuXHRcdG1hcHg6IDAsIC8v5ZyobWFwW2ldW2pd5Lit55qE5qiq5Z2Q5qCHXHJcblx0XHRtYXB5OiAwLC8v5ZyobWFwW2ldW2pd5Lit55qE57q15Z2Q5qCHXHJcblx0XHRraW5kOiBudWxsLCAvL+agvOWtkOeahOexu+Wei++8jDA656m655m95qC877yMMTrljaHniYzmoLzvvIwyOuS6i+S7tuagvFxyXG5cdFx0aW5Nb25pdG9yOiAwLCAvL+eUqOadpeWIpOaWreaYr+WQpuWkhOS6juebkeWQrOS4reeahOagh+iusFxyXG5cdFx0cm91dGVJRDogbnVsbCwgLy/orrDlvZXov5nkuKpjZWxs5pivbWFw5Lit5ZOq5p2hcm91dGXnmoTnu4jngrnvvIzljbPlnKhyb3V0ZXPkuK3nmoTkuIvmoIdcclxuXHRcdFxyXG4gICAgICAgIC8vIGZvbzoge1xyXG4gICAgICAgIC8vICAgICAvLyBBVFRSSUJVVEVTOlxyXG4gICAgICAgIC8vICAgICBkZWZhdWx0OiBudWxsLCAgICAgICAgLy8gVGhlIGRlZmF1bHQgdmFsdWUgd2lsbCBiZSB1c2VkIG9ubHkgd2hlbiB0aGUgY29tcG9uZW50IGF0dGFjaGluZ1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdG8gYSBub2RlIGZvciB0aGUgZmlyc3QgdGltZVxyXG4gICAgICAgIC8vICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcclxuICAgICAgICAvLyAgICAgc2VyaWFsaXphYmxlOiB0cnVlLCAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcclxuICAgICAgICAvLyB9LFxyXG4gICAgICAgIC8vIGJhcjoge1xyXG4gICAgICAgIC8vICAgICBnZXQgKCkge1xyXG4gICAgICAgIC8vICAgICAgICAgcmV0dXJuIHRoaXMuX2JhcjtcclxuICAgICAgICAvLyAgICAgfSxcclxuICAgICAgICAvLyAgICAgc2V0ICh2YWx1ZSkge1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5fYmFyID0gdmFsdWU7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9LFxyXG4gICAgfSxcclxuXHRcclxuXHRzZXRDb2xvcjogZnVuY3Rpb24oKSB7XHJcblx0XHQvL+iuvue9rmNlbGznmoTpopzoibLkuLrnuqLoibLvvIzooajnpLrlj6/otbBcclxuXHRcdHRoaXMubm9kZS5jb2xvciA9IGNjLkNvbG9yLlJFRDtcclxuXHR9LFxyXG5cdFxyXG5cdHJlc2V0Q29sb3I6IGZ1bmN0aW9uKCkge1xyXG5cdFx0Ly/ov5jljp9jZWxs55qE6aKc6ImyXHJcblx0XHR0aGlzLm5vZGUuY29sb3IgPSBjYy5jb2xvcigyNTUsMjU1LDI1NSwyNTUpO1xyXG5cdH0sXHJcblx0XHJcblx0c3RlcE9uQ2VsbDogZnVuY3Rpb24oUGVyc29uKSB7XHJcblx0XHRpZiAodGhpcy5raW5kID09IDApIC8v56m655m95qC8XHJcblx0XHRcdHJldHVybjtcclxuXHRcdGVsc2UgaWYgKHRoaXMua2luZCA9PSAxKSAvL+WNoeeJjOagvFxyXG5cdFx0XHRyZXR1cm47IC8v6L+Y5rKh5YaZ5aW95Y2h54mM77yM5pqC5pe25YWI6Lez6L+HXHJcblx0XHRlbHNlIGlmICh0aGlzLmtpbmQgPT0gMikgeyAvL+S6i+S7tuagvFxyXG5cdFx0XHQvL+maj+acuuS6p+eUnzbkuKrkuovku7bkuYvkuIBcclxuXHRcdFx0dmFyIHJhbmRfZXZlbnQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqNik7XHJcblx0XHRcdC8v5Yib5bu655So5p2l5o+Q56S66I635b6X6Kem5Y+R5LqL5Lu255qE57K+54G16IqC54K5XHJcblx0XHRcdHZhciBub3RlID0gbmV3IGNjLk5vZGUoKTtcclxuICAgICAgICAgICAgbm90ZS5hZGRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuXHRcdFx0bm90ZS5zZXRQb3NpdGlvbigwLCAwKTtcclxuXHRcdFx0bm90ZS5wYXJlbnQgPSB0aGlzLm5vZGUucGFyZW50LnBhcmVudDtcclxuXHRcdFx0dmFyIHNlbGYgPSBub3RlLCBldmVudF9uYW1lO1xyXG5cdFx0XHRpZiAocmFuZF9ldmVudCA9PSAwKSB7IC8v6Zm36ZixXHJcblx0XHRcdFx0ZXZlbnRfbmFtZSA9IFwi6Zm36ZixXCI7XHJcblx0XHRcdH1cdFxyXG5cdFx0XHRlbHNlIGlmIChyYW5kX2V2ZW50ID09IDEpIHsgLy/nm5Hni7FcclxuXHRcdFx0XHRldmVudF9uYW1lID0gXCLnm5Hni7FcIjtcclxuXHRcdFx0fVx0XHJcblx0XHRcdGVsc2UgaWYgKHJhbmRfZXZlbnQgPT0gMikgeyAvL+aBtumtlFxyXG5cdFx0XHRcdGV2ZW50X25hbWUgPSBcIuaBtumtlFwiO1xyXG5cdFx0XHR9XHRcclxuXHRcdFx0ZWxzZSBpZiAocmFuZF9ldmVudCA9PSAzKSB7IC8v5aWl5Yip57uZXHJcblx0XHRcdFx0ZXZlbnRfbmFtZSA9IFwi5aWl5Yip57uZXCI7XHJcblx0XHRcdH1cdFxyXG5cdFx0XHRlbHNlIGlmIChyYW5kX2V2ZW50ID09IDQpIHsgLy/op4bph45cclxuXHRcdFx0XHRldmVudF9uYW1lID0gXCLop4bph45cIjtcclxuXHRcdFx0fVx0XHJcblx0XHRcdGVsc2UgaWYgKHJhbmRfZXZlbnQgPT0gNSkgeyAvL+WkqeS9v1xyXG5cdFx0XHRcdGV2ZW50X25hbWUgPSBcIuWkqeS9v1wiO1xyXG5cdFx0XHR9XHRcclxuXHRcdFx0Y2MubG9hZGVyLmxvYWRSZXMoZXZlbnRfbmFtZSwgY2MuU3ByaXRlRnJhbWUsIGZ1bmN0aW9uIChlcnIsIHNwcml0ZUZyYW1lKSB7XHJcblx0XHRcdFx0c2VsZi5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHNwcml0ZUZyYW1lO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0Ly/lvIDlkK9ub3Rl6IqC54K555qE55uR5ZCs77yM54K55Ye75ZCO5raI5aSxXHJcblx0XHRcdG5vdGUub24oJ21vdXNlZG93bicsIGZ1bmN0aW9uICggZXZlbnQgKSB7XHJcblx0XHRcdFx0dGhpcy5kZXN0cm95KCk7XHJcblx0XHRcdH0sIG5vdGUpO1xyXG5cdFx0XHRcclxuXHRcdH1cclxuXHR9LFxyXG5cdFxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gICAgb25Mb2FkICgpIHtcclxuXHRcdFxyXG5cdH0sXHJcblxyXG4gICAgc3RhcnQgKCkge1xyXG5cdFx0Ly/orr7nva7moLzlrZDlm77niYdcclxuXHRcdHZhciBzZWxmID0gdGhpcztcclxuXHRcdGlmICh0aGlzLmtpbmQgPT0gMCkgeyAvL+epuueZveagvFxyXG5cdFx0XHRjYy5sb2FkZXIubG9hZFJlcyhcImNlbGxcIiwgY2MuU3ByaXRlRnJhbWUsIGZ1bmN0aW9uIChlcnIsIHNwcml0ZUZyYW1lKSB7XHJcblx0XHRcdFx0c2VsZi5ub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gc3ByaXRlRnJhbWU7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZiAodGhpcy5raW5kID09IDEpIHsgLy/ljaHniYzmoLxcclxuXHRcdFx0Y2MubG9hZGVyLmxvYWRSZXMoXCLmir3ljaHmoLxcIiwgY2MuU3ByaXRlRnJhbWUsIGZ1bmN0aW9uIChlcnIsIHNwcml0ZUZyYW1lKSB7XHJcblx0XHRcdFx0c2VsZi5ub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gc3ByaXRlRnJhbWU7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7IC8v5LqL5Lu25qC8XHJcblx0XHRcdGNjLmxvYWRlci5sb2FkUmVzKFwi5LqL5Lu25qC8XCIsIGNjLlNwcml0ZUZyYW1lLCBmdW5jdGlvbiAoZXJyLCBzcHJpdGVGcmFtZSkge1xyXG5cdFx0XHRcdHNlbGYubm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHNwcml0ZUZyYW1lO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge30sXHJcbn0pO1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4iXX0=