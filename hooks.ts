import {useEffect, useState} from 'react';
import crypto from 'crypto';
import BN from 'bn.js';
import {Contract, keyStores, connect, WalletConnection, utils} from 'near-api-js';
import {SEED} from './utils';

export const useInitializeNEAR = ({NFT_ID}) => {
  const [near, setNear] = useState(undefined as any);
  const [userWallet, setUserWallet] = useState(undefined as any);
  const [contract, setContract] = useState(undefined as any);

  console.log(process.env.NODE_ENV, 'node env');

  useEffect(() => {
    const initializeSite = async () => {
      const config = {
        networkId: process.env.NODE_ENV === 'development' ? 'testnet' : 'testnet',
        nodeUrl: process.env.NODE_ENV === 'development' ? 'https://rpc.testnet.near.org' : 'https://rpc.testnet.near.org',  
        walletUrl: process.env.NODE_ENV === 'development' ? 'https://wallet.testnet.near.org': 'https://wallet.testnet.near.org',
        helperUrl: process.env.NODE_ENV === 'development' ? 'https://helper.testnet.near.org' : 'https://helper.testnet.near.org',
        explorerUrl: process.env.NODE_ENV === 'development' ? 'https://explorer.testnet.near.org' : 'https://explorer.testnet.near.org',
        keyStore: new keyStores.BrowserLocalStorageKeyStore(),
        headers: {},
      };

      const methods = {
        viewMethods: ['nft_tokens', 'nft_tokens_for_owner'],
        changeMethods: ['nft_mint'],
      };

      const _near = await connect(config);
      const _wallet = new WalletConnection(_near, 'website_user');
      const _contract = new Contract(_wallet.account(), NFT_ID, methods);

      setNear(_near);
      setUserWallet(_wallet);
      setContract(_contract);
    };

    initializeSite();
  }, []);

  const connectWallet = async () => {
    userWallet.requestSignIn({
      contractId: NFT_ID,
      successUrl: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : process.env.domain,
      failureUrl: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/auth-failure' : process.env.domain + '/auth-failure',
    });
  };

  const disconnectWallet = async () => {
    await userWallet.signOut();
    location.reload();
  };

  const mint = async () => {
    const tokens = await contract.nft_tokens({
      from_index: '0',
      limit: 1000,
    });

    const {token_id} = tokens[tokens.length - 1];
    const nextId = (parseInt(token_id) + 1).toString();
    const hash = crypto.randomBytes(21).toString('hex');

    const NFTData = {
      token_id: nextId,
      receiver_id: userWallet.getAccountId(),
      metadata: {
        title: `${userWallet.getAccountId()}'s Seed Hash`,
        description: 'The seed hash is used to power the design of the website.',
        extra: hash,
      },
      account_id: userWallet.getAccountId(),
    };

    await contract.nft_mint(
      NFTData,
      new BN('300000000000000', 8), // attached GAS (optional)
      utils.format.parseNearAmount('0.01'), // attached deposit in yoctoNEAR (optional)
    );
  };

  return {
    connectWallet,
    disconnectWallet,
    near,
    userWallet,
    contract,
    utils,
    mint,
  };
};

export const useInitializeSeed = ({contract, wallet}) => {
  const [nfts, setNfts] = useState([] as any);
  const [seed, setSeed] = useState({} as any);

  useEffect(() => {
    const init = async () => {
      const tokens = await contract.nft_tokens({
        from_index: '0',
        limit: 1000,
      });

      const last = tokens[tokens.length - 1];
      const hash = last?.metadata?.extra;

      if (!hash) {
        throw new Error('No seed hash found.');
      }

      setSeed(SEED(hash));
      setNfts(tokens);
    };

    if (contract && wallet && !nfts.length) {
      init();
    }
  }, [contract, wallet]);

  return {
    nfts,
    seed,
  };
};


export const useInitializeOwnerTokens = ({contract, wallet}) => {
  const [nfts, setNfts] = useState([] as any);
  const [seed, setSeed] = useState({} as any);

  useEffect(() => {
    const init = async () => {
      const tokens = await contract.nft_tokens_for_owner({
        account_id: wallet.getAccountId(),
        from_index: '0',
        limit: 1000,
      });

      const last = tokens[tokens.length - 1];
      const hash = last?.metadata?.extra;

      if (!hash) {
        throw new Error('No seed hash found.');
      }

      setSeed(SEED(hash));
      setNfts(tokens);
    };

    if (contract && wallet && !nfts.length) {
      init();
    }
  }, [contract, wallet]);

  return {
    nfts,
    seed,
  };
};

