//pokemon types
const types = ['fire', 'grass', 'water', 'electric', 'ground']


//constants for damage calculation
const RANDOMMIN = 0.85;
const RANDOMMAX = 1;
const CRITMIN = 0;
const CRITMAX = 255;
const LEVEL = 5;

//attacks
const tackle = {name: 'Tackle', power: 40, type: 'normal', cat: 'normal'}
const scratch = {name: "Scratch", power: 40, type: 'normal', cat:'normal'}
const tail_whip = {name : 'Tail Whip', power: 6, type: 'normal', cat: 'normal'}
const ember = {name: 'Ember', power: 40, type: 'fire', cat: 'special'}
const bubble = {name: 'Bubble', power: 40, type: 'water', cat: 'special'}
const vine_whip = {name: 'Vine Whip', power: 45, type: 'grass', cat: 'special'}
const thunder_shock = {name: 'Thunder Shock', power: 40, type: 'electric', cat: 'special'}
const bone_club = {name: 'Bone Club', power: 65, type: 'ground', cat: 'special'}

const Charmander = {
	name: 'Charmander',
	hp: 39,
	type: types[0],
	attack: 52,
	defense: 43,
	sp_atk: 60,
	sp_def: 50,
	speed: 65,
	actions: [scratch, ember]
}

const Squirtle = {
	name: 'Squirtle',
	hp: 44,
	type: types[2],
	attack: 48,
	defense: 65,
	sp_atk: 50,
	sp_def: 64,
	speed: 43,
	actions: [tackle, bubble]
}

const Bulbasaur = {
	name: 'Bulbasaur',
	hp: 45,
	type: types[1],
	attack: 49,
	defense: 49,
	sp_atk: 65,
	sp_def: 65,
	speed: 45,
	actions: [tackle, vine_whip]
}

const Pikachu = {
	name: 'Pikachu',
	hp: 35,
	type: types[3],
	attack: 55,
	defense: 30,
	sp_atk: 50,
	sp_def: 40,
	speed: 90,
	actions: [tackle, thunder_shock]
}

const Cubone = {
	name: 'Cubone',
	hp: 50,
	type: types[4],
	attack: 50,
	defense: 95,
	sp_atk: 40,
	sp_def: 50,
	speed: 35,
	actions:[tackle, bone_club]
}

const pokemonList = [Charmander, Squirtle, Bulbasaur, Pikachu, Cubone];

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
	return pokemonList[Math.floor(Math.random() * pokemonList.length)];
}

function broadcast(action, attacker, defender){
	console.log(`${attacker.name} used ${action.name} on ${defender.name}`);
	return
}

let player1 = [selectRandomPokemon(pokemonList)];
let player2 = [selectRandomPokemon(pokemonList)];


function playGame(){
	console.log(`Red uses ${player1[0].name} \nBlue uses ${player2[0].name} \n`);

	let attacker;
	let defender;

	if(player1[0].speed > player2[0].speed){
		attacker = player1;
		defender = player2;
	}
	else {
		attacker = player2;
		defender = player1;
	}

	while(player1.length != 0 && player2.length != 0){
		let action = selectAction(attacker[0]);

		broadcast(action, attacker[0], defender[0]);

		let damage = calculateDamage(action, attacker[0], defender[0]);

		console.log(`it did ${damage} damage to ${defender[0].name}`, '\n');

		defender[0].hp = defender[0].hp - damage;

		console.log(`${player1[0].name} hp: ${player1[0].hp} , ${player2[0].name} hp: ${player2[0].hp} \n`)

		if(checkForKO(defender[0])) defender.pop();

		if(attacker === player1){
			attacker = player2;
			defender = player1;
		}
		else{
			attacker = player1;
			defender = player2;
		}
	}
	return (player1.length === 0) ? 'Blue wins!' : 'Red wins!'
}

console.log(playGame());


