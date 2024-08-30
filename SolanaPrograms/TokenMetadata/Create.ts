import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { Keypair, PublicKey } from "@solana/web3.js";
import * as fs from "fs";
import * as path from "path";
import {
  createSignerFromKeypair,
  generateSigner,
  KeypairSigner,
  percentAmount,
  signerIdentity,
} from "@metaplex-foundation/umi";
import {
  createNft,
  fetchDigitalAsset,
  getAccountMetasAndSigners,
  mplTokenMetadata,
} from "@metaplex-foundation/mpl-token-metadata";
import * as bip39 from "bip39";
import {
  fromWeb3JsKeypair,
  toWeb3JsKeypair,
} from "@metaplex-foundation/umi-web3js-adapters";
import * as dotenv from "dotenv";

dotenv.config();

const mnemonic: any = process.env.mnemonicPhrase;

// arguments: (mnemonic, password)
const seed = bip39.mnemonicToSeedSync(mnemonic, "");
const keypair = Keypair.fromSeed(seed.slice(0, 32));

// console.log(`${keypair.publicKey.toBase58()}`, "Account");

// Generate a new Umi instance
const umi = createUmi("https://api.devnet.solana.com").use(mplTokenMetadata());

// umi.use(signerIdentity(umiKeypair));

const mint = generateSigner(umi);
console.log("mint", mint);
// const mint = umi.eddsa.createKeypairFromSecretKey(
//   new Uint8Array([
//     227, 160, 200, 208, 107, 135, 172, 254, 96, 214, 140, 142, 29, 134, 10, 64,
//     52, 207, 234, 0, 81, 224, 64, 251, 189, 83, 101, 124, 92, 117, 183, 71, 223,
//     239, 125, 196, 61, 213, 19, 34, 177, 237, 107, 211, 251, 250, 214, 197, 75,
//     95, 55, 70, 226, 124, 132, 171, 148, 18, 110, 102, 202, 117, 240, 4,
//   ])
// );

const myKeypair = umi.eddsa.createKeypairFromSeed(seed.slice(0, 32));

console.log("myKeypair", myKeypair);

let myKeypairSigner: KeypairSigner = createSignerFromKeypair(umi, myKeypair);
console.log("myKeypairSigner", myKeypairSigner);

await createNft(umi, {
  mint,
  name: "My First Solana NFT",
  uri: "https://example.com/my-nft.json",
  sellerFeeBasisPoints: percentAmount(5.5),
}).sendAndConfirm(umi);

const asset = await fetchDigitalAsset(umi, myKeypairSigner.publicKey);
