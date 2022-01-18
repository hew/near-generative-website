import {Seed} from './utils';
import Rarity from './rarity';

export default function RarityExplorer({seed}: {seed: Seed; className?: string}) {
  if (!seed || Object.keys(seed).length === 0) {
    return null;
  }

  const {effect, columnCount, gridGap, colors} = seed;

  return (
    <div className="p-8 font-bold text-white text-xl rounded-b-lg whitespace-pre-wrap bg-black">
      <div className="">
        Theme is <span className="font-bold">{colors.name}</span>, which is{' '}
        <Rarity rarity={colors.rarity} />
      </div>
      <div className="">
        <span className="font-bold">Grid Gap is {gridGap.name}</span>, which is{' '}
        <Rarity rarity={gridGap.rarity} />
      </div>
      <div className="">
        <span className="font-bold">Columns are {columnCount.name}</span>, which is{' '}
        <Rarity rarity={columnCount.rarity} />
      </div>
      <div className="">
        {effect.name === 'None' ? null : (
          <>
            <span className="font-bold">{`${effect.name}ed,`}</span>{' '}
            <span>which is {<Rarity rarity={effect.rarity} />}</span>
          </>
        )}
      </div>
    </div>
  );
}
