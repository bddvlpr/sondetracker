import { Client, Message, type SubscribeOptions } from 'paho-mqtt';
import type { Listener } from './api';
import { updateListener } from './telemetry.svelte';

const WSS_DATA_URL = 'wss://ws-reader.v2.sondehub.org/';

export const socket = new Client(WSS_DATA_URL, `Sondetracker-${(Math.random() * 10000).toFixed()}`);

export const subscriptions = $state<string[]>([]);

export const connectSocket = () => {
  if (socket.isConnected()) return;
  socket.onMessageArrived = onMessageArrived;
  socket.connect({
    onSuccess: () => {
      subscribe('site/#');
      subscribe('listener/#');
    },
    reconnect: true
  });
};

export const disconnectSocket = () => {
  socket.disconnect();
};

export const subscribe = (topic: string, options?: SubscribeOptions) => {
  if (subscriptions.includes(topic)) {
    console.warn('Topic already included, skipping.', topic);
    return;
  }

  subscriptions.push(topic);
  socket.subscribe(topic, options);
};

const onMessageArrived = (message: Message) => {
  const { destinationName, payloadString } = message;

  try {
    if (destinationName.startsWith('listener')) {
      const listener = JSON.parse(payloadString) as Listener;
      updateListener(listener);
    }
  } catch (e) {
    console.log('Failed decoding packet.', e);
  }
};
