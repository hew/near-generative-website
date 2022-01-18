import {useInitializeNEAR, useInitializeOwnerTokens} from '../hooks';
import {SEED} from '../utils';
import numToWords from 'number-to-words';
import RarityExplorer from '../rarity-explorer';
import HashExplorer from '../hash-explorer';
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

export default function YourNFTs({NFT_ID}) {
  const {contract, userWallet} = useInitializeNEAR({NFT_ID});
  const {nfts, seed} = useInitializeOwnerTokens({contract, wallet: userWallet});

  return (
    <div>
      <nav className="border-b p-4 flex flex-wrap items-center bg-gray-200">
        <HashExplorer
          seed={seed}
          className="flex flex-wrap font-bold p-2 rounded-lg whitespace-pre-wrap"
        />
        <a
          href="/"
          className="ml-auto font-bold text-sm bg-gray-900 text-white rounded p-2 shadow-lg"
        >
          Back
        </a>
      </nav>
      <section>
        <div className="min-h-screen py-4">
          {nfts?.length > 0 && (
            <div className="flex flex-col justify-center items-center">
              {nfts.map((nft, idx) => {
                const seed = SEED(nft.metadata.extra);

                return (
                  <div key={idx} className="w-1/2 p-2">
                    <article className="bg-gray-400 shadow rounded-lg">
                      <h1 className="p-8 font-bold text-white text-5xl rounded-lg uppercase">
                        STYLE {numToWords.toWords(parseInt(nft?.token_id))}
                      </h1>
                      <HashExplorer
                        seed={seed}
                        className="flex flex-wrap p-8 font-bold text-black text-5xl whitespace-pre-wrap bg-gray-900"
                      />
                      <RarityExplorer
                        seed={seed}
                        className="p-8 font-bold text-white text-xl rounded-b-lg whitespace-pre-wrap bg-gray-900 border-t-4 border-gray-800"
                      />
                    </article>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}
