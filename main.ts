import { Player } from "./player";


// First Task Demo
const player = new Player('RARE','COMMON_PACK');
player.openBoosters(1);
console.log("Common pack open!\n", player.getInventory());
player.clearInventory()

// Second Task Demo

player.setBoosterPackType('CONSISTENT_PACK');
player.openBoosters(1);
console.log("Consitent pack open", player.getInventory());
player.clearInventory();


// Third Task Demo

player.setBoosterPackType('FAIR_PACK');
player.openBoosters(30);
console.log("Fair pack open", player.getInventory());
player.clearInventory();