import { amulets } from './amulets';
import { belts } from './belts';
import { boots } from './boots';
import { chest } from './chest';
import { earrings } from './earrings';
import { gloves } from './gloves';
import { head } from './head';
import { legs } from './legs';
import { materials } from './materials';
import { mounts } from './mounts';
import { necklaces } from './necklaces';
import { offHand } from './offHand';
import { pets } from './pets';
import { resistances } from './resistances';
import { specials } from './specials';
import { spiritStones } from './spiritStones';
import { weapons1h } from './weapons1h';
import { weapons2h } from './weapons2h';

export { amulets } from './amulets';
export { belts } from './belts';
export { boots } from './boots';
export { chest } from './chest';
export { earrings } from './earrings';
export { gloves } from './gloves';
export { head } from './head';
export { legs } from './legs';
export { materials } from './materials';
export { mounts } from './mounts';
export { necklaces } from './necklaces';
export { offHand } from './offHand';
export { pets } from './pets';
export { resistances } from './resistances';
export { specials } from './specials';
export { spiritStones } from './spiritStones';
export { weapons1h } from './weapons1h';
export { weapons2h } from './weapons2h';

export const ITEMS = {
  ...weapons1h,
  ...weapons2h,
  ...offHand,
  ...head,
  ...chest,
  ...legs,
  ...gloves,
  ...boots,
  ...earrings,
  ...necklaces,
  ...belts,
  ...resistances,
  ...amulets,
  ...spiritStones,
  ...pets,
  ...mounts,
  ...materials,
  ...specials
};

export type ItemId = keyof typeof ITEMS;
