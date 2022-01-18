import HashExplorer from '../hash-explorer';
import {useInitializeNEAR, useInitializeSeed} from '../hooks';

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

export default function YourNFTs({NFT_ID}) {
  const {contract, userWallet, connectWallet} = useInitializeNEAR({
    NFT_ID,
  });

  const {seed} = useInitializeSeed({contract, wallet: userWallet});

  return (
    <div>
      <nav className="border-b p-2 flex flex-wrap items-center">
        <p className="font-bold text-gray-400">Latest: </p>
        <HashExplorer
          seed={seed}
          className="flex flex-wrap font-bold p-2 rounded-lg whitespace-pre-wrap"
        />

        {userWallet?.getAccountId() ? (
          <a
            href="/"
            className="ml-auto font-bold text-sm bg-gray-900 text-white rounded p-2 shadow-lg"
          >
            Back
          </a>
        ) : (
          <>
            <a
              href="/"
              className="ml-auto font-bold text-sm bg-gray-900 text-white rounded p-2 shadow-lg"
            >
              Back
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
      <h1 className="text-center text-5xl font-bold mt-8">FAQ</h1>
      <h2 className="px-10 mt-8 text-2xl font-bold italic">What is this?</h2>
      <p className="px-10 text-lg">
        This is a website with a design that is driven by NFTs minted on the NEAR
        protocol. Each NFT stores a randomly generated hash, which is used as the seed
        to deterministically select the color scheme and grid attributes. To make it a
        bit more fun, the colors in the squares randomize with each reload.
      </p>

      <h2 className="px-10 mt-8 text-2xl font-bold italic">Why use NEAR?</h2>
      <p className="px-10 text-lg">
        NEAR is a climate-neutral layer 1 with extremely low fees, with contracts
        written in Rust. It seemed to me like a cool technology to explore for the
        purposes of minting NFTs.
      </p>

      <h2 className="px-10 mt-8 text-2xl font-bold italic">
        Why is it running on testnet?
      </h2>
      <p className="px-10 text-lg">
        This is basically just for fun, and to hopefully onboard more people into the
        NEAR ecosystem by showcasing how cheap it is to mint NFTs.
      </p>
    </div>
  );
}
