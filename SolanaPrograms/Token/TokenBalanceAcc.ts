import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import { clusterApiUrl, Connection, Keypair, PublicKey } from "@solana/web3.js";

import * as bip39 from "bip39";
import * as dotenv from "dotenv";

dotenv.config();

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
const mnemonic: any = process.env.mnemonicPhrase;

const mint = new PublicKey("J597AdMxx8ZjyBzkD8yFrvUHGmxjwR9i1WLkVpEgyj5C");

// arguments: (mnemonic, password)
const seed = bip39.mnemonicToSeedSync(mnemonic, "");
const keypair = Keypair.fromSeed(seed.slice(0, 32));

console.log(`${keypair.publicKey.toBase58()}`, "Account");

const payer = keypair;

const tokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  payer,
  mint,
  payer.publicKey
);

console.log("TokenAccount", tokenAccount.address.toBase58());
// FYv8KZobQReDrvfFwkyji9BUPUGtZ2hDzM3o2jcfLQi8
