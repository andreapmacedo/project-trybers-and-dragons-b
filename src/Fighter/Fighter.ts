// export type EnergyType = 'mana' | 'stamina';
import Energy from '../Energy';
 
export default interface Fighter {
  energy?: Energy;
  lifePoints: number;
  strength: number;
  defense: number;

  attack(enemy: Fighter): void;
  special?(enemy: Fighter): void;
  levelUp(): void;
  receiveDamage(amount: number): number;

}