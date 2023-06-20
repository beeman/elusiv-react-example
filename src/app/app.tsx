import { Elusiv } from '@elusiv/sdk';
import { Connection, Keypair } from '@solana/web3.js';
import { useEffect, useState } from 'react';
import { getParams } from './elusiv/boilerplate';

export function App() {
  const [elusiv, setElusiv] = useState<Elusiv | undefined>();
  const [connection, setConnection] = useState<Connection | undefined>();
  const [keyPair, setKeyPair] = useState<Keypair | undefined>();

  useEffect(() => {
    getParams().then((res) => {
      setElusiv(res.elusiv);
      setConnection(res.conn);
      setKeyPair(res.keyPair);
    });
  }, []);

  return (
    <div>
      <pre>{JSON.stringify({ keyPair })}</pre>
      {/*<button onClick={() => topup()}>Topup</button>*/}
    </div>
  );
}
