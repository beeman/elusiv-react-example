import { useCallback, useEffect, useState } from 'react';
import { useElusiv } from './elusiv-provider';

export function PrivateBalance() {
  const [balance, setBalance] = useState<number | undefined>();
  const solBalance = balance ? balance / 10 ** 9 : 0;
  const { keypair, connection, elusiv } = useElusiv();

  const refreshBalance = useCallback(() => {
    setBalance(0);
    elusiv
      .getLatestPrivateBalance('LAMPORTS')
      .then((res) => setBalance(Number(res)));
  }, [connection, keypair.publicKey]);

  useEffect(() => refreshBalance(), []);

  return (
    <pre style={{ cursor: 'pointer' }} onClick={refreshBalance}>
      | Private Balance: {balance ? solBalance : '...'} SOL
    </pre>
  );
}
