import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { useCallback, useEffect, useState } from 'react';
import { useElusiv } from './elusiv-provider';

export function KeypairBalance() {
  const [balance, setBalance] = useState<number>(0);
  const solBalance = balance / 10 ** 9;
  const { keypair, connection } = useElusiv();

  const refreshBalance = useCallback(() => {
    setBalance(0);
    connection
      .getBalance(new PublicKey(keypair.publicKey))
      .then((res) => setBalance(res));
  }, [connection, keypair.publicKey]);

  const requestAirdrop = useCallback(
    (amount = 1) => {
      connection
        .requestAirdrop(
          new PublicKey(keypair.publicKey),
          amount * LAMPORTS_PER_SOL
        )
        .then((res) => console.log(res))
        .finally(() => refreshBalance());
    },
    [connection, keypair.publicKey]
  );

  useEffect(() => refreshBalance(), []);

  return (
    <pre style={{ cursor: 'pointer' }} onClick={refreshBalance}>
      | Balance: {solBalance} SOL | PublicKey: {keypair.publicKey.toString()} |{' '}
      <button
        onClick={() => {
          const amount = prompt('How much SOL to request?', '1');
          requestAirdrop(amount ? parseInt(amount) : 1);
        }}
      >
        Request Airdrop
      </button>
    </pre>
  );
}
