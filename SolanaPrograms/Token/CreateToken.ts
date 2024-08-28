import { createMint } from "@solana/spl-token";
import { clusterApiUrl, Connection, Keypair } from "@solana/web3.js";
import * as bip39 from "bip39";
const mnemonic: any = process.env.mnemonicPhrase;

// arguments: (mnemonic, password)
const seed = bip39.mnemonicToSeedSync(mnemonic, "");
const keypair = Keypair.fromSeed(seed.slice(0, 32));

console.log(`${keypair.publicKey.toBase58()}`, "Account");

const payer = keypair;
const mintAuthority = keypair;
const freezeAuthority = keypair;

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

const mint = await createMint(
  connection,
  payer,
  mintAuthority.publicKey,
  freezeAuthority.publicKey,
  9 // We are using 9 to match the CLI decimal default exactly
);
console.log(mint.toBase58());
// J597AdMxx8ZjyBzkD8yFrvUHGmxjwR9i1WLkVpEgyj5C
