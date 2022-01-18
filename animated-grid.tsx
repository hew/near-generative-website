import {motion} from 'framer-motion';
import {Seed} from './utils';

export default function AnimatedGrid({seed}: {seed: Seed}) {
  if (!seed || Object.keys(seed)?.length === 0) {
    return null;
  }

  const {hashArr, effect, columnCount, gridGap, colors} = seed;

  return (
    <>
      {/* effect?.name === 'Distort' && effect.data // doesn't work in firefox */}
      <motion.div
        initial="hidden"
        animate="show"
        style={{
          columnCount: columnCount.data,
          gridGap: gridGap.data,
          gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
        }}
        transition={{type: 'spring'}}
        variants={{
          hidden: {opacity: 0},
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.02,
            },
          },
        }}
      >
        {hashArr.map((_, index) => {
          const random = Math.floor(Math.random() * (colors.data.length - 0 + 1) + 0);
          const item = {
            hidden: {
              opacity: 0,
              backgroundColor: colors.data[0],
              color: colors.data[0],
              transform: effect.name === 'Skew' ? effect.data[0] : undefined,
              borderRadius: effect.name === 'Round' ? effect.data : undefined,
            },
            show: {
              opacity: 1,
              backgroundColor: colors.data[random],
              color: colors.data[random],
              transform: effect.name === 'Skew' ? effect.data[1] : undefined,
              borderRadius: effect.name === 'Round' ? effect.data : undefined,
            },
          };

          return <motion.div key={index} variants={item} className="square" />;
        })}
      </motion.div>
    </>
  );
}
