import { clusterApiUrl, Connection, Keypair } from "@solana/web3.js";
import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
  transfer,
} from "@solana/spl-token";
import * as bip39 from "bip39";
import * as bs58 from "bs58";
import * as dotenv from "dotenv";

dotenv.config();

(async () => {
  // Connect to cluster
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const mnemonic: any = process.env.mnemonicPhrase;

  // arguments: (mnemonic, password)
  const seed = bip39.mnemonicToSeedSync(mnemonic, "");

  const fromWallet = Keypair.fromSeed(seed.slice(0, 32));

  const toKey: any = process.env.toPVTKEY;
  console.log("toKey", process.env);
  // Generate a new wallet to receive newly minted token
  const toWallet = Keypair.fromSecretKey(bs58.default.decode(toKey));
  console.log("toWallet", toWallet);
  // Create new token mint
  const mint = await createMint(
    connection,
    fromWallet,
    fromWallet.publicKey,
    null,
    9
  );

  // Get the token account of the fromWallet address, and if it does not exist, create it
  const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    fromWallet,
    mint,
    fromWallet.publicKey
  );

  // Get the token account of the toWallet address, and if it does not exist, create it
  const toTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    fromWallet,
    mint,
    toWallet.publicKey
  );

  // Mint 1 new token to the "fromTokenAccount" account we just created
  let signature = await mintTo(
    connection,
    fromWallet,
    mint,
    fromTokenAccount.address,
    fromWallet.publicKey,
    1000000000
  );
  console.log("mint tx:", signature);

  // Transfer the new token to the "toTokenAccount" we just created
  signature = await transfer(
    connection,
    fromWallet,
    fromTokenAccount.address,
    toTokenAccount.address,
    fromWallet.publicKey,
    50
  );
})();
