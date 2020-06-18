// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        title:null,
		content:null,//内容
		btnOk:null,//确认按钮
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
		this.title=this.node.getChildByName('title');
		this.content=this.node.getChildByName('content');
		this.btnOk=this.node.getChildByName('okBtn');
		this.node.active = false;
	},

    start () {

    },
	hiddenMyself:function(){
		console.log('xxx');
		console.log(this.node);
		this.node.actice=false;
		this.node.emit('roll-dice-done','1');
	},
    // update (dt) {},
});
