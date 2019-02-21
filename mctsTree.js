import MCTSNode from './mctsNode';

const numNodes = 500;
const exploreFaction = 2;

function UCB(node){
    let wins = node.wins;
    let parentVisits = node.parent.visits;
    let currentVisits = node.visits;
    
    wins = wins / currentVisits;

    return wins + (.05 * Math.sqrt( (2 * Math.log(parentVisits) ) / currentVisits))
}

function traverseNodes(node){
	if(node.untriedActions.length != 0){
		return expandTree(node);
	}

	let bestNode;
	let bestScore = -Infinity;
	let winRates = [];

	node.childNodes.forEach( node => {
		if(UCB(node) > bestScore) bestNode = node;
	});

	return bestNode;
}

function expandTree(node, moveList){
	if(node.untriedActions === 0) return node;

	let action = node.untriedActions.pop();
	let newNode = new MCTSNode(parent = node, parentAction = action, actionList = moveList);

	return newNode;

}

function backPropagate(node, result){
	while(node.parent != null){
		node.visits++;
		node.wins = node.wins + result;
		node = node.parent;
	}
	node.visits++;
	node.wins = node.wins + result;
	return;
}

function selectAction(actions){
	return actions[Math.floor(Math.random() * actions.length)];
}

function rollOut(player1, player2, game){
	const winner = game(player1, player2);
	return (winner.name === "Blue") ?  1 : -1 
}

export function think(player1, player2, game){
	player1.strategy = selectAction;
	let rootNode = new MCTSNode(null, null, player1.pokemon[0].actions);

	for(let i = 0; i < 20; i++){
		
	    let	node = traverseNodes(rootNode);
	    let result = rollOut(player1, player2, game);
	    backPropagate(node, result);
	}

	return rootNode.childNodes.reduce((acc, node) => { (max.wins / max.visits) > (node.wins / node.visits) ? max : game });
}