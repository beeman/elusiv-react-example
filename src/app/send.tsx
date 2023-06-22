import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { useState } from 'react';
import { useElusiv } from './elusiv-provider';

export function Send() {
  const { elusiv, keypair } = useElusiv();
  const [loading, setLoading] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(1);
  const [destination, setDestination] = useState<string>(
    keypair.publicKey.toString()
  );
  const [signature, setSignature] = useState<string | undefined>();
  const run = async () => {
    //
    const privateBalance = await elusiv.getLatestPrivateBalance('LAMPORTS');

    console.log('Current private balance: ', privateBalance);

    if (privateBalance < BigInt(0)) {
      alert("Can't send from an empty private balance");
      return;
    }

    console.log(destination);

    setLoading(true);
    // Build the send transaction
    const sendTx = await elusiv.buildSendTx(
      amount * LAMPORTS_PER_SOL,
      new PublicKey(destination),
      'LAMPORTS'
    );
    // Send it off!
    const result = await elusiv.sendElusivTx(sendTx);

    setSignature(result.signature);
    setLoading(false);
    console.log(result);
  };

  return loading ? (
    <pre>
      Sending {amount} SOL to {destination}
    </pre>
  ) : (
    <div>
      <input
        type="text"
        placeholder="Destination public key"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />{' '}
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(parseInt(e.target.value))}
      />{' '}
      <button onClick={run}>Send</button>
      {signature && (
        <div>
          <a
            target="_blank"
            href={`https://explorer.solana.com/tx/${signature}?cluster=devnet`}
          >
            View transaction on Solana Explorer
          </a>
        </div>
      )}
    </div>
  );
}
