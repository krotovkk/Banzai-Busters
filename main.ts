import { IThing, rareness_type, thing_type } from "./model/IThing";
import { getRandomInt } from "./helpers/randomHelp";
import { thingsBase } from "./base/base";

const RARENESS_TYPES: rareness_type[] = ['COMMON', 'UNCOMMON', 'RARE', 'LEGENDARY'];
const RARENESS_TYPES_COUNT = RARENESS_TYPES.length;

const THING_TYPES: thing_type[] = ['WEAPON', 'HELMET', 'ARMOR', 'SHIELD']
const THING_TYPES_COUNT = THING_TYPES.length;

type boosterpack_type = 'COMMON_PACK' | 'CONSISTENT_PACK'

class BoosterPack {
  private things: IThing[];
  private rareness: rareness_type;
  private size: number;
  private type: boosterpack_type;
  private availableThingTypes: thing_type[];

  constructor(rareness: rareness_type, type: boosterpack_type) {
    this.rareness = rareness;
    this.type = type;
    this.things = [];
    this.size = 5;
    if (this.type === 'CONSISTENT_PACK') {
      this.availableThingTypes = THING_TYPES.concat(THING_TYPES);
    }
  }

  private getNewThing(rarenessLevel: number) {
    const rareness: rareness_type = RARENESS_TYPES[rarenessLevel]
    let thingType: thing_type;

    if (this.type === 'CONSISTENT_PACK') {
      const thingTypesCount: number = this.availableThingTypes.length;

      thingType = this.availableThingTypes[getRandomInt(thingTypesCount)]
    } else {
      thingType = THING_TYPES[getRandomInt(THING_TYPES_COUNT)]
    }


    const thingTypeValues = thingsBase[thingType];
    const thingNamesCount: number = thingTypeValues[rareness].length
    const name: string = thingTypeValues[rareness][getRandomInt(thingNamesCount)]

    return {
      name,
      rareness,
      thingType
    }
  }

  private defineLuckyLevel() {
    const random = Math.random();

    if (random < 0.001) {
      return 3;
    } else if (random < 0.011) {
      return 2;
    } else if (random < 0.111) {
      return 1;
    }

    return 0;
  }

  private getNewRarenessLevel(currentRarenessLevel: number): number {
    const raiseRareness: number = this.defineLuckyLevel();
    let rarenessLevel: number = raiseRareness + currentRarenessLevel;

    if (rarenessLevel >= RARENESS_TYPES_COUNT) {
      rarenessLevel = RARENESS_TYPES_COUNT - 1;
    } else if (rarenessLevel < 0) {
      rarenessLevel = 0;
    }

    return rarenessLevel;
  }

  public open(): IThing[] {
    const rarenessLevel: number = RARENESS_TYPES.indexOf(this.rareness);
    let currentThing: IThing;

    for (let i = 1; i <= this.size; i++) {
      let currentRarenessLevel = rarenessLevel;

      if (i % 2 !== 0) {
        currentRarenessLevel -= 1;
      }

      currentRarenessLevel = this.getNewRarenessLevel(currentRarenessLevel);

      currentThing = this.getNewThing(currentRarenessLevel);

      this.things.push(currentThing);
      this.availableThingTypes.splice(this.availableThingTypes.indexOf(currentThing.thingType, 0), 1);
    }

    return this.things
  }
}

const booster = new BoosterPack('LEGENDARY', 'CONSISTENT_PACK');

console.log(booster.open())