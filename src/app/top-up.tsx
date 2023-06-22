import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useState } from 'react';
import { useElusiv } from './elusiv-provider';

export function TopUp() {
  const [loading, setLoading] = useState<boolean>(false);
  const { elusiv, keypair } = useElusiv();
  const [amount, setAmount] = useState<number>(1);
  const run = async () => {
    //
    setLoading(true);
    const topUpTx = await elusiv.buildTopUpTx(
      amount * LAMPORTS_PER_SOL,
      'LAMPORTS'
    );
    // Sign it (only needed for topups, as we're topping up from our public key there)
    topUpTx.tx.partialSign(keypair);
    // Send it off
    const result = await elusiv.sendElusivTx(topUpTx);
    setLoading(false);
    console.log(result);
  };

  return loading ? (
    <pre>Topping up private balance with {amount} SOL</pre>
  ) : (
    <div>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(parseInt(e.target.value))}
      />{' '}
      <button onClick={run}>Top Up</button>
    </div>
  );
}
