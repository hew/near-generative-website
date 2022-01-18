import {Seed} from './utils';

export default function HashExplorer({
  seed,
  className,
}: {
  seed: Seed;
  className?: string;
}) {
  if (!seed || Object.keys(seed).length === 0) {
    return null;
  }

  const {hashArr, colors} = seed;

  return (
    <p className={className}>
      {hashArr?.map((each, idx) => {
        const randomIndex = Math.floor(
          Math.random() * (colors.data.length - 0 + 1) + 0,
        );
        const color = colors.data[randomIndex];

        return (
          <span key={idx} className="inline-block" style={{color: color}}>
            {each}
          </span>
        );
      })}
    </p>
  );
}
