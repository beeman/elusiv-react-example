import { Elusiv } from '@elusiv/sdk';
import { Connection, Keypair, clusterApiUrl } from '@solana/web3.js';
import { useEffect, useState } from 'react';
import { getParams } from './elusiv/boilerplate';
import { PRIV_KEY } from './elusiv/constants';

const keypair = Keypair.fromSecretKey(PRIV_KEY);
const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
export function App() {
  const [elusiv, setElusiv] = useState<Elusiv | undefined>();

  useEffect(() => {
    getParams({ keypair, connection }).then((res) => {
      setElusiv(res);
    });
  }, []);

  return (
    <div>
      <pre>{elusiv ? 'We have an instance' : 'We have no instance'}</pre>
      {/*<button onClick={() => topup()}>Topup</button>*/}
    </div>
  );
}
