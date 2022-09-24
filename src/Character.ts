import Race, { Dwarf } from './Races';
import Archetype, { Ranger } from './Archetypes';
import Energy from './Energy';
import Fighter from './Fighter';

const randomLevel = (minLevel: number, maxLevel: number): number => {
  const min = Math.ceil(minLevel);
  const max = Math.floor(maxLevel);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default class Character {
  private _race: Race;
  private _archetype: Archetype;
  private _maxLifePoints: number;
  private _lifePoints: number;
  private _strength: number;
  private _defense: number;
  private _dexterity: number;
  private _energy: Energy;

  constructor(name: string) {
    this._archetype = new Ranger(name);
    this._strength = randomLevel(1, 10);
    this._defense = randomLevel(1, 10);
    this._dexterity = randomLevel(1, 10);
    this._race = new Dwarf(name, this._dexterity);
    this._maxLifePoints = this._race.maxLifePoints / 2;
    this._lifePoints = this._maxLifePoints;
    this._energy = {
      type_: this._archetype.energyType,
      amount: randomLevel(1, 10),
    };
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
    return {
      type_: this._energy.type_,
      amount: this._energy.amount,
    };
  }

  receiveDamage(attackPoints: number): number {
    const receivedDamage = attackPoints - this._defense;
    if (receivedDamage > 0) {
      this._lifePoints -= receivedDamage;
    }
    if (this._lifePoints <= 0) {
      this._lifePoints = -1;
    }
    return this._lifePoints;
  }

  levelUp(): void {
    this._maxLifePoints += randomLevel(1, 10);
    this._strength += randomLevel(1, 10);
    this._dexterity += randomLevel(1, 10);
    this._defense += randomLevel(1, 10);
    this._energy.amount = 10;

    if (this._maxLifePoints > this._race.maxLifePoints) {
      this._maxLifePoints = this._race.maxLifePoints;
    }
    this._lifePoints = this._maxLifePoints;
  }

  attack(enemy: Fighter): void {
    const attackPoints = this._strength;
    enemy.receiveDamage(attackPoints);
  }
}