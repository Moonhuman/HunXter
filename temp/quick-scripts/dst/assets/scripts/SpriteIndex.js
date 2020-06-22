
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