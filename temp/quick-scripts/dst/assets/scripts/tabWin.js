
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
cc._RF.push(module, 'abe8cdpJbpEaqV6KstFP9T4', 'tabWin');
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