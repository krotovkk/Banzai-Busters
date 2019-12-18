import { BoosterPackContainer, boosterpack_type } from "./boosterpack";
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
      if (this.boosterPackContainer.type === 'FAIR_PACK' && this.openedBoosters % 3 === 0 && this.openedBoosters < 24) {
        fairOpen = true;
      }
      this.boosterPackContainer.open(fairOpen);
      this.openedBoosters++;
    }
    this.inventory = this.boosterPackContainer.getThings()
  }

  public getInventory() {    
    return this.inventory;
  }

  public setBoosterPackType(type:boosterpack_type) {
    this.boosterPackContainer.setBoosterPackType(type);
  }

  public clearInventory() {
    this.inventory = [];
    this.boosterPackContainer.clearThings()
  }
}
