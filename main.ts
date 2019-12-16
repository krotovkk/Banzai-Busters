import { thingsBase } from "./base/base";
import { rareness_type, IThing, thing_type } from "./model/IThing";

const PACK_SIZE = 5;

const RARENESS_TYPES: rareness_type[] = ['COMMON', 'UNCOMMON', 'RARE', 'LEGENDARY'];
const RARENESS_TYPES_COUNT = RARENESS_TYPES.length;

const THING_TYPES: thing_type[] = ['WEAPON', 'HELMET', 'ARMOR', 'SHIELD']
const THING_TYPES_COUNT = THING_TYPES.length;

export const getRandomInt = (max: number) => Math.floor(Math.random() * Math.floor(max));

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

const boosterPackOpen = (rarenessType: rareness_type) => {
  const things: IThing[] = [];
  const rarenessIndex:number = RARENESS_TYPES.indexOf(rarenessType);

  for( let i = 1; i <= PACK_SIZE; i++){
    const raiseRareness:number = defineLuckyLevel();
    let newRarenessIndex:number = raiseRareness + rarenessIndex;

    if (i%2 !== 0) {
      newRarenessIndex -= 1;
    }
    
    if (newRarenessIndex >= RARENESS_TYPES_COUNT) {
      newRarenessIndex = RARENESS_TYPES_COUNT - 1;
    } else if (newRarenessIndex < 0) {
      newRarenessIndex = 0;
    }

    const rareness: rareness_type = RARENESS_TYPES[newRarenessIndex]
    
    const thingType: thing_type = THING_TYPES[getRandomInt(THING_TYPES_COUNT)]

    const thingTypeValues = thingsBase[thingType];
    const thingNamesCount:number = thingTypeValues[rareness].length
    const thingName: string = thingTypeValues[rareness][getRandomInt(thingNamesCount)]

    things.push({
      name: thingName,
      rareness,
      thingType
    })
    
  }

  return things;
}

console.log(boosterPackOpen('LEGENDARY'));