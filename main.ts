import { thingsBase } from "./base/base";
import { rareness_type, IThing, thing_type } from "./model/IThing";
import { getRandomInt } from "./helpers/randomHelp"

const PACK_SIZE = 5;

const RARENESS_TYPES: rareness_type[] = ['COMMON', 'UNCOMMON', 'RARE', 'LEGENDARY'];
const RARENESS_TYPES_COUNT = RARENESS_TYPES.length;

const THING_TYPES: thing_type[] = ['WEAPON', 'HELMET', 'ARMOR', 'SHIELD']
const THING_TYPES_COUNT = THING_TYPES.length;

type busterpack_type = 'COMMON_PACK' | 'CONSISTENT_PACK'

const defineLuckyLevel = () => {
  const random  = Math.random();

  if (random < 0.001) {
    return 3;
  } else if (random < 0.011) {
    return 2;
  } else if (random < 0.111) {
    return 1;
  }

  return 0;
}

const getNewThing = (rarenessLevel: number, availableThingTypes: thing_type[], busterType: busterpack_type):IThing => {
  const rareness: rareness_type = RARENESS_TYPES[rarenessLevel]
  let thingType: thing_type;

  if (busterType === 'CONSISTENT_PACK') {
    const thingTypesCount: number = availableThingTypes.length;

    thingType = availableThingTypes[getRandomInt(thingTypesCount)]
  } else {
    thingType = THING_TYPES[getRandomInt(THING_TYPES_COUNT)]
  }
  

  const thingTypeValues = thingsBase[thingType];
  const thingNamesCount:number = thingTypeValues[rareness].length
  const name: string = thingTypeValues[rareness][getRandomInt(thingNamesCount)]

  return {
    name,
    rareness,
    thingType
  }
}

const getNewRarenessLevel = (currentRarenessLevel: number):number => {
  const raiseRareness:number = defineLuckyLevel();
  let rarenessLevel:number = raiseRareness + currentRarenessLevel;

  if (rarenessLevel >= RARENESS_TYPES_COUNT) {
    rarenessLevel = RARENESS_TYPES_COUNT - 1;
  } else if (rarenessLevel < 0) {
    rarenessLevel = 0;
  }

  return rarenessLevel;
}

const boosterPackOpen = (rarenessType: rareness_type, busterType: busterpack_type) => {
  const things: IThing[] = [];
  const rarenessLevel:number = RARENESS_TYPES.indexOf(rarenessType);
  const availableThingTypes:thing_type[] = THING_TYPES.concat(THING_TYPES);
  let currentThing: IThing;

  for( let i = 1; i <= PACK_SIZE; i++){
    let currentRarenessLevel = rarenessLevel;

    if (i%2 !== 0) {
      currentRarenessLevel -= 1;
    }
    
    currentRarenessLevel = getNewRarenessLevel(currentRarenessLevel);    

    currentThing = getNewThing(currentRarenessLevel, availableThingTypes, busterType);

    things.push( currentThing );
    availableThingTypes.splice(availableThingTypes.indexOf(currentThing.thingType, 0), 1);
  }

  return things;
}

console.log(boosterPackOpen('LEGENDARY', 'CONSISTENT_PACK'));