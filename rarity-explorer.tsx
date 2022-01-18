import {Seed} from './utils';
import Rarity from './rarity';

export default function RarityExplorer({
  seed,
  className,
}: {
  seed: Seed;
  className: string;
}) {
  if (!seed || Object.keys(seed).length === 0) {
    return null;
  }

  const {effect, columnCount, gridGap, colors} = seed;

  return (
    <article>
      <div className={className}>
        <div className="text-gray-200">
          Theme is <span className="font-bold">{colors.name}</span>, which is{' '}
          <Rarity rarity={colors.rarity} />
        </div>
        <div className="">
          Grid Gap is <span className="font-bold">{gridGap.name}</span>, which is{' '}
          <Rarity rarity={gridGap.rarity} />
        </div>
        <div className="">
          Columns are <span className="font-bold">{columnCount.name}</span>, which is{' '}
          <Rarity rarity={columnCount.rarity} />
        </div>
        <div className="text-gray-200">
          {effect.name === 'None' ? null : (
            <>
              <span className="font-bold">{`${effect.name}ed,`}</span>{' '}
              <span>which is {<Rarity rarity={effect.rarity} />}</span>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
