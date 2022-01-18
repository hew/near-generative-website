import {RarityTypes} from './utils';

export default function Rarity({rarity}: {rarity: RarityTypes}) {
  const rarityMap = {
    Common: 'gray',
    Rare: 'purple',
  };

  return (
    <span className="font-bold" style={{color: rarityMap[rarity]}}>
      {rarity}
    </span>
  );
}
