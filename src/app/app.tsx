import { clusterApiUrl, Connection, Keypair } from '@solana/web3.js';
import { ElusivProvider, useElusiv } from './elusiv-provider';
import { PRIV_KEY } from './elusiv/constants';
import { KeypairBalance } from './keypair-balance';
import { PrivateBalance } from './private-balance';
import { Send } from './send';
import { TopUp } from './top-up';

const keypair = Keypair.fromSecretKey(PRIV_KEY);
const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

export function App() {
  return (
    <ElusivProvider connection={connection} keypair={keypair}>
      <AppInner />
    </ElusivProvider>
  );
}

export function AppInner() {
  const { elusiv, initializing } = useElusiv();

  if (initializing) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <pre>{elusiv ? 'Elusiv initialized' : 'Error initializing Elusiv'}</pre>
      <hr />
      <KeypairBalance />
      <hr />
      <TopUp />
      <hr />
      <PrivateBalance />
      <hr />
      <Send />
      <hr />
    </div>
  );
}
