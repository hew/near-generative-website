export enum RarityTypes {
  COMMON = 'Common',
  RARE = 'Rare',
}

interface Determined {
  name: string;
  rarity: RarityTypes;
  data: any;
}

export interface Seed {
  hashArr: any[];
  ratio: number;
  columnCount: Determined;
  gridGap: Determined;
  colors: Determined;
  effect: Determined;
}

const funk = [
  '#000',
  '#fff',
  '#609',
  '#306',
  '#f6f6f6',
  '#b5d5ff',
  '#808080',
  '#bfbbbb',
];

const swiss = [
  'hsl(10, 20%, 20%)',
  'hsl(10, 10%, 98%)',
  'hsl(10, 80%, 50%)',
  'hsl(10, 60%, 50%)',
  'hsl(10, 40%, 90%)',
  'hsl(250, 60%, 30%)',
  'hsl(10, 20%, 94%)',
  'hsl(10, 20%, 50%)',
];

const deep = [
  'hsl(210, 50%, 96%)',
  'hsl(230, 25%, 18%)',
  'hsl(260, 100%, 80%)',
  'hsl(290, 100%, 80%)',
  'hsl(260, 20%, 40%)',
  'hsl(290, 100%, 80%)',
  'hsla(230, 20%, 0%, 20%)',
  'hsl(210, 50%, 60%)',
];

const tosh = [
  '#000',
  '#fff',
  '#000',
  '#3f3f3f',
  '#e0e0e0',
  '#9f9f9f',
  '#6c6c6c',
  '#3f3f3f',
];

// prettier-ignore
export const alphabetValues = { a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7, i: 8, j: 9, k: 10, l: 11, m: 12, n: 13, o: 14, p: 15, q: 16, r: 17, s: 18, t: 19, u: 20, v: 21, w: 22, x: 23, y: 24, z: 25, };

export const countNumbers = (accumulator: number, current: string): number => {
  let newCount = parseInt(current) + accumulator;
  return newCount;
};

export const countLetters = (accumulator: number, current: string): number => {
  let newCount = alphabetValues[current] + accumulator;
  return newCount;
};

export const isSeedCalculated = (seed: string): boolean => {
  if (Object.keys(seed).length <= 0) {
    return false;
  }
};

export const DistortionSVGFilter = (
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="svg-filters">
    {' '}
    <defs>
      {' '}
      <filter id="filter">
        {' '}
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.1 0.3"
          numOctaves="1"
          result="warp"
        />{' '}
        <feDisplacementMap
          xChannelSelector="R"
          yChannelSelector="G"
          scale="8"
          in="SourceGraphic"
          in2="warp"
        />{' '}
      </filter>{' '}
    </defs>{' '}
  </svg>
);

export const determineTheme = (numberTotal: number): Determined => {
  const totalStr = numberTotal.toString();
  const idx = totalStr[totalStr.length - 1];

  if (['0', '9', '8'].includes(idx))
    return {name: 'Deep', rarity: RarityTypes.COMMON, data: deep};
  if (['5', '6', '7'].includes(idx))
    return {name: 'Funk', rarity: RarityTypes.COMMON, data: funk};
  if (['2', '3', '4'].includes(idx))
    return {name: 'Swiss', rarity: RarityTypes.COMMON, data: swiss};
  if (['1'].includes(idx)) return {name: 'Tosh', rarity: RarityTypes.RARE, data: tosh};
};

export const determineColumns = (letterTotal: number): Determined => {
  const str = letterTotal.toString();
  const secondLast = str[str.length - 1];

  if (['0', '9', '8'].includes(secondLast))
    return {name: '8', rarity: RarityTypes.COMMON, data: 8};
  if (['5', '6', '7'].includes(secondLast))
    return {name: '6', rarity: RarityTypes.COMMON, data: 6};
  if (['2', '3', '4'].includes(secondLast))
    return {name: '4', rarity: RarityTypes.COMMON, data: 4};
  if (['1'].includes(secondLast)) return {name: '2', rarity: RarityTypes.RARE, data: 2};
};

export const determineGap = (numberTotal: number): Determined => {
  const str = numberTotal.toString();
  const last = str[str.length - 1];

  if (['0', '9', '8'].includes(last))
    return {name: '22', rarity: RarityTypes.COMMON, data: 22};
  if (['5', '6', '7'].includes(last))
    return {name: '12', rarity: RarityTypes.COMMON, data: 12};
  if (['2', '3', '4'].includes(last))
    return {name: '8', rarity: RarityTypes.COMMON, data: 8};
  if (['1'].includes(last)) return {name: '0', rarity: RarityTypes.RARE, data: 0};
};

export const determineRandomStyle = (ratio: number): Determined => {
  const str = ratio.toString();
  const last = str[0];
  const skewStyles = ['skew(0deg, 0deg) scale(1)', `skew(2deg, 2deg) scale(0.95)`];
  const roundStyles = '35%';
  const effectMap = {
    skew: skewStyles,
    // distort: DistortionSVGFilter, // doesn't work in firefox
    round: roundStyles,
    none: undefined,
  };

  if (['5', '6'].includes(last))
    return {name: 'Skew', rarity: RarityTypes.RARE, data: effectMap.skew};

  if (['7', '8'].includes(last))
    return {name: 'Round', rarity: RarityTypes.RARE, data: effectMap.round};
  return {name: 'None', rarity: RarityTypes.COMMON, data: undefined};
};

export const SEED = (hash: string): Seed => {
  if (!hash?.length) return;

  const normalized = hash.toLowerCase();
  const numbers = normalized.match(/\d/g);
  const letters = normalized.match(/[A-Za-z]/g);
  const numberTotal = numbers.reduce(countNumbers, 0);
  const letterTotal = letters.reduce(countLetters, 0);
  const ratio = numberTotal / letterTotal;

  const colors = determineTheme(numberTotal);
  const effect = determineRandomStyle(ratio);
  const columnCount = determineColumns(letterTotal);
  const gridGap = determineGap(numberTotal);

  return {
    // @ts-ignore
    hashArr: [...hash],
    ratio,
    columnCount,
    gridGap,
    colors,
    effect,
  };
};
