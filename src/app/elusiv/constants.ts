/**
 * Constants used throughout the samples
 */

import { Cluster } from '@solana/web3.js';

export const DEVNET_RPC_URL = 'https://api.devnet.solana.com';

export const CLUSTER: Cluster = 'devnet';

/**
 * ONLY FOR SAMPLES NEVER EVER STORE YOUR/ANYONE'S PRIVATE KEY IN PLAIN TEXT
 * TODO: Insert your private key here
 */
export const PRIV_KEY = new Uint8Array([
  123, 170, 64, 173, 34, 249, 44, 177, 218, 239, 163, 242, 201, 253, 237, 134,
  169, 209, 251, 132, 56, 164, 203, 103, 168, 62, 146, 17, 85, 157, 188, 191,
  198, 34, 203, 232, 157, 71, 54, 69, 219, 101, 195, 245, 96, 174, 13, 151, 142,
  53, 115, 61, 202, 158, 44, 122, 205, 173, 116, 18, 167, 74, 27, 18,
]);
