
class MCTSNode {
	constructor(parent=null, parentAction=null, actionList=[]){
		this.parent = parent;
		this.parentAction = parentAction;
		this.actionList = actionList;
		this.childNodes = [];
		this.untriedActions = actionList;
		this.wins = 0;
		this.visits = 0;
	}

	winRate() => {
		return 100 * (this.wins / this.visits);
	}

	treeToString(horizion=1, indent=0) => {
		let tree = "";
		for(let i = 0; i < indent, i++){
			tree = tree + '| ' + this.winRate();
		}
		if(horizion > 0){
			childNodes.forEach( node => return tree = tree +  treeToString(horizion - 1, indent + 1))
		}
		return tree;
	}
}

export default MCTSNode;