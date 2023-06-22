import { Elusiv } from '@elusiv/sdk';
import { Connection, Keypair } from '@solana/web3.js';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getParams } from './elusiv/boilerplate';

export interface ElusivProviderContext {
  connection: Connection;
  elusiv: Elusiv;
  initializing: boolean;
  keypair: Keypair;
}

const ElusivContext = createContext<ElusivProviderContext>(
  {} as ElusivProviderContext
);

export function ElusivProvider({
  children,
  connection,
  keypair,
}: {
  children: ReactNode;
  connection: Connection;
  keypair: Keypair;
}) {
  const [elusiv, setElusiv] = useState<Elusiv | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getParams({ keypair, connection }).then((res) => {
      setElusiv(res);
      setLoading(false);
    });
  }, [connection, keypair]);

  const value: ElusivProviderContext = {
    connection,
    elusiv: elusiv as Elusiv,
    initializing: loading,
    keypair,
  };
  return (
    <ElusivContext.Provider value={value}>{children}</ElusivContext.Provider>
  );
}

export const useElusiv = () => useContext(ElusivContext);
