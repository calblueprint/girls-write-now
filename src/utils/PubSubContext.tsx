import React, {
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

export interface PubSubState {
  channels: Record<number, boolean>;
  initializeChannel: (id: number) => void;
  publish: (id: number, message: boolean) => void;
}

const BooleanPubSubContext = createContext({} as PubSubState);

export function usePubSub() {
  const value = useContext(BooleanPubSubContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error(
        'usePubSub must be wrapped in a <PubSubContextProvider />',
      );
    }
  }

  return value;
}

export function BooleanPubSubProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [channels, setChannels] = useState<Record<number, boolean | undefined>>({})

  const initializeChannel = (id: number) => {
    if (!(id in channels)) {
      setChannels({ ...channels, [id]: undefined })
    }
  }

  const publish = (id: number, message: boolean) => {
    setChannels({ ...channels, [id]: message })
  }

  const authContextValue = useMemo(
    () => ({
      channels,
      initializeChannel,
      publish,
    }),
    [channels],
  );

  return (
    <BooleanPubSubContext.Provider value={authContextValue}>
      {children}
    </BooleanPubSubContext.Provider>
  );
}
