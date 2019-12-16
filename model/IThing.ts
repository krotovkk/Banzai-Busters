type rareness_type = 'COMMON' | 'UNCOMMON' | 'RARE' | 'LEGENDARY'
type thing_type = 'WEAPON' | 'HELMET' | 'ARMOR' | 'SHIELD'

export interface IThing {
  name: string,
  rareness: rareness_type,
  type: thing_type
}