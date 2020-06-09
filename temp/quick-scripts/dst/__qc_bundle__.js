
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
                    var __filename = 'preview-scripts/assets/scripts/NewScript.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e8bc53xDZdPCKLrf/Yatyej', 'NewScript');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcQ2VsbC5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInN0YXJ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUUsQ0FDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFmUSxHQUhQO0FBcUJMO0FBRUE7QUFFQUMsRUFBQUEsS0F6QkssbUJBeUJJLENBRVIsQ0EzQkksQ0E2Qkw7O0FBN0JLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICAvLyBmb286IHtcclxuICAgICAgICAvLyAgICAgLy8gQVRUUklCVVRFUzpcclxuICAgICAgICAvLyAgICAgZGVmYXVsdDogbnVsbCwgICAgICAgIC8vIFRoZSBkZWZhdWx0IHZhbHVlIHdpbGwgYmUgdXNlZCBvbmx5IHdoZW4gdGhlIGNvbXBvbmVudCBhdHRhY2hpbmdcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRvIGEgbm9kZSBmb3IgdGhlIGZpcnN0IHRpbWVcclxuICAgICAgICAvLyAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XHJcbiAgICAgICAgLy8gICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXHJcbiAgICAgICAgLy8gfSxcclxuICAgICAgICAvLyBiYXI6IHtcclxuICAgICAgICAvLyAgICAgZ2V0ICgpIHtcclxuICAgICAgICAvLyAgICAgICAgIHJldHVybiB0aGlzLl9iYXI7XHJcbiAgICAgICAgLy8gICAgIH0sXHJcbiAgICAgICAgLy8gICAgIHNldCAodmFsdWUpIHtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuX2JhciA9IHZhbHVlO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfSxcclxuICAgIH0sXHJcblxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gICAgLy8gb25Mb2FkICgpIHt9LFxyXG5cclxuICAgIHN0YXJ0ICgpIHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxyXG59KTtcclxuIl19
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
    cell: {
      "default": null,
      type: cc.Prefab
    },
    map: null,
    //二维地图
    adj: null //存边
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
  GetEdge: function GetEdge() {
    this.adj = new Array();

    for (var i = 0; i < 11; i++) {
      this.adj[i] = new Array();

      for (var j = 0; j < 11; j++) {
        this.adj[i][j] = new Array();
      }
    } //每一个四元数组表示：坐标(a[0],a[1])的cell和坐标(a[2],a[3])的cell之间有条边


    var edge = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

    for (var i = 0; i < edge.length; i++) {
      this.adj[edge[i][0]][edge[i][1]].push([edge[i][2], edge[i][3]]);
      this.adj[edge[i][1]][edge[i][2]].push([edge[i][0], edge[i][1]]);
    }
  },
  onLoad: function onLoad() {
    var map_matrix = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1], [1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1], [1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1], [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1], [1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1], [1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1], [1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];
    map = new Array();

    for (var i = 0; i < 11; i++) {
      map[i] = new Array();

      for (var j = 0; j < 11; j++) {
        map[i][j] = null;

        if (map_matrix[i][j] == 1) {
          var newcell = cc.instantiate(this.cell);
          newcell.parent = this.node; //将cell节点加到map节点之下

          newcell.setPosition(this.basex + this.stepx * i, this.basey + this.stepy * j);
          map[i][j] = newcell;
        }
      }
    }

    this.GetEdge(); //建边
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcR2V0TWFwLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiYmFzZXgiLCJiYXNleSIsInN0ZXB4Iiwic3RlcHkiLCJjZWxsIiwidHlwZSIsIlByZWZhYiIsIm1hcCIsImFkaiIsIkdldEVkZ2UiLCJBcnJheSIsImkiLCJqIiwiZWRnZSIsImxlbmd0aCIsInB1c2giLCJvbkxvYWQiLCJtYXBfbWF0cml4IiwibmV3Y2VsbCIsImluc3RhbnRpYXRlIiwicGFyZW50Iiwibm9kZSIsInNldFBvc2l0aW9uIiwic3RhcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNkQyxJQUFBQSxLQUFLLEVBQUUsQ0FETztBQUVkQyxJQUFBQSxLQUFLLEVBQUUsQ0FGTztBQUdkQyxJQUFBQSxLQUFLLEVBQUUsQ0FITztBQUlkQyxJQUFBQSxLQUFLLEVBQUUsQ0FKTztBQUtkQyxJQUFBQSxJQUFJLEVBQUU7QUFDTCxpQkFBUyxJQURKO0FBRUxDLE1BQUFBLElBQUksRUFBRVQsRUFBRSxDQUFDVTtBQUZKLEtBTFE7QUFTZEMsSUFBQUEsR0FBRyxFQUFFLElBVFM7QUFTSDtBQUNYQyxJQUFBQSxHQUFHLEVBQUUsSUFWUyxDQVVIO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQXpCUSxHQUhQO0FBK0JMO0FBRUhDLEVBQUFBLE9BQU8sRUFBRSxtQkFBVztBQUNuQixTQUFLRCxHQUFMLEdBQVcsSUFBSUUsS0FBSixFQUFYOztBQUNBLFNBQUssSUFBSUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxFQUFwQixFQUF3QkEsQ0FBQyxFQUF6QixFQUE2QjtBQUM1QixXQUFLSCxHQUFMLENBQVNHLENBQVQsSUFBYyxJQUFJRCxLQUFKLEVBQWQ7O0FBQ0EsV0FBSyxJQUFJRSxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEVBQXBCLEVBQXdCQSxDQUFDLEVBQXpCLEVBQTZCO0FBQzNCLGFBQUtKLEdBQUwsQ0FBU0csQ0FBVCxFQUFZQyxDQUFaLElBQWlCLElBQUlGLEtBQUosRUFBakI7QUFDRDtBQUNELEtBUGtCLENBUW5COzs7QUFDQSxRQUFJRyxJQUFJLEdBQUcsQ0FDVixDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsQ0FEVSxFQUNJLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixDQURKLEVBQ2tCLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixDQURsQixFQUNnQyxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsQ0FEaEMsRUFFVixDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsQ0FGVSxFQUVJLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixDQUZKLEVBRWtCLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixDQUZsQixFQUVnQyxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsQ0FGaEMsRUFHVixDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsQ0FIVSxFQUdJLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixDQUhKLEVBR2tCLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixDQUhsQixFQUdnQyxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsQ0FIaEMsQ0FBWDs7QUFLQSxTQUFLLElBQUlGLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdFLElBQUksQ0FBQ0MsTUFBekIsRUFBaUNILENBQUMsRUFBbEMsRUFBc0M7QUFDckMsV0FBS0gsR0FBTCxDQUFTSyxJQUFJLENBQUNGLENBQUQsQ0FBSixDQUFRLENBQVIsQ0FBVCxFQUFxQkUsSUFBSSxDQUFDRixDQUFELENBQUosQ0FBUSxDQUFSLENBQXJCLEVBQWlDSSxJQUFqQyxDQUFzQyxDQUFDRixJQUFJLENBQUNGLENBQUQsQ0FBSixDQUFRLENBQVIsQ0FBRCxFQUFhRSxJQUFJLENBQUNGLENBQUQsQ0FBSixDQUFRLENBQVIsQ0FBYixDQUF0QztBQUNBLFdBQUtILEdBQUwsQ0FBU0ssSUFBSSxDQUFDRixDQUFELENBQUosQ0FBUSxDQUFSLENBQVQsRUFBcUJFLElBQUksQ0FBQ0YsQ0FBRCxDQUFKLENBQVEsQ0FBUixDQUFyQixFQUFpQ0ksSUFBakMsQ0FBc0MsQ0FBQ0YsSUFBSSxDQUFDRixDQUFELENBQUosQ0FBUSxDQUFSLENBQUQsRUFBYUUsSUFBSSxDQUFDRixDQUFELENBQUosQ0FBUSxDQUFSLENBQWIsQ0FBdEM7QUFDQTtBQUNELEdBbkRPO0FBcURMSyxFQUFBQSxNQXJESyxvQkFxREs7QUFDWixRQUFJQyxVQUFVLEdBQUcsQ0FDaEIsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQixDQUFyQixDQURnQixFQUVoQixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLENBRmdCLEVBR2hCLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsRUFBcUIsQ0FBckIsQ0FIZ0IsRUFJaEIsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQixDQUFyQixDQUpnQixFQUtoQixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLENBTGdCLEVBTWhCLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsRUFBcUIsQ0FBckIsQ0FOZ0IsRUFPaEIsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQixDQUFyQixDQVBnQixFQVFoQixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLENBUmdCLEVBU2hCLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsRUFBcUIsQ0FBckIsQ0FUZ0IsRUFVaEIsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQixDQUFyQixDQVZnQixFQVdoQixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLENBWGdCLENBQWpCO0FBYUFWLElBQUFBLEdBQUcsR0FBRyxJQUFJRyxLQUFKLEVBQU47O0FBQ0EsU0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEVBQXBCLEVBQXdCQSxDQUFDLEVBQXpCLEVBQTZCO0FBQzVCSixNQUFBQSxHQUFHLENBQUNJLENBQUQsQ0FBSCxHQUFTLElBQUlELEtBQUosRUFBVDs7QUFDQSxXQUFLLElBQUlFLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsRUFBcEIsRUFBd0JBLENBQUMsRUFBekIsRUFBNkI7QUFDNUJMLFFBQUFBLEdBQUcsQ0FBQ0ksQ0FBRCxDQUFILENBQU9DLENBQVAsSUFBWSxJQUFaOztBQUNBLFlBQUlLLFVBQVUsQ0FBQ04sQ0FBRCxDQUFWLENBQWNDLENBQWQsS0FBb0IsQ0FBeEIsRUFBMkI7QUFDMUIsY0FBSU0sT0FBTyxHQUFHdEIsRUFBRSxDQUFDdUIsV0FBSCxDQUFlLEtBQUtmLElBQXBCLENBQWQ7QUFDQWMsVUFBQUEsT0FBTyxDQUFDRSxNQUFSLEdBQWlCLEtBQUtDLElBQXRCLENBRjBCLENBRUU7O0FBQzVCSCxVQUFBQSxPQUFPLENBQUNJLFdBQVIsQ0FBb0IsS0FBS3RCLEtBQUwsR0FBVyxLQUFLRSxLQUFMLEdBQVdTLENBQTFDLEVBQTZDLEtBQUtWLEtBQUwsR0FBVyxLQUFLRSxLQUFMLEdBQVdTLENBQW5FO0FBQ0FMLFVBQUFBLEdBQUcsQ0FBQ0ksQ0FBRCxDQUFILENBQU9DLENBQVAsSUFBWU0sT0FBWjtBQUNBO0FBQ0Q7QUFDRDs7QUFDRCxTQUFLVCxPQUFMLEdBM0JZLENBMkJJO0FBQ2hCLEdBakZPO0FBbUZMYyxFQUFBQSxLQW5GSyxtQkFtRkksQ0FFUixDQXJGSSxDQXVGTDs7QUF2RkssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gY2MuQ2xhc3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG5cdFx0YmFzZXg6IDAsXHJcblx0XHRiYXNleTogMCxcclxuXHRcdHN0ZXB4OiAwLFxyXG5cdFx0c3RlcHk6IDAsXHJcblx0XHRjZWxsOiB7XHJcblx0XHRcdGRlZmF1bHQ6IG51bGwsXHJcblx0XHRcdHR5cGU6IGNjLlByZWZhYixcclxuXHRcdH0sXHJcblx0XHRtYXA6IG51bGwsIC8v5LqM57u05Zyw5Zu+XHJcblx0XHRhZGo6IG51bGwsIC8v5a2Y6L65XHJcbiAgICAgICAgLy8gZm9vOiB7XHJcbiAgICAgICAgLy8gICAgIC8vIEFUVFJJQlVURVM6XHJcbiAgICAgICAgLy8gICAgIGRlZmF1bHQ6IG51bGwsICAgICAgICAvLyBUaGUgZGVmYXVsdCB2YWx1ZSB3aWxsIGJlIHVzZWQgb25seSB3aGVuIHRoZSBjb21wb25lbnQgYXR0YWNoaW5nXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0byBhIG5vZGUgZm9yIHRoZSBmaXJzdCB0aW1lXHJcbiAgICAgICAgLy8gICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxyXG4gICAgICAgIC8vICAgICBzZXJpYWxpemFibGU6IHRydWUsICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxyXG4gICAgICAgIC8vIH0sXHJcbiAgICAgICAgLy8gYmFyOiB7XHJcbiAgICAgICAgLy8gICAgIGdldCAoKSB7XHJcbiAgICAgICAgLy8gICAgICAgICByZXR1cm4gdGhpcy5fYmFyO1xyXG4gICAgICAgIC8vICAgICB9LFxyXG4gICAgICAgIC8vICAgICBzZXQgKHZhbHVlKSB7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLl9iYXIgPSB2YWx1ZTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH0sXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG5cdFxyXG5cdEdldEVkZ2U6IGZ1bmN0aW9uKCkge1xyXG5cdFx0dGhpcy5hZGogPSBuZXcgQXJyYXkoKTtcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgMTE7IGkrKykge1xyXG5cdFx0XHR0aGlzLmFkaltpXSA9IG5ldyBBcnJheSgpO1xyXG5cdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IDExOyBqKyspIHtcclxuXHRcdFx0XHRcdHRoaXMuYWRqW2ldW2pdID0gbmV3IEFycmF5KCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdC8v5q+P5LiA5Liq5Zub5YWD5pWw57uE6KGo56S677ya5Z2Q5qCHKGFbMF0sYVsxXSnnmoRjZWxs5ZKM5Z2Q5qCHKGFbMl0sYVszXSnnmoRjZWxs5LmL6Ze05pyJ5p2h6L65XHJcblx0XHR2YXIgZWRnZSA9IFtcclxuXHRcdFx0WzAsIDAsIDAsIDBdLCBbMCwgMCwgMCwgMF0sIFswLCAwLCAwLCAwXSwgWzAsIDAsIDAsIDBdLCBcclxuXHRcdFx0WzAsIDAsIDAsIDBdLCBbMCwgMCwgMCwgMF0sIFswLCAwLCAwLCAwXSwgWzAsIDAsIDAsIDBdLCBcclxuXHRcdFx0WzAsIDAsIDAsIDBdLCBbMCwgMCwgMCwgMF0sIFswLCAwLCAwLCAwXSwgWzAsIDAsIDAsIDBdLCBcclxuXHRcdF07XHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGVkZ2UubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dGhpcy5hZGpbZWRnZVtpXVswXV1bZWRnZVtpXVsxXV0ucHVzaChbZWRnZVtpXVsyXSwgZWRnZVtpXVszXV0pO1xyXG5cdFx0XHR0aGlzLmFkaltlZGdlW2ldWzFdXVtlZGdlW2ldWzJdXS5wdXNoKFtlZGdlW2ldWzBdLCBlZGdlW2ldWzFdXSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHRcclxuICAgIG9uTG9hZCAoKSB7XHJcblx0XHR2YXIgbWFwX21hdHJpeCA9IFtcclxuXHRcdFx0WzEsMSwxLDEsMSwxLDEsMSwxLDEsMV0sXHJcblx0XHRcdFsxLDEsMCwwLDAsMSwwLDAsMCwxLDFdLFxyXG5cdFx0XHRbMSwwLDEsMCwwLDEsMCwwLDEsMCwxXSxcclxuXHRcdFx0WzEsMCwwLDEsMSwwLDEsMSwwLDAsMV0sXHJcblx0XHRcdFsxLDAsMCwxLDAsMCwwLDEsMCwwLDFdLFxyXG5cdFx0XHRbMSwxLDEsMSwxLDEsMSwxLDEsMSwxXSxcclxuXHRcdFx0WzEsMCwwLDEsMCwwLDAsMSwwLDAsMV0sXHJcblx0XHRcdFsxLDAsMCwxLDEsMCwxLDEsMCwwLDFdLFxyXG5cdFx0XHRbMSwwLDEsMCwwLDEsMCwwLDEsMCwxXSxcclxuXHRcdFx0WzEsMSwwLDAsMCwxLDAsMCwwLDEsMV0sXHJcblx0XHRcdFsxLDEsMSwxLDEsMSwxLDEsMSwxLDFdLFxyXG5cdFx0XTtcclxuXHRcdG1hcCA9IG5ldyBBcnJheSgpO1xyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAxMTsgaSsrKSB7XHJcblx0XHRcdG1hcFtpXSA9IG5ldyBBcnJheSgpO1xyXG5cdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IDExOyBqKyspIHtcclxuXHRcdFx0XHRtYXBbaV1bal0gPSBudWxsO1xyXG5cdFx0XHRcdGlmIChtYXBfbWF0cml4W2ldW2pdID09IDEpIHtcclxuXHRcdFx0XHRcdHZhciBuZXdjZWxsID0gY2MuaW5zdGFudGlhdGUodGhpcy5jZWxsKTtcclxuXHRcdFx0XHRcdG5ld2NlbGwucGFyZW50ID0gdGhpcy5ub2RlOyAvL+WwhmNlbGzoioLngrnliqDliLBtYXDoioLngrnkuYvkuItcclxuXHRcdFx0XHRcdG5ld2NlbGwuc2V0UG9zaXRpb24odGhpcy5iYXNleCt0aGlzLnN0ZXB4KmksIHRoaXMuYmFzZXkrdGhpcy5zdGVweSpqKTtcclxuXHRcdFx0XHRcdG1hcFtpXVtqXSA9IG5ld2NlbGw7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHR0aGlzLkdldEVkZ2UoKTsgLy/lu7rovrlcclxuXHR9LFxyXG5cclxuICAgIHN0YXJ0ICgpIHtcclxuXHRcdFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcclxufSk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4iXX0=
//------QC-SOURCE-SPLIT------
