import { IThing, rareness_type, thing_type } from "./model/IThing";
import { getRandomInt } from "./helpers/randomHelp";
import { thingsBase } from "./base/base";

const RARENESS_TYPES: rareness_type[] = ['COMMON', 'UNCOMMON', 'RARE', 'LEGENDARY'];
const RARENESS_TYPES_COUNT = RARENESS_TYPES.length;

const THING_TYPES: thing_type[] = ['WEAPON', 'HELMET', 'ARMOR', 'SHIELD']
const THING_TYPES_COUNT = THING_TYPES.length;

export type boosterpack_type = 'COMMON_PACK' | 'CONSISTENT_PACK' | 'FAIR_PACK'

export class BoosterPackContainer {
  private things: string[];
  private rareness: rareness_type;
  private size: number;
  private availableThingTypes: thing_type[];
  private rarenessLevel: number;
  private xRarenessThings: string[];

  public type: boosterpack_type;

  constructor(rareness: rareness_type, type: boosterpack_type) {
    this.rareness = rareness;
    this.rarenessLevel = RARENESS_TYPES.indexOf(this.rareness);
    this.type = type;
    this.things = [];
    this.size = 5;

    if (this.type === 'CONSISTENT_PACK') {
      this.availableThingTypes = THING_TYPES.concat(THING_TYPES);
    } else if (this.type === 'FAIR_PACK') {
      this.getAllXRarenessThings();
    }
  }

  private getAllXRarenessThings() {
    if (!this.xRarenessThings) {
      this.xRarenessThings = [];
    }
    for (let thingType in thingsBase){
      this.xRarenessThings = this.xRarenessThings.concat(thingsBase[thingType][this.rareness]);
    }
  }

  private getNewThing(rarenessLevel: number) {
    const rareness: rareness_type = RARENESS_TYPES[rarenessLevel]
    let thingType: thing_type;

    if (this.type === 'CONSISTENT_PACK') {
      const thingTypesCount: number = this.availableThingTypes.length;

      thingType = this.availableThingTypes[getRandomInt(thingTypesCount)];
      this.availableThingTypes.splice(this.availableThingTypes.indexOf(thingType, 0), 1);
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

  private getNextXRarenessThing() {
    let index = getRandomInt(this.xRarenessThings.length);
    let nextThing = this.xRarenessThings[index];

    this.xRarenessThings.splice(index, 1);
    return nextThing
  }

  public open(fairOpen?: boolean): string[] {
    let currentThing: IThing;

    for (let i = 1; i <= this.size; i++) {
      let currentRarenessLevel = this.rarenessLevel;
      
      if (this.type === 'FAIR_PACK' && fairOpen) {
        this.things.push( this.getNextXRarenessThing() );
        fairOpen = false;
        continue;
      }

      if (i % 2 !== 0) {
        currentRarenessLevel -= 1;
      }

      currentRarenessLevel = this.getNewRarenessLevel(currentRarenessLevel);
    
      currentThing = this.getNewThing(currentRarenessLevel);

      this.things.push(currentThing.name);
    }

    return this.things
  }

  public getThings() {
    return this.things;
  }
}

// const booster = new BoosterPackContainer('LEGENDARY', 'FAIR_PACK');

// console.log(booster.open(true))