import { Elusiv, SEED_MESSAGE } from '@elusiv/sdk';
import { sign } from '@noble/ed25519';
import { Connection, Keypair } from '@solana/web3.js';
import { CLUSTER } from './constants';

// Boilerplate code used by all samples

// Helper function to generate params used by all samples, namely a web3js connection, the keypair of the user, and the elusiv instance
export async function getParams({
  keypair,
  connection,
}: {
  keypair: Keypair;
  connection: Connection;
}): Promise<Elusiv | undefined> {
  // Generate the input seed. Remember, this is almost as important as the private key, so don't log this!
  // (We use sign from an external library here because there is no wallet connected. Usually you'd use the wallet adapter here)
  // (Slice because in Solana's keypair type the first 32 bytes is the privkey and the last 32 is the pubkey)
  const seed = await sign(
    Buffer.from(SEED_MESSAGE, 'utf-8'),
    keypair.secretKey.slice(0, 32)
  );

  // Create the elusiv instance
  const elusiv = await Elusiv.getElusivInstance(
    seed,
    keypair.publicKey,
    connection,
    CLUSTER
  );

  return elusiv;
}
