import { getMint } from "@solana/spl-token";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";

const mint = new PublicKey("J597AdMxx8ZjyBzkD8yFrvUHGmxjwR9i1WLkVpEgyj5C");
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

const mintInfo = await getMint(connection, mint);
console.log(mintInfo.supply);
