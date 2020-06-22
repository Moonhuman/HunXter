
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcU3ByaXRlSW5kZXguanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsImVkaXRvciIsIkNDX0VESVRPUiIsInJlcXVpcmVDb21wb25lbnQiLCJTcHJpdGUiLCJwcm9wZXJ0aWVzIiwic3ByaXRlRnJhbWVzIiwiU3ByaXRlRnJhbWUiLCJfaW5kZXgiLCJpbmRleCIsInR5cGUiLCJJbnRlZ2VyIiwiZ2V0Iiwic2V0IiwidmFsdWUiLCJsZW5ndGgiLCJzcHJpdGUiLCJub2RlIiwiZ2V0Q29tcG9uZW50Iiwic3ByaXRlRnJhbWUiLCJuZXh0IiwicmFuZG9tTnVtIiwibWluTnVtIiwibWF4TnVtIiwiYXJndW1lbnRzIiwicGFyc2VJbnQiLCJNYXRoIiwicmFuZG9tIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNOLGFBQVNELEVBQUUsQ0FBQ0UsU0FETjtBQUMrQjtBQUNyQ0MsRUFBQUEsTUFBTSxFQUFFQyxTQUFTLElBQUk7QUFDakJDLElBQUFBLGdCQUFnQixFQUFFTCxFQUFFLENBQUNNLE1BREosQ0FDZ0I7O0FBRGhCLEdBRmY7QUFJREMsRUFBQUEsVUFBVSxFQUFFO0FBQ2JDLElBQUFBLFlBQVksRUFBRSxDQUFDUixFQUFFLENBQUNTLFdBQUosQ0FERDtBQUNvQjtBQUNqQ0MsSUFBQUEsTUFBTSxFQUFFLENBRks7QUFFb0I7QUFFakNDLElBQUFBLEtBQUssRUFBRTtBQUEwQjtBQUM3QkMsTUFBQUEsSUFBSSxFQUFFWixFQUFFLENBQUNhLE9BRE47QUFDMEI7QUFDN0I7QUFDQUMsTUFBQUEsR0FIRyxpQkFHRztBQUNGLGVBQU8sS0FBS0osTUFBWjtBQUNILE9BTEU7QUFNRjtBQUNBSyxNQUFBQSxHQVBFLGVBT0VDLEtBUEYsRUFPUztBQUNSLFlBQUlBLEtBQUssR0FBRyxDQUFaLEVBQWU7QUFDVjtBQUNKLFNBSE8sQ0FJUDs7O0FBQ0QsYUFBS04sTUFBTCxHQUFjTSxLQUFLLEdBQUcsS0FBS1IsWUFBTCxDQUFrQlMsTUFBeEMsQ0FMUSxDQU1QOztBQUNELFlBQUlDLE1BQU0sR0FBRyxLQUFLQyxJQUFMLENBQVVDLFlBQVYsQ0FBdUJwQixFQUFFLENBQUNNLE1BQTFCLENBQWIsQ0FQUSxDQVFQOztBQUNEWSxRQUFBQSxNQUFNLENBQUNHLFdBQVAsR0FBcUIsS0FBS2IsWUFBTCxDQUFrQixLQUFLRSxNQUF2QixDQUFyQjtBQUNIO0FBakJFO0FBSk0sR0FKWDs7QUE0Qk47Ozs7QUFJQVksRUFBQUEsSUFoQ00sa0JBZ0NDO0FBQ0YsU0FBS1gsS0FBTCxHQUFXWSxTQUFTLENBQUMsQ0FBRCxFQUFHLENBQUgsQ0FBcEIsQ0FERSxDQUN5QjtBQUMvQjtBQWxDSyxDQUFULEdBb0NBOztBQUNBLFNBQVNBLFNBQVQsQ0FBbUJDLE1BQW5CLEVBQTBCQyxNQUExQixFQUFpQztBQUM3QixVQUFPQyxTQUFTLENBQUNULE1BQWpCO0FBQ0ksU0FBSyxDQUFMO0FBQ0ksYUFBT1UsUUFBUSxDQUFDQyxJQUFJLENBQUNDLE1BQUwsS0FBY0wsTUFBZCxHQUFxQixDQUF0QixFQUF3QixFQUF4QixDQUFmO0FBQ0o7O0FBQ0EsU0FBSyxDQUFMO0FBQ0ksYUFBT0csUUFBUSxDQUFDQyxJQUFJLENBQUNDLE1BQUwsTUFBZUosTUFBTSxHQUFDRCxNQUFQLEdBQWMsQ0FBN0IsSUFBZ0NBLE1BQWpDLEVBQXdDLEVBQXhDLENBQWY7QUFDSjs7QUFDSTtBQUNJLGFBQU8sQ0FBUDtBQUNKO0FBVFI7QUFXSCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY2MuQ2xhc3Moe1xyXG4gICBleHRlbmRzOiBjYy5Db21wb25lbnQsICAgICAgICAgICAgICAgLy/nvJbovpHlmajlsZ7mgKfvvIzlj6rlnKjnvJbovpHnirbmgIHmnInmlYhcclxuICAgZWRpdG9yOiBDQ19FRElUT1IgJiYge1xyXG4gICAgICAgcmVxdWlyZUNvbXBvbmVudDogY2MuU3ByaXRlLCAgICAgLy/opoHmsYLoioLngrnlv4XpobvmnIljYy5TcHJpdGXnu4Tku7ZcclxuICAgfSwgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICBzcHJpdGVGcmFtZXM6IFtjYy5TcHJpdGVGcmFtZV0sICAvL+WumuS5ieS4gOS4qlNwcml0ZUZyYW1lc+aVsOe7hFxyXG4gICAgICAgX2luZGV4OiAwLCAgICAgICAgICAgICAgICAgICAgICAgLy/ku6XkuIvliJLnur/igJxf4oCd5byA5aeL55qE5Li656eB55So5Y+Y6YePXHJcblx0XHRcclxuICAgICAgIGluZGV4OiB7ICAgICAgICAgICAgICAgICAgICAgICAgIC8vaW5kZXjlsZ7mgKfmjqfliLblm77niYfliIfmjaJcclxuICAgICAgICAgICB0eXBlOiBjYy5JbnRlZ2VyLCAgICAgICAgICAgIC8v5a6a5LmJ5bGe5oCn5Li65pW05pWw57G75Z6LXHJcbiAgICAgICAgICAgLy/ov5nmrKHmsqHkvb/nlKhub3RpZnnmlrnlvI/lrp7njrDlsZ7mgKflgLznmoTlj5jljJbnm5HlkKzvvIzmlLnnlKhnZXR0ZXIvc2V0dGVy5pa55byPXHJcbiAgICAgICAgICAgZ2V0KCkgeyAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9pbmRleDtcclxuICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvL+S4uui0n+aVsOmAgOWHuiBcclxuICAgICAgICAgICAgc2V0KHZhbHVlKSB7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICBpZiAodmFsdWUgPCAwKSB7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvL+agueaNrnNwcml0ZUZyYW1lc+e7hOS7tumVv+W6puiuoeeul3RoaXMuX2luZGV4XHJcbiAgICAgICAgICAgICAgIHRoaXMuX2luZGV4ID0gdmFsdWUgJSB0aGlzLnNwcml0ZUZyYW1lcy5sZW5ndGg7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy/ojrflj5blvZPliY3oioLngrnkuIrnmoRTcHJpdGXnu4Tku7blr7nosaFcclxuICAgICAgICAgICAgICAgbGV0IHNwcml0ZSA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvL+iuvue9rlNwcml0Zee7hOS7tueahHNwcml0ZUZyYW1l5bGe5oCn77yM5Y+Y5o2i5Zu+54mHXHJcbiAgICAgICAgICAgICAgIHNwcml0ZS5zcHJpdGVGcmFtZSA9IHRoaXMuc3ByaXRlRnJhbWVzW3RoaXMuX2luZGV4XTtcclxuICAgICAgICAgICB9LFxyXG4gICAgICAgfVxyXG4gICB9LCAgICBcclxuICAgLyoqXHJcbiAgICpuZXh05pa55rOV77yM6LCD55SoaW5kZXgrK+WIh+aNouWbvueJh++8jFxyXG4gICAq5Y+v5Lul5pa55L6/6KKrY2MuQnV0dG9u57uE5Lu255qE5LqL5Lu26LCD55SoXHJcbiAgICovXHJcbiAgIG5leHQoKSB7ICAgICAgICBcclxuICAgICAgICB0aGlzLmluZGV4PXJhbmRvbU51bSgwLDUpOyAvL+iwg+eUqOiHqui6q2luZGV45bGe5oCn77yM57yW5Y+3KzFcclxuICAgfVxyXG59KTtcclxuLy/nlJ/miJDku45taW5OdW3liLBtYXhOdW3nmoTpmo/mnLrmlbBcclxuZnVuY3Rpb24gcmFuZG9tTnVtKG1pbk51bSxtYXhOdW0peyBcclxuICAgIHN3aXRjaChhcmd1bWVudHMubGVuZ3RoKXsgXHJcbiAgICAgICAgY2FzZSAxOiBcclxuICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KE1hdGgucmFuZG9tKCkqbWluTnVtKzEsMTApOyBcclxuICAgICAgICBicmVhazsgXHJcbiAgICAgICAgY2FzZSAyOiBcclxuICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KE1hdGgucmFuZG9tKCkqKG1heE51bS1taW5OdW0rMSkrbWluTnVtLDEwKTsgXHJcbiAgICAgICAgYnJlYWs7IFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBcclxuICAgICAgICAgICAgICAgIHJldHVybiAwOyBcclxuICAgICAgICAgICAgYnJlYWs7IFxyXG4gICAgfSBcclxufSAiXX0=