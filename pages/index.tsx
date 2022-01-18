import {useInitializeNEAR, useInitializeSeed} from '../hooks';
import AnimatedGrid from '../animated-grid';
import HashExplorer from '../hash-explorer';
import RarityExplorer from '../rarity-explorer';

export async function getStaticProps() {
  return {
    props: {
      PRIMARY_ID: process.env.PRIMARY_ID,
      MARKET_ID: process.env.MARKET_ID,
      NFT_ID: process.env.NFT_ID,
      TEST_ID: process.env.TEST_ID,
    },
  };
}

export default function Home({NFT_ID}) {
  const {contract, userWallet, connectWallet, disconnectWallet, mint} =
    useInitializeNEAR({
      NFT_ID,
    });

  const {seed} = useInitializeSeed({contract, wallet: userWallet});

  return (
    <div>
      <nav className="p-2 flex flex-wrap items-center">
        <p className="font-bold text-gray-400">Latest: {' '}</p>
        <HashExplorer
          seed={seed}
          className="flex flex-wrap font-bold p-2 rounded-lg whitespace-pre-wrap"
        />
        {userWallet?.getAccountId() ? (
          <>
            <a
              href="/faq"
              className="ml-auto font-bold text-sm text-gray-900 rounded p-2"
            >
              FAQ
            </a>
            <a
              href="/your-nfts"
              className="font-bold text-sm text-gray-900 rounded p-2"
            >
              Your NFTs
            </a>
            <button
              onClick={mint}
              className="ml-2 font-bold text-sm bg-gray-500 text-white rounded p-2 shadow-lg"
            >
              Mint
            </button>
            <button
              onClick={disconnectWallet}
              className="ml-2 font-bold text-sm bg-red-800 text-white rounded p-2 shadow-lg"
            >
              SignOut
            </button>
          </>
        ) : (
          <>
            <a
              href="/faq"
              className="ml-auto font-bold text-sm text-gray-900 rounded p-2"
            >
              FAQ
            </a>
            <button
              onClick={connectWallet}
              className="ml-2 font-bold text-sm bg-black text-white rounded p-2 shadow-lg"
            >
              Connect
            </button>
          </>
        )}
      </nav>
      <AnimatedGrid seed={seed} />
      <RarityExplorer seed={seed} />
    </div>
  );
}
