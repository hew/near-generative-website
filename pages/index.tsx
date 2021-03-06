import {useInitializeNEAR, useInitializeSeed} from '../hooks';
import AnimatedGrid from '../animated-grid';
import HashExplorer from '../hash-explorer';
import RarityExplorer from '../rarity-explorer';
import Footer from '../footer';

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
      <header>
        <nav className="px-4 py-4 flex flex-wrap items-center bg-gray-200">
          <HashExplorer
            seed={seed}
            className="flex flex-wrap font-bold p-2 rounded-lg whitespace-pre-wrap"
          />
          {userWallet?.getAccountId() ? (
            <>
              <a
                href="/faq"
                className="ml-auto font-bold text-sm text-gray-600 rounded p-2"
              >
                FAQ
              </a>
              <a
                href="/your-nfts"
                className="font-bold text-sm text-gray-600 rounded p-2"
              >
                Your NFTs
              </a>
              <button
                onClick={mint}
                className="ml-2 font-bold text-sm text-gray-200 bg-gray-900 text-white rounded p-2 shadow-lg"
              >
                Mint
              </button>
              <button
                onClick={disconnectWallet}
                className="ml-2 font-bold text-sm bg-red-800 text-white rounded p-2 shadow-lg"
              >
                Disconnect
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
      </header>
      <section>
        <div className="min-h-screen">
          <AnimatedGrid seed={seed} />
        </div>
      </section>
      <RarityExplorer
        seed={seed}
        className="px-8 py-12 text-white text-xl whitespace-pre-wrap bg-gray-900"
      />
      <Footer />
    </div>
  );
}
