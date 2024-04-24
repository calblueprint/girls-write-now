import React, { createContext, useContext, useMemo, useState } from 'react';

export enum Channel {
  REACTIONS = 'reactions',
  SAVED_STORIES = 'saved_stories',
  FAVORITES = 'favorites',
}

type channel = Record<number, boolean | undefined>;

export interface PubSubState {
  channels: Record<Channel, channel>;
  publish: (channel: Channel, id: number, message: boolean) => void;
  subscribe: (channel: Channel, id: number) => ReturnType<typeof useMemo>;
  getPubSubValue: (channel: Channel, id: number) => boolean | undefined;
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
  const [channels, setChannels] = useState<Record<Channel, channel>>({
    [Channel.FAVORITES]: {},
    [Channel.REACTIONS]: {},
    [Channel.SAVED_STORIES]: {},
  });

  const publish = (channel: Channel, id: number, message: boolean) => {
    let thisChannel = { ...channels[channel], [id]: message };
    setChannels({ ...channels, [channel]: thisChannel });
  };

  const subscribe = (channel: Channel, id: number) => {
    return useMemo(() => channels[channel][id], [channels[channel][id]]);
  };

  const getPubSubValue = (channel: Channel, id: number) => {
    return channels[channel][id];
  };

  const authContextValue = {
    channels,
    publish,
    subscribe,
    getPubSubValue,
  };

  return (
    <BooleanPubSubContext.Provider value={authContextValue}>
      {children}
    </BooleanPubSubContext.Provider>
  );
}
