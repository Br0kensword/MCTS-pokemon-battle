import { Pokemon, types, pokemonList } from './pokemon';



//constants for damage calculation
const RANDOMMIN = 0.85;
const RANDOMMAX = 1;
const CRITMIN = 0;
const CRITMAX = 255;
const LEVEL = 5;


function calculateTypeBonus(attacker, defender){
	let bonusMatrix = [[1,2,0.5,1,1],
					  [0.5,1,2,1,1],
					  [2,0.5,1,1,1],
					  [1,1,2,1,0.5],
					  [1,1,0.5,2,1]]

	return bonusMatrix[types.indexOf(attacker)][types.indexOf(defender)]
}

function generateRandomModifier(){
	return Math.random() * (RANDOMMAX - RANDOMMIN) + RANDOMMIN;
}

function generateCriticalHitBonus(){
	let critThreshold = Math.floor(Math.random() * (CRITMAX - CRITMIN + 1)) + CRITMIN;
	let attackerCritNum = Math.floor(Math.random() * (CRITMAX - CRITMIN + 1)) + CRITMIN;

	return (attackerCritNum < critThreshold) ? 2 : 1
}

function calculateDamage(action, attacker, defender) {
	let attack_stat = attacker.attack;
	let defense_stat = defender.defense;
	let level = LEVEL;
	let critical = generateCriticalHitBonus();
	let random = generateRandomModifier();
	let typeBonus = 1;

	if(action.cat === 'special'){
		attack_stat = attacker.sp_atk;
		defense_stat = defender.sp_def;
		typeBonus = calculateTypeBonus(attacker.type, defender.type); 
	}
	
	let mod =  critical * random * typeBonus;

	if(critical === 2) {console.log('Critical Hit!!!!!')};

	return Math.floor(((((((2 * level) / 5 ) + 2 ) * action.power * ( attack_stat / defense_stat )) / 50) + 2) * mod);
}

function checkForKO(pokemon){
	return (pokemon.hp <= 0) ? true : false;
}

function selectAction(pokemon){
	return pokemon.actions[Math.floor(Math.random() * pokemon.actions.length)];
}

function selectRandomPokemon(pokemonList){
	return new Pokemon(pokemonList[Math.floor(Math.random() * pokemonList.length)]);
}

function broadcast(action, attacker, defender){
	console.log(`${attacker.name} used ${action.name} on ${defender.name}`);
	return
}

let player1 = {
	name: 'Red',
	pokemon: [selectRandomPokemon(pokemonList)],
	strategy: selectAction			
};
let player2 = {
	name: 'Blue',
	pokemon: [selectRandomPokemon(pokemonList)],
	strategy: selectAction
};


console.log(`Red uses ${player1.pokemon[0].name} \nBlue uses ${player2.pokemon[0].name} \n`);


function setInitative(player1, player2){
	return (player1.pokemon[0].speed > player2.pokemon[0].speed) ? [player1, player2] : [player2, player1];
}

function game(attacker, defender){
	while(attacker.pokemon.length != 0 && defender.pokemon.length != 0){
		let action = attacker.strategy(attacker.pokemon[0]);

		broadcast(action, attacker.pokemon[0], defender.pokemon[0]);

		let damage = calculateDamage(action, attacker.pokemon[0], defender.pokemon[0]);

		console.log(`it did ${damage} damage to ${defender.pokemon[0].name}`, '\n');

		defender.pokemon[0].hp = defender.pokemon[0].hp - damage;

		console.log(`${attacker.pokemon[0].name} hp: ${attacker.pokemon[0].hp} , ${defender.pokemon[0].name} hp: ${defender.pokemon[0].hp} \n`)

		if(checkForKO(defender.pokemon[0])) defender.pokemon.pop();

		let temp = attacker;
		attacker = defender
		defender = temp;

	}
	return (attacker.pokemon.length === 0) ? attacker : defender
}

function announceWinner(winner){
	return `${winner.name} wins!!!`;
}


let playerOrder = setInitative(player1, player2);

console.log(announceWinner(game(playerOrder[0], playerOrder[1])));


