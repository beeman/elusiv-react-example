import { clusterApiUrl, Connection, Keypair } from '@solana/web3.js';
import { ElusivProvider, useElusiv } from './elusiv-provider';
import { PRIV_KEY } from './elusiv/constants';

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
  const { elusiv, loading } = useElusiv();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <pre>{elusiv ? 'We have an instance' : 'We have no instance'}</pre>
    </div>
  );
}
