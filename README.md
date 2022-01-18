# Gitdenza

https://gitdenza.netlify.app

By hew

[![Netlify Status](https://api.netlify.com/api/v1/badges/92ae9d28-7022-4b70-aa7f-407dc5505682/deploy-status)](https://app.netlify.com/sites/gitdenza/deploys)

## What Are We Looking At Here?

This is website with a "generative design." This is accomplished by a seed algorithm that takes a git hash as the source of randomness, and that git hash is stored on-chain as an NFT. Anyone can mint one of these NFTs for free, and they will have a chance at affecting the design. 

## How To

Usage is dead simple, even if you are not particularly into crypto.

* Download [Metamask](https://metamask.io) and create an account (don't worry no real money will be used)
* Networks -> Ropsten Test Network
* Get some Eth from the [Ropsten Test Faucet](https://faucet.ropsten.be/)
* Visit https://gitdenza.netlify.app

## Website & Cryptonomics

### Page Reload

With every reload the colors on the squares are re-organized. This (hopefully) makes it a fun experience for those perhaps unaware of this document or are simply not interested in minting an NFT. 

### NFT-driven

Everything else is driven by the seed hash, and the website will use the _last minted token's_ hash. So put simply, click 'mint,' enter your hash, and as soon as the transaction goes through (this can take a couple seconds), you'll see the website's design has changed.

What you'll get, exactly, is randomized between these ranges:

- **Theme** 
  - Funk (30%)
  - Deep (30%)
  - Swiss (30%)
  - Tosh (10%)
- **Grid Gap**
  - 44px (30%)
  - 22px (30%)
  - 6px (30%)
  - 0px (10%)
- **Grid Columns**
  - 4 (30%)
  - 6 (30%)
  - 8 (30%)
  - 12 (10%)
- **Transforms**
  - None (70%)
  - Skewed (20%)
  - Distorted (10%)

## Some Random Variants

![image](https://user-images.githubusercontent.com/3103241/138322009-c0c40fd5-5535-42b2-af64-fcdf466c0d11.png)
![image](https://user-images.githubusercontent.com/3103241/138324284-f5401845-c76e-4088-a329-4049309ada31.png)
![image](https://user-images.githubusercontent.com/3103241/138324094-cb17c7f6-564b-40ae-9a2d-cbea9716b3dd.png)
![image](https://user-images.githubusercontent.com/3103241/138324889-1c87d1e8-b137-413f-9a10-60ec2b7544e2.png)
![image](https://user-images.githubusercontent.com/3103241/138324590-368ebc42-23e7-42f0-85e7-d1da4ecb9222.png)
![image](https://user-images.githubusercontent.com/3103241/138324906-921c048f-c703-4b69-86b2-ee3c39c1b153.png)

## Motivation

I recently saw Tyler Hobbs' [Fidenza collection](https://tylerxhobbs.com/fidenza), which centers around the use of [flow fields](https://tylerxhobbs.com/essays/2020/flow-fields). I found this concept really interesting and wanted to play around with some combination of a Fidenza-like art project to learn more about crypto. I also wanted to play around with storing git hashes on-chain instead of using a link to a IPFS json file or something like that. 

## Challenges and Process

I'm a typically UI developer; I am not an artist or a much of a numbers guy. Tyler uses [Processing](https://processing.org/), which is a language specific to visual arts. I use Javascript, which is decently fast itself, but animating in the browser has serious limitations, especially with the use case that I had in mind where you can constantly reload to enjoy some modicum of randomness within the determined contraints. 

Since a git hash has a length of 40 characters, I decided 40 divs was an elegant solution, and still gave me a lot of artistic and performance freedom to play around with. 

The above article states that "flow fields are based around grids." I decided to start with a grid, some colors, and some basic transforms. One of the outcomes that the Fidenza flow fields can achieve is a lack of curvature, so I decided to start with straight lines and if I had time I'd add curvature. I didn't have time to do that, and while adding curvature would be interesting, but at this point I'm actually more interested in learning Processing.

## More

### Crypto Art & Metadata

Many of the NFT contracts on OpenSea are using IPFS to host a json file that contains the metadata for a given NFT token. When a piece of (for lack of a better word) "jpeg art" is minted, a link is created to a json file hosted (typically) on IPFS that describes the metadata. 

That is one way to do things. Projects like Fidenza and the others on ArtBlocks take a different approach where a seed algorithm is stored on-chain, and the art pieces are "minted" from the seed, which drives the creation of a completely new and original piece of art.

### Using Git Hashes

Instead of hashing some algorithm, or using IPFS, what I wanted to do with this project was instead save git hashes on-chain. In our use case, we're just throwing literally _any_ random git hash essentially into a design system, which is somewhat contrived; however, the possibilities here are actually pretty expansive. 

You could have an NFT project where the assets are guaranteed to match not just a specific commit in a Github/Gitlab repository (say, when the "jpeg art" is uploaded by the Creator, or something), but more ideally, a specific commit in a _decentralized_ project using [Radicle](https://radicle.xyz/) or something similar. 

Credit for this idea goes to [Matt DesLauriers](https://twitter.com/mattdesl/status/1449138381091377157).

### Inspirations

* [Tyler Hobbs](https://tylerxhobbs.com)
* [Nader Dabit](https://www.youtube.com/channel/UC7mca3O0DmdSG2Cr80sOD7g)
* [Matt DesLauriers](https://twitter.com/mattdesl?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor)

