// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
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
        deck:[cc.Integer],
        role: null,
    },
    addCard:function(cardID){
        deck.push(cardID);
    },
	
    cardDetail:function(){
        var node=cc.instantiate(this);
        node.name="card_detail";
        node.scaleX=1,node.scaleY=1;
        node.setPosition(0,0);
        node.parent=cc.find("Canvas");
    },
    closeDetail:function(){
        cc.find("Canvas/card_detail").destroy();
    },
    showCards:function(){
        var isPlayCard=(cc.find("Canvas").getComponent("globalGame").nowStep==3);
        for (var i=0;i<this.deck.length;++i){
            var cardID=this.deck[i];
            var node=cc.instantiate(window.global.cardnode[cardID]);
            node.scaleX=0.4,node.scaleY=0.4;
            node.setPosition(200+i*200,0);
            node.parent=this.node;
            node.on("mouseenter",this.cardDetail,node);
            node.on("mouseleave",this.closeDetail,node);
        }
    },
	closeCards:function(){
		var children=this.node.children;
		for (var i=0;i<children.length;++i)
			children[i].destroy();
		this.node.off("mousedown",this.closeCards,this);
		this.node.on("mousedown",this.initDeck,this);
    },
    initDeck:function(){
		this.role=cc.find("Canvas").getComponent("globalGame").nowPlayer;
		this.deck=this.role.getComponent("Person").cards;
        this.showCards();
        this.node.off("mousedown",this.initDeck,this);
        this.node.on("mousedown",this.closeCards,this);
    },
    onLoad () {
        
    },

    start () {
		this.node.on("mousedown",this.initDeck,this);
    },

    // update (dt) {},
});
