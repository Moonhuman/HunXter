

cc.Class({
    extends: cc.Component,

    properties: {
       tabpersons:null,
    },

    // LIFE-CYCLE CALLBACKS:

   onLoad () {
	   this.node.active=false;
	   this.tabpersons=new Array();
	   this.tabpersons.push(cc.find("Persons/Person1",this.node));
	   this.tabpersons.push(cc.find("Persons/Person2",this.node));
	   this.tabpersons.push(cc.find("Persons/Person3",this.node));
	   this.tabpersons.push(cc.find("Persons/Person4",this.node));
	   console.log(this.tabpersons);
   },

    start () {
	  
	   
    },
	showTab(){
		for (var i=0;i<window.global.persons.length;i++){
			var nowTabPerson=window.global.persons[i].getComponent('Person');
			console.log(this.tabpersons[i]);
			if (this.tabpersons[i]==undefined)
				break;
			this.tabpersons[i].getChildByName("blood").getComponent(cc.Label).string= nowTabPerson.blood;
			this.tabpersons[i].getChildByName("mobility").getComponent(cc.Label).string= nowTabPerson.mobility;
			//cc.find("Persons/Person"+i,this.node).getChildByName("mobility").getComponent(cc.Label).blood.string= nowTabPerson.property.mobility;
		}
	},
    // update (dt) {},
});


function XX(realNode,tabNode){
	this.property=realNode.getComponent('Person');
	this.blood=tabNode.getChildByName("blood").getComponent(cc.Label);
	this.mobility=tabNode.getChildByName("mobility").getComponent(cc.Label);
	return this;
}