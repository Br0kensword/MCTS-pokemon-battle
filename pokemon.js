export const types = ['fire', 'grass', 'water', 'electric', 'ground'];

export class Pokemon {
	constructor({ name, hp, type, attack, defense, sp_atk, sp_def, speed, actions }){
		this.name = name;
		this.hp = hp;
		this.type = type;
		this.attack = attack;
		this.defense = defense;
		this.sp_atk = sp_atk;
		this.sp_def = sp_def;
		this.speed = speed;
		this.actions = actions
	}
}

//attacks
const tackle = {name: 'Tackle', power: 40, type: 'normal', cat: 'normal'}
const scratch = {name: "Scratch", power: 40, type: 'normal', cat:'normal'}
const tail_whip = {name : 'Tail Whip', power: 40, type: 'normal', cat: 'normal'}
const ember = {name: 'Ember', power: 40, type: 'fire', cat: 'special'}
const bubble = {name: 'Bubble', power: 40, type: 'water', cat: 'special'}
const vine_whip = {name: 'Vine Whip', power: 40, type: 'grass', cat: 'special'}
const thunder_shock = {name: 'Thunder Shock', power: 40, type: 'electric', cat: 'special'}
const bone_club = {name: 'Bone Club', power: 40, type: 'ground', cat: 'special'}

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

export const pokemonList = [Charmander,Squirtle, Bulbasaur, Pikachu, Cubone];

export default Pokemon;



