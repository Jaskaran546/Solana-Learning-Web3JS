import { AccountLayout, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";

(async () => {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  const tokenAccounts = await connection.getTokenAccountsByOwner(
    new PublicKey("G59izCPPtCWdNftKwBtqxrLXBnThYtGEaG2i4cyKQHyV"),
    {
      programId: TOKEN_PROGRAM_ID,
    }
  );

  console.log("Token                                         Balance");
  console.log("------------------------------------------------------------");
  tokenAccounts.value.forEach((tokenAccount) => {
    const accountData = AccountLayout.decode(tokenAccount.account.data);
    console.log(`${new PublicKey(accountData.mint)}   ${accountData.amount}`);
  });
})();

/*
Token                                         Balance
------------------------------------------------------------
GmAi61ACu1DXWSndTW2XcdhZ1fRQWxuynKBp2JFGmeia   0
67XRzZmY1RzJC2PP3yRB4SnWDzC1Y2i26nB31K78MkeQ   0
V13hGqvMKX21iZ9UA19VamMCJCoCzGDmum2R3GtF8Sw   0
J597AdMxx8ZjyBzkD8yFrvUHGmxjwR9i1WLkVpEgyj5C   100000000000
*/
