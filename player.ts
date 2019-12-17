import { BoosterPackContainer, boosterpack_type } from "./main";
import { rareness_type } from "./model/IThing";

export class Player {
  private inventory: string[];
  private boosterPackContainer: BoosterPackContainer;
  private openedBoosters: number;

  constructor(rareness: rareness_type, boosterType: boosterpack_type ) {
    this.inventory = [];
    this.boosterPackContainer = new BoosterPackContainer(rareness, boosterType);
    this.openedBoosters = 0;
  }

  public openBoosters(count: number) {
    for (let i = 0; i < count; i++) {
      
      let fairOpen = false;
      if (this.boosterPackContainer.type === 'FAIR_PACK' && this.openedBoosters % 3 === 0) {
        fairOpen = true;
      }
      this.boosterPackContainer.open(fairOpen);
      this.openedBoosters++;
    }
    this.inventory = this.boosterPackContainer.getThings()
  }

  public getInventory() {
    console.log(this.inventory);
    
    return this.inventory;
  }

}

const player = new Player('RARE','FAIR_PACK');
player.openBoosters(4);
player.getInventory();