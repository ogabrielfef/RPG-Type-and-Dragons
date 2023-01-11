import Archetype, { Mage } from './Archetypes';
import Energy from './Energy';
import Fighter from './Fighter';
import Race, { Elf } from './Races';
import getRandomInt from './utils';

class Character implements Fighter {
  private _race: Race;
  private _archetype: Archetype;
  private _maxLifePoints: number;
  private _lifePoints: number;
  private _strength: number;
  private _defense: number;
  private _dexterity: number;
  private _energy: Energy;
  private _name;

  constructor(name: string) {
    this._dexterity = getRandomInt(1, 10);
    this._race = new Elf(name, this._dexterity);
    this._archetype = new Mage(name);
    this._maxLifePoints = this._race.maxLifePoints / 2;
    this._lifePoints = this._maxLifePoints;
    this._strength = getRandomInt(1, 10);
    this._defense = getRandomInt(1, 10);
    this._energy = {
      type_: this._archetype.energyType,
      amount: getRandomInt(1, 10),
    };
    this._name = name;
  }

  get race(): Race {
    return this._race;
  }
  
  get archetype(): Archetype {
    return this._archetype;
  }
  
  get lifePoints(): number {
    return this._lifePoints;
  }

  get strength(): number {
    return this._strength;
  }

  get defense(): number {
    return this._defense;
  }
  
  get dexterity(): number {
    return this._dexterity;
  }
  
  get energy(): Energy {
    return { ...this._energy };
  }

  receiveDamage(attackPoints: number): number {
    let damage = attackPoints - this._defense;
    if (damage > 0) damage = attackPoints - this._defense;
    else damage = 0;
    this._lifePoints -= damage;
    if (this._lifePoints <= 0) this._lifePoints = -1;
    return this._lifePoints;
  }

  attack(enemy: Fighter): void {
    enemy.receiveDamage(this.strength);
  }

  levelUp(): void {
    const value = getRandomInt(1, 10);
    this._maxLifePoints += value;
    this._strength += value;
    this._dexterity += value;
    this._defense += value;
    this._energy.amount = 10;
    if (this._maxLifePoints > this._race.maxLifePoints) {
      this._maxLifePoints = this._race.maxLifePoints;
    }
    this._lifePoints = this._maxLifePoints;
  }
}

export default Character;