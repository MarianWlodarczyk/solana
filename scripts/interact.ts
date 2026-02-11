import * as anchor from "@project-serum/anchor";
import { Keypair, SystemProgram } from "@solana/web3.js";

async function main() {
  // Initialize provider and program
  const provider = anchor.AnchorProvider.local();
  anchor.setProvider(provider);

  // Program should be available in anchor.workspace after `anchor build` and `anchor deploy`
  const program = anchor.workspace.Counter as anchor.Program<any>;

  // Create a new counter account (payer is the local wallet)
  const counterKeypair = Keypair.generate();

  console.log("Initializing counter account:", counterKeypair.publicKey.toBase58());

  // Initialize
  await program.rpc.initialize({
    accounts: {
      counter: counterKeypair.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId,
    },
    signers: [counterKeypair],
  });

  // Fetch and print
  let account = await program.account.counter.fetch(counterKeypair.publicKey);
  console.log("Count after initialize:", account.count.toString());

  // Increment
  await program.rpc.increment({
    accounts: { counter: counterKeypair.publicKey },
  });
  account = await program.account.counter.fetch(counterKeypair.publicKey);
  console.log("Count after increment:", account.count.toString());

  // Decrement
  await program.rpc.decrement({
    accounts: { counter: counterKeypair.publicKey },
  });
  account = await program.account.counter.fetch(counterKeypair.publicKey);
  console.log("Count after decrement:", account.count.toString());
}

main().catch((err) => {
  console.error(err);
});
---
  // Decrement
  await program.rpc.decrement({
    accounts: { counter: counterKeypair.publicKey },
  });
  account = await program.account.counter.fetch(counterKeypair.publicKey);
  console.log("Count after decrement:", account.count.toString());
}

main().catch((err) => {
  console.error(err);
});
---
});
---
  // Decrement
  await program.rpc.decrement({
    accounts: { counter: counterKeypair.publicKey },
  });
  account = await program.account.counter.fetch(counterKeypair.publicKey);
  console.log("Count after decrement:", account.count.toString());
}

